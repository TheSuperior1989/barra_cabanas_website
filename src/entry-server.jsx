import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import Layout from './components/layout/Layout';
import HomePage from './components/home/HomePage';
import ServicesPage from './components/services/ServicesPage';
import AboutPage from './components/about/AboutPage';
import FaqPage from './components/faq/FaqPage';
import PortfolioPage from './components/portfolio/PortfolioPage';
import ActivitiesPage from './components/activities/ActivitiesPage';
import FishingPage from './components/activities/FishingPage';
import ContactPage from './components/contact/ContactPage';
import BookingPage from './components/booking/BookingPage';
import NotFoundPage from './components/common/NotFoundPage';
import { Routes, Route, StaticRouter } from 'react-router-dom';
import './App.css';

/**
 * Server entry used only by scripts/prerender.mjs at build time.
 *
 * It deliberately mirrors App.jsx rather than importing it, because App.jsx
 * wraps everything in BrowserRouter (which needs a DOM) and lazy() (which
 * would resolve to empty markup in a single synchronous render). Routes are
 * imported eagerly here so renderToString produces complete HTML in one pass.
 *
 * The routes below are the public, indexable ones. /quote and /test are
 * intentionally excluded -- they are disallowed in robots.txt.
 *
 * Keep this list in step with App.jsx when adding a public route; the
 * prerender script asserts the two agree.
 */
export const PRERENDER_ROUTES = [
  '/',
  '/accommodation',
  '/gallery',
  '/activities',
  '/activities/fishing',
  '/about',
  '/faq',
  '/contact',
  '/booking',
];

/** Path used only to render the static 404 document. */
export const NOT_FOUND_ROUTE = '/__not-found__';

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="accommodation" element={<ServicesPage />} />
            <Route path="gallery" element={<PortfolioPage />} />
            <Route path="activities" element={<ActivitiesPage />} />
            <Route path="activities/fishing" element={<FishingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </StaticRouter>
    </StrictMode>
  );
}
