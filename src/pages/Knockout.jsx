import KnockoutBracket from '../components/KnockoutBracket';
import './Knockout.css';

function Knockout() {
  return (
    <div className="knockout-page">
      <div className="container">
        {/* ── Header ── */}
        <header className="knockout-header animate-slide-up">
          <h1 className="section-title">
            <span className="knockout-trophy">🏆</span>
            <span className="gradient-text">Knockout Stage</span>
          </h1>
          <p className="section-subtitle">
            From 32 teams to one champion — every match is do or die
          </p>
        </header>

        {/* ── Scroll Hint (mobile) ── */}
        <div className="knockout-scroll-hint">
          <span>Scroll horizontally to explore the bracket</span>
          <span className="knockout-scroll-icon">→</span>
        </div>
      </div>

      {/* ── Bracket ── */}
      <section className="page-section">
        <div className="container">
          <div className="knockout-bracket-area animate-fade-in">
            <KnockoutBracket />
          </div>
        </div>
      </section>

      <div className="container">
        {/* ── Legend ── */}
        <div className="knockout-legend glass-card-static animate-slide-up">
          <div className="knockout-legend-item">
            <span className="knockout-legend-color scheduled" />
            <span>Scheduled</span>
          </div>
          <div className="knockout-legend-item">
            <span className="knockout-legend-color live" />
            <span>Live</span>
          </div>
          <div className="knockout-legend-item">
            <span className="knockout-legend-color finished" />
            <span>Completed</span>
          </div>
          <div className="knockout-legend-item">
            <span className="knockout-legend-color tbd" />
            <span>TBD</span>
          </div>
        </div>

        {/* ── Info Note ── */}
        <div className="knockout-info glass-card-static animate-slide-up">
          <div className="knockout-info-icon">ℹ️</div>
          <p>
            The knockout bracket will be <strong>populated automatically</strong> as group stage
            matches conclude. The top two teams from each group advance to the Round of 32,
            where the real drama begins.
          </p>
        </div>

        <div className="divider-glow" />
      </div>
    </div>
  );
}

export default Knockout;
