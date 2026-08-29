import { Link } from 'react-router-dom';
import { FAQ_SECTIONS, faqSchema } from '../../lib/faq';
import './FaqPage.css';

/**
 * Answers the questions guests actually ask before booking.
 *
 * Built on native <details>/<summary> rather than a JavaScript accordion so
 * every answer is present in the prerendered HTML and readable by crawlers
 * and screen readers without running any script.
 *
 * The FAQPage structured data is generated from the same source as the
 * visible content, so what Google reads always matches what guests see.
 */
const FaqPage = () => (
  <div className="faq-page">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }}
    />

    <div className="faq-hero">
      <div className="faq-hero-overlay"></div>
      <div className="container">
        <h1 className="faq-hero-title">Frequently Asked Questions</h1>
        <p className="faq-hero-subtitle">
          Everything you need to know before your stay at Barra, Mozambique
        </p>
      </div>
    </div>

    <section className="faq-content">
      <div className="container">
        <p className="faq-intro">
          Answers to the questions guests ask most often — the houses, getting
          across the border, and what to expect on site. If your question is not
          answered here, <Link to="/contact">get in touch</Link> and we will help.
        </p>

        {FAQ_SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="faq-section">
            <h2 className="faq-section-heading">{section.heading}</h2>
            <div className="faq-list">
              {section.items.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary className="faq-question">{item.q}</summary>
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        <div className="faq-cta">
          <h2 className="faq-cta-title">Still have a question?</h2>
          <p className="faq-cta-text">
            We are happy to help with anything not covered here.
          </p>
          <div className="faq-cta-actions">
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
            <Link to="/booking" className="btn btn-secondary">Request a Quotation</Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default FaqPage;
