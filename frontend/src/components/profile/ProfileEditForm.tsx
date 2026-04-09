import React from "react";
import { User, Lock, RotateCcw } from "lucide-react";
import AuthInput from "../auth/AuthInput";

interface ProfileEditFormProps {
  formData: any;
  setFormData: (data: any) => void;
  isLoading: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  formData,
  setFormData,
  isLoading,
  onCancel,
  onSubmit,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-8 animate-in fade-in slide-in-from-top-2 duration-500"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 ml-1">
            <User size={12} /> Personal Details
          </label>
          <AuthInput
            name="name"
            type="text"
            placeholder="Name"
            icon={User}
            required
            value={formData.name}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800/50">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 ml-1">
            <Lock size={12} /> Security (Leave blank to keep current)
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <AuthInput
              name="current_password"
              type="password"
              placeholder="Current Password"
              icon={Lock}
              value={formData.current_password}
              onChange={handleInputChange}
              disabled={isLoading}
              className="sm:col-span-2"
            />
            <AuthInput
              name="new_password"
              type="password"
              placeholder="New Password"
              icon={Lock}
              value={formData.new_password}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <AuthInput
              name="new_password_confirmation"
              type="password"
              placeholder="Confirm New Password"
              icon={Lock}
              value={formData.new_password_confirmation}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">Saving...</span>
          ) : (
            <span className="flex items-center gap-2">Update Profile</span>
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-6 py-4 text-sm font-bold text-slate-300 hover:bg-slate-700 transition-all border border-slate-700/50 active:scale-95 disabled:opacity-50"
        >
          <RotateCcw size={18} /> Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
