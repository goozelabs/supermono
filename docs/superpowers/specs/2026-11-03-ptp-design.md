# supermono for PTP

## Intent

supermono is a pure-CSS theme loaded through a tracker's "external
stylesheet" profile setting. Today it targets only BTN.
This adds PTP: a full stylesheet that makes PTP look like
the BTN sheet as closely as the markup allows. It is the first step towards
supermono being one theme across several trackers (RED, OPS later).

## Goals

- PTP gets the same three files as BTN: `ptp.css` (follows the OS),
  `ptp-dark.css`, `ptp-light.css`, served from the existing Pages site
  (`https://goozelabs.github.io/supermono/ptp*.css`).
- Same look: palette, type, spacing, radii, cards, tables, forms, menus,
  phone handling. A colour change in the shared tokens applies to both
  trackers.
- Same quality bar: every text colour passes WCAG AA (4.5:1) in light and
  dark, checked by `scripts/contrast.mjs`.
- Same local workflow: SingleFile captures, scrubbed, styled with
  `scripts/dev.mjs`.

## Non-goals

- RED, OPS or any other tracker (the structure should not block them, but
  nothing is built for them).
- Accent or theme options beyond the three files (dropped: BTN's stylesheet
  field only accepts URLs ending in `.css`, and Pages is static).
- Userscripts or anything other than CSS.
- Copying PTP-specific features that have no BTN counterpart into BTN.

## Anti-goals

- Any change to BTN's output. `dist/btn.css`, `btn-dark.css`, `btn-light.css`
  must be byte-identical before and after the restructure.
- Anything in the public repo that identifies the author or other members:
  usernames, passkeys, auth tokens, captured pages, the author's real name
  or email. The repo is published anonymously as `goozelabs`; commits use
  the repo-local identity, in UTC.
- Automated access to PTP. All markup comes from captures the author makes
  by hand in their own browser.

## Constraints

- PTP markup is unknown until captures exist. PTP is not stock Gazelle and
  differs from BTN, so BTN selectors are not expected to carry over.
- Whether PTP accepts an external stylesheet URL from `github.io`, what
  form the field has, and whether its Content-Security-Policy allows the
  stylesheet are unknown. Checked first (see Order of work).
- `build.sh` makes the dark/light files by rewriting the first
  `color-scheme: light dark;` and the first
  `@media (prefers-color-scheme: light) { … }` block. Every scheme-dependent
  rule must be `light-dark()` or live in that one block.
- Toolchain stays as is: bash, perl, `npx lightningcss-cli@1.33.0`,
  `npx browser-sync@3.0.4`, plain Node scripts. No package.json, nothing
  installed into the repo.

## Design (decided)

### Source layout

```
src/shared/00-tokens.css   current src/00-tokens.css, unchanged
src/btn/10-base.css …      current src/10…90 files, unchanged
src/ptp/10-base.css …      new, same file split as btn
```

Tokens are shared verbatim, including the `global.css contract` block
(BTN-only names; unused custom properties on PTP cost a few hundred bytes).
Keeping the file unchanged means BTN's concatenated source is identical, so
its minified output is byte-identical.

### Build

`build.sh` loops over trackers. For each `t` in `btn ptp`:
`cat src/shared/*.css src/$t/*.css > dist/$t.src.css`, then the existing
perl dark/light rewrite and minify, producing `dist/$t.css`,
`dist/$t-dark.css`, `dist/$t-light.css`. The size report prints per file
as now.

### Contrast check

`scripts/contrast.mjs` reads tokens from `src/shared/00-tokens.css` and
class colours from `src/<tracker>/50-classes.css`, and runs once per
tracker, labelling output by tracker.

### Scrubbing captures

`scripts/scrub.mjs` detects the tracker from the SingleFile header comment
(`url:` line with the BTN or PTP host) and
refuses any file whose tracker it doesn't recognise (fail closed; raw file
kept). Per tracker it applies that tracker's secret patterns (PTP passkey,
announce host, auth/anti-CSRF tokens as found in real captures), its
leftover check, and links `/dist/<tracker>.css` (root-relative, so folder
depth doesn't matter; browser-sync serves the repo root). Output goes to
`fixtures/captured/<tracker>/` (gitignored, as now). Existing BTN captures
move to `fixtures/captured/btn/` once, with their `../../dist/btn.css`
link rewritten to `/dist/btn.css` (local files, no re-capture needed).

**Capture conditions:** the existing PTP captures were taken with PTP's
default dark theme and no external stylesheet; their markup is what
matters and is kept. Comparing two home-page captures (plain vs
`btn-dark.css` set) showed **PTP replaces its theme entirely**: the plain
capture's `media="screen"` block (~197 KB, beginning
`/*! normalize-scss`) is absent when an external sheet is set, and nothing
else of PTP's CSS remains. Unlike BTN (where `global.css` stays), the PTP
sheet starts from bare browser defaults, so its base layer must cover what
normalize did. The scrubber strips PTP's theme block (the `<style>` whose
content starts with that `normalize-scss` comment) and fails closed if a PTP
capture has more than one such block. Page-level inline `<style>` blocks
(e.g. on movie pages) are kept: they load live regardless of theme. The
supermono block, if present, is stripped by its `:root:root` marker, as for
BTN. SingleFile's own `:root{--sf-img-N…}` block is left alone.

**Finding PTP's secret formats (call):** a small discovery mode in
`scrub.mjs` reports the *shape* of candidate secrets in raw captures
(attribute or parameter name, host, length, character set) and never their
values, so the patterns can be written without a passkey being printed,
logged or sent anywhere. Scrubbed captures (secrets removed) may be read
directly by whoever does the styling, human or agent.

**Markup skeleton (call):** a `docs/markup-skeleton-ptp.md` like BTN's
(tags, ids and classes only, digits normalised to N) is written once
captures exist. It is public, so it contains no text content, usernames or
ids.

### Fixture harness

`scripts/dev.mjs` writes one index listing captures per tracker.
`fixtures/index.html` gets a tracker picker; the page list and the theme
swap (`<tracker>`, `<tracker>-dark`, `<tracker>-light`) follow it.
`fixtures/touch.html` stays BTN.

### Hosting

No change. The Pages workflow publishes all of `dist/`.

## Order of work

1. **Feasibility (author, by hand):** paste
   `https://goozelabs.github.io/supermono/btn-dark.css` into PTP's
   stylesheet setting. If the page visibly changes (even broken), external
   stylesheets from Pages work. If not, stop and rethink hosting.
   **Done 2026-11-03: it loads.** Most of the page took supermono's
   colours and type; layout broke, as expected with BTN selectors.
   PTP replaces its theme (see Capture conditions), so the PTP sheet is a
   from-scratch base like BTN's.
2. Restructure into `src/shared` + `src/btn`, update `build.sh`; prove BTN
   `dist/` is byte-identical with `cmp`.
3. Update `scrub.mjs` for PTP; verify against real captures that no
   passkey, auth/anti-CSRF token or email survives before any capture is
   kept. Usernames stay, as with BTN (captures are gitignored).
4. Harness changes (`dev.mjs`, `fixtures/index.html`), docs.
5. Style PTP in the same order BTN was built: base → layout (header, menu,
   user bar, sidebar) → components (tables, forms, buttons, boxes, BBCode)
   → pages → user-class colours → widgets → phones. Compare side by side
   with the matching BTN capture throughout.

## Left to the builder

- All PTP selectors and how each PTP page maps onto BTN's look.
- Whether any rule is truly identical on both trackers and can move to
  `src/shared/` (only once proven; default is per-tracker).
- PTP's user-class colours: reuse BTN's hue families by role (staff green,
  helpers blue, …), each checked for contrast.
- PTP-only page elements (e.g. cover/poster views) styled in supermono's
  idiom.
- A build-time guard that fails if a tracker's source has more than one
  `@media (prefers-color-scheme: light)` block.
