import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt,
  faFileDownload
} from '@fortawesome/free-solid-svg-icons';
import './ActivitiesPage.css';

// PLACEHOLDER: Activities data - to be replaced with content from Activities PDF
const activities = [
  {
    id: 1,
    name: 'Scuba Diving & Snorkeling',
    description: 'Explore the vibrant underwater world of Barra with professional dive operators. Perfect for beginners and experienced divers alike.',
    contact: {
      phone: 'PLACEHOLDER: Contact number',
      email: 'PLACEHOLDER: Email address',
      location: 'Barra Beach'
    }
  },
  {
    id: 2,
    name: 'Deep Sea Fishing',
    description: 'Experience world-class deep sea fishing in the rich waters off the Mozambique coast. Charter boats available for full or half-day trips.',
    contact: {
      phone: 'PLACEHOLDER: Contact number',
      email: 'PLACEHOLDER: Email address',
      location: 'Barra Marina'
    }
  },
  {
    id: 3,
    name: 'Dolphin & Whale Watching',
    description: 'Seasonal tours to observe dolphins and migrating whales in their natural habitat. Unforgettable marine wildlife experiences.',
    contact: {
      phone: 'PLACEHOLDER: Contact number',
      email: 'PLACEHOLDER: Email address',
      location: 'Barra Point'
    }
  },
  {
    id: 4,
    name: 'Kayaking & Paddleboarding',
    description: 'Rent kayaks or paddleboards to explore the calm waters and hidden coves along the coastline at your own pace.',
    contact: {
      phone: 'PLACEHOLDER: Contact number',
      email: 'PLACEHOLDER: Email address',
      location: 'Beach Equipment Rentals'
    }
  },
  {
    id: 5,
    name: 'Cultural Village Tours',
    description: 'Visit local villages to experience authentic Mozambican culture, traditional crafts, and warm hospitality.',
    contact: {
      phone: 'PLACEHOLDER: Contact number',
      email: 'PLACEHOLDER: Email address',
      location: 'Local Tour Operators'
    }
  },
  {
    id: 6,
    name: 'Sunset Dhow Cruises',
    description: 'Sail on a traditional dhow boat and enjoy spectacular sunsets over the Indian Ocean with refreshments included.',
    contact: {
      phone: 'PLACEHOLDER: Contact number',
      email: 'PLACEHOLDER: Email address',
      location: 'Barra Harbor'
    }
  }
];

const ActivitiesPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="activities-page">
      <div className="activities-hero">
        <div className="activities-hero-overlay"></div>
        <div className="container">
          <h1 className="activities-hero-title">Activities & Experiences</h1>
          <p className="activities-hero-subtitle">
            Discover amazing adventures and experiences in Barra
          </p>
        </div>
      </div>

      <section className="activities-content">
        <div className="container">
          {/* PLACEHOLDER: PDF Download Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="activities-pdf-notice"
          >
            <div className="pdf-notice-content">
              <FontAwesomeIcon icon={faFileDownload} className="pdf-icon" />
              <div className="pdf-notice-text">
                <h3>Complete Activities Guide</h3>
                <p>Download our comprehensive activities PDF for detailed information, pricing, and booking details.</p>
                <p className="placeholder-note">
                  <em>PLACEHOLDER: Activities PDF to be provided - will include full details, contact information, and pricing</em>
                </p>
              </div>
              <button className="btn-download" disabled>
                Download PDF (Coming Soon)
              </button>
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="activities-grid"
          >
            {activities.map((activity) => (
              <motion.div key={activity.id} className="activity-card" variants={itemVariants}>
                <h2 className="activity-name">{activity.name}</h2>
                <p className="activity-description">{activity.description}</p>
                
                <div className="activity-contact">
                  <h4>Contact Information</h4>
                  <div className="contact-item">
                    <FontAwesomeIcon icon={faPhone} />
                    <span>{activity.contact.phone}</span>
                  </div>
                  <div className="contact-item">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span>{activity.contact.email}</span>
                  </div>
                  <div className="contact-item">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>{activity.contact.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ActivitiesPage;

