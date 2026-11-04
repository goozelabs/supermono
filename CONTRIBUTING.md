# Contributing

Bug reports and pull requests are welcome.

## Reporting a bug

Open an issue with:

- the tracker and page (e.g. "BTN, series page")
- which file you load: auto, dark or light, and which scheme your system is in
- browser and device
- a screenshot, if you can

Before posting a screenshot or markup, crop or blank anything that
identifies you or other members: usernames, avatars, stats, passkeys,
torrent names from your own lists.

## Pull requests

You need Node and `npx`; there is nothing to install.

1. Edit files under `src/`: `src/shared/` for tokens used by every tracker,
   `src/<tracker>/` for the rest. Leave `dist/` to the build.
2. Work against saved pages, not the live site: see
   [docs/dev-fixtures.md](docs/dev-fixtures.md) to capture and scrub them,
   then run `node scripts/dev.mjs`.
3. Run the checks:

   ```sh
   bash build.sh
   node scripts/contrast.mjs
   node --test scripts/
   ```

4. Commit the rebuilt `dist/*.css` with your `src/` change. Pages publishes
   `dist/` as committed on `main`.

### Rules

- Colours use `light-dark(light, dark)` and every text colour passes WCAG AA
  (4.5:1) in both schemes; `contrast.mjs` checks this.
- A token change in `src/shared/` affects every tracker; check each one.
- Never commit captured pages, or text, names or values copied from them.
  `fixtures/captured/` is gitignored for that reason. Selectors and the tag
  outlines in `docs/markup-skeleton*.md` are fine.
- Keep the toolchain as it is: bash, perl, plain Node scripts, and `npx`
  tools at pinned versions. No `package.json` or new dependencies.
