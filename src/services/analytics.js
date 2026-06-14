// LocalStorage-based User Analytics Database Service

const STORAGE_KEY = 'wc2026_analytics_db';
const VISITOR_KEY = 'wc2026_visitor_id';
const SESSION_KEY = 'wc2026_session_id';

// Generate a random unique ID
const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

// Detect basic device and browser info
const detectMetadata = () => {
  const ua = navigator.userAgent;
  let browser = 'Unknown Browser';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('SamsungBrowser')) browser = 'Samsung Browser';
  else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';
  else if (ua.includes('Trident')) browser = 'Internet Explorer';
  else if (ua.includes('Edge')) browser = 'Edge';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';

  let device = 'Desktop';
  const width = window.innerWidth;
  if (width <= 480) device = 'Mobile Phone';
  else if (width <= 1024) device = 'Tablet';

  return {
    device,
    browser,
    screen: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language || 'en-US'
  };
};

export const getVisitorId = () => {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = 'visitor_' + generateId();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
};

export const getSessionId = () => {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = 'session_' + generateId();
    sessionStorage.setItem(SESSION_KEY, id);
    // Initialize session in db
    initializeNewSession(id);
  }
  return id;
};

// Initialize a new session in database
const initializeNewSession = (sessionId) => {
  const db = getDatabase();
  const visitorId = getVisitorId();
  const meta = detectMetadata();

  const newSession = {
    sessionId,
    visitorId,
    startTime: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    ...meta,
    pageViews: [],
    events: []
  };

  db.sessions = db.sessions || [];
  db.sessions.push(newSession);
  saveDatabase(db);
};

// Retrieve complete database
export const getDatabase = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { sessions: [] };
  } catch (e) {
    console.error('Failed to parse analytics db', e);
    return { sessions: [] };
  }
};

// Save database
const saveDatabase = (db) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (e) {
    console.warn('Storage limit exceeded or localStorage unavailable', e);
  }
};

// Track a Page View
export const trackPageView = (path) => {
  const sessionId = getSessionId();
  const db = getDatabase();
  const session = db.sessions.find(s => s.sessionId === sessionId);

  if (session) {
    session.lastActive = new Date().toISOString();
    
    // Avoid logging duplicate consecutive page views on fast re-renders
    const lastPv = session.pageViews[session.pageViews.length - 1];
    if (lastPv && lastPv.path === path && (new Date() - new Date(lastPv.timestamp)) < 1000) {
      return;
    }

    session.pageViews.push({
      path,
      timestamp: new Date().toISOString(),
      referrer: document.referrer || 'Direct'
    });
    saveDatabase(db);
  }
};

// Track an Event (clicks, filters, toggles)
export const trackEvent = (category, action, label = '') => {
  const sessionId = getSessionId();
  const db = getDatabase();
  const session = db.sessions.find(s => s.sessionId === sessionId);

  if (session) {
    session.lastActive = new Date().toISOString();
    session.events.push({
      category,
      action,
      label,
      timestamp: new Date().toISOString()
    });
    saveDatabase(db);
  }
};

// Get stats summary for dashboard
export const getSummaryStats = () => {
  const db = getDatabase();
  const sessions = db.sessions || [];
  
  const totalViews = sessions.reduce((acc, s) => acc + (s.pageViews?.length || 0), 0);
  const totalSessions = sessions.length;
  
  // Calculate unique visitors
  const uniqueVisitors = new Set(sessions.map(s => s.visitorId)).size;

  // Browser distribution
  const browsers = {};
  // Device distribution
  const devices = {};
  // Page popularity
  const pages = {};
  // Clicks and events
  let clickCount = 0;

  sessions.forEach(s => {
    browsers[s.browser] = (browsers[s.browser] || 0) + 1;
    devices[s.device] = (devices[s.device] || 0) + 1;
    
    if (s.pageViews) {
      s.pageViews.forEach(pv => {
        pages[pv.path] = (pages[pv.path] || 0) + 1;
      });
    }

    if (s.events) {
      s.events.forEach(e => {
        if (e.category === 'Click' || e.category === 'Filter' || e.category === 'Action' || e.category === 'Stream') {
          clickCount++;
        }
      });
    }
  });

  return {
    totalViews,
    totalSessions,
    uniqueVisitors,
    clickCount,
    browsers,
    devices,
    pages,
    sessionsList: [...sessions].sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
  };
};

// Clear DB
export const clearDatabase = () => {
  localStorage.removeItem(STORAGE_KEY);
  // Re-init current session
  const curSessionId = sessionStorage.getItem(SESSION_KEY);
  if (curSessionId) {
    initializeNewSession(curSessionId);
  }
};
