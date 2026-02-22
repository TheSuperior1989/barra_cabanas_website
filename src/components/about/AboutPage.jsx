import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faBed, faWater, faPersonSwimming, faWifi, faTv, faFire, faAnchor, faBroom } from '@fortawesome/free-solid-svg-icons';
import './AboutPage.css';
import loungeBalconyOceanview from '../../assets/images/Houses/lounge-balcony-oceanview.jpg';
import bedroomSuiteInterior from '../../assets/images/Houses/bedroom-suite-interior.jpg';
import kitchenGalleyWhite from '../../assets/images/Houses/kitchen-galley-white.jpg';

const propertyStats = [
  { icon: faBed, number: '6', label: 'En-Suite Bedrooms', desc: 'Air-conditioned & fully furnished' },
  { icon: faWater, number: 'Direct', label: 'Beachfront Access', desc: '100m to pristine white sand' },
  { icon: faPersonSwimming, number: 'Private', label: 'Splash Pool', desc: 'On the covered deck' },
  { icon: faWifi, number: 'Uncapped', label: 'Starlink WiFi', desc: 'High-speed satellite internet' },
  { icon: faTv, number: '65"', label: 'Samsung 4K TV', desc: 'Smart TV in the living area' },
  { icon: faFire, number: 'Braai', label: 'Facilities', desc: 'Outdoor dining on the veranda' },
  { icon: faAnchor, number: 'Boat', label: 'Launch Access', desc: 'No 4×4 required' },
  { icon: faBroom, number: 'Daily', label: 'Housekeeping', desc: 'Full cleaning service included' },
];

const AboutPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="container">
          <h1 className="about-hero-title">About Barra Cabanas</h1>
          <p className="about-hero-subtitle">
            Where barefoot luxury meets the untouched beauty of Mozambique
          </p>
        </div>
      </div>

      <section className="about-story">
        <div className="container">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="story-wrapper"
          >
            {/* Story Header */}
            <motion.div className="story-header" variants={itemVariants}>
              <h2 className="story-title">Our Story</h2>
              <div className="story-subtitle">Where Dreams Meet the Ocean</div>
            </motion.div>

            {/* Story Timeline */}
            <div className="story-timeline">
              <motion.div className="timeline-item" variants={itemVariants}>
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-title">The Beginning</h3>
                  <p className="timeline-text">
                    Barra Cabanas was born from a deep love for the Mozambican coastline and a dream to share its magic with the world. Under the dedicated management of Anname Louw, our journey continues as a passion project — a way to blend luxury, nature, and authentic Mozambican charm into one unforgettable destination.
                  </p>
                </div>
              </motion.div>

              <motion.div className="timeline-item" variants={itemVariants}>
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-title">The Vision</h3>
                  <p className="timeline-text">
                    From humble beginnings, we've grown into a collection of exclusive beachfront homes nestled along the golden shores of Barra, a tropical paradise just outside Inhambane. Each cabana is designed to reflect the spirit of the ocean — tranquil, refined, and in harmony with its surroundings.
                  </p>
                </div>
              </motion.div>

              <motion.div className="timeline-item" variants={itemVariants}>
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Today</h3>
                  <p className="timeline-text">
                    We believe true luxury lies in simplicity, serenity, and a deep connection with nature. Whether you're here for romance, adventure, or pure relaxation, Barra Cabanas offers a sanctuary where you can unwind in style and reconnect with what matters most.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Story Image Gallery */}
            <motion.div className="story-gallery" variants={itemVariants}>
              <div className="gallery-grid">
                <div className="gallery-item gallery-large">
                  <img src={loungeBalconyOceanview} alt="Covered lounge area with panoramic ocean views" />
                  <div className="gallery-overlay">
                    <span className="gallery-caption">Ocean View Lounge</span>
                  </div>
                </div>
                <div className="gallery-item">
                  <img src={bedroomSuiteInterior} alt="En-suite bedroom with air-conditioning and queen bed" />
                  <div className="gallery-overlay">
                    <span className="gallery-caption">En-Suite Bedrooms</span>
                  </div>
                </div>
                <div className="gallery-item">
                  <img src={kitchenGalleyWhite} alt="Fully equipped modern kitchen with gas stove and appliances" />
                  <div className="gallery-overlay">
                    <span className="gallery-caption">Modern Kitchen</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="about-mission">
        <div className="container">
          <div className="stats-header">
            <h2 className="stats-section-title">Why Stay at Barra Cabanas?</h2>
            <p className="stats-section-subtitle">Everything you need for the ultimate Mozambique escape</p>
          </div>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
            }}
            initial="hidden"
            animate="visible"
            className="stats-grid"
          >
            {propertyStats.map((stat, i) => (
              <motion.div
                key={i}
                className="stat-card"
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
                }}
              >
                <div className="stat-icon-wrap">
                  <FontAwesomeIcon icon={stat.icon} />
                </div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-desc">{stat.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="about-team">
        <div className="container">
          <h2 className="section-title">Our Management</h2>
          <p className="section-subtitle">
            Meet the team dedicated to making your stay unforgettable
          </p>

          <div className="team-grid">
            <div className="team-member">
              <div className="member-icon">
                <FontAwesomeIcon icon={faUserTie} />
              </div>
              <h3 className="member-name">Anname Louw</h3>
              <p className="member-position">Property Manager</p>
              <p className="member-bio">
                Anname brings warmth and dedication to Barra Cabanas, ensuring every guest experiences the perfect blend of luxury and comfort. Her attention to detail and commitment to exceptional hospitality creates memorable stays for all our visitors.
              </p>
            </div>

            <div className="team-member">
              <div className="member-icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <h3 className="member-name">Management Team</h3>
              <p className="member-position">Operations & Guest Services</p>
              <p className="member-bio">
                Our dedicated team works tirelessly to maintain the highest standards of service and comfort. From daily housekeeping to personalized guest assistance, we're here to ensure your Mozambique beach escape exceeds all expectations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
