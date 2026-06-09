import { useMemo } from 'react';
import { roundLabels } from '../data/matches';
import { getTeam } from '../data/teams';
import { getVenue } from '../data/venues';
import { useMatches } from '../hooks/useMatches';
import Flag from './Flag';
import './KnockoutBracket.css';

function BracketSlot({ match }) {
  const homeTeam = match.home ? getTeam(match.home) : null;
  const awayTeam = match.away ? getTeam(match.away) : null;
  const venue = getVenue(match.venue);
  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';
  const hasScore = match.score.home !== null;

  const matchDate = new Date(match.date);
  const dateStr = matchDate.toLocaleDateString('en-GB', { timeZone: 'Asia/Dhaka', month: 'short', day: 'numeric' });

  return (
    <div className={`ko-slot ${isLive ? 'ko-slot--live' : ''} ${isFinished ? 'ko-slot--finished' : ''}`}>
      {/* Team rows */}
      <div className={`ko-slot__team ${isFinished && hasScore && match.score.home > match.score.away ? 'ko-slot__team--winner' : ''}`}>
        {homeTeam ? <Flag code={homeTeam.code} size="sm" /> : <span className="ko-slot__flag">🏳️</span>}
        <span className="ko-slot__name">{homeTeam ? homeTeam.name : 'TBD'}</span>
        {homeTeam && <span className="ko-slot__code">{homeTeam.code}</span>}
        {hasScore && (
          <span className={`ko-slot__score ${isLive ? 'ko-slot__score--live' : ''}`}>
            {match.score.home}
          </span>
        )}
      </div>
      <div className="ko-slot__divider" />
      <div className={`ko-slot__team ${isFinished && hasScore && match.score.away > match.score.home ? 'ko-slot__team--winner' : ''}`}>
        {awayTeam ? <Flag code={awayTeam.code} size="sm" /> : <span className="ko-slot__flag">🏳️</span>}
        <span className="ko-slot__name">{awayTeam ? awayTeam.name : 'TBD'}</span>
        {awayTeam && <span className="ko-slot__code">{awayTeam.code}</span>}
        {hasScore && (
          <span className={`ko-slot__score ${isLive ? 'ko-slot__score--live' : ''}`}>
            {match.score.away}
          </span>
        )}
      </div>
      {/* Meta */}
      <div className="ko-slot__meta">
        <span className="ko-slot__date">{dateStr}</span>
        <span className="ko-slot__venue">{venue.city}</span>
      </div>
      {isLive && <span className="ko-slot__live-badge badge badge-live">LIVE</span>}
    </div>
  );
}

export default function KnockoutBracket() {
  const { matches } = useMatches();

  const rounds = useMemo(() => {
    const roundOrder = ['R32', 'R16', 'QF', 'SF', 'FINAL'];
    return roundOrder.map((round) => ({
      key: round,
      label: roundLabels[round],
      matches: matches.filter(m => m.round === round),
    }));
  }, [matches]);

  // Also include 3rd place match
  const thirdPlace = useMemo(() => matches.filter(m => m.round === '3RD'), [matches]);

  return (
    <div className="ko-bracket">
      <div className="ko-bracket__scroll">
        <div className="ko-bracket__rounds">
          {rounds.map((round) => (
            <div className="ko-bracket__round" key={round.key}>
              <h3 className="ko-bracket__round-title">
                <span className="ko-bracket__round-label">{round.label}</span>
                <span className="ko-bracket__round-count">{round.matches.length} {round.matches.length === 1 ? 'match' : 'matches'}</span>
              </h3>
              <div className="ko-bracket__matches">
                {round.matches.map((match) => (
                  <BracketSlot key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Third Place */}
        {thirdPlace.length > 0 && (
          <div className="ko-bracket__third-place">
            <h3 className="ko-bracket__round-title">
              <span className="ko-bracket__round-label">{roundLabels['3RD']}</span>
            </h3>
            <div className="ko-bracket__matches">
              {thirdPlace.map((match) => (
                <BracketSlot key={match.id} match={match} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
