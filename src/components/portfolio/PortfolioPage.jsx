import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './PortfolioPage.css';

import gal01 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0116.jpg';
import gal02 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0118.jpg';
import gal03 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0141.jpg';
import gal04 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0144.jpg';
import gal05 from '../../assets/images/Newest/NewestPhotosToUse/Top_View.jpg';
import gal06 from '../../assets/images/Newest/NewestPhotosToUse/DSC05343.jpg';
import gal07 from '../../assets/images/Newest/NewestPhotosToUse/DSC05351.jpg';
import gal08 from '../../assets/images/Newest/NewestPhotosToUse/DSC05352.jpg';
import gal09 from '../../assets/images/Newest/NewestPhotosToUse/DSC05355.jpg';
import gal10 from '../../assets/images/Newest/NewestPhotosToUse/DSC05356.jpg';
import gal11 from '../../assets/images/Newest/NewestPhotosToUse/DSC05357.jpg';
import gal12 from '../../assets/images/Newest/NewestPhotosToUse/DSC05361.jpg';
import gal13 from '../../assets/images/Newest/NewestPhotosToUse/DSC05363.jpg';
import gal14 from '../../assets/images/Newest/NewestPhotosToUse/DSC05370.jpg';
import gal15 from '../../assets/images/Newest/NewestPhotosToUse/DSC05376.jpg';
import gal16 from '../../assets/images/Newest/NewestPhotosToUse/DSC05377.jpg';
import gal17 from '../../assets/images/Newest/NewestPhotosToUse/DSC05379.jpg';
import gal18 from '../../assets/images/Newest/NewestPhotosToUse/DSC05382.jpg';
import gal19 from '../../assets/images/Newest/NewestPhotosToUse/DSC05383.jpg';
import gal20 from '../../assets/images/Newest/NewestPhotosToUse/DSC05386.jpg';
import gal21 from '../../assets/images/Newest/NewestPhotosToUse/DSC05397.jpg';
import gal22 from '../../assets/images/Newest/NewestPhotosToUse/DSC05412.jpg';
import gal23 from '../../assets/images/Newest/NewestPhotosToUse/DSC05420.jpg';
import gal24 from '../../assets/images/Newest/NewestPhotosToUse/DSC05426.jpg';
import gal25 from '../../assets/images/Newest/NewestPhotosToUse/DSC05433.jpg';
import gal26 from '../../assets/images/Newest/NewestPhotosToUse/DSC05437.jpg';
import gal27 from '../../assets/images/Newest/NewestPhotosToUse/DSC05441.jpg';
import gal28 from '../../assets/images/Newest/NewestPhotosToUse/DSC05442.jpg';
import gal29 from '../../assets/images/Newest/NewestPhotosToUse/DSC05445.jpg';
import gal30 from '../../assets/images/Newest/NewestPhotosToUse/DSC05451.jpg';
import gal31 from '../../assets/images/Newest/NewestPhotosToUse/DSC05454.jpg';
import gal32 from '../../assets/images/Newest/NewestPhotosToUse/DSC05459.jpg';
import gal33 from '../../assets/images/Newest/NewestPhotosToUse/DSC05462.jpg';
import gal34 from '../../assets/images/Newest/NewestPhotosToUse/DSC05465.jpg';
import gal35 from '../../assets/images/Newest/NewestPhotosToUse/DSC05477.jpg';
import gal36 from '../../assets/images/Newest/NewestPhotosToUse/DSC05480.jpg';
import gal37 from '../../assets/images/Newest/NewestPhotosToUse/DSC05482.jpg';
import gal38 from '../../assets/images/Newest/NewestPhotosToUse/DSC05485.jpg';
import gal39 from '../../assets/images/Newest/NewestPhotosToUse/20260123_162449.jpg';
import gal40 from '../../assets/images/Newest/NewestPhotosToUse/20260123_163922.jpg';
import gal41 from '../../assets/images/Newest/NewestPhotosToUse/20260123_163933.jpg';
import gal42 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164043.jpg';
import gal43 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164125.jpg';
import gal44 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164201.jpg';
import gal45 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164223.jpg';
import gal46 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164432.jpg';
import gal47 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164605.jpg';
import gal48 from '../../assets/images/Newest/NewestPhotosToUse/FB_IMG_1774428008107.jpg';
import gal49 from '../../assets/images/Newest/NewestPhotosToUse/FB_IMG_1774428010370.jpg';
import gal50 from '../../assets/images/Newest/NewestPhotosToUse/FB_IMG_1774428014952.jpg';

const galleryItems = [
  gal01,gal02,gal03,gal04,gal05,gal06,gal07,gal08,gal09,gal10,
  gal11,gal12,gal13,gal14,gal15,gal16,gal17,gal18,gal19,gal20,
  gal21,gal22,gal23,gal24,gal25,gal26,gal27,gal28,gal29,gal30,
  gal31,gal32,gal33,gal34,gal35,gal36,gal37,gal38,gal39,gal40,
  gal41,gal42,gal43,gal44,gal45,gal46,gal47,gal48,gal49,gal50,
].map((image, i) => ({ id: i + 1, image }));

const PortfolioPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [ref] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.45 } }
  };

  return (
    <div className="portfolio-page">
      <div className="portfolio-hero">
        <div className="portfolio-hero-overlay"></div>
        <div className="container">
          <h1 className="portfolio-hero-title">Gallery</h1>
          <p className="portfolio-hero-subtitle">
            Step inside paradise — a visual journey through Barra Cabanas
          </p>
        </div>
      </div>

      <section className="gallery-intro">
        <div className="container">
          <p className="gallery-description">
            Explore the beauty, comfort, and unforgettable atmosphere of our luxury beach accommodation. From serene sunrise views to elegant interiors and seaside moments, get inspired for your next escape to Mozambique.
          </p>
        </div>
      </section>

      <section className="portfolio-content">
        <div className="container">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="portfolio-grid"
          >
            <AnimatePresence>
              {galleryItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  className="portfolio-item"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="portfolio-image">
                    <img src={item.image} alt="Barra Cabanas" />
                    <div className="portfolio-overlay">
                      <span className="view-project">View Photo</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {selectedItem && (
        <div className="project-modal" onClick={() => setSelectedItem(null)}>
          <div className="modal-content modal-image-only" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedItem(null)}>×</button>
            <div className="modal-image">
              <img src={selectedItem.image} alt="Barra Cabanas" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
