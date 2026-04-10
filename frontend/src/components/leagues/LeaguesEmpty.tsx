import React from 'react';
import { Info, Globe } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface LeaguesEmptyProps {
  type: 'search' | 'database';
  onClear?: () => void;
}

const LeaguesEmpty: React.FC<LeaguesEmptyProps> = ({ type, onClear }) => {
  const { t } = useLanguage();

  if (type === 'search') {
    return (
      <div className="col-span-full py-20 text-center glass-card rounded-[2.5rem] border-dashed border-slate-800 px-4 animate-in fade-in zoom-in duration-500">
        <Info
          size={48}
          className="mx-auto text-slate-700 mb-4 animate-pulse"
        />
        <p className="text-xl text-slate-300 font-bold uppercase tracking-widest">
          {t("leagues.noMatch")}
        </p>
        <p className="text-slate-500 mt-2">
          {t("leagues.noMatchHint")}
        </p>
        {onClear && (
          <button
            onClick={onClear}
            className="mt-6 text-blue-500 font-bold hover:underline"
          >
            {t("leagues.clearSearch")}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="col-span-full py-20 text-center animate-in fade-in zoom-in duration-500">
      <Globe size={48} className="mx-auto text-slate-700 mb-4" />
      <p className="text-xl text-slate-500 font-bold uppercase tracking-widest">
        {t("leagues.noDatabase")}
      </p>
    </div>
  );
};

export default LeaguesEmpty;
