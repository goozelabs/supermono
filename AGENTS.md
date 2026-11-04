# supermono

Pure-CSS theme for private trackers (BTN, PTP), loaded through each site's
"external stylesheet" profile field. GitHub Pages serves the committed
`dist/` from `main`; nothing builds in CI.

## Commands

- `bash build.sh`: concatenate `src/shared/*.css` + `src/<tracker>/*.css`,
  write `dist/<t>.css`, `<t>-dark.css`, `<t>-light.css`.
- `node scripts/dev.mjs`: watch + rebuild, serve fixtures at
  `http://localhost:3000/fixtures/`.
- `node scripts/contrast.mjs`: WCAG AA check; exits 1 on any failure.
- `node --test scripts/*.test.mjs`: tests for `scrub.mjs`.

A change is done when `build.sh` and `contrast.mjs` pass and the rebuilt
`dist/*.css` is committed together with its `src/` change.

## Privacy: public, anonymous repo

The repo is published anonymously. Every committed byte is public.

- Commit only hand-written content. Usernames, passkeys, tokens, emails,
  page text or markup copied from captures, and local paths stay out of
  files, commits, PRs and issues.
- `fixtures/captured/` (gitignored) holds other members' data. Read it to
  write selectors; describe what you need in the shape of
  `docs/markup-skeleton*.md` (tags, ids, classes, no text or values).
- Commit from inside the repo so its local git identity applies, with
  `TZ=UTC git commit …`.
- Use `git` over the configured remote for repo operations; `gh` is not set
  up for this repo. Read the public GitHub API with unauthenticated `curl`.

## CSS rules

- Edit `src/`; `dist/` is build output.
- Colour is `light-dark(on-light, on-dark)`. `build.sh` makes the dark and
  light files by rewriting the first `color-scheme: light dark;` and the
  single `@media (prefers-color-scheme: light)` block per tracker (a second
  block fails the build). Any scheme-dependent rule goes in one of those.
- `contrast.mjs` reads hex pairs: tokens in `src/shared/00-tokens.css` and
  inline `color: light-dark(#…, #…)` in `src/<t>/50-classes.css`. Write
  new text colours in that form so they get checked.
- `src/shared/00-tokens.css` feeds every tracker: a token change changes
  all outputs. Check each tracker in the dev server.
- Site CSS loads after ours. Win on specificity (`:root:root`, a `body`
  prefix), and note the reason in the file's header comment.
- Phone handling differs per tracker (BTN halves its viewport, PTP has
  none); read the header of `src/<t>/90-responsive.css` before touching
  breakpoints.
- Theme variants are separate files only: the stylesheet field requires a
  URL ending in `.css`, and Pages is static.

## Toolchain

No `package.json`; nothing installs into the repo. Tools run through
`npx` at pinned versions (`lightningcss-cli`, `browser-sync`); keep them
pinned. Scripts are plain Node ESM.

## Adding a tracker

Add it to `build.sh`'s loop, `TRACKERS` in `scripts/dev.mjs` and
`scripts/scrub.mjs`, and the picker in `fixtures/index.html`, then create
`src/<t>/` with the same file split. Before scrubbing its captures, run
`node scripts/scrub.mjs --shapes` and extend the secret patterns to cover
everything it lists. Capture workflow: `docs/dev-fixtures.md`.
