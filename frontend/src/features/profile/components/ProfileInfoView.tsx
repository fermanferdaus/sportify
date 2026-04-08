import React from "react";
import { Mail, ShieldCheck, Calendar } from "lucide-react";

interface ProfileInfoViewProps {
  user: any;
}

const ProfileInfoView: React.FC<ProfileInfoViewProps> = ({ user }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur-sm">
      <div className="text-center sm:text-left mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{user?.name}</h2>
        <p className="text-slate-400 flex items-center justify-center sm:justify-start gap-2">
          <Mail size={14} className="text-blue-500" />
          {user?.email}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/50 border border-slate-800/50 transition-all hover:border-blue-500/30 group">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Account Status
            </p>
            <p className="text-sm text-green-500 font-medium">Verified User</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/50 border border-slate-800/50 transition-all hover:border-purple-500/30 group">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Joined At
            </p>
            <p className="text-sm text-slate-300 font-medium">April 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoView;
