import React from "react";
import { Mail, User as UserIcon, Calendar } from "lucide-react";

interface ProfileInfoViewProps {
  user: any;
}

const ProfileInfoView: React.FC<ProfileInfoViewProps> = ({ user }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-sm animate-in fade-in duration-500">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <div className="h-6 w-1 bg-blue-600 rounded-full" />
        Basic Information
      </h3>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <UserIcon size={12} /> Full Name
          </label>
          <p className="text-lg text-white font-semibold">{user?.name || "N/A"}</p>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <Mail size={12} /> Email Address
          </label>
          <p className="text-lg text-white font-semibold">{user?.email || "N/A"}</p>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <Calendar size={12} /> Account Type
          </label>
          <p className="text-lg text-blue-400 font-semibold uppercase tracking-tighter">Standard Account</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoView;
