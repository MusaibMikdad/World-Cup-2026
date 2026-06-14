import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { allMatches } from '../data/matches';
import { getAllMatchesEspn } from '../services/api';

// A football match lasts ~120 minutes real time (90 min play + 15 min HT + extras)
const MATCH_DURATION_MIN = 120;

// ── Derive match status purely from current time ──
const deriveStatus = (matchDate, existingStatus) => {
  // If the API already marked it FINISHED, respect that
  if (existingStatus === 'FINISHED') return 'FINISHED';

  const now = new Date();
  const start = new Date(matchDate);
  const elapsedMin = (now - start) / 60000;

  if (elapsedMin < 0) return 'SCHEDULED';
  if (elapsedMin < MATCH_DURATION_MIN) return 'LIVE';
  return 'FINISHED';
};

// ── Apply time-based statuses to all matches ──
const applyTimeStatuses = (matches) => {
  return matches.map(m => {
    const newStatus = deriveStatus(m.date, m.status);
    let score = m.score;

    // When a match goes LIVE and has no score yet, default to 0 : 0
    if (newStatus === 'LIVE' && (score.home === null || score.home === undefined)) {
      score = { home: 0, away: 0 };
    }
    // When a match ends without API data, keep last known score
    if (newStatus === 'FINISHED' && (score.home === null || score.home === undefined)) {
      score = { home: 0, away: 0 };
    }

    return { ...m, status: newStatus, score, scorers: m.scorers || [] };
  });
};

// ══════════════════════════════════════════
// Main hook
// ══════════════════════════════════════════
export function useMatches() {
  const [matches, setMatches] = useState(() => applyTimeStatuses(allMatches));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiIntervalRef = useRef(null);
  const statusIntervalRef = useRef(null);

  // ── Refresh time-based statuses every 10 seconds ──
  // This makes SCHEDULED → LIVE → FINISHED transitions happen automatically
  useEffect(() => {
    const tick = () => {
      setMatches(prev => applyTimeStatuses(prev));
    };
    statusIntervalRef.current = setInterval(tick, 10000);
    return () => clearInterval(statusIntervalRef.current);
  }, []);

  // ── Fetch ALL scores from ESPN every 30 seconds ──
  const refreshAllScores = useCallback(async () => {
    try {
      const apiData = await getAllMatchesEspn();
      if (apiData?.matches?.length > 0) {
        setMatches(prev =>
          prev.map(match => {
            const apiMatch = apiData.matches.find(
              am =>
                am.id === match.id ||
                (am.homeTeam?.tla === match.home &&
                  am.awayTeam?.tla === match.away)
            );
            if (apiMatch) {
              const apiStatus =
                apiMatch.status === 'IN_PLAY' || apiMatch.status === 'PAUSED'
                  ? 'LIVE'
                  : apiMatch.status === 'FINISHED'
                    ? 'FINISHED'
                    : match.status;

              return {
                ...match,
                status: apiStatus,
                minute: apiMatch.minute || null,
                score: {
                  home:
                    apiMatch.score?.fullTime?.home ??
                    apiMatch.score?.halfTime?.home ??
                    match.score.home,
                  away:
                    apiMatch.score?.fullTime?.away ??
                    apiMatch.score?.halfTime?.away ??
                    match.score.away,
                },
                scorers: apiMatch.scorers || []
              };
            }
            return match;
          })
        );
      }
    } catch (err) {
      // Silently fail — time-based detection is the fallback
      console.warn('Score refresh failed:', err.message);
    }
  }, []);

  useEffect(() => {
    refreshAllScores();
    apiIntervalRef.current = setInterval(refreshAllScores, 30000);
    return () => clearInterval(apiIntervalRef.current);
  }, [refreshAllScores]);

  // ── Derived data ──
  const liveMatches = useMemo(
    () => matches.filter(m => m.status === 'LIVE').sort((a, b) => new Date(a.date) - new Date(b.date)),
    [matches]
  );

  const todayMatches = useMemo(() => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const todayStr = formatter.format(now);
    
    return matches
      .filter(m => {
        const matchDate = new Date(m.date);
        const matchStr = formatter.format(matchDate);
        return matchStr === todayStr;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [matches]);

  const upcomingMatches = useMemo(
    () =>
      matches
        .filter(m => 
          new Date(m.date) > new Date() && 
          m.status === 'SCHEDULED' &&
          !todayMatches.some(t => t.id === m.id)
        )
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 6),
    [matches, todayMatches]
  );

  return {
    matches,
    liveMatches,
    todayMatches,
    upcomingMatches,
    loading,
    error,
    refreshAllScores,
  };
}

// ══════════════════════════════════════════
// Countdown Timer Hook (unchanged)
// ══════════════════════════════════════════
export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function calculateTimeLeft(targetDate) {
  const difference = new Date(targetDate) - new Date();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    expired: false,
  };
}

export default useMatches;
