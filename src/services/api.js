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

            let assist = detail.athletesInvolved[1]
              ? (detail.athletesInvolved[1].shortName || detail.athletesInvolved[1].displayName)
              : null;

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
