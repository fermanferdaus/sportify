import React from "react";
import { Trophy, MapPin } from "lucide-react";

interface TeamDetailBannerProps {
  team: any;
}

const TeamDetailBanner: React.FC<TeamDetailBannerProps> = ({ team }) => {
  return (
    <section className="px-4">
      <div className="relative group min-h-[400px] md:min-h-[280px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 flex flex-col justify-end">
        {/* Background Layer: Plain Dark Gradient (No Image) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/10" />

        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full group-hover:bg-blue-600/20 transition-colors duration-1000" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        {/* Identity Content: Internal and relative to parent flow */}
        <div className="relative z-20 flex flex-col md:flex-row items-center md:items-end justify-between gap-10 px-6 md:px-10 pb-8 md:pb-8 pt-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-10">
            {/* Logo with Premium Frame */}
            <div className="h-44 w-44 md:h-56 md:w-56 flex-shrink-0 flex items-center justify-center rounded-[2.2rem] bg-slate-950 border-[10px] border-[#020617] shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-8 group-hover:scale-105 group-hover:-rotate-2 transition-all duration-700 animate-in zoom-in duration-700">
              <img
                src={team.strBadge}
                alt={team.strTeam}
                className="w-full h-full object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]"
              />
            </div>

            {/* Text Identity */}
            <div className="text-center md:text-left md:pb-4 space-y-4 animate-in slide-in-from-left-8 duration-700 delay-200">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-gradient leading-[0.9] pb-2">
                {team.strTeam}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.25em] shadow-lg shadow-blue-500/10 transition-all hover:bg-blue-500/25">
                  <Trophy size={14} className="animate-pulse" />{" "}
                  {team.strLeague}
                </div>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/80 border border-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] backdrop-blur-md">
                  <MapPin size={14} className="text-blue-500" />{" "}
                  {team.strLocation}
                </div>
              </div>
            </div>
          </div>

          {/* Year Formed Badge (Sidebar of the header) */}
          <div className="hidden lg:flex flex-col items-end gap-1 pb-4 opacity-40 group-hover:opacity-80 transition-all duration-700 animate-in slide-in-from-right-8 duration-700 delay-300">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">
              Established Since
            </span>
            <span className="text-6xl font-black text-white tracking-widest leading-none">
              {team.intFormedYear}
            </span>
          </div>
        </div>
      </div>
    </section>

  );
};

export default TeamDetailBanner;
