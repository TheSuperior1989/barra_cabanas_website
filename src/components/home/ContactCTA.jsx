import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ContactCTA.css';
import balconyCornerBeachview from '../../assets/images/Houses/balcony-corner-beachview.jpg';
import bedroomSuite02 from '../../assets/images/Houses/bedroom-suite-02.jpg';
import bathroomVanity02 from '../../assets/images/Houses/bathroom-vanity-02.jpg';
import livingRoomSofaShelving from '../../assets/images/Houses/living-room-sofa-shelving.jpg';
import balconyDaybedOceanview from '../../assets/images/Houses/balcony-daybed-oceanview.jpg';
import bedroomSuite03 from '../../assets/images/Houses/bedroom-suite-03.jpg';
import diningKitchenOpenplan from '../../assets/images/Houses/dining-kitchen-openplan.jpg';
import poolDeckAerialView from '../../assets/images/Houses/pool-deck-aerial-view.jpg';
import balconyNarrowOceanview from '../../assets/images/Houses/balcony-narrow-oceanview.jpg';
import bedroomSuite04 from '../../assets/images/Houses/bedroom-suite-04.jpg';
import bathroomVanity03 from '../../assets/images/Houses/bathroom-vanity-03.jpg';
import rooftopTerracePatio from '../../assets/images/Houses/rooftop-terrace-patio.jpg';

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
          <img src={balconyCornerBeachview} alt="Corner balcony with beachfront views" />
          <img src={bedroomSuite02} alt="En-suite bedroom with queen bed" />
          <img src={bathroomVanity02} alt="Modern bathroom with vanity" />
          <img src={livingRoomSofaShelving} alt="Living room with comfortable sofa and shelving" />
          <img src={balconyDaybedOceanview} alt="Balcony daybed with ocean panorama" />
          <img src={bedroomSuite03} alt="Spacious bedroom suite" />
          <img src={diningKitchenOpenplan} alt="Open plan dining and kitchen area" />
          <img src={poolDeckAerialView} alt="Private splash pool aerial view" />
          <img src={balconyNarrowOceanview} alt="Balcony with ocean view" />
          <img src={bedroomSuite04} alt="Elegant bedroom with coastal design" />
          <img src={bathroomVanity03} alt="Bathroom with modern fixtures" />
          <img src={rooftopTerracePatio} alt="Rooftop terrace patio area" />
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
          <h2 className="cta-title">Ready to Experience Luxury Beach Accommodation?</h2>
          <p className="cta-subtitle">
            Contact us today to book your stay and discover the exceptional comfort and beauty of Barra Cabanas.
          </p>
          <div className="cta-buttons">
            <Link to="/booking" className="btn btn-primary">
              Book Your Stay
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
