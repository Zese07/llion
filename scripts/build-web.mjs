import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const distDir = resolve(root, 'dist');

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

for (const file of ['index.html', 'styles.css', 'app.js']) {
  await cp(resolve(root, file), resolve(distDir, file));
}

console.log('Built web assets into dist/');