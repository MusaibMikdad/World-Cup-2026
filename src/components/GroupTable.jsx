import { useMemo } from 'react';
import { getGroupTeams, calculateGroupStandings } from '../data/teams';
import { allMatches } from '../data/matches';
import Flag from './Flag';
import './GroupTable.css';

export default function GroupTable({ groupLetter, standings, matches }) {
  const rows = useMemo(() => {
    if (standings && standings.length > 0) return standings;
    const sourceMatches = matches || allMatches;
    return calculateGroupStandings(groupLetter, sourceMatches);
  }, [groupLetter, standings, matches]);

  const getTeamData = (code) => {
    const teams = getGroupTeams(groupLetter);
    return teams.find(t => t.code === code) || { name: code, flag: '🏳️', code };
  };

  return (
    <div className="group-table glass-card-static">
      {/* Header */}
      <div className="group-table__header">
        <span className="badge badge-group">Group {groupLetter}</span>
      </div>

      {/* Column Headers */}
      <div className="gt-row gt-row--header">
        <div className="gt-cell gt-cell--pos">#</div>
        <div className="gt-cell gt-cell--team">Team</div>
        <div className="gt-cell gt-cell--stat">P</div>
        <div className="gt-cell gt-cell--stat">W</div>
        <div className="gt-cell gt-cell--stat">D</div>
        <div className="gt-cell gt-cell--stat">L</div>
        <div className="gt-cell gt-cell--stat gt-hide-mobile">GF</div>
        <div className="gt-cell gt-cell--stat gt-hide-mobile">GA</div>
        <div className="gt-cell gt-cell--stat">GD</div>
        <div className="gt-cell gt-cell--stat gt-cell--pts">Pts</div>
      </div>

      {/* Team Rows */}
      {rows.map((row, idx) => {
        const team = getTeamData(row.team);
        const qualifyClass =
          idx < 2 ? 'gt-row--qualify' :
          idx === 2 ? 'gt-row--potential' : '';

        return (
          <div key={row.team} className={`gt-row gt-row--data ${qualifyClass}`}>
            <div className="gt-cell gt-cell--pos">
              <span className="gt-pos">{idx + 1}</span>
            </div>
            <div className="gt-cell gt-cell--team">
              <Flag code={team.code} size="sm" />
              <span className="gt-team-name">{team.name}</span>
              <span className="gt-team-code">{team.code}</span>
            </div>
            <div className="gt-cell gt-cell--stat">{row.p}</div>
            <div className="gt-cell gt-cell--stat">{row.w}</div>
            <div className="gt-cell gt-cell--stat">{row.d}</div>
            <div className="gt-cell gt-cell--stat">{row.l}</div>
            <div className="gt-cell gt-cell--stat gt-hide-mobile">{row.gf}</div>
            <div className="gt-cell gt-cell--stat gt-hide-mobile">{row.ga}</div>
            <div className="gt-cell gt-cell--stat">{row.gd > 0 ? `+${row.gd}` : row.gd}</div>
            <div className="gt-cell gt-cell--stat gt-cell--pts">{row.pts}</div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="group-table__legend">
        <span className="group-table__legend-item">
          <span className="group-table__legend-dot group-table__legend-dot--green" />
          Qualifies
        </span>
        <span className="group-table__legend-item">
          <span className="group-table__legend-dot group-table__legend-dot--blue" />
          Potential
        </span>
      </div>
    </div>
  );
}
