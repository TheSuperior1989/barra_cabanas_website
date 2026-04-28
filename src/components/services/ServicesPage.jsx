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
import newHouseBeachfrontPool from '../../assets/images/Houses/new-house-beachfront-pool.jpg';
import newHousePoolPatio from '../../assets/images/Houses/new-house-pool-patio-exterior.jpg';
import newAerialResortPools from '../../assets/images/Houses/new-aerial-resort-pools.jpg';
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
import newReceptionExterior from '../../assets/images/Houses/new-reception-exterior.jpg';
import beachLoungersOceanfront from '../../assets/images/Houses/beach-loungers-oceanfront.jpg';
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
    images: [
      newHouseBeachfrontPool,
      newAerialResortPools,
      newPoolOceanView,
      newBedroomQueenSuite,
      newLivingKitchenOpenplan,
      newOutdoorPatioBraai,
    ],
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
    images: [
      newPatioDiningOcean,
      newLivingSofaLounge,
      newKitchenOceanDoors,
      newBathroomBathVanity,
      beachLoungersOceanfront,
    ],
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
            <img src={newHouseBeachfrontPool} alt="Beachfront house with pool" />
            <img src={newBedroomQueenSuite} alt="En-suite queen bedroom" />
            <img src={newPoolOceanView} alt="Pool with ocean view" />
            <img src={newLivingKitchenOpenplan} alt="Open plan living and kitchen" />
            <img src={newKitchenIslandPendants} alt="Modern kitchen with island" />
            <img src={newBathroomBathVanity} alt="Bathroom with bath and vanity" />
            <img src={newPatioDiningOcean} alt="Outdoor dining with ocean view" />
            <img src={newBedroomTwinSuite} alt="Twin bedroom suite" />
            <img src={beachLoungersOceanfront} alt="Beach loungers on oceanfront" />
            <img src={newLivingSofaLounge} alt="Living room with sofa lounge" />
            <img src={newAerialResortPools} alt="Aerial view of resort pools" />
            <img src={newReceptionExterior} alt="Resort reception exterior" />
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
