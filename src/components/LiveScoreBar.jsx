import { useMemo } from 'react';
import { getTodayMatches, getUpcomingMatches } from '../data/matches';
import { getTeam } from '../data/teams';
import Flag from './Flag';
import './LiveScoreBar.css';

function MiniMatch({ match }) {
  const home = getTeam(match.home);
  const away = getTeam(match.away);
  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';
  const hasScore = match.score.home !== null;

  const time = new Date(match.date).toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Dhaka',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className={`scorebar__match ${isLive ? 'scorebar__match--live' : ''}`}>
      {isLive && <span className="scorebar__live-dot" />}
      <Flag code={home.code} size="sm" />
      <span className="scorebar__code">{home.code}</span>
      {hasScore ? (
        <span className={`scorebar__score ${isLive ? 'scorebar__score--live' : ''}`}>
          {match.score.home} - {match.score.away}
        </span>
      ) : (
        <span className="scorebar__time">{time}</span>
      )}
      <span className="scorebar__code">{away.code}</span>
      <Flag code={away.code} size="sm" />
      {isFinished && <span className="scorebar__ft">FT</span>}
    </div>
  );
}

export default function LiveScoreBar() {
  const todayMatches = getTodayMatches();
  const upcoming = getUpcomingMatches(1);
  const nextMatch = upcoming[0] || null;

  const hasMatches = todayMatches.length > 0;
  const shouldMarquee = todayMatches.length > 4;

  const nextMatchInfo = useMemo(() => {
    if (!nextMatch) return null;
    const home = getTeam(nextMatch.home);
    const away = getTeam(nextMatch.away);
    const matchDate = new Date(nextMatch.date);
    const dateStr = matchDate.toLocaleDateString('en-GB', {
      timeZone: 'Asia/Dhaka',
      month: 'short', day: 'numeric',
    });
    const timeStr = matchDate.toLocaleTimeString('en-GB', {
      timeZone: 'Asia/Dhaka',
      hour: '2-digit', minute: '2-digit',
      hour12: false,
    });
    return { home, away, dateStr, timeStr };
  }, [nextMatch]);

  return (
    <div className="scorebar">
      <div className="scorebar__inner">
        {hasMatches ? (
          <div className={`scorebar__track ${shouldMarquee ? 'scorebar__track--marquee' : ''}`}>
            <div className="scorebar__matches">
              {todayMatches.map((match) => (
                <MiniMatch key={match.id} match={match} />
              ))}
            </div>
            {shouldMarquee && (
              <div className="scorebar__matches" aria-hidden="true">
                {todayMatches.map((match) => (
                  <MiniMatch key={`dup-${match.id}`} match={match} />
                ))}
              </div>
            )}
          </div>
        ) : nextMatchInfo ? (
          <div className="scorebar__next">
            <span className="scorebar__next-label">Next match:</span>
            <Flag code={nextMatchInfo.home.code} size="sm" />
            <span className="scorebar__code">{nextMatchInfo.home.name}</span>
            <span className="scorebar__vs">vs</span>
            <span className="scorebar__code">{nextMatchInfo.away.name}</span>
            <Flag code={nextMatchInfo.away.code} size="sm" />
            <span className="scorebar__next-time">
              {nextMatchInfo.dateStr} · {nextMatchInfo.timeStr}
            </span>
          </div>
        ) : (
          <div className="scorebar__next">
            <span className="scorebar__next-label">Tournament starts June 11, 2026</span>
          </div>
        )}
      </div>
    </div>
  );
}
