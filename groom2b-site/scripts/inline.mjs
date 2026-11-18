// Packs dist/ into one self-contained file (dist/groom2b-preview.html) that can be
// sent to the client or opened directly from disk.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
let html = readFileSync(join(dist, 'index.html'), 'utf8');

html = html.replace(/<link rel="stylesheet"[^>]*href="\.\/(assets\/[^"]+\.css)"[^>]*>/g, (_, p) =>
  `<style>${readFileSync(join(dist, p), 'utf8')}</style>`);
html = html.replace(/<script type="module" crossorigin src="\.\/(assets\/[^"]+\.js)"><\/script>/g, (_, p) =>
  `<script type="module">${readFileSync(join(dist, p), 'utf8').replace(/<\/script/g, '<\\/script')}</script>`);

// Module scripts in <head> run deferred, so the inline version must sit after #root.
const m = html.match(/<script type="module">[\s\S]*?<\/script>/);
if (m) html = html.replace(m[0], () => '').replace('</body>', () => `${m[0]}\n</body>`);

writeFileSync(join(dist, 'groom2b-preview.html'), html);
console.log(`dist/groom2b-preview.html  ${(html.length / 1024).toFixed(0)} KB`);
