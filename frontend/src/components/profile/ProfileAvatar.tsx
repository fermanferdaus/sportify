import React from "react";
import { Camera, User, Loader2 } from "lucide-react";

interface ProfileAvatarProps {
  user: any;
  isEditing: boolean;
  previewImage: string | null;
  isLoading: boolean;
  onImageClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  user,
  isEditing,
  previewImage,
  isLoading,
  onImageClick,
  fileInputRef,
  handleImageChange,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div className="relative group">
        <div 
          className={`h-32 w-32 rounded-3xl border-2 overflow-hidden bg-slate-950 flex items-center justify-center transition-all duration-300 ${
            isEditing ? "border-blue-500 ring-4 ring-blue-500/10 cursor-pointer hover:border-blue-400" : "border-slate-800"
          }`}
          onClick={isEditing ? onImageClick : undefined}
        >
          {previewImage || user?.profile_picture ? (
            <img
              src={previewImage || user.profile_picture}
              alt="Profile"
              className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? "opacity-30" : "opacity-100"}`}
            />
          ) : (
            <User size={48} className="text-slate-700" />
          )}

          {isEditing && (
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <Camera size={32} className="text-white" />
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 size={32} className="text-blue-500 animate-spin" />
            </div>
          )}
        </div>

        {isEditing && (
          <button
            onClick={onImageClick}
            className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-blue-600 text-white shadow-lg hover:bg-blue-500 transition-all border border-blue-400/30"
          >
            <Camera size={16} />
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
        accept="image/*,.heic"
      />

      <div className="text-center">
        <h2 className="text-xl font-bold text-white uppercase tracking-tight">{user?.name}</h2>
        <p className="text-sm text-slate-500 mt-1">{user?.email}</p>
      </div>
    </div>
  );
};

export default ProfileAvatar;
