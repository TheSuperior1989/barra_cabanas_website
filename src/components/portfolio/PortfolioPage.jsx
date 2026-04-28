import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './PortfolioPage.css';

// Aerial Views
import newAerialResortPools from '../../assets/images/Houses/new-aerial-resort-pools.jpg';
import newAerialBeachfrontOcean from '../../assets/images/Houses/new-aerial-beachfront-ocean.jpg';
import newAerialResortOverhead from '../../assets/images/Houses/new-aerial-resort-overhead.jpg';

// Exterior & Beach
import newHouseBeachfrontPool from '../../assets/images/Houses/new-house-beachfront-pool.jpg';
import newHousePoolPatio from '../../assets/images/Houses/new-house-pool-patio-exterior.jpg';

// Beach & Views
import newBeachAccessPalmtree from '../../assets/images/Houses/new-beach-access-palmtree.jpg';
import newPoolOceanView from '../../assets/images/Houses/new-pool-ocean-view.jpg';
import beachLoungersOceanfront from '../../assets/images/Houses/beach-loungers-oceanfront.jpg';
import beachAccessPalmtree from '../../assets/images/Houses/beach-access-palmtree.jpg';

// Outdoor Living
import newOutdoorPatioBraai from '../../assets/images/Houses/new-outdoor-patio-braai-ocean.jpg';
import newPatioDiningOcean from '../../assets/images/Houses/new-patio-dining-ocean.jpg';

// Reception & Entrance
import newReceptionExterior from '../../assets/images/Houses/new-reception-exterior.jpg';
import newReceptionInterior from '../../assets/images/Houses/new-reception-interior.jpg';

// Bedrooms
import newBedroomQueenSuite from '../../assets/images/Houses/new-bedroom-queen-suite.jpg';
import newBedroomTwinSuite from '../../assets/images/Houses/new-bedroom-twin-suite.jpg';

// Living Spaces
import newLivingKitchenOpenplan from '../../assets/images/Houses/new-living-kitchen-openplan.jpg';
import newLivingSofaLounge from '../../assets/images/Houses/new-living-sofa-lounge.jpg';

// Kitchen & Dining
import newKitchenIslandPendants from '../../assets/images/Houses/new-kitchen-island-pendants.jpg';
import newKitchenOceanDoors from '../../assets/images/Houses/new-kitchen-ocean-doors.jpg';

// Bathrooms
import newBathroomBathVanity from '../../assets/images/Houses/new-bathroom-bath-vanity.jpg';
import newBathroomVanityShower from '../../assets/images/Houses/new-bathroom-vanity-shower.jpg';

// Facilities
import parkingCarportsOverhead from '../../assets/images/Houses/parking-carports-overhead.jpg';
import jetskiStorageShelter from '../../assets/images/Houses/jetski-storage-shelter.jpg';

const galleryItems = [
  // Aerial Views
  { id: 1, title: 'Photo 1', category: 'Aerial Views', image: newAerialResortPools },
  { id: 2, title: 'Photo 2', category: 'Aerial Views', image: newAerialBeachfrontOcean },
  { id: 3, title: 'Photo 3', category: 'Aerial Views', image: newAerialResortOverhead },

  // Exterior Views
  { id: 4, title: 'Photo 4', category: 'Exterior Views', image: newHouseBeachfrontPool },
  { id: 5, title: 'Photo 5', category: 'Exterior Views', image: newHousePoolPatio },

  // Beach & Views
  { id: 6, title: 'Photo 6', category: 'Beach & Views', image: newBeachAccessPalmtree },
  { id: 7, title: 'Photo 7', category: 'Beach & Views', image: newPoolOceanView },
  { id: 8, title: 'Photo 8', category: 'Beach & Views', image: beachLoungersOceanfront },
  { id: 9, title: 'Photo 9', category: 'Beach & Views', image: beachAccessPalmtree },

  // Outdoor Living
  { id: 10, title: 'Photo 10', category: 'Outdoor Living', image: newOutdoorPatioBraai },
  { id: 11, title: 'Photo 11', category: 'Outdoor Living', image: newPatioDiningOcean },

  // Reception
  { id: 12, title: 'Photo 12', category: 'Reception', image: newReceptionExterior },
  { id: 13, title: 'Photo 13', category: 'Reception', image: newReceptionInterior },

  // Bedrooms
  { id: 14, title: 'Photo 14', category: 'Bedrooms', image: newBedroomQueenSuite },
  { id: 15, title: 'Photo 15', category: 'Bedrooms', image: newBedroomTwinSuite },

  // Living Spaces
  { id: 16, title: 'Photo 16', category: 'Living Spaces', image: newLivingKitchenOpenplan },
  { id: 17, title: 'Photo 17', category: 'Living Spaces', image: newLivingSofaLounge },

  // Kitchen & Dining
  { id: 18, title: 'Photo 18', category: 'Kitchen & Dining', image: newKitchenIslandPendants },
  { id: 19, title: 'Photo 19', category: 'Kitchen & Dining', image: newKitchenOceanDoors },

  // Bathrooms
  { id: 20, title: 'Photo 20', category: 'Bathrooms', image: newBathroomBathVanity },
  { id: 21, title: 'Photo 21', category: 'Bathrooms', image: newBathroomVanityShower },

  // Facilities
  { id: 22, title: 'Photo 22', category: 'Facilities', image: parkingCarportsOverhead },
  { id: 23, title: 'Photo 23', category: 'Facilities', image: jetskiStorageShelter },
];

const categories = [
  'All',
  'Aerial Views',
  'Beach & Views',
  'Exterior Views',
  'Outdoor Living',
  'Reception',
  'Bedrooms',
  'Living Spaces',
  'Kitchen & Dining',
  'Bathrooms',
  'Facilities',
];

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredGalleryItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const [ref] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
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
          <div className="portfolio-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="portfolio-grid"
          >
            <AnimatePresence>
              {filteredGalleryItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                  className="portfolio-item"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="portfolio-image">
                    <img src={item.image} alt={item.title} />
                    <div className="portfolio-overlay">
                      <span className="view-project">View Photo</span>
                    </div>
                  </div>
                  <div className="portfolio-info">
                    <span className="portfolio-category">{item.category}</span>
                    <h3 className="portfolio-title">{item.title}</h3>
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
              <img src={selectedItem.image} alt={selectedItem.title} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
