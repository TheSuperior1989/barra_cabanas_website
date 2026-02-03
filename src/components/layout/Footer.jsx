import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
  faWhatsapp,
  faSkype,
  faTelegram
} from '@fortawesome/free-brands-svg-icons';
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleLinkClick = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="footer brand-footer">
      <div className="footer-main">
        <div className="container container--mw1320">
          <div className="footer-content">
            {/* Brand Section */}
            <div className="footer-section footer-brand">
              <div className="footer-logo">
                <h3 className="footer-brand-title">BARRA CABANAS</h3>
                <p className="footer-tagline">Simply #1 Beach Resort Experience</p>
              </div>
              <div className="social-icons">
                <a href="https://www.facebook.com/Barra.Inn.Moz" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://www.instagram.com/barra_inn.moz" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://wa.me/27662057229" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
                  <FontAwesomeIcon icon={faWhatsapp} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section footer-links-col">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('/'); }}>Home</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('/about'); }}>About</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('/services'); }}>Accommodation</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('/portfolio'); }}>Gallery</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('/contact'); }}>Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section footer-links-col">
              <h3 className="footer-title">Contact Us</h3>
              <ul className="footer-links">
                <li><a href="mailto:Bookings@barracabanas.com">Bookings@barracabanas.com</a></li>
                <li><a href="tel:+27662057229">+27 66 205 7229</a></li>
                <li><a href="tel:+258840637902">+258 840 637 902</a></li>
                <li><span>Barra, Inhambane, Mozambique</span></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-section footer-newsletter">
              <h3 className="footer-title">Remain Updated</h3>
              <form onSubmit={handleEmailSubmit} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container container--mw1320">
          <div className="footer-bottom-content">
            <p className="copyright">&copy; {currentYear}. All rights reserved.</p>
            <p className="designed-by">Built by <a href="https://www.skillaxisdynamics.co.za" target="_blank" rel="noopener noreferrer">SkillAxis Dynamics</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
