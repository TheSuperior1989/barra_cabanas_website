import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './FeaturedProjects.css';
import exteriorBeachfront from '../../assets/images/Houses/exterior-beachfront-construction.jpg';
import kitchenGalleyWhite from '../../assets/images/Houses/kitchen-galley-white.jpg';
import bedroomSuite11 from '../../assets/images/Houses/bedroom-suite-11.jpg';

// Barra Cabanas luxury beachfront holiday houses
const houses = [
  {
    id: 1,
    title: 'Beachfront Luxury',
    category: '6-Bedroom Holiday House',
    image: exteriorBeachfront,
    description: 'Stunning beachfront property with 6 en-suite bedrooms, private splash pool, and panoramic ocean views. Perfect for families and groups up to 12 guests.',
    link: '/services#barra-cabanas-house'
  },
  {
    id: 2,
    title: 'Modern Comfort',
    category: 'Fully Equipped Kitchen',
    image: kitchenGalleyWhite,
    description: 'Fully equipped modern kitchen with gas stove, airfryer, and all essentials. Enjoy braai facilities on the veranda with ocean views.',
    link: '/services#barra-cabanas-house'
  },
  {
    id: 3,
    title: 'Elegant Interiors',
    category: 'Air-Conditioned Bedrooms',
    image: bedroomSuite11,
    description: 'Spacious en-suite bedrooms with air-conditioning, queen and twin bed options, and elegant coastal design throughout.',
    link: '/services#barra-cabanas-house'
  }
];

const FeaturedProjects = () => {
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
    <section className="featured-projects" id="houses">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Houses</h2>
          <p className="section-subtitle">
            Discover a selection of our most stunning beachfront accommodations — each uniquely styled for unforgettable stays.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="projects-grid"
        >
          {houses.map((house) => (
            <motion.div key={house.id} className="project-card" variants={itemVariants}>
              <div className="project-image">
                <img src={house.image} alt={house.title} />
                <div className="project-overlay">
                  <Link to={house.link} className="project-link">
                    View House
                  </Link>
                </div>
              </div>
              <div className="project-content">
                <span className="project-category">{house.category}</span>
                <h3 className="project-title">{house.title}</h3>
                <p className="project-description">{house.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="projects-cta">
          <Link to="/services" className="btn btn-primary">
            View All Houses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
