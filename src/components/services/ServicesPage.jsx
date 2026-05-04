import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HouseRules from './HouseRules';
import BorderCrossing from './BorderCrossing';
import InfoSheetDownload from '../common/InfoSheetDownload';
import floorPlan from '../../assets/images/floor_plan.jpeg';
import beachAccessPhoto from '../../assets/images/beach_access_photo.jpeg';
import sv01 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0116.jpg';
import sv02 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0141.jpg';
import sv03 from '../../assets/images/Newest/NewestPhotosToUse/DSC05343.jpg';
import sv04 from '../../assets/images/Newest/NewestPhotosToUse/DSC05351.jpg';
import sv05 from '../../assets/images/Newest/NewestPhotosToUse/DSC05355.jpg';
import sv06 from '../../assets/images/Newest/NewestPhotosToUse/DSC05361.jpg';
import sv07 from '../../assets/images/Newest/NewestPhotosToUse/DSC05376.jpg';
import sv08 from '../../assets/images/Newest/NewestPhotosToUse/DSC05382.jpg';
import sv09 from '../../assets/images/Newest/NewestPhotosToUse/DSC05397.jpg';
import sv10 from '../../assets/images/Newest/NewestPhotosToUse/DSC05412.jpg';
import sv11 from '../../assets/images/Newest/NewestPhotosToUse/DSC05426.jpg';
import sv12 from '../../assets/images/Newest/NewestPhotosToUse/20260123_163922.jpg';
import sv13 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0118.jpg';
import sv14 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0144.jpg';
import sv15 from '../../assets/images/Newest/NewestPhotosToUse/Top_View.jpg';
import sv16 from '../../assets/images/Newest/NewestPhotosToUse/DSC05433.jpg';
import sv17 from '../../assets/images/Newest/NewestPhotosToUse/DSC05437.jpg';
import sv18 from '../../assets/images/Newest/NewestPhotosToUse/DSC05441.jpg';
import sv19 from '../../assets/images/Newest/NewestPhotosToUse/DSC05442.jpg';
import sv20 from '../../assets/images/Newest/NewestPhotosToUse/DSC05445.jpg';
import sv21 from '../../assets/images/Newest/NewestPhotosToUse/DSC05451.jpg';
import sv22 from '../../assets/images/Newest/NewestPhotosToUse/20260123_162449.jpg';
import './ServicesPage.css';

// Separate component for service items to fix React Hooks violation
const ServiceItem = ({ service, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Image cycling effect
  useEffect(() => {
    if (service.images && service.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === service.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [service.images]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      key={service.id}
      id={service.id}
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`service-item ${index % 2 === 0 ? '' : 'reverse'}`}
    >
      <motion.div className="service-content" variants={itemVariants} style={{ pointerEvents: 'auto' }}>
        <div className="service-icon">
          <FontAwesomeIcon icon={service.icon} />
        </div>
        <h2 className="service-title">{service.title}</h2>
        <p className="service-description">{service.description}</p>
        <ul className="service-details">
          {service.details.map((detail, i) => (
            <li key={i}>{detail}</li>
          ))}
        </ul>
        <a
          href="/booking"
          className="btn btn-primary"
          style={{ position: 'relative', zIndex: 10, cursor: 'pointer' }}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/booking';
          }}
        >
          Request a Quotation
        </a>
      </motion.div>
      <motion.div className="service-image" variants={itemVariants}>
        <img src={service.images[currentImageIndex]} alt={service.title} />
        {service.images && service.images.length > 1 && (
          <div className="service-image-indicators">
            {service.images.map((_, index) => (
              <span
                key={index}
                className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const accommodations = [
  {
    id: 'barra-cabanas-house',
    icon: faHome,
    title: 'Luxury Beachfront Holiday House',
    description: 'Spacious 6-bedroom beachfront house perfect for families and groups. Sleeps up to 12 guests with all modern amenities for an unforgettable beach getaway.',
    images: [sv01, sv02, sv03, sv04, sv05, sv06],
    details: [
      '6 En-suite bedrooms (4 queen beds, 2 twin rooms)',
      '5 Showers, 1 bath',
      'Air-conditioning in all bedrooms and living room',
      'Fully equipped modern kitchen: Fridge & deepfreeze, Gas stove & oven, Microwave, Airfryer, Coffee plunger',
      'Kitchen equipment: Kettle & toaster, Pots & pans, Cutlery & crockery, Cups & glasses, Cupcake pans, Basic baking sets, Black pot size 3, Braai broodjie grid',
      'Private splash pool with ocean view',
      'Braai facilities on the veranda',
      'Samsung 65" 4K Smart TV with streaming apps',
      'Uncapped free Starlink WiFi',
      'Under cover car & boat parking',
      'Boat launch next to the houses',
      'Daily housekeeping service (cleaner arrives at 8:00 AM)',
      'Beachfront location - no 4x4 needed'
    ]
  },
  {
    id: 'premium-services',
    icon: faStar,
    title: 'Premium Add-On Services',
    description: 'Enhance your stay with optional luxury services and experiences.',
    images: [sv07, sv08, sv09, sv10, sv11, sv12],
    details: [
      'Laundry service available',
      'Airport transfers from Inhambane',
      'Local guided tours (snorkeling, diving, fishing)',
      'Sunset dhow cruises',
      'Massage & spa services',
      'Private chef / meal catering'
    ]
  }
];

const ServicesPage = () => {
  const location = useLocation();
  const hash = location.hash.replace('#', '');

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="services-page">
      <div className="services-hero">
        <div className="services-hero-overlay"></div>
        <div className="container">
          <h1 className="services-hero-title">Our Accommodation</h1>
          <p className="services-hero-subtitle">
            Luxury Beachfront Living – Tailored for Your Perfect Escape
          </p>
        </div>
      </div>

      <section className="services-list">
        <div className="container">
          {accommodations.map((service, index) => (
            <ServiceItem key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>

      <section className="floor-plan-section">
        <div className="container">
          <h2 className="section-title">House Floor Plan</h2>
          <p className="section-subtitle">
            Explore the layout of our modern beachfront cabanas
          </p>
          <div className="floor-plan-container">
            <img src={floorPlan} alt="Barra Cabanas Floor Plan" className="floor-plan-image" />
          </div>
        </div>
      </section>

      <section className="beach-access-section">
        <div className="container">
          <h2 className="section-title">Direct Beach Access</h2>
          <p className="section-subtitle">
            Private gate access to pristine Barra Beach
          </p>
          <div className="beach-access-container">
            <img src={beachAccessPhoto} alt="Direct beach access gate" className="beach-access-image" />
            <div className="beach-access-description">
              <p>
                Each cabana features exclusive access to the beach through our private gate,
                ensuring a seamless transition from your accommodation to the golden sands of Barra Beach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Sheet Download Section */}
      <InfoSheetDownload />

      {/* House Rules Section */}
      <HouseRules />

      {/* Border Crossing Information */}
      <BorderCrossing />

      <section className="services-cta">
        {/* Scrolling Images Background */}
        <div className="scrolling-images">
          <div className="image-track">
            <img src={sv13} alt="Aerial view" />
            <img src={sv14} alt="Drone beachfront" />
            <img src={sv15} alt="Top view" />
            <img src={sv16} alt="Property interior" />
            <img src={sv17} alt="Living space" />
            <img src={sv18} alt="Accommodation" />
            <img src={sv19} alt="Interior detail" />
            <img src={sv20} alt="Property room" />
            <img src={sv21} alt="Luxury interior" />
            <img src={sv22} alt="Outdoor area" />
            <img src={sv01} alt="Aerial drone" />
            <img src={sv02} alt="Overhead view" />
          </div>
        </div>

        {/* CTA Content Overlay */}
        <div className="cta-overlay"></div>
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Escape to Paradise?</h2>
            <p>
              Contact us today to book your ideal cabana or get help planning the perfect tropical escape to Mozambique.
            </p>
            <Link to="/booking" className="btn btn-primary">Request a Quotation</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
