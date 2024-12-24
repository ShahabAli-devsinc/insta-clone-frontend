import React from "react";
import Avatar from "@/components/shared/Avatar";
import { UserProfile } from "@/types/types";
import UserProfileDetails from "./UserProfileDetails";

type UserInfoProps = {
  userProfile: UserProfile;
};

const UserInfo = ({ userProfile }: UserInfoProps) => {
  const { username, profilePicture } = userProfile;

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
        <Avatar src={profilePicture} alt={`${username}'s avatar`} />
        <UserProfileDetails userProfile={userProfile} />
      </div>
    </div>
  );
};

export default UserInfo;
