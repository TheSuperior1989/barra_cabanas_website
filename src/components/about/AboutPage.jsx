import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faGlobe, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import './AboutPage.css';
import livingRoomTvLounge from '../../assets/images/Houses/living-room-tv-lounge.jpg';
import bedroomSuiteInterior from '../../assets/images/Houses/bedroom-suite-interior.jpg';
import kitchenGalleyWhite from '../../assets/images/Houses/kitchen-galley-white.jpg';

// Word Carousel Component
const WordCarousel = ({ title, words, icon }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <motion.div className="word-carousel-card" variants={{
      hidden: { y: 50, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    }}>
      <div className="carousel-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h3 className="carousel-title">{title}</h3>
      <div className="animated-word-container">
        <motion.p
          key={index}
          className="animated-word"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {words[index]}
        </motion.p>
      </div>
    </motion.div>
  );
};

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
                  <img src={livingRoomTvLounge} alt="Living room with Samsung 65 inch 4K Smart TV and ocean views" />
                  <div className="gallery-overlay">
                    <span className="gallery-caption">Smart TV & Ocean Views</span>
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
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
            }}
            initial="hidden"
            animate="visible"
            className="word-carousel-grid"
          >
            <WordCarousel
              title="Our Mission"
              words={["Celebrate", "Promote", "Deliver"]}
              icon={faGlobe}
            />

            <WordCarousel
              title="Our Vision"
              words={["Excellence", "Luxury", "Sustainability"]}
              icon={faEye}
            />

            <WordCarousel
              title="Our Values"
              words={["Authenticity", "Warmth", "Elegance", "Excellence", "Sustainability"]}
              icon={faHeart}
            />
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
