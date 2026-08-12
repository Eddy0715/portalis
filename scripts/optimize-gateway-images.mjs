/**
 * gateway_pages Image Optimizer
 * Converts PNG images in gateway_pages/ to optimized WebP
 * - Quality: 82
 * - No unnecessary upscaling
 * - Strips metadata
 * - Deletes originals after confirming WebP exists
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const GATEWAY_DIR = path.join(ROOT, 'gateway_pages');
const QUALITY = 82;

// Collect all PNG files (flat folder, no subdirs)
function collectPNGs(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isFile() && /\.png$/i.test(e.name))
    .map(e => path.join(dir, e.name));
}

async function convertToWebP(inputPath) {
  const dir = path.dirname(inputPath);
  const base = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(dir, base + '.webp');

  const originalSize = fs.statSync(inputPath).size;

  try {
    const img = sharp(inputPath);
    const meta = await img.metadata();

    await img
      .webp({ quality: QUALITY, effort: 6, lossless: false })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    const savedPct = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
    const origMB = (originalSize / 1048576).toFixed(2);
    const newMB  = (newSize    / 1048576).toFixed(2);

    console.log(
      `  ✅  ${path.basename(inputPath).padEnd(16)}  ` +
      `${String(meta.width ?? '?').padStart(5)}×${String(meta.height ?? '?').padEnd(5)}  ` +
      `${origMB.padStart(6)} MB → ${newMB.padStart(5)} MB  (${savedPct}% saved)`
    );

    return { inputPath, outputPath, originalSize, newSize };
  } catch (err) {
    console.error(`  ❌  FAILED: ${inputPath}`, err.message);
    return null;
  }
}

function deleteOriginals(conversions) {
  let deleted = 0;
  for (const c of conversions) {
    if (!c) continue;
    if (fs.existsSync(c.outputPath)) {
      fs.unlinkSync(c.inputPath);
      deleted++;
    } else {
      console.warn(`  ⚠️  WebP missing, keeping original: ${c.inputPath}`);
    }
  }
  return deleted;
}

async function main() {
  console.log('='.repeat(68));
  console.log('  Gateway Pages PNG → WebP Optimizer');
  console.log('='.repeat(68));
  console.log(`\n📁  ${GATEWAY_DIR}\n`);

  const pngs = collectPNGs(GATEWAY_DIR);
  console.log(`Found ${pngs.length} PNG file(s).\n`);
  console.log(`${'File'.padEnd(16)}  ${'Dimensions'.padEnd(12)}  ${'Before'.padStart(8)}     ${'After'.padStart(8)}   Saved`);
  console.log('-'.repeat(68));

  let totalOrigBytes = 0;
  let totalNewBytes  = 0;
  const conversions  = [];

  for (const p of pngs) {
    const result = await convertToWebP(p);
    if (result) {
      totalOrigBytes += result.originalSize;
      totalNewBytes  += result.newSize;
      conversions.push(result);
    }
  }

  console.log(`\n🗑️   Deleting ${conversions.length} original PNG files...`);
  const deleted = deleteOriginals(conversions);

  const origMB  = (totalOrigBytes / 1048576).toFixed(2);
  const newMB   = (totalNewBytes  / 1048576).toFixed(2);
  const savedMB = ((totalOrigBytes - totalNewBytes) / 1048576).toFixed(2);
  const savedPct = (((totalOrigBytes - totalNewBytes) / totalOrigBytes) * 100).toFixed(1);

  console.log('\n' + '='.repeat(68));
  console.log('  COMPLETE');
  console.log('='.repeat(68));
  console.log(`  PNGs converted:   ${conversions.length} / ${pngs.length}`);
  console.log(`  Size before:      ${origMB} MB`);
  console.log(`  Size after:       ${newMB} MB`);
  console.log(`  Space saved:      ${savedMB} MB  (${savedPct}%)`);
  console.log(`  Originals deleted:${deleted}`);
  console.log('='.repeat(68));
  console.log('\nDone! Run `npm run build` to verify.\n');
}

main().catch(err => {
  console.error('\n❌  Fatal:', err);
  process.exit(1);
});
