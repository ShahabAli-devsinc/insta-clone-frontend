import React from "react";

interface AvatarProps {
  src: string;
  alt: string;
  size?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = "w-36 h-36" }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover border ${size}`}
    />
  );
};

export default Avatar;
