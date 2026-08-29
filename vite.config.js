import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const ASSET_SOURCE_DIR = path.resolve(rootDir, 'src/assets')
const ASSET_OUTPUT_DIR = path.resolve(rootDir, 'src/assets/optimized')

const RASTER_IMAGE = /\.(jpe?g|png)$/i
const CSS_URL = /url\(\s*(['"]?)([^'")]+?\.(?:jpe?g|png))\1\s*\)/gi

/**
 * Maps an absolute path to a source image onto its generated WebP, or returns
 * null when the file sits outside src/assets or has not been generated yet.
 */
function resolveGenerated(absolute, wantThumb) {
  const relative = path.relative(ASSET_SOURCE_DIR, absolute)
  if (relative.startsWith('..') || path.isAbsolute(relative)) return null
  // Never rewrite a path that already points into the generated output.
  if (!path.relative(ASSET_OUTPUT_DIR, absolute).startsWith('..')) return null

  const generated = path.join(ASSET_OUTPUT_DIR, relative + (wantThumb ? '.thumb.webp' : '.webp'))
  return existsSync(generated) ? generated : null
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

      const generated = resolveGenerated(absolute, query === 'thumb')
      if (generated) return generated

      this.warn(
        `No optimized image for ${path.relative(rootDir, absolute)} - shipping the original. ` +
        `Run "npm run optimize:images".`
      )
      return null
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

        const generated = resolveGenerated(absolute, false)
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
