export const venues = [
  { id: 'metlife', name: 'MetLife Stadium', city: 'New York/New Jersey', country: 'USA', flag: '🇺🇸', capacity: 82500, note: 'Final Venue' },
  { id: 'sofi', name: 'SoFi Stadium', city: 'Los Angeles', country: 'USA', flag: '🇺🇸', capacity: 70240, note: '' },
  { id: 'att', name: 'AT&T Stadium', city: 'Dallas', country: 'USA', flag: '🇺🇸', capacity: 80000, note: '' },
  { id: 'nrg', name: 'NRG Stadium', city: 'Houston', country: 'USA', flag: '🇺🇸', capacity: 72220, note: '' },
  { id: 'mercedes', name: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA', flag: '🇺🇸', capacity: 71000, note: '' },
  { id: 'hardrock', name: 'Hard Rock Stadium', city: 'Miami', country: 'USA', flag: '🇺🇸', capacity: 64767, note: '' },
  { id: 'lincoln', name: 'Lincoln Financial Field', city: 'Philadelphia', country: 'USA', flag: '🇺🇸', capacity: 69176, note: '' },
  { id: 'lumen', name: 'Lumen Field', city: 'Seattle', country: 'USA', flag: '🇺🇸', capacity: 68740, note: '' },
  { id: 'arrowhead', name: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA', flag: '🇺🇸', capacity: 76416, note: '' },
  { id: 'levis', name: "Levi's Stadium", city: 'San Francisco Bay', country: 'USA', flag: '🇺🇸', capacity: 68500, note: '' },
  { id: 'gillette', name: 'Gillette Stadium', city: 'Boston', country: 'USA', flag: '🇺🇸', capacity: 65878, note: '' },
  { id: 'bmo', name: 'BMO Field', city: 'Toronto', country: 'Canada', flag: '🇨🇦', capacity: 45000, note: '' },
  { id: 'bcplace', name: 'BC Place', city: 'Vancouver', country: 'Canada', flag: '🇨🇦', capacity: 54500, note: '' },
  { id: 'azteca', name: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico', flag: '🇲🇽', capacity: 87523, note: 'Opening Venue' },
  { id: 'akron', name: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico', flag: '🇲🇽', capacity: 49850, note: '' },
  { id: 'bbva', name: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico', flag: '🇲🇽', capacity: 53500, note: '' },
];

export const getVenue = (id) => venues.find(v => v.id === id) || { name: id, city: '', country: '' };
