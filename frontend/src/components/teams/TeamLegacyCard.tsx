import React from "react";
import { History } from "lucide-react";
import { useLanguage } from "../../i18n";

interface TeamLegacyCardProps {
  team: any;
}

const TeamLegacyCard: React.FC<TeamLegacyCardProps> = ({ team }) => {
  const { t, locale } = useLanguage();

  const legacyIntro = t("teams.legacyIntro")
    .replace("{location}", team.strLocation)
    .replace("{league}", team.strLeague)
    .replace("{team}", team.strTeam)
    .replace("{year}", team.intFormedYear);

  return (
    <section className="glass-card p-10 md:p-14 rounded-[2.5rem] relative overflow-hidden group shadow-2xl bg-gradient-to-br from-slate-900/60 to-slate-900/40 border border-slate-800/50">
      <div className="absolute -top-10 -right-10 p-12 text-blue-500/5 group-hover:text-blue-500/10 transition-all duration-1000 rotate-12">
        <History size={240} strokeWidth={1} />
      </div>
      
      <div className="relative z-10 space-y-10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-1.5 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
          <h2 className="text-2xl font-black text-white tracking-[0.3em] uppercase text-sm">
            {t("teams.legacyRegistry")}
          </h2>
        </div>

        <div className="space-y-8">
          <p className="text-slate-300 leading-relaxed text-xl md:text-2xl font-black italic border-l-4 border-blue-500/40 pl-8 py-3 bg-blue-500/5 rounded-r-2xl">
            {legacyIntro}
          </p>
          
          <div className="grid gap-8 text-slate-400 leading-loose font-medium text-lg">
            {(locale === "id" ? team.strDescriptionEN : team.strDescriptionEN)
              ?.split("\n")
              .filter((p: string) => p.trim())
              .slice(0, 3)
              .map((para: string, i: number) => (
                <p key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-700 delay-[400ms]">
                  {para}
                </p>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamLegacyCard;
