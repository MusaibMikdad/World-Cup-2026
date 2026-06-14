import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Gradient Divider */}
      <div className="divider-glow" />

      <div className="footer__inner container">
        {/* Top Section: Logo + Columns */}
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">⚽</span>
              <span className="footer__logo-text">WC 2026</span>
            </div>
            <p className="footer__tagline">
              Your ultimate guide to the FIFA World Cup 2026.
              Follow every match across USA, Mexico, and Canada.
            </p>
            <div className="footer__flags">
              <span className="flag-emoji">🇺🇸</span>
              <span className="flag-emoji">🇲🇽</span>
              <span className="flag-emoji">🇨🇦</span>
            </div>

          </div>

          {/* Quick Links */}
          <div className="footer__column">
            <h4 className="footer__column-title">Quick Links</h4>
            <ul className="footer__links">
              <li><Link to="/" className="footer__link">Home</Link></li>
              <li><Link to="/schedule" className="footer__link">Match Schedule</Link></li>
              <li><Link to="/groups" className="footer__link">Group Standings</Link></li>
              <li><Link to="/knockout" className="footer__link">Knockout Bracket</Link></li>
              <li><Link to="/watch" className="footer__link">Watch Live</Link></li>
            </ul>
          </div>

          {/* Streaming */}
          <div className="footer__column">
            <h4 className="footer__column-title">Streaming</h4>
            <ul className="footer__links">
              <li><a href="https://www.fifa.com/fifaplus" target="_blank" rel="noopener noreferrer" className="footer__link">FIFA+ <span className="footer__external">↗</span></a></li>
              <li><a href="https://www.foxsports.com" target="_blank" rel="noopener noreferrer" className="footer__link">FOX Sports <span className="footer__external">↗</span></a></li>
              <li><a href="https://www.bbc.co.uk/iplayer" target="_blank" rel="noopener noreferrer" className="footer__link">BBC iPlayer <span className="footer__external">↗</span></a></li>
              <li><a href="https://tubitv.com" target="_blank" rel="noopener noreferrer" className="footer__link">Tubi (Free) <span className="footer__external">↗</span></a></li>
              <li><Link to="/watch#platforms" className="footer__link footer__link--accent">View All →</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer__column">
            <h4 className="footer__column-title">Legal</h4>
            <ul className="footer__links">
              <li><Link to="/about#privacy" className="footer__link">Privacy Policy</Link></li>
              <li><Link to="/about#terms" className="footer__link">Terms of Service</Link></li>
              <li><Link to="/about#contact" className="footer__link">Contact Us</Link></li>
              <li><Link to="/analytics" className="footer__link footer__link--accent">🔒 User Tracking DB</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__disclaimer">
            <p>⚠️ This is a fan-made project and is <strong>not affiliated</strong> with FIFA, the FIFA World Cup, or any associated organizations. All trademarks belong to their respective owners.</p>
          </div>
          <div className="footer__copyright">
            <p>© 2026 WC2026 Hub. Built with ⚽ and ❤️ for football fans everywhere.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
