import React from "react";
import { FaSpinner } from "react-icons/fa";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  loading = false,
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-3 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 transition-opacity duration-200 ${
        loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
      } ${className}`}
      disabled={loading}
      aria-busy={loading}
      aria-disabled={loading}
      {...props}
    >
      {loading ? (
        <FaSpinner className="animate-spin text-white" aria-hidden="true" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
