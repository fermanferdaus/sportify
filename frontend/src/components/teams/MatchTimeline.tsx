import React from "react";
import { Calendar, MapPin } from "lucide-react";

interface MatchTimelineProps {
  matches: any[];
  status: string;
  formatToWIB: (timestamp?: string, defaultTime?: string) => string;
}

const MatchTimeline: React.FC<MatchTimelineProps> = ({
  matches,
  status,
  formatToWIB,
}) => {
  return (
    <div className="glass-card p-10 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 shadow-2xl">
      <div className="flex items-center justify-between mb-12">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">
          Season Fixtures
        </h3>
        <div className="p-2 rounded-xl bg-slate-950/50 text-slate-700">
          <Calendar size={20} />
        </div>
      </div>

      <div className="space-y-10">
        {status === "loading" ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 bg-slate-800/20 rounded-[2rem] animate-pulse border border-slate-800/30"
              />
            ))}
          </div>
        ) : matches && matches.length > 0 ? (
          matches.slice(0, 5).map((m: any) => (
            <div key={m.idEvent} className="pb-10 last:pb-0 border-b border-white/5 last:border-0 group/item">
              <div className="transition-all cursor-default group-hover/item:translate-x-2 duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[9px] font-black text-blue-500 uppercase tracking-widest">
                    Live Session
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">
                    {formatToWIB(m.strTimestamp, m.strTime)}
                  </span>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm sm:text-base font-black tracking-tight text-white group-hover/item:text-blue-400 transition-colors">
                    <span className="uppercase overflow-hidden">
                      {m.strHomeTeam}
                    </span>
                    <span className="flex-shrink-0 px-3 py-1.5 bg-slate-950/50 border border-slate-800/50 text-[9px] sm:text-[10px] rounded-xl text-slate-500 font-black shadow-inner">
                      VS
                    </span>
                    <span className="text-right uppercase overflow-hidden">
                      {m.strAwayTeam}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2.5 text-[10px] font-bold text-slate-700 uppercase tracking-widest group-hover/item:text-slate-500 transition-colors">
                  <MapPin size={12} className="text-blue-600/50" /> 
                  <span className="truncate">{m.strVenue || "Arena Registered"}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 text-center glass-card rounded-[2.5rem] border-dashed border-slate-800/30 bg-slate-950/10">
            <p className="text-[11px] font-black text-slate-700 uppercase tracking-[0.3em] italic">
              Registry Vacant
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchTimeline;
