import React from "react";
import { Info } from "lucide-react";

interface StandingsTableProps {
  standings: any[];
  status: string;
  targetTeamId: string;
}

const StandingsTable: React.FC<StandingsTableProps> = ({ standings, status, targetTeamId }) => {
  return (
    <section className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl bg-slate-900/40 backdrop-blur-xl">
      <div className="p-10 md:p-14 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-10 w-1.5 bg-yellow-500 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.3)]" />
          <h2 className="text-2xl font-black text-white tracking-[0.3em] uppercase text-sm">
            League Grid Sync
          </h2>
        </div>
        <div className="px-6 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3 shadow-inner">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Live: 2024/25 Season
          </span>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[750px]">
          <thead>
            <tr className="bg-slate-900 shadow-sm text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] border-b border-slate-800/50">
              <th className="px-12 py-10 w-24 text-center">Rank</th>
              <th className="px-6 py-10">Entity</th>
              <th className="px-4 py-10 text-center text-slate-600">P</th>
              <th className="px-4 py-10 text-center text-green-500/50">W</th>
              <th className="px-4 py-10 text-center text-slate-600">D</th>
              <th className="px-4 py-10 text-center text-red-500/50">L</th>
              <th className="px-6 py-10 text-center text-white">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/30 font-bold">
            {status === "loading" ? (
              <tr>
                <td colSpan={7} className="py-32 text-center">
                  <div className="flex flex-col items-center gap-6">
                    <div className="h-14 w-14 border-4 border-slate-800 border-t-blue-600 rounded-[1.2rem] animate-spin" />
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] animate-pulse">
                      Aggregating Global Standings...
                    </span>
                  </div>
                </td>
              </tr>
            ) : standings && standings.length > 0 ? (
              standings.map((row) => {
                const isTarget = row.idTeam === targetTeamId;
                return (
                  <tr
                    key={row.idTeam}
                    className={`transition-all duration-300 ${isTarget ? "bg-blue-600/15" : "hover:bg-white/[0.03]"}`}
                  >
                    <td className="px-12 py-7">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-xl text-xs font-black shadow-lg ${
                          isTarget 
                            ? "bg-blue-600 text-white shadow-blue-600/20" 
                            : "text-slate-500 border border-slate-800 bg-slate-950/50"
                        }`}
                      >
                        {row.intRank}
                      </div>
                    </td>
                    <td className="px-6 py-7">
                      <div className="flex items-center gap-5">
                        <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                          <img
                            src={row.strBadge}
                            alt=""
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                        <span
                          className={`text-base tracking-tight uppercase ${
                            isTarget 
                              ? "text-blue-400 font-black tracking-tighter" 
                              : "text-slate-300 font-bold"
                          }`}
                        >
                          {row.strTeam}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-7 text-center text-slate-500 font-medium">
                      {row.intPlayed}
                    </td>
                    <td className="px-4 py-7 text-center text-green-500/60 font-medium">
                      {row.intWin}
                    </td>
                    <td className="px-4 py-7 text-center text-slate-600 font-medium">
                      {row.intDraw}
                    </td>
                    <td className="px-4 py-7 text-center text-red-500/60 font-medium">
                      {row.intLoss}
                    </td>
                    <td className="px-6 py-7 text-center font-black text-white text-xl">
                      {row.intPoints}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-32 text-center bg-slate-900/20">
                  <div className="flex flex-col items-center gap-8 max-w-sm mx-auto">
                    <div className="h-20 w-20 flex items-center justify-center rounded-3xl bg-slate-950 border border-slate-800 text-slate-700 shadow-2xl">
                      <Info size={40} strokeWidth={1} />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-lg font-black text-white uppercase tracking-widest leading-none">
                        Registry Not Found
                      </h4>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-relaxed">
                        Official standings data for this sport category is
                        currently restricted or unavailable.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default StandingsTable;
