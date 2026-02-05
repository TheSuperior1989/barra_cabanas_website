import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './HouseFeatures.css';

// Beachfront with Pool images
import infinityPoolOceanview from '../../assets/images/Houses/infinity-pool-oceanview.jpg';
import poolCourtyardLoungers from '../../assets/images/Houses/pool-courtyard-loungers.jpg';
import balconyDeckOceanview from '../../assets/images/Houses/balcony-deck-oceanview.jpg';

// 6 Air-conditioned Bedrooms images - PLACEHOLDERS (queen beds, single beds, wardrobe)
import bedroomSuite02 from '../../assets/images/Houses/bedroom-suite-02.jpg';
import bedroomSuite03 from '../../assets/images/Houses/bedroom-suite-03.jpg';
import bedroomSuite04 from '../../assets/images/Houses/bedroom-suite-04.jpg';
import bedroomSuite09 from '../../assets/images/Houses/bedroom-suite-09.jpg';
import bedroomSuite10 from '../../assets/images/Houses/bedroom-suite-10.jpg';
import bedroomSuite11 from '../../assets/images/Houses/bedroom-suite-11.jpg';

// En-suite Bathrooms images - PLACEHOLDERS (bath, shower)
import bathroomVanity01 from '../../assets/images/Houses/bathroom-vanity-01.jpg';
import bathroomVanity02 from '../../assets/images/Houses/bathroom-vanity-02.jpg';
import bathroomVanity03 from '../../assets/images/Houses/bathroom-vanity-03.jpg';

// House features with rotating images
const features = [
  {
    id: 1,
    title: 'Beachfront with Pool',
    category: 'Outdoor Living',
    images: [infinityPoolOceanview, poolCourtyardLoungers, balconyDeckOceanview],
    description: 'Private splash pool with ocean views, perfect for relaxing under the African sun. Direct beach access for morning swims.',
    link: '/services#barra-cabanas-house'
  },
  {
    id: 2,
    title: '6 Air-conditioned Bedrooms',
    category: 'Comfortable Accommodation',
    images: [bedroomSuite02, bedroomSuite03, bedroomSuite04, bedroomSuite09, bedroomSuite10, bedroomSuite11],
    description: 'Spacious en-suite bedrooms with air-conditioning. Mix of queen and twin beds to accommodate families and groups up to 12 guests.',
    link: '/services#barra-cabanas-house'
  },
  {
    id: 3,
    title: 'En-suite Bathrooms',
    category: 'Modern Amenities',
    images: [bathroomVanity01, bathroomVanity02, bathroomVanity03],
    description: 'Every bedroom features a private en-suite bathroom with modern fixtures, showers, and elegant coastal design.',
    link: '/services#barra-cabanas-house'
  }
];

const HouseFeatures = () => {
  const [currentImageIndexes, setCurrentImageIndexes] = useState(features.map(() => 0));
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes(prevIndexes =>
        prevIndexes.map((index, featureIndex) =>
          (index + 1) % features[featureIndex].images.length
        )
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="house-features" id="features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">House Features</h2>
          <p className="section-subtitle">
            Discover the exceptional amenities and comfort that make each cabana perfect for your beach getaway.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="features-grid"
        >
          {features.map((feature, featureIndex) => (
            <motion.div key={feature.id} className="feature-card" variants={itemVariants}>
              <div className="feature-image">
                <img 
                  src={feature.images[currentImageIndexes[featureIndex]]} 
                  alt={`${feature.title} - Image ${currentImageIndexes[featureIndex] + 1}`} 
                />
                <div className="feature-overlay">
                  <Link to={feature.link} className="feature-link">
                    View Details
                  </Link>
                </div>
                <div className="image-indicator">
                  {feature.images.map((_, imgIndex) => (
                    <span 
                      key={imgIndex} 
                      className={`dot ${imgIndex === currentImageIndexes[featureIndex] ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </div>
              <div className="feature-content">
                <span className="feature-category">{feature.category}</span>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HouseFeatures;

