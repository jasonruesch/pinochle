// Optimizes the app's marketing assets into public/img/ for the web.
//
//   store-shots/*.png  ->  public/img/shots/*.webp   (device screenshots)
//   gc-assets/*.png    ->  public/img/gc/*.webp       (Game Center card art)
//   Assets/Icons/icon-1024.png ->
//       public/img/app-icon.webp                      (in-page app icon)
//       public/favicon-32.png, apple-touch-icon.png,
//       icon-192.png, icon-512.png                    (favicon + PWA icons)
//
// Source lives in the app repo (a Unity project), outside this site's repo:
//   /Users/jason/code/pinoche
// Override with PINOCHE_DIR=/path/to/pinoche if it lives elsewhere. The
// optimized outputs are committed to this repo, so CI never needs the source.
//
// Run with: npm run optimize:assets

import { existsSync } from "node:fs";
import { mkdir, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = process.env.PINOCHE_DIR || join(repoRoot, "..", "..", "pinoche");

const shotsSrc = join(SRC, "Docs", "store-shots");
const gcSrc = join(SRC, "Docs", "gc-assets");
const iconSrc = join(SRC, "Assets", "Icons", "icon-1024.png");

const pub = join(repoRoot, "public");
const shotsOut = join(pub, "img", "shots");
const gcOut = join(pub, "img", "gc");

if (!existsSync(SRC)) {
  console.error(
    `\nSource app project not found at:\n  ${SRC}\n\n` +
      `Set PINOCHE_DIR to the Pinochle app repo, e.g.\n` +
      `  PINOCHE_DIR=/path/to/pinoche npm run optimize:assets\n`,
  );
  process.exit(1);
}

await mkdir(shotsOut, { recursive: true });
await mkdir(gcOut, { recursive: true });
await mkdir(join(pub, "img"), { recursive: true });

let count = 0;

// Screenshots: cap the long edge at 1600px, webp quality 78. Landscape shots,
// so this keeps them crisp on retina while cutting 0.5–1.5 MB PNGs to ~100 KB.
if (existsSync(shotsSrc)) {
  const files = (await readdir(shotsSrc)).filter((f) => f.endsWith(".png"));
  for (const file of files) {
    const out = join(shotsOut, file.replace(/\.png$/, ".webp"));
    await sharp(join(shotsSrc, file))
      .resize({
        width: 1600,
        height: 1600,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 78 })
      .toFile(out);
    count++;
  }
  console.log(`  shots:  ${files.length} -> img/shots/*.webp`);
}

// Game Center card art: 512², webp quality 82.
if (existsSync(gcSrc)) {
  const files = (await readdir(gcSrc)).filter((f) => f.endsWith(".png"));
  for (const file of files) {
    const out = join(gcOut, file.replace(/\.png$/, ".webp"));
    await sharp(join(gcSrc, file))
      .resize({
        width: 512,
        height: 512,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 82 })
      .toFile(out);
    count++;
  }
  console.log(`  gc:     ${files.length} -> img/gc/*.webp`);
}

// App icon -> in-page webp + favicon / PWA PNGs.
if (existsSync(iconSrc)) {
  await sharp(iconSrc)
    .resize(512, 512)
    .webp({ quality: 90 })
    .toFile(join(pub, "img", "app-icon.webp"));
  const pngs = [
    [32, "favicon-32.png"],
    [180, "apple-touch-icon.png"],
    [192, "icon-192.png"],
    [512, "icon-512.png"],
  ];
  for (const [size, name] of pngs) {
    await sharp(iconSrc).resize(size, size).png().toFile(join(pub, name));
  }
  count += 1 + pngs.length;
  console.log(`  icon:   -> img/app-icon.webp + favicon/PWA PNGs`);
}

console.log(`\nOptimized ${count} assets into public/.`);
