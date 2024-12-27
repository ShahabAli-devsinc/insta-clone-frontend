import React, { useState } from "react";
import { UserProfile } from "@/types/types";
import EditProfileModal from "./EditProfileModal";
import UserProfileStateItem from "./UserProfileStatItem";
import { useSelector } from "react-redux";
import {selectFollowers, selectFollowing } from "@/store/selector";
type UserProfileDetailsProps = {
  userProfile: UserProfile;
  totalPosts: number;
};

const UserProfileDetails = ({
  userProfile,
  totalPosts,
}: UserProfileDetailsProps) => {
  const { username, bio } = userProfile;
  const following = useSelector(selectFollowing);
  const followers = useSelector(selectFollowers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center md:items-start gap-2">
      <div className="flex gap-4">
        <h4 className="text-lg font-bold">{username}</h4>
        <button
          className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-md text-white text-sm"
          onClick={() => setIsModalOpen(true)}
        >
          Edit Profile
        </button>
      </div>
      <div className="flex items-center justify-center gap-12 md:gap-8 p-2 px-0">
        <UserProfileStateItem value={totalPosts} label="Posts" />
        <UserProfileStateItem value={followers.length} label="Followers" />
        <UserProfileStateItem value={following.length} label="Following" />
      </div>

      <div className="">
        <p className="text-gray-700">{bio}</p>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        userProfile={userProfile}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default UserProfileDetails;
