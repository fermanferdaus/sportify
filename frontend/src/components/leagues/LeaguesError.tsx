import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface LeaguesErrorProps {
  onRetry: () => void;
}

const LeaguesError: React.FC<LeaguesErrorProps> = ({ onRetry }) => {
  const { t } = useLanguage();
  return (
    <div className="rounded-3xl border border-red-900/40 bg-red-950/20 p-12 text-center backdrop-blur-sm max-w-2xl mx-auto my-12 animate-in fade-in zoom-in duration-500">
      <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 text-red-500 border border-red-500/20">
        <Globe size={40} className="animate-pulse" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{t("leagues.connectionIssue")}</h3>
      <p className="text-slate-400 mb-8 leading-relaxed">
        {t("leagues.connectionDesc")}
      </p>
      <button
        onClick={onRetry}
        className="rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-8 py-3.5 text-sm font-bold text-white hover:scale-105 transition-all shadow-lg shadow-red-600/20 active:scale-95"
      >
        {t("leagues.tryAgain")}
      </button>
    </div>
  );
};

export default LeaguesError;
