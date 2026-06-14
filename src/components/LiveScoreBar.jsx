import { useMemo, useState, useEffect } from 'react';
import { useMatches } from '../hooks/useMatches';
import { getTeam } from '../data/teams';
import Flag from './Flag';
import './LiveScoreBar.css';

export function SoccerBallIcon({ type, className = '' }) {
  if (type === 'assist') {
    return (
      <span className={`scorebar__ball-icon scorebar__ball-icon--assist ${className}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
        👟
      </span>
    );
  }

  // Use the native ⚽ emoji for Goal (exactly "normal color like now"!)
  if (type === 'goal') {
    return (
      <span className={`scorebar__ball-icon scorebar__ball-icon--goal ${className}`} style={{ display: 'inline-flex', alignItems: 'center', fontSize: '13px', lineHeight: '1' }}>
        ⚽
      </span>
    );
  }

  // For other types, use a high-quality, professional SVG soccer ball
  let ballColor = '#10b981'; // default green
  let patternColor = '#ffffff';
  let hasCross = false;

  if (type === 'penalty') {
    ballColor = '#22c55e'; // green ball
    patternColor = '#ffffff';
  } else if (type === 'own_goal') {
    ballColor = '#ec4899'; // pink ball
    patternColor = '#ffffff';
  } else if (type === 'penalty_saved') {
    ballColor = '#22c55e'; // green ball
    patternColor = '#ffffff';
    hasCross = true;
  }

  return (
    <span className={`scorebar__ball-icon scorebar__ball-icon--${type} ${className}`} style={{ display: 'inline-flex', alignItems: 'center', position: 'relative', verticalAlign: 'middle', width: '13px', height: '13px' }}>
      <svg viewBox="0 0 512 512" width="13" height="13" style={{ display: 'block', overflow: 'visible' }}>
        {/* Ball Circle Background */}
        <circle cx="256" cy="256" r="240" fill={ballColor} stroke={ballColor} strokeWidth="16" />
        
        {/* Pentagons & Seams */}
        <path d="M256,76 L201,116 L222,180 L290,180 L311,116 Z" fill={patternColor} />
        <path d="M110,182 L132,246 L82,282 L30,240 L48,180 Z" fill={patternColor} />
        <path d="M402,182 L380,246 L430,282 L482,240 L464,180 Z" fill={patternColor} />
        <path d="M148,348 L202,388 L181,452 L113,452 L92,388 Z" fill={patternColor} />
        <path d="M364,348 L310,388 L331,452 L399,452 L420,388 Z" fill={patternColor} />
        
        {/* Connecting Lines */}
        <path d="M256,8 L256,76 M118,107 L201,116 M394,107 L311,116 M222,180 L148,348 M290,180 L364,348 M201,116 L110,182 M311,116 L402,182 M132,246 L222,180 M380,246 L290,180 M132,246 L148,348 M380,246 L364,348 M82,282 L148,348 M430,282 L364,348 M202,388 L256,504 M310,388 L256,504" stroke={patternColor} strokeWidth="18" strokeLinecap="round" />
        
        {/* Red Cross for Penalty Saved */}
        {hasCross && (
          <>
            <path d="M80 80 L432 432 M432 80 L80 432" stroke="#000000" strokeWidth="96" strokeLinecap="round" />
            <path d="M80 80 L432 432 M432 80 L80 432" stroke="#ef4444" strokeWidth="64" strokeLinecap="round" />
          </>
        )}
      </svg>
    </span>
  );
}

function MiniMatch({ match }) {
  const home = getTeam(match.home);
  const away = getTeam(match.away);
  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';
  const hasScore = isLive || isFinished;

  const matchDate = new Date(match.date);
  const time = matchDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const dateStr = matchDate.toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={`scorebar__match ${isLive ? 'scorebar__match--live' : ''}`}>
      <div className="scorebar__match-main">
        {isLive && <span className="scorebar__live-dot" />}
        <Flag code={home.code} size="sm" />
        <span className="scorebar__code">{home.code}</span>
        {hasScore ? (
          <span className={`scorebar__score ${isLive ? 'scorebar__score--live' : ''}`}>
            {match.score.home} - {match.score.away}
          </span>
        ) : (
          <span className="scorebar__time">
            <span className="scorebar__next-tag">{dateStr}</span> {time}
          </span>
        )}
        <span className="scorebar__code">{away.code}</span>
        <Flag code={away.code} size="sm" />
        {isFinished && <span className="scorebar__ft-badge">FT</span>}
      </div>
    </div>
  );
}

export default function LiveScoreBar() {
  const { matches, liveMatches } = useMatches();

  // Get today's finished matches to display in the scorebar
  const todayFinished = useMemo(() => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const todayStr = formatter.format(now);
    
    return matches.filter(m => {
      const matchDate = new Date(m.date);
      const matchStr = formatter.format(matchDate);
      return matchStr === todayStr && m.status === 'FINISHED';
    });
  }, [matches]);

  // Show live matches + upcoming scheduled matches (exclude finished)
  const upcomingScheduled = useMemo(() => {
    return matches
      .filter(m => m.status === 'SCHEDULED')
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 6);
  }, [matches]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const displayMatches = useMemo(() => {
    return [...todayFinished, ...liveMatches, ...upcomingScheduled];
  }, [todayFinished, liveMatches, upcomingScheduled]);

  const hasMatches = displayMatches.length > 0;
  const shouldMarquee = displayMatches.length > (isMobile ? 2 : 4);

  return (
    <div className="scorebar">
      <div className="scorebar__inner">
        {hasMatches ? (
          <div className={`scorebar__track ${shouldMarquee ? 'scorebar__track--marquee' : ''}`}>
            <div className="scorebar__matches">
              {displayMatches.map((match) => (
                <MiniMatch key={match.id} match={match} />
              ))}
            </div>
            {shouldMarquee && (
              <div className="scorebar__matches" aria-hidden="true">
                {displayMatches.map((match) => (
                  <MiniMatch key={`dup-${match.id}`} match={match} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="scorebar__next">
            <span className="scorebar__next-label">No upcoming matches</span>
          </div>
        )}
      </div>
    </div>
  );
}

