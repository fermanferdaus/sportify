import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { fetchFavorites } from "../../features/favoritesSlice";
import { X, Check } from "lucide-react";

// Feature Imports
import { useProfileUpdate } from "../../features/profile/hooks/useProfileUpdate";
import ProfileHeader from "../../features/profile/components/ProfileHeader";
import ProfileStats from "../../features/profile/components/ProfileStats";
import ProfileAvatar from "../../features/profile/components/ProfileAvatar";
import ProfileInfoView from "../../features/profile/components/ProfileInfoView";
import ProfileEditForm from "../../features/profile/components/ProfileEditForm";
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
  } = useProfileUpdate();

  useEffect(() => {
    if (favoritesStatus === "idle") {
      dispatch(fetchFavorites());
    }
  }, [favoritesStatus, dispatch]);

  if (isLoading && !user) {
    return <PageLoader message="Loading profile data..." />;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-20">
      <ProfileHeader
        isEditing={isEditing}
        onEditClick={() => setIsEditing(true)}
      />

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
          <X size={18} /> {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-3">
          <Check size={18} /> {success}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          {isEditing ? (
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur-sm">
                <ProfileAvatar
                  user={user}
                  isEditing={isEditing}
                  previewImage={previewImage}
                  isLoading={isLoading}
                  onImageClick={() => fileInputRef.current?.click()}
                  fileInputRef={fileInputRef}
                  handleImageChange={handleImageChange}
                />
                <ProfileEditForm
                  formData={formData}
                  setFormData={setFormData}
                  isLoading={isLoading}
                  onCancel={handleCancel}
                  onSubmit={handleSubmit}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <ProfileAvatar
                user={user}
                isEditing={false}
                previewImage={null}
                isLoading={false}
                onImageClick={() => {}}
                fileInputRef={{ current: null } as any}
                handleImageChange={() => {}}
              />
              <ProfileInfoView user={user} />
            </div>
          )}
        </div>

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
