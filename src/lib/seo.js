/**
 * Per-page titles, descriptions and canonical URLs.
 *
 * Before this, all eight routes served the single title and description
 * written into index.html, so Google had nothing to tell the pages apart.
 *
 * These are applied client-side by usePageMeta. Google renders JavaScript
 * and will pick them up; crawlers that do not run JS (WhatsApp, Facebook,
 * LinkedIn link previews) still see the static tags in index.html, which
 * describe the site as a whole. Prerendering the routes to static HTML is
 * the proper fix for that and is tracked as a later phase.
 */

export const SITE_URL = 'https://www.barracabanas.com';
export const SITE_NAME = 'Barra Cabanas';

/** Shown when a route has no entry of its own. */
export const DEFAULT_META = {
  title: 'Barra Cabanas | Luxury Beach House Accommodation in Barra, Mozambique',
  description:
    'Self-catering luxury beach houses at Barra, Inhambane, Mozambique. Ocean views, private balconies and direct beach access. Enquire about dates and rates.',
};

export const PAGE_META = {
  '/': {
    title: 'Barra Cabanas | Luxury Beach House Accommodation in Barra, Mozambique',
    description:
      'Self-catering luxury beach houses at Barra, Inhambane, Mozambique. Ocean views, private balconies and direct beach access. Enquire about dates and rates.',
  },
  '/accommodation': {
    breadcrumb: 'Accommodation',
    title: 'Accommodation & Rates | Beachfront Holiday Houses, Barra Mozambique',
    description:
      'Fully equipped self-catering beach houses at Barra Cabanas, Mozambique. See what each house includes, the facilities on site and the add-on services on offer.',
  },
  '/gallery': {
    breadcrumb: 'Gallery',
    schemaType: 'CollectionPage',
    title: 'Photo Gallery | Barra Cabanas Beach Houses, Barra Mozambique',
    description:
      'Photographs of Barra Cabanas: the beach houses, interiors, balconies, pool and the beachfront at Barra, Inhambane. See the property before you book.',
  },
  '/activities': {
    breadcrumb: 'Activities',
    title: 'Things to Do in Barra & Tofo | Activities at Barra Cabanas',
    description:
      'Diving, snorkelling, ocean safaris, dhow trips and restaurants around Barra, Tofo and Inhambane: what our guests book most while staying at Barra Cabanas.',
  },
  '/activities/fishing': {
    breadcrumb: 'Fishing Charters',
    title: 'Deep Sea Fishing Charters in Barra, Mozambique | Barra Cabanas',
    description:
      'Deep sea and fly fishing charters from Barra, Mozambique, with Jigalouw Fishing Adventures. Marlin, sailfish and game fish seasons, rates and how to book.',
  },
  '/about': {
    breadcrumb: 'About',
    schemaType: 'AboutPage',
    title: 'About Barra Cabanas | Beach House Owners in Barra, Mozambique',
    description:
      'The story behind Barra Cabanas, our beach houses at Barra, Inhambane, and the guest services we run on site. Who we are and what to expect when you stay.',
  },
  '/faq': {
    breadcrumb: 'FAQ',
    title: 'FAQs | Barra Cabanas Beach Houses, Barra Mozambique',
    description:
      'Answers on sleeping capacity, check-in times, what to bring, the Mozambique border crossing, laundry and house rules for your stay at Barra Cabanas.',
  },
  '/contact': {
    breadcrumb: 'Contact',
    schemaType: 'ContactPage',
    title: 'Contact & Directions | Barra Cabanas, Barra Beach Mozambique',
    description:
      'Get in touch with Barra Cabanas at Barra Beach, Inhambane, Mozambique. Phone, WhatsApp and email details, plus directions and border crossing information.',
  },
  '/booking': {
    breadcrumb: 'Request a Quotation',
    title: 'Request a Quotation | Book Your Stay at Barra Cabanas',
    description:
      'Request availability and a quotation for your stay at Barra Cabanas, Barra, Mozambique. Tell us your dates and party size and we will come back to you.',
  },
};

/** Builds the absolute canonical URL for a path. */
export function canonicalUrl(pathname) {
  const clean = pathname === '/' ? '' : pathname.replace(/\/+$/, '');
  return `${SITE_URL}${clean}`;
}

/** True when the path is a real page rather than an unknown URL. */
export function isKnownRoute(pathname) {
  return Object.prototype.hasOwnProperty.call(PAGE_META, pathname);
}

export const NOT_FOUND_META = {
  title: 'Page Not Found | Barra Cabanas',
  description: 'This page could not be found. Browse our beach house accommodation at Barra, Inhambane, Mozambique, or get in touch with us directly.',
};

export function metaForPath(pathname) {
  return PAGE_META[pathname] ?? NOT_FOUND_META;
}

// The LodgingBusiness node lives in index.html and is on every page.
const LODGING_ID = `${SITE_URL}/#lodging`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const HOME_URL = `${SITE_URL}/`;

/** Home > section > page, one step per path segment. */
function breadcrumbList(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  const trail = segments.map((_, index) => `/${segments.slice(0, index + 1).join('/')}`);
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl(pathname)}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: HOME_URL },
      ...trail.map((path, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: PAGE_META[path].breadcrumb,
        item: canonicalUrl(path),
      })),
    ],
  };
}

/**
 * schema.org JSON-LD for one known route: a WebSite node on the home page, a
 * BreadcrumbList on every other page, and a typed page node (AboutPage,
 * ContactPage, CollectionPage) where the route sets schemaType.
 *
 * scripts/prerender.mjs writes this into each page's static <head> and
 * passes the build date as dateModified. It sits beside the LodgingBusiness
 * node in index.html and the FAQPage node on /faq, and replaces neither.
 */
export function structuredDataForPath(pathname, dateModified) {
  if (pathname === '/') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: HOME_URL,
      name: SITE_NAME,
      description: PAGE_META['/'].description,
      publisher: { '@id': LODGING_ID },
      dateModified,
    };
  }

  const { title, description, schemaType } = PAGE_META[pathname];
  const url = canonicalUrl(pathname);
  const breadcrumb = breadcrumbList(pathname);
  const graph = [breadcrumb];

  if (schemaType) {
    graph.unshift({
      '@type': schemaType,
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': LODGING_ID },
      breadcrumb: { '@id': breadcrumb['@id'] },
      dateModified,
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
