// Turns the SPA build into something a search engine can actually index.
//
// GitHub Pages has no server-side rewrite: it serves a file or it serves
// 404.html. Every route but "/" therefore answers with a real HTTP 404 status,
// and the SPA fallback in 404.html only repairs that *after* JavaScript runs —
// too late for a crawler, which has already recorded a missing page. That is
// fatal for /how-to-play, whose whole job is to be found in search.
//
// So after `vite build`, copy dist/index.html to a directory per route and
// stamp each copy with that route's own <title>, description and canonical
// (from the same PAGES table the runtime hook uses). GitHub Pages then answers
// /how-to-play/ with 200 and correct metadata before a line of JS executes;
// React Router takes over from there and renders the same page. Also emits
// sitemap.xml from the same table so the URL list can't drift either.
//
// Runs as part of `npm run build`.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalUrl, PAGES } from "../src/app/_lib/seo.ts";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(repoRoot, "dist");

const shell = await readFile(join(dist, "index.html"), "utf8");

/** Replace a whole tag when it's there, otherwise append to <head>. */
function upsert(html, pattern, tag) {
  return pattern.test(html)
    ? html.replace(pattern, tag)
    : html.replace("</head>", `    ${tag}\n  </head>`);
}

function withMeta(html, path, { title, description, noindex }) {
  const url = canonicalUrl(path);
  let out = html;
  out = out.replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`);
  out = upsert(
    out,
    /<meta\s+name="description"[^>]*>/s,
    `<meta name="description" content="${escape(description)}" />`,
  );
  out = upsert(
    out,
    /<meta\s+property="og:title"[^>]*>/s,
    `<meta property="og:title" content="${escape(title)}" />`,
  );
  out = upsert(
    out,
    /<meta\s+property="og:description"[^>]*>/s,
    `<meta property="og:description" content="${escape(description)}" />`,
  );
  out = upsert(
    out,
    /<meta\s+property="og:url"[^>]*>/s,
    `<meta property="og:url" content="${url}" />`,
  );
  out = upsert(
    out,
    /<link\s+rel="canonical"[^>]*>/s,
    noindex ? "" : `<link rel="canonical" href="${url}" />`,
  );
  return out;
}

/** Minimal escaping — these strings land inside a double-quoted attribute. */
function escape(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const written = [];
for (const [path, seo] of Object.entries(PAGES)) {
  const html = withMeta(shell, path, seo);
  // "/" is dist/index.html itself; every other route gets its own directory,
  // which is the form GitHub Pages redirects the bare path to.
  const file =
    path === "/"
      ? join(dist, "index.html")
      : join(dist, path.replace(/^\//, ""), "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  written.push(path);
}

const urls = Object.entries(PAGES)
  .filter(([, seo]) => !seo.noindex)
  .map(([path]) => `  <url><loc>${canonicalUrl(path)}</loc></url>`)
  .join("\n");

await writeFile(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

console.log(
  `build-routes: wrote ${written.length} route pages (${written.join(", ")}) + sitemap.xml`,
);
