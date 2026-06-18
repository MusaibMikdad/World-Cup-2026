// Static match schedule for the FIFA World Cup 2026
// All dates and displayTimes are formatted in Bangladesh Standard Time (BST, UTC+6)

const groupMatches = [
  { id: 1, date: '2026-06-12T01:00:00+06:00', home: 'MEX', away: 'RSA', group: 'A', venue: 'azteca', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 2, date: '2026-06-12T08:00:00+06:00', home: 'KOR', away: 'CZE', group: 'A', venue: 'akron', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },
  { id: 3, date: '2026-06-13T01:00:00+06:00', home: 'CAN', away: 'BIH', group: 'B', venue: 'bmo', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 4, date: '2026-06-13T07:00:00+06:00', home: 'USA', away: 'PAR', group: 'D', venue: 'sofi', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
  { id: 5, date: '2026-06-14T07:00:00+06:00', home: 'HAI', away: 'SCO', group: 'C', venue: 'gillette', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
  { id: 6, date: '2026-06-14T10:00:00+06:00', home: 'AUS', away: 'TUR', group: 'D', venue: 'bcplace', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '10:00' },
  { id: 7, date: '2026-06-14T04:00:00+06:00', home: 'BRA', away: 'MAR', group: 'C', venue: 'metlife', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '04:00' },
  { id: 8, date: '2026-06-14T01:00:00+06:00', home: 'QAT', away: 'SUI', group: 'B', venue: 'levis', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 9, date: '2026-06-15T05:00:00+06:00', home: 'CIV', away: 'ECU', group: 'E', venue: 'lincoln', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 10, date: '2026-06-14T23:00:00+06:00', home: 'GER', away: 'CUW', group: 'E', venue: 'nrg', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 11, date: '2026-06-15T02:00:00+06:00', home: 'NED', away: 'JPN', group: 'F', venue: 'att', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 12, date: '2026-06-15T08:00:00+06:00', home: 'SWE', away: 'TUN', group: 'F', venue: 'bbva', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },
  { id: 13, date: '2026-06-16T07:00:00+06:00', home: 'IRN', away: 'NZL', group: 'G', venue: 'sofi', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
  { id: 14, date: '2026-06-15T22:00:00+06:00', home: 'ESP', away: 'CPV', group: 'H', venue: 'mercedes', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '22:00' },
  { id: 15, date: '2026-06-16T01:00:00+06:00', home: 'BEL', away: 'EGY', group: 'G', venue: 'lumen', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 16, date: '2026-06-16T04:00:00+06:00', home: 'KSA', away: 'URU', group: 'H', venue: 'hardrock', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '04:00' },
  { id: 17, date: '2026-06-17T01:00:00+06:00', home: 'FRA', away: 'SEN', group: 'I', venue: 'metlife', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 18, date: '2026-06-17T04:00:00+06:00', home: 'IRQ', away: 'NOR', group: 'I', venue: 'gillette', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '04:00' },
  { id: 19, date: '2026-06-17T07:00:00+06:00', home: 'ARG', away: 'ALG', group: 'J', venue: 'arrowhead', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
  { id: 20, date: '2026-06-17T10:00:00+06:00', home: 'AUT', away: 'JOR', group: 'J', venue: 'levis', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '10:00' },
  { id: 21, date: '2026-06-18T05:00:00+06:00', home: 'GHA', away: 'PAN', group: 'L', venue: 'bmo', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 22, date: '2026-06-18T02:00:00+06:00', home: 'ENG', away: 'CRO', group: 'L', venue: 'att', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 23, date: '2026-06-17T23:00:00+06:00', home: 'POR', away: 'COD', group: 'K', venue: 'nrg', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 24, date: '2026-06-18T08:00:00+06:00', home: 'UZB', away: 'COL', group: 'K', venue: 'azteca', matchday: 1, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },
  { id: 25, date: '2026-06-18T22:00:00+06:00', home: 'CZE', away: 'RSA', group: 'A', venue: 'mercedes', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '22:00' },
  { id: 26, date: '2026-06-19T01:00:00+06:00', home: 'SUI', away: 'BIH', group: 'B', venue: 'sofi', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 27, date: '2026-06-19T04:00:00+06:00', home: 'CAN', away: 'QAT', group: 'B', venue: 'bcplace', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '04:00' },
  { id: 28, date: '2026-06-19T07:00:00+06:00', home: 'MEX', away: 'KOR', group: 'A', venue: 'akron', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
  { id: 29, date: '2026-06-20T06:30:00+06:00', home: 'BRA', away: 'HAI', group: 'C', venue: 'lincoln', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '06:30' },
  { id: 30, date: '2026-06-20T04:00:00+06:00', home: 'SCO', away: 'MAR', group: 'C', venue: 'gillette', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '04:00' },
  { id: 31, date: '2026-06-20T09:00:00+06:00', home: 'TUR', away: 'PAR', group: 'D', venue: 'levis', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '09:00' },
  { id: 32, date: '2026-06-20T01:00:00+06:00', home: 'USA', away: 'AUS', group: 'D', venue: 'lumen', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 33, date: '2026-06-21T02:00:00+06:00', home: 'GER', away: 'CIV', group: 'E', venue: 'bmo', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 34, date: '2026-06-21T06:00:00+06:00', home: 'ECU', away: 'CUW', group: 'E', venue: 'arrowhead', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '06:00' },
  { id: 35, date: '2026-06-20T23:00:00+06:00', home: 'NED', away: 'SWE', group: 'F', venue: 'nrg', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 36, date: '2026-06-21T10:00:00+06:00', home: 'TUN', away: 'JPN', group: 'F', venue: 'bbva', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '10:00' },
  { id: 37, date: '2026-06-22T04:00:00+06:00', home: 'URU', away: 'CPV', group: 'H', venue: 'hardrock', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '04:00' },
  { id: 38, date: '2026-06-21T22:00:00+06:00', home: 'ESP', away: 'KSA', group: 'H', venue: 'mercedes', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '22:00' },
  { id: 39, date: '2026-06-22T01:00:00+06:00', home: 'BEL', away: 'IRN', group: 'G', venue: 'sofi', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 40, date: '2026-06-22T07:00:00+06:00', home: 'NZL', away: 'EGY', group: 'G', venue: 'bcplace', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
  { id: 41, date: '2026-06-23T06:00:00+06:00', home: 'NOR', away: 'SEN', group: 'I', venue: 'metlife', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '06:00' },
  { id: 42, date: '2026-06-23T03:00:00+06:00', home: 'FRA', away: 'IRQ', group: 'I', venue: 'lincoln', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 43, date: '2026-06-22T23:00:00+06:00', home: 'ARG', away: 'AUT', group: 'J', venue: 'att', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 44, date: '2026-06-23T09:00:00+06:00', home: 'JOR', away: 'ALG', group: 'J', venue: 'levis', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '09:00' },
  { id: 45, date: '2026-06-24T02:00:00+06:00', home: 'ENG', away: 'GHA', group: 'L', venue: 'gillette', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 46, date: '2026-06-24T05:00:00+06:00', home: 'PAN', away: 'CRO', group: 'L', venue: 'bmo', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 47, date: '2026-06-23T23:00:00+06:00', home: 'POR', away: 'UZB', group: 'K', venue: 'nrg', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 48, date: '2026-06-24T08:00:00+06:00', home: 'COL', away: 'COD', group: 'K', venue: 'akron', matchday: 2, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },
  { id: 49, date: '2026-06-25T04:00:00+06:00', home: 'SCO', away: 'BRA', group: 'C', venue: 'hardrock', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '04:00' },
  { id: 50, date: '2026-06-25T04:00:00+06:00', home: 'MAR', away: 'HAI', group: 'C', venue: 'mercedes', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '04:00' },
  { id: 51, date: '2026-06-25T01:00:00+06:00', home: 'SUI', away: 'CAN', group: 'B', venue: 'bcplace', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 52, date: '2026-06-25T01:00:00+06:00', home: 'BIH', away: 'QAT', group: 'B', venue: 'lumen', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 53, date: '2026-06-25T07:00:00+06:00', home: 'CZE', away: 'MEX', group: 'A', venue: 'azteca', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
  { id: 54, date: '2026-06-25T07:00:00+06:00', home: 'RSA', away: 'KOR', group: 'A', venue: 'bbva', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
  { id: 55, date: '2026-06-26T02:00:00+06:00', home: 'CUW', away: 'CIV', group: 'E', venue: 'lincoln', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 56, date: '2026-06-26T02:00:00+06:00', home: 'ECU', away: 'GER', group: 'E', venue: 'metlife', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 57, date: '2026-06-26T05:00:00+06:00', home: 'JPN', away: 'SWE', group: 'F', venue: 'att', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 58, date: '2026-06-26T05:00:00+06:00', home: 'TUN', away: 'NED', group: 'F', venue: 'arrowhead', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 59, date: '2026-06-26T08:00:00+06:00', home: 'TUR', away: 'USA', group: 'D', venue: 'sofi', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },
  { id: 60, date: '2026-06-26T08:00:00+06:00', home: 'PAR', away: 'AUS', group: 'D', venue: 'levis', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },
  { id: 61, date: '2026-06-27T01:00:00+06:00', home: 'NOR', away: 'FRA', group: 'I', venue: 'gillette', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 62, date: '2026-06-27T01:00:00+06:00', home: 'SEN', away: 'IRQ', group: 'I', venue: 'bmo', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 63, date: '2026-06-27T09:00:00+06:00', home: 'EGY', away: 'IRN', group: 'G', venue: 'lumen', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '09:00' },
  { id: 64, date: '2026-06-27T09:00:00+06:00', home: 'NZL', away: 'BEL', group: 'G', venue: 'bcplace', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '09:00' },
  { id: 65, date: '2026-06-27T06:00:00+06:00', home: 'CPV', away: 'KSA', group: 'H', venue: 'nrg', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '06:00' },
  { id: 66, date: '2026-06-27T06:00:00+06:00', home: 'URU', away: 'ESP', group: 'H', venue: 'akron', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '06:00' },
  { id: 67, date: '2026-06-28T03:00:00+06:00', home: 'PAN', away: 'ENG', group: 'L', venue: 'metlife', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 68, date: '2026-06-28T03:00:00+06:00', home: 'CRO', away: 'GHA', group: 'L', venue: 'lincoln', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 69, date: '2026-06-28T08:00:00+06:00', home: 'ALG', away: 'AUT', group: 'J', venue: 'arrowhead', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },
  { id: 70, date: '2026-06-28T08:00:00+06:00', home: 'JOR', away: 'ARG', group: 'J', venue: 'att', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '08:00' },
  { id: 71, date: '2026-06-28T05:30:00+06:00', home: 'COL', away: 'POR', group: 'K', venue: 'hardrock', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:30' },
  { id: 72, date: '2026-06-28T05:30:00+06:00', home: 'COD', away: 'UZB', group: 'K', venue: 'mercedes', matchday: 3, score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:30' },
];

const knockoutMatches = [
  { id: 73, date: '2026-06-29T01:00:00+06:00', home: '2nd in Group A', away: '2nd in Group B', round: 'R32', matchNumber: 1, venue: 'sofi', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 74, date: '2026-06-29T23:00:00+06:00', home: '1st in Group C', away: '2nd in Group F', round: 'R32', matchNumber: 2, venue: 'gillette', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 75, date: '2026-06-30T02:30:00+06:00', home: '1st in Group E', away: '3rd in Group A/B/C/D/F', round: 'R32', matchNumber: 3, venue: 'bbva', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:30' },
  { id: 76, date: '2026-06-30T07:00:00+06:00', home: '1st in Group F', away: '2nd in Group C', round: 'R32', matchNumber: 4, venue: 'nrg', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
  { id: 77, date: '2026-06-30T23:00:00+06:00', home: '2nd in Group E', away: '2nd in Group I', round: 'R32', matchNumber: 5, venue: 'metlife', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 78, date: '2026-07-01T03:00:00+06:00', home: '1st in Group I', away: '3rd in Group C/D/F/G/H', round: 'R32', matchNumber: 6, venue: 'att', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 79, date: '2026-07-01T07:00:00+06:00', home: '1st in Group A', away: '3rd in Group C/E/F/H/I', round: 'R32', matchNumber: 7, venue: 'azteca', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
  { id: 80, date: '2026-07-01T22:00:00+06:00', home: '1st in Group L', away: '3rd in Group E/H/I/J/K', round: 'R32', matchNumber: 8, venue: 'mercedes', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '22:00' },
  { id: 81, date: '2026-07-02T02:00:00+06:00', home: '1st in Group G', away: '3rd in Group A/E/H/I/J', round: 'R32', matchNumber: 9, venue: 'levis', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 82, date: '2026-07-02T06:00:00+06:00', home: '1st in Group D', away: '3rd in Group B/E/F/I/J', round: 'R32', matchNumber: 10, venue: 'lumen', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '06:00' },
  { id: 83, date: '2026-07-03T01:00:00+06:00', home: '1st in Group H', away: '2nd in Group J', round: 'R32', matchNumber: 11, venue: 'bmo', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 84, date: '2026-07-03T05:00:00+06:00', home: '2nd in Group K', away: '2nd in Group L', round: 'R32', matchNumber: 12, venue: 'sofi', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '05:00' },
  { id: 85, date: '2026-07-03T09:00:00+06:00', home: '1st in Group B', away: '3rd in Group E/F/G/I/J', round: 'R32', matchNumber: 13, venue: 'bcplace', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '09:00' },
  { id: 86, date: '2026-07-04T00:00:00+06:00', home: '2nd in Group D', away: '2nd in Group G', round: 'R32', matchNumber: 14, venue: 'hardrock', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '00:00' },
  { id: 87, date: '2026-07-04T04:00:00+06:00', home: '2nd in Group H', away: '1st in Group J', round: 'R32', matchNumber: 15, venue: 'arrowhead', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '04:00' },
  { id: 88, date: '2026-07-04T07:30:00+06:00', home: '1st in Group K', away: '3rd in Group D/E/I/J/L', round: 'R32', matchNumber: 16, venue: 'att', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:30' },
  { id: 89, date: '2026-07-04T23:00:00+06:00', home: 'Winner R32 Match 1', away: 'Winner R32 Match 3', round: 'R16', matchNumber: 1, venue: 'lincoln', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '23:00' },
  { id: 90, date: '2026-07-05T03:00:00+06:00', home: 'Winner R32 Match 5', away: 'Winner R32 Match 2', round: 'R16', matchNumber: 2, venue: 'nrg', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 91, date: '2026-07-06T02:00:00+06:00', home: 'Winner R32 Match 6', away: 'Winner R32 Match 4', round: 'R16', matchNumber: 3, venue: 'metlife', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 92, date: '2026-07-06T06:00:00+06:00', home: 'Winner R32 Match 8', away: 'Winner R32 Match 7', round: 'R16', matchNumber: 4, venue: 'azteca', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '06:00' },
  { id: 93, date: '2026-07-07T01:00:00+06:00', home: 'Winner R32 Match 12', away: 'Winner R32 Match 11', round: 'R16', matchNumber: 5, venue: 'att', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 94, date: '2026-07-07T06:00:00+06:00', home: 'Winner R32 Match 10', away: 'Winner R32 Match 9', round: 'R16', matchNumber: 6, venue: 'lumen', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '06:00' },
  { id: 95, date: '2026-07-07T22:00:00+06:00', home: 'Winner R32 Match 16', away: 'Winner R32 Match 14', round: 'R16', matchNumber: 7, venue: 'mercedes', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '22:00' },
  { id: 96, date: '2026-07-08T02:00:00+06:00', home: 'Winner R32 Match 15', away: 'Winner R32 Match 13', round: 'R16', matchNumber: 8, venue: 'bcplace', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 97, date: '2026-07-10T02:00:00+06:00', home: 'Winner R16 Match 2', away: 'Winner R16 Match 1', round: 'QF', matchNumber: 1, venue: 'gillette', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '02:00' },
  { id: 98, date: '2026-07-11T01:00:00+06:00', home: 'Winner R16 Match 6', away: 'Winner R16 Match 5', round: 'QF', matchNumber: 2, venue: 'sofi', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 99, date: '2026-07-12T03:00:00+06:00', home: 'Winner R16 Match 4', away: 'Winner R16 Match 3', round: 'QF', matchNumber: 3, venue: 'hardrock', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 100, date: '2026-07-12T07:00:00+06:00', home: 'Winner R16 Match 8', away: 'Winner R16 Match 7', round: 'QF', matchNumber: 4, venue: 'arrowhead', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '07:00' },
  { id: 101, date: '2026-07-15T01:00:00+06:00', home: 'Winner QF Match 1', away: 'Winner QF Match 2', round: 'SF', matchNumber: 1, venue: 'att', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 102, date: '2026-07-16T01:00:00+06:00', home: 'Winner QF Match 3', away: 'Winner QF Match 4', round: 'SF', matchNumber: 2, venue: 'mercedes', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
  { id: 103, date: '2026-07-19T03:00:00+06:00', home: 'Loser SF Match 1', away: 'Loser SF Match 2', round: '3RD', matchNumber: 1, venue: 'hardrock', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '03:00' },
  { id: 104, date: '2026-07-20T01:00:00+06:00', home: 'Winner SF Match 1', away: 'Winner SF Match 2', round: 'FINAL', matchNumber: 1, venue: 'metlife', score: { home: null, away: null }, status: 'SCHEDULED', displayTime: '01:00' },
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
