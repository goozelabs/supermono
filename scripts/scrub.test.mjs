// node --test scripts/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scrub, shapes } from './scrub.mjs';

// Minimal SingleFile capture: header comment naming the page URL, then the document.
const page = (host, head = '', body = '') =>
  `<!--\n Page saved with SingleFile \n url: https://${host}/index.php \n saved date: today\n-->` +
  `<html><head><meta charset="utf-8">${head}</head><body>${body}</body></html>`;
const THEME = '<style media="screen">/*! normalize-scss | MIT */html{font-family:sans-serif}</style>';

test('refuses unknown tracker', () => {
  assert.throws(() => scrub(page('example.org')), /unknown tracker/);
});

test('btn link is root-relative', () => {
  const r = scrub(page('broadcasthe.net'));
  assert.equal(r.tracker, 'btn');
  assert.ok(r.html.includes('<link rel="stylesheet" href="/dist/btn.css">'));
});

test('ptp theme block stripped', () => {
  const r = scrub(page('passthepopcorn.me',
    `<style>:root{--sf-img-0:url(x)}</style>${THEME}<style>.inline{}</style>`));
  assert.equal(r.tracker, 'ptp');
  assert.ok(!r.html.includes('normalize-scss'));
  assert.ok(r.html.includes('--sf-img-0'));
  assert.ok(r.html.includes('.inline{}'));
  assert.ok(r.html.includes('<link rel="stylesheet" href="/dist/ptp.css">'));
});

test('ptp without theme block', () => {
  assert.doesNotThrow(() => scrub(page('passthepopcorn.me', '<style>.inline{}</style>')));
});

test('two theme blocks refused', () => {
  assert.throws(() => scrub(page('passthepopcorn.me', THEME + THEME)), /theme block/);
});

test('supermono block stripped', () => {
  for (const host of ['broadcasthe.net', 'passthepopcorn.me']) {
    const r = scrub(page(host, '<style>:root:root{--x:1}</style>'));
    assert.ok(!r.html.includes(':root:root'), host);
  }
});

test('shapes report form, never values', () => {
  const secret = 'Zq9' + 'x'.repeat(29); // 32 chars, mixed case + digit
  const out = shapes(page('passthepopcorn.me', '',
    `<a href="torrents.php?action=download&torrent_pass=${secret}">dl</a>` +
    `<a href="https://tracker.example/${secret}/announce">a</a>` +
    `<script>var AntiCsrfToken = "${secret}";</script>` +
    `<div data-authkey="${secret}"></div>` +
    'mail me@example.net'));
  const text = out.join('\n');
  assert.ok(!text.includes(secret.slice(3)), 'value leaked');
  assert.ok(text.includes('param torrent_pass - 32 [a-zA-Z0-9]'));
  assert.ok(text.includes('path - tracker.example 32 [a-zA-Z0-9]'));
  assert.ok(text.includes('js AntiCsrfToken - 32 [a-zA-Z0-9]'));
  assert.ok(text.includes('data authkey - 32 [a-zA-Z0-9]'));
  assert.ok(text.includes('email - - - - 1'));
});

// PTP secret shapes found by --shapes in real captures (synthetic values of the same form).
const HEX32 = '0123456789abcdef'.repeat(2);
const KEY32 = 'k9' + 'q'.repeat(30); // lowercase alphanumeric, not hex
const MIX32 = 'Ab3' + 'z'.repeat(29);
const ptp = (body) => scrub(page('passthepopcorn.me', '', body)).html;
const hides = (body, ...values) => {
  const html = ptp(body);
  for (const v of values) assert.ok(!html.includes(v), `kept ${v.slice(0, 6)}…`);
};

test('ptp download link keys', () => hides(
  `<a href="torrents.php?action=download&amp;id=1&amp;authkey=${HEX32}&amp;torrent_pass=${KEY32}">DL</a>`,
  HEX32, KEY32));
test('ptp auth param', () => hides(`<a href="logout.php?auth=${HEX32}">Logout</a>`, HEX32));
test('ptp anti-csrf data attribute', () => hides(`<body data-anticsrftoken="${KEY32}">`, KEY32));
test('ptp anti-csrf input', () => hides(`<input type="hidden" name="AntiCsrfToken" value="${KEY32}">`, KEY32));
test('ptp irc key input', () => hides(`<input type="text" name="irckey" value="${MIX32}">`, MIX32));
test('ptp announce url in input', () => hides(
  `<input type="text" value="https://please.passthepopcorn.me/${KEY32}/announce" readonly>`, KEY32));
test('ptp announce url in text', () => hides(`<p>https://please.passthepopcorn.me/${KEY32}/announce</p>`, KEY32));
test('ptp api user and key inputs', () => hides(
  '<label class="form__label">ApiUser:</label></div><div class="grid__item">' +
  '<input type="text" size="16" class="form__input" value="UserAbc123xyz789" readonly="readonly">' +
  '<label class="form__label">ApiKey:</label></div><div class="grid__item">' +
  `<input type="text" size="32" class="form__input" value="${MIX32}" readonly="readonly">`,
  'UserAbc123xyz789', MIX32));
test('ptp api user and key in curl text', () => hides(
  `<blockquote>curl -H "ApiUser: UserAbc123xyz789" -H "ApiKey: ${MIX32}" "https://x/"</blockquote>`,
  'UserAbc123xyz789', MIX32));
test('leftover in inline script refused', () => {
  assert.throws(() => ptp(`<script>var authkey = "${KEY32}";</script>`), /survived/);
});
test('ptp irc key in usage text', () => hides(
  `<p>Usage: /msg Hummingbird ENTER someuser ${MIX32} #channel-name</p>`, MIX32));
test('unknown mixed-case 32-char token refused', () => {
  assert.throws(() => ptp(`<p>key is ${MIX32} here</p>`), /survived/);
});
test('data uri content is not a token', () => {
  assert.doesNotThrow(() => ptp(`<img src="data:image/png;base64,${MIX32}${MIX32}">`));
});
test('ptp irc key in usage span', () => {
  const html = ptp(`<code>/msg Hummingbird ENTER someuser <span id="irckey_example">${MIX32}</span> #channel-name</code>`);
  assert.ok(!html.includes(MIX32));
  assert.ok(html.includes('<span id="irckey_example">REDACTED</span>'));
});
test('lowercase passkey in plain text refused', () => {
  assert.throws(() => ptp(`<td>Passkey</td><td>${KEY32}</td>`), /survived/);
});
test('mixed-case key after an unknown parameter refused', () => {
  assert.throws(() => ptp(`<script>u="/x?k=${MIX32}"</script>`), /survived/);
});
