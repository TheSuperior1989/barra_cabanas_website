import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// scripts/prerender.mjs writes real markup into #root at build time so that
// crawlers -- especially AI answer engines, which do not run JavaScript --
// receive complete content instead of an empty shell.
//
// The browser deliberately client-renders over that markup rather than
// hydrating it. Two reasons: the page-load animations (framer-motion mounts
// every section from initial={{ opacity: 0 }}) are part of the design and
// hydration would skip them, and hydrating markup produced by a route tree
// that uses lazy() reports a mismatch and is discarded anyway. Client
// rendering keeps runtime behaviour identical to before prerendering, while
// the static HTML still does its job for search.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
