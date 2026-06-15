import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StadiumEgg from './StadiumEgg';
import { trackEvent } from '../services/analytics';
import { useNotifications } from '../context/NotificationContext';
import './Navbar.css';

const BellIcon = ({ active }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={active ? "var(--accent-gold)" : "none"} 
    stroke={active ? "var(--accent-gold)" : "currentColor"} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    width="18" 
    height="18"
    className="navbar__notif-bell-svg"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const navLinks = [
  { path: '/', label: 'Home', icon: '⚽' },
  { path: '/schedule', label: 'Schedule', icon: '📅' },
  { path: '/groups', label: 'Groups', icon: '🏆' },
  { path: '/knockout', label: 'Knockout', icon: '⚔️' },
  { path: '/watch', label: 'Watch Live', icon: '📺' },
  { path: '/about', label: 'About', icon: '📄' },
];

export default function Navbar() {
  const location = useLocation();
  const { globalEnabled, toggleGlobalNotifications } = useNotifications();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eggActive, setEggActive] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner container">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <span 
              className="navbar__logo-icon" 
              onClick={(e) => {
                e.preventDefault();
                setEggActive(true);
                trackEvent('Action', 'Trigger Easter Egg');
              }}
              style={{ cursor: 'pointer' }}
              title="Click me!"
            >
              ⚽
            </span>
            <span className="navbar__logo-text">WC 2026</span>
          </Link>

          {/* Actions Container */}
          <div className="navbar__right-actions">
            {/* Desktop nav */}
            <ul className="navbar__links hide-mobile">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                  >
                    {link.label}
                    {link.path === '/watch' && (
                      <span className="navbar__live-dot" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Global Notification Bell */}
            <button
              className={`navbar__notif-btn ${globalEnabled ? 'navbar__notif-btn--active' : ''}`}
              onClick={toggleGlobalNotifications}
              title={globalEnabled ? 'Turn off match notifications' : 'Turn on notifications for all matches'}
              aria-label={globalEnabled ? 'Turn off match notifications' : 'Turn on notifications for all matches'}
            >
              <BellIcon active={globalEnabled} />
            </button>

            {/* Mobile hamburger */}
            <button
              className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={() => {
                setMobileOpen(!mobileOpen);
                trackEvent('Click', 'Toggle mobile navbar menu', String(!mobileOpen));
              }}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-in panel */}
      <div className={`navbar__mobile-overlay ${mobileOpen ? 'navbar__mobile-overlay--open' : ''}`} onClick={() => setMobileOpen(false)} />
      <aside className={`navbar__mobile-panel ${mobileOpen ? 'navbar__mobile-panel--open' : ''}`}>
        <div className="navbar__mobile-header">
          <span className="navbar__logo-text">WC 2026</span>
          <button className="navbar__mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
        </div>
        <ul className="navbar__mobile-links">
          {navLinks.map((link, i) => (
            <li key={link.path} style={{ animationDelay: `${i * 0.06 + 0.1}s` }}>
              <Link
                to={link.path}
                className={`navbar__mobile-link ${location.pathname === link.path ? 'navbar__mobile-link--active' : ''}`}
              >
                <span className="navbar__mobile-link-icon">{link.icon}</span>
                {link.label}
                {link.path === '/watch' && <span className="badge badge-live" style={{ marginLeft: 'auto' }}>Live</span>}
              </Link>
            </li>
          ))}
        </ul>
        <div className="navbar__mobile-footer">
          <p>FIFA World Cup 2026™</p>
          <p>🇺🇸 🇲🇽 🇨🇦</p>
        </div>
      </aside>

      {/* Easter Egg Overlay */}
      <StadiumEgg isActive={eggActive} onComplete={() => setEggActive(false)} />
    </>
  );
}
