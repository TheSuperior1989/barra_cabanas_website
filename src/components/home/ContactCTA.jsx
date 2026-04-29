import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ContactCTA.css';
import newAerialResortPools from '../../assets/images/Houses/new-aerial-resort-pools.jpg';
import newHouseBeachfrontPool from '../../assets/images/Houses/new-house-beachfront-pool.jpg';
import newPoolOceanView from '../../assets/images/Houses/new-pool-ocean-view.jpg';
import newBedroomQueenSuite from '../../assets/images/Houses/new-bedroom-queen-suite.jpg';
import newBedroomTwinSuite from '../../assets/images/Houses/new-bedroom-twin-suite.jpg';
import newLivingKitchenOpenplan from '../../assets/images/Houses/new-living-kitchen-openplan.jpg';
import newLivingSofaLounge from '../../assets/images/Houses/new-living-sofa-lounge.jpg';
import newKitchenIslandPendants from '../../assets/images/Houses/new-kitchen-island-pendants.jpg';
import newKitchenOceanDoors from '../../assets/images/Houses/new-kitchen-ocean-doors.jpg';
import newBathroomBathVanity from '../../assets/images/Houses/new-bathroom-bath-vanity.jpg';
import newOutdoorPatioBraai from '../../assets/images/Houses/new-outdoor-patio-braai-ocean.jpg';
import newPatioDiningOcean from '../../assets/images/Houses/new-patio-dining-ocean.jpg';

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
          <img src={newAerialResortPools} alt="Aerial view of resort pools" />
          <img src={newHouseBeachfrontPool} alt="Beachfront house with pool" />
          <img src={newPoolOceanView} alt="Pool with ocean view" />
          <img src={newBedroomQueenSuite} alt="Queen bedroom suite" />
          <img src={newBedroomTwinSuite} alt="Twin bedroom suite" />
          <img src={newLivingKitchenOpenplan} alt="Open plan living and kitchen" />
          <img src={newLivingSofaLounge} alt="Living room sofa lounge" />
          <img src={newKitchenIslandPendants} alt="Kitchen with island and pendants" />
          <img src={newKitchenOceanDoors} alt="Kitchen with ocean doors" />
          <img src={newBathroomBathVanity} alt="Bathroom with bath and vanity" />
          <img src={newOutdoorPatioBraai} alt="Outdoor patio with braai" />
          <img src={newPatioDiningOcean} alt="Patio dining with ocean view" />
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
