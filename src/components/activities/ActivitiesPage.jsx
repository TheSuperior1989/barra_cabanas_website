import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ActivitiesPage.css';
import { sendContactForm } from '../../services/emailService';

import activityScubaDiving from '../../assets/images/Activities/activity-scuba-diving.jpg';
import activityDeepSeaFishing from '../../assets/images/Activities/activity-deep-sea-fishing.jpg';
import activityDolphins from '../../assets/images/Activities/activity-dolphins.jpg';
import activityDhowCruise from '../../assets/images/Activities/activity-dhow-cruise.jpg';
import activityVillageTour from '../../assets/images/Activities/activity-village-tour.jpg';
import activityQuadBiking from '../../assets/images/Activities/activity-quad-biking.jpg';

import restThirstyParrot from '../../assets/images/Activities/Restaurants/thirsty-parrot.jpeg';
import restCaptainsTable from '../../assets/images/Activities/Restaurants/the-captains-table.jpeg';
import restTikiBar from '../../assets/images/Activities/Restaurants/tiki-bar.jpeg';
import restPaladar from '../../assets/images/Activities/Restaurants/paladar-restaurant-bar.jpeg';
import restNeptunes from '../../assets/images/Activities/Restaurants/neptunes-lodge-beach-bar.jpeg';
import restWhiteSands from '../../assets/images/Activities/Restaurants/white-sands.jpg';

const activities = [
  {
    id: 1,
    name: 'Deep Sea Fishing',
    emoji: '🎣',
    image: activityDeepSeaFishing,
    highlights: ['Marlin, sailfish & tuna', 'Half & full-day charters', 'Experienced skippers', 'Catch-and-release available'],
    description: 'Barra is renowned for world-class big game fishing. The warm Mozambique Channel is home to marlin, sailfish, dorado, yellowfin tuna, and kingfish. Charter a fully equipped boat with an experienced skipper for an unforgettable day offshore.',
    featuredLink: '/activities/fishing',
    featuredLinkText: 'View Charter Packages →',
    lodgeBadge: true,
    operator: { name: 'Jigalouw Fishing Adventures' },
  },
  {
    id: 2,
    name: 'Scuba Diving & Snorkeling',
    emoji: '🤿',
    image: activityScubaDiving,
    highlights: ['World-class reef diving', 'Marine life encounters', 'PADI courses available', 'Kayak hire & ocean safaris'],
    description: 'The waters around Barra are among the best in Mozambique for diving and snorkelling. Explore vibrant coral reefs teeming with tropical fish, turtles, rays, and whale sharks in season. Aquaholics offer full equipment hire, guided dives, freediving, and PADI courses for all levels.',
    operator: { name: 'Aquaholics Barra', link: 'https://www.barrascuba.com', linkLabel: 'Visit Website' },
  },
  {
    id: 3,
    name: 'Watersports & Ocean Activities',
    emoji: '🌊',
    image: activityDolphins,
    highlights: ['Dolphin & whale watching', 'Mangrove kayaking', 'Sunset dhow cruises', 'Guided ocean safaris'],
    description: 'From dolphin and whale watching to mangrove kayaking and guided ocean safaris, SEE Activity Center offers a full range of ocean experiences right from Barra. Humpback whales migrate through the channel July–November — one of the most spectacular natural events on Earth.',
    operator: { name: 'SEE Activity Center', link: 'https://www.facebook.com/SEEActivityCenter', linkLabel: 'Find on Facebook' },
  },
  {
    id: 4,
    name: 'Island Excursions & Sunset Cruises',
    emoji: '⛵',
    image: activityDhowCruise,
    highlights: ['Pansy Island day trips', 'Linga Linga village', 'Sunset BBQ charters', 'Estuary boat tours'],
    description: 'Explore the stunning estuary and offshore islands around Inhambane with Barra Vida. From Pansy Island day trips to Linga Linga village visits and sunset BBQ cruises, these boat adventures reveal a side of Mozambique most visitors never see.',
    operator: { name: 'Barra Vida', link: 'https://www.facebook.com/share/1LUn5VWGeo/', linkLabel: 'Find on Facebook' },
  },
  {
    id: 5,
    name: 'Cultural Village Tours',
    emoji: '🏡',
    image: activityVillageTour,
    highlights: ['Local village experiences', 'Traditional crafts & food', 'Guided local tours', 'Photography opportunities'],
    description: 'Step beyond the beach and discover the authentic culture of Inhambane Province. Coco Adventure Village guides you through local Mozambican life, traditional fishing communities, vibrant markets, and the warm hospitality that makes this region so special.',
    operator: { name: 'Coco Adventure Village', link: 'https://share.google/L2xeRcYt4XeqRiK9a', linkLabel: 'View on Google Maps' },
  },
  {
    id: 6,
    name: 'Quad Biking & Dune Trails',
    emoji: '🏍️',
    image: activityQuadBiking,
    highlights: ['Coastal dune trails', 'Guided & self-guided rides', 'Suitable for beginners', 'Beach & bush routes'],
    description: 'Explore the dramatic sand dunes, bush tracks, and coastal paths around Barra on quad bikes. Kape Kape Tours offer guided rides that take you through spectacular scenery — from sweeping ocean vistas to remote bush trails. Based at Tofo Beach, just 15 minutes away.',
    operator: { name: 'Kape Kape Tours', link: 'https://share.google/dCxF0XI6NwFOaIxy2', linkLabel: 'View on Google Maps' },
  },
];

const restaurants = [
  // ── Barra ──────────────────────────────────────────────
  {
    name: 'Thirsty Parrot',
    location: 'Barra',
    emoji: '🦜',
    description: 'Popular beachside bar and restaurant right in Barra — great drinks, food, and a relaxed atmosphere.',
    image: restThirstyParrot,
    link: 'https://share.google/FkKpi4RDcXRjy1Qjl',
  },
  {
    name: "The Captain's Table",
    location: 'Barra',
    emoji: '⚓',
    description: 'A Barra favourite for fresh seafood and great meals in a casual setting close to the water.',
    image: restCaptainsTable,
    link: 'https://share.google/AuWRLEA4Nn6k1P8Md',
  },
  {
    name: 'Paladar at Sentidos',
    location: 'Barra',
    emoji: '🍽️',
    description: 'Restaurant at Sentidos resort offering a relaxed dining experience with beautiful surroundings.',
    image: restPaladar,
    link: 'https://share.google/YN39AzHfnwNbKcLfg',
  },
  {
    name: "Neptune's Lodge & Beach Bar",
    location: 'Barra',
    emoji: '🔱',
    description: 'Beachfront lodge and bar in Barra with fresh seafood and a great ocean atmosphere.',
    image: restNeptunes,
    link: 'https://www.google.com/search?kgmid=%2Fg%2F1vtt_08z&q=Neptune%E2%80%99s+Lodge+%26+Beach+Bar',
  },
  {
    name: 'White Sands',
    location: 'Barra',
    emoji: '🏖️',
    description: 'Relaxed restaurant and bar on the Barra beachfront — great for lunch and dinner.',
    image: restWhiteSands,
    link: 'https://www.google.com/search?kgmid=%2Fg%2F11cn5q3676&q=White+Sands+Mozambique',
  },
  {
    name: 'Far Away',
    location: 'Barra',
    emoji: '🌅',
    description: 'A chilled Barra spot to escape and unwind with good food and drinks.',
    image: null, link: null,
  },
  // ── Tofo ───────────────────────────────────────────────
  {
    name: 'Tiki Bar',
    location: 'Tofo — 22 km',
    emoji: '🌴',
    description: 'Laid-back tiki bar on Tofo Beach — the perfect spot for sundowners and light bites after a beach day.',
    image: restTikiBar,
    link: 'https://share.google/aTicCD5XG70ZUxPNm',
  },
  {
    name: "Branko's",
    location: 'Tofo — 22 km',
    emoji: '🍕',
    description: 'Consistently rated #1 in Tofo. Famous for wood-fired pizzas, hot stone tuna and seafood. Budget-friendly and legendary.',
    highlight: true,
    image: null, link: null,
  },
  {
    name: 'Sumi Bar & Kitchen',
    location: 'Tofo — 22 km',
    emoji: '🍱',
    description: 'Authentic Japanese sushi and cuisine in stunning tropical surrounds.',
    image: null, link: null,
  },
  {
    name: 'What You Want',
    location: 'Tofo — 22 km',
    emoji: '🍴',
    description: 'Casual and laid-back dining spot in Tofo — a local favourite for good food and good vibes.',
    image: null, link: null,
  },
  {
    name: 'Maracuja',
    location: 'Tofo — 22 km',
    emoji: '🌺',
    description: 'Popular Tofo restaurant known for fresh food and a welcoming tropical atmosphere.',
    image: null, link: null,
  },
  {
    name: 'Mango Beach',
    location: 'Tofo — 22 km',
    emoji: '🥭',
    description: 'Beachfront dining in Tofo with fresh local cuisine, cold drinks, and ocean views.',
    image: null, link: null,
  },
  {
    name: 'Datongo',
    location: 'Tofo — 22 km',
    emoji: '🐟',
    description: 'Local Tofo restaurant serving fresh catches and traditional Mozambican flavours.',
    image: null, link: null,
  },
  {
    name: 'Taco & Friends',
    location: 'Tofo — 22 km',
    emoji: '🌮',
    description: 'Fun and casual taco spot in Tofo — great for a quick, tasty and affordable meal.',
    image: null, link: null,
  },
  {
    name: 'Kumba Lodge',
    location: 'Tofo — 22 km',
    emoji: '🏡',
    description: 'Restaurant at Kumba Lodge offering a relaxed dining experience in the heart of Tofo.',
    image: null, link: null,
  },
  {
    name: 'Cabana Lodge',
    location: 'Tofo — 22 km',
    emoji: '🌿',
    description: 'Dining at Cabana Lodge — a Tofo institution with great food in a lush, relaxed setting.',
    image: null, link: null,
  },
];

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  activity: '',
  dates: '',
  guests: '',
  message: ''
};

const RestaurantCard = ({ r }) => (
  <div className={`restaurant-card${r.highlight ? ' restaurant-card--highlight' : ''}`}>
    {r.highlight && <div className="restaurant-badge">Guest Favourite</div>}
    {r.image && (
      <div className="restaurant-photo">
        <img src={r.image} alt={r.name} />
      </div>
    )}
    <div className="restaurant-header">
      <span className="restaurant-emoji">{r.emoji}</span>
      <div>
        <h4 className="restaurant-name">{r.name}</h4>
        <span className="restaurant-location">📍 {r.location}</span>
      </div>
    </div>
    <p className="restaurant-description">{r.description}</p>
    {r.link && (
      <a href={r.link} className="restaurant-link" target="_blank" rel="noopener noreferrer">
        Visit →
      </a>
    )}
  </div>
);

const ActivitiesPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    const result = await sendContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: `Activities Enquiry${formData.activity ? ` – ${formData.activity}` : ''}`,
      message: `Activity of interest: ${formData.activity || 'Not specified'}\nPreferred dates: ${formData.dates || 'Not specified'}\nGroup size: ${formData.guests || 'Not specified'}\n\n${formData.message}`,
      service: 'activities-enquiry'
    });
    setIsSubmitting(false);
    if (result.success) {
      setSubmitted(true);
      setFormData(EMPTY_FORM);
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="activities-page">
      <div className="activities-hero">
        <div className="activities-hero-overlay"></div>
        <div className="container">
          <h1 className="activities-hero-title">Activities & Experiences</h1>
          <p className="activities-hero-subtitle">
            Discover amazing adventures at your doorstep in Barra, Mozambique
          </p>
        </div>
      </div>

      <section className="activities-content">
        <div className="container">

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="activities-grid"
          >
            {activities.map((activity) => (
              <motion.div key={activity.id} className={`activity-card${activity.lodgeBadge ? ' activity-card--featured' : ''}`} variants={itemVariants}>
                <div className="activity-image">
                  <img src={activity.image} alt={activity.name} />
                  <div className="activity-image-overlay">
                    <span className="activity-emoji">{activity.emoji}</span>
                  </div>
                  {activity.lodgeBadge && (
                    <div className="activity-lodge-badge">Offered at the Lodge</div>
                  )}
                </div>
                <div className="activity-body">
                  {activity.operator && (
                    <span className="activity-operator-tag">
                      {activity.operator.name}
                    </span>
                  )}
                  <h2 className="activity-name">{activity.name}</h2>
                  <p className="activity-description">{activity.description}</p>
                  <ul className="activity-highlights">
                    {activity.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                  {activity.featuredLink ? (
                    <Link to={activity.featuredLink} className="activity-featured-link">
                      {activity.featuredLinkText}
                    </Link>
                  ) : activity.operator?.link ? (
                    <a href={activity.operator.link} target="_blank" rel="noopener noreferrer" className="activity-featured-link">
                      {activity.operator.linkLabel} →
                    </a>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Restaurant Suggestions */}
      <section className="activities-restaurants-section">
        <div className="container">
          <div className="activities-enquiry-header">
            <h2>Where to Eat Nearby</h2>
            <p>From Barra's beachside bars to Tofo's legendary restaurants — here are our favourite spots within easy reach of Barra Cabanas.</p>
          </div>

          <h3 className="restaurants-area-heading">📍 Barra</h3>
          <div className="restaurants-grid">
            {restaurants.filter(r => r.location === 'Barra').map((r) => (
              <RestaurantCard key={r.name} r={r} />
            ))}
          </div>

          <h3 className="restaurants-area-heading">📍 Tofo <span className="restaurants-area-sub">— 22 km</span></h3>
          <div className="restaurants-grid">
            {restaurants.filter(r => r.location !== 'Barra').map((r) => (
              <RestaurantCard key={r.name} r={r} />
            ))}
          </div>
        </div>
      </section>

      <section className="activities-enquiry-section">
        <div className="container">
          <div className="activities-enquiry-header">
            <h2>Enquire About Activities</h2>
            <p>Interested in booking an activity or want more information? Send us a message and we'll get back to you with details and pricing.</p>
          </div>

          {submitted ? (
            <div className="activities-enquiry-success">
              <h3>Thank You!</h3>
              <p>Your enquiry has been sent. We'll be in touch shortly with more details.</p>
              <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <form className="activities-enquiry-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="guests">Group Size</label>
                  <input type="number" id="guests" name="guests" min="1" value={formData.guests} onChange={handleChange} placeholder="Number of people" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="activity">Activity of Interest</label>
                  <select id="activity" name="activity" value={formData.activity} onChange={handleChange}>
                    <option value="">Select an activity</option>
                    <option value="Scuba Diving & Snorkeling">Scuba Diving & Snorkeling</option>
                    <option value="Deep Sea Fishing">Deep Sea Fishing</option>
                    <option value="Dolphin & Whale Watching">Dolphin & Whale Watching</option>
                    <option value="Kayaking & Paddleboarding">Kayaking & Paddleboarding</option>
                    <option value="Sunset Dhow Cruises">Sunset Dhow Cruises</option>
                    <option value="Cultural Village Tours">Cultural Village Tours</option>
                    <option value="Beach Volleyball & Water Sports">Beach Volleyball & Water Sports</option>
                    <option value="Quad Biking & 4x4 Trails">Quad Biking & 4x4 Trails</option>
                    <option value="Multiple Activities">Multiple Activities</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="dates">Preferred Dates</label>
                  <input type="text" id="dates" name="dates" value={formData.dates} onChange={handleChange} placeholder="e.g. 15–22 July 2026" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required placeholder="Tell us what you're looking for..." />
              </div>

              {errorMessage && (
                <div className="form-message error">{errorMessage}</div>
              )}

              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default ActivitiesPage;
