import { useState, useMemo } from 'react';
import MatchCard from '../components/MatchCard';
import LiveScoreBar from '../components/LiveScoreBar';
import { useMatches } from '../hooks/useMatches';
import { allMatches, getUniqueMatchDates, roundLabels } from '../data/matches';
import { getTeam } from '../data/teams';
import './Schedule.css';

const STAGE_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'group', label: 'Group Stage' },
  { key: 'R32', label: 'Round of 32' },
  { key: 'R16', label: 'Round of 16' },
  { key: 'QF', label: 'Quarter-Finals' },
  { key: 'SF', label: 'Semi-Finals' },
  { key: 'FINAL', label: 'Final' },
];

// Convert a match date to local date string (YYYY-MM-DD)
function toLocalDate(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString('en-CA'); // en-CA gives YYYY-MM-DD in browser's local timezone
}

function formatDateHeader(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDatePill(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  const dayName = d.toLocaleDateString('en-GB', { weekday: 'short' });
  const num = d.toLocaleDateString('en-GB', { day: 'numeric' });
  const monthName = d.toLocaleDateString('en-GB', { month: 'short' });
  return { day: dayName, num, month: monthName };
}

function Schedule() {
  const [stageFilter, setStageFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState(null);
  const [search, setSearch] = useState('');
  const { matches } = useMatches();

  const matchDates = useMemo(() => {
    const allDates = [...new Set(matches.map(m => toLocalDate(m.date)))].sort();
    return allDates;
  }, [matches]);

  const filteredMatches = useMemo(() => {
    let list = [...matches];

    // Stage filter
    if (stageFilter === 'group') {
      list = list.filter(m => m.group);
    } else if (stageFilter !== 'all') {
      list = list.filter(m => m.round === stageFilter);
    }

    // Date filter
    if (dateFilter) {
      list = list.filter(m => toLocalDate(m.date) === dateFilter);
    }

    // Search filter
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(m => {
        const home = m.home ? getTeam(m.home) : null;
        const away = m.away ? getTeam(m.away) : null;
        const homeName = home ? home.name.toLowerCase() : '';
        const awayName = away ? away.name.toLowerCase() : '';
        const homeCode = m.home ? m.home.toLowerCase() : '';
        const awayCode = m.away ? m.away.toLowerCase() : '';
        return (
          homeName.includes(q) ||
          awayName.includes(q) ||
          homeCode.includes(q) ||
          awayCode.includes(q)
        );
      });
    }

    return list;
  }, [matches, stageFilter, dateFilter, search]);

  // Group by date
  const matchesByDate = useMemo(() => {
    const grouped = {};
    filteredMatches.forEach(m => {
      const date = toLocalDate(m.date);
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(m);
    });
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredMatches]);

  const clearFilters = () => {
    setStageFilter('all');
    setDateFilter(null);
    setSearch('');
  };

  return (
    <div className="schedule-page" style={{ paddingTop: 0 }}>
      <LiveScoreBar />
      <div className="container" style={{ marginTop: 'calc(var(--scorebar-height) + var(--space-md))' }}>
        {/* ── Header ── */}
        <header className="schedule-header animate-slide-up">
          <h1 className="section-title">
            <span>🏆</span>
            <span className="gradient-text">Match Schedule</span>
          </h1>
          <p className="section-subtitle">
            All {matches.length} matches across {matchDates.length} match days
          </p>
        </header>

        {/* ── Filters ── */}
        <div className="schedule-filters animate-fade-in">
          {/* Stage Tabs */}
          <div className="schedule-stage-tabs">
            {STAGE_FILTERS.map(f => (
              <button
                key={f.key}
                className={`schedule-stage-tab${stageFilter === f.key ? ' active' : ''}`}
                onClick={() => setStageFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Date Pills */}
          <div className="schedule-date-scroll">
            <button
              className={`schedule-date-pill${dateFilter === null ? ' active' : ''}`}
              onClick={() => setDateFilter(null)}
            >
              <span className="schedule-date-pill-day">All</span>
              <span className="schedule-date-pill-num">📅</span>
              <span className="schedule-date-pill-month">Dates</span>
            </button>
            {matchDates.map(date => {
              const { day, num, month } = formatDatePill(date);
              return (
                <button
                  key={date}
                  className={`schedule-date-pill${dateFilter === date ? ' active' : ''}`}
                  onClick={() => setDateFilter(dateFilter === date ? null : date)}
                >
                  <span className="schedule-date-pill-day">{day}</span>
                  <span className="schedule-date-pill-num">{num}</span>
                  <span className="schedule-date-pill-month">{month}</span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="schedule-search-wrap">
            <span className="schedule-search-icon">🔍</span>
            <input
              type="text"
              className="input-field schedule-search"
              placeholder="Search by team name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ── Results Count ── */}
        <div className="schedule-results-count">
          <strong>{filteredMatches.length}</strong> matches found
          {(stageFilter !== 'all' || dateFilter || search) && (
            <button className="btn btn-sm btn-secondary" onClick={clearFilters} style={{ marginLeft: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
              Clear filters
            </button>
          )}
        </div>

        {/* ── Match List ── */}
        {matchesByDate.length > 0 ? (
          matchesByDate.map(([date, matches]) => (
            <div key={date} className="schedule-date-group animate-slide-up">
              <div className="schedule-date-header">
                <span className="schedule-date-dot" />
                <span className="schedule-date-label">{formatDateHeader(date)}</span>
                <span className="schedule-date-count">{matches.length} match{matches.length !== 1 ? 'es' : ''}</span>
              </div>
              <div className="schedule-matches-list">
                {matches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="schedule-empty glass-card-static">
            <div className="schedule-empty-icon">🔎</div>
            <h3>No matches found</h3>
            <p>Try adjusting your filters or search term to find matches.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Schedule;
