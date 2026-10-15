import { mkdir, copyFile, cp, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'dist');
const output = join(root, '_site');
const files = [
  'playground.css', 'poster.css', 'customer.css', 'recess.css', 'awards.css',
  'sports-board.css', 'awards.js', 'customer.js', 'recess.js', 'basketball-static.js',
  'gallery.css', 'mobile.css',
  'assets/club-logo-transparent.webp', 'assets/football.svg', 'assets/basketball.svg',
  'assets/chalk-grain.svg'
];
await mkdir(output, { recursive: true });
for (const name of files) {
  const target = join(output, name);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(join(source, name), target);
}
await cp(join(source, 'assets/awards'), join(output, 'assets/awards'), { recursive: true });
await cp(join(source, 'assets/gallery'), join(output, 'assets/gallery'), { recursive: true });
await cp(join(source, 'assets/documents'), join(output, 'assets/documents'), { recursive: true });
const main = (await readFile(join(source, 'playground.html'), 'utf8'))
  .replace('class="header-name" href="playground.html"', 'class="header-name" href="index.html"');
await writeFile(join(output, 'index.html'), main);
await writeFile(join(output, 'playground.html'), main);
await writeFile(join(output, '.nojekyll'), '');
console.log('GitHub Pages files prepared: club website, 13 awards, and Olympic Games album.');
