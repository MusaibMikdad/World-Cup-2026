import { useState, useEffect } from 'react';
import { getSummaryStats, clearDatabase, trackEvent } from '../services/analytics';
import './Analytics.css';

export default function Analytics() {
  const [stats, setStats] = useState(getSummaryStats());
  const [expandedSession, setExpandedSession] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    // Refresh stats on load
    setStats(getSummaryStats());
  }, []);

  const handleRefresh = () => {
    setStats(getSummaryStats());
    trackEvent('Action', 'Refresh analytics dashboard');
  };

  const handleClear = () => {
    clearDatabase();
    setStats(getSummaryStats());
    setExpandedSession(null);
    setShowClearConfirm(false);
  };

  const handleExport = () => {
    trackEvent('Action', 'Export analytics data');
    const db = localStorage.getItem('wc2026_analytics_db');
    if (!db) return;
    
    const blob = new Blob([db], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `worldcup2026_analytics_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleSession = (id) => {
    if (expandedSession === id) {
      setExpandedSession(null);
    } else {
      setExpandedSession(id);
      trackEvent('Action', 'Expand session details', id);
    }
  };

  const formatDate = (isoStr) => {
    const d = new Date(isoStr);
    return d.toLocaleString('en-GB', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const getDuration = (start, lastActive) => {
    const diffMs = new Date(lastActive) - new Date(start);
    const secs = Math.floor(diffMs / 1000);
    if (secs < 60) return `${secs}s`;
    const mins = Math.floor(secs / 60);
    return `${mins}m ${secs % 60}s`;
  };

  return (
    <div className="analytics-page container animate-fade-in">
      <div className="analytics-header">
        <div>
          <h1 className="analytics-title display-title gradient-text">User Tracking</h1>
          <p className="analytics-subtitle">Local Analytics & Session Database Logs</p>
        </div>
        <div className="analytics-actions">
          <button className="btn btn-secondary btn-sm" onClick={handleRefresh}>
            🔄 Refresh
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleExport}>
            📥 Export JSON
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => setShowClearConfirm(true)}>
            🗑️ Clear DB
          </button>
        </div>
      </div>

      {showClearConfirm && (
        <div className="analytics-modal-backdrop">
          <div className="analytics-modal glass-card">
            <h3>Confirm Database Clear</h3>
            <p>Are you sure you want to delete all stored user tracking and session logs? This action cannot be undone.</p>
            <div className="analytics-modal-buttons">
              <button className="btn btn-secondary" onClick={() => setShowClearConfirm(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleClear}>Clear Database</button>
            </div>
          </div>
        </div>
      )}

      {/* Overview Cards */}
      <div className="analytics-grid">
        <div className="analytics-card glass-card-static">
          <span className="analytics-card-icon">👥</span>
          <div className="analytics-card-val">{stats.uniqueVisitors}</div>
          <div className="analytics-card-lbl">Unique Visitors</div>
        </div>
        <div className="analytics-card glass-card-static">
          <span className="analytics-card-icon">🖱️</span>
          <div className="analytics-card-val">{stats.totalSessions}</div>
          <div className="analytics-card-lbl">Total Sessions</div>
        </div>
        <div className="analytics-card glass-card-static">
          <span className="analytics-card-icon">📄</span>
          <div className="analytics-card-val">{stats.totalViews}</div>
          <div className="analytics-card-lbl">Page Views</div>
        </div>
        <div className="analytics-card glass-card-static">
          <span className="analytics-card-icon">⚡</span>
          <div className="analytics-card-val">{stats.clickCount}</div>
          <div className="analytics-card-lbl">Interactions</div>
        </div>
      </div>

      {/* Breakdown grids */}
      <div className="analytics-breakdowns">
        {/* Popular Pages */}
        <div className="analytics-section glass-card-static">
          <h3>Popular Pages</h3>
          <div className="analytics-breakdown-list">
            {Object.entries(stats.pages)
              .sort((a, b) => b[1] - a[1])
              .map(([page, count]) => (
                <div key={page} className="analytics-breakdown-item">
                  <span className="analytics-breakdown-name">{page || '/'}</span>
                  <span className="analytics-breakdown-count badge badge-upcoming">{count} views</span>
                </div>
              ))}
            {Object.keys(stats.pages).length === 0 && <p className="analytics-empty">No views recorded yet.</p>}
          </div>
        </div>

        {/* Devices & Browsers */}
        <div className="analytics-section glass-card-static">
          <h3>Devices & Browsers</h3>
          <div className="analytics-device-breakdown">
            <h4>Devices</h4>
            <div className="analytics-tag-group">
              {Object.entries(stats.devices).map(([dev, count]) => (
                <span key={dev} className="analytics-tag">
                  💻 {dev}: <strong>{count}</strong>
                </span>
              ))}
            </div>
            <h4 style={{ marginTop: '1.5rem' }}>Browsers</h4>
            <div className="analytics-tag-group">
              {Object.entries(stats.browsers).map(([br, count]) => (
                <span key={br} className="analytics-tag">
                  🌐 {br}: <strong>{count}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sessions Detail Logs */}
      <div className="analytics-sessions-section glass-card-static">
        <h3>Session Database Entries ({stats.sessionsList.length})</h3>
        <div className="analytics-sessions-table-wrapper">
          <table className="analytics-sessions-table">
            <thead>
              <tr>
                <th>Session ID</th>
                <th>Visitor ID</th>
                <th>Region</th>
                <th>Device/Browser</th>
                <th>Started At</th>
                <th>Duration</th>
                <th>Views</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.sessionsList.map((session) => {
                const isExpanded = expandedSession === session.sessionId;
                return (
                  <window key={session.sessionId} style={{ display: 'contents' }}>
                    <tr className={isExpanded ? 'active-row' : ''}>
                      <td className="font-mono text-sm">{session.sessionId.slice(8, 16)}...</td>
                      <td className="font-mono text-sm">{session.visitorId.slice(8, 16)}...</td>
                      <td>{session.language}</td>
                      <td>
                        <span className="device-icon">
                          {session.device === 'Mobile Phone' ? '📱' : session.device === 'Tablet' ? '📟' : '💻'}
                        </span>{' '}
                        {session.browser}
                      </td>
                      <td>{formatDate(session.startTime)}</td>
                      <td>{getDuration(session.startTime, session.lastActive)}</td>
                      <td>
                        <span className="badge badge-upcoming">{session.pageViews?.length || 0}</span>
                      </td>
                      <td>
                        <button className="btn btn-secondary btn-xs" onClick={() => toggleSession(session.sessionId)}>
                          {isExpanded ? 'Hide Details' : 'View Timeline'}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="session-expanded-row">
                        <td colSpan="8">
                          <div className="session-expanded-content">
                            <h4>Session Timeline & Events</h4>
                            
                            <div className="timeline-lists">
                              {/* Page Views Timeline */}
                              <div className="timeline-col">
                                <h5>📄 Page Views ({session.pageViews?.length || 0})</h5>
                                <div className="timeline-items">
                                  {session.pageViews?.map((pv, index) => (
                                    <div key={index} className="timeline-item">
                                      <span className="timeline-time">{formatDate(pv.timestamp).split(' ')[2]}</span>
                                      <span className="timeline-badge view">VIEW</span>
                                      <span className="timeline-desc">{pv.path}</span>
                                      <span className="timeline-ref">via {pv.referrer}</span>
                                    </div>
                                  ))}
                                  {(!session.pageViews || session.pageViews.length === 0) && (
                                    <p className="analytics-empty">No page views recorded.</p>
                                  )}
                                </div>
                              </div>

                              {/* Click Events Timeline */}
                              <div className="timeline-col">
                                <h5>⚡ Click & Interaction Events ({session.events?.length || 0})</h5>
                                <div className="timeline-items">
                                  {session.events?.map((ev, index) => (
                                    <div key={index} className="timeline-item">
                                      <span className="timeline-time">{formatDate(ev.timestamp).split(' ')[2]}</span>
                                      <span className="timeline-badge event">{ev.category.toUpperCase()}</span>
                                      <span className="timeline-desc">
                                        <strong>{ev.action}</strong> {ev.label && `(${ev.label})`}
                                      </span>
                                    </div>
                                  ))}
                                  {(!session.events || session.events.length === 0) && (
                                    <p className="analytics-empty">No interaction events recorded.</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </window>
                );
              })}
              {stats.sessionsList.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>
                    No sessions logged in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
