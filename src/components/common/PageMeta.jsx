import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { canonicalUrl, metaForPath, SITE_NAME } from '../../lib/seo';
import { initAnalytics, trackPageView } from '../../lib/analytics';

/** Creates the tag on first use, then reuses it on later route changes. */
function upsertTag(selector, create) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  return element;
}

function setMetaByName(name, content) {
  const tag = upsertTag(`meta[name="${name}"]`, () => {
    const el = document.createElement('meta');
    el.setAttribute('name', name);
    return el;
  });
  tag.setAttribute('content', content);
}

function setMetaByProperty(property, content) {
  const tag = upsertTag(`meta[property="${property}"]`, () => {
    const el = document.createElement('meta');
    el.setAttribute('property', property);
    return el;
  });
  tag.setAttribute('content', content);
}

function setCanonical(href) {
  const tag = upsertTag('link[rel="canonical"]', () => {
    const el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    return el;
  });
  tag.setAttribute('href', href);
}

/**
 * Keeps the document title, description, canonical URL and the Open Graph /
 * Twitter title and description in step with the current route.
 *
 * Rendered once inside the router rather than per page, so a new route only
 * needs an entry in src/lib/seo.js.
 */
const PageMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description } = metaForPath(pathname);
    const canonical = canonicalUrl(pathname);

    document.title = title;
    setMetaByName('description', description);
    setCanonical(canonical);

    setMetaByProperty('og:title', title);
    setMetaByProperty('og:description', description);
    setMetaByProperty('og:url', canonical);
    setMetaByProperty('og:site_name', SITE_NAME);
    setMetaByProperty('twitter:title', title);
    setMetaByProperty('twitter:description', description);
    setMetaByProperty('twitter:url', canonical);

    // A single-page app never reloads, so each route change is reported here.
    initAnalytics();
    trackPageView(pathname, title);
  }, [pathname]);

  return null;
};

export default PageMeta;
