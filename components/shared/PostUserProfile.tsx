import { DEFAULT_PROFILE_PIC } from "@/constants";
import { User } from "@/types";
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
              : DEFAULT_PROFILE_PIC
          }
          alt={`${user.username}'s profile`}
          width={100}
          height={100}
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
