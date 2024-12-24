import { User } from "@/types/types";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

type PostProfileProps = {
  user: User;
  onClose?: () => void;
};

const PostUserProfile = ({ user, onClose }: PostProfileProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex gap-2 items-center">
        <Image
          src={
            user.profilePicture?.trim() !== ""
              ? user.profilePicture
              : "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
          }
          alt={`${user.username}'s profile`}
          width={40}
          height={40}
          className="rounded-[50%] h-[40px] w-[40px]"
        />
        <span className="font-semibold">{user.username}</span>
      </div>
      {onClose ? (
        <X onClick={onClose} className="cursor-pointer hover:text-red-900" />
      ) : null}
    </div>
  );
};

export default PostUserProfile;
