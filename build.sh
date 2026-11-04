#!/usr/bin/env bash
# For each tracker, concatenate src/shared/*.css then src/<tracker>/*.css in
# order and minify to dist/:
#   dist/<t>.css        follows the OS (prefers-color-scheme)
#   dist/<t>-dark.css   always dark
#   dist/<t>-light.css  always light
# for t in btn (BTN) and ptp (PTP).
# Trackers load one stylesheet URL, so "switching" means picking a URL in site settings.
# Colours are all `light-dark()`, so forcing a scheme only changes `color-scheme`
# and how the one `@media (prefers-color-scheme: light)` block (BTN: the vader
# icon sprite) is applied; more than one such block per tracker fails the build.
# lightningcss-cli runs via npx: nothing is installed into this folder.
# Version is pinned so a new npm release can't change the build or run unreviewed code.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p dist
for t in btn ptp; do
  cat src/shared/*.css src/$t/*.css > dist/$t.src.css
  if [ "$(grep -c '@media (prefers-color-scheme: light)' dist/$t.src.css)" -gt 1 ]; then
    echo "$t: more than one prefers-color-scheme: light block" >&2
    exit 1
  fi
  perl -0pe 's/color-scheme: light dark;/color-scheme: dark;/;
             s/\@media \(prefers-color-scheme: light\) \{.*?\n\}\n//s' \
    dist/$t.src.css > dist/$t-dark.src.css
  perl -0pe 's/color-scheme: light dark;/color-scheme: light;/;
             s/\@media \(prefers-color-scheme: light\) \{\n(.*?)\n\}\n/$1\n/s' \
    dist/$t.src.css > dist/$t-light.src.css
  for v in $t $t-dark $t-light; do
    npx --yes lightningcss-cli@1.33.0 --minify --targets 'chrome 123, safari 17.5' \
      "dist/$v.src.css" -o "dist/$v.css"
    printf '%s: min %s bytes, gzip %s bytes\n' "$v" \
      "$(wc -c < "dist/$v.css" | tr -d ' ')" \
      "$(gzip -9c "dist/$v.css" | wc -c | tr -d ' ')"
  done
done
