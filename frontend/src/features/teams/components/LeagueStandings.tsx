import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { Trophy, Info } from 'lucide-react';

interface LeagueStandingsProps {
  currentTeamId?: string;
}

const LeagueStandings: React.FC<LeagueStandingsProps> = ({ currentTeamId }) => {
  const { standings, status } = useSelector((state: RootState) => state.sports);

  if (status === 'loading' && standings.length === 0) {
    return (
      <div className="flex justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (standings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-800 p-10 text-center">
        <p className="text-slate-500 italic">No league standings data available.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-blue-900/20 bg-slate-900/20 backdrop-blur-sm shadow-xl">
      <div className="flex items-center gap-3 p-6 border-b border-blue-900/20 bg-blue-900/5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
          <Trophy size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">League Standings</h3>
          <p className="text-xs text-slate-400">Current Season 2024-2025</p>
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800/50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <th className="px-6 py-4">Pos</th>
              <th className="px-6 py-4">Team</th>
              <th className="px-6 py-4 text-center">P</th>
              <th className="px-6 py-4 text-center">W</th>
              <th className="px-6 py-4 text-center">D</th>
              <th className="px-6 py-4 text-center">L</th>
              <th className="px-6 py-4 text-center">GD</th>
              <th className="px-6 py-4 text-center font-bold text-blue-500 bg-blue-500/5">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/30">
            {standings.map((item) => (
              <tr 
                key={item.idTeam}
                className={`transition-colors hover:bg-slate-800/30 ${
                  item.idTeam === currentTeamId 
                    ? 'bg-blue-600/10 border-l-4 border-l-blue-600' 
                    : ''
                }`}
              >
                <td className="px-6 py-4 font-mono text-xs font-bold text-slate-400">
                  {item.intRank.padStart(2, '0')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 font-semibold text-slate-200">
                    <img src={item.strBadge} alt="" className="h-6 w-6 object-contain" />
                    <span className="truncate max-w-[150px] sm:max-w-none">{item.strTeam}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-slate-400">{item.intPlayed}</td>
                <td className="px-6 py-4 text-center text-emerald-500/80">{item.intWin}</td>
                <td className="px-6 py-4 text-center text-slate-400">{item.intDraw}</td>
                <td className="px-6 py-4 text-center text-rose-500/80">{item.intLoss}</td>
                <td className="px-6 py-4 text-center text-slate-400">{item.intGoalDifference}</td>
                <td className={`px-6 py-4 text-center font-bold ${
                  item.idTeam === currentTeamId ? 'text-blue-400' : 'text-slate-200'
                } bg-blue-500/5`}>
                  {item.intPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-slate-950/20 flex items-center gap-2 text-[10px] text-slate-500">
        <Info size={12} />
        <span>P: Played | W: Win | D: Draw | L: Loss | GD: Goal Difference | Pts: Points</span>
      </div>
    </div>
  );
};

export default LeagueStandings;
