import React from "react";
import { UserPopulated } from "@/types/types";
import FollowButton from "./FollowButton";
import Image from "next/image";
import { DEFAULT_PROFILE_PIC } from "@/constants/constants";

const StatItem = ({ label, value }: { label: string; value: number }) => (
  <div className="text-center">
    <p className="text-gray-600 text-sm">{label}</p>
    <h2 className="text-sm font-medium">{value}</h2>
  </div>
);

interface ProfileCardProps {
  user: UserPopulated;
}

const UserProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white text-gray-800 rounded-lg">
        {/* Profile Image */}
        <div className="flex justify-center -mt-12">
          <Image
            src={user.profilePicture || DEFAULT_PROFILE_PIC}
            alt="Profile"
            width={100}
            height={100}
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="text-center p-4 flex flex-col justify-start">
          <h1 className="text-lg font-semibold">{user.username}</h1>
          <p className="text-sm text-gray-600 mt-2 truncate">
            {user.bio || "Bio..."}
          </p>

          <div className="mt-4 flex justify-center space-x-3">
            <FollowButton user={user} isExplore={true} />
          </div>

          {/* Stats */}
          <div className="mt-4 flex justify-center gap-6">
            <StatItem label={"Followers"} value={user.followers.length} />
            <StatItem label={"Posts"} value={user.posts.length} />
            <StatItem label={"Following"} value={user.following.length} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
