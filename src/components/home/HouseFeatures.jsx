import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './HouseFeatures.css';

// Beachfront / Outdoor
import hf_pool1 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0116.jpg';
import hf_pool2 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0144.jpg';
import hf_pool3 from '../../assets/images/Newest/NewestPhotosToUse/20260123_162449.jpg';
import hf_pool4 from '../../assets/images/Newest/NewestPhotosToUse/20260123_163922.jpg';

// Bedrooms
import hf_bed1 from '../../assets/images/Newest/NewestPhotosToUse/DSC05343.jpg';
import hf_bed2 from '../../assets/images/Newest/NewestPhotosToUse/DSC05351.jpg';
import hf_bed3 from '../../assets/images/Newest/NewestPhotosToUse/DSC05355.jpg';
import hf_bed4 from '../../assets/images/Newest/NewestPhotosToUse/DSC05361.jpg';
import hf_bed5 from '../../assets/images/Newest/NewestPhotosToUse/DSC05376.jpg';
import hf_bed6 from '../../assets/images/Newest/NewestPhotosToUse/DSC05382.jpg';

// Bathrooms / Interior
import hf_bath1 from '../../assets/images/Newest/NewestPhotosToUse/DSC05386.jpg';
import hf_bath2 from '../../assets/images/Newest/NewestPhotosToUse/DSC05397.jpg';
import hf_bath3 from '../../assets/images/Newest/NewestPhotosToUse/DSC05412.jpg';

const features = [
  {
    id: 1,
    title: 'Beachfront with Pool',
    category: 'Outdoor Living',
    images: [hf_pool1, hf_pool2, hf_pool3, hf_pool4],
    description: 'Private splash pool with ocean views, perfect for relaxing under the African sun. Direct beach access for morning swims.',
    link: '/services#barra-cabanas-house'
  },
  {
    id: 2,
    title: '6 Air-conditioned Bedrooms',
    category: 'Comfortable Accommodation',
    images: [hf_bed1, hf_bed2, hf_bed3, hf_bed4, hf_bed5, hf_bed6],
    description: 'Spacious en-suite bedrooms with air-conditioning. Mix of queen and twin beds to accommodate families and groups up to 12 guests.',
    link: '/services#barra-cabanas-house'
  },
  {
    id: 3,
    title: 'En-suite Bathrooms',
    category: 'Modern Amenities',
    images: [hf_bath1, hf_bath2, hf_bath3],
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

