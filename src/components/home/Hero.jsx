import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeXmark, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import './Hero.css';

// Narrower screens get the poster alone, so a phone never requests the
// 11.9 MB video. Hiding the tag with CSS would still download it.
const VIDEO_MIN_WIDTH_QUERY = '(min-width: 768px)';
const VIDEO_MOUNT_DELAY_MS = 500;

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoCanPlay, setVideoCanPlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  // Check if device is mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mount the video after first paint, on wide screens only. It is mounted
  // from an effect, so the prerendered HTML never contains a <video> tag and
  // nothing is fetched before the width has been checked.
  useEffect(() => {
    if (!window.matchMedia(VIDEO_MIN_WIDTH_QUERY).matches) return;

    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, VIDEO_MOUNT_DELAY_MS); // Small delay for smooth page load

    return () => clearTimeout(timer);
  }, []);

  // Load audio (desktop only for better mobile performance)
  useEffect(() => {
    if (!isMobile) {
      const timer = setTimeout(() => {
        setAudioLoaded(true);
      }, 1000); // Load audio after video starts

      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // Independent audio toggle function
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(console.log);
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  // Set audio volume when loaded
  useEffect(() => {
    if (!isMobile && audioRef.current) {
      audioRef.current.volume = 0.6; // Set volume to 60%
    }
  }, [isMobile, audioLoaded]);

  // Load audio
  useEffect(() => {
    if (!isMobile) {
      const timer = setTimeout(() => {
        setAudioLoaded(true);
      }, 1000); // Load audio after video starts loading

      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  const handleVideoCanPlay = () => {
    setVideoCanPlay(true);
  };

  return (
    <section className="hero">
      {/* Poster - part of the prerendered HTML, so it paints before any
          script runs. Phones show only this; on wide screens the video fades
          in over it. Lowercase fetchpriority: React 18 passes it through. */}
      <picture>
        <source
          media="(max-width: 767px) and (orientation: portrait)"
          srcSet="/videos/barra-cabanas-hero-poster-portrait.webp"
        />
        <img
          className="hero-poster"
          src="/videos/barra-cabanas-hero-poster.webp"
          alt=""
          fetchpriority="high"
        />
      </picture>

      {/* Video Background - wide screens only */}
      {videoLoaded && (
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={handleVideoCanPlay}
          style={{
            opacity: videoCanPlay ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
          src="/videos/barra-cabanas-hero.mp4"
        >
          {/* Fallback for browsers that don't support the video */}
        </video>
      )}

      {/* Background Audio - Soft Gravity */}
      {/* Desktop only - Subtle, low volume background music */}
      {!isMobile && audioLoaded && (
        <audio
          ref={audioRef}
          loop
          preload="metadata"
          style={{ display: 'none' }}
        >
          <source
            src="/audio/soft-gravity.mp3"
            type="audio/mpeg"
          />
        </audio>
      )}

      {/* Audio Control Button - Left side of hero */}
      {!isMobile && audioLoaded && (
        <button
          onClick={toggleAudio}
          className="audio-toggle-btn"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          <FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeHigh} />
        </button>
      )}

      {/* Overlay for better text readability */}
      <div className="hero-overlay"></div>
      <div className="hero-content">
        {/* Plain markup, no entrance animation: the heading and paragraph
            must be visible in the prerendered HTML, before any script runs. */}
        <div className="hero-text">
          <h1 className="hero-title">
            Experience Luxury <span className="highlight beige">Beach Houses</span>
          </h1>
          <p className="hero-subtitle">
            Experience barefoot luxury at its finest. Nestled on the pristine shores of Mozambique, Barra Cabanas offers exclusive beachside accomodation with panoramic ocean views, elegant design, and unmatched comfort — your ultimate tropical escape awaits.
          </p>
          <div className="hero-buttons">
            <Link to="/accommodation" className="btn btn-primary">
              View Our Properties
            </Link>
            <Link to="/booking" className="btn btn-secondary">
              Request a Quotation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
