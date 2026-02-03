import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './PortfolioPage.css';
import exteriorBeachfrontConstruction from '../../assets/images/Houses/exterior-beachfront-construction.jpg';
import bedroomSuite05 from '../../assets/images/Houses/bedroom-suite-05.jpg';
import beachPalmTreesView from '../../assets/images/Houses/beach-palm-trees-view.jpg';
import loungeBalconyOceanview from '../../assets/images/Houses/lounge-balcony-oceanview.jpg';
import gardenPathwayPebbles from '../../assets/images/Houses/garden-pathway-pebbles.jpg';
import beachLoungersOceanfront from '../../assets/images/Houses/beach-loungers-oceanfront.jpg';

// Gallery items showcasing Barra Cabanas accommodations and experiences
const galleryItems = [
  {
    id: 1,
    title: 'Beachfront Paradise',
    category: 'Exterior Views',
    image: exteriorBeachfrontConstruction,
    description: '6-bedroom luxury beachfront holiday house with private splash pool, under-cover parking, and boat launch access. No 4x4 needed.',
    location: 'Barra, Mozambique',
    date: 'Beachfront Property',
    tags: ['Beachfront', '6 Bedrooms', 'Pool']
  },
  {
    id: 2,
    title: 'En-Suite Comfort',
    category: 'Bedrooms',
    image: bedroomSuite05,
    description: 'Spacious en-suite bedrooms with air-conditioning, featuring 4 queen beds and 2 twin rooms. All bedrooms include modern amenities and elegant coastal design.',
    location: 'Interior Bedrooms',
    date: 'Accommodation',
    tags: ['En-Suite', 'Air-Conditioned', 'Queen Beds']
  },
  {
    id: 3,
    title: 'Pristine Beach Access',
    category: 'Beach & Views',
    image: beachPalmTreesView,
    description: 'Direct beachfront access with palm trees and pristine white sand. Sun loungers on the porch for ultimate relaxation.',
    location: 'Barra Beach',
    date: 'Beach Access',
    tags: ['Beach', 'Ocean Views', 'Palm Trees']
  },
  {
    id: 4,
    title: 'Ocean View Lounge',
    category: 'Living Spaces',
    image: loungeBalconyOceanview,
    description: 'Covered lounge area with panoramic ocean views, Samsung 65" 4K Smart TV, and uncapped Starlink WiFi. Perfect for family gatherings.',
    location: 'Living Area',
    date: 'Entertainment',
    tags: ['Ocean View', 'Smart TV', 'WiFi']
  },
  {
    id: 5,
    title: 'Outdoor Pathways',
    category: 'Outdoor Spaces',
    image: gardenPathwayPebbles,
    description: 'Beautiful pebblestone pathways connecting the property. Braai facilities on the veranda for outdoor dining experiences.',
    location: 'Garden & Outdoor',
    date: 'Outdoor Amenities',
    tags: ['Garden', 'Braai', 'Outdoor']
  },
  {
    id: 6,
    title: 'Beachfront Relaxation',
    category: 'Beach Amenities',
    image: beachLoungersOceanfront,
    description: 'Beach loungers with direct oceanfront views. Daily housekeeping service ensures your comfort throughout your stay.',
    location: 'Beach Area',
    date: 'Beach Facilities',
    tags: ['Beach Loungers', 'Ocean', 'Relaxation']
  }
];

const categories = [
  'All',
  'Exterior Views',
  'Bedrooms',
  'Beach & Views',
  'Living Spaces',
  'Outdoor Spaces',
  'Beach Amenities'
];

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredGalleryItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const openGalleryDetails = (item) => {
    setSelectedProject(item);
  };

  const closeGalleryDetails = () => {
    setSelectedProject(null);
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
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
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="portfolio-grid"
          >
            <AnimatePresence>
              {filteredGalleryItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  className="portfolio-item"
                  onClick={() => openGalleryDetails(item)}
                >
                  <div className="portfolio-image">
                    <img src={item.image} alt={item.title} />
                    <div className="portfolio-overlay">
                      <span className="view-project">View Gallery</span>
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

      {/* Gallery Details Modal */}
      {selectedProject && (
        <div className="project-modal" onClick={closeGalleryDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeGalleryDetails}>×</button>
            <div className="modal-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>
            <div className="modal-details">
              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-description">{selectedProject.description}</p>
              <div className="project-meta">
                <div className="meta-item">
                  <span className="meta-label">Location:</span>
                  <span className="meta-value">{selectedProject.location}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Type:</span>
                  <span className="meta-value">{selectedProject.date}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Category:</span>
                  <span className="meta-value">{selectedProject.category}</span>
                </div>
              </div>
              <div className="project-tags">
                {selectedProject.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
