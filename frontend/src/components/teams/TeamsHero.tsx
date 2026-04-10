import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Users } from "lucide-react";
import { useLanguage } from "../../i18n";

interface TeamsHeroProps {
  leagueName: string;
  teamCount: number;
}

const TeamsHero: React.FC<TeamsHeroProps> = ({ leagueName, teamCount }) => {
  const { t } = useLanguage();
  return (
    <section className="relative pt-2 pb-12 px-4 z-10 overflow-visible">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 mb-8 transition-colors group"
      >
        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 group-hover:border-blue-500/50 transition-all">
          <ChevronLeft size={16} />
        </div>
        <span className="text-xs font-black uppercase tracking-[0.2em]">
          {t("teams.backToLeagues")}
        </span>
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
            <Users size={12} /> {teamCount} {t("teams.teamsRegistered")}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight text-gradient">
            {leagueName} <span className="text-white">{t("teams.clubs")}</span>
          </h1>
          <p className="text-slate-400 max-w-xl text-lg mb-0 text-balance font-medium leading-relaxed">
            {t("teams.teamsHeroDesc")} {leagueName}.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamsHero;
