import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { updateProfile } from "../../authSlice";
import heic2any from "heic2any";

export const useProfileUpdate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-hide success/error messages
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Sync name when user state changes
  useEffect(() => {
    if (user?.name) {
      setFormData((prev) => ({ ...prev, name: user.name }));
    }
  }, [user]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      let processFile = file;

      if (
        file.name.toLowerCase().endsWith(".heic") ||
        file.type === "image/heic"
      ) {
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.8,
        });

        const blobArray = Array.isArray(convertedBlob)
          ? convertedBlob[0]
          : convertedBlob;
        processFile = new File(
          [blobArray],
          file.name.replace(/\.[^/.]+$/, "") + ".jpg",
          {
            type: "image/jpeg",
          },
        );
      }

      setSelectedFile(processFile);
      setPreviewImage(URL.createObjectURL(processFile));
    } catch (err) {
      setError("Failed to process iPhone image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const data = new FormData();
    data.append("name", formData.name);

    if (formData.new_password) {
      if (formData.new_password !== formData.new_password_confirmation) {
        setError("The new passwords do not match. Please ensure both fields are identical.");
        setIsLoading(false);
        return;
      }
      data.append("current_password", formData.current_password);
      data.append("new_password", formData.new_password);
      data.append(
        "new_password_confirmation",
        formData.new_password_confirmation,
      );
    }

    if (selectedFile) {
      data.append("profile_picture", selectedFile);
    }

    try {
      await dispatch(updateProfile(data)).unwrap();
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      setFormData((prev) => ({
        ...prev,
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      }));
      setSelectedFile(null);
      setPreviewImage(null);
    } catch (err: any) {
      setError(err || "An error occurred while updating your profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPreviewImage(null);
    setSelectedFile(null);
    setFormData({
      name: user?.name || "",
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    });
    setError(null);
  };

  return {
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
  };
};
