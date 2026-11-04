#!/usr/bin/env node
// Turn SingleFile captures of tracker pages into local fixtures.
//   node scripts/scrub.mjs ~/Downloads/*.html
// For each capture: work out the tracker from SingleFile's `url:` header (unknown
// sites are refused), blank passkeys/auth tokens and emails, drop the inlined
// supermono stylesheet (and on PTP the site theme it replaces), link
// /dist/<tracker>.css first in <head> (it loads before the site's CSS on BTN too),
// write fixtures/captured/<tracker>/<title-slug>.html (gitignored), then delete the
// raw capture, which still holds the secrets.
import { readFileSync, writeFileSync, unlinkSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, relative } from 'node:path';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'fixtures', 'captured');
const TRACKERS = { 'broadcasthe.net': 'btn', 'passthepopcorn.me': 'ptp' };
// PTP drops its whole theme (one normalize-scss-based sheet) when an external stylesheet is set.
const PTP_THEME = /^\s*\/\*! normalize-scss/;
// PTP secrets beyond the shared patterns: the passkey isn't hex, the anti-CSRF token is also a
// data attribute, and the security page shows the API user/key in unnamed inputs and a curl example.
const PTP_SECRETS = [
  [/\b(data-[\w-]*(?:auth|key|pass|token|csrf)[\w-]*)="[^"]*"/gi, '$1="REDACTED"'],
  [/\/[A-Za-z0-9]{32}\/announce/g, '/REDACTED/announce'],
  [/(Api(?:User|Key):<\/label>[\s\S]{0,200}?<input\b[^>]*\bvalue=")[^"]*"/g, '$1REDACTED"'],
  [/\b(Api(?:User|Key)):\s*[A-Za-z0-9]+/g, '$1: REDACTED'],
];
const PTP_LEFTOVER = /\b(?:authkey|torrent_pass|passkey|auth|anticsrftoken|irckey|apiuser|apikey)["']?\s*[=:]\s*["']?(?!REDACTED)[A-Za-z0-9]{8,}/i;

const SECRET_PARAMS = /\b(authkey|torrent_pass|passkey|auth|token)=([^&"'\s<>]+)/gi;
const HEX = /\b[0-9a-f]{24,}\b/gi; // IRC key, auth hashes
// The passkey is 32 mixed-case alphanumerics, embedded in URLs: feed=torrents_notify_<passkey>,
// landof.tv/<passkey>/announce. Only link/form/input values are searched, so data: URIs survive.
const URL_ATTR = /\b(href|action|value)="(?!data:)([^"]*)"/gi;
const KEY32 = /(?<![A-Za-z0-9])[A-Za-z0-9]{32}(?![A-Za-z0-9])/g;
const TOKEN_INPUT = /<input\b[^>]*\bname="(?:auth|authkey|token|csrf|passkey)[^"]*"[^>]*>/gi;
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const LEFTOVER = /\b(?:authkey|torrent_pass|passkey)=(?!REDACTED)|torrents_notify_(?!REDACTED)|\/[A-Za-z0-9]{32}\/announce/i;
const OURS = ':root:root'; // first selector of src/00-tokens.css

export function detectTracker(html) {
  const host = html.slice(0, 4096).match(/^\s*url: https?:\/\/([^/\s]+)\//m)?.[1];
  const tracker = TRACKERS[host];
  if (!tracker) throw new Error('unknown tracker');
  return tracker;
}

// --shapes: describe what in a raw capture looks like a secret (kind, name, host, length,
// character set, count) without ever printing a value, so scrub patterns can be written
// for a new tracker safely.
const WORD = '[\\w$-]*(?:auth|key|pass|token|csrf|session)[\\w$-]*';
const CANDIDATES = [
  ['param', new RegExp(`[?&;](${WORD})=([^&"'\\s<>#]+)`, 'gi')],
  ['path', /https?:\/\/([^/\s"'<>]+)\/([A-Za-z0-9]{24,})(?=[/"'?#\s])/g],
  ['data', new RegExp(`\\bdata-(${WORD})="([^"]*)"`, 'gi')],
  ['input', new RegExp(`<input\\b[^>]*\\bname="(${WORD})"[^>]*\\bvalue="([^"]*)"`, 'gi')],
  ['js', new RegExp(`\\b(${WORD})\\s*[:=]\\s*["']([^"']{8,})["']`, 'gi')],
];
const charset = (v) => '[' + [[/[a-z]/, 'a-z'], [/[A-Z]/, 'A-Z'], [/[0-9]/, '0-9'], [/[^a-zA-Z0-9]/, '+other']]
  .filter(([re]) => re.test(v)).map(([, s]) => s).join('') + ']';

export function shapes(html) {
  const seen = new Map();
  const add = (key) => seen.set(key, (seen.get(key) ?? 0) + 1);
  for (const [kind, re] of CANDIDATES) {
    for (const [, a, b] of html.matchAll(re)) {
      const [name, host] = kind === 'path' ? ['-', a] : [a, '-'];
      add(b === 'REDACTED' ? `${kind} ${name} ${host} REDACTED` : `${kind} ${name} ${host} ${b.length} ${charset(b)}`);
    }
  }
  const emails = (html.match(EMAIL) ?? []).filter((e) => e !== 'user@example.com').length;
  if (emails) seen.set('email - - - -', emails);
  return [...seen].map(([k, n]) => `${k} ${n}`).sort();
}

export function scrub(html) {
  const tracker = detectTracker(html);
  html = html
    .replace(SECRET_PARAMS, '$1=REDACTED')
    .replace(HEX, 'REDACTED')
    .replace(URL_ATTR, (attr) => attr.replace(KEY32, 'REDACTED'))
    .replace(TOKEN_INPUT, (tag) => tag.replace(/\bvalue="[^"]*"/i, 'value="REDACTED"'))
    .replace(EMAIL, 'user@example.com');

  // SingleFile inlines every stylesheet as its own <style>; drop ours so edits to dist/ show.
  html = html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, (block) => {
    if (!block.includes(OURS)) return block;
    // Inlined images (e.g. the logo) don't count toward the size check.
    const bare = block.replace(/url\(\s*["']?data:[^)]*\)/g, '');
    if (bare.length > 60_000) throw new Error('supermono CSS is merged with other styles; not safe to strip');
    return '';
  });

  if (tracker === 'ptp') {
    for (const [re, to] of PTP_SECRETS) html = html.replace(re, to);
    let themes = 0;
    html = html.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, (block, css) => {
      if (!PTP_THEME.test(css)) return block;
      themes++;
      return '';
    });
    if (themes > 1) throw new Error('more than one PTP theme block');
  }

  // SingleFile's CSP blocks anything added after load: the harness's theme swap and
  // browser-sync's script/websocket. Allow the local server; remote hosts stay blocked.
  html = html.replace(/<meta http-equiv="content-security-policy"[^>]*>/i,
    `<meta http-equiv="content-security-policy" content="default-src 'self' data: 'unsafe-inline' ws://localhost:*">`);

  const link = `<link rel="stylesheet" href="/dist/${tracker}.css">`;
  const charset = html.match(/<meta charset[^>]*>/i);
  html = charset ? html.replace(charset[0], charset[0] + link) : html.replace(/<head[^>]*>/i, (h) => h + link);

  if (LEFTOVER.test(html) || (tracker === 'ptp' && PTP_LEFTOVER.test(html))) {
    throw new Error('secret parameter survived scrubbing');
  }
  return { tracker, html };
}

function slug(html) {
  const title = (html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? 'page').split('::')[0];
  return title.toLowerCase().replace(/&#?\w+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'page';
}

function main(files) {
  let failed = 0;
  for (const raw of files) {
    try {
      const { tracker, html } = scrub(readFileSync(raw, 'utf8'));
      const dir = join(out, tracker);
      mkdirSync(dir, { recursive: true });
      let name = slug(html), dest = join(dir, `${name}.html`);
      for (let n = 2; existsSync(dest); n++) dest = join(dir, `${name}-${n}.html`);
      writeFileSync(dest, html);
      unlinkSync(raw);
      console.log(`${raw} -> ${relative(process.cwd(), dest)}`);
    } catch (e) {
      failed++;
      console.error(`SKIP ${raw}: ${e.message} (raw file kept)`);
    }
  }
  process.exit(failed ? 1 : 0);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  if (args[0] === '--shapes') {
    for (const file of args.slice(1)) console.log(`== ${relative(process.cwd(), file)}\n` + shapes(readFileSync(file, 'utf8')).join('\n'));
  } else main(args);
}
