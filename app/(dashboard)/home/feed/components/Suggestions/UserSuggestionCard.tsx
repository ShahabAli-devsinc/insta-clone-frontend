import Avatar from "@/components/shared/Avatar";
import FollowButton from "@/components/shared/FollowButton";
import { DEFAULT_PROFILE_PIC } from "@/constants";
import { User } from "@/types";
import React from "react";

type UserSuggestionCardProps = {
  user: User;
};

const UserSuggestionCard = ({ user }: UserSuggestionCardProps) => {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:shadow">
      <div className="flex items-center">
        <Avatar
          src={user.profilePicture || DEFAULT_PROFILE_PIC}
          alt={user.username}
          size="h-8 w-8"
          width={100}
          height={100}
        />
        <div className="ml-3 text-sm">
          <p className="font-medium">{user.username}</p>
        </div>
      </div>
      <FollowButton user={user} />
    </div>
  );
};

export default UserSuggestionCard;
