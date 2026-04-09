import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface TeamDetailHeaderProps {
  team: any;
  leagueName: string | undefined;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const TeamDetailHeader: React.FC<TeamDetailHeaderProps> = ({
  team,
  leagueName,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <section className="flex items-center justify-between pt-2 md:pt-2 px-4 z-30 relative">
      <Link
        to={
          leagueName
            ? `/leagues/${encodeURIComponent(leagueName)}/teams`
            : team?.strLeague
              ? `/leagues/${encodeURIComponent(team.strLeague)}/teams`
              : "/"
        }
        className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group"
      >
        <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 group-hover:border-blue-500/50 group-hover:bg-slate-800 transition-all shadow-lg">
          <ChevronLeft size={18} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:block">
          Back to Teams
        </span>
      </Link>

      {/* Mini Breadcrumb Consistent with Elite design */}
      <div className="px-3 md:px-5 py-2 rounded-full bg-slate-900/50 border border-slate-800/80 backdrop-blur-md text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2 md:gap-3 shadow-2xl">
        <span className="truncate max-w-[80px] md:max-w-none hover:text-slate-300 transition-colors cursor-default">
          {leagueName || team?.strLeague}
        </span>
        <ChevronRight size={10} className="text-slate-700" />
        <span className="text-blue-500 truncate max-w-[100px] md:max-w-none">
          {team?.strTeam}
        </span>
      </div>

      {/* Favorite Toggle Action */}
      <button
        onClick={onToggleFavorite}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl border transition-all duration-300 group ${
          isFavorite
            ? "bg-rose-500/10 border-rose-500/30 text-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.15)]"
            : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300 shadow-xl"
        }`}
      >
        <Heart
          size={18}
          className={`transition-transform duration-300 ${
            isFavorite ? "fill-rose-500 scale-110" : "group-hover:scale-110"
          }`}
        />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:block">
          {isFavorite ? "Favorited" : "Add favorite"}
        </span>
      </button>
    </section>
  );
};

export default TeamDetailHeader;
