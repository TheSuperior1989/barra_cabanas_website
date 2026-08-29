/**
 * Google Analytics 4 loader.
 *
 * Does nothing unless VITE_GA_MEASUREMENT_ID is set, so development and
 * preview builds stay untracked and the site works unchanged if the ID is
 * never supplied. Set it in the Vercel project's environment variables:
 *
 *   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 *
 * Page views are sent manually on route change (see trackPageView) because
 * this is a single-page app -- GA's automatic page_view only fires on the
 * first load, so without this every visit would look like one page.
 */

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let initialised = false;

export function isAnalyticsEnabled() {
  return Boolean(MEASUREMENT_ID);
}

export function initAnalytics() {
  if (initialised || !MEASUREMENT_ID) return;
  initialised = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  // Route changes are reported explicitly, so suppress the automatic one.
  gtag('config', MEASUREMENT_ID, { send_page_view: false });
}

export function trackPageView(path, title) {
  if (!MEASUREMENT_ID || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}
