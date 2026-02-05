import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload, faFilePdf, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './InfoSheetDownload.css';
import infoSheetPDF from '../../assets/documents/barra-cabanas-info-sheet.pdf';

const InfoSheetDownload = ({ variant = 'full' }) => {
  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = infoSheetPDF;
    link.download = 'Barra-Cabanas-Info-Sheet.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Floating button variant
  if (variant === 'floating') {
    return (
      <motion.button
        className="info-sheet-floating"
        onClick={handleDownload}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        title="Download Info Sheet"
      >
        <FontAwesomeIcon icon={faFilePdf} />
        <span className="floating-tooltip">Download Info Sheet</span>
      </motion.button>
    );
  }

  // Compact button variant
  if (variant === 'compact') {
    return (
      <motion.button
        className="info-sheet-compact"
        onClick={handleDownload}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FontAwesomeIcon icon={faFileDownload} />
        <span>Download Info Sheet</span>
      </motion.button>
    );
  }

  // Full section variant (default)
  return (
    <motion.section
      className="info-sheet-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="info-sheet-card">
          <motion.div
            className="info-sheet-icon"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FontAwesomeIcon icon={faFilePdf} />
          </motion.div>
          
          <div className="info-sheet-content">
            <h2 className="info-sheet-title">
              <FontAwesomeIcon icon={faInfoCircle} className="title-icon" />
              Complete Property Information
            </h2>
            <p className="info-sheet-description">
              Download our comprehensive info sheet with everything you need to know about Barra Cabanas -
              including detailed amenities, house rules, local attractions, and booking information.
            </p>

            {/* PLACEHOLDER: PDF content note */}
            <div className="placeholder-note-pdf">
              <p>📄 <strong>Note:</strong> Final PDF will not include pricing - contact us for rates</p>
            </div>

            <div className="info-sheet-features">
              <div className="feature-item">
                <span className="feature-icon">📋</span>
                <span>Complete Amenities List</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🏖️</span>
                <span>Local Area Guide</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span>Activities & Attractions</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📞</span>
                <span>Contact & Booking Info</span>
              </div>
            </div>

            <motion.button
              className="info-sheet-download-btn"
              onClick={handleDownload}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(245, 230, 211, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faFileDownload} />
              <span>Download Info Sheet (PDF)</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default InfoSheetDownload;

