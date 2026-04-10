import React from "react";
import { Info, Trophy } from "lucide-react";
import { useLanguage } from "../../i18n";

interface TeamsEmptyProps {
  type: 'search' | 'database';
  onClear?: () => void;
}

const TeamsEmpty: React.FC<TeamsEmptyProps> = ({ type, onClear }) => {
  const { t } = useLanguage();

  if (type === 'search') {
    return (
      <div className="col-span-full py-24 text-center glass-card rounded-[2.5rem] border-dashed border-slate-800 px-4 animate-in fade-in zoom-in duration-500">
        <Info
          size={56}
          className="mx-auto text-slate-700 mb-6 animate-pulse"
        />
        <p className="text-xl text-slate-300 font-bold uppercase tracking-[0.2em]">
          {t("teams.noClubMatch")}
        </p>
        <p className="text-slate-500 mt-2 font-medium">
          {t("teams.noClubMatchHint")}
        </p>
        {onClear && (
          <button
            onClick={onClear}
            className="mt-8 text-blue-500 font-black uppercase tracking-widest text-[10px] hover:text-blue-400 transition-colors"
          >
            {t("teams.clearSearch")}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="col-span-full py-24 text-center glass-card rounded-[2.5rem] bg-slate-900/20 border border-slate-800 animate-in fade-in zoom-in duration-500">
      <Trophy size={56} className="mx-auto text-slate-800 mb-6" />
      <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-lg">
        {t("teams.noTeams")}
      </p>
    </div>
  );
};

export default TeamsEmpty;
