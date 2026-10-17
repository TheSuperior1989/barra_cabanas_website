import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const ASSET_SOURCE_DIR = path.resolve(rootDir, 'src/assets')
const ASSET_OUTPUT_DIR = path.resolve(rootDir, 'src/assets/optimized')

const RASTER_IMAGE = /\.(jpe?g|png)$/i
const CSS_URL = /url\(\s*(['"]?)([^'")]+?\.(?:jpe?g|png))\1\s*\)/gi

const RESPONSIVE_PREFIX = '\0barra-responsive:'

/** Suffix of the generated file an import query asks for: `?thumb`, `?w=480`, or none. */
function suffixFor(query) {
  if (query === 'thumb') return '.thumb.webp'
  const width = /^w=(\d+)$/.exec(query ?? '')
  return width ? `.w${width[1]}.webp` : '.webp'
}

/**
 * Maps an absolute path to a source image onto a generated file beside it, or
 * returns null when the file sits outside src/assets.
 */
function generatedPath(absolute, suffix) {
  const relative = path.relative(ASSET_SOURCE_DIR, absolute)
  if (relative.startsWith('..') || path.isAbsolute(relative)) return null
  // Never rewrite a path that already points into the generated output.
  if (!path.relative(ASSET_OUTPUT_DIR, absolute).startsWith('..')) return null
  return path.join(ASSET_OUTPUT_DIR, relative + suffix)
}

/** Like generatedPath, but null when the file has not been generated yet. */
function resolveGenerated(absolute, suffix) {
  const generated = generatedPath(absolute, suffix)
  return generated && existsSync(generated) ? generated : null
}

/**
 * Module source for a `?responsive` import: an object ready to spread onto an
 * <img>, with the srcset built from the renditions optimize-media.mjs listed
 * in the image's .meta.json. Each rendition is imported through this same
 * plugin (`?w=480` and so on) so it is hashed and emitted like any asset.
 */
function responsiveModule(absolute, meta) {
  const rootRelative = `/${path.relative(rootDir, absolute).split(path.sep).join('/')}`
  const candidates = [
    ...meta.renditions.map((r) => ({ width: r.width, query: `?w=${r.key}` })),
    { width: meta.width, query: '' },
  ]
  const imports = candidates.map((c, i) => `import u${i} from ${JSON.stringify(rootRelative + c.query)};`)
  const srcSet = candidates.map((c, i) => `u${i} + ' ${c.width}w'`).join(', ')
  const full = `u${candidates.length - 1}`
  return [
    ...imports,
    `export default { src: ${full}, srcSet: [${srcSet}].join(', '), width: ${meta.width}, height: ${meta.height} };`,
  ].join('\n')
}

/**
 * Redirects every .jpg/.jpeg/.png reference under src/assets to the web-sized
 * WebP produced by scripts/optimize-media.mjs, so the camera originals stay in
 * the repo as master copies but are never bundled.
 *
 * Covers both JS imports (via resolveId) and CSS url() references (via a
 * transform on stylesheets, which Vite resolves through its own pipeline
 * rather than resolveId).
 *
 * Add `?thumb` to a JS import to get the small grid-tile version:
 *   import tile from '../../assets/images/Houses/beach.jpg?thumb'
 *
 * Add `?responsive` to get { src, srcSet, width, height } for a sized <img>:
 *   import photo from '../../assets/images/Houses/beach.jpg?responsive'
 *   <img {...photo} sizes="(max-width: 768px) 100vw, 400px" alt="..." />
 *
 * A missing generated file falls back to the original with a warning, so a
 * forgotten `npm run optimize:images` produces a large build, not a broken one.
 */
function optimizedImages() {
  return {
    name: 'barra-optimized-images',
    enforce: 'pre',

    resolveId(source, importer) {
      const [cleanPath, query] = source.split('?')
      if (!RASTER_IMAGE.test(cleanPath)) return null

      let absolute
      if (path.isAbsolute(cleanPath)) {
        absolute = path.resolve(rootDir, `.${cleanPath}`)
      } else if (importer) {
        absolute = path.resolve(path.dirname(importer), cleanPath)
      } else {
        return null
      }

      if (path.relative(ASSET_SOURCE_DIR, absolute).startsWith('..')) return null

      if (query === 'responsive') return RESPONSIVE_PREFIX + absolute

      const generated = resolveGenerated(absolute, suffixFor(query))
      if (generated) return generated

      this.warn(
        `No optimized image for ${path.relative(rootDir, absolute)} - shipping the original. ` +
        `Run "npm run optimize:images".`
      )
      return null
    },

    load(id) {
      if (!id.startsWith(RESPONSIVE_PREFIX)) return null
      const absolute = id.slice(RESPONSIVE_PREFIX.length)
      const metaPath = generatedPath(absolute, '.meta.json')

      if (!metaPath || !existsSync(metaPath)) {
        // Same fallback as a plain import: one image, no srcset, but a working page.
        this.warn(
          `No srcset renditions for ${path.relative(rootDir, absolute)} - serving one size. ` +
          `Run "npm run optimize:images".`
        )
        const rootRelative = `/${path.relative(rootDir, absolute).split(path.sep).join('/')}`
        return `import src from ${JSON.stringify(rootRelative)};\nexport default { src };`
      }

      return responsiveModule(absolute, JSON.parse(readFileSync(metaPath, 'utf8')))
    },

    transform(code, id) {
      const [filePath] = id.split('?')
      if (!filePath.endsWith('.css')) return null
      if (!CSS_URL.test(code)) return null
      CSS_URL.lastIndex = 0

      const cssDir = path.dirname(filePath)
      let changed = false

      const rewritten = code.replace(CSS_URL, (match, quote, url) => {
        if (/^(https?:|data:|\/\/)/i.test(url)) return match

        const absolute = url.startsWith('/')
          ? path.resolve(rootDir, `.${url}`)
          : path.resolve(cssDir, url)

        const generated = resolveGenerated(absolute, '.webp')
        if (!generated) return match

        let next = path.relative(cssDir, generated).split(path.sep).join('/')
        if (!next.startsWith('.')) next = `./${next}`
        changed = true
        return `url(${quote}${next}${quote})`
      })

      return changed ? { code: rewritten, map: null } : null
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [optimizedImages(), react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
