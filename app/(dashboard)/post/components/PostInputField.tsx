import React, { useRef, DragEvent, useState } from "react";
import { Field, ErrorMessage } from "formik";
import Image from "next/image";

interface PostInputFieldProps {
  label: string;
  name: string;
  type?: string;
  as?: string;
  accept?: string;
  rows?: number;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  preview?: string | null;
  setPreview?: (value: string | null) => void;
  render?: ({ field }: { field: any }) => React.ReactNode; // Add this
}

const PostInputField: React.FC<PostInputFieldProps> = ({
  label,
  name,
  type = "text",
  as,
  accept,
  rows,
  placeholder,
  onChange,
  preview,
  setPreview,
  render,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];

      // Create a mock event with both target and currentTarget
      const event = {
        target: {
          files: [file],
        },
        currentTarget: {
          files: [file],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      onChange && onChange(event);
      e.dataTransfer.clearData();
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    if (setPreview) {
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onChange && onChange({ target: { files: [] } } as any);
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-2 text-lg font-medium text-gray-700">
        {label}
      </label>
      {as === "textarea" ? (
        <>
          <Field
            as="textarea"
            id={name}
            name={name}
            rows={rows}
            maxLength={70}
            placeholder={placeholder}
            className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-colors duration-300"
          />
        </>
      ) : type === "file" ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className={`flex h-64 flex-col items-center justify-center p-6 border-2 ${
            isDragActive
              ? "border-indigo-500 bg-indigo-50"
              : "border-dashed border-gray-300"
          } rounded-lg shadow-sm cursor-pointer hover:border-indigo-500 transition-all duration-300`}
        >
          {!preview ? (
            <>
              <svg
                className="w-12 h-12 text-gray-400 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 004 4h6a4 4 0 004-4V8a4 4 0 00-4-4H7a4 4 0 00-4 4v8z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 12v.01"
                />
              </svg>
              <p className="text-gray-600">
                Drag & Drop image here or click to upload
              </p>
            </>
          ) : (
            <div className="relative">
              <Image
                src={preview}
                alt="Preview"
                width={16}
                height={9}
                className="rounded-lg object-cover h-48 w-full shadow-md"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                aria-label="Remove image"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
          <input
            ref={fileInputRef}
            id={name}
            name={name}
            type={type}
            accept={accept}
            onChange={onChange}
            className="hidden"
          />
        </div>
      ) : (
        <Field
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
        />
      )}
      <ErrorMessage
        name={name}
        component="p"
        className="mt-2 text-sm text-red-500"
      />
    </div>
  );
};

export default PostInputField;
