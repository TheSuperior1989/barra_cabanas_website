import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPassport,
  faMoneyBillWave,
  faFileAlt,
  faCar,
  faMobileAlt,
  faShieldAlt,
  faMapMarkedAlt,
  faInfoCircle,
  faComments
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import './BorderCrossing.css';

const BorderCrossing = () => {
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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  const borderInfo = [
    {
      icon: faShieldAlt,
      title: '3rd Party Insurance',
      description: 'Required for all vehicles entering Mozambique. Available at the border for approximately R250-R300. This covers liability for damage to third parties.'
    },
    {
      icon: faMoneyBillWave,
      title: 'Currency Exchange',
      description: 'Exchange South African Rand to Mozambican Meticais at the border or nearby exchange offices. ATMs are available but may have limited cash. Bring enough Rands for initial expenses.'
    },
    {
      icon: faFileAlt,
      title: 'Required Documents',
      description: 'Valid passport (at least 6 months validity), vehicle registration papers, driver\'s license, and proof of vehicle ownership. Keep copies of all documents.'
    },
    {
      icon: faCar,
      title: 'Vehicle Stickers',
      description: 'Stickers required for vehicles and trailers. Available at the border or cheaper at Outdoor Warehouse before crossing. Ensure your vehicle has all necessary safety equipment.'
    },
    {
      icon: faMobileAlt,
      title: 'Cell Phone & SIM Cards',
      description: 'Enable roaming (expensive) or buy a local SIM card at the garage on your right after the border. Options: Movitell or Vodacom. SIM cards cost approximately R30.'
    },
    {
      icon: faMapMarkedAlt,
      title: 'Border Crossing Tips',
      description: 'Arrive early to avoid long queues. Be patient and polite with officials. Keep all receipts and documents organized. The border can be busy during peak seasons and holidays.'
    },
    {
      icon: faFacebook,
      title: 'DriveMoz Community',
      description: 'Join the DriveMoz Facebook page for real-time updates, road conditions, and community support from fellow travelers.',
      link: '#', // PLACEHOLDER: Replace with actual DriveMoz Facebook page URL
      linkText: 'Visit DriveMoz Facebook Page'
    },
    {
      icon: faComments,
      title: 'Zello Communication',
      description: 'For real-time communication and safety updates, consider using the Zello app. Join the recommended channel for travelers to Mozambique.',
      note: 'PLACEHOLDER: Specific Zello channel name to be provided'
    }
  ];

  const importantNotes = [
    'Ensure your passport has at least 6 months validity from your date of entry',
    'Children must have their own passports',
    'Keep all border crossing receipts for your return journey',
    'Road conditions in Mozambique can vary - drive carefully',
    'Always carry some cash in Meticais for small purchases'
  ];

  return (
    <section className="border-crossing-section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="border-crossing-content"
        >
          <motion.h2 variants={itemVariants} className="section-title">
            Border Crossing Information
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="info-icon-tooltip"
              title="Essential information for crossing from South Africa to Mozambique"
            />
          </motion.h2>

          <div className="border-info-grid">
            {borderInfo.map((info, index) => (
              <motion.div key={index} variants={itemVariants} className="border-card">
                <div className="border-icon">
                  <FontAwesomeIcon icon={info.icon} />
                </div>
                <h3 className="border-title">{info.title}</h3>
                <p className="border-description">{info.description}</p>
                {info.link && (
                  <a href={info.link} className="border-link" target="_blank" rel="noopener noreferrer">
                    {info.linkText}
                  </a>
                )}
                {info.note && (
                  <p className="border-note"><em>{info.note}</em></p>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="important-notes-card">
            <div className="notes-header">
              <FontAwesomeIcon icon={faInfoCircle} className="notes-icon" />
              <h3>Important Notes</h3>
            </div>
            <ul className="notes-list">
              {importantNotes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="border-cta">
            <p className="cta-text">
              Need help planning your trip? Contact us for personalized assistance and local recommendations.
            </p>
            <a href="/contact" className="btn btn-primary">Contact Us</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BorderCrossing;

