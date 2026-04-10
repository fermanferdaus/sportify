import React from "react";
import { Globe, ExternalLink, MapPin, Users } from "lucide-react";

interface TeamStatsSidebarProps {
  team: any;
}

const TeamStatsSidebar: React.FC<TeamStatsSidebarProps> = ({ team }) => {
  return (
    <div className="space-y-8">
      {/* Quick Connect Registry */}
      <div className="glass-card p-10 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 shadow-2xl group">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] flex items-center gap-3 mb-8">
          <Globe size={14} className="text-blue-600" /> Web Node
        </h3>
        {team.strWebsite && team.strWebsite.trim() !== "" ? (
          <a
            href={`https://${team.strWebsite}`}
            target="_blank"
            rel="noreferrer"
            className="group/link flex items-center justify-between p-7 rounded-[2rem] bg-slate-950 border border-slate-800 hover:bg-blue-600 transition-all duration-500 shadow-xl overflow-hidden relative"
          >
            <div className="relative z-10 flex flex-col gap-1.5">
              <span className="text-[10px] font-black text-slate-500 group-hover/link:text-blue-100 transition-colors uppercase tracking-[0.2em]">
                Domain Portal
              </span>
              <span className="text-sm font-black text-white uppercase tracking-tight truncate max-w-[180px]">
                {team.strWebsite}
              </span>
            </div>
            <div className="relative z-10 h-11 w-11 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover/link:bg-blue-700 group-hover/link:text-white group-hover/link:border-blue-500 transition-all shadow-lg">
              <ExternalLink size={20} />
            </div>
            {/* Animated background on hover */}
            <div className="absolute inset-x-0 bottom-0 h-0 group-hover/link:h-full bg-gradient-to-t from-blue-700/20 to-transparent transition-all duration-500" />
          </a>
        ) : (
          <div className="flex items-center justify-between p-7 rounded-[2rem] bg-slate-900/20 border border-slate-800/50 opacity-60 grayscale cursor-not-allowed">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                Digital Node
              </span>
              <span className="text-sm font-black text-slate-400 uppercase tracking-tight">
                Portal Offline
              </span>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-slate-950/50 border border-slate-800/30 flex items-center justify-center text-slate-700">
              <Globe size={20} className="opacity-30" />
            </div>
          </div>
        )}
      </div>

      {/* Arena Details (Vertical Layout) */}
      <div className="space-y-6">
        <div className="glass-card p-8 rounded-[2.2rem] bg-slate-900/40 border border-slate-800/50 flex items-center gap-7 group hover:bg-slate-800/30 transition-all duration-500 shadow-xl">
          <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-blue-600 shadow-[0_0_25px_rgba(37,99,235,0.3)] text-white border border-blue-400/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
            <MapPin size={28} />
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] block">
              Official Grounds
            </span>
            <h4 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors leading-tight uppercase tracking-tight">
              {team.strStadium || "Elite Grounds"}
            </h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
              {team.strStadiumLocation || team.strLocation}
            </p>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[2.2rem] bg-slate-900/40 border border-slate-800/50 flex items-center gap-7 group hover:bg-slate-800/30 transition-all duration-500 shadow-xl">
          <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-indigo-600 shadow-[0_0_25px_rgba(79,70,229,0.3)] text-white border border-indigo-400/30 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
            <Users size={28} />
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] block">
              Grid Capacity
            </span>
            <h4 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors leading-tight uppercase tracking-tight">
              {team.intStadiumCapacity
                ? Number(team.intStadiumCapacity).toLocaleString()
                : "Limited"}
            </h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
              Attendance Registry
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStatsSidebar;
