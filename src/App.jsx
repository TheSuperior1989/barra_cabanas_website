import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './components/home/HomePage';
import ScrollToTop from './components/common/ScrollToTop';
import PageLoader from './components/common/PageLoader';
import PageMeta from './components/common/PageMeta';
import NotFoundPage from './components/common/NotFoundPage';
import './App.css';

// The home page ships in the main bundle because it is the most common entry
// point. Every other route is split out so a first-time visitor no longer
// downloads the code for pages they may never open.
const ServicesPage = lazy(() => import('./components/services/ServicesPage'));
const AboutPage = lazy(() => import('./components/about/AboutPage'));
const FaqPage = lazy(() => import('./components/faq/FaqPage'));
const PortfolioPage = lazy(() => import('./components/portfolio/PortfolioPage'));
const ActivitiesPage = lazy(() => import('./components/activities/ActivitiesPage'));
const FishingPage = lazy(() => import('./components/activities/FishingPage'));
const ContactPage = lazy(() => import('./components/contact/ContactPage'));
const BookingPage = lazy(() => import('./components/booking/BookingPage'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <PageMeta />
      <Suspense fallback={<PageLoader />}>
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

            {/* Renamed routes. Vercel issues a 301 for direct hits; these
                cover in-app navigation from any older cached page. */}
            <Route path="services" element={<Navigate to="/accommodation" replace />} />
            <Route path="portfolio" element={<Navigate to="/gallery" replace />} />

            {/* Anything else. Kept last so it only matches unknown paths. */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
