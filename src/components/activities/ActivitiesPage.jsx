import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ActivitiesPage.css';
import { sendContactForm } from '../../services/emailService';

import activityScubaDiving from '../../assets/images/Activities/activity-scuba-diving.jpg';
import activityDeepSeaFishing from '../../assets/images/Activities/activity-deep-sea-fishing.jpg';
import activityDolphins from '../../assets/images/Activities/activity-dolphins.jpg';
import activityKayaking from '../../assets/images/Activities/activity-kayaking.jpg';
import activityDhowCruise from '../../assets/images/Activities/activity-dhow-cruise.jpg';
import activityVillageTour from '../../assets/images/Activities/activity-village-tour.jpg';
import activityBeachVolleyball from '../../assets/images/Activities/activity-beach-volleyball.jpg';
import activityQuadBiking from '../../assets/images/Activities/activity-quad-biking.jpg';

const activities = [
  {
    id: 1,
    name: 'Scuba Diving & Snorkeling',
    emoji: '🤿',
    image: activityScubaDiving,
    highlights: ['World-class reef diving', 'Marine life encounters', 'Beginner & advanced trips', 'Professional dive operators'],
    description: 'The waters around Barra are among the best in Mozambique for diving and snorkelling. Explore vibrant coral reefs teeming with tropical fish, turtles, rays, and whale sharks in season. Local dive operators offer full equipment hire, guided dives, and PADI courses for all levels.'
  },
  {
    id: 2,
    name: 'Deep Sea Fishing',
    emoji: '🎣',
    image: activityDeepSeaFishing,
    highlights: ['Marlin, sailfish & tuna', 'Half & full-day charters', 'Experienced skippers', 'Catch-and-release available'],
    description: 'Barra is renowned for world-class big game fishing. The warm Mozambique Channel is home to marlin, sailfish, dorado, yellowfin tuna, and kingfish. Charter a fully equipped boat with an experienced skipper and crew for an unforgettable day on the water.',
    featuredLink: '/activities/fishing',
    featuredLinkText: 'View Charter Packages →'
  },
  {
    id: 3,
    name: 'Dolphin & Whale Watching',
    emoji: '🐬',
    image: activityDolphins,
    highlights: ['Bottlenose & spinner dolphins', 'Humpback whales (Jul–Nov)', 'Guided boat tours', 'Incredible photo opportunities'],
    description: 'Barra is blessed with resident pods of bottlenose and spinner dolphins that can often be seen from the shore or on short boat trips. From July to November, humpback whales migrate through the channel — one of nature\'s most spectacular shows. Boat tours can be arranged locally.'
  },
  {
    id: 4,
    name: 'Kayaking & Paddleboarding',
    emoji: '🚣',
    image: activityKayaking,
    highlights: ['Calm lagoon paddling', 'Ocean kayaking', 'Equipment hire available', 'Suitable for all ages'],
    description: 'Explore the calm waters and hidden coves along the coastline at your own pace. Rent kayaks or paddleboards from local operators and paddle through the tranquil lagoon or along the pristine beachfront. Ideal for families and a wonderful way to connect with nature.'
  },
  {
    id: 5,
    name: 'Sunset Dhow Cruises',
    emoji: '⛵',
    image: activityDhowCruise,
    highlights: ['Traditional wooden dhow', 'Sunset views over the channel', 'Refreshments included', 'Romantic & group options'],
    description: 'Drift across the Indian Ocean on a traditional dhow sailboat and watch the sun melt into the horizon. These magical sunset cruises are a Barra tradition and an absolute highlight of any visit. Sundowners, snacks, and spectacular views are guaranteed.'
  },
  {
    id: 6,
    name: 'Cultural Village Tours',
    emoji: '🏡',
    image: activityVillageTour,
    highlights: ['Local village experiences', 'Traditional crafts & food', 'Guided local tours', 'Photography opportunities'],
    description: 'Step beyond the beach and discover the authentic culture of Inhambane Province. Guided village tours introduce you to local Mozambican life, traditional fishing communities, vibrant markets, and the warm hospitality that makes this region so special.'
  },
  {
    id: 7,
    name: 'Beach Volleyball & Water Sports',
    emoji: '🏐',
    image: activityBeachVolleyball,
    highlights: ['Beach volleyball court', 'Surfing & bodyboarding', 'Sandboarding the dunes', 'Right on your doorstep'],
    description: 'The beach in front of Barra Cabanas is perfect for a variety of watersports and beach activities. Play beach volleyball, try your hand at surfing the Indian Ocean swells, or explore the magnificent sand dunes that line this stretch of coastline.'
  },
  {
    id: 8,
    name: 'Quad Biking & 4x4 Trails',
    emoji: '🏍️',
    image: activityQuadBiking,
    highlights: ['Coastal dune trails', 'Guided & self-guided rides', 'Suitable for beginners', 'Beach & bush routes'],
    description: 'Explore the dramatic sand dunes, bush tracks, and coastal paths around Barra on quad bikes or in a 4x4 vehicle. Local operators offer guided tours that take you through spectacular scenery — from sweeping ocean vistas to remote bush trails teeming with wildlife.'
  }
];

const operators = [
  {
    name: 'Kape Kape Tours',
    activity: 'Quad Biking',
    emoji: '🏍️',
    description: 'Guided quad bike tours along Barra\'s dramatic coastal dunes and beach tracks.',
    link: 'https://share.google/dCxF0XI6NwFOaIxy2',
    linkLabel: 'View on Google Maps',
    initials: 'KK',
    color: '#D4C4A3',
  },
  {
    name: 'Aquaholics Barra',
    activity: 'Scuba Diving & Snorkeling',
    emoji: '🤿',
    description: 'PADI-certified dive centre at Barra Beach. Reef dives, freediving, courses, kayak hire & ocean safaris.',
    link: 'https://www.barrascuba.com',
    linkLabel: 'Visit Website',
    initials: 'AB',
    color: '#A5BDAB',
  },
  {
    name: 'SEE Activity Center',
    activity: 'Watersports & Activities',
    emoji: '🌊',
    description: 'Dolphin & whale watching, dhow cruises, mangrove kayaking, and guided ocean safaris from Barra.',
    link: 'https://www.facebook.com/SEEActivityCenter',
    linkLabel: 'Find on Facebook',
    initials: 'SEE',
    color: '#87A78F',
  },
  {
    name: 'Coco Adventure Village',
    activity: 'Cultural Tours',
    emoji: '🏡',
    description: 'Authentic cultural village experiences — meet local Mozambican communities and explore traditional life.',
    link: 'https://share.google/L2xeRcYt4XeqRiK9a',
    linkLabel: 'View on Google Maps',
    initials: 'CA',
    color: '#E8D5B7',
  },
  {
    name: 'Barra Vida',
    activity: 'Island Excursions',
    emoji: '⛵',
    description: 'Estuary & island boat trips — Pansy Island, Linga Linga village, sunset cruises & BBQ charters.',
    link: 'https://www.facebook.com/share/1LUn5VWGeo/',
    linkLabel: 'Find on Facebook',
    initials: 'BV',
    color: '#C8B8AF',
  },
];

const restaurants = [
  {
    name: "Branko's",
    location: 'Tofo — 22 km',
    emoji: '🍕',
    description: 'Consistently rated #1 in Tofo. Famous for wood-fired pizzas, hot stone tuna and seafood. Budget-friendly and legendary.',
    phone: '+258 84 066 6470',
    whatsapp: 'https://wa.me/258840666470',
    highlight: true,
  },
  {
    name: "Dino's Beach Bar & Restaurant",
    location: 'Tofo — 22 km',
    emoji: '🍹',
    description: 'Tofo\'s landmark beachfront bar since 1999. Pizzas, seafood, cocktails, live music and DJs. Open Thu–Tue.',
    facebook: 'https://www.facebook.com/DinosBeachBar',
  },
  {
    name: 'Sumi Bar & Kitchen',
    location: 'Tofo — 22 km',
    emoji: '🍱',
    description: 'Authentic Japanese sushi and cuisine in stunning tropical surrounds. TripAdvisor 4.6/5.',
    phone: '+258 84 564 6554',
    whatsapp: 'https://wa.me/258845646554',
    facebook: 'https://www.facebook.com/sumibarandkitchen',
  },
  {
    name: 'Bistro O Pescador',
    location: 'Inhambane — 25 km',
    emoji: '🦐',
    description: 'Seafood, curries and pizzas at the old port of Inhambane with beautiful harbour views.',
    facebook: 'https://www.facebook.com/people/Bistro-O-Pescador/100051397136209',
  },
  {
    name: 'Restaurante Ponte Cais',
    location: 'Inhambane — 25 km',
    emoji: '🌊',
    description: 'Bay-view restaurant at the pier — best seafood and pizza in Inhambane town. 4.1/5 on Google (321 reviews).',
    phone: '+258 84 629 3189',
    whatsapp: 'https://wa.me/258846293189',
  },
  {
    name: "Verdinho's",
    location: 'Inhambane — 25 km',
    emoji: '🍽️',
    description: 'Popular local café and pizzeria. Affordable, delicious and a genuine local favourite.',
    facebook: 'https://www.facebook.com/Verdinhos.Inhambane',
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
              <motion.div key={activity.id} className={`activity-card${activity.featuredLink ? ' activity-card--featured' : ''}`} variants={itemVariants}>
                <div className="activity-image">
                  <img src={activity.image} alt={activity.name} />
                  <div className="activity-image-overlay">
                    <span className="activity-emoji">{activity.emoji}</span>
                  </div>
                  {activity.featuredLink && (
                    <div className="activity-lodge-badge">Offered at the Lodge</div>
                  )}
                </div>
                <div className="activity-body">
                  <h2 className="activity-name">{activity.name}</h2>
                  <p className="activity-description">{activity.description}</p>
                  <ul className="activity-highlights">
                    {activity.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                  {activity.featuredLink && (
                    <Link to={activity.featuredLink} className="activity-featured-link">
                      {activity.featuredLinkText}
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Local Operators */}
      <section className="activities-operators-section">
        <div className="container">
          <div className="activities-enquiry-header">
            <h2>Activity Operators</h2>
            <p>Trusted local operators we recommend to our guests. Click any card to visit their page and book directly.</p>
          </div>
          <div className="operator-logo-grid">
            {operators.map((op) => (
              <a
                key={op.name}
                href={op.link}
                target="_blank"
                rel="noopener noreferrer"
                className="operator-logo-card"
              >
                {/* Drop a logo image file at src/assets/images/Partners/<name>.png to replace this block */}
                <div className="operator-logo-placeholder" style={{ background: op.color }}>
                  <span className="operator-logo-initials">{op.initials}</span>
                  <span className="operator-logo-emoji">{op.emoji}</span>
                </div>
                <div className="operator-logo-body">
                  <span className="operator-logo-tag">{op.activity}</span>
                  <h4 className="operator-logo-name">{op.name}</h4>
                  <p className="operator-logo-desc">{op.description}</p>
                  <span className="operator-logo-cta">{op.linkLabel} →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant Suggestions */}
      <section className="activities-restaurants-section">
        <div className="container">
          <div className="activities-enquiry-header">
            <h2>Where to Eat Nearby</h2>
            <p>From beachfront bars to authentic Japanese cuisine — here are our favourite restaurants within easy reach of Barra Cabanas.</p>
          </div>
          <div className="restaurants-grid">
            {restaurants.map((r) => (
              <div key={r.name} className={`restaurant-card${r.highlight ? ' restaurant-card--highlight' : ''}`}>
                {r.highlight && <div className="restaurant-badge">Guest Favourite</div>}
                <div className="restaurant-header">
                  <span className="restaurant-emoji">{r.emoji}</span>
                  <div>
                    <h4 className="restaurant-name">{r.name}</h4>
                    <span className="restaurant-location">📍 {r.location}</span>
                  </div>
                </div>
                <p className="restaurant-description">{r.description}</p>
                <div className="operator-links">
                  {r.whatsapp && (
                    <a href={r.whatsapp} className="operator-link operator-link--whatsapp" target="_blank" rel="noopener noreferrer">
                      💬 {r.phone}
                    </a>
                  )}
                  {r.facebook && (
                    <a href={r.facebook} className="operator-link operator-link--fb" target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  )}
                </div>
              </div>
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
