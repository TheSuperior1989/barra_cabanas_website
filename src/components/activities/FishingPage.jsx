import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { sendContactForm } from '../../services/emailService';
import fishingTimelapse from '../../assets/Videos/Fishing_Timelapse.mp4';
import fishingRatesPDF from '../../assets/documents/Jigalouw ZAR rates_20260430_123951_0000.pdf';
import fish01 from '../../assets/Fishing/20250820_152800.jpg';
import fish02 from '../../assets/Fishing/20250820_152945.jpg';
import fish03 from '../../assets/Fishing/IMG-20210514-WA0027 (1).jpg';
import fish04 from '../../assets/Fishing/IMG-20241124-WA0043.jpg';
import fish05 from '../../assets/Fishing/IMG-20250409-WA0083.jpg';
import fish06 from '../../assets/Fishing/IMG-20250409-WA0084.jpg';
import fish07 from '../../assets/Fishing/IMG-20250409-WA0097.jpg';
import fish08 from '../../assets/Fishing/IMG-20250409-WA0098.jpg';
import fish09 from '../../assets/Fishing/IMG-20250427-WA0045(1).jpg';
import fish10 from '../../assets/Fishing/IMG-20250612-WA0161(1).jpg';
import fish11 from '../../assets/Fishing/IMG-20250612-WA0162(1).jpg';
import fish12 from '../../assets/Fishing/IMG-20250612-WA0164.jpg';
import fish13 from '../../assets/Fishing/IMG-20250930-WA0164.jpg';
import fish14 from '../../assets/Fishing/IMG-20260216-WA0040.jpg';
import fish15 from '../../assets/Fishing/IMG-20260216-WA0042(1).jpg';
import fish16 from '../../assets/Fishing/IMG-20260216-WA0043(1).jpg';
import fish17 from '../../assets/Fishing/IMG-20260216-WA0046.jpg';
import fish18 from '../../assets/Fishing/IMG-20260216-WA0047(1).jpg';
import fish19 from '../../assets/Fishing/IMG-20260428-WA0073.jpg';
import './FishingPage.css';

const GALLERY_SLIDES = [
  { type: 'image', src: fish01, caption: 'Big game fishing on the Mozambique Channel' },
  { type: 'image', src: fish02, caption: 'Fresh catch — a great day offshore' },
  { type: 'image', src: fish03, caption: 'Trophy catch aboard Jigalouw' },
  { type: 'image', src: fish04, caption: 'Mahi mahi — the colours of the deep' },
  { type: 'image', src: fish05, caption: 'Deep sea action off Barra' },
  { type: 'image', src: fish06, caption: 'Wahoo on the line' },
  { type: 'image', src: fish07, caption: 'The Mozambique Channel delivers' },
  { type: 'image', src: fish08, caption: 'King mackerel — hard-fighting sport fish' },
  { type: 'image', src: fish09, caption: 'Another incredible catch with Jigalouw' },
  { type: 'image', src: fish10, caption: 'Yellowfin tuna — top-tier offshore target' },
  { type: 'image', src: fish11, caption: 'Giant trevally — a true inshore gladiator' },
  { type: 'image', src: fish12, caption: 'Sunrise departure from Barra' },
  { type: 'image', src: fish13, caption: 'Sailfish — catch and release off Inhambane' },
  { type: 'image', src: fish14, caption: 'Barracuda — fast, explosive, unforgettable' },
  { type: 'image', src: fish15, caption: 'Marlin country — Barra is world-class' },
  { type: 'image', src: fish16, caption: 'Eastern little tuna — great sport on light tackle' },
  { type: 'image', src: fish17, caption: 'The crew on a full day charter' },
  { type: 'image', src: fish18, caption: 'Trevally — amberjack action all day' },
  { type: 'image', src: fish19, caption: 'Barra Cabanas — where fishing dreams come true' },
];

const CHARTER_PACKAGES = [
  {
    name: 'Half Day',
    price: 'R11 000',
    sub: 'per boat',
    duration: '5–6 hours',
    icon: '🌅',
    featured: false,
    details: [
      'Morning session 05:00 – 11:00',
      'Afternoon session 12:00 – 18:00',
      'Maximum 5 anglers',
      'All fishing gear included',
      'Bring your own food & drinks',
    ],
  },
  {
    name: 'Full Day',
    price: 'R17 000',
    sub: 'per boat',
    duration: '10 hours',
    icon: '🎣',
    featured: true,
    details: [
      'Departs 05:30 — returns 15:30',
      'Maximum 5 anglers',
      'All fishing gear included',
      'Bring your own food & drinks',
    ],
  },
  {
    name: 'Marlin Charter',
    price: 'R20 000',
    sub: 'per boat',
    duration: '6–8 hours offshore',
    icon: '🏆',
    featured: false,
    details: [
      'Dedicated big game charter',
      'Maximum 5 anglers',
      'All heavy tackle included',
      'Catch & release encouraged',
      'Bring your own food & drinks',
    ],
  },
];

const TARGETED_SPECIES = [
  'Marlin', 'Sailfish', 'Mahi Mahi', 'Wahoo',
  'King Mackerel', 'Barracuda', 'Giant Trevally',
  'Yellowfin Tuna', 'Trevally / Amberjack', 'Eastern Little Tuna',
];

const STATS = [
  { value: '21ft', label: 'Seacat 636' },
  { value: 'Twin', label: 'Yamaha Engines' },
  { value: 'Max 5', label: 'Anglers Per Trip' },
  { value: '10', label: 'Target Species' },
  { value: 'Barra', label: 'Inhambane, Mozambique' },
];

const EMPTY_FORM = { name: '', email: '', phone: '', charter: '', dates: '', guests: '', message: '' };

const FishingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [packagesRef, packagesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [bookingRef, bookingInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % GALLERY_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + GALLERY_SLIDES.length) % GALLERY_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 3800);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    const result = await sendContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: `Fishing Charter Enquiry${formData.charter ? ` – ${formData.charter}` : ''}`,
      message: `Charter: ${formData.charter || 'Not specified'}\nDates: ${formData.dates || 'Not specified'}\nGroup: ${formData.guests || 'Not specified'}\n\n${formData.message}`,
      service: 'fishing-enquiry',
    });
    setIsSubmitting(false);
    if (result.success) { setSubmitted(true); setFormData(EMPTY_FORM); }
    else setErrorMessage(result.message);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="fishing-page">

      {/* ── VIDEO HERO ─────────────────────────────────────────── */}
      <section className="fp-hero">
        <video className="fp-hero-video" autoPlay muted loop playsInline>
          <source src={fishingTimelapse} type="video/mp4" />
        </video>
        <div className="fp-hero-overlay" />
        <motion.div
          className="fp-hero-content container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <p className="fp-hero-label">Exclusively at Barra Cabanas</p>
          <h1 className="fp-hero-title">Jigalouw<br />Fishing Adventures</h1>
          <p className="fp-hero-subtitle">
            World-class deep sea fishing on the warm Mozambique Channel — right from your doorstep.
          </p>
          <div className="fp-hero-actions">
            <a href="#packages" className="fp-btn fp-btn--primary">View Charter Packages</a>
            <a href="#book" className="fp-btn fp-btn--outline">Book a Charter</a>
          </div>
        </motion.div>
        <div className="fp-hero-scroll-hint">
          <span className="fp-scroll-arrow">↓</span>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────── */}
      <section className="fp-stats-bar">
        {STATS.map(s => (
          <div key={s.label} className="fp-stat">
            <span className="fp-stat-value">{s.value}</span>
            <span className="fp-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── GALLERY ────────────────────────────────────────────── */}
      <section className="fp-gallery">
        <div className="fp-gallery-header container">
          <span className="fp-section-label">On the Water</span>
          <h2>Gallery</h2>
          <p>A taste of life aboard the Jigalouw — photos to follow as the season builds.</p>
        </div>

        <div
          className="fp-gallery-track"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main slide */}
          <div className="fp-gallery-main">
            {GALLERY_SLIDES.map((slide, i) => (
              <div
                key={i}
                className={`fp-slide ${i === currentSlide ? 'fp-slide--active' : ''}`}
              >
                {slide.type === 'image' ? (
                  <img src={slide.src} alt={slide.caption} className="fp-slide-img" />
                ) : (
                  <div className="fp-slide-placeholder" style={{ background: slide.bg }}>
                    <span className="fp-slide-emoji">{slide.emoji}</span>
                    <span className="fp-slide-placeholder-label">Photo coming soon</span>
                  </div>
                )}
                <div className="fp-slide-caption">{slide.caption}</div>
              </div>
            ))}

            <button className="fp-gallery-btn fp-gallery-btn--prev" onClick={prevSlide} aria-label="Previous">&#8249;</button>
            <button className="fp-gallery-btn fp-gallery-btn--next" onClick={nextSlide} aria-label="Next">&#8250;</button>
          </div>

          {/* Thumbnail strip */}
          <div className="fp-gallery-thumbs">
            {GALLERY_SLIDES.map((slide, i) => (
              <button
                key={i}
                className={`fp-thumb ${i === currentSlide ? 'fp-thumb--active' : ''}`}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Slide ${i + 1}`}
              >
                {slide.type === 'image' ? (
                  <img src={slide.src} alt={slide.caption} />
                ) : (
                  <div className="fp-thumb-placeholder" style={{ background: slide.bg }}>
                    <span>{slide.emoji}</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Dots */}
          <div className="fp-gallery-dots">
            {GALLERY_SLIDES.map((_, i) => (
              <button
                key={i}
                className={`fp-dot ${i === currentSlide ? 'fp-dot--active' : ''}`}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────── */}
      <section className="fp-about">
        <div className="container fp-about-grid">
          <motion.div
            className="fp-about-text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="fp-section-label">Our Partner Charter</span>
            <h2>About Jigalouw<br />Fishing Adventures</h2>
            <p>
              Jigalouw Fishing Adventures is the <strong>exclusive fishing charter partner of Barra Cabanas</strong> — the only activity we offer directly at the lodge. The name <em>Jigalouw</em> honours both the art of jigging and the Louw family name behind this passionate operation.
            </p>
            <p>
              Based right here at Barra Inn, Jigalouw puts you on the water with experienced local skippers who know the Mozambique Channel intimately. Whether you're a seasoned angler chasing marlin or a first-timer hoping to land a yellowfin tuna, the crew ensures an unforgettable day offshore.
            </p>
            <a href="https://wa.me/258879986165" className="fp-btn fp-btn--dark" target="_blank" rel="noopener noreferrer">
              💬 WhatsApp: +258 87 998 6165
            </a>
          </motion.div>

          <motion.div
            className="fp-boat-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="fp-boat-icon">⚓</div>
            <h3>The Vessel</h3>
            <h4 className="fp-boat-name">"Jigalouw"</h4>
            <p>A <strong>21ft Seacat 636</strong> center console — twin Yamaha outboards delivering outstanding performance and reliability in any offshore conditions. Fully rigged with professional-grade tackle and all safety equipment.</p>
            <ul className="fp-boat-specs">
              <li>21ft Seacat 636 center console</li>
              <li>Twin Yamaha outboard engines</li>
              <li>Full safety & navigation equipment</li>
              <li>Maximum 5 anglers per trip</li>
              <li>All tackle & gear supplied</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── TARGETED SPECIES ───────────────────────────────────── */}
      <section className="fp-species">
        <div className="container">
          <div className="fp-species-header">
            <span className="fp-section-label fp-section-label--light">What's Biting</span>
            <h2>Targeted Species</h2>
            <p>The warm Mozambique Channel is home to some of the world's most prized sport fish</p>
          </div>
          <motion.div
            className="fp-species-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {TARGETED_SPECIES.map(name => (
              <motion.div key={name} variants={itemVariants} className="fp-species-pill">
                🐟 {name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CHARTER PACKAGES ───────────────────────────────────── */}
      <section className="fp-packages" id="packages">
        <div className="container">
          <div className="fp-packages-header">
            <span className="fp-section-label">2026 Rates</span>
            <h2>Charter Packages</h2>
            <p>All rates are per boat, not per person. All gear is included — just bring food, drinks, and sunscreen.</p>
          </div>
          <motion.div
            ref={packagesRef}
            className="fp-packages-grid"
            variants={containerVariants}
            initial="hidden"
            animate={packagesInView ? 'visible' : 'hidden'}
          >
            {CHARTER_PACKAGES.map(pkg => (
              <motion.div
                key={pkg.name}
                variants={itemVariants}
                className={`fp-package-card${pkg.featured ? ' fp-package-card--featured' : ''}`}
              >
                {pkg.featured && <div className="fp-package-badge">Most Popular</div>}
                <div className="fp-package-icon">{pkg.icon}</div>
                <h3 className="fp-package-name">{pkg.name}</h3>
                <p className="fp-package-duration">{pkg.duration}</p>
                <div className="fp-package-price">
                  {pkg.price}
                  <span className="fp-package-sub"> {pkg.sub}</span>
                </div>
                <ul className="fp-package-details">
                  {pkg.details.map(d => <li key={d}>{d}</li>)}
                </ul>
                <a href="#book" className="fp-btn fp-btn--primary fp-package-cta">
                  Book This Charter
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DEPOSITS & BANKING ─────────────────────────────────── */}
      <section className="fp-booking" id="booking-info">
        <div className="container">
          <motion.div
            ref={bookingRef}
            className="fp-booking-grid"
            variants={containerVariants}
            initial="hidden"
            animate={bookingInView ? 'visible' : 'hidden'}
          >
            <motion.div variants={itemVariants} className="fp-info-card">
              <div className="fp-info-icon">📋</div>
              <h3>Deposits & Payments</h3>
              <ul>
                <li><strong>25% deposit</strong> required to confirm your booking.</li>
                <li>Full balance due <strong>24 hours before</strong> departure.</li>
                <li>All charters subject to weather conditions.</li>
                <li>Cancellations by us: alternative date offered or <strong>full refund</strong>.</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="fp-info-card fp-info-card--dark">
              <div className="fp-info-icon">🏦</div>
              <h3>Banking Details</h3>
              <p className="fp-banking-entity">JIGALOUW ADVENTURES (PTY) LTD</p>
              <table className="fp-banking-table">
                <tbody>
                  <tr><td>Bank</td><td>FNB Business Account</td></tr>
                  <tr><td>Account No</td><td>63197721319</td></tr>
                  <tr><td>Branch Code</td><td>255355</td></tr>
                  <tr><td>Swift Code</td><td>FIRNZAJJ</td></tr>
                  <tr><td>Reference</td><td>Your Name & Surname</td></tr>
                </tbody>
              </table>
            </motion.div>

            <motion.div variants={itemVariants} className="fp-info-card fp-info-card--contact">
              <div className="fp-info-icon">📞</div>
              <h3>Book Direct</h3>
              <p>Contact Jigalouw Fishing Adventures directly to check availability and confirm your charter:</p>
              <a href="https://wa.me/258879986165" className="fp-whatsapp-btn" target="_blank" rel="noopener noreferrer">
                💬 WhatsApp +258 87 998 6165
              </a>
              <p className="fp-contact-note">Based at Barra Inn, Inhambane, Mozambique</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── DOWNLOAD RATES ─────────────────────────────────────── */}
      <section className="fp-download">
        <div className="container">
          <div className="fp-download-inner">
            <div className="fp-download-text">
              <span className="fp-section-label">2026 Rates Brochure</span>
              <h3>Download the Full Rate Sheet</h3>
              <p>Complete Jigalouw Fishing Adventures rates, packages and booking terms as a PDF.</p>
            </div>
            <a href={fishingRatesPDF} download="Jigalouw-Fishing-Rates-2026.pdf" className="fp-btn fp-btn--dark">
              📄 Download PDF
            </a>
          </div>
        </div>
      </section>

      {/* ── ENQUIRY FORM ───────────────────────────────────────── */}
      <section className="fp-form-section" id="book">
        <div className="container">
          <div className="fp-form-header">
            <span className="fp-section-label">Get on the Water</span>
            <h2>Book Your Charter</h2>
            <p>Fill in the form below and we'll coordinate your booking with Jigalouw and confirm availability.</p>
          </div>

          {submitted ? (
            <div className="fp-form-success">
              <div className="fp-success-icon">🎣</div>
              <h3>Enquiry Sent!</h3>
              <p>We'll be in touch shortly to confirm your charter dates with Jigalouw.</p>
              <button className="fp-btn fp-btn--primary" onClick={() => setSubmitted(false)}>
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <form className="fp-form" onSubmit={handleSubmit}>
              <div className="fp-form-row">
                <div className="fp-form-group">
                  <label htmlFor="fish-name">Full Name *</label>
                  <input type="text" id="fish-name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="fp-form-group">
                  <label htmlFor="fish-email">Email Address *</label>
                  <input type="email" id="fish-email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="fp-form-row">
                <div className="fp-form-group">
                  <label htmlFor="fish-phone">Phone / WhatsApp</label>
                  <input type="tel" id="fish-phone" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="fp-form-group">
                  <label htmlFor="fish-guests">Number of Anglers</label>
                  <input type="number" id="fish-guests" name="guests" min="1" max="5" value={formData.guests} onChange={handleChange} placeholder="Max 5 per boat" />
                </div>
              </div>
              <div className="fp-form-row">
                <div className="fp-form-group">
                  <label htmlFor="fish-charter">Charter Package</label>
                  <select id="fish-charter" name="charter" value={formData.charter} onChange={handleChange}>
                    <option value="">Select a package</option>
                    <option value="Half Day – R11 000">Half Day – R11 000</option>
                    <option value="Full Day – R17 000">Full Day – R17 000</option>
                    <option value="Marlin Charter – R20 000">Marlin Charter – R20 000</option>
                  </select>
                </div>
                <div className="fp-form-group">
                  <label htmlFor="fish-dates">Preferred Dates</label>
                  <input type="text" id="fish-dates" name="dates" value={formData.dates} onChange={handleChange} placeholder="e.g. 10–14 July 2026" />
                </div>
              </div>
              <div className="fp-form-group">
                <label htmlFor="fish-message">Additional Notes *</label>
                <textarea id="fish-message" name="message" rows="4" value={formData.message} onChange={handleChange} required placeholder="Target species, experience level, anything else we should know..." />
              </div>
              {errorMessage && <div className="fp-form-error">{errorMessage}</div>}
              <button type="submit" className="fp-btn fp-btn--primary fp-form-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Booking Enquiry'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── BACK LINK ──────────────────────────────────────────── */}
      <div className="fp-back-nav">
        <div className="container">
          <Link to="/activities" className="fp-back-link">← Back to All Activities</Link>
        </div>
      </div>

    </div>
  );
};

export default FishingPage;
