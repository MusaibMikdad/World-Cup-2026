import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './About.css';

export default function About() {
  const location = useLocation();

  // Scroll to section if hash is present (e.g. /about#privacy)
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="about-page">
      <div className="container">
        {/* ── Header ── */}
        <header className="about-header animate-slide-up">
          <h1 className="section-title">
            <span className="about-icon">📄</span>
            <span className="gradient-text">About</span>
          </h1>
          <p className="section-subtitle">
            Legal information, policies, and contact details for the FIFA World Cup 2026 Hub.
          </p>
        </header>

        {/* ── Quick Nav ── */}
        <nav className="about-nav glass-card-static animate-fade-in">
          <a href="#privacy" className="about-nav__link">🔒 Privacy Policy</a>
          <a href="#terms" className="about-nav__link">📜 Terms of Service</a>
          <a href="#contact" className="about-nav__link">📬 Contact Us</a>
        </nav>

        {/* ════════════════════════════════════════
            PRIVACY POLICY
            ════════════════════════════════════════ */}
        <section id="privacy" className="about-section glass-card-static animate-slide-up">
          <div className="about-section__header">
            <span className="about-section__icon">🔒</span>
            <h2 className="about-section__title">Privacy Policy</h2>
          </div>
          <p className="about-section__date">Last updated: June 11, 2026</p>

          <div className="about-section__body">
            <h3>1. Introduction</h3>
            <p>
              Welcome to the FIFA World Cup 2026 Hub ("we", "our", or "the Website"). This Privacy Policy explains how we collect, use, and protect your information when you visit our website. We are committed to ensuring your privacy is protected and respected at all times.
            </p>

            <h3>2. Information We Collect</h3>
            <p>This website is designed to be privacy-friendly. We collect minimal data:</p>
            <ul>
              <li><strong>Automatically Collected Data:</strong> Basic, anonymous analytics data such as page views, browser type, device type, and general geographic region. This data is collected in aggregate and cannot be used to identify you personally.</li>
              <li><strong>No Personal Data Collection:</strong> We do not require user registration, login, or any form of personal data submission to use this website. We do not collect names, email addresses, or payment information through the website.</li>
              <li><strong>Third-Party APIs:</strong> Our website fetches live match data from the ESPN public API. These requests are made directly from your browser. We do not store, log, or process any data from these API calls on our servers.</li>
            </ul>

            <h3>3. How We Use Information</h3>
            <p>The limited data we collect is used exclusively for:</p>
            <ul>
              <li>Improving website performance and user experience</li>
              <li>Understanding general traffic patterns and popular content</li>
              <li>Debugging technical issues</li>
            </ul>

            <h3>4. Third-Party Services</h3>
            <p>Our website may use the following third-party services:</p>
            <ul>
              <li><strong>Vercel:</strong> Our hosting provider, which may collect standard web server logs (IP address, request timestamps).</li>
              <li><strong>ESPN API:</strong> Used to fetch live match scores and data. ESPN's own privacy policy governs their data collection practices.</li>
              <li><strong>Google Fonts:</strong> Used for typography. Google may collect anonymous usage statistics.</li>
            </ul>

            <h3>5. Cookies</h3>
            <p>
              This website does not use first-party cookies for tracking or advertising purposes. Third-party services embedded in the website (such as hosting providers) may use essential cookies for functionality and security purposes only.
            </p>

            <h3>6. Data Security</h3>
            <p>
              Since we do not collect or store personal data, there is minimal risk of data breaches affecting your personal information. Our website is served over HTTPS, ensuring all communication between your browser and our servers is encrypted.
            </p>

            <h3>7. Children's Privacy</h3>
            <p>
              This website is suitable for all ages and does not knowingly collect any personal information from children under the age of 13. If you believe we have inadvertently collected such information, please contact us immediately.
            </p>

            <h3>8. Changes to This Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════
            TERMS OF SERVICE
            ════════════════════════════════════════ */}
        <section id="terms" className="about-section glass-card-static animate-slide-up">
          <div className="about-section__header">
            <span className="about-section__icon">📜</span>
            <h2 className="about-section__title">Terms of Service</h2>
          </div>
          <p className="about-section__date">Last updated: June 11, 2026</p>

          <div className="about-section__body">
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing and using the FIFA World Cup 2026 Hub, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the website.
            </p>

            <h3>2. Nature of the Website</h3>
            <p>
              This is a <strong>fan-made, non-commercial project</strong> created for educational and entertainment purposes. It is <strong>not affiliated with, endorsed by, or connected to FIFA</strong>, the FIFA World Cup, or any associated organizations. All FIFA-related trademarks, logos, and brand names belong to their respective owners.
            </p>

            <h3>3. Use of Content</h3>
            <ul>
              <li>All match schedules, scores, and team data are sourced from publicly available APIs and official FIFA announcements.</li>
              <li>Live scores are provided via the ESPN public API and may be subject to slight delays.</li>
              <li>Flag emojis and team emblems are rendered using standard Unicode characters and publicly available assets.</li>
              <li>The website's original code, UI design, and custom assets are the intellectual property of the developer.</li>
            </ul>

            <h3>4. Accuracy of Information</h3>
            <p>
              While we strive to provide accurate and up-to-date information, we make no guarantees regarding the completeness, accuracy, or timeliness of match data, scores, schedules, or streaming links. Match times are displayed in Bangladesh Standard Time (BST, UTC+6). Users should verify critical information through official FIFA channels.
            </p>

            <h3>5. Streaming Links</h3>
            <p>
              The streaming directory on this website provides links to third-party broadcasting platforms. We do not host, stream, or distribute any match content. We are not responsible for the availability, legality, or content of these external platforms in your jurisdiction.
            </p>

            <h3>6. Limitation of Liability</h3>
            <p>
              The website is provided "as is" without any warranties, express or implied. In no event shall the developer be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website, including but not limited to reliance on match data or streaming link availability.
            </p>

            <h3>7. Modifications</h3>
            <p>
              We reserve the right to modify, update, or discontinue the website at any time without prior notice. We may also revise these Terms of Service, and continued use of the website constitutes acceptance of any changes.
            </p>

            <h3>8. Governing Law</h3>
            <p>
              These terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from the use of this website shall be resolved amicably.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CONTACT US
            ════════════════════════════════════════ */}
        <section id="contact" className="about-section glass-card-static animate-slide-up">
          <div className="about-section__header">
            <span className="about-section__icon">📬</span>
            <h2 className="about-section__title">Contact Us</h2>
          </div>

          <div className="about-section__body">
            <p>
              Have questions, feedback, or found a bug? Feel free to reach out to the developer directly.
            </p>

            <div className="about-contact-grid">
              <div className="about-contact-card">
                <span className="about-contact-card__icon">👨‍💻</span>
                <h4>Developer</h4>
                <p>Musaib Ibn Habib Mikdad</p>
                <p className="about-contact-card__sub">CSE, BRAC University</p>
              </div>

              <div className="about-contact-card">
                <span className="about-contact-card__icon">📞</span>
                <h4>Contact</h4>
                <a href="tel:+8801701051384">+880 1701 051384</a>
              </div>

              <div className="about-contact-card">
                <span className="about-contact-card__icon">✉️</span>
                <h4>Email</h4>
                <a href="mailto:musaib19160@gmail.com">musaib19160@gmail.com</a>
              </div>

              <div className="about-contact-card">
                <span className="about-contact-card__icon">🌐</span>
                <h4>Website</h4>
                <a href="https://portfolioofmikdad.vercel.app/" target="_blank" rel="noopener noreferrer">
                  Mikdad's Portfolio <span className="footer__external">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
