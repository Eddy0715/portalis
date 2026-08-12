/**
 * Image Optimization Script
 * Converts JPG/JPEG images in public/projects to WebP format
 * - Quality: 80 (good balance of size vs quality)
 * - Max width: 2400px (preserves aspect ratio, does not upscale)
 * - Strips metadata
 * - Updates source code references
 * - Deletes originals after conversion
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const PROJECTS_DIR = path.join(ROOT, 'public', 'projects');
const SRC_DIR = path.join(ROOT, 'src');
const MAX_WIDTH = 2400;
const QUALITY = 80;

// Collect all JPG/JPEG files recursively
function collectImages(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectImages(fullPath));
    } else if (/\.(jpg|jpeg)$/i.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

// Convert a single image to WebP
async function convertToWebP(inputPath) {
  const dir = path.dirname(inputPath);
  const base = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(dir, base + '.webp');

  const originalStat = fs.statSync(inputPath);
  const originalSizeMB = (originalStat.size / (1024 * 1024)).toFixed(2);

  try {
    const img = sharp(inputPath);
    const meta = await img.metadata();

    let pipeline = img;

    // Only resize if image is wider than MAX_WIDTH — never upscale
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    await pipeline
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(outputPath);

    const newStat = fs.statSync(outputPath);
    const newSizeMB = (newStat.size / (1024 * 1024)).toFixed(2);
    const savings = (((originalStat.size - newStat.size) / originalStat.size) * 100).toFixed(1);

    console.log(`  ✅  ${path.relative(ROOT, inputPath)}`);
    console.log(`       ${originalSizeMB}MB → ${newSizeMB}MB  (${savings}% saved)`);

    return { inputPath, outputPath, originalSize: originalStat.size, newSize: newStat.size };
  } catch (err) {
    console.error(`  ❌  FAILED: ${inputPath}`, err.message);
    return null;
  }
}

// Update references in source files
function updateSourceReferences(conversions) {
  // Build a map: relative-public-path-old → relative-public-path-new
  const replacements = new Map();
  for (const c of conversions) {
    if (!c) continue;
    const relOld = '/' + path.relative(path.join(ROOT, 'public'), c.inputPath).replace(/\\/g, '/');
    const relNew = '/' + path.relative(path.join(ROOT, 'public'), c.outputPath).replace(/\\/g, '/');
    replacements.set(relOld, relNew);
  }

  // Collect source files to scan
  function collectSourceFiles(dir) {
    const results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...collectSourceFiles(fullPath));
      } else if (/\.(tsx?|jsx?|json|mjs|cjs)$/i.test(entry.name)) {
        results.push(fullPath);
      }
    }
    return results;
  }

  const sourceFiles = collectSourceFiles(SRC_DIR);
  let updatedFiles = 0;
  let updatedRefs = 0;

  for (const file of sourceFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    for (const [oldRef, newRef] of replacements) {
      // Escape special regex chars for literal matching
      const escaped = oldRef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'g');
      const count = (content.match(regex) || []).length;
      if (count > 0) {
        content = content.replace(regex, newRef);
        updatedRefs += count;
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`  📝  Updated: ${path.relative(ROOT, file)} (${updatedRefs} refs so far)`);
      updatedFiles++;
    }
  }

  return { updatedFiles, updatedRefs };
}

// Delete original JPG/JPEG files
function deleteOriginals(conversions) {
  let deleted = 0;
  for (const c of conversions) {
    if (!c) continue;
    // Verify WebP exists before deleting
    if (fs.existsSync(c.outputPath)) {
      fs.unlinkSync(c.inputPath);
      deleted++;
    } else {
      console.warn(`  ⚠️  WebP not found, keeping original: ${c.inputPath}`);
    }
  }
  return deleted;
}

// Main
async function main() {
  console.log('='.repeat(60));
  console.log('  Portalis Image Optimizer');
  console.log('='.repeat(60));
  console.log(`\n📁  Scanning: ${PROJECTS_DIR}\n`);

  const images = collectImages(PROJECTS_DIR);
  console.log(`Found ${images.length} JPG/JPEG image(s) to convert.\n`);

  let totalOriginalBytes = 0;
  let totalNewBytes = 0;
  const conversions = [];

  console.log('🔄  Converting images...\n');
  for (const imgPath of images) {
    const result = await convertToWebP(imgPath);
    if (result) {
      totalOriginalBytes += result.originalSize;
      totalNewBytes += result.newSize;
      conversions.push(result);
    }
  }

  console.log('\n📝  Updating source code references...\n');
  const { updatedFiles, updatedRefs } = updateSourceReferences(conversions);

  console.log('\n🗑️   Deleting original JPG/JPEG files...\n');
  const deleted = deleteOriginals(conversions);

  // Summary
  const totalOrigMB = (totalOriginalBytes / (1024 * 1024)).toFixed(2);
  const totalNewMB = (totalNewBytes / (1024 * 1024)).toFixed(2);
  const savedMB = ((totalOriginalBytes - totalNewBytes) / (1024 * 1024)).toFixed(2);
  const savedPct = (((totalOriginalBytes - totalNewBytes) / totalOriginalBytes) * 100).toFixed(1);

  console.log('\n' + '='.repeat(60));
  console.log('  OPTIMIZATION COMPLETE');
  console.log('='.repeat(60));
  console.log(`  Images converted:   ${conversions.length} / ${images.length}`);
  console.log(`  Size before:        ${totalOrigMB} MB`);
  console.log(`  Size after:         ${totalNewMB} MB`);
  console.log(`  Space saved:        ${savedMB} MB  (${savedPct}%)`);
  console.log(`  Source files updated: ${updatedFiles} (${updatedRefs} references)`);
  console.log(`  Originals deleted:  ${deleted}`);
  console.log('='.repeat(60));
  console.log('\nDone! Run `npm run build` to verify everything works.\n');
}

main().catch(err => {
  console.error('\n❌  Fatal error:', err);
  process.exit(1);
});
