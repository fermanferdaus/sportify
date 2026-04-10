import React from "react";
import { Heart, Loader2 } from "lucide-react";
import { useLanguage } from "../../i18n";

interface ProfileStatsProps {
  favoritesCount: number;
  favoritesStatus: string;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ favoritesCount, favoritesStatus }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <div className="h-6 w-1 bg-blue-600 rounded-full" />
        {t("profile.accountStats")}
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/50 border border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
              <Heart size={20} fill="currentColor" />
            </div>
            <span className="text-slate-300 font-medium">{t("profile.favoriteTeams")}</span>
          </div>
          <span className="text-2xl font-bold text-white">
            {favoritesStatus === "loading" ? (
              <Loader2 size={18} className="animate-spin text-slate-500" />
            ) : (
              favoritesCount
            )}
          </span>
        </div>

        {/* Placeholder for more stats if needed in the future */}
        <div className="p-4 rounded-2xl bg-slate-950/10 border border-dashed border-slate-800/30">
          <p className="text-xs text-slate-500 text-center uppercase tracking-widest font-bold">
            {t("profile.moreStats")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
