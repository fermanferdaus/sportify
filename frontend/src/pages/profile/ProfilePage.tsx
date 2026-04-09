import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { fetchFavorites } from "../../features/favoritesSlice";
import { X, Check } from "lucide-react";
import { useProfile } from "../../hooks/useProfile";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileAvatar from "../../components/profile/ProfileAvatar";
import ProfileInfoView from "../../components/profile/ProfileInfoView";
import ProfileEditForm from "../../components/profile/ProfileEditForm";
import PageLoader from "../../components/ui/PageLoader";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: favorites, status: favoritesStatus } = useSelector(
    (state: RootState) => state.favorites,
  );

  const {
    user,
    isEditing,
    setIsEditing,
    isLoading,
    error,
    success,
    formData,
    setFormData,
    previewImage,
    fileInputRef,
    handleImageChange,
    handleSubmit,
    handleCancel,
  } = useProfile();

  useEffect(() => {
    if (favoritesStatus === "idle") {
      dispatch(fetchFavorites());
    }
  }, [favoritesStatus, dispatch]);

  if (isLoading && !user) {
    return <PageLoader message="Loading data..." />;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-20 px-4">
      {/* Page Header */}
      <ProfileHeader
        isEditing={isEditing}
        onEditClick={() => setIsEditing(true)}
      />

      {/* Global Notifications */}
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3 animate-in shake duration-300">
          <X size={18} /> {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <Check size={18} /> {success}
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid gap-8 md:grid-cols-3">
        {/* Left/Main Column: Avatar and Forms */}
        <div className="md:col-span-2 space-y-8">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-1 bg-gradient-to-br from-slate-800/20 via-transparent to-blue-500/5">
            <div className="p-8 rounded-[2.85rem] bg-slate-900/60 backdrop-blur-xl">
              <ProfileAvatar
                user={user}
                isEditing={isEditing}
                previewImage={previewImage}
                isLoading={isLoading}
                onImageClick={() => fileInputRef.current?.click()}
                fileInputRef={fileInputRef}
                handleImageChange={handleImageChange}
              />
              
              {isEditing ? (
                <ProfileEditForm
                  formData={formData}
                  setFormData={setFormData}
                  isLoading={isLoading}
                  onCancel={handleCancel}
                  onSubmit={handleSubmit}
                />
              ) : (
                <ProfileInfoView user={user} />
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Stats */}
        <div className="md:col-span-1">
          <ProfileStats
            favoritesCount={favorites.length}
            favoritesStatus={favoritesStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
