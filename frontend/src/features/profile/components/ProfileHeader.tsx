import React from "react";

interface ProfileHeaderProps {
  isEditing: boolean;
  onEditClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ isEditing, onEditClick }) => {
  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-2">
          User Profile
        </h1>
        <p className="text-slate-400">
          Manage your account information and activities.
        </p>
      </div>
      {!isEditing && (
        <button
          onClick={onEditClick}
          className="w-fit flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileHeader;
