#!/usr/bin/env node
// Local styling loop: rebuild dist/ when src/ changes, keep fixtures/captured/index.json
// listing the captures, and serve the repo with browser-sync, which swaps in new CSS
// without a reload. Extra args go to browser-sync (e.g. --no-open).
//   node scripts/dev.mjs   ->  http://localhost:3000/fixtures/
import { spawn } from 'node:child_process';
import { watch, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const captured = join(root, 'fixtures', 'captured');
mkdirSync(captured, { recursive: true });

const writeIndex = () => writeFileSync(join(captured, 'index.json'),
  JSON.stringify(readdirSync(captured).filter((f) => f.endsWith('.html')).sort()));
writeIndex();
watch(captured, (_, file) => { if (file?.endsWith('.html')) writeIndex(); });

// One build at a time; a change during a build queues one more.
let building = false, queued = false, timer;
const build = () => {
  if (building) { queued = true; return; }
  building = true;
  spawn('bash', ['build.sh'], { cwd: root, stdio: 'inherit' }).on('exit', () => {
    building = false;
    if (queued) { queued = false; build(); }
  });
};
watch(join(root, 'src'), () => { clearTimeout(timer); timer = setTimeout(build, 100); });
build();

spawn('npx', ['--yes', 'browser-sync@3.0.4', 'start', '--server', '--files', 'dist/*.css',
  '--startPath', 'fixtures/', '--no-notify', ...process.argv.slice(2)], { cwd: root, stdio: 'inherit' });
