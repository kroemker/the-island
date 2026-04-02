/**
 * Sprite preview tool — render any image file in the terminal.
 *
 * Usage:
 *   bun run test-sprite <path-to-image> [width]
 *
 * Examples:
 *   bun run test-sprite assets/monsters/goblin.png
 *   bun run test-sprite assets/monsters/dragon.png 64
 *   bun run test-sprite assets/monsters/boss.png 80
 *
 * Width is in terminal columns (characters), not pixels. Default: 48.
 * The image is scaled proportionally to fit the given width.
 */

import terminalImage from 'terminal-image';
import { existsSync } from 'fs';

const imagePath = process.argv[2];
const widthArg = process.argv[3];
const width = widthArg ? parseInt(widthArg, 10) : 48;

if (!imagePath) {
  console.error('Usage: bun run test-sprite <path-to-image> [width]');
  console.error('');
  console.error('Examples:');
  console.error('  bun run test-sprite assets/monsters/goblin.png');
  console.error('  bun run test-sprite assets/monsters/dragon.png 64');
  process.exit(1);
}

if (!existsSync(imagePath)) {
  console.error(`File not found: ${imagePath}`);
  process.exit(1);
}

if (isNaN(width) || width < 1) {
  console.error(`Invalid width: ${widthArg}. Must be a positive number.`);
  process.exit(1);
}

console.log(`\nFile  : ${imagePath}`);
console.log(`Width : ${width} columns\n`);

const rendered = await terminalImage.file(imagePath, {
  width,
  preserveAspectRatio: true,
});

console.log(rendered);
