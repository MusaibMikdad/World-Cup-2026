export const streamingPlatforms = [
  // Americas
  { name: 'Tubi', url: 'https://tubitv.com', region: 'Americas', country: '🇺🇸 USA', free: true, note: 'Select matches via FOX partnership' },
  { name: 'FOX Sports App', url: 'https://www.foxsports.com', region: 'Americas', country: '🇺🇸 USA', free: false, note: 'Cable/streaming login required' },
  { name: 'Peacock', url: 'https://www.peacocktv.com', region: 'Americas', country: '🇺🇸 USA', free: false, note: 'Spanish language coverage' },
  { name: 'CBC Sports', url: 'https://www.cbc.ca/sports', region: 'Americas', country: '🇨🇦 Canada', free: true, note: 'Free streaming on CBC Gem' },
  { name: 'TSN', url: 'https://www.tsn.ca', region: 'Americas', country: '🇨🇦 Canada', free: false, note: 'Cable subscription needed' },
  { name: 'CazéTV (YouTube)', url: 'https://youtube.com/@CazsTV', region: 'Americas', country: '🇧🇷 Brazil', free: true, note: 'All 104 matches FREE on YouTube!' },
  { name: 'Telefe / TV Pública', url: 'https://www.telefe.com', region: 'Americas', country: '🇦🇷 Argentina', free: true, note: 'Free-to-air' },
  { name: 'Caracol TV', url: 'https://www.caracoltv.com', region: 'Americas', country: '🇨🇴 Colombia', free: true, note: 'Free-to-air coverage' },
  { name: 'Canal 5 / Azteca', url: 'https://www.tvazteca.com', region: 'Americas', country: '🇲🇽 Mexico', free: true, note: 'Free-to-air national coverage' },

  // Europe
  { name: 'BBC iPlayer', url: 'https://www.bbc.co.uk/iplayer', region: 'Europe', country: '🇬🇧 UK', free: true, note: 'Free with UK TV license' },
  { name: 'ITVX', url: 'https://www.itv.com', region: 'Europe', country: '🇬🇧 UK', free: true, note: 'Free with UK TV license' },
  { name: 'ARD Mediathek', url: 'https://www.ardmediathek.de', region: 'Europe', country: '🇩🇪 Germany', free: true, note: 'Free-to-air public broadcaster' },
  { name: 'ZDF Mediathek', url: 'https://www.zdf.de', region: 'Europe', country: '🇩🇪 Germany', free: true, note: 'Free-to-air public broadcaster' },
  { name: 'TF1+', url: 'https://www.tf1.fr', region: 'Europe', country: '🇫🇷 France', free: true, note: 'Free-to-air' },
  { name: 'M6', url: 'https://www.6play.fr', region: 'Europe', country: '🇫🇷 France', free: true, note: 'Free-to-air' },
  { name: 'RTVE Play', url: 'https://www.rtve.es', region: 'Europe', country: '🇪🇸 Spain', free: true, note: 'Free-to-air public broadcaster' },
  { name: 'RAI Play', url: 'https://www.raiplay.it', region: 'Europe', country: '🇮🇹 Italy', free: true, note: 'Free-to-air coverage' },
  { name: 'NPO Start', url: 'https://npo.nl', region: 'Europe', country: '🇳🇱 Netherlands', free: true, note: 'Free-to-air' },
  { name: 'SVT Play', url: 'https://www.svtplay.se', region: 'Europe', country: '🇸🇪 Sweden', free: true, note: 'Free-to-air' },
  { name: 'NRK', url: 'https://www.nrk.no', region: 'Europe', country: '🇳🇴 Norway', free: true, note: 'Free-to-air' },

  // Asia & Oceania
  { name: 'SBS On Demand', url: 'https://www.sbs.com.au/ondemand', region: 'Asia & Oceania', country: '🇦🇺 Australia', free: true, note: 'Free for Australian viewers' },
  { name: 'BTV', url: 'https://btv.gov.bd', region: 'Asia & Oceania', country: '🇧🇩 Bangladesh', free: true, note: 'Free-to-air government broadcast' },
  { name: 'Toffee', url: 'https://toffeelive.com', region: 'Asia & Oceania', country: '🇧🇩 Bangladesh', free: false, note: 'Paid subscription required' },
  { name: 'Bioscope', url: 'https://www.bioscopelive.com', region: 'Asia & Oceania', country: '🇧🇩 Bangladesh', free: false, note: 'Paid subscription required' },
  { name: 'KickBD', url: 'https://kickbd.com/', region: 'Asia & Oceania', country: '🇧🇩 Bangladesh', free: true, note: 'Free live match streaming website' },
  { name: 'T6 SPORTS', url: 'https://www.t6sports.cc/watch-live/1', region: 'Asia & Oceania', country: '🇧🇩 Bangladesh', free: true, note: 'Free live streaming server' },
  { name: 'CCTV Sports', url: 'https://sports.cctv.com', region: 'Asia & Oceania', country: '🇨🇳 China', free: true, note: 'Free-to-air' },
  { name: 'JioCinema', url: 'https://www.jiocinema.com', region: 'Asia & Oceania', country: '🇮🇳 India', free: false, note: 'Subscription required' },
  { name: 'ABEMA', url: 'https://abema.tv', region: 'Asia & Oceania', country: '🇯🇵 Japan', free: true, note: 'Select matches free' },

  // Africa & MENA
  { name: 'SABC', url: 'https://www.sabc.co.za', region: 'Africa & MENA', country: '🇿🇦 South Africa', free: true, note: 'Free-to-air' },
  { name: 'KBC', url: 'https://www.kbc.co.ke', region: 'Africa & MENA', country: '🇰🇪 Kenya', free: true, note: 'Free-to-air' },
  { name: 'ENTV', url: 'https://www.entv.dz', region: 'Africa & MENA', country: '🇩🇿 Algeria', free: true, note: 'Free-to-air for national matches' },
  { name: 'beIN SPORTS', url: 'https://www.bein.com', region: 'Africa & MENA', country: '🌍 MENA Region', free: false, note: 'Subscription required (24 countries)' },

  // (No global free links available currently)
];

export const getStreamingByRegion = (region) => {
  if (region === 'All') return streamingPlatforms;
  return streamingPlatforms.filter(p => p.region === region);
};

export const getFreeStreaming = () => {
  return streamingPlatforms.filter(p => p.free);
};

export const regions = ['All', 'Americas', 'Europe', 'Asia & Oceania', 'Africa & MENA'];
