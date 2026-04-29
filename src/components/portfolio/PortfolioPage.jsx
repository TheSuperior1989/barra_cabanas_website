import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './PortfolioPage.css';

import newAerialResortPools from '../../assets/images/Houses/new-aerial-resort-pools.jpg';
import newAerialBeachfrontOcean from '../../assets/images/Houses/new-aerial-beachfront-ocean.jpg';
import newAerialResortOverhead from '../../assets/images/Houses/new-aerial-resort-overhead.jpg';
import newHouseBeachfrontPool from '../../assets/images/Houses/new-house-beachfront-pool.jpg';
import newHousePoolPatio from '../../assets/images/Houses/new-house-pool-patio-exterior.jpg';
import newBeachAccessPalmtree from '../../assets/images/Houses/new-beach-access-palmtree.jpg';
import newPoolOceanView from '../../assets/images/Houses/new-pool-ocean-view.jpg';
import beachLoungersOceanfront from '../../assets/images/Houses/beach-loungers-oceanfront.jpg';
import beachAccessPalmtree from '../../assets/images/Houses/beach-access-palmtree.jpg';
import newOutdoorPatioBraai from '../../assets/images/Houses/new-outdoor-patio-braai-ocean.jpg';
import newPatioDiningOcean from '../../assets/images/Houses/new-patio-dining-ocean.jpg';
import newReceptionExterior from '../../assets/images/Houses/new-reception-exterior.jpg';
import newReceptionInterior from '../../assets/images/Houses/new-reception-interior.jpg';
import newBedroomQueenSuite from '../../assets/images/Houses/new-bedroom-queen-suite.jpg';
import newBedroomTwinSuite from '../../assets/images/Houses/new-bedroom-twin-suite.jpg';
import newLivingKitchenOpenplan from '../../assets/images/Houses/new-living-kitchen-openplan.jpg';
import newLivingSofaLounge from '../../assets/images/Houses/new-living-sofa-lounge.jpg';
import newKitchenIslandPendants from '../../assets/images/Houses/new-kitchen-island-pendants.jpg';
import newKitchenOceanDoors from '../../assets/images/Houses/new-kitchen-ocean-doors.jpg';
import newBathroomBathVanity from '../../assets/images/Houses/new-bathroom-bath-vanity.jpg';
import newBathroomVanityShower from '../../assets/images/Houses/new-bathroom-vanity-shower.jpg';
import parkingCarportsOverhead from '../../assets/images/Houses/parking-carports-overhead.jpg';
import jetskiStorageShelter from '../../assets/images/Houses/jetski-storage-shelter.jpg';

const galleryItems = [
  { id: 1, image: newAerialResortPools },
  { id: 2, image: newAerialBeachfrontOcean },
  { id: 3, image: newAerialResortOverhead },
  { id: 4, image: newHouseBeachfrontPool },
  { id: 5, image: newHousePoolPatio },
  { id: 6, image: newBeachAccessPalmtree },
  { id: 7, image: newPoolOceanView },
  { id: 8, image: beachLoungersOceanfront },
  { id: 9, image: beachAccessPalmtree },
  { id: 10, image: newOutdoorPatioBraai },
  { id: 11, image: newPatioDiningOcean },
  { id: 12, image: newReceptionExterior },
  { id: 13, image: newReceptionInterior },
  { id: 14, image: newBedroomQueenSuite },
  { id: 15, image: newBedroomTwinSuite },
  { id: 16, image: newLivingKitchenOpenplan },
  { id: 17, image: newLivingSofaLounge },
  { id: 18, image: newKitchenIslandPendants },
  { id: 19, image: newKitchenOceanDoors },
  { id: 20, image: newBathroomBathVanity },
  { id: 21, image: newBathroomVanityShower },
  { id: 22, image: parkingCarportsOverhead },
  { id: 23, image: jetskiStorageShelter },
];

const PortfolioPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [ref] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.45 } }
  };

  return (
    <div className="portfolio-page">
      <div className="portfolio-hero">
        <div className="portfolio-hero-overlay"></div>
        <div className="container">
          <h1 className="portfolio-hero-title">Gallery</h1>
          <p className="portfolio-hero-subtitle">
            Step inside paradise — a visual journey through Barra Cabanas
          </p>
        </div>
      </div>

      <section className="gallery-intro">
        <div className="container">
          <p className="gallery-description">
            Explore the beauty, comfort, and unforgettable atmosphere of our luxury beach accommodation. From serene sunrise views to elegant interiors and seaside moments, get inspired for your next escape to Mozambique.
          </p>
        </div>
      </section>

      <section className="portfolio-content">
        <div className="container">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="portfolio-grid"
          >
            <AnimatePresence>
              {galleryItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  className="portfolio-item"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="portfolio-image">
                    <img src={item.image} alt="Barra Cabanas" />
                    <div className="portfolio-overlay">
                      <span className="view-project">View Photo</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {selectedItem && (
        <div className="project-modal" onClick={() => setSelectedItem(null)}>
          <div className="modal-content modal-image-only" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedItem(null)}>×</button>
            <div className="modal-image">
              <img src={selectedItem.image} alt="Barra Cabanas" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
