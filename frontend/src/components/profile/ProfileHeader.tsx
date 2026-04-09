import React from "react";
import { User, Edit3 } from "lucide-react";

interface ProfileHeaderProps {
  isEditing: boolean;
  onEditClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ isEditing, onEditClick }) => {
  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-900/30 text-blue-500 border border-blue-800/30 font-bold shadow-lg shadow-blue-500/10 transition-transform hover:scale-105">
          <User size={32} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          User Profile
        </h1>
        <p className="mt-2 max-w-2xl text-lg text-slate-400">
          Manage your personal information and account security.
        </p>
      </div>

      {!isEditing && (
        <button
          onClick={onEditClick}
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700 transition-all border border-slate-700/50 hover:border-blue-500/30 shadow-lg active:scale-95"
        >
          <Edit3 size={18} /> Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileHeader;
