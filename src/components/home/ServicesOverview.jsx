import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUtensils,
  faBell,
  faPalette,
  faCalendarAlt,
  faSpa
} from '@fortawesome/free-solid-svg-icons';
import PlaceholderImage from '../common/PlaceholderImage';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ServicesOverview.css';

const services = [
  {
    id: 'accommodation',
    icon: faHome,
    title: '6-Bedroom Beachfront Holiday House',
    description: 'Luxury beachfront accommodation with 6 en-suite bedrooms, private splash pool, and all modern amenities. Sleeps up to 12 guests.',
    link: '/services#barra-cabanas-house'
  },
  {
    id: 'kitchen',
    icon: faUtensils,
    title: 'Fully Equipped Modern Kitchen',
    description: 'Complete kitchen with gas stove, airfryer, coffee plunger, and all cooking essentials. Braai facilities on the veranda.',
    link: '/services#barra-cabanas-house'
  },
  {
    id: 'amenities',
    icon: faBell,
    title: 'Premium Amenities & Services',
    description: 'Samsung 65" 4K Smart TV, uncapped Starlink WiFi, air-conditioning, daily housekeeping, and under-cover parking.',
    link: '/services#barra-cabanas-house'
  },
  {
    id: 'pool',
    icon: faPalette,
    title: 'Private Splash Pool',
    description: 'Enjoy your own private splash pool with stunning ocean views. Perfect for cooling off after a day at the beach.',
    link: '/services#barra-cabanas-house'
  },
  {
    id: 'services',
    icon: faCalendarAlt,
    title: 'Add-On Services Available',
    description: 'Laundry service, airport transfers, guided tours, sunset dhow cruises, massage & spa services, and private chef catering.',
    link: '/services#premium-services'
  },
  {
    id: 'location',
    icon: faSpa,
    title: 'Prime Beachfront Location',
    description: 'Direct beach access with boat launch next to the houses. No 4x4 needed to reach Barra Cabanas.',
    link: '/services#barra-cabanas-house'
  }
];

const ServicesOverview = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section className="services-overview" id="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Experience unmatched comfort, elegance, and personalized service at our luxury beachfront retreat.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="services-grid"
        >
          {services.map((service) => (
            <motion.div key={service.id} className="service-card" variants={itemVariants}>
              <div className="service-icon">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <Link to={service.link} className="service-link">
                Learn More
              </Link>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
};

export default ServicesOverview;
