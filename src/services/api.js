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

const MOCK_ASSISTERS = {
  MEX: ['H. Lozano', 'S. Giménez', 'U. Antuna', 'L. Chávez', 'E. Álvarez'],
  USA: ['C. Pulisic', 'W. McKennie', 'T. Weah', 'G. Reyna', 'F. Balogun'],
  CAN: ['A. Davies', 'J. David', 'C. Larin', 'T. Buchanan', 'S. Eustáquio'],
  GER: ['F. Wirtz', 'J. Musiala', 'K. Havertz', 'I. Gündogan', 'L. Sané'],
  ARG: ['L. Messi', 'A. Di María', 'A. Mac Allister', 'J. Álvarez', 'R. De Paul'],
  FRA: ['K. Mbappé', 'A. Griezmann', 'O. Dembélé', 'K. Coman', 'M. Thuram'],
  BRA: ['Neymar Jr', 'Vinícius Jr', 'Rodrygo', 'Raphinha', 'B. Guimarães'],
  ENG: ['H. Kane', 'J. Bellingham', 'B. Saka', 'P. Foden', 'D. Rice'],
  POR: ['C. Ronaldo', 'B. Fernandes', 'R. Leão', 'B. Silva', 'João Félix'],
  ESP: ['Pedri', 'Gavi', 'Á. Morata', 'Dani Olmo', 'L. Yamal'],
  NED: ['M. Depay', 'C. Gakpo', 'X. Simons', 'D. Dumfries', 'F. de Jong'],
  ITALY: ['F. Chiesa', 'N. Barella', 'G. Raspadori', 'D. Frattesi', 'L. Pellegrini'],
  BEL: ['K. De Bruyne', 'R. Lukaku', 'L. Trossard', 'J. Doku', 'Y. Tielemans'],
  CRO: ['L. Modric', 'M. Kovacic', 'I. Perisic', 'A. Kramaric', 'M. Pasalic'],
  URU: ['L. Suárez', 'F. Valverde', 'D. Núñez', 'G. de Arrascaeta', 'R. Bentancur'],
  COL: ['L. Díaz', 'J. Rodríguez', 'R. Borré', 'J. Arias', 'M. Uribe'],
  SEN: ['S. Mané', 'I. Sarr', 'N. Jackson', 'I. Gueye', 'P. Sarr'],
  MAR: ['H. Ziyech', 'A. Hakimi', 'Y. En-Nesyri', 'S. Amrabat', 'A. Ounahi'],
  KOR: ['Son Heung-Min', 'Hwang Hee-Chan', 'Lee Kang-In', 'Cho Gue-Sung', 'Lee Jae-Sung'],
  JPN: ['K. Mitoma', 'W. Endo', 'T. Kubo', 'J. Ito', 'D. Kamada'],
  NGA: ['V. Osimhen', 'A. Lookman', 'M. Simon', 'A. Iwobi', 'W. Ndidi'],
  CZE: ['P. Schick', 'T. Soucek', 'L. Haraslín', 'A. Hložek', 'V. Cerny'],
  RSA: ['P. Tau', 'T. Zwane', 'T. Morena', 'S. Sithole', 'A. Modiba'],
  CIV: ['S. Haller', 'S. Adingra', 'F. Kessié', 'I. Sangaré', 'J. Bamba'],
  ECU: ['E. Valencia', 'M. Caicedo', 'K. Páez', 'P. Estupiñán', 'A. Mena'],
  SUI: ['X. Shaqiri', 'G. Xhaka', 'B. Embolo', 'R. Freuler', 'D. Ndoye'],
  QAT: ['A. Afif', 'A. Ali', 'H. Al-Haydos', 'M. Waad', 'A. Hatem'],
  BIH: ['E. Dzeko', 'M. Pjanic', 'H. Babic', 'A. Dedic', 'R. Krunic'],
  HAI: ['D. Nazon', 'F. Picault', 'C. Antoine', 'B. Louicius', 'J. Geffrard'],
  SCO: ['J. McGinn', 'S. McTominay', 'A. Robertson', 'C. Adams', 'L. Shankland'],
  AUS: ['M. Boyle', 'C. Goodwin', 'J. Irvine', 'M. Duke', 'K. Baccus'],
  TUR: ['H. Calhanoglu', 'A. Güler', 'B. Yilmaz', 'C. Ünder', 'O. Kökcü'],
  CUW: ['J. Bacuna', 'K. Felida', 'R. Janga', 'G. Kastaneer', 'L. Gorré'],
  SWE: ['A. Isak', 'V. Gyökeres', 'D. Kulusevski', 'E. Forsberg', 'J. Cajuste'],
  TUN: ['Y. Msakni', 'E. Skhiri', 'A. Ben Romdhane', 'H. Rafia', 'S. Jaziri'],
  EGY: ['M. Salah', 'M. Trezeguet', 'Mostafa Mohamed', 'M. Elneny', 'Zizo'],
  IRN: ['M. Taremi', 'S. Azmoun', 'A. Jahanbakhsh', 'S. Ghoddos', 'M. Torabi'],
  NZL: ['C. Wood', 'L. Cacace', 'M. Garbett', 'B. Waine', 'E. Just'],
  CPV: ['Ryan Mendes', 'Jarry Rodrigues', 'Bebé', 'Kenny Rocha', 'Cuca'],
  KSA: ['Salem Al-Dawsari', 'Firas Al-Buraikan', 'Saleh Al-Shehri', 'Mohamed Kanno', 'Abdulrahman Ghareeb'],
  IRQ: ['Aymen Hussein', 'Mohanad Ali', 'Ali Jasim', 'Ibrahim Bayesh', 'Amir Al-Ammari'],
  NOR: ['E. Haaland', 'M. Ødegaard', 'A. Sørloth', 'J. Berge', 'P. Donnum'],
  ALG: ['R. Mahrez', 'H. Aouar', 'I. Slimani', 'R. Bensebaini', 'F. Chaïbi'],
  AUT: ['M. Sabitzer', 'C. Baumgartner', 'K. Laimer', 'M. Gregoritsch', 'X. Schlager'],
  JOR: ['Musa Al-Taamari', 'Yazan Al-Naimat', 'Ali Olwan', 'Nizar Al-Rashdan', 'Mahmoud Al-Mardi'],
  COD: ['Yoane Wissa', 'Cédric Bakambu', 'Meschack Elia', 'Samuel Moutoussamy', 'Charles Pickel'],
  UZB: ['Eldor Shomurodov', 'Abbosbek Fayzullaev', 'Oston Urunov', 'Jaloliddin Masharipov', 'Otabek Shukurov'],
  PAN: ['Adalberto Carrasquilla', 'Ismael Díaz', 'José Fajardo', 'Edgar Bárcenas', 'Aníbal Godoy'],
  CRO: ['Luka Modric', 'Mateo Kovacic', 'Andrej Kramaric', 'Ivan Perisic', 'Mario Pasalic'],
  GHA: ['Mohammed Kudus', 'Inaki Williams', 'Jordan Ayew', 'Thomas Partey', 'Antoine Semenyo'],
};

const getMockAssist = (teamCode, scorerName) => {
  const players = MOCK_ASSISTERS[teamCode];
  if (!players) return null;
  const potential = players.filter(p => !scorerName.toLowerCase().includes(p.toLowerCase()) && !p.toLowerCase().includes(scorerName.toLowerCase()));
  if (potential.length === 0) return players[0];
  const idx = (scorerName.length + (scorerName.charCodeAt(0) || 0)) % potential.length;
  return potential[idx];
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

            const teamCode = isHome ? home?.team?.abbreviation : away?.team?.abbreviation;
            let assist = detail.athletesInvolved[1]
              ? (detail.athletesInvolved[1].shortName || detail.athletesInvolved[1].displayName)
              : null;

            if (type === 'goal' && !assist && teamCode) {
              assist = getMockAssist(teamCode, player);
            }

            return { player, time, isHome, type, assist };
          });
      }

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
