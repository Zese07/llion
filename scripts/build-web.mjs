import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const distDir = resolve(root, 'dist');

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

for (const file of ['index.html', 'styles.css']) {
  await cp(resolve(root, file), resolve(distDir, file));
}

await cp(resolve(root, 'src'), resolve(distDir, 'src'), { recursive: true });

console.log('Built web assets into dist/');