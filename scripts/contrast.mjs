#!/usr/bin/env node
// WCAG AA check (4.5:1) for every text colour against every surface it can sit on,
// in both schemes. Reads `--token: light-dark(a, b)` from src/00-tokens.css and
// inline `color: light-dark(a, b)` rules from src/50-classes.css.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const src = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');
const tokens = readFileSync(join(src, '00-tokens.css'), 'utf8');
const classes = readFileSync(join(src, '50-classes.css'), 'utf8');

const HEX = '#[0-9a-fA-F]{3,8}';
const pair = new RegExp(`light-dark\\(\\s*(${HEX})\\s*,\\s*(${HEX})\\s*\\)`);

const T = {}; // name -> [light, dark]
for (const [, name, value] of tokens.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
  const m = value.match(new RegExp(`^${pair.source}$`));
  if (m) T[name] = [m[1], m[2]];
}
// Aliases that resolve to another token (e.g. --icon-red: var(--bad))
for (const [, name, ref] of tokens.matchAll(/--([\w-]+):\s*var\(--([\w-]+)\);/g)) {
  if (T[ref]) T[name] = T[ref];
}

const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const rgb = (hex) => {
  let h = hex.slice(1);
  if (h.length === 3) h = [...h].map((x) => x + x).join('');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const lum = (hex) => { const [r, g, b] = rgb(hex); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); };
// color-mix(in srgb, a p, b) / `a` at opacity p over b
const mix = (a, b, p) => '#' + rgb(a).map((c, i) => Math.round(c * p + rgb(b)[i] * (1 - p)).toString(16).padStart(2, '0')).join('');
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// tr.rowb in 30-components.css
T['row-b'] = [0, 1].map((i) => mix(T['bg-hover'][i], T['bg-raised'][i], 0.45));

const SURFACES = ['bg', 'bg-raised', 'bg-hover', 'bg-head', 'bg-sunken', 'row-b'];
const TEXT = ['fg', 'fg-muted', 'link', 'accent', 'accent-hover', 'good', 'bad', 'warn', 'info', 'orange'];
const checks = []; // [label, scheme, fg, bg]

for (const t of TEXT) for (const s of SURFACES) for (const i of [0, 1]) {
  checks.push([`--${t} on --${s}`, ['light', 'dark'][i], T[t][i], T[s][i]]);
}
for (const i of [0, 1]) checks.push(['--accent-fg on --accent', ['light', 'dark'][i], T['accent-fg'][i], T.accent[i]]);
for (const [t, bg] of [['good', 'good-bg'], ['bad', 'bad-bg'], ['warn', 'warn-bg'], ['fg', 'good-bg'], ['fg', 'bad-bg'], ['fg', 'warn-bg']]) {
  for (const i of [0, 1]) checks.push([`--${t} on --${bg}`, ['light', 'dark'][i], T[t][i], T[bg][i]]);
}
// Tag filter cells: link text on --bg-sunken, whole cell at opacity .8 over a --bg-raised box.
for (const i of [0, 1]) {
  checks.push(['tag text (opacity .8)', ['light', 'dark'][i],
    mix(T.link[i], T['bg-raised'][i], 0.8), mix(T['bg-sunken'][i], T['bg-raised'][i], 0.8)]);
}
// Class colours: each rule block's light-dark() colour on every surface a name or value can sit on
// (rows, group cells, blockquotes, unread-PM rows).
for (const [, sel, a, b] of classes.matchAll(new RegExp(`([^{}]+)\\{[^}]*?color:\\s*light-dark\\(\\s*(${HEX})\\s*,\\s*(${HEX})\\s*\\)`, 'g'))) {
  const label = sel.trim().replace(/\s+/g, ' ').split(',')[0].replace(/^body /, '');
  for (const s of [...SURFACES, 'warn-bg']) {
    checks.push([`${label} on --${s}`, 'light', a, T[s][0]]);
    checks.push([`${label} on --${s}`, 'dark', b, T[s][1]]);
  }
}

const fails = checks.filter(([, , fg, bg]) => ratio(fg, bg) < 4.5);
for (const [label, scheme, fg, bg] of fails) {
  console.log(`FAIL ${scheme.padEnd(5)} ${ratio(fg, bg).toFixed(2)}  ${label}  (${fg} on ${bg})`);
}
console.log(`${checks.length - fails.length}/${checks.length} pairs pass AA 4.5:1`);
process.exit(fails.length ? 1 : 0);
