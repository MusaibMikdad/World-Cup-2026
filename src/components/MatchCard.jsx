import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTeam } from '../data/teams';
import { getVenue } from '../data/venues';
import { getFreeStreaming, streamingPlatforms } from '../data/streaming';
import Flag from './Flag';
import { trackEvent } from '../services/analytics';
import './MatchCard.css';

export default function MatchCard({ match }) {
  const homeTeam = useMemo(() => getTeam(match.home), [match.home]);
  const awayTeam = useMemo(() => getTeam(match.away), [match.away]);
  const venue = useMemo(() => getVenue(match.venue), [match.venue]);
  const [showStreaming, setShowStreaming] = useState(false);
  const popupRef = useRef(null);

  const scorers = useMemo(() => match.scorers || [], [match.scorers]);
  const homeScorers = useMemo(() => scorers.filter(s => s.isHome), [scorers]);
  const awayScorers = useMemo(() => scorers.filter(s => !s.isHome), [scorers]);

  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';
  const isScheduled = match.status === 'SCHEDULED';

  // ── Live match clock (ticks every second) ──
  const [matchClock, setMatchClock] = useState('');

  useEffect(() => {
    if (!isLive) {
      setMatchClock('');
      return;
    }

    const updateClock = () => {
      // If the API explicitly provides a live minute string/number, trust it directly.
      if (match.minute) {
        const minStr = String(match.minute);
        if (minStr.toLowerCase().includes('half') || minStr === 'HT' || minStr === '23') {
          setMatchClock('HT');
        } else if (minStr.toLowerCase().includes('full') || minStr === 'FT' || minStr === '3') {
          setMatchClock('FT');
        } else {
          setMatchClock(minStr.includes("'") ? minStr : `${minStr}'`);
        }
        return;
      }

      // Fallback: calculate time elapsed locally if no API minute is available
      const now = new Date();
      const start = new Date(match.date);
      const elapsedMin = Math.floor((now - start) / 60000);

      if (elapsedMin <= 45) {
        setMatchClock(`${Math.max(1, elapsedMin)}'`);
      } else if (elapsedMin <= 60) {
        setMatchClock('HT');
      } else if (elapsedMin <= 105) {
        setMatchClock(`${elapsedMin - 15}'`);
      } else if (elapsedMin <= 120) {
        setMatchClock(`90+${elapsedMin - 105}'`);
      } else {
        setMatchClock('FT');
      }
    };

      updateClock();
      const timer = setInterval(updateClock, 1000);
      return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLive, match.date, match.minute]);

    const matchDate = new Date(match.date);
  const formattedDate = matchDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = matchDate.toLocaleTimeString('en-GB', {
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
        {isLive && (
          <span className="badge badge-live">
            <span className="badge-live__dot" />
            LIVE Now
          </span>
        )}
        {isScheduled && <span className="badge badge-upcoming">{formattedTime}</span>}
        {isFinished && <span className="badge badge-finished">FT</span>}
      </div>

      {/* Teams + Score */}
      <a 
        href="https://www.fifa.com/en/match-centre" 
        target="_blank" 
        rel="noopener noreferrer"
        className="match-card__body match-card__body--clickable"
      >
        <div className="match-card__main-row">
          {/* Home team */}
          <div className="match-card__team match-card__team--home">
            <Flag code={homeTeam.code} size="lg" />
            <span className="match-card__team-name">{homeTeam.name}</span>
            <span className="match-card__team-code">{homeTeam.code}</span>
          </div>

          {/* Score / VS / Live Scoreboard */}
          <div className="match-card__score-area">
            {isLive ? (
              <div className="match-card__live-scoreboard">
                <div className="match-card__score match-card__score--live">
                  <span className="match-card__score-num">{match.score.home ?? 0}</span>
                  <span className="match-card__score-sep">:</span>
                  <span className="match-card__score-num">{match.score.away ?? 0}</span>
                </div>
                {matchClock && (
                  <div className="match-card__match-clock">
                    <span className={`match-card__clock-time ${matchClock === 'HT' ? 'match-card__clock-time--ht' : ''}`}>
                      {matchClock}
                    </span>
                  </div>
                )}
              </div>
            ) : isFinished ? (
              <div className="match-card__score">
                <span className="match-card__score-num">{match.score.home ?? 0}</span>
                <span className="match-card__score-sep">:</span>
                <span className="match-card__score-num">{match.score.away ?? 0}</span>
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

        {scorers.length > 0 && (
          <div className="match-card__scorers-container">
            <div className="match-card__scorers-side match-card__scorers-side--home">
              {homeScorers.map((s, idx) => (
                <div key={idx} className="match-card__scorer-item">
                  ⚽ {s.player} {s.time}
                </div>
              ))}
            </div>
            <div className="match-card__scorers-side match-card__scorers-side--away">
              {awayScorers.map((s, idx) => (
                <div key={idx} className="match-card__scorer-item">
                  {s.player} {s.time} ⚽
                </div>
              ))}
            </div>
          </div>
        )}
      </a>

      {/* Footer: venue + date */}
      <div className="match-card__footer">
        <span className="match-card__venue">📍 {venue.name}, {venue.city}</span>
        <span className="match-card__date">{formattedDate}</span>
      </div>

      {/* Watch button + Streaming Popup */}
      <div className="match-card__actions">
        {/* Streaming Popup — positioned above the button */}
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
                    onClick={() => trackEvent('Stream', 'Watch click (Bangladesh)', p.name)}
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
            to="/watch#platforms"
            className="match-card__streaming-more"
            onClick={() => {
              setShowStreaming(false);
              trackEvent('Click', 'Navigate to more streaming options');
            }}
          >
            View all streaming platforms →
          </Link>
        </div>
        )}

        <button
          className={`btn btn-sm ${isLive ? 'btn-live' : 'btn-primary'} match-card__watch`}
          onClick={() => {
            setShowStreaming(!showStreaming);
            if (!showStreaming) {
              trackEvent('Action', 'Open watch streaming popup', `${homeTeam.code} vs ${awayTeam.code}`);
            }
          }}
          aria-expanded={showStreaming}
        >
          {isLive ? '📺 Watch Live' : isFinished ? '🎬 Watch Replay' : '📺 Watch Live'}
        </button>
      </div>
    </article>
  );
}
