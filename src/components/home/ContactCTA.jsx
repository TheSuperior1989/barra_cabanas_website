import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ContactCTA.css';
import cta01 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0116.jpg?responsive';
import cta02 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0118.jpg?responsive';
import cta03 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0141.jpg?responsive';
import cta04 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0144.jpg?responsive';
import cta05 from '../../assets/images/Newest/NewestPhotosToUse/Top_View.jpg?responsive';
import cta06 from '../../assets/images/Newest/NewestPhotosToUse/20260123_124540.jpg?responsive';
import cta07 from '../../assets/images/Newest/NewestPhotosToUse/20260123_124556.jpg?responsive';
import cta08 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164201.jpg?responsive';
import cta09 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164223.jpg?responsive';
import cta10 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164432.jpg?responsive';
import cta11 from '../../assets/images/Newest/NewestPhotosToUse/FB_IMG_1774428008107.jpg?responsive';
import cta12 from '../../assets/images/Newest/NewestPhotosToUse/FB_IMG_1774428010370.jpg?responsive';

const ContactCTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section className="contact-cta">
      {/* Scrolling Images Background */}
      <div className="scrolling-images">
        <div className="image-track">
          <img {...cta01} sizes="(max-width: 768px) 300px, 400px" alt="Aerial drone view" decoding="async" />
          <img {...cta02} sizes="(max-width: 768px) 300px, 400px" alt="Aerial resort view" decoding="async" />
          <img {...cta03} sizes="(max-width: 768px) 300px, 400px" alt="Overhead aerial shot" decoding="async" />
          <img {...cta04} sizes="(max-width: 768px) 300px, 400px" alt="Drone beachfront view" decoding="async" />
          <img {...cta05} sizes="(max-width: 768px) 300px, 400px" alt="Top aerial view" decoding="async" />
          <img {...cta06} sizes="(max-width: 768px) 300px, 400px" alt="Barra Cabanas exterior" decoding="async" />
          <img {...cta07} sizes="(max-width: 768px) 300px, 400px" alt="Beachfront property" decoding="async" />
          <img {...cta08} sizes="(max-width: 768px) 300px, 400px" alt="Interior living space" decoding="async" />
          <img {...cta09} sizes="(max-width: 768px) 300px, 400px" alt="Accommodation interior" decoding="async" />
          <img {...cta10} sizes="(max-width: 768px) 300px, 400px" alt="Property outdoor area" decoding="async" />
          <img {...cta11} sizes="(max-width: 768px) 300px, 400px" alt="Barra Cabanas" decoding="async" />
          <img {...cta12} sizes="(max-width: 768px) 300px, 400px" alt="Barra Cabanas property" decoding="async" />
        </div>
      </div>

      {/* CTA Content Overlay */}
      <div className="cta-overlay"></div>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container"
      >
        <div className="cta-content">
          <h2 className="cta-title">Experience Luxury Beach Houses</h2>
          <p className="cta-subtitle">
            Welcome to our collection of nine modern beachfront cabanas, designed for memorable seaside stays. Each cabana features six en-suite, air-conditioned bedrooms, a private pool, and relaxed modern interiors—perfect for families and groups. From sunrise over the ocean to sunset by the pool, there's space for everyone to truly unwind, with easy access—no 4x4 needed.
          </p>
          <div className="cta-buttons">
            <Link to="/booking" className="btn btn-primary">
              Request a Quotation
            </Link>
            <Link to="/accommodation" className="btn btn-secondary">
              View Properties
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactCTA;
