import { useState, useMemo } from 'react';
import GroupTable from '../components/GroupTable';
import { groups, getTeam } from '../data/teams';
import { getMatchesByGroup } from '../data/matches';
import { useMatches } from '../hooks/useMatches';
import './Groups.css';

function formatMatchDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
}

function formatMatchTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function Groups() {
  const [expandedGroups, setExpandedGroups] = useState({});
  const { matches } = useMatches();
  const groupLetters = Object.keys(groups);

  const toggleGroup = (letter) => {
    setExpandedGroups(prev => ({
      ...prev,
      [letter]: !prev[letter],
    }));
  };

  return (
    <div className="groups-page">
      <div className="container">
        {/* ── Header ── */}
        <header className="groups-header animate-slide-up">
          <h1 className="section-title">
            <span className="gradient-text">Group Stage</span>
          </h1>
          <p className="section-subtitle">
            12 groups • 48 teams • The road to the knockout rounds
          </p>
        </header>

        {/* ── Groups Grid ── */}
        <div className="groups-grid stagger-children">
          {groupLetters.map(letter => (
            <GroupCard
              key={letter}
              letter={letter}
              expanded={!!expandedGroups[letter]}
              onToggle={() => toggleGroup(letter)}
              matchesList={matches}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function GroupCard({ letter, expanded, onToggle, matchesList }) {
  const matches = useMemo(() => matchesList.filter(m => m.group === letter), [letter, matchesList]);

  // Group matches by matchday
  const matchesByDay = useMemo(() => {
    const byDay = {};
    matches.forEach(m => {
      const md = m.matchday || 1;
      if (!byDay[md]) byDay[md] = [];
      byDay[md].push(m);
    });
    return Object.entries(byDay).sort(([a], [b]) => Number(a) - Number(b));
  }, [matches]);

  return (
    <div className="groups-card">
      {/* Group Table */}
      <GroupTable groupLetter={letter} matches={matchesList} />

      {/* Toggle Header */}
      <button className="groups-card-header" onClick={onToggle} aria-expanded={expanded}>
        <div className="groups-card-title">
          <span className="groups-card-label">
            {matches.length} Matches
          </span>
        </div>
        <span className={`groups-card-toggle${expanded ? ' expanded' : ''}`}>▼</span>
      </button>

      {/* Collapsible Matches */}
      <div className={`groups-matches${expanded ? ' open' : ''}`}>
        <div className="groups-matches-inner">
          {matchesByDay.map(([day, dayMatches]) => (
            <div key={day}>
              <div className="groups-matchday-divider">Matchday {day}</div>
              {dayMatches.map(match => (
                <MatchRow key={match.id} match={match} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MatchRow({ match }) {
  const home = match.home ? getTeam(match.home) : { flag: '🏳️', name: 'TBD' };
  const away = match.away ? getTeam(match.away) : { flag: '🏳️', name: 'TBD' };
  const isFinished = match.status === 'FINISHED';
  const isLive = match.status === 'LIVE';

  return (
    <div className="groups-match-row">
      <div className="groups-match-teams">
        <span className="groups-match-team">
          <span>{home.flag}</span>
          <span>{home.name}</span>
        </span>
        <span className="groups-match-vs">vs</span>
        <span className="groups-match-team">
          <span>{away.flag}</span>
          <span>{away.name}</span>
        </span>
      </div>
      {isFinished || isLive ? (
        <span className="groups-match-score">
          {match.score.home} – {match.score.away}
        </span>
      ) : (
        <span className="groups-match-date">
          {formatMatchDate(match.date)} · {formatMatchTime(match.date)}
        </span>
      )}
    </div>
  );
}

export default Groups;
