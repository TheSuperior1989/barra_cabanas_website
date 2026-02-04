import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faHeart,
  faUsers,
  faBed,
  faStar,
  faUmbrellaBeach
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HouseRules from './HouseRules';
import BorderCrossing from './BorderCrossing';
import InfoSheetDownload from '../common/InfoSheetDownload';
import balconyWalkwayOceanview from '../../assets/images/Houses/balcony-walkway-oceanview.jpg';
import rooftopTerracePatio from '../../assets/images/Houses/rooftop-terrace-patio.jpg';
import bedroomSuite10 from '../../assets/images/Houses/bedroom-suite-10.jpg';
import beachPalmTreesView from '../../assets/images/Houses/beach-palm-trees-view.jpg';
import bedroomSuiteInterior from '../../assets/images/Houses/bedroom-suite-interior.jpg';
import balconyDeckOceanview from '../../assets/images/Houses/balcony-deck-oceanview.jpg';
import livingRoomTvLounge from '../../assets/images/Houses/living-room-tv-lounge.jpg';
import kitchenGalleyWhite from '../../assets/images/Houses/kitchen-galley-white.jpg';
import bathroomVanity01 from '../../assets/images/Houses/bathroom-vanity-01.jpg';
import balconyDiningOceanview from '../../assets/images/Houses/balcony-dining-oceanview.jpg';
import bedroomSuite09 from '../../assets/images/Houses/bedroom-suite-09.jpg';
import beachLoungersOceanfront from '../../assets/images/Houses/beach-loungers-oceanfront.jpg';
import livingRoomSofa02 from '../../assets/images/Houses/living-room-sofa-02.jpg';
import rooftopLoungeChairs from '../../assets/images/Houses/rooftop-lounge-chairs.jpg';
import './ServicesPage.css';

// Separate component for service items to fix React Hooks violation
const ServiceItem = ({ service, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
        {service.price && <p className="service-price">{service.price}</p>}
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
          Book Now
        </a>
      </motion.div>
      <motion.div className="service-image" variants={itemVariants}>
        <img src={service.image} alt={service.title} />
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
    image: balconyWalkwayOceanview,
    price: 'From R700 per person per night (Out of Season)',
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
    image: rooftopTerracePatio,
    price: 'Custom pricing available',
    details: [
      'Laundry service: 0-5 kg (400 Mts), 6-10 kg (600 Mts), 11-15 kg (800 Mts)',
      'Airport transfers from Inhambane',
      'Local guided tours (snorkeling, diving, fishing)',
      'Sunset dhow cruises',
      'Massage & spa services',
      'Private chef / meal catering'
    ]
  },
  {
    id: 'seasonal-pricing',
    icon: faBed,
    title: 'Seasonal Rates 2026',
    description: 'Flexible pricing throughout the year to suit your budget and travel plans.',
    image: bedroomSuite10,
    price: 'Seasonal rates apply',
    details: [
      'Out of Season (Feb, May, Aug, Nov): R700 per person per night',
      'Mid Season (Apr, Jun, Jul, Sep, Oct SA School holidays): R9,000 per house per night',
      'Peak Season (1-15 Dec): R10,000 per house per night',
      'Peak Season (15 Dec - 15 Jan): R13,000 per house per night',
      'Peak Season (15 Jan onwards): R10,000 per house per night',
      'Minimum 14-night stay during 15 Dec - 15 Jan period',
      'Additional guests: R500 per person per night (if exceeding 12 sleepers)'
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



      <section className="services-intro">
        <div className="container">
          <div className="intro-content">
            <h2>How We Make Your Stay Special</h2>
            <p>
              At Barra Cabanas, every stay is more than just a holiday — it's a curated experience of barefoot luxury. Whether you're seeking relaxation, romance, or adventure, our wide range of accommodation options and personalized guest services ensure that every moment is memorable.
            </p>
            <p>
              All stays include access to the beach, lush gardens, and optional concierge services for local excursions and amenities. Explore our accommodation options below to find your perfect escape.
            </p>
          </div>
        </div>
      </section>

      <section className="services-list">
        <div className="container">
          {accommodations.map((service, index) => (
            <ServiceItem key={service.id} service={service} index={index} />
          ))}
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
            <img src={beachPalmTreesView} alt="Pristine Barra beach with palm trees" />
            <img src={bedroomSuiteInterior} alt="En-suite bedroom with air-conditioning" />
            <img src={balconyDeckOceanview} alt="Balcony deck with ocean views" />
            <img src={livingRoomTvLounge} alt="Living room with Samsung 65 inch Smart TV" />
            <img src={kitchenGalleyWhite} alt="Modern kitchen with gas stove and appliances" />
            <img src={bathroomVanity01} alt="Bathroom with modern vanity and fixtures" />
            <img src={balconyDiningOceanview} alt="Balcony dining area with ocean view" />
            <img src={bedroomSuite09} alt="Spacious bedroom suite with ambient lighting" />
            <img src={beachLoungersOceanfront} alt="Beach loungers on oceanfront" />
            <img src={livingRoomSofa02} alt="Living room with comfortable seating" />
            <img src={rooftopLoungeChairs} alt="Rooftop terrace with lounge chairs" />
            <img src={balconyWalkwayOceanview} alt="Balcony walkway with ocean panorama" />
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
            <Link to="/booking" className="btn btn-primary">Book Your Stay</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
