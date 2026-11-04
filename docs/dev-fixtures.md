# Local fixtures

Style against saved copies of BTN pages instead of the live site.

## One-time: SingleFile settings

Install the [SingleFile](https://github.com/gildas-lormeau/SingleFile) browser
extension and, in its options, turn these **off**:

- **Stylesheets → remove unused styles** (otherwise hover/focus/dropdown rules
  that don't match at save time are dropped)
- **HTML content → remove hidden elements** (otherwise closed menus, hidden
  settings panels and overlays are dropped)
- **HTML content → compress HTML** (optional; keeps captures readable)

Leave scripts blocked (the default), so captures never contact BTN.

## Capturing

1. Browse BTN normally and click SingleFile on each page you want. It saves the
   page as it currently is, after the site's scripts have run.
2. Clean them into fixtures:

   ```sh
   node scripts/scrub.mjs ~/Downloads/*BroadcasTheNet*.html
   ```

   This blanks passkeys, `authkey`/`torrent_pass`/`auth` tokens and long hex
   strings (IRC key, hashes); removes the inlined supermono stylesheet; links
   `dist/btn.css` first in `<head>`, as on BTN; writes
   `fixtures/captured/<page-title>.html`; and deletes the raw capture. A file
   it can't clean safely is skipped and kept.

   Rename captures that share a title (e.g. `browse-torrents-2.html` →
   `browse-highlight.html`).

Useful set: home, browse (plain, Highlight Torrents on, Color Code Torrents on),
series, forum index, forum thread, each Edit Profile tab, inbox, a user
profile, snatchlist, requests, upload, bonus.

## Working

```sh
node scripts/dev.mjs
```

Opens `http://localhost:3000/fixtures/`: pick a page, theme (auto/dark/light)
and width. Saving a file in `src/` rebuilds `dist/` and the new CSS is swapped
in without a reload. Touch-only rules (`zoom: 2`, 16px inputs) need DevTools
device mode.

## Privacy

`fixtures/captured/` is gitignored: captures hold other members' names and
private-tracker content, and the repo is public. The folder still syncs to
iCloud Drive with the rest of this directory. `fixtures/touch.html` is the
hand-written, publishable fixture.
