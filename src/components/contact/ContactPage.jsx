import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { sendContactForm } from '../../services/emailService';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const result = await sendContactForm(formData);

      if (result.success) {
        setFormSubmitted(true);
        setSubmitMessage(result.message);
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          service: ''
        });
      } else {
        setSubmitMessage(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-overlay"></div>
        <div className="container">
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-subtitle">
            Get in touch with us to book your perfect beach getaway
          </p>
        </div>
      </div>

      <section className="contact-info">
        <div className="container">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="info-grid"
          >
            <motion.div className="info-card" variants={itemVariants}>
              <div className="info-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <h3>Our Location</h3>
              <p>Barra, Inhambane</p>
              <p>Mozambique</p>
            </motion.div>

            <motion.div className="info-card" variants={itemVariants}>
              <div className="info-icon">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <h3>Phone Number</h3>
              <p><a href="tel:+27662057229">+27 66 205 7229</a></p>
              <p><a href="tel:+258840637902">+258 840 637 902</a></p>
            </motion.div>

            <motion.div className="info-card" variants={itemVariants}>
              <div className="info-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <h3>Email Address</h3>
              <p><a href="mailto:Bookings@barracabanas.com">Bookings@barracabanas.com</a></p>
            </motion.div>

            <motion.div className="info-card" variants={itemVariants}>
              <div className="info-icon social-icons-group">
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faInstagram} />
              </div>
              <h3>Follow Us</h3>
              <p><a href="https://www.facebook.com/Barra.Inn.Moz" target="_blank" rel="noopener noreferrer">Facebook</a></p>
              <p><a href="https://www.instagram.com/barra_inn.moz" target="_blank" rel="noopener noreferrer">Instagram</a></p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <h2>Book Your Stay</h2>
              <p>
                Fill out the form below to inquire about availability and we'll get back to you as soon as possible.
              </p>
            </div>

            {formSubmitted ? (
              <div className="form-success">
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                <button className="btn btn-primary" onClick={() => setFormSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service">Accommodation of Interest</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select Accommodation</option>
                    <option value="barra-cabanas">Barra Cabanas Holiday House</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {submitMessage && !formSubmitted && (
                  <div className={`form-message ${submitMessage.includes('Failed') ? 'error' : 'success'}`}>
                    {submitMessage}
                  </div>
                )}

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="map-section">
        <div className="container">
          <h2 className="section-title">Find Us</h2>
          <p className="section-subtitle">Visit us at Barra Beach, Inhambane, Mozambique</p>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.7!2d35.5!3d-23.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDUxJzAwLjAiUyAzNcKwMzAnMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '15px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Barra Cabanas Location"
            ></iframe>
            <p className="map-note">
              📍 Note: This is a placeholder location. The exact coordinates will be updated with the actual property location.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
