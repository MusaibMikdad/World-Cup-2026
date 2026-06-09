import { useState, useEffect, useRef } from 'react';
import { allMatches, getLiveMatches, getUpcomingMatches, getTodayMatches } from '../data/matches';
import { getLiveMatchesApi, getMatches as getMatchesApi } from '../services/api';

// Hook to get matches with optional live API updates
export function useMatches() {
  const [matches, setMatches] = useState(allMatches);
  const [liveMatches, setLiveMatches] = useState(getLiveMatches());
  const [todayMatches, setTodayMatches] = useState(getTodayMatches());
  const [upcomingMatches, setUpcomingMatches] = useState(getUpcomingMatches(6));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  // Try to fetch live data from API
  const refreshLiveData = async () => {
    try {
      const apiData = await getLiveMatchesApi();
      if (apiData && apiData.matches && apiData.matches.length > 0) {
        // Merge API live data with local data
        const updatedMatches = matches.map(match => {
          const apiMatch = apiData.matches.find(
            am => am.id === match.id ||
            (am.homeTeam?.tla === match.home && am.awayTeam?.tla === match.away)
          );
          if (apiMatch) {
            return {
              ...match,
              status: apiMatch.status === 'IN_PLAY' ? 'LIVE' : apiMatch.status,
              score: {
                home: apiMatch.score?.fullTime?.home ?? match.score.home,
                away: apiMatch.score?.fullTime?.away ?? match.score.away,
              },
            };
          }
          return match;
        });
        setMatches(updatedMatches);
        setLiveMatches(updatedMatches.filter(m => m.status === 'LIVE'));
      }
    } catch (err) {
      // Silently fail — we have local data as fallback
      console.warn('Live data refresh failed:', err.message);
    }
  };

  // Set up auto-refresh for live matches
  useEffect(() => {
    // Initial refresh
    refreshLiveData();

    // Refresh every 30 seconds if there are live matches
    intervalRef.current = setInterval(() => {
      refreshLiveData();
    }, 30000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Update derived data when matches change
  useEffect(() => {
    const now = new Date();
    const bdNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
    const todayStr = bdNow.toISOString().split('T')[0];

    setTodayMatches(
      matches.filter(m => {
        const matchDate = new Date(m.date);
        const bdMatch = new Date(matchDate.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
        const matchStr = bdMatch.toISOString().split('T')[0];
        return matchStr === todayStr;
      })
    );
    setUpcomingMatches(
      matches
        .filter(m => new Date(m.date) > new Date() && m.status === 'SCHEDULED')
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 6)
    );
    setLiveMatches(matches.filter(m => m.status === 'LIVE'));
  }, [matches]);

  return {
    matches,
    liveMatches,
    todayMatches,
    upcomingMatches,
    loading,
    error,
    refreshLiveData,
  };
}

// Hook for countdown timer
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
