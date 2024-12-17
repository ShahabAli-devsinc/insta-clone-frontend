// components/shared/Button.tsx
import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  loading,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-3 bg-blue-500 text-white rounded-lg ${
        loading ? "opacity-50" : ""
      }`}
      disabled={loading}
    >
      {loading ? `${children}...` : children}
    </button>
  );
};

export default Button;
