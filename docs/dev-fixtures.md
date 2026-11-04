# Local fixtures

Style against saved copies of tracker pages (BTN, PTP) instead of the live sites.

## One-time: SingleFile settings

Install the [SingleFile](https://github.com/gildas-lormeau/SingleFile) browser
extension and, in its options, turn these **off**:

- **Stylesheets → remove unused styles** (otherwise hover/focus/dropdown rules
  that don't match at save time are dropped)
- **HTML content → remove hidden elements** (otherwise closed menus, hidden
  settings panels and overlays are dropped)
- **HTML content → compress HTML** (optional; keeps captures readable)

Leave scripts blocked (the default), so captures never contact the site.

## Capturing

1. Browse the tracker normally and click SingleFile on each page you want. It
   saves the page as it currently is, after the site's scripts have run. Any
   site theme is fine: supermono's sheet and PTP's own theme (which an external
   stylesheet replaces) are both removed when scrubbing.
2. Clean them into fixtures:

   ```sh
   node scripts/scrub.mjs ~/Downloads/*.html
   ```

   The tracker comes from SingleFile's `url:` header; other sites are refused.
   This blanks passkeys, `authkey`/`torrent_pass`/`auth` tokens, long hex
   strings (IRC key, hashes) and, on PTP, the anti-CSRF token and API
   user/key; removes the inlined supermono stylesheet (and PTP's theme); links
   `/dist/<tracker>.css` first in `<head>`; writes
   `fixtures/captured/<tracker>/<page-title>.html`; and deletes the raw
   capture. A file it can't clean safely is skipped and kept.

   Rename captures that share a title (e.g. `browse-torrents-2.html` →
   `browse-highlight.html`).

   For a new tracker, list what looks like a secret in raw captures first. This
   prints each candidate's kind, name, host, length and character set, never
   its value:

   ```sh
   node scripts/scrub.mjs --shapes ~/Downloads/*.html
   ```

Useful BTN set: home, browse (plain, Highlight Torrents on, Color Code Torrents
on), series, forum index, forum thread, each Edit Profile tab, inbox, a user
profile, snatchlist, requests, upload, bonus.

Useful PTP set: home, browse (each view: cover, list), a movie page, forum
index, a sub-forum, a thread, inbox, a user profile, each settings tab,
seeding list, requests and one request, collections and one collection, top
10, bonus, upload.

Markup outlines for writing selectors without opening captures:
`docs/markup-skeleton.md` (BTN), `docs/markup-skeleton-ptp.md` (PTP).

## Working

```sh
node scripts/dev.mjs
```

Opens `http://localhost:3000/fixtures/`: pick a tracker, page, theme (auto/dark/light)
and width. Saving a file under `src/` rebuilds `dist/` and the new CSS is swapped
in without a reload. Touch-only rules (`zoom: 2`, 16px inputs) need DevTools
device mode.

## Privacy

`fixtures/captured/` is gitignored: captures hold other members' names and
private-tracker content, and the repo is public. The folder still syncs to
iCloud Drive with the rest of this directory. `fixtures/touch.html` is the
hand-written, publishable fixture.
