import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faUsers,
  faUser,
  faPhone,
  faMinus,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import './BookingPage.css';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 2,
    name: '',
    phone: ''
  });
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGuestChange = (type, delta) => {
    setFormData(prev => ({
      ...prev,
      adults: Math.max(1, Math.min(12, prev.adults + delta))
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.checkIn || !formData.checkOut || !formData.name || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    // Simulate submission (replace with actual API call)
    setTimeout(() => {
      setSubmitting(false);
      setSubmitSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          checkIn: '',
          checkOut: '',
          adults: 2,
          name: '',
          phone: ''
        });
      }, 3000);
    }, 1000);
  };

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <div className="booking-hero-overlay"></div>
        <div className="container">
          <h1 className="booking-hero-title">Book Your Stay</h1>
          <p className="booking-hero-subtitle">
            Reserve your beachfront cabana at Barra
          </p>
        </div>
      </div>

      <section className="booking-form-section">
        <div className="container">
          <div className="booking-form-wrapper">
            <motion.div
              className="booking-form-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="form-title">Reservation Request</h2>
              <p className="form-subtitle">
                Fill in your details and we'll get back to you with availability and pricing
              </p>

              {submitSuccess && (
                <div className="success-message">
                  ✓ Thank you! We'll contact you shortly to confirm your reservation.
                </div>
              )}

              <form onSubmit={handleSubmit} className="simplified-booking-form">
                {/* Check-in Date */}
                <div className="form-group">
                  <label htmlFor="checkIn">
                    <FontAwesomeIcon icon={faCalendarAlt} /> Check-in Date *
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    value={formData.checkIn}
                    onChange={(e) => handleInputChange('checkIn', e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {/* Check-out Date */}
                <div className="form-group">
                  <label htmlFor="checkOut">
                    <FontAwesomeIcon icon={faCalendarAlt} /> Check-out Date *
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    value={formData.checkOut}
                    onChange={(e) => handleInputChange('checkOut', e.target.value)}
                    required
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>

                {/* Guest Selector */}
                <div className="form-group">
                  <label>
                    <FontAwesomeIcon icon={faUsers} /> Number of Guests *
                  </label>
                  <div className="guest-selector-inline">
                    <button
                      type="button"
                      className="guest-btn"
                      onClick={() => handleGuestChange('adults', -1)}
                      disabled={formData.adults <= 1}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="guest-count">{formData.adults} {formData.adults === 1 ? 'Guest' : 'Guests'}</span>
                    <button
                      type="button"
                      className="guest-btn"
                      onClick={() => handleGuestChange('adults', 1)}
                      disabled={formData.adults >= 12}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <small className="form-hint">Maximum 12 guests per cabana</small>
                </div>

                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name">
                    <FontAwesomeIcon icon={faUser} /> Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label htmlFor="phone">
                    <FontAwesomeIcon icon={faPhone} /> Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+27 XX XXX XXXX"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Request Reservation'}
                </button>

                <p className="form-note">
                  * We'll contact you to confirm availability and provide pricing details
                </p>
              </form>
            </motion.div>

            {/* Info Sidebar */}
            <motion.div
              className="booking-info-sidebar"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="info-card">
                <h3>What Happens Next?</h3>
                <ol className="info-steps">
                  <li>Submit your reservation request</li>
                  <li>We'll check availability for your dates</li>
                  <li>Receive a personalized quote via email or phone</li>
                  <li>Confirm your booking and payment details</li>
                </ol>
              </div>

              <div className="info-card">
                <h3>Need Help?</h3>
                <p>Contact us directly:</p>
                <p className="contact-detail">
                  <strong>Email:</strong> info@barracabanas.com
                </p>
                <p className="contact-detail">
                  <strong>Phone:</strong> +27 XX XXX XXXX
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;

/* SIMPLIFIED BOOKING FORM
 * Removed complex features:
 * - Property selection dropdown
 * - Availability calendar
 * - Pricing calculations
 * - Complex booking logic
 *
 * Simplified form includes only:
 * - Check-in/Check-out dates
 * - Guest count selector
 * - Name and phone number
 * - Simple submission (to be connected to backend)
 */
