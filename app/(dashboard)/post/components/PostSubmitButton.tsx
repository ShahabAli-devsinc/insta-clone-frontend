import React from "react";

interface PostSubmitButtonProps {
  text: string;
  isLoading?: boolean;
}

const PostSubmitButton: React.FC<PostSubmitButtonProps> = ({
  text,
  isLoading = false,
}) => (
  <button
    type="submit"
    className={`w-[30%] py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-600 transition flex items-center justify-center ${
      isLoading ? "opacity-50 cursor-not-allowed" : ""
    }`}
    disabled={isLoading}
  >
    {isLoading ? (
      <svg
        className="animate-spin mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
    ) : null}
    {text}
  </button>
);

export default PostSubmitButton;
