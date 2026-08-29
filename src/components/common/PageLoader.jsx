import './PageLoader.css';

/**
 * Fallback shown while a lazily-loaded route chunk is fetched.
 * Kept deliberately light so it never competes with the page it precedes.
 */
const PageLoader = () => (
  <div className="page-loader" role="status" aria-live="polite">
    <div className="page-loader-spinner" />
    <span className="sr-only">Loading</span>
  </div>
);

export default PageLoader;
