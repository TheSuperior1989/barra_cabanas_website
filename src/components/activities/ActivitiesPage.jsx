import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import './ActivitiesPage.css';
import infoSheetPDF from '../../assets/documents/barra-cabanas-info-sheet.pdf';

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
    description: 'Barra is renowned for world-class big game fishing. The warm Mozambique Channel is home to marlin, sailfish, dorado, yellowfin tuna, and kingfish. Charter a fully equipped boat with an experienced skipper and crew for an unforgettable day on the water.'
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

const ActivitiesPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
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
              <motion.div key={activity.id} className="activity-card" variants={itemVariants}>
                <div className="activity-image">
                  <img src={activity.image} alt={activity.name} />
                  <div className="activity-image-overlay">
                    <span className="activity-emoji">{activity.emoji}</span>
                  </div>
                </div>
                <div className="activity-body">
                  <h2 className="activity-name">{activity.name}</h2>
                  <p className="activity-description">{activity.description}</p>
                  <ul className="activity-highlights">
                    {activity.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="activities-pdf-section"
          >
            <FontAwesomeIcon icon={faFileDownload} className="pdf-icon" />
            <div>
              <h3>Full Activities Guide</h3>
              <p>Download our comprehensive info sheet for detailed pricing, contact information, and booking details for all activities.</p>
            </div>
            <a
              href={infoSheetPDF}
              download="Barra-Cabanas-Info-Sheet.pdf"
              className="btn-download"
            >
              Download Info Sheet
            </a>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default ActivitiesPage;
