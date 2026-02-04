import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Tracey Uren',
    position: 'September 2025 on Google',
    occasion: '',
    rating: 5,
    content: 'The all inclusive package was a winner! We traveled lightly and arrived to a beautifully furnished, and well maintained beachfront villa. Anname had ensured our family (5yrs to 65yrs) had all the homely comforts. Brunch and dinners were served on our patio by chef Ernesto. Wow! Every meal was a hit with the whole family. The package included 4 days fishing with Jigalouw Fishing Adventures. What a memorable charter! From the top notch equipment they provide, to the ever friendly and helpful ghillie, Mavo. Skipper Ronaldo\'s experience and respect of the ocean, not only yielded great days fishing, but created an unforgettable experience. Thanks to the team at Barra-Inn, we were able to relax, take in all that Barra/Tofo has to offer and create beautiful memories! We will be back!',
    initial: 'T'
  },
  {
    id: 2,
    name: 'Robert Uren',
    position: 'September 2025 on Google',
    occasion: '',
    rating: 5,
    content: 'Unreal weeks stay with the Barra team! Accommodation and setting 10/10, you can see both sunrise and sunset which we weren\'t expecting but given the location it provides both! Ernest prepared incredible food, perfect variety of everything! Food catered option is the only way to go! Stress free and fresh meals! Jigalouw fishing charters captain by Ronaldo and assisted by Mavu was next level! Caught plenty fish with their guidance, Ronaldo has great respect for the marine life too which you won\'t find on many charters! We had 2 youngsters on the boat too and both Ronaldo and Mavu were great with them! On the second last day we book for 2026! Thanks Ronaldo and Anname, looking forward to seeing you all next year.',
    initial: 'R'
  },
  {
    id: 3,
    name: 'Sudipta Banerjee',
    position: 'February 2024 on Google',
    occasion: '',
    rating: 5,
    content: 'This was our second visit to this property. We stayed in the ground floor. The house is big, for 8 adults. A similar apartment is there in the first floor, but the entrance is completely separate. The kitchen is fully equipped. The house is serviced once in a day and to our surprise, even on a Sunday!!! The best part of the house is its LOCATION. It is right on the beach. No stair climbing or no sand bar in between. Barra beach is relatively empty and non commercial. Only 600 mtr road is non tar, but no necessity of 4×4. There are some small shops, but we carried everything from home. So do not know what is available locally.',
    initial: 'S'
  },
  {
    id: 4,
    name: 'Lisa Labuschagne',
    position: 'February 2024 on Google',
    occasion: '',
    rating: 5,
    content: 'Stunning accommodation right on the beach, we absolutely loved our stay!',
    initial: 'L'
  },
  {
    id: 5,
    name: 'Kelvin Smit',
    position: 'February 2024 on Google',
    occasion: '',
    rating: 5,
    content: 'Great view, amazing place. Clean and modern',
    initial: 'K'
  },
  {
    id: 6,
    name: 'Dibuweng Grace',
    position: 'February 2024 on Google',
    occasion: '',
    rating: 5,
    content: 'It was my first time I enjoy it so lovely, nice food',
    initial: 'D'
  },
  {
    id: 7,
    name: 'Liliana Lemos',
    position: 'February 2022 on Google',
    occasion: '',
    rating: 5,
    content: 'Very nice rooms and facilities',
    initial: 'L'
  },
  {
    id: 8,
    name: 'Augusto Da Albertina Cambula',
    position: 'February 2025 on Google',
    occasion: '',
    rating: 5,
    content: 'Very nice',
    initial: 'A'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Luxury Guest Experiences</h2>
          <p className="section-subtitle">
            Discover why discerning travelers from around the world choose Barra Cabanas for their most memorable luxury escapes.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="testimonials-slider"
        >
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="quote-icon">
                <FontAwesomeIcon icon={faQuoteLeft} />
              </div>
              <div className="rating">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="star" />
                ))}
              </div>
            </div>

            <p className="testimonial-content">{testimonials[currentIndex].content}</p>

            <div className="testimonial-author">
              <div className="author-image">
                <div className="avatar-initial">
                  {testimonials[currentIndex].initial}
                </div>
              </div>
              <div className="author-info">
                <h4 className="author-name">{testimonials[currentIndex].name}</h4>
                <p className="author-position">{testimonials[currentIndex].position}</p>
                {testimonials[currentIndex].occasion && (
                  <p className="author-occasion">{testimonials[currentIndex].occasion}</p>
                )}
              </div>
            </div>
          </div>

          <div className="testimonial-controls">
            <button className="control-btn prev" onClick={handlePrev}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                ></span>
              ))}
            </div>
            <button className="control-btn next" onClick={handleNext}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
