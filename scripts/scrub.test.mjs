// node --test scripts/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scrub } from './scrub.mjs';

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
