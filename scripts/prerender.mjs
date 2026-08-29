/**
 * Writes a static HTML file for every public route, so crawlers receive real
 * content instead of an empty <div id="root">.
 *
 * Google executes JavaScript and would eventually see the site either way,
 * but most AI answer engines (Perplexity, ChatGPT Search) do not, and the
 * 29 Aug 2026 audit scored GEO 2/10 almost entirely because of this.
 *
 * Runs after `vite build`:
 *   vite build && vite build --ssr src/entry-server.jsx --outDir dist-ssr
 *     && node scripts/prerender.mjs
 *
 * Per-route <title>, description, canonical and Open Graph tags are injected
 * from src/lib/seo.js, the same source PageMeta uses on the client, so the
 * static and hydrated versions agree.
 */

import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
// Vite emits .mjs or .js depending on the package type; accept either.
const SSR_ENTRY = ['dist-ssr/entry-server.mjs', 'dist-ssr/entry-server.js']
  .map((p) => path.resolve(p))
  .find((p) => existsSync(p));
const TEMPLATE = path.join(DIST, 'index.html');

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Replaces the content of a meta tag matched by attribute, or leaves the HTML untouched. */
function setMeta(html, attr, name, content) {
  const pattern = new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`, 'i');
  return pattern.test(html) ? html.replace(pattern, `$1${escapeHtml(content)}$2`) : html;
}

async function main() {
  if (!SSR_ENTRY) {
    console.error('Missing dist-ssr/entry-server.[mjs|js]. Run the --ssr build first.');
    process.exit(1);
  }

  const { render, PRERENDER_ROUTES, NOT_FOUND_ROUTE } = await import(`file://${SSR_ENTRY}`);
  const { PAGE_META, DEFAULT_META, NOT_FOUND_META, canonicalUrl } = await import('../src/lib/seo.js');

  const template = await readFile(TEMPLATE, 'utf-8');
  if (!template.includes('<div id="root"></div>')) {
    console.error('Template no longer contains <div id="root"></div>; prerender would silently do nothing.');
    process.exit(1);
  }

  let written = 0;
  for (const route of PRERENDER_ROUTES) {
    const appHtml = render(route);
    if (!appHtml || appHtml.length < 200) {
      console.error(`  ${route} produced ${appHtml.length} chars of markup - refusing to write an empty page.`);
      process.exit(1);
    }

    const meta = PAGE_META[route] ?? DEFAULT_META;
    const canonical = canonicalUrl(route);

    let html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
    html = setMeta(html, 'name', 'title', meta.title);
    html = setMeta(html, 'name', 'description', meta.description);
    html = setMeta(html, 'property', 'og:title', meta.title);
    html = setMeta(html, 'property', 'og:description', meta.description);
    html = setMeta(html, 'property', 'og:url', canonical);
    html = setMeta(html, 'property', 'twitter:title', meta.title);
    html = setMeta(html, 'property', 'twitter:description', meta.description);
    html = setMeta(html, 'property', 'twitter:url', canonical);
    html = html.replace(
      /(<link rel="canonical" href=")[^"]*(")/i,
      `$1${escapeHtml(canonical)}$2`
    );

    const outPath =
      route === '/'
        ? path.join(DIST, 'index.html')
        : path.join(DIST, route, 'index.html');

    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf-8');
    written += 1;

    const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
    console.log(`  ${route.padEnd(21)} ${String(appHtml.length).padStart(7)} chars markup  ->  ${outPath} (${kb} KB)`);
  }

  // Static 404 document. Vercel serves dist/404.html with a real 404 status
  // for any unmatched path. Without it the SPA catch-all would hand crawlers
  // the prerendered home page at every junk URL -- a duplicate of the whole
  // site, marked indexable.
  const notFoundHtml = render(NOT_FOUND_ROUTE);
  let html404 = template.replace(
    '<div id="root"></div>',
    `<div id="root">${notFoundHtml}</div>`
  );
  html404 = html404.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${escapeHtml(NOT_FOUND_META.title)}</title>`
  );
  html404 = setMeta(html404, 'name', 'description', NOT_FOUND_META.description);
  html404 = setMeta(html404, 'name', 'robots', 'noindex, follow');
  // A 404 is not a canonical page; pointing it at the home page would merge
  // every junk URL into the home page's signals.
  html404 = html404.replace(/\s*<link rel="canonical" href="[^"]*" \/>/i, '');
  await writeFile(path.join(DIST, '404.html'), html404, 'utf-8');
  console.log(`  ${'404'.padEnd(21)} ${String(notFoundHtml.length).padStart(7)} chars markup  ->  dist\\404.html`);

  await rm('dist-ssr', { recursive: true, force: true });
  console.log(`\nPrerendered ${written} routes plus a static 404.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
