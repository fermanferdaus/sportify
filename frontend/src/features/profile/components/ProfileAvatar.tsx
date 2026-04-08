import React from "react";
import { Camera, Loader2 } from "lucide-react";

interface ProfileAvatarProps {
  user: any;
  previewImage: string | null;
  isLoading: boolean;
  isEditing: boolean;
  onImageClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  user,
  previewImage,
  isLoading,
  isEditing,
  onImageClick,
  fileInputRef,
  handleImageChange,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div
        className={`relative group ${isEditing ? "cursor-pointer" : ""}`}
        onClick={isEditing ? onImageClick : undefined}
      >
        <div
          className={`flex items-center justify-center rounded-3xl text-white font-bold border-4 overflow-hidden shadow-2xl transition-transform ${
            isEditing
              ? "h-28 w-28 text-3xl border-slate-700 bg-slate-800 group-hover:scale-105"
              : "h-24 w-24 text-3xl border-blue-900/30 bg-blue-600 shadow-blue-600/20"
          }`}
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : user?.profile_picture ? (
            <img
              src={user.profile_picture}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            getInitials(user?.name || "")
          )}

          {isEditing && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white" size={24} />
            </div>
          )}
        </div>

        {isEditing && (
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*,.heic"
            onChange={handleImageChange}
          />
        )}

        {isLoading && (
          <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-xl shadow-lg animate-spin">
            <Loader2 size={16} className="text-white" />
          </div>
        )}
      </div>
      {isEditing && (
        <p className="text-xs text-slate-500">
          Click to change photo (UHD/iPhone support)
        </p>
      )}
    </div>
  );
};

export default ProfileAvatar;
