// FIFA World Cup 2026 — Match Schedule
// All times in Bangladesh Standard Time (BST, GMT+6, 24-hour clock)
// Dates: June 11 – July 19, 2026
// Source: Official FIFA schedule
// Status: SCHEDULED, LIVE, FINISHED

// Note: Bangladesh time = ET + 10 hours
// e.g. 3:00 PM ET = 01:00 BST (next day)

const groupMatches = [
  // ══════════════════════════════════════════
  // MATCHDAY 1 — June 11–17
  // ══════════════════════════════════════════

  // June 11 (Opening Day)
  { id: 1, date: '2026-06-12T01:00:00+06:00', home: 'MEX', away: 'RSA', group: 'A', venue: 'azteca', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  // June 11 ET → June 12 BST

  // June 12 (BST: early morning June 12 & June 13)
  { id: 2, date: '2026-06-12T08:00:00+06:00', home: 'KOR', away: 'CZE', group: 'A', venue: 'akron', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },
  { id: 3, date: '2026-06-13T01:00:00+06:00', home: 'CAN', away: 'BIH', group: 'B', venue: 'bmo', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 4, date: '2026-06-13T07:00:00+06:00', home: 'USA', away: 'PAR', group: 'D', venue: 'sofi', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },

  // June 13
  { id: 5, date: '2026-06-14T01:00:00+06:00', home: 'QAT', away: 'SUI', group: 'B', venue: 'levis', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 6, date: '2026-06-14T04:00:00+06:00', home: 'BRA', away: 'MAR', group: 'C', venue: 'metlife', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '04:00' },
  { id: 7, date: '2026-06-14T07:00:00+06:00', home: 'HAI', away: 'SCO', group: 'C', venue: 'gillette', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
  { id: 8, date: '2026-06-14T10:00:00+06:00', home: 'AUS', away: 'TUR', group: 'D', venue: 'bcplace', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '10:00' },

  // June 14
  { id: 9, date: '2026-06-14T23:00:00+06:00', home: 'GER', away: 'CUW', group: 'E', venue: 'att', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 10, date: '2026-06-15T02:00:00+06:00', home: 'NED', away: 'SWE', group: 'F', venue: 'nrg', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 11, date: '2026-06-15T05:00:00+06:00', home: 'CIV', away: 'ECU', group: 'E', venue: 'bbva', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 12, date: '2026-06-15T08:00:00+06:00', home: 'JPN', away: 'TUN', group: 'F', venue: 'arrowhead', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },

  // June 15
  { id: 13, date: '2026-06-15T23:00:00+06:00', home: 'BEL', away: 'NZL', group: 'G', venue: 'lumen', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 14, date: '2026-06-16T02:00:00+06:00', home: 'ESP', away: 'URU', group: 'H', venue: 'hardrock', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 15, date: '2026-06-16T05:00:00+06:00', home: 'EGY', away: 'IRN', group: 'G', venue: 'lincoln', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 16, date: '2026-06-16T08:00:00+06:00', home: 'CPV', away: 'KSA', group: 'H', venue: 'akron', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },

  // June 16
  { id: 17, date: '2026-06-16T23:00:00+06:00', home: 'FRA', away: 'IRQ', group: 'I', venue: 'metlife', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 18, date: '2026-06-17T02:00:00+06:00', home: 'ARG', away: 'JOR', group: 'J', venue: 'hardrock', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 19, date: '2026-06-17T05:00:00+06:00', home: 'SEN', away: 'NOR', group: 'I', venue: 'att', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 20, date: '2026-06-17T08:00:00+06:00', home: 'ALG', away: 'AUT', group: 'J', venue: 'lumen', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },

  // June 17
  { id: 21, date: '2026-06-17T23:00:00+06:00', home: 'POR', away: 'COD', group: 'K', venue: 'sofi', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 22, date: '2026-06-18T02:00:00+06:00', home: 'ENG', away: 'PAN', group: 'L', venue: 'mercedes', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 23, date: '2026-06-18T05:00:00+06:00', home: 'COL', away: 'UZB', group: 'K', venue: 'gillette', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 24, date: '2026-06-18T08:00:00+06:00', home: 'CRO', away: 'GHA', group: 'L', venue: 'lincoln', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },

  // ══════════════════════════════════════════
  // MATCHDAY 2 — June 18–23
  // ══════════════════════════════════════════

  // June 18
  { id: 25, date: '2026-06-18T23:00:00+06:00', home: 'RSA', away: 'KOR', group: 'A', venue: 'nrg', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 26, date: '2026-06-19T02:00:00+06:00', home: 'MEX', away: 'CZE', group: 'A', venue: 'azteca', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 27, date: '2026-06-19T05:00:00+06:00', home: 'BIH', away: 'QAT', group: 'B', venue: 'bmo', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 28, date: '2026-06-19T08:00:00+06:00', home: 'CAN', away: 'SUI', group: 'B', venue: 'bcplace', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },

  // June 19
  { id: 29, date: '2026-06-19T23:00:00+06:00', home: 'SCO', away: 'MAR', group: 'C', venue: 'levis', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 30, date: '2026-06-20T02:00:00+06:00', home: 'BRA', away: 'HAI', group: 'C', venue: 'att', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 31, date: '2026-06-20T05:00:00+06:00', home: 'TUR', away: 'PAR', group: 'D', venue: 'gillette', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 32, date: '2026-06-20T08:00:00+06:00', home: 'USA', away: 'AUS', group: 'D', venue: 'sofi', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },

  // June 20
  { id: 33, date: '2026-06-20T23:00:00+06:00', home: 'ECU', away: 'CUW', group: 'E', venue: 'bbva', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 34, date: '2026-06-21T02:00:00+06:00', home: 'GER', away: 'CIV', group: 'E', venue: 'arrowhead', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 35, date: '2026-06-21T05:00:00+06:00', home: 'SWE', away: 'JPN', group: 'F', venue: 'nrg', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 36, date: '2026-06-21T08:00:00+06:00', home: 'NED', away: 'TUN', group: 'F', venue: 'hardrock', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },

  // June 21
  { id: 37, date: '2026-06-21T23:00:00+06:00', home: 'NZL', away: 'EGY', group: 'G', venue: 'mercedes', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 38, date: '2026-06-22T02:00:00+06:00', home: 'BEL', away: 'IRN', group: 'G', venue: 'lincoln', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 39, date: '2026-06-22T05:00:00+06:00', home: 'URU', away: 'CPV', group: 'H', venue: 'akron', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 40, date: '2026-06-22T08:00:00+06:00', home: 'ESP', away: 'KSA', group: 'H', venue: 'att', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },

  // June 22
  { id: 41, date: '2026-06-22T23:00:00+06:00', home: 'IRQ', away: 'SEN', group: 'I', venue: 'nrg', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 42, date: '2026-06-23T02:00:00+06:00', home: 'FRA', away: 'NOR', group: 'I', venue: 'metlife', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 43, date: '2026-06-23T05:00:00+06:00', home: 'JOR', away: 'ALG', group: 'J', venue: 'mercedes', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 44, date: '2026-06-23T08:00:00+06:00', home: 'ARG', away: 'AUT', group: 'J', venue: 'hardrock', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },

  // June 23
  { id: 45, date: '2026-06-23T23:00:00+06:00', home: 'COD', away: 'COL', group: 'K', venue: 'lumen', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 46, date: '2026-06-24T02:00:00+06:00', home: 'POR', away: 'UZB', group: 'K', venue: 'sofi', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 47, date: '2026-06-24T05:00:00+06:00', home: 'PAN', away: 'CRO', group: 'L', venue: 'bbva', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 48, date: '2026-06-24T08:00:00+06:00', home: 'ENG', away: 'GHA', group: 'L', venue: 'gillette', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },

  // ══════════════════════════════════════════
  // MATCHDAY 3 — June 24–27
  // ══════════════════════════════════════════

  // June 24
  { id: 49, date: '2026-06-25T02:00:00+06:00', home: 'CZE', away: 'RSA', group: 'A', venue: 'nrg', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 50, date: '2026-06-25T02:00:00+06:00', home: 'KOR', away: 'MEX', group: 'A', venue: 'azteca', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 51, date: '2026-06-25T06:00:00+06:00', home: 'SUI', away: 'BIH', group: 'B', venue: 'levis', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '06:00' },
  { id: 52, date: '2026-06-25T06:00:00+06:00', home: 'QAT', away: 'CAN', group: 'B', venue: 'bcplace', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '06:00' },

  // June 25
  { id: 53, date: '2026-06-26T02:00:00+06:00', home: 'MAR', away: 'HAI', group: 'C', venue: 'att', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 54, date: '2026-06-26T02:00:00+06:00', home: 'SCO', away: 'BRA', group: 'C', venue: 'metlife', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 55, date: '2026-06-26T06:00:00+06:00', home: 'PAR', away: 'AUS', group: 'D', venue: 'sofi', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '06:00' },
  { id: 56, date: '2026-06-26T06:00:00+06:00', home: 'TUR', away: 'USA', group: 'D', venue: 'bmo', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '06:00' },

  // June 26
  { id: 57, date: '2026-06-27T02:00:00+06:00', home: 'CUW', away: 'CIV', group: 'E', venue: 'bbva', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 58, date: '2026-06-27T02:00:00+06:00', home: 'ECU', away: 'GER', group: 'E', venue: 'arrowhead', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 59, date: '2026-06-27T06:00:00+06:00', home: 'TUN', away: 'SWE', group: 'F', venue: 'nrg', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '06:00' },
  { id: 60, date: '2026-06-27T06:00:00+06:00', home: 'JPN', away: 'NED', group: 'F', venue: 'hardrock', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '06:00' },

  // June 27
  { id: 61, date: '2026-06-27T23:00:00+06:00', home: 'IRN', away: 'NZL', group: 'G', venue: 'lumen', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 62, date: '2026-06-27T23:00:00+06:00', home: 'EGY', away: 'BEL', group: 'G', venue: 'mercedes', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 63, date: '2026-06-28T03:00:00+06:00', home: 'KSA', away: 'URU', group: 'H', venue: 'akron', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 64, date: '2026-06-28T03:00:00+06:00', home: 'CPV', away: 'ESP', group: 'H', venue: 'lincoln', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },

  // June 28
  { id: 65, date: '2026-06-28T23:00:00+06:00', home: 'NOR', away: 'IRQ', group: 'I', venue: 'att', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 66, date: '2026-06-28T23:00:00+06:00', home: 'SEN', away: 'FRA', group: 'I', venue: 'metlife', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 67, date: '2026-06-29T03:00:00+06:00', home: 'AUT', away: 'JOR', group: 'J', venue: 'hardrock', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 68, date: '2026-06-29T03:00:00+06:00', home: 'ALG', away: 'ARG', group: 'J', venue: 'nrg', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },

  // June 29 (last group matches)
  { id: 69, date: '2026-06-29T23:00:00+06:00', home: 'UZB', away: 'COD', group: 'K', venue: 'lumen', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 70, date: '2026-06-29T23:00:00+06:00', home: 'COL', away: 'POR', group: 'K', venue: 'sofi', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 71, date: '2026-06-30T03:00:00+06:00', home: 'GHA', away: 'PAN', group: 'L', venue: 'bbva', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 72, date: '2026-06-30T03:00:00+06:00', home: 'CRO', away: 'ENG', group: 'L', venue: 'gillette', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
];

// ══════════════════════════════════════════
// KNOCKOUT STAGE
// ══════════════════════════════════════════
const knockoutMatches = [
  // Round of 32 — June 30 – July 4 (BST)
  { id: 73, date: '2026-07-01T01:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 1, venue: 'metlife', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 74, date: '2026-07-01T05:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 2, venue: 'sofi', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 75, date: '2026-07-02T01:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 3, venue: 'att', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 76, date: '2026-07-02T05:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 4, venue: 'nrg', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 77, date: '2026-07-03T01:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 5, venue: 'mercedes', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 78, date: '2026-07-03T05:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 6, venue: 'hardrock', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 79, date: '2026-07-04T01:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 7, venue: 'lincoln', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 80, date: '2026-07-04T05:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 8, venue: 'lumen', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 81, date: '2026-07-04T01:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 9, venue: 'arrowhead', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 82, date: '2026-07-04T05:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 10, venue: 'levis', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 83, date: '2026-07-05T01:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 11, venue: 'gillette', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 84, date: '2026-07-05T05:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 12, venue: 'bmo', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 85, date: '2026-07-05T01:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 13, venue: 'bcplace', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 86, date: '2026-07-05T05:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 14, venue: 'azteca', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 87, date: '2026-07-05T01:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 15, venue: 'akron', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 88, date: '2026-07-05T05:00:00+06:00', home: null, away: null, round: 'R32', matchNumber: 16, venue: 'bbva', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },

  // Round of 16 — July 5–8 (BST)
  { id: 89, date: '2026-07-06T01:00:00+06:00', home: null, away: null, round: 'R16', matchNumber: 1, venue: 'metlife', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 90, date: '2026-07-06T05:00:00+06:00', home: null, away: null, round: 'R16', matchNumber: 2, venue: 'sofi', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 91, date: '2026-07-07T01:00:00+06:00', home: null, away: null, round: 'R16', matchNumber: 3, venue: 'att', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 92, date: '2026-07-07T05:00:00+06:00', home: null, away: null, round: 'R16', matchNumber: 4, venue: 'nrg', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 93, date: '2026-07-08T01:00:00+06:00', home: null, away: null, round: 'R16', matchNumber: 5, venue: 'mercedes', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 94, date: '2026-07-08T05:00:00+06:00', home: null, away: null, round: 'R16', matchNumber: 6, venue: 'hardrock', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 95, date: '2026-07-09T01:00:00+06:00', home: null, away: null, round: 'R16', matchNumber: 7, venue: 'lincoln', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 96, date: '2026-07-09T05:00:00+06:00', home: null, away: null, round: 'R16', matchNumber: 8, venue: 'lumen', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },

  // Quarter-Finals — July 10–12 (BST)
  { id: 97, date: '2026-07-11T01:00:00+06:00', home: null, away: null, round: 'QF', matchNumber: 1, venue: 'metlife', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 98, date: '2026-07-11T05:00:00+06:00', home: null, away: null, round: 'QF', matchNumber: 2, venue: 'sofi', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 99, date: '2026-07-12T01:00:00+06:00', home: null, away: null, round: 'QF', matchNumber: 3, venue: 'att', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 100, date: '2026-07-13T01:00:00+06:00', home: null, away: null, round: 'QF', matchNumber: 4, venue: 'nrg', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },

  // Semi-Finals — July 15–16 (BST)
  { id: 101, date: '2026-07-16T05:00:00+06:00', home: null, away: null, round: 'SF', matchNumber: 1, venue: 'metlife', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 102, date: '2026-07-17T05:00:00+06:00', home: null, away: null, round: 'SF', matchNumber: 2, venue: 'att', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },

  // Third-Place Match — July 19 (BST)
  { id: 103, date: '2026-07-20T01:00:00+06:00', home: null, away: null, round: '3RD', matchNumber: 1, venue: 'hardrock', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },

  // FINAL — July 19 ET → July 20 BST
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
  // Use Bangladesh timezone for "today"
  const now = new Date();
  const bdNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
  const todayStr = bdNow.toISOString().split('T')[0];
  return allMatches.filter(m => {
    const matchDate = new Date(m.date);
    const bdMatch = new Date(matchDate.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
    const matchStr = bdMatch.toISOString().split('T')[0];
    return matchStr === todayStr;
  });
};

export const getUniqueMatchDates = () => {
  const dates = [...new Set(groupMatches.map(m => {
    const d = new Date(m.date);
    const bd = new Date(d.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
    return bd.toISOString().split('T')[0];
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

// Format time for display in Bangladesh timezone (24h)
export const formatMatchTime = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-GB', {
    timeZone: 'Asia/Dhaka',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

// Format date for display in Bangladesh timezone
export const formatMatchDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    timeZone: 'Asia/Dhaka',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export { groupMatches, knockoutMatches };
