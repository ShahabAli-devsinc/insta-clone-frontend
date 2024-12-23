// // components/PostSubmitButton.tsx
// import React from "react";

// interface PostSubmitButtonProps {
//   text: string;
//   isLoading?: boolean;
// }

// const PostSubmitButton: React.FC<PostSubmitButtonProps> = ({
//   text,
//   isLoading = false,
// }) => (
//   <button
//     type="submit"
//     className={`w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 flex items-center justify-center ${
//       isLoading ? "cursor-not-allowed opacity-70" : ""
//     }`}
//     disabled={isLoading}
//   >
//     {isLoading ? (
//       <svg
//         className="w-6 h-6 mr-3 animate-spin text-white"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//       >
//         <circle
//           className="opacity-25"
//           cx="12"
//           cy="12"
//           r="10"
//           stroke="currentColor"
//           strokeWidth="4"
//         ></circle>
//         <path
//           className="opacity-75"
//           fill="currentColor"
//           d="M4 12a8 8 0 018-8v8H4z"
//         ></path>
//       </svg>
//     ) : null}
//     {text}
//   </button>
// );

// export default PostSubmitButton;

// components/PostSubmitButton.tsx
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
    className={`w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition flex items-center justify-center ${
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
