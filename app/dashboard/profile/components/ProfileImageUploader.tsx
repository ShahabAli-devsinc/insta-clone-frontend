import React, { useRef, useState } from "react";

interface ProfileImageUploaderProps {
  currentImage: string;
  onImageChange: (file: File | null) => void;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  currentImage,
  onImageChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(currentImage);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageChange(file); // Pass the file back to EditProfileModal
    }
  };

  const handleRemoveImage = () => {
    setPreview(currentImage);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src={preview}
        alt="Profile Preview"
        className="w-24 h-24 rounded-full object-cover mb-2"
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        id="profile-image-upload"
      />
      <label
        htmlFor="profile-image-upload"
        className={`cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm`}
      >
        Change Image
      </label>
      {preview !== currentImage && (
        <button
          type="button"
          onClick={handleRemoveImage}
          className="mt-2 text-red-500 text-sm"
        >
          Remove Image
        </button>
      )}
    </div>
  );
};

export default ProfileImageUploader;
