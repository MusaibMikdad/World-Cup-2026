// Football-data.org API integration
// Free tier: 10 req/min, competition code: WC

const API_BASE = 'https://api.football-data.org/v4';
const API_KEY = ''; // Add your free API key from football-data.org

const headers = API_KEY
  ? { 'X-Auth-Token': API_KEY }
  : {};

// Rate limiting tracker
let requestCount = 0;
let lastResetTime = Date.now();
const MAX_REQUESTS_PER_MINUTE = 10;

const checkRateLimit = () => {
  const now = Date.now();
  if (now - lastResetTime > 60000) {
    requestCount = 0;
    lastResetTime = now;
  }
  if (requestCount >= MAX_REQUESTS_PER_MINUTE) {
    throw new Error('Rate limit exceeded. Please wait a moment.');
  }
  requestCount++;
};

const ASSISTS_CACHE_KEY = 'wc2026_assists_cache';

const getAssistsCache = () => {
  if (typeof window === 'undefined' || !window.localStorage) return {};
  try {
    const cached = localStorage.getItem(ASSISTS_CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch (e) {
    return {};
  }
};

const saveAssistsCache = (cache) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(ASSISTS_CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    // Ignore
  }
};

// Fetch scores from the public ESPN Soccer API (all match states)
const fetchEspnMatches = async () => {
  try {
    // Fetch all tournament matches to ensure we get historical/finished scores
    const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719&limit=150');
    if (!response.ok) return { matches: [] };
    const data = await response.json();
    
    // Load existing assists cache
    const cache = getAssistsCache();
    
    // Identify which events need summary fetches
    const eventIdsToFetch = [];
    data.events.forEach(event => {
      const comp = event.competitions[0];
      const state = comp.status.type.state;
      const hasGoals = comp.details && comp.details.some(d => d.scoringPlay);
      
      if (hasGoals) {
        const isFinished = state === 'post';
        if (!isFinished || !cache[event.id]) {
          eventIdsToFetch.push(event.id);
        }
      }
    });

    // Fetch summaries in parallel
    const newSummaries = {};
    if (eventIdsToFetch.length > 0) {
      const fetchPromises = eventIdsToFetch.map(async (id) => {
        try {
          const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary?event=${id}`);
          if (res.ok) {
            newSummaries[id] = await res.json();
          }
        } catch (e) {
          console.warn(`Failed to fetch summary for ${id}:`, e);
        }
      });
      await Promise.all(fetchPromises);
    }

    // Update cache with newly fetched summaries
    let cacheChanged = false;
    eventIdsToFetch.forEach(id => {
      const summaryData = newSummaries[id];
      if (!summaryData) return;
      
      const event = data.events.find(e => e.id === id);
      if (!event) return;
      
      const comp = event.competitions[0];
      const eventAssists = {};
      
      if (comp.details) {
        comp.details
          .filter(detail => {
            const typeText = detail.type?.text?.toLowerCase() || '';
            const isPenaltySaved = typeText.includes('penalty - saved') || typeText.includes('penalty saved') || typeText.includes('penalty - missed') || typeText.includes('penalty missed');
            return (detail.scoringPlay || isPenaltySaved) && detail.athletesInvolved && detail.athletesInvolved.length > 0;
          })
          .forEach(detail => {
            const player = detail.athletesInvolved[0].shortName || detail.athletesInvolved[0].displayName;
            const time = detail.clock?.displayValue || '';
            
            const comment = summaryData.commentary?.find(c => {
              const cTime = c.time?.displayValue || '';
              if (cTime !== time) return false;
              
              const text = c.text || '';
              const lowerText = text.toLowerCase();
              if (!lowerText.includes('goal')) return false;
              
              const parts = player.split(/[\s\.\-]+/).filter(p => p.length > 2);
              if (parts.length === 0) {
                return lowerText.includes(player.toLowerCase());
              }
              return parts.some(p => lowerText.includes(p.toLowerCase()));
            });
            
            let assist = null;
            if (comment) {
              const text = comment.text || '';
              const match = text.match(/Assisted by ([^\.]+)/i);
              if (match) {
                assist = match[1].trim();
                const cleanMatch = assist.split(/\s+(?:with|following|after)\s+/i)[0];
                assist = cleanMatch;
              }
            }
            
            if (assist) {
              eventAssists[`${time}|${player}`] = assist;
            }
          });
      }
      
      cache[id] = eventAssists;
      cacheChanged = true;
    });
    
    if (cacheChanged) {
      saveAssistsCache(cache);
    }
    
    const mappedMatches = data.events.map(event => {
      const comp = event.competitions[0];
      const home = comp.competitors.find(c => c.homeAway === 'home');
      const away = comp.competitors.find(c => c.homeAway === 'away');
      
      let status = 'SCHEDULED';
      if (comp.status.type.state === 'in') status = 'IN_PLAY';
      if (comp.status.type.state === 'post') status = 'FINISHED';

      // ESPN displayClock is usually something like "75'" or "HT"
      let minute = comp.status.displayClock;
      const statusId = String(comp.status.type.id);
      const statusName = comp.status.type.name;
      const statusDetail = comp.status.type.detail || '';
      
      if (statusId === '23' || statusName === 'STATUS_HALFTIME' || statusDetail.toLowerCase().includes('half')) {
        minute = 'HT';
      }

      // Extract scorers
      let scorers = [];
      if (comp.details) {
        scorers = comp.details
          .filter(detail => {
            const typeText = detail.type?.text?.toLowerCase() || '';
            const isPenaltySaved = typeText.includes('penalty - saved') || typeText.includes('penalty saved') || typeText.includes('penalty - missed') || typeText.includes('penalty missed');
            return (detail.scoringPlay || isPenaltySaved) && detail.athletesInvolved && detail.athletesInvolved.length > 0;
          })
          .map(detail => {
            const player = detail.athletesInvolved[0].shortName || detail.athletesInvolved[0].displayName;
            const time = detail.clock?.displayValue || '';
            const isHome = String(detail.team?.id) === String(home?.id);
            const typeText = detail.type?.text?.toLowerCase() || '';
            
            let type = 'goal';
            if (detail.ownGoal || typeText.includes('own goal')) {
              type = 'own_goal';
            } else if (typeText.includes('penalty - saved') || typeText.includes('penalty saved') || typeText.includes('penalty - missed') || typeText.includes('penalty missed')) {
              type = 'penalty_saved';
            } else if (detail.penaltyKick || typeText.includes('penalty - scored') || typeText.includes('penalty kick')) {
              type = 'penalty';
            }

            const eventAssists = cache[event.id] || {};
            const assist = eventAssists[`${time}|${player}`] || null;

            return { player, time, isHome, type, assist };
          });
      }

      const apiHomeScore = parseInt(home?.score || 0, 10);
      const apiAwayScore = parseInt(away?.score || 0, 10);

      // Compute scores from scorers list to prevent UI sync lag
      // Since ESPN API associates the goal event with the team that benefits from it,
      // we simply count any scoring play for the home team as a home goal, and any scoring play for the away team as an away goal.
      const homeComputed = scorers.filter(s => s.isHome && s.type !== 'penalty_saved').length;
      const awayComputed = scorers.filter(s => !s.isHome && s.type !== 'penalty_saved').length;

      const homeScore = Math.max(apiHomeScore, homeComputed);
      const awayScore = Math.max(apiAwayScore, awayComputed);

      return {
        homeTeam: { tla: home?.team?.abbreviation },
        awayTeam: { tla: away?.team?.abbreviation },
        status: status,
        minute: minute,
        score: {
          fullTime: { 
            home: homeScore, 
            away: awayScore 
          }
        },
        scorers: scorers
      };
    });

    return { matches: mappedMatches };
  } catch (err) {
    console.warn('ESPN API fetch failed:', err);
    return { matches: [] };
  }
};

const fetchApi = async (endpoint) => {
  if (!API_KEY) {
    // No API key — use ESPN's free public API for all match data
    return await fetchEspnMatches();
  }

  try {
    checkRateLimit();
    const response = await fetch(`${API_BASE}${endpoint}`, { headers });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`API fetch failed for ${endpoint}:`, error.message);
    return null;
  }
};

// Get World Cup competition info
export const getCompetition = () => fetchApi('/competitions/WC');

// Get World Cup matches
export const getMatches = (status) => {
  const params = status ? `?status=${status}` : '';
  return fetchApi(`/competitions/WC/matches${params}`);
};

// Get World Cup standings
export const getStandings = () => fetchApi('/competitions/WC/standings');

// Get matches by matchday
export const getMatchday = (matchday) => {
  return fetchApi(`/competitions/WC/matches?matchday=${matchday}`);
};

// Get live matches
export const getLiveMatchesApi = () => getMatches('LIVE');

// Get all matches from ESPN (used for score sync on page load)
export const getAllMatchesEspn = () => fetchEspnMatches();

// Get scheduled matches
export const getScheduledMatches = () => getMatches('SCHEDULED');

// Get finished matches
export const getFinishedMatches = () => getMatches('FINISHED');

export default {
  getCompetition,
  getMatches,
  getStandings,
  getMatchday,
  getLiveMatchesApi,
  getScheduledMatches,
  getFinishedMatches,
};
