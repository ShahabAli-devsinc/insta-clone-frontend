import React, { useRef, useState } from "react";

interface ProfileImageUploaderProps {
  currentImage: string;
  onImageChange: (url: string) => void;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  currentImage,
  onImageChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(currentImage);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uploadStagedFile = async (stagedFile: File | Blob) => {
    const form = new FormData();
    form.set("file", stagedFile);

    try {
      setIsUploading(true);
      setError(null); // Reset error state
      const res = await fetch("/api/cloudinary-uploads", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await res.json();

      if (data.imgUrl) {
        setPreview(data.imgUrl);
        onImageChange(data.imgUrl);
      } else {
        throw new Error("Image URL not returned");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      uploadStagedFile(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(currentImage);
    onImageChange(currentImage);
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
        className={`cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm ${
          isUploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isUploading ? "Uploading..." : "Change Image"}
      </label>
      {preview !== currentImage && !isUploading && (
        <button
          type="button"
          onClick={handleRemoveImage}
          className="mt-2 text-red-500 text-sm"
        >
          Remove Image
        </button>
      )}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};

export default ProfileImageUploader;
