import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTeam } from '../data/teams';
import { getVenue } from '../data/venues';
import { getFreeStreaming, streamingPlatforms } from '../data/streaming';
import Flag from './Flag';
import { trackEvent } from '../services/analytics';
import { SoccerBallIcon } from './LiveScoreBar';
import './MatchCard.css';

const getMatchPossession = (match) => {
  if (match.possession) return match.possession;
  const homeScore = match.score?.home ?? 0;
  const awayScore = match.score?.away ?? 0;
  const seed = (match.id * 13) % 11 - 5; // -5 to +5
  let homeBase = 50 + seed;
  if (homeScore > awayScore) {
    homeBase += 2;
  } else if (awayScore > homeScore) {
    homeBase -= 2;
  }
  const homePoss = Math.max(35, Math.min(65, homeBase));
  const awayPoss = 100 - homePoss;
  return { home: homePoss, away: awayPoss };
};

const FootballIcon = ({ color, size = 12 }) => (
  <svg 
    viewBox="0 0 512 512" 
    width={size} 
    height={size} 
    style={{ fill: color, transition: 'fill 0.3s ease', flexShrink: 0 }}
  >
    <circle cx="256" cy="256" r="240" stroke={color} strokeWidth="16" fill="none" />
    <path d="M256,76 L201,116 L222,180 L290,180 L311,116 Z" />
    <path d="M110,182 L132,246 L82,282 L30,240 L48,180 Z" />
    <path d="M402,182 L380,246 L430,282 L482,240 L464,180 Z" />
    <path d="M148,348 L202,388 L181,452 L113,452 L92,388 Z" />
    <path d="M364,348 L310,388 L331,452 L399,452 L420,388 Z" />
    <path d="M256,8 L256,76 M118,107 L201,116 M394,107 L311,116 M222,180 L148,348 M290,180 L364,348 M201,116 L110,182 M311,116 L402,182 M132,246 L222,180 M380,246 L290,180 M132,246 L148,348 M380,246 L364,348 M82,282 L148,348 M430,282 L364,348 M202,388 L256,504 M310,388 L256,504" stroke={color} strokeWidth="18" strokeLinecap="round" />
  </svg>
);

const getPossessionColor = (poss) => {
  const neutralColor = { r: 226, g: 232, b: 240 };
  const leadColor = { r: 0, g: 255, b: 135 };
  const backColor = { r: 255, g: 71, b: 87 };

  if (poss === 50) {
    return 'rgb(226, 232, 240)';
  }

  if (poss > 50) {
    const t = Math.min(1, (poss - 50) / 15);
    const r = Math.round(neutralColor.r + t * (leadColor.r - neutralColor.r));
    const g = Math.round(neutralColor.g + t * (leadColor.g - neutralColor.g));
    const b = Math.round(neutralColor.b + t * (leadColor.b - neutralColor.b));
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    const t = Math.min(1, (50 - poss) / 15);
    const r = Math.round(neutralColor.r + t * (backColor.r - neutralColor.r));
    const g = Math.round(neutralColor.g + t * (backColor.g - neutralColor.g));
    const b = Math.round(neutralColor.b + t * (backColor.b - neutralColor.b));
    return `rgb(${r}, ${g}, ${b})`;
  }
};

const getPossessionStyle = (poss) => {
  const color = getPossessionColor(poss);
  const rgbaColor = color.replace('rgb', 'rgba').replace(')', '');
  return {
    color: color,
    borderColor: `${rgbaColor}, 0.25)`,
    background: `${rgbaColor}, 0.08)`,
  };
};

export default function MatchCard({ match }) {
  const homeTeam = useMemo(() => getTeam(match.home), [match.home]);
  const awayTeam = useMemo(() => getTeam(match.away), [match.away]);
  const venue = useMemo(() => getVenue(match.venue), [match.venue]);
  const [showStreaming, setShowStreaming] = useState(false);
  const popupRef = useRef(null);
  const lastSyncMinuteRef = useRef(null);
  const syncTimeRef = useRef(0);

  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';
  const isScheduled = match.status === 'SCHEDULED';

  const [possession, setPossession] = useState(() => getMatchPossession(match));

  useEffect(() => {
    setPossession(getMatchPossession(match));
  }, [match]);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setPossession(prev => {
        const diff = Math.random() > 0.5 ? 1 : -1;
        const nextHome = Math.max(35, Math.min(65, prev.home + diff));
        return { home: nextHome, away: 100 - nextHome };
      });
    }, 15000);
    return () => clearInterval(interval);
  }, [isLive]);

  const scorers = useMemo(() => match.scorers || [], [match.scorers]);
  const homeScorers = useMemo(() => scorers.filter(s => s.isHome), [scorers]);
  const awayScorers = useMemo(() => scorers.filter(s => !s.isHome), [scorers]);

  // ── Live match clock (ticks MM:SS + added stoppage time) ──
  const [matchClock, setMatchClock] = useState('');

  useEffect(() => {
    if (!isLive) {
      setMatchClock('');
      return;
    }

    const parseApiMinute = (minStr) => {
      const cleaned = minStr.replace(/'/g, '');
      if (cleaned.includes('+')) {
        const parts = cleaned.split('+');
        const mainMin = parseInt(parts[0], 10);
        const addedMin = parseInt(parts[1], 10);
        return { mainMin, addedMin };
      }
      const val = parseInt(cleaned, 10);
      if (!isNaN(val)) {
        return { mainMin: val, addedMin: 0 };
      }
      return null;
    };

    const updateClock = () => {
      // If match.minute is HT or FT, show it directly
      if (match.minute) {
        const minStr = String(match.minute).toUpperCase();
        if (minStr.includes('HALF') || minStr === 'HT') {
          setMatchClock('HT');
          return;
        }
        if (minStr.includes('FULL') || minStr === 'FT') {
          setMatchClock('FT');
          return;
        }
      }

      const now = new Date();
      const start = new Date(match.date);
      const totalSeconds = Math.floor((now - start) / 1000);

      if (totalSeconds < 0) {
        setMatchClock({ timeStr: '00:00', addedStr: '' });
        return;
      }

      // If match.minute is a minute number or injury minutes, parse and use it with ticking seconds
      if (match.minute) {
        const minStr = String(match.minute);
        const parsed = parseApiMinute(minStr);
        if (parsed) {
          const { mainMin, addedMin } = parsed;

          if (lastSyncMinuteRef.current !== minStr) {
            lastSyncMinuteRef.current = minStr;
            syncTimeRef.current = Date.now();
          }

          const elapsedSec = Math.floor((Date.now() - syncTimeRef.current) / 1000);
          const baseMin = addedMin > 0 ? mainMin + addedMin - 1 : mainMin;
          const totalMatchSec = baseMin * 60 + elapsedSec;

          const mm = String(Math.floor(totalMatchSec / 60)).padStart(2, '0');
          const ss = String(totalMatchSec % 60).padStart(2, '0');
          
          let addedStr = '';
          if (addedMin > 0) {
            const totalAdded = mainMin === 45 ? Math.max(3, addedMin) : Math.max(5, addedMin);
            addedStr = `+${totalAdded}`;
          }

          setMatchClock({
            timeStr: `${mm}:${ss}`,
            addedStr: addedStr
          });
          return;
        }
      }

      // Timeline stages (seconds):
      // 1. First Half: 0 to 45 mins (0 to 2700s)
      if (totalSeconds <= 2700) {
        const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const ss = String(totalSeconds % 60).padStart(2, '0');
        setMatchClock({ timeStr: `${mm}:${ss}`, addedStr: '' });
      }
      // 2. First Half Injury Time: 45 to 48 mins (2700 to 2880s) -> +3 added
      else if (totalSeconds <= 2880) {
        const elapsedSince45 = totalSeconds - 2700;
        const mm = String(45 + Math.floor(elapsedSince45 / 60)).padStart(2, '0');
        const ss = String(elapsedSince45 % 60).padStart(2, '0');
        setMatchClock({ timeStr: `${mm}:${ss}`, addedStr: '+3' });
      }
      // 3. Half Time (HT): 2880 to 3780s (15 mins HT)
      else if (totalSeconds <= 3780) {
        setMatchClock('HT');
      }
      // 4. Second Half: 3780 to 6480s (45 mins, runs from 45:00 to 90:00)
      else if (totalSeconds <= 6480) {
        const elapsedSecondHalf = totalSeconds - 3780;
        const mm = String(45 + Math.floor(elapsedSecondHalf / 60)).padStart(2, '0');
        const ss = String(elapsedSecondHalf % 60).padStart(2, '0');
        setMatchClock({ timeStr: `${mm}:${ss}`, addedStr: '' });
      }
      // 5. Second Half Injury Time: 6480 to 6840s (6 mins of stoppage, runs from 90:00 to 96:00)
      else if (totalSeconds <= 6840) {
        const elapsedSecondHalf = totalSeconds - 3780;
        const mm = String(45 + Math.floor(elapsedSecondHalf / 60)).padStart(2, '0');
        const ss = String(elapsedSecondHalf % 60).padStart(2, '0');
        setMatchClock({ timeStr: `${mm}:${ss}`, addedStr: '+6' });
      }
      // 6. Full Time (FT): > 6840s
      else {
        setMatchClock('FT');
      }
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
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
            {/^[A-Z]{3}$/.test(homeTeam.code) && homeTeam.code !== 'TBD' && (
              <span className="match-card__team-code">{homeTeam.code}</span>
            )}
            {isLive && (
              <span className="match-card__possession" style={getPossessionStyle(possession.home)}>
                <FootballIcon color={getPossessionColor(possession.home)} />
                <span>{possession.home}%</span>
              </span>
            )}
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
                    {typeof matchClock === 'string' ? (
                      <span className={`match-card__clock-time ${matchClock === 'HT' ? 'match-card__clock-time--ht' : ''}`}>
                        {matchClock}
                      </span>
                    ) : (
                      <div className="match-card__timer-capsule">
                        <span className="match-card__timer-main-time">{matchClock.timeStr}</span>
                        {matchClock.addedStr && (
                          <span className="match-card__timer-added-time">{matchClock.addedStr}</span>
                        )}
                      </div>
                    )}
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
            {/^[A-Z]{3}$/.test(awayTeam.code) && awayTeam.code !== 'TBD' && (
              <span className="match-card__team-code">{awayTeam.code}</span>
            )}
            {isLive && (
              <span className="match-card__possession" style={getPossessionStyle(possession.away)}>
                <FootballIcon color={getPossessionColor(possession.away)} />
                <span>{possession.away}%</span>
              </span>
            )}
          </div>
        </div>

        {scorers.length > 0 && (
          <div className="match-card__scorers-container">
            <div className="match-card__scorers-row">
              <div className="match-card__scorers-side match-card__scorers-side--home">
                {homeScorers.map((s, idx) => (
                  <div key={idx} className="match-card__scorer-item">
                    <div className="match-card__scorer-main">
                      <SoccerBallIcon type={s.type || 'goal'} />
                      <span className="match-card__scorer-name">{s.player}</span>
                      <span className="match-card__scorer-time">{s.time}</span>
                    </div>
                    {s.assist && (
                      <div className="match-card__scorer-assist">
                        <SoccerBallIcon type="assist" />
                        <span className="match-card__assist-name">{s.assist}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="match-card__scorers-side match-card__scorers-side--away">
                {awayScorers.map((s, idx) => (
                  <div key={idx} className="match-card__scorer-item match-card__scorer-item--away">
                    <div className="match-card__scorer-main">
                      <span className="match-card__scorer-time">{s.time}</span>
                      <span className="match-card__scorer-name">{s.player}</span>
                      <SoccerBallIcon type={s.type || 'goal'} />
                    </div>
                    {s.assist && (
                      <div className="match-card__scorer-assist">
                        <span className="match-card__assist-name">{s.assist}</span>
                        <SoccerBallIcon type="assist" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend Box */}
            <div className="match-card__legend-box">
              <div className="match-card__legend-item">
                <SoccerBallIcon type="goal" />
                <span className="match-card__legend-text">Goal</span>
              </div>
              <div className="match-card__legend-item">
                <SoccerBallIcon type="penalty" />
                <span className="match-card__legend-text">Penalty</span>
              </div>
              <div className="match-card__legend-item">
                <SoccerBallIcon type="penalty_saved" />
                <span className="match-card__legend-text">Penalty Saved</span>
              </div>
              <div className="match-card__legend-item">
                <SoccerBallIcon type="own_goal" />
                <span className="match-card__legend-text">Own Goal</span>
              </div>
              <div className="match-card__legend-item">
                <SoccerBallIcon type="assist" />
                <span className="match-card__legend-text">Assist</span>
              </div>
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
