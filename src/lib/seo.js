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
    'Self-catering luxury beach houses on the shore at Barra, Inhambane, Mozambique. Ocean views, private balconies and direct beach access. Enquire about availability and rates.',
};

export const PAGE_META = {
  '/': {
    title: 'Barra Cabanas | Luxury Beach House Accommodation in Barra, Mozambique',
    description:
      'Self-catering luxury beach houses on the shore at Barra, Inhambane, Mozambique. Ocean views, private balconies and direct beach access. Enquire about availability and rates.',
  },
  '/accommodation': {
    title: 'Accommodation & Rates | Beachfront Holiday Houses, Barra Mozambique',
    description:
      'Fully equipped self-catering beach houses at Barra Cabanas, Mozambique. See what each house includes, the facilities on site, and the add-on services available to guests.',
  },
  '/gallery': {
    title: 'Photo Gallery | Barra Cabanas Beach Houses, Barra Mozambique',
    description:
      'Photographs of Barra Cabanas: the beach houses, interiors, balconies, pool and the beachfront at Barra, Inhambane. See the property before you book.',
  },
  '/activities': {
    title: 'Things to Do in Barra & Tofo | Activities at Barra Cabanas',
    description:
      'Diving, snorkelling, ocean safaris, dhow trips and restaurants around Barra, Tofo and Inhambane — the activities our guests book most while staying at Barra Cabanas.',
  },
  '/activities/fishing': {
    title: 'Deep Sea Fishing Charters in Barra, Mozambique | Barra Cabanas',
    description:
      'Deep sea and fly fishing charters out of Barra, Mozambique, with Jigalouw Fishing Adventures. Marlin, sailfish and game fish seasons, boats, rates and how to book.',
  },
  '/about': {
    title: 'About Barra Cabanas | Beach House Owners in Barra, Mozambique',
    description:
      'The story behind Barra Cabanas, our beach houses at Barra, Inhambane, and the guest services we run on site. Who we are and what to expect when you stay.',
  },
  '/faq': {
    title: 'FAQs | Barra Cabanas Beach Houses, Barra Mozambique',
    description:
      'Answers on sleeping capacity, check-in times, what to bring, the Mozambique border crossing, laundry and house rules for your stay at Barra Cabanas.',
  },
  '/contact': {
    title: 'Contact & Directions | Barra Cabanas, Barra Beach Mozambique',
    description:
      'Get in touch with Barra Cabanas at Barra Beach, Inhambane, Mozambique. Phone, WhatsApp and email details, plus directions and border crossing information.',
  },
  '/booking': {
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
