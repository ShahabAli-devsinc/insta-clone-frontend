import React, { useCallback, useState } from "react";
import ProfileImageUploader from "./ProfileImageUploader";
import { MAX_BIO_LENGTH } from "@/constants/constants";
import { UserProfile } from "@/types/types";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "@/store/features/userSlice";
import { apiUpdateProfile } from "@/services/userApi";
import { toast } from "sonner";

interface EditProfileModalProps {
  isOpen: boolean;
  userProfile: UserProfile;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  userProfile,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { username, email, profilePicture, bio } = userProfile;

  const [newProfileImageUrl, setNewProfileImageUrl] = useState<string>(
    profilePicture || ""
  );
  const [newUsername, setNewUsername] = useState<string>(username || "");
  const [newBio, setNewBio] = useState<string>(bio || "");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const validateUsername = useCallback((username: string) => {
    if (username.length < 5) {
      setUsernameError("Username must be at least 5 characters long.");
      return false;
    } else if (username.length > 20) {
      setUsernameError("Username cannot exceed 20 characters.");
      return false;
    }
    setUsernameError(null);
    return true;
  }, []);

  const handleSave = async () => {
    if (!validateUsername(newUsername)) {
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      const updateData: Partial<UserProfile> = {};

      if (newUsername !== userProfile.username) {
        updateData.username = newUsername;
      }
      if (newBio !== userProfile.bio) {
        updateData.bio = newBio;
      }
      if (newProfileImageUrl !== userProfile.profilePicture) {
        updateData.profilePicture = newProfileImageUrl;
      }
      await apiUpdateProfile({
        ...updateData,
      });

      dispatch(
        updateUserProfile({
          username: newUsername,
          bio: newBio,
          profilePicture: newProfileImageUrl,
        })
      );

      onClose();
      toast("Profile updated successfully!");
    } catch (err: any) {
      console.error("Update profile error:", err);
      toast("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-11/12 md:w-1/2 p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <div className="flex flex-col items-center space-y-4">
          <ProfileImageUploader
            currentImage={profilePicture}
            onImageChange={setNewProfileImageUrl}
          />
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => {
                setNewUsername(e.target.value);
                validateUsername(e.target.value);
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {usernameError && (
              <p className="text-red-500 text-sm mt-1">{usernameError}</p>
            )}
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
              maxLength={MAX_BIO_LENGTH}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <p className="text-xs text-gray-500">
              {newBio.length}/{MAX_BIO_LENGTH}
            </p>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 px-4 py-2 text-white rounded"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
              isSaving || usernameError ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSaving || usernameError !== null}
          >
            {isSaving ? "Saving..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;