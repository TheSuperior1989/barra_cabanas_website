import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSnowflake,
  faDoorClosed,
  faVolumeXmark,
  faBan,
  faPaw,
  faGlassWater,
  faTv,
  faUtensils,
  faBroom,
  faShirt,
  faUsers,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import './HouseRules.css';

const HouseRules = () => {
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

  const rules = [
    {
      icon: faSnowflake,
      title: 'Air Conditioning Usage',
      description: 'Do not leave air conditioners running when leaving the property. Close all doors and windows while using AC to maintain efficiency.'
    },
    {
      icon: faVolumeXmark,
      title: 'Quiet Hours - STRICTLY ENFORCED',
      description: 'NO MUSIC OR NOISE AFTER 11 PM. Please respect our neighbors and maintain quiet hours from 11 PM onwards.'
    },
    {
      icon: faBan,
      title: 'No Smoking Inside',
      description: 'Smoking is strictly prohibited inside the house. Please use outdoor ashtrays provided on the veranda.'
    },
    {
      icon: faPaw,
      title: 'Pet Policy',
      description: 'No pets allowed. Guide dogs only with prior arrangement.'
    },
    {
      icon: faUsers,
      title: 'Events & Parties',
      description: 'No events or parties without prior written consent from management. Maximum guest capacity must be respected.'
    },
    {
      icon: faGlassWater,
      title: 'Pool Safety',
      description: 'The splash pool is shallow - NO DIVING. Children must be supervised at all times. Pool use is at your own risk.'
    },
    {
      icon: faTv,
      title: 'Smart TV Usage',
      description: 'Remember to sign out of all your apps (Netflix, YouTube, etc.) before checkout to protect your privacy.'
    }
  ];

  const whatWeProvide = [
    'Daily housekeeping service (cleaner arrives at 8:00 AM)',
    'Sunlight liquid and refuse bags',
    'Toilet paper on arrival',
    'Bath towels (please bring your own swimming towels)',
    'Fully equipped kitchen with all utensils and appliances'
  ];

  const whatToBring = [
    'Your own Gazebo and beach chairs',
    'Doom and insect repellent',
    'Soap, shampoo, and toiletries',
    'Swimming towels',
    'Beach equipment and toys'
  ];

  return (
    <section className="house-rules-section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="house-rules-content"
        >
          <motion.h2 variants={itemVariants} className="section-title">
            House Rules & Policies
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="info-icon-tooltip"
              title="Please read and respect our house rules to ensure a pleasant stay for everyone"
            />
          </motion.h2>

          <div className="rules-grid">
            {rules.map((rule, index) => (
              <motion.div key={index} variants={itemVariants} className="rule-card">
                <div className="rule-icon">
                  <FontAwesomeIcon icon={rule.icon} />
                </div>
                <h3 className="rule-title">{rule.title}</h3>
                <p className="rule-description">{rule.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="info-sections">
            <motion.div variants={itemVariants} className="info-card">
              <div className="info-icon">
                <FontAwesomeIcon icon={faBroom} />
              </div>
              <h3>What We Provide</h3>
              <ul>
                {whatWeProvide.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="info-card">
              <div className="info-icon">
                <FontAwesomeIcon icon={faShirt} />
              </div>
              <h3>What to Bring</h3>
              <ul>
                {whatToBring.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HouseRules;

