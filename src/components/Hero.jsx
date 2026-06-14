import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getUpcomingMatches, getLiveMatches } from '../data/matches';
import { getTeam } from '../data/teams';
import { getVenue } from '../data/venues';
import CountdownTimer from './CountdownTimer';
import MatchCard from './MatchCard';
import Flag from './Flag';
import './Hero.css';

export default function Hero() {
  const liveMatches = getLiveMatches();
  const upcoming = getUpcomingMatches(1);
  const nextMatch = upcoming[0] || null;

  const nextMatchInfo = useMemo(() => {
    if (!nextMatch) return null;
    const home = getTeam(nextMatch.home);
    const away = getTeam(nextMatch.away);
    const venue = getVenue(nextMatch.venue);
    return { home, away, venue };
  }, [nextMatch]);

  return (
    <section className="hero">
      {/* Animated background elements */}
      <div className="hero__bg">
        <div className="hero__gradient" />
        <div className="hero__orbs">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__orb hero__orb--3" />
        </div>
        {/* Floating football SVGs */}
        <svg className="hero__ball hero__ball--1" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
          <path d="M50 5 L50 95 M5 50 L95 50 M20 20 L80 80 M80 20 L20 80" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <circle cx="50" cy="50" r="20" stroke="rgba(0,255,135,0.08)" strokeWidth="1" />
        </svg>
        <svg className="hero__ball hero__ball--2" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
          <polygon points="50,10 90,35 90,75 50,95 10,75 10,35" stroke="rgba(79,140,255,0.08)" strokeWidth="1" fill="none" />
        </svg>
        <svg className="hero__ball hero__ball--3" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />
          <circle cx="50" cy="50" r="30" stroke="rgba(168,85,247,0.06)" strokeWidth="1" />
          <circle cx="50" cy="50" r="15" stroke="rgba(255,215,0,0.06)" strokeWidth="1" />
        </svg>
      </div>

      <div className="hero__content container">
        {/* Title block */}
        <div className="hero__title-block">
          <span className="hero__pre-title">
            <span className="hero__pre-line" />
            THE GREATEST SHOW ON EARTH
            <span className="hero__pre-line" />
          </span>
          <h1 className="display-title hero__title">
            FIFA WORLD CUP
          </h1>
          <h2 className="hero__year gradient-text">2026</h2>
          <p className="hero__subtitle">
            <Flag code="USA" size="md" /> USA
            <span className="hero__dot">•</span>
            <Flag code="MEX" size="md" /> MEXICO
            <span className="hero__dot">•</span>
            <Flag code="CAN" size="md" /> CANADA
          </p>
        </div>

        {/* Countdown or Live section */}
        <div className="hero__action-area">
          {liveMatches.length > 0 ? (
            <div className="hero__live-section">
              <div className="hero__live-badge badge badge-live">
                LIVE NOW — {liveMatches.length} {liveMatches.length === 1 ? 'MATCH' : 'MATCHES'}
              </div>
              <div className="hero__live-cards">
                {liveMatches.slice(0, 2).map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          ) : nextMatch ? (
            <div className="hero__countdown-section">
              <p className="hero__next-match-label">NEXT MATCH</p>
              {nextMatchInfo && (
                <p className="hero__next-match-teams">
                  <Flag code={nextMatchInfo.home.code} size="md" />
                  {nextMatchInfo.home.name}
                  <span className="hero__vs">vs</span>
                  {nextMatchInfo.away.name}
                  <Flag code={nextMatchInfo.away.code} size="md" />
                </p>
              )}
              <CountdownTimer targetDate={nextMatch.date} label="Kick-off in" />
              {nextMatchInfo && (
                <p className="hero__venue-info">
                  📍 {nextMatchInfo.venue.name}, {nextMatchInfo.venue.city}
                </p>
              )}
            </div>
          ) : (
            <div className="hero__countdown-section">
              <p className="hero__next-match-label" style={{ fontSize: '1.2rem' }}>
                Tournament schedule coming soon
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="hero__cta">
          <Link to="/schedule" className="btn btn-primary btn-lg hero__cta-btn">
            View Schedule
            <span className="hero__cta-arrow">→</span>
          </Link>
          <Link to="/groups" className="btn btn-secondary btn-lg">
            Explore Groups
          </Link>
        </div>

        {/* Stats strip */}
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-value">48</span>
            <span className="hero__stat-label">Teams</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">104</span>
            <span className="hero__stat-label">Matches</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">16</span>
            <span className="hero__stat-label">Venues</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">3</span>
            <span className="hero__stat-label">Countries</span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="hero__bottom-fade" />
    </section>
  );
}
