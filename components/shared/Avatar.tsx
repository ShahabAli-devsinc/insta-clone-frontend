import Image from "next/image";
import React from "react";

interface AvatarProps {
  src: string;
  alt: string;
  size?: string;
  width: number;
  height: number;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = "w-36 h-36",
  width,
  height,
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-full object-cover border ${size}`}
    />
  );
};

export default Avatar;
