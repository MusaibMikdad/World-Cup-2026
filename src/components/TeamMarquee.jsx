import { useState } from 'react';
import Flag from './Flag';
import { teams } from '../data/teams';
import './TeamMarquee.css';

export default function TeamMarquee() {
  const allTeams = Object.values(teams);
  // Divide into two groups for the two concentric circles
  const outerTeams = allTeams.slice(0, 24);
  const innerTeams = allTeams.slice(24, 48);

  const [hoveredTeam, setHoveredTeam] = useState(null);

  return (
    <section className="team-orbit-section">
      <h2 className="team-orbit-heading">
        <span className="gradient-text">World</span> Stage
      </h2>
      <p className="team-orbit-subheading">48 Nations in Orbit</p>

      <div className="team-orbit-container">
        {/* Center Core Display */}
        <div className="team-orbit-core">
          {hoveredTeam ? (
            <div className="team-orbit-core-content pulse-in">
              <Flag code={hoveredTeam.code} size="lg" />
              <h3 className="team-orbit-core-name">{hoveredTeam.name}</h3>
              <span className="team-orbit-core-conf">{hoveredTeam.confederation}</span>
            </div>
          ) : (
            <div className="team-orbit-core-content">
              <div className="team-orbit-core-number">48</div>
              <div className="team-orbit-core-label">Nations</div>
            </div>
          )}
        </div>

        {/* Outer Ring */}
        <div className="team-orbit-ring team-orbit-ring--outer">
          {outerTeams.map((team, i) => {
            const angle = (360 / 24) * i;
            return (
              <div 
                key={team.code} 
                className="team-orbit-item"
                style={{ transform: `rotate(${angle}deg) translateX(var(--outer-radius))` }}
                onMouseEnter={() => setHoveredTeam(team)}
                onMouseLeave={() => setHoveredTeam(null)}
              >
                <div 
                  className="team-orbit-item-unrotate"
                  style={{ transform: `rotate(${-angle}deg)` }}
                >
                  <div className="team-orbit-counter-spin--outer">
                    <div className="team-orbit-chip">
                      <Flag code={team.code} size="sm" />
                      <span className="team-orbit-chip-code">{team.code}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inner Ring */}
        <div className="team-orbit-ring team-orbit-ring--inner">
          {innerTeams.map((team, i) => {
            const angle = (360 / 24) * i;
            return (
              <div 
                key={team.code} 
                className="team-orbit-item"
                style={{ transform: `rotate(${angle}deg) translateX(var(--inner-radius))` }}
                onMouseEnter={() => setHoveredTeam(team)}
                onMouseLeave={() => setHoveredTeam(null)}
              >
                <div 
                  className="team-orbit-item-unrotate"
                  style={{ transform: `rotate(${-angle}deg)` }}
                >
                  <div className="team-orbit-counter-spin--inner">
                    <div className="team-orbit-chip">
                      <Flag code={team.code} size="sm" />
                      <span className="team-orbit-chip-code">{team.code}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
