import sharp from 'sharp';

const ESC = '\x1b';
const RESET = `${ESC}[0m`;

function fg(r: number, g: number, b: number): string {
  return `${ESC}[38;2;${r};${g};${b}m`;
}

function bg(r: number, g: number, b: number): string {
  return `${ESC}[48;2;${r};${g};${b}m`;
}

/**
 * Renders a PNG sprite as Unicode half-block characters with correct transparency.
 *
 * Uses ▀ (upper half block) and ▄ (lower half block) depending on which
 * pixels are transparent, so the terminal background shows through correctly
 * on both even and odd rows.
 */
export async function renderSprite(imagePath: string, width = 48): Promise<string> {
  const { data, info } = await sharp(imagePath)
    .resize(width, null, { fit: 'inside', kernel: 'nearest' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h } = info;
  const lines: string[] = [];

  for (let y = 0; y < h; y += 2) {
    let line = '';

    for (let x = 0; x < w; x++) {
      const ti = (y * w + x) * 4;
      const bi = ((y + 1) * w + x) * 4;

      const tR = data[ti], tG = data[ti + 1], tB = data[ti + 2], tA = data[ti + 3];

      // Bottom row may not exist if height is odd
      const hasBottom = y + 1 < h;
      const bR = hasBottom ? data[bi]     : 0;
      const bG = hasBottom ? data[bi + 1] : 0;
      const bB = hasBottom ? data[bi + 2] : 0;
      const bA = hasBottom ? data[bi + 3] : 0;

      const topClear = tA < 128;
      const botClear = bA < 128;

      if (topClear && botClear) {
        // Both transparent — emit a plain space, no color
        line += RESET + ' ';
      } else if (topClear) {
        // Only bottom visible — ▄ with fg=bottom, no bg
        line += RESET + fg(bR, bG, bB) + '▄';
      } else if (botClear) {
        // Only top visible — ▀ with fg=top, no bg
        line += RESET + fg(tR, tG, tB) + '▀';
      } else {
        // Both opaque — ▀ with fg=top, bg=bottom
        line += fg(tR, tG, tB) + bg(bR, bG, bB) + '▀';
      }
    }

    line += RESET;
    lines.push(line);
  }

  return lines.join('\n');
}
