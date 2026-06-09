import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import LiveScoreBar from '../components/LiveScoreBar';
import MatchCard from '../components/MatchCard';
import CountdownTimer from '../components/CountdownTimer';
import TeamMarquee from '../components/TeamMarquee';
import PlayerCollage from '../components/PlayerCollage';
import { groups } from '../data/teams';
import { getLiveMatches, getTodayMatches, getUpcomingMatches, allMatches } from '../data/matches';
import { useMatches } from '../hooks/useMatches';
import { venues } from '../data/venues';
import './Home.css';

function Home() {
  const { matches, liveMatches, todayMatches, upcomingMatches } = useMatches();
  const groupLetters = Object.keys(groups);

  const totalTeams = Object.keys(groups).reduce((sum, g) => sum + groups[g].length, 0);
  const totalMatches = allMatches.length;
  const totalVenues = venues.length;
  const totalGroups = groupLetters.length;

  return (
    <div className="home-page">
      {/* ── Hero Section ── */}
      <Hero />

      {/* ── Live Score Bar ── */}
      <LiveScoreBar />

      {/* ── Tournament Stats ── */}
      <section className="page-section">
        <div className="container">
          <div className="home-stats-bar stagger-children">
            <div className="glass-card-static home-stat-item">
              <div className="home-stat-value green">{totalTeams}</div>
              <div className="home-stat-label">Teams</div>
            </div>
            <div className="glass-card-static home-stat-item">
              <div className="home-stat-value gold">{totalMatches}</div>
              <div className="home-stat-label">Matches</div>
            </div>
            <div className="glass-card-static home-stat-item">
              <div className="home-stat-value blue">{totalVenues}</div>
              <div className="home-stat-label">Venues</div>
            </div>
            <div className="glass-card-static home-stat-item">
              <div className="home-stat-value purple">{totalGroups}</div>
              <div className="home-stat-label">Groups</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="divider-glow" />
      </div>

      {/* ── Live Now Section ── */}
      {liveMatches.length > 0 && (
        <section className="page-section home-live-section">
          <div className="container animate-slide-up">
            <div className="home-section-header">
              <h2 className="section-title">
                <span className="home-section-icon">🔴</span>
                Live Now
              </h2>
              <span className="badge badge-live">
                {liveMatches.length} {liveMatches.length === 1 ? 'Match' : 'Matches'} Live
              </span>
            </div>
            <div className="home-match-grid">
              {liveMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
          <div className="container">
            <div className="divider-glow" />
          </div>
        </section>
      )}

      {/* ── Today's Matches ── */}
      <section className="page-section">
        <div className="container animate-slide-up">
          <div className="home-section-header">
            <h2 className="section-title">
              <span className="home-section-icon">📅</span>
              Today's Matches
            </h2>
            <Link to="/schedule" className="home-view-all">
              Full Schedule
            </Link>
          </div>

          {todayMatches.length > 0 ? (
            <div className="home-match-grid">
              {todayMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div className="glass-card-static home-empty-state">
              <div className="home-empty-icon">⚽</div>
              <p>No matches scheduled for today. Check the full schedule for upcoming fixtures!</p>
            </div>
          )}
        </div>
      </section>

      <div className="container">
        <div className="divider-glow" />
      </div>

      {/* ── Upcoming Matches ── */}
      <section className="page-section">
        <div className="container animate-slide-up">
          <div className="home-section-header">
            <h2 className="section-title">
              <span className="home-section-icon">⏳</span>
              Upcoming Matches
            </h2>
            <Link to="/schedule" className="home-view-all">
              View All
            </Link>
          </div>

          {upcomingMatches.length > 0 ? (
            <div className="home-match-grid">
              {upcomingMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div className="glass-card-static home-empty-state">
              <div className="home-empty-icon">🏟️</div>
              <p>All matches have been played! Check the results in the schedule.</p>
            </div>
          )}
        </div>
      </section>

      <div className="container">
        <div className="divider-glow" />
      </div>

      {/* ── 48 Nations Marquee ── */}
      <TeamMarquee />

      <div className="container">
        <div className="divider-glow" />
      </div>

      {/* ── Legends Collage ── */}
      <PlayerCollage />
    </div>
  );
}

export default Home;
