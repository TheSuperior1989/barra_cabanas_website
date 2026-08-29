import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './PortfolioPage.css';

import gal01 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0116.jpg';
import thumb01 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0116.jpg?thumb';
import gal02 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0118.jpg';
import thumb02 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0118.jpg?thumb';
import gal03 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0141.jpg';
import thumb03 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0141.jpg?thumb';
import gal04 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0144.jpg';
import thumb04 from '../../assets/images/Newest/NewestPhotosToUse/DJI_0144.jpg?thumb';
import gal05 from '../../assets/images/Newest/NewestPhotosToUse/Top_View.jpg';
import thumb05 from '../../assets/images/Newest/NewestPhotosToUse/Top_View.jpg?thumb';
import gal06 from '../../assets/images/Newest/NewestPhotosToUse/DSC05343.jpg';
import thumb06 from '../../assets/images/Newest/NewestPhotosToUse/DSC05343.jpg?thumb';
import gal07 from '../../assets/images/Newest/NewestPhotosToUse/DSC05351.jpg';
import thumb07 from '../../assets/images/Newest/NewestPhotosToUse/DSC05351.jpg?thumb';
import gal08 from '../../assets/images/Newest/NewestPhotosToUse/DSC05352.jpg';
import thumb08 from '../../assets/images/Newest/NewestPhotosToUse/DSC05352.jpg?thumb';
import gal09 from '../../assets/images/Newest/NewestPhotosToUse/DSC05355.jpg';
import thumb09 from '../../assets/images/Newest/NewestPhotosToUse/DSC05355.jpg?thumb';
import gal12 from '../../assets/images/Newest/NewestPhotosToUse/DSC05361.jpg';
import thumb12 from '../../assets/images/Newest/NewestPhotosToUse/DSC05361.jpg?thumb';
import gal13 from '../../assets/images/Newest/NewestPhotosToUse/DSC05363.jpg';
import thumb13 from '../../assets/images/Newest/NewestPhotosToUse/DSC05363.jpg?thumb';
import gal14 from '../../assets/images/Newest/NewestPhotosToUse/DSC05370.jpg';
import thumb14 from '../../assets/images/Newest/NewestPhotosToUse/DSC05370.jpg?thumb';
import gal15 from '../../assets/images/Newest/NewestPhotosToUse/DSC05376.jpg';
import thumb15 from '../../assets/images/Newest/NewestPhotosToUse/DSC05376.jpg?thumb';
import gal16 from '../../assets/images/Newest/NewestPhotosToUse/DSC05377.jpg';
import thumb16 from '../../assets/images/Newest/NewestPhotosToUse/DSC05377.jpg?thumb';
import gal17 from '../../assets/images/Newest/NewestPhotosToUse/DSC05379.jpg';
import thumb17 from '../../assets/images/Newest/NewestPhotosToUse/DSC05379.jpg?thumb';
import gal19 from '../../assets/images/Newest/NewestPhotosToUse/DSC05383.jpg';
import thumb19 from '../../assets/images/Newest/NewestPhotosToUse/DSC05383.jpg?thumb';
import gal21 from '../../assets/images/Newest/NewestPhotosToUse/DSC05397.jpg';
import thumb21 from '../../assets/images/Newest/NewestPhotosToUse/DSC05397.jpg?thumb';
import gal22 from '../../assets/images/Newest/NewestPhotosToUse/DSC05412.jpg';
import thumb22 from '../../assets/images/Newest/NewestPhotosToUse/DSC05412.jpg?thumb';
import gal23 from '../../assets/images/Newest/NewestPhotosToUse/DSC05420.jpg';
import thumb23 from '../../assets/images/Newest/NewestPhotosToUse/DSC05420.jpg?thumb';
import gal24 from '../../assets/images/Newest/NewestPhotosToUse/DSC05426.jpg';
import thumb24 from '../../assets/images/Newest/NewestPhotosToUse/DSC05426.jpg?thumb';
import gal25 from '../../assets/images/Newest/NewestPhotosToUse/DSC05433.jpg';
import thumb25 from '../../assets/images/Newest/NewestPhotosToUse/DSC05433.jpg?thumb';
import gal26 from '../../assets/images/Newest/NewestPhotosToUse/DSC05437.jpg';
import thumb26 from '../../assets/images/Newest/NewestPhotosToUse/DSC05437.jpg?thumb';
import gal27 from '../../assets/images/Newest/NewestPhotosToUse/DSC05441.jpg';
import thumb27 from '../../assets/images/Newest/NewestPhotosToUse/DSC05441.jpg?thumb';
import gal28 from '../../assets/images/Newest/NewestPhotosToUse/DSC05442.jpg';
import thumb28 from '../../assets/images/Newest/NewestPhotosToUse/DSC05442.jpg?thumb';
import gal29 from '../../assets/images/Newest/NewestPhotosToUse/DSC05445.jpg';
import thumb29 from '../../assets/images/Newest/NewestPhotosToUse/DSC05445.jpg?thumb';
import gal30 from '../../assets/images/Newest/NewestPhotosToUse/DSC05451.jpg';
import thumb30 from '../../assets/images/Newest/NewestPhotosToUse/DSC05451.jpg?thumb';
import gal31 from '../../assets/images/Newest/NewestPhotosToUse/DSC05454.jpg';
import thumb31 from '../../assets/images/Newest/NewestPhotosToUse/DSC05454.jpg?thumb';
import gal32 from '../../assets/images/Newest/NewestPhotosToUse/DSC05459.jpg';
import thumb32 from '../../assets/images/Newest/NewestPhotosToUse/DSC05459.jpg?thumb';
import gal33 from '../../assets/images/Newest/NewestPhotosToUse/DSC05462.jpg';
import thumb33 from '../../assets/images/Newest/NewestPhotosToUse/DSC05462.jpg?thumb';
import gal34 from '../../assets/images/Newest/NewestPhotosToUse/DSC05465.jpg';
import thumb34 from '../../assets/images/Newest/NewestPhotosToUse/DSC05465.jpg?thumb';
import gal35 from '../../assets/images/Newest/NewestPhotosToUse/DSC05477.jpg';
import thumb35 from '../../assets/images/Newest/NewestPhotosToUse/DSC05477.jpg?thumb';
import gal36 from '../../assets/images/Newest/NewestPhotosToUse/DSC05480.jpg';
import thumb36 from '../../assets/images/Newest/NewestPhotosToUse/DSC05480.jpg?thumb';
import gal37 from '../../assets/images/Newest/NewestPhotosToUse/DSC05482.jpg';
import thumb37 from '../../assets/images/Newest/NewestPhotosToUse/DSC05482.jpg?thumb';
import gal38 from '../../assets/images/Newest/NewestPhotosToUse/DSC05485.jpg';
import thumb38 from '../../assets/images/Newest/NewestPhotosToUse/DSC05485.jpg?thumb';
import gal39 from '../../assets/images/Newest/NewestPhotosToUse/20260123_162449.jpg';
import thumb39 from '../../assets/images/Newest/NewestPhotosToUse/20260123_162449.jpg?thumb';
import gal40 from '../../assets/images/Newest/NewestPhotosToUse/20260123_163922.jpg';
import thumb40 from '../../assets/images/Newest/NewestPhotosToUse/20260123_163922.jpg?thumb';
import gal41 from '../../assets/images/Newest/NewestPhotosToUse/20260123_163933.jpg';
import thumb41 from '../../assets/images/Newest/NewestPhotosToUse/20260123_163933.jpg?thumb';
import gal42 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164043.jpg';
import thumb42 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164043.jpg?thumb';
import gal43 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164125.jpg';
import thumb43 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164125.jpg?thumb';
import gal44 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164201.jpg';
import thumb44 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164201.jpg?thumb';
import gal45 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164223.jpg';
import thumb45 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164223.jpg?thumb';
import gal46 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164432.jpg';
import thumb46 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164432.jpg?thumb';
import gal47 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164605.jpg';
import thumb47 from '../../assets/images/Newest/NewestPhotosToUse/20260123_164605.jpg?thumb';
import gal48 from '../../assets/images/Newest/NewestPhotosToUse/FB_IMG_1774428008107.jpg';
import thumb48 from '../../assets/images/Newest/NewestPhotosToUse/FB_IMG_1774428008107.jpg?thumb';
import gal49 from '../../assets/images/Newest/NewestPhotosToUse/FB_IMG_1774428010370.jpg';
import thumb49 from '../../assets/images/Newest/NewestPhotosToUse/FB_IMG_1774428010370.jpg?thumb';
import gal50 from '../../assets/images/Newest/NewestPhotosToUse/FB_IMG_1774428014952.jpg';
import thumb50 from '../../assets/images/Newest/NewestPhotosToUse/FB_IMG_1774428014952.jpg?thumb';

// Number of tiles rendered eagerly. These sit above the fold on a desktop
// grid, so deferring them would only delay the largest contentful paint.
const EAGER_TILE_COUNT = 6;

// Intrinsic dimensions are declared so the browser can reserve each tile's
// space before the image arrives, which removes gallery layout shift.
//
// NOTE: the `alt` values below describe the property and its setting. They
// replace the single repeated "Barra Cabanas" string that previously sat on
// all 46 images, but they are still generic. Per-photo descriptions written
// by someone who knows what each shot actually shows would be better again,
// both for search and for screen-reader users.
const galleryItems = [
  { image: gal01, thumb: thumb01, width: 3878, height: 2181, alt: 'Aerial view of Barra Cabanas and the surrounding beachfront in Barra, Mozambique' },
  { image: gal02, thumb: thumb02, width: 3810, height: 2143, alt: 'Aerial view over the Barra Cabanas property and the Indian Ocean shoreline' },
  { image: gal03, thumb: thumb03, width: 3955, height: 2225, alt: 'Drone photograph of the Barra Cabanas grounds and palm-lined coastline' },
  { image: gal04, thumb: thumb04, width: 3490, height: 1963, alt: 'Aerial perspective of the beach houses at Barra Cabanas, Inhambane province' },
  { image: gal05, thumb: thumb05, width: 3946, height: 2220, alt: 'Overhead view of the Barra Cabanas beach house complex and its coastal setting' },
  { image: gal06, thumb: thumb06, width: 4389, height: 6584, alt: 'Beach house exterior at Barra Cabanas surrounded by tropical planting' },
  { image: gal07, thumb: thumb07, width: 4410, height: 2940, alt: 'Barra Cabanas luxury beach house accommodation in Barra, Mozambique' },
  { image: gal08, thumb: thumb08, width: 4608, height: 3072, alt: 'Interior living space at Barra Cabanas beach house accommodation' },
  { image: gal09, thumb: thumb09, width: 4464, height: 2976, alt: 'Guest accommodation interior at Barra Cabanas, Mozambique' },
  { image: gal12, thumb: thumb12, width: 4547, height: 3031, alt: 'Living and dining area inside a Barra Cabanas beach house' },
  { image: gal13, thumb: thumb13, width: 4564, height: 3043, alt: 'Furnished interior of a self-catering beach house at Barra Cabanas' },
  { image: gal14, thumb: thumb14, width: 2986, height: 4479, alt: 'Interior detail of a Barra Cabanas beach house in Barra, Mozambique' },
  { image: gal15, thumb: thumb15, width: 4552, height: 3035, alt: 'Bedroom accommodation at Barra Cabanas beach houses' },
  { image: gal16, thumb: thumb16, width: 4608, height: 3072, alt: 'Guest bedroom inside a Barra Cabanas beachfront holiday house' },
  { image: gal17, thumb: thumb17, width: 4608, height: 3072, alt: 'Kitchen and dining space in a self-catering house at Barra Cabanas' },
  { image: gal19, thumb: thumb19, width: 3024, height: 4536, alt: 'Bathroom facilities in a Barra Cabanas beach house' },
  { image: gal21, thumb: thumb21, width: 4474, height: 2983, alt: 'Covered outdoor living area at Barra Cabanas, Barra, Mozambique' },
  { image: gal22, thumb: thumb22, width: 4451, height: 2967, alt: 'Outdoor entertainment space at the Barra Cabanas beach houses' },
  { image: gal23, thumb: thumb23, width: 4457, height: 2971, alt: 'Shaded veranda overlooking the grounds at Barra Cabanas' },
  { image: gal24, thumb: thumb24, width: 4019, height: 2679, alt: 'Tropical garden setting at Barra Cabanas beachfront accommodation' },
  { image: gal25, thumb: thumb25, width: 4336, height: 2891, alt: 'Palm trees and grounds at Barra Cabanas in Barra, Mozambique' },
  { image: gal26, thumb: thumb26, width: 4608, height: 3072, alt: 'Pathway through the Barra Cabanas property toward the beach' },
  { image: gal27, thumb: thumb27, width: 6654, height: 4436, alt: 'Reception and entrance area at Barra Cabanas, Mozambique' },
  { image: gal28, thumb: thumb28, width: 6434, height: 4289, alt: 'Entrance courtyard at the Barra Cabanas beach house complex' },
  { image: gal29, thumb: thumb29, width: 4672, height: 7008, alt: 'Beach access walkway at Barra Cabanas, Barra, Mozambique' },
  { image: gal30, thumb: thumb30, width: 6709, height: 4473, alt: 'Beachfront view from the Barra Cabanas property' },
  { image: gal31, thumb: thumb31, width: 4373, height: 2915, alt: 'Indian Ocean shoreline at Barra, Mozambique, seen from Barra Cabanas' },
  { image: gal32, thumb: thumb32, width: 4515, height: 3010, alt: 'Beach and dune landscape beside Barra Cabanas accommodation' },
  { image: gal33, thumb: thumb33, width: 4580, height: 3053, alt: 'Coastal view from the Barra Cabanas beach houses' },
  { image: gal34, thumb: thumb34, width: 6444, height: 4296, alt: 'Open-plan kitchen with ocean-facing doors at Barra Cabanas' },
  { image: gal35, thumb: thumb35, width: 6276, height: 4184, alt: 'Entrance gate and signage at Barra Cabanas, Barra, Mozambique' },
  { image: gal36, thumb: thumb36, width: 6755, height: 4503, alt: 'Beach bar and palm trees at the Barra Cabanas property' },
  { image: gal37, thumb: thumb37, width: 4619, height: 6928, alt: 'Tropical entrance walkway at Barra Cabanas beach houses' },
  { image: gal38, thumb: thumb38, width: 6737, height: 4558, alt: 'Courtyard planting at Barra Cabanas beachfront accommodation' },
  { image: gal39, thumb: thumb39, width: 4000, height: 2252, alt: 'Barra Cabanas property and beachfront in Barra, Mozambique' },
  { image: gal40, thumb: thumb40, width: 4000, height: 2252, alt: 'Beach and ocean view at Barra Cabanas, Inhambane province' },
  { image: gal41, thumb: thumb41, width: 4000, height: 2252, alt: 'Shoreline at Barra Cabanas beach house accommodation' },
  { image: gal42, thumb: thumb42, width: 4000, height: 2252, alt: 'Coastal scenery beside the Barra Cabanas beach houses' },
  { image: gal43, thumb: thumb43, width: 4000, height: 2252, alt: 'Beachfront outlook from Barra Cabanas, Barra, Mozambique' },
  { image: gal44, thumb: thumb44, width: 4000, height: 2252, alt: 'Ocean views at the Barra Cabanas holiday accommodation' },
  { image: gal45, thumb: thumb45, width: 4000, height: 2252, alt: 'Beach and sea at Barra, Mozambique, near Barra Cabanas' },
  { image: gal46, thumb: thumb46, width: 4000, height: 2252, alt: 'Sandy beach beside the Barra Cabanas beach house complex' },
  { image: gal47, thumb: thumb47, width: 4000, height: 2252, alt: 'Coastline near Barra Cabanas in Barra, Mozambique' },
  { image: gal48, thumb: thumb48, width: 1153, height: 2048, alt: 'Guest photograph from a stay at Barra Cabanas, Mozambique' },
  { image: gal49, thumb: thumb49, width: 2048, height: 1153, alt: 'Guest photograph of the beachfront at Barra Cabanas' },
  { image: gal50, thumb: thumb50, width: 1153, height: 2048, alt: 'Guest photograph taken at Barra Cabanas beach houses' },
].map((item, i) => ({ ...item, id: i + 1 }));

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
              {galleryItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  className="portfolio-item"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="portfolio-image">
                    <img
                      src={item.thumb}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      loading={index < EAGER_TILE_COUNT ? 'eager' : 'lazy'}
                      decoding="async"
                    />
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
              <img
                src={selectedItem.image}
                alt={selectedItem.alt}
                width={selectedItem.width}
                height={selectedItem.height}
                decoding="async"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
