#!/usr/bin/env bash
# Concatenate src/*.css in order and minify to dist/.
#   dist/btn.css        follows the OS (prefers-color-scheme)
#   dist/btn-dark.css   always dark
#   dist/btn-light.css  always light
# BTN loads one stylesheet URL, so "switching" means picking a URL in BTN settings.
# Colours are all `light-dark()`, so forcing a scheme only changes `color-scheme`
# and how the vader icon-sprite rule (an `@media` block) is applied.
# lightningcss-cli runs via npx: nothing is installed into this folder.
# Version is pinned so a new npm release can't change the build or run unreviewed code.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p dist
cat src/*.css > dist/btn.src.css
perl -0pe 's/color-scheme: light dark;/color-scheme: dark;/;
           s/\@media \(prefers-color-scheme: light\) \{.*?\n\}\n//s' \
  dist/btn.src.css > dist/btn-dark.src.css
perl -0pe 's/color-scheme: light dark;/color-scheme: light;/;
           s/\@media \(prefers-color-scheme: light\) \{\n(.*?)\n\}\n/$1\n/s' \
  dist/btn.src.css > dist/btn-light.src.css
for v in btn btn-dark btn-light; do
  npx --yes lightningcss-cli@1.33.0 --minify --targets 'chrome 123, safari 17.5' \
    "dist/$v.src.css" -o "dist/$v.css"
  printf '%s: min %s bytes, gzip %s bytes\n' "$v" \
    "$(wc -c < "dist/$v.css" | tr -d ' ')" \
    "$(gzip -9c "dist/$v.css" | wc -c | tr -d ' ')"
done
