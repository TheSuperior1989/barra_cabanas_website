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
 *
 * Every route except the home page is a lazy() chunk with its own stylesheet.
 * Left alone, that stylesheet only arrives after the main bundle has run, so
 * the static markup has no page styles and the banner (a CSS background)
 * cannot be requested until then. Each page therefore links its route's
 * stylesheet and chunk, and preloads its banner, straight from the <head>.
 * The file names come from Vite's build manifest (build.manifest in
 * vite.config.js), which is deleted afterwards so it is not deployed.
 *
 * The build date is stamped in two places so crawlers can see how fresh the
 * site is: dateModified in each page's JSON-LD, and every <lastmod> in
 * dist/sitemap.xml (public/sitemap.xml only holds a placeholder date).
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
const SITEMAP = path.join(DIST, 'sitemap.xml');
const MANIFEST_DIR = path.join(DIST, '.vite');
const MANIFEST = path.join(MANIFEST_DIR, 'manifest.json');
const HEAD_END = '</head>';
/** Public path the built files are served from: Vite's `base`, left at its default. */
const BASE = '/';
/** A photo set as a CSS background, as it appears in a built stylesheet. */
const PHOTO_BACKGROUND = /background-image:\s*url\(\s*["']?([^"')\s]+\.(?:webp|jpe?g|png))["']?\s*\)/i;

/** One date (UTC, YYYY-MM-DD) for every "last changed" signal this build emits. */
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * A JSON-LD script tag. The JSON is not HTML-escaped, because that would stop
 * it parsing; only "<" is written as \u003c so no value can close the tag.
 */
const jsonLdScript = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

/** Sets every <lastmod> in the built sitemap to the build date. */
async function stampSitemap(expectedUrls) {
  const sitemap = await readFile(SITEMAP, 'utf-8');
  let stamped = 0;
  const dated = sitemap.replace(/<lastmod>[^<]*<\/lastmod>/g, () => {
    stamped += 1;
    return `<lastmod>${BUILD_DATE}</lastmod>`;
  });
  if (stamped !== expectedUrls) {
    console.error(`sitemap.xml has ${stamped} <lastmod> entries but ${expectedUrls} routes were prerendered; the two lists have drifted.`);
    process.exit(1);
  }
  await writeFile(SITEMAP, dated, 'utf-8');
  console.log(`  ${'sitemap.xml'.padEnd(21)} ${stamped} lastmod entries set to ${BUILD_DATE}`);
}

/**
 * Files a manifest chunk needs before it can run: everything it statically
 * imports, then the chunk itself, in that order.
 */
function chunkFiles(manifest, key, seen = new Set()) {
  const files = { js: [], css: [] };
  const chunk = manifest[key];
  if (!chunk || seen.has(key)) return files;
  seen.add(key);
  for (const imported of chunk.imports ?? []) {
    const needed = chunkFiles(manifest, imported, seen);
    files.js.push(...needed.js);
    files.css.push(...needed.css);
  }
  files.js.push(chunk.file);
  files.css.push(...(chunk.css ?? []));
  return files;
}

/** Reads Vite's build manifest and lists the files the main bundle already loads. */
async function loadManifest() {
  if (!existsSync(MANIFEST)) {
    console.error(`Missing ${MANIFEST}. build.manifest must stay on in vite.config.js, and the client build must run first.`);
    process.exit(1);
  }
  const manifest = JSON.parse(await readFile(MANIFEST, 'utf-8'));
  const entry = Object.keys(manifest).find((key) => manifest[key].isEntry);
  if (!entry) {
    console.error('The build manifest has no entry chunk; cannot tell which files the main bundle loads.');
    process.exit(1);
  }
  const { js, css } = chunkFiles(manifest, entry);
  return { manifest, shipped: new Set([...js, ...css]) };
}

/**
 * Every style rule in a built stylesheet as { selector, body, media }, where
 * media is the condition of the @media block around it ('' at the top level).
 */
function styleRules(css) {
  const rules = [];
  const blocks = [];
  const token = /(@[^{};]+)\{|([^{};]+)\{([^{}]*)\}|\}/g;
  for (let match = token.exec(css); match; match = token.exec(css)) {
    if (match[1]) {
      blocks.push(match[1].trim());
    } else if (match[2]) {
      const media = blocks
        .filter((block) => block.startsWith('@media'))
        .map((block) => block.slice('@media'.length).trim());
      rules.push({ selector: match[2].trim(), body: match[3], media: media.join(' and ') });
    } else {
      blocks.pop();
    }
  }
  return rules;
}

/** The opposite of one media query, or null when it cannot be written as one. */
function negateMedia(media) {
  if (!media || /,|\b(not|only)\b/i.test(media)) return null;
  return media.startsWith('(') ? `not all and ${media}` : `not ${media}`;
}

/**
 * <link rel="preload"> tags for a page banner. The banner is a CSS background,
 * so the browser cannot ask for it until every stylesheet (including the web
 * font sheet that index.css imports) has loaded; a preload starts it with the
 * HTML instead.
 *
 * The banner is taken to be the first rule in the route's stylesheet that
 * sets a photo background on a single class the static markup uses. If one
 * @media rule swaps the photo for the same class (a smaller file on phones),
 * each file is preloaded under the matching condition. Anything less clear
 * gets no preload: that costs speed, but it can never fetch a file the page
 * does not use.
 */
function bannerPreloads(css, appHtml) {
  const photoRules = styleRules(css)
    .map((rule) => ({ ...rule, url: PHOTO_BACKGROUND.exec(rule.body)?.[1] }))
    .filter((rule) => rule.url);
  const banner = photoRules[0];
  if (!banner || banner.media || !/^\.[\w-]+$/.test(banner.selector)) return [];
  if (!new RegExp(`class="[^"]*\\b${banner.selector.slice(1)}\\b`).test(appHtml)) return [];

  const preload = (url, media) =>
    `<link rel="preload" as="image" href="${escapeHtml(url)}"${media ? ` media="${escapeHtml(media)}"` : ''} fetchpriority="high">`;
  const swaps = photoRules.filter((rule) => rule !== banner && rule.selector === banner.selector);
  if (swaps.length === 0) return [preload(banner.url)];

  const otherwise = swaps.length === 1 ? negateMedia(swaps[0].media) : null;
  if (!otherwise) return [];
  return [preload(swaps[0].url, swaps[0].media), preload(banner.url, otherwise)];
}

/**
 * Head tags that let a lazy route's static page stand on its own: the banner
 * preload, the route's stylesheets and its script chunks. `shipped` holds the
 * files the main bundle already brings in, which must not be linked twice.
 *
 * The hrefs are written exactly as Vite's own loader will ask for them
 * (BASE + file): it skips a file only when a <link> with that exact href is
 * already in the document, so any other spelling would load the file twice.
 */
async function routeHeadTags(manifest, shipped, source, appHtml) {
  const needed = chunkFiles(manifest, source);
  const css = needed.css.filter((file) => !shipped.has(file));
  const js = needed.js.filter((file) => !shipped.has(file));
  const sheets = await Promise.all(css.map((file) => readFile(path.join(DIST, file), 'utf-8')));
  return {
    css,
    tags: [
      ...bannerPreloads(sheets.join('\n'), appHtml),
      ...css.map((file) => `<link rel="stylesheet" crossorigin href="${BASE}${file}">`),
      ...js.map((file) => `<link rel="modulepreload" crossorigin href="${BASE}${file}">`),
    ],
  };
}

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

  const { render, PRERENDER_ROUTES, NOT_FOUND_ROUTE, ROUTE_SOURCES } = await import(`file://${SSR_ENTRY}`);
  const { PAGE_META, DEFAULT_META, NOT_FOUND_META, canonicalUrl, structuredDataForPath } = await import('../src/lib/seo.js');

  const template = await readFile(TEMPLATE, 'utf-8');
  if (!template.includes('<div id="root"></div>')) {
    console.error('Template no longer contains <div id="root"></div>; prerender would silently do nothing.');
    process.exit(1);
  }
  if (!template.includes(HEAD_END)) {
    console.error('Template no longer contains </head>; the page JSON-LD would silently be left out.');
    process.exit(1);
  }

  const { manifest, shipped } = await loadManifest();

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
    const headTags = [jsonLdScript(structuredDataForPath(route, BUILD_DATE))];
    // The home page ships in the main bundle; every other route is a lazy chunk.
    if (route !== '/') {
      const linked = await routeHeadTags(manifest, shipped, ROUTE_SOURCES[route], appHtml);
      if (linked.css.length === 0) {
        console.error(`  ${route} has no stylesheet in the build manifest. Check its entry in ROUTE_SOURCES (src/entry-server.jsx): it must name the file App.jsx loads with lazy().`);
        process.exit(1);
      }
      headTags.push(...linked.tags);
    }
    // A function replacer, so a "$" in the data is never read as a pattern.
    html = html.replace(HEAD_END, () => `  ${headTags.join('\n    ')}\n  ${HEAD_END}`);

    const outPath =
      route === '/'
        ? path.join(DIST, 'index.html')
        : path.join(DIST, route, 'index.html');

    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf-8');
    written += 1;

    const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
    console.log(`  ${route.padEnd(21)} ${String(appHtml.length).padStart(7)} chars markup  ->  ${outPath} (${kb} KB, ${headTags.length - 1} route links)`);
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

  await stampSitemap(written);

  await rm('dist-ssr', { recursive: true, force: true });
  // The manifest lists source paths and has done its job; keep it out of the deploy.
  await rm(MANIFEST_DIR, { recursive: true, force: true });
  console.log(`\nPrerendered ${written} routes plus a static 404.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
