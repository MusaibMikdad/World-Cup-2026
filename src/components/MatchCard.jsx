import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTeam } from '../data/teams';
import { getVenue } from '../data/venues';
import { getFreeStreaming, streamingPlatforms } from '../data/streaming';
import Flag from './Flag';
import './MatchCard.css';

export default function MatchCard({ match }) {
  const homeTeam = useMemo(() => getTeam(match.home), [match.home]);
  const awayTeam = useMemo(() => getTeam(match.away), [match.away]);
  const venue = useMemo(() => getVenue(match.venue), [match.venue]);
  const [showStreaming, setShowStreaming] = useState(false);
  const popupRef = useRef(null);

  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';
  const isScheduled = match.status === 'SCHEDULED';

  const matchDate = new Date(match.date);
  const formattedDate = matchDate.toLocaleDateString('en-GB', {
    timeZone: 'Asia/Dhaka',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = matchDate.toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Dhaka',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  // Get Bangladesh-specific free platforms first, then other free platforms
  const bdPlatforms = useMemo(() => {
    return streamingPlatforms.filter(
      p => p.country.includes('Bangladesh') && p.free
    );
  }, []);

  const otherFreePlatforms = useMemo(() => {
    return streamingPlatforms.filter(
      p => p.free && !p.country.includes('Bangladesh') && p.region !== 'Global'
    ).slice(0, 4);
  }, []);

  const globalPlatforms = useMemo(() => {
    return [
      { name: 'FIFA+', url: 'https://www.fifa.com/fifaplus', free: true }
    ];
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    if (!showStreaming) return;
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowStreaming(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showStreaming]);

  // Close on Escape key
  useEffect(() => {
    if (!showStreaming) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') setShowStreaming(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [showStreaming]);

  return (
    <article
      className={`match-card glass-card ${isLive ? 'match-card--live' : ''} ${isFinished ? 'match-card--finished' : ''}`}
    >
      {/* Status badge */}
      <div className="match-card__header">
        {match.group && (
          <span className="badge badge-group">Group {match.group}</span>
        )}
        {match.round && (
          <span className="badge badge-group">{match.round}</span>
        )}
        {isLive && <span className="badge badge-live">LIVE</span>}
        {isScheduled && <span className="badge badge-upcoming">{formattedTime}</span>}
        {isFinished && <span className="badge badge-finished">FT</span>}
      </div>

      {/* Teams + Score */}
      <div className="match-card__body">
        {/* Home team */}
        <div className="match-card__team match-card__team--home">
          <Flag code={homeTeam.code} size="lg" />
          <span className="match-card__team-name">{homeTeam.name}</span>
          <span className="match-card__team-code">{homeTeam.code}</span>
        </div>

        {/* Score / VS */}
        <div className="match-card__score-area">
          {(isLive || isFinished) && match.score.home !== null ? (
            <div className={`match-card__score ${isLive ? 'match-card__score--live' : ''}`}>
              <span className="match-card__score-num">{match.score.home}</span>
              <span className="match-card__score-sep">–</span>
              <span className="match-card__score-num">{match.score.away}</span>
            </div>
          ) : (
            <div className="match-card__vs">VS</div>
          )}
        </div>

        {/* Away team */}
        <div className="match-card__team match-card__team--away">
          <Flag code={awayTeam.code} size="lg" />
          <span className="match-card__team-name">{awayTeam.name}</span>
          <span className="match-card__team-code">{awayTeam.code}</span>
        </div>
      </div>

      {/* Footer: venue + date */}
      <div className="match-card__footer">
        <span className="match-card__venue">📍 {venue.name}, {venue.city}</span>
        <span className="match-card__date">{formattedDate}</span>
      </div>

      {/* Watch button — always visible */}
      <div className="match-card__actions">
        <button
          className={`btn btn-sm ${isLive ? 'btn-live' : 'btn-primary'} match-card__watch`}
          onClick={() => setShowStreaming(!showStreaming)}
          aria-expanded={showStreaming}
        >
          {isLive ? '📺 Watch Live' : isFinished ? '🎬 Watch Replay' : '📺 Watch Live'}
        </button>
      </div>

      {/* Streaming Popup */}
      {showStreaming && (
        <div className="match-card__streaming-popup" ref={popupRef}>
          <div className="match-card__streaming-header">
            <h4 className="match-card__streaming-title">
              📺 <span className="gradient-text">Where to Watch</span>
            </h4>
            <button
              className="match-card__streaming-close"
              onClick={() => setShowStreaming(false)}
              aria-label="Close streaming popup"
            >
              ✕
            </button>
          </div>

          {/* Bangladesh section */}
          {bdPlatforms.length > 0 && (
            <div className="match-card__streaming-section">
              <p className="match-card__streaming-region">🇧🇩 Bangladesh (Free)</p>
              <div className="match-card__streaming-links">
                {bdPlatforms.map((p, i) => (
                  <a
                    key={i}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="match-card__streaming-link match-card__streaming-link--bd"
                  >
                    <span className="match-card__streaming-name">{p.name}</span>
                    <span className="match-card__streaming-badge">FREE</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Global section */}
          {globalPlatforms.length > 0 && (
            <div className="match-card__streaming-section">
              <p className="match-card__streaming-region">🌐 To view score</p>
              <div className="match-card__streaming-links">
                {globalPlatforms.map((p, i) => (
                  <a
                    key={i}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="match-card__streaming-link"
                  >
                    <span className="match-card__streaming-name">{p.name}</span>
                    <span className="match-card__streaming-badge">FREE</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* More options link */}
          <Link
            to="/watch"
            className="match-card__streaming-more"
            onClick={() => setShowStreaming(false)}
          >
            View all streaming platforms →
          </Link>
        </div>
      )}
    </article>
  );
}
