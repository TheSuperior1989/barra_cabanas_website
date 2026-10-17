/**
 * Generates web-sized WebP versions of every source image, plus a small
 * thumbnail for grid tiles and narrower srcset renditions, and re-encodes
 * the hero video.
 *
 * The originals under src/assets/images stay untouched and remain the master
 * copies. Nothing in src/ imports the generated files directly -- the Vite
 * plugin in vite.config.js redirects image imports here at build time, so the
 * originals are kept in the repo but never shipped to visitors.
 *
 *   npm run optimize:images   -- images only
 *   npm run optimize:video    -- hero video only
 *   npm run optimize          -- both
 */

import { execFile } from 'node:child_process';
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import sharp from 'sharp';

const execFileAsync = promisify(execFile);

const IMAGE_SOURCE_DIR = 'src/assets';
const IMAGE_OUTPUT_DIR = 'src/assets/optimized';
// The master lives outside public/ because everything in public/ is copied
// verbatim into the build -- keeping the 62 MB original there would ship it
// to visitors even though nothing references it. The encoded file keeps the
// original filename so Hero.jsx needs no change.
const VIDEO_SOURCE = 'media-src/barra-cabanas-hero-master.mp4';
const VIDEO_OUTPUT = 'public/videos/barra-cabanas-hero.mp4';
const VIDEO_POSTER = 'public/videos/barra-cabanas-hero-poster.jpg';

// Longest edge in pixels. The lightbox never displays more than ~1600px, and
// the grid tiles render at 350x250, so these carry a comfortable margin for
// high-density screens without shipping camera-resolution files.
const FULL_MAX_EDGE = 2000;
const THUMB_MAX_EDGE = 700;
const FULL_QUALITY = 82;
const THUMB_QUALITY = 78;

// Narrower copies for srcset, so a phone fetches a 480 or 960 px file instead
// of the 2000 px master. Each is written as <name>.w<width>.webp and listed,
// with the full image's dimensions, in <name>.meta.json for the Vite plugin's
// `?responsive` import (see vite.config.js).
const RENDITION_WIDTHS = [480, 960, 1600];

// Hero video is a muted background loop, so the audio track is dropped and
// 1080p is ample -- it sits behind a dark overlay and a headline.
const VIDEO_MAX_HEIGHT = 1080;
const VIDEO_CRF = 26;
const POSTER_TIMESTAMP = '00:00:01';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);
const CONCURRENCY = 8;

const formatMb = (bytes) => `${(bytes / 1048576).toFixed(1)} MB`;

async function collectImages(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full === path.normalize(IMAGE_OUTPUT_DIR)) continue; // never re-process our own output
      found.push(...(await collectImages(full)));
    } else if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      found.push(full);
    }
  }
  return found;
}

/** Skips work when the generated file is already newer than its source. */
async function isUpToDate(source, target) {
  if (!existsSync(target)) return false;
  const [sourceStat, targetStat] = await Promise.all([stat(source), stat(target)]);
  return targetStat.mtimeMs >= sourceStat.mtimeMs;
}

/** Every file written for one source image. */
function targetsFor(source) {
  const base = path.join(IMAGE_OUTPUT_DIR, path.relative(IMAGE_SOURCE_DIR, source));
  return {
    full: `${base}.webp`,
    thumb: `${base}.thumb.webp`,
    renditions: RENDITION_WIDTHS.map((key) => ({ key, file: `${base}.w${key}.webp` })),
    meta: `${base}.meta.json`,
  };
}

async function optimizeImage(source) {
  const targets = targetsFor(source);
  const allFiles = [targets.full, targets.thumb, targets.meta, ...targets.renditions.map((r) => r.file)];

  await mkdir(path.dirname(targets.full), { recursive: true });

  const sourceBytes = (await stat(source)).size;
  const current = await Promise.all(allFiles.map((file) => isUpToDate(source, file)));
  const skipped = current.every(Boolean);

  if (!skipped) {
    // Decode the (often 20 MB) original once, at the full output size, and
    // derive every smaller copy from that in-memory master.
    const master = await sharp(source)
      .rotate()
      .resize({ width: FULL_MAX_EDGE, height: FULL_MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const encode = (file, maxEdge, quality) =>
      sharp(master.data, { raw: master.info })
        .resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true })
        .webp({ quality })
        .toFile(file);

    const [full, , ...renditions] = await Promise.all([
      encode(targets.full, FULL_MAX_EDGE, FULL_QUALITY),
      encode(targets.thumb, THUMB_MAX_EDGE, THUMB_QUALITY),
      ...targets.renditions.map((r) => encode(r.file, r.key, FULL_QUALITY)),
    ]);

    // A small source produces copies no narrower than the full image; those
    // add nothing to a srcset, so only genuinely smaller widths are listed.
    const meta = {
      width: full.width,
      height: full.height,
      renditions: targets.renditions
        .map((r, i) => ({ key: r.key, width: renditions[i].width, height: renditions[i].height }))
        .filter((r, i, all) => r.width < full.width && all.findIndex((o) => o.width === r.width) === i),
    };
    await writeFile(targets.meta, JSON.stringify(meta));
  }

  const written = await Promise.all(allFiles.map((file) => stat(file)));
  const writtenBytes = written.reduce((sum, s) => sum + s.size, 0);
  return { sourceBytes, writtenBytes, skipped };
}

/** Runs tasks with a bounded number in flight so sharp does not exhaust memory. */
async function runPooled(items, worker) {
  const results = [];
  let cursor = 0;
  const runners = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}

async function optimizeImages() {
  const sources = await collectImages(IMAGE_SOURCE_DIR);
  console.log(`Optimising ${sources.length} images -> ${IMAGE_OUTPUT_DIR}`);

  let done = 0;
  const results = await runPooled(sources, async (source) => {
    const result = await optimizeImage(source);
    done += 1;
    if (done % 25 === 0 || done === sources.length) {
      console.log(`  ${done}/${sources.length}`);
    }
    return result;
  });

  const sourceTotal = results.reduce((sum, r) => sum + r.sourceBytes, 0);
  const outputTotal = results.reduce((sum, r) => sum + r.writtenBytes, 0);
  const skipped = results.filter((r) => r.skipped).length;

  console.log(`\n  originals   ${formatMb(sourceTotal)}`);
  console.log(`  generated   ${formatMb(outputTotal)}  (full, thumbnail and srcset renditions)`);
  console.log(`  reduction   ${(100 - (outputTotal / sourceTotal) * 100).toFixed(1)}%`);
  if (skipped) console.log(`  unchanged   ${skipped} already current`);
}

async function optimizeVideo() {
  if (!existsSync(VIDEO_SOURCE)) {
    console.log(`Hero video not found at ${VIDEO_SOURCE}, skipping.`);
    return;
  }

  // Imported lazily: the deploy build runs images only, and should not
  // depend on ffmpeg-static having downloaded its binary.
  const { default: ffmpegPath } = await import('ffmpeg-static');

  console.log(`Re-encoding ${VIDEO_SOURCE}`);
  await execFileAsync(ffmpegPath, [
    '-y', '-loglevel', 'error',
    '-i', VIDEO_SOURCE,
    '-vf', `scale=-2:'min(${VIDEO_MAX_HEIGHT},ih)'`,
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', String(VIDEO_CRF),
    '-profile:v', 'high',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    '-an',
    VIDEO_OUTPUT,
  ]);

  console.log(`Extracting poster frame`);
  await execFileAsync(ffmpegPath, [
    '-y', '-loglevel', 'error',
    '-ss', POSTER_TIMESTAMP,
    '-i', VIDEO_SOURCE,
    '-frames:v', '1',
    '-vf', `scale=-2:'min(${VIDEO_MAX_HEIGHT},ih)'`,
    '-q:v', '4',
    VIDEO_POSTER,
  ]);

  const before = (await stat(VIDEO_SOURCE)).size;
  const after = (await stat(VIDEO_OUTPUT)).size;
  const poster = (await stat(VIDEO_POSTER)).size;
  console.log(`\n  before      ${formatMb(before)}`);
  console.log(`  after       ${formatMb(after)}`);
  console.log(`  poster      ${formatMb(poster)}`);
  console.log(`  reduction   ${(100 - (after / before) * 100).toFixed(1)}%`);
}

const mode = process.argv[2] ?? 'all';
if (mode === 'images' || mode === 'all') await optimizeImages();
if (mode === 'video' || mode === 'all') await optimizeVideo();
