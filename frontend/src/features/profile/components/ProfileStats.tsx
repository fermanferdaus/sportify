import React from "react";
import { Heart, Loader2 } from "lucide-react";

interface ProfileStatsProps {
  favoritesCount: number;
  favoritesStatus: string;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ favoritesCount, favoritesStatus }) => {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-rose-900/20 bg-rose-950/5 p-6 backdrop-blur-sm transition-all hover:bg-rose-950/10 group">
        <div className="flex items-center justify-between mb-4">
          <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-rose-600/10 text-rose-500 group-hover:scale-110 transition-transform">
            <Heart size={24} fill="currentColor" />
          </div>
          <span className="text-3xl font-bold text-white">
            {favoritesStatus === "loading" ? (
              <Loader2 className="h-6 w-6 animate-spin text-rose-500" />
            ) : (
              favoritesCount
            )}
          </span>
        </div>
        <p className="text-sm font-semibold text-rose-300 uppercase tracking-wider">
          Favorite Teams
        </p>
        <p className="text-xs text-rose-300/60 mt-1">
          Teams you are currently following.
        </p>
      </div>

      <div className="rounded-3xl border border-blue-900/20 bg-blue-950/5 p-6 backdrop-blur-sm">
        <p className="text-sm font-semibold text-blue-400 mb-4 px-2 tracking-wide uppercase text-xs">
          Session Information
        </p>
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-slate-950/30 text-xs text-slate-400 flex justify-between">
            <span>Last Login</span>
            <span className="text-slate-200">Just now</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/30 text-xs text-slate-400 flex justify-between">
            <span>Device</span>
            <span className="text-slate-200">Chrome / Windows</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
