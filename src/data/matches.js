// FIFA World Cup 2026 — Match Schedule
// All times in Bangladesh Standard Time (BST, GMT+6, 24-hour clock)
// Dates: June 11 – July 19, 2026
// Source: Official FIFA schedule
// Status: SCHEDULED, LIVE, FINISHED

// Note: Bangladesh time = GMT + 6 hours

const groupMatches = [
  // ══════════════════════════════════════════
  // MATCHDAY 1 — June 11–17 (BST June 12-18)
  // ══════════════════════════════════════════

  // June 11 (BST June 12)
  { id: 1, date: '2026-06-12T01:00:00+06:00', home: 'MEX', away: 'RSA', group: 'A', venue: 'azteca', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 2, date: '2026-06-12T08:00:00+06:00', home: 'KOR', away: 'CZE', group: 'A', venue: 'akron', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },

  // June 12 (BST June 13)
  { id: 3, date: '2026-06-13T01:00:00+06:00', home: 'CAN', away: 'BIH', group: 'B', venue: 'bmo', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 4, date: '2026-06-13T07:00:00+06:00', home: 'USA', away: 'PAR', group: 'D', venue: 'sofi', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },

  // June 13 (BST June 14)
  { id: 5, date: '2026-06-14T07:00:00+06:00', home: 'HAI', away: 'SCO', group: 'C', venue: 'gillette', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
  { id: 6, date: '2026-06-14T10:00:00+06:00', home: 'AUS', away: 'TUR', group: 'D', venue: 'bcplace', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '10:00' },
  { id: 7, date: '2026-06-14T04:00:00+06:00', home: 'BRA', away: 'MAR', group: 'C', venue: 'metlife', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '04:00' },
  { id: 8, date: '2026-06-14T08:00:00+06:00', home: 'QAT', away: 'SUI', group: 'B', venue: 'levis', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },

  // June 14 (BST June 14-15)
  { id: 9, date: '2026-06-15T05:00:00+06:00', home: 'CIV', away: 'ECU', group: 'E', venue: 'lincoln', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 10, date: '2026-06-14T23:00:00+06:00', home: 'GER', away: 'CUW', group: 'E', venue: 'nrg', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 11, date: '2026-06-15T02:00:00+06:00', home: 'NED', away: 'JPN', group: 'F', venue: 'att', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 12, date: '2026-06-15T08:00:00+06:00', home: 'SWE', away: 'TUN', group: 'F', venue: 'bbva', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },

  // June 15 (BST June 15-16)
  { id: 13, date: '2026-06-16T07:00:00+06:00', home: 'IRN', away: 'NZL', group: 'G', venue: 'sofi', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
  { id: 14, date: '2026-06-15T22:00:00+06:00', home: 'ESP', away: 'CPV', group: 'H', venue: 'mercedes', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '22:00' },
  { id: 15, date: '2026-06-16T01:00:00+06:00', home: 'BEL', away: 'EGY', group: 'G', venue: 'lumen', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 16, date: '2026-06-16T04:00:00+06:00', home: 'KSA', away: 'URU', group: 'H', venue: 'hardrock', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '04:00' },

  // June 16 (BST June 17)
  { id: 17, date: '2026-06-17T01:00:00+06:00', home: 'FRA', away: 'SEN', group: 'I', venue: 'metlife', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 18, date: '2026-06-17T04:00:00+06:00', home: 'IRQ', away: 'NOR', group: 'I', venue: 'gillette', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '04:00' },
  { id: 19, date: '2026-06-17T07:00:00+06:00', home: 'ARG', away: 'ALG', group: 'J', venue: 'arrowhead', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
  { id: 20, date: '2026-06-17T10:00:00+06:00', home: 'AUT', away: 'JOR', group: 'J', venue: 'levis', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '10:00' },

  // June 17 (BST June 17-18)
  { id: 21, date: '2026-06-18T05:00:00+06:00', home: 'GHA', away: 'PAN', group: 'L', venue: 'bmo', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 22, date: '2026-06-18T02:00:00+06:00', home: 'ENG', away: 'CRO', group: 'L', venue: 'att', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 23, date: '2026-06-17T23:00:00+06:00', home: 'POR', away: 'COD', group: 'K', venue: 'nrg', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 24, date: '2026-06-18T08:00:00+06:00', home: 'UZB', away: 'COL', group: 'K', venue: 'azteca', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },

  // ══════════════════════════════════════════
  // MATCHDAY 2 — June 18–23 (BST June 18-24)
  // ══════════════════════════════════════════

  // June 18 (BST June 18-19)
  { id: 25, date: '2026-06-18T22:00:00+06:00', home: 'CZE', away: 'RSA', group: 'A', venue: 'mercedes', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '22:00' },
  { id: 26, date: '2026-06-19T01:00:00+06:00', home: 'SUI', away: 'BIH', group: 'B', venue: 'sofi', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 27, date: '2026-06-19T04:00:00+06:00', home: 'CAN', away: 'QAT', group: 'B', venue: 'bcplace', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '04:00' },
  { id: 28, date: '2026-06-19T07:00:00+06:00', home: 'MEX', away: 'KOR', group: 'A', venue: 'akron', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },

  // June 19 (BST June 20)
  { id: 29, date: '2026-06-30T07:00:00+06:00', home: 'BRA', away: 'HAI', group: 'C', venue: 'lincoln', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
  { id: 30, date: '2026-06-20T04:00:00+06:00', home: 'SCO', away: 'MAR', group: 'C', venue: 'gillette', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '04:00' },
  { id: 31, date: '2026-06-20T10:00:00+06:00', home: 'TUR', away: 'PAR', group: 'D', venue: 'levis', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '10:00' },
  { id: 32, date: '2026-06-20T01:00:00+06:00', home: 'USA', away: 'AUS', group: 'D', venue: 'lumen', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },

  // June 20 (BST June 20-21)
  { id: 33, date: '2026-06-21T02:00:00+06:00', home: 'GER', away: 'CIV', group: 'E', venue: 'bmo', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 34, date: '2026-06-21T09:00:00+06:00', home: 'ECU', away: 'CUW', group: 'E', venue: 'arrowhead', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '09:00' },
  { id: 35, date: '2026-06-20T23:00:00+06:00', home: 'NED', away: 'SWE', group: 'F', venue: 'nrg', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 36, date: '2026-06-21T10:00:00+06:00', home: 'TUN', away: 'JPN', group: 'F', venue: 'bbva', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '10:00' },

  // June 21 (BST June 21-22)
  { id: 37, date: '2026-06-22T04:00:00+06:00', home: 'URU', away: 'CPV', group: 'H', venue: 'hardrock', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '04:00' },
  { id: 38, date: '2026-06-21T22:00:00+06:00', home: 'ESP', away: 'KSA', group: 'H', venue: 'mercedes', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '22:00' },
  { id: 39, date: '2026-06-22T01:00:00+06:00', home: 'BEL', away: 'IRN', group: 'G', venue: 'sofi', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 40, date: '2026-06-22T07:00:00+06:00', home: 'NZL', away: 'EGY', group: 'G', venue: 'bcplace', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },

  // June 22 (BST June 22-23)
  { id: 41, date: '2026-06-23T06:00:00+06:00', home: 'NOR', away: 'SEN', group: 'I', venue: 'metlife', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '06:00' },
  { id: 42, date: '2026-06-23T03:00:00+06:00', home: 'FRA', away: 'IRQ', group: 'I', venue: 'lincoln', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 43, date: '2026-06-22T23:00:00+06:00', home: 'ARG', away: 'AUT', group: 'J', venue: 'att', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 44, date: '2026-06-23T09:00:00+06:00', home: 'JOR', away: 'ALG', group: 'J', venue: 'levis', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '09:00' },

  // June 23 (BST June 23-24)
  { id: 45, date: '2026-06-24T02:00:00+06:00', home: 'ENG', away: 'GHA', group: 'L', venue: 'gillette', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 46, date: '2026-06-24T05:00:00+06:00', home: 'PAN', away: 'CRO', group: 'L', venue: 'bmo', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 47, date: '2026-06-23T23:00:00+06:00', home: 'POR', away: 'UZB', group: 'K', venue: 'nrg', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 48, date: '2026-06-24T08:00:00+06:00', home: 'COL', away: 'COD', group: 'K', venue: 'akron', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },

  // ══════════════════════════════════════════
  // MATCHDAY 3 — June 24–27 (BST June 25-28)
  // ══════════════════════════════════════════

  // June 24 (BST June 25)
  { id: 49, date: '2026-06-25T03:00:00+06:00', home: 'SCO', away: 'BRA', group: 'C', venue: 'hardrock', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 50, date: '2026-06-25T03:00:00+06:00', home: 'MAR', away: 'HAI', group: 'C', venue: 'mercedes', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 51, date: '2026-06-25T03:00:00+06:00', home: 'SUI', away: 'CAN', group: 'B', venue: 'bcplace', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 52, date: '2026-06-25T03:00:00+06:00', home: 'BIH', away: 'QAT', group: 'B', venue: 'lumen', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 53, date: '2026-06-25T09:00:00+06:00', home: 'CZE', away: 'MEX', group: 'A', venue: 'azteca', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '09:00' },
  { id: 54, date: '2026-06-25T09:00:00+06:00', home: 'RSA', away: 'KOR', group: 'A', venue: 'bbva', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '09:00' },

  // June 25 (BST June 25-26)
  { id: 55, date: '2026-06-25T23:00:00+06:00', home: 'CUW', away: 'CIV', group: 'E', venue: 'lincoln', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 56, date: '2026-06-25T23:00:00+06:00', home: 'ECU', away: 'GER', group: 'E', venue: 'metlife', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 57, date: '2026-06-26T03:00:00+06:00', home: 'JPN', away: 'SWE', group: 'F', venue: 'att', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 58, date: '2026-06-26T03:00:00+06:00', home: 'TUN', away: 'NED', group: 'F', venue: 'arrowhead', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 59, date: '2026-06-26T08:00:00+06:00', home: 'TUR', away: 'USA', group: 'D', venue: 'sofi', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },
  { id: 60, date: '2026-06-26T08:00:00+06:00', home: 'PAR', away: 'AUS', group: 'D', venue: 'levis', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },

  // June 26 (BST June 27)
  { id: 61, date: '2026-06-27T01:00:00+06:00', home: 'NOR', away: 'FRA', group: 'I', venue: 'gillette', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 62, date: '2026-06-27T01:00:00+06:00', home: 'SEN', away: 'IRQ', group: 'I', venue: 'bmo', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 63, date: '2026-06-27T09:00:00+06:00', home: 'EGY', away: 'IRN', group: 'G', venue: 'lumen', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '09:00' },
  { id: 64, date: '2026-06-27T09:00:00+06:00', home: 'NZL', away: 'BEL', group: 'G', venue: 'bcplace', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '09:00' },
  { id: 65, date: '2026-06-27T06:00:00+06:00', home: 'CPV', away: 'KSA', group: 'H', venue: 'nrg', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '06:00' },
  { id: 66, date: '2026-06-27T06:00:00+06:00', home: 'URU', away: 'ESP', group: 'H', venue: 'akron', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '06:00' },

  // June 27 (BST June 28)
  { id: 67, date: '2026-06-28T01:00:00+06:00', home: 'PAN', away: 'ENG', group: 'L', venue: 'metlife', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 68, date: '2026-06-28T01:00:00+06:00', home: 'CRO', away: 'GHA', group: 'L', venue: 'lincoln', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 69, date: '2026-06-28T08:00:00+06:00', home: 'ALG', away: 'AUT', group: 'J', venue: 'arrowhead', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },
  { id: 70, date: '2026-06-28T08:00:00+06:00', home: 'JOR', away: 'ARG', group: 'J', venue: 'att', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },
  { id: 71, date: '2026-06-28T07:00:00+06:00', home: 'COL', away: 'POR', group: 'K', venue: 'hardrock', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
  { id: 72, date: '2026-06-28T07:00:00+06:00', home: 'COD', away: 'UZB', group: 'K', venue: 'mercedes', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
];

// ══════════════════════════════════════════
// KNOCKOUT STAGE
// ══════════════════════════════════════════
const knockoutMatches = [
  // Round of 32 — June 28 – July 3 (BST June 29 – July 4)
  { id: 73, date: '2026-06-29T03:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 1, venue: 'sofi', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 74, date: '2026-06-30T03:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 2, venue: 'gillette', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 75, date: '2026-06-30T03:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 3, venue: 'bbva', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 76, date: '2026-06-30T03:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 4, venue: 'nrg', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 77, date: '2026-07-01T03:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 5, venue: 'metlife', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 78, date: '2026-07-01T03:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 6, venue: 'att', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 79, date: '2026-07-02T03:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 7, venue: 'azteca', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 80, date: '2026-07-02T03:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 8, venue: 'mercedes', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 81, date: '2026-07-03T03:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 9, venue: 'levis', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 82, date: '2026-07-03T03:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 10, venue: 'lumen', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 83, date: '2026-07-04T03:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 11, venue: 'bmo', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 84, date: '2026-07-03T03:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 12, venue: 'sofi', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 85, date: '2026-07-04T03:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 13, venue: 'bcplace', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 86, date: '2026-07-04T03:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 14, venue: 'hardrock', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 87, date: '2026-07-04T03:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 15, venue: 'arrowhead', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 88, date: '2026-07-04T03:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 16, venue: 'att', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },

  // Round of 16 — July 4–7 (BST July 5-8)
  { id: 89, date: '2026-07-05T03:00:00+06:00', home: null, away: null, round: 'R16', matchNumber: 1, venue: 'lincoln', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 90, date: '2026-07-05T03:00:00+06:00', home: null, away: null, round: 'R16', matchNumber: 2, venue: 'nrg', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 91, date: '2026-07-06T03:00:00+06:00', home: null, away: null, round: 'R16', matchNumber: 3, venue: 'metlife', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 92, date: '2026-07-06T03:00:00+06:00', home: null, away: null, round: 'R16', matchNumber: 4, venue: 'azteca', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 93, date: '2026-07-07T03:00:00+06:00', home: null, away: null, round: 'R16', matchNumber: 5, venue: 'att', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 94, date: '2026-07-07T03:00:00+06:00', home: null, away: null, round: 'R16', matchNumber: 6, venue: 'lumen', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 95, date: '2026-07-08T03:00:00+06:00', home: null, away: null, round: 'R16', matchNumber: 7, venue: 'mercedes', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 96, date: '2026-07-08T03:00:00+06:00', home: null, away: null, round: 'R16', matchNumber: 8, venue: 'bcplace', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },

  // Quarter-Finals — July 9–11 (BST July 10-12)
  { id: 97, date: '2026-07-10T03:00:00+06:00', home: null, away: null, round: 'QF', matchNumber: 1, venue: 'gillette', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 98, date: '2026-07-11T03:00:00+06:00', home: null, away: null, round: 'QF', matchNumber: 2, venue: 'sofi', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 99, date: '2026-07-12T03:00:00+06:00', home: null, away: null, round: 'QF', matchNumber: 3, venue: 'hardrock', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 100, date: '2026-07-12T03:00:00+06:00', home: null, away: null, round: 'QF', matchNumber: 4, venue: 'arrowhead', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },

  // Semi-Finals — July 14–15 (BST July 15-16)
  { id: 101, date: '2026-07-15T05:00:00+06:00', home: null, away: null, round: 'SF', matchNumber: 1, venue: 'att', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 102, date: '2026-07-16T05:00:00+06:00', home: null, away: null, round: 'SF', matchNumber: 2, venue: 'mercedes', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },

  // Third-Place Match — July 18 (BST July 19)
  { id: 103, date: '2026-07-19T01:00:00+06:00', home: null, away: null, round: '3RD', matchNumber: 1, venue: 'hardrock', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },

  // FINAL — July 19 (BST July 20)
  { id: 104, date: '2026-07-20T05:00:00+06:00', home: null, away: null, round: 'FINAL', matchNumber: 1, venue: 'metlife', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
];

export const allMatches = [...groupMatches, ...knockoutMatches];

export const getMatchesByDate = (dateStr) => {
  return allMatches.filter(m => m.date.startsWith(dateStr));
};

export const getMatchesByGroup = (group) => {
  return groupMatches.filter(m => m.group === group);
};

export const getMatchesByRound = (round) => {
  return knockoutMatches.filter(m => m.round === round);
};

export const getLiveMatches = () => {
  return allMatches.filter(m => m.status === 'LIVE');
};

export const getUpcomingMatches = (limit = 6) => {
  const now = new Date();
  return allMatches
    .filter(m => new Date(m.date) > now && m.status === 'SCHEDULED')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, limit);
};

export const getTodayMatches = () => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const todayStr = formatter.format(now);
  return allMatches.filter(m => {
    const matchDate = new Date(m.date);
    const matchStr = formatter.format(matchDate);
    return matchStr === todayStr;
  });
};

export const getUniqueMatchDates = () => {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const dates = [...new Set(groupMatches.map(m => {
    const d = new Date(m.date);
    return formatter.format(d);
  }))];
  return dates.sort();
};

export const roundLabels = {
  R32: 'Round of 32',
  R16: 'Round of 16',
  QF: 'Quarter-Finals',
  SF: 'Semi-Finals',
  '3RD': 'Third Place',
  FINAL: 'Final',
};

// Format time for display in user's local timezone (24h)
export const formatMatchTime = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

// Format date for display in user's local timezone
export const formatMatchDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export { groupMatches, knockoutMatches };
