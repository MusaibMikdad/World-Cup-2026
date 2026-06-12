import { useMatches } from '../hooks/useMatches';
import { getTeam } from '../data/teams';
import Flag from './Flag';
import './LiveScoreBar.css';

function MiniMatch({ match }) {
  const home = getTeam(match.home);
  const away = getTeam(match.away);
  const isLive = match.status === 'LIVE';

  const matchDate = new Date(match.date);
  const time = matchDate.toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Dhaka',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const dateStr = matchDate.toLocaleDateString('en-GB', {
    timeZone: 'Asia/Dhaka',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={`scorebar__match ${isLive ? 'scorebar__match--live' : ''}`}>
      {isLive && <span className="scorebar__live-dot" />}
      <Flag code={home.code} size="sm" />
      <span className="scorebar__code">{home.code}</span>
      {isLive ? (
        <span className="scorebar__score scorebar__score--live">
          {match.score.home} - {match.score.away}
        </span>
      ) : (
        <span className="scorebar__time">
          <span className="scorebar__next-tag">{dateStr}</span> {time}
        </span>
      )}
      <span className="scorebar__code">{away.code}</span>
      <Flag code={away.code} size="sm" />
    </div>
  );
}

export default function LiveScoreBar() {
  const { matches, liveMatches } = useMatches();

  // Show live matches + upcoming scheduled matches (exclude finished)
  const upcomingScheduled = matches
    .filter(m => m.status === 'SCHEDULED')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);

  const displayMatches = [...liveMatches, ...upcomingScheduled];
  const hasMatches = displayMatches.length > 0;
  const shouldMarquee = displayMatches.length > 4;

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

