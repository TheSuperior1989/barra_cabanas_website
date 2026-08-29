import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './components/home/HomePage';
import ScrollToTop from './components/common/ScrollToTop';
import PageLoader from './components/common/PageLoader';
import './App.css';

// The home page ships in the main bundle because it is the most common entry
// point. Every other route is split out so a first-time visitor no longer
// downloads the code for pages they may never open.
const ServicesPage = lazy(() => import('./components/services/ServicesPage'));
const PortfolioPage = lazy(() => import('./components/portfolio/PortfolioPage'));
const ActivitiesPage = lazy(() => import('./components/activities/ActivitiesPage'));
const FishingPage = lazy(() => import('./components/activities/FishingPage'));
const ContactPage = lazy(() => import('./components/contact/ContactPage'));
const QuotingPage = lazy(() => import('./components/quoting/QuotingPage'));
const BookingPage = lazy(() => import('./components/booking/BookingPage'));
const SupabaseTest = lazy(() => import('./components/test/SupabaseTest'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="activities" element={<ActivitiesPage />} />
            <Route path="activities/fishing" element={<FishingPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="quote" element={<QuotingPage />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="test" element={<SupabaseTest />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
