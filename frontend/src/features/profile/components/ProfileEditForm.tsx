import React from "react";
import { User, Lock, Loader2 } from "lucide-react";

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
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur-sm space-y-6"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 ml-1">
            Full Name
          </label>
          <div className="relative">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/50 mt-8">
          <h3 className="text-sm font-bold text-blue-400 mb-6 flex items-center gap-2 uppercase tracking-widest">
            <Lock size={16} /> Security Settings
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs text-slate-400 ml-1 uppercase tracking-widest font-bold">
                Current Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                <input
                  type="password"
                  value={formData.current_password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      current_password: e.target.value,
                    })
                  }
                  placeholder="Enter current password to verify"
                  className="w-full bg-slate-950/40 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-400 ml-1 uppercase tracking-widest font-bold">
                New Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                <input
                  type="password"
                  value={formData.new_password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      new_password: e.target.value,
                    })
                  }
                  placeholder="Minimum 8 characters"
                  className="w-full bg-slate-950/40 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-400 ml-1 uppercase tracking-widest font-bold">
                Confirm New Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                <input
                  type="password"
                  value={formData.new_password_confirmation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      new_password_confirmation: e.target.value,
                    })
                  }
                  placeholder="Repeat new password"
                  className="w-full bg-slate-950/40 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3.5 rounded-2xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-[2] px-6 py-3.5 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
