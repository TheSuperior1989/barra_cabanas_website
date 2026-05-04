import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ContactCTA.css';
import cta01 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0116.jpg';
import cta02 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0118.jpg';
import cta03 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0141.jpg';
import cta04 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0144.jpg';
import cta05 from '../../assets/images/Newest/NewestPhotosToUse/Top_View.jpg';
import cta06 from '../../assets/images/Newest/NewestPhotosToUse/20260123_124540.jpg';
import cta07 from '../../assets/images/Newest/NewestPhotosToUse/20260123_124556.jpg';
import cta08 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164201.jpg';
import cta09 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164223.jpg';
import cta10 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164432.jpg';
import cta11 from '../../assets/images/Newest/NewestPhotosToUse/FB_IMG_1774428008107.jpg';
import cta12 from '../../assets/images/Newest/NewestPhotosToUse/FB_IMG_1774428010370.jpg';

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
          <img src={cta01} alt="Aerial drone view" />
          <img src={cta02} alt="Aerial resort view" />
          <img src={cta03} alt="Overhead aerial shot" />
          <img src={cta04} alt="Drone beachfront view" />
          <img src={cta05} alt="Top aerial view" />
          <img src={cta06} alt="Barra Cabanas exterior" />
          <img src={cta07} alt="Beachfront property" />
          <img src={cta08} alt="Interior living space" />
          <img src={cta09} alt="Accommodation interior" />
          <img src={cta10} alt="Property outdoor area" />
          <img src={cta11} alt="Barra Cabanas" />
          <img src={cta12} alt="Barra Cabanas property" />
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
            <Link to="/services" className="btn btn-secondary">
              View Properties
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactCTA;
