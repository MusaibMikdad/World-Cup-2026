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

// Fetch scores from the public ESPN Soccer API (all match states)
const fetchEspnMatches = async () => {
  try {
    // Fetch all tournament matches to ensure we get historical/finished scores
    const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719');
    if (!response.ok) return { matches: [] };
    const data = await response.json();
    
    const mappedMatches = data.events.map(event => {
      const comp = event.competitions[0];
      const home = comp.competitors.find(c => c.homeAway === 'home');
      const away = comp.competitors.find(c => c.homeAway === 'away');
      
      let status = 'SCHEDULED';
      if (comp.status.type.state === 'in') status = 'IN_PLAY';
      if (comp.status.type.state === 'post') status = 'FINISHED';

      // ESPN displayClock is usually something like "75'" or "HT"
      let minute = comp.status.displayClock;

      return {
        homeTeam: { tla: home?.team?.abbreviation },
        awayTeam: { tla: away?.team?.abbreviation },
        status: status,
        minute: minute,
        score: {
          fullTime: { 
            home: parseInt(home?.score || 0, 10), 
            away: parseInt(away?.score || 0, 10) 
          }
        }
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
