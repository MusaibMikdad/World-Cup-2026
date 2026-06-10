import { useState } from 'react';
import MatchCard from '../components/MatchCard';
import StreamingLinks from '../components/StreamingLinks';
import { useMatches } from '../hooks/useMatches';
import { regions } from '../data/streaming';
import './WatchLive.css';

function WatchLive() {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const { liveMatches } = useMatches();

  return (
    <div className="watch-page">
      <div className="container">
        {/* ── Header ── */}
        <header className="watch-header animate-slide-up">
          <h1 className="section-title">
            <span className="watch-play-icon">▶</span>
            <span className="gradient-text">Watch Live</span>
          </h1>
          <p className="section-subtitle">
            Find where to stream every FIFA World Cup 2026 match in your region
          </p>
        </header>

        {/* ── Currently Live ── */}
        <section className="watch-live-section">
          {liveMatches.length > 0 ? (
            <>
              <div className="watch-live-header animate-fade-in">
                <h2 className="section-title" style={{ marginBottom: 0 }}>
                  🔴 Currently Live
                </h2>
                <span className="badge badge-live">
                  {liveMatches.length} Live Now
                </span>
              </div>
              <div className="watch-live-grid animate-slide-up">
                {liveMatches.map(match => (
                  <div key={match.id} className="watch-live-card glass-card">
                    <MatchCard match={match} />
                    <div className="watch-live-actions">
                      <button className="btn btn-live btn-sm">
                        ▶ Watch Now
                      </button>
                      <button className="btn btn-secondary btn-sm">
                        📊 Match Stats
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="watch-no-live glass-card-static animate-slide-up">
              <div className="watch-no-live-icon">📺</div>
              <h3>No Live Matches Right Now</h3>
              <p>Check back during match times or browse the schedule for upcoming fixtures.</p>
            </div>
          )}
        </section>

        <div className="divider-glow" />

        {/* ── How to Watch for Free ── */}
        <section className="watch-free-section page-section">
          <div className="watch-free-card glass-card-static animate-slide-up">
            <h3 className="watch-free-title">
              <span>💡</span>
              <span>How to Watch for Free</span>
            </h3>
            <div className="watch-tips-grid">
              <div className="watch-tip">
                <span className="watch-tip-icon">📡</span>
                <div className="watch-tip-content">
                  <h4>Public Broadcasters</h4>
                  <p>Many countries have free-to-air coverage through national broadcasters like BBC, ARD/ZDF, TF1, and RTVE.</p>
                </div>
              </div>
              <div className="watch-tip">
                <span className="watch-tip-icon">🇧🇷</span>
                <div className="watch-tip-content">
                  <h4>CazéTV on YouTube</h4>
                  <p>Brazilian viewers can watch all 104 matches completely free on CazéTV's YouTube channel!</p>
                </div>
              </div>
              <div className="watch-tip">
                <span className="watch-tip-icon">📱</span>
                <div className="watch-tip-content">
                  <h4>Mobile Apps</h4>
                  <p>Download broadcaster apps for on-the-go streaming. Many offer free coverage with no cable subscription needed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider-glow" />

        {/* ── Streaming Links by Region ── */}
        <section className="page-section">
          <h2 className="section-title animate-slide-up">
            <span>📺</span> Streaming Platforms
          </h2>

          {/* Region Selector */}
          <div className="watch-region-selector animate-fade-in">
            <div className="watch-region-label">Filter by Region</div>
            <div className="watch-region-tabs">
              {regions.map(region => (
                <button
                  key={region}
                  className={`watch-region-tab${selectedRegion === region ? ' active' : ''}`}
                  onClick={() => setSelectedRegion(region)}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Streaming Links Component */}
          <div className="animate-slide-up">
            <StreamingLinks region={selectedRegion} />
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <div className="watch-disclaimer">
          <div className="watch-disclaimer-icon">⚠️</div>
          <p>
            Streaming availability varies by region and is subject to geo-restrictions.
            Some platforms may require a local IP address or subscription. Always verify
            availability in your country before match day. All broadcast information is
            provided for reference only and may change without notice.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WatchLive;
