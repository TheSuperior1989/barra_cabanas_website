import Hero from './Hero';
import ServicesOverview from './ServicesOverview';
import HouseFeatures from './HouseFeatures';
import Testimonials from './Testimonials';
import ContactCTA from './ContactCTA';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <HouseFeatures />
      <ServicesOverview />
      <Testimonials />
      <ContactCTA />
    </div>
  );
};

export default HomePage;
