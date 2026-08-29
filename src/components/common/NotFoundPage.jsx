import { Link } from 'react-router-dom';
import './NotFoundPage.css';

/**
 * Catch-all page for unknown URLs.
 *
 * Before this, every path -- including nonsense ones -- returned a blank page,
 * which search engines treat as a thin duplicate and may index. PageMeta adds
 * a noindex robots tag for this route so junk URLs stay out of the index.
 */
const NotFoundPage = () => (
  <div className="notfound-page">
    <div className="container notfound-inner">
      <p className="notfound-code">404</p>
      <h1 className="notfound-title">This page has drifted off</h1>
      <p className="notfound-text">
        The page you were looking for is not here. It may have moved, or the link
        may be out of date.
      </p>
      <div className="notfound-actions">
        <Link to="/" className="btn btn-primary">Back to Home</Link>
        <Link to="/accommodation" className="btn btn-secondary">View Accommodation</Link>
      </div>
      <p className="notfound-help">
        Looking for something specific? <Link to="/contact">Get in touch</Link> and
        we will point you the right way.
      </p>
    </div>
  </div>
);

export default NotFoundPage;
