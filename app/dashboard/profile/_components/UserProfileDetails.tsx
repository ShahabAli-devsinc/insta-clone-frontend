import React, { useState } from "react";
import { UserProfile } from "@/types/types";
import EditProfileModal from "./EditProfileModal";
import UserProfileStateItem from "./UserProfileStatItem";
type UserProfileDetailsProps = {
  userProfile: UserProfile;
};

const UserProfileDetails = ({ userProfile }: UserProfileDetailsProps) => {
  const { username, bio } = userProfile;
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
        <UserProfileStateItem value={13} label="Posts" />
        <UserProfileStateItem value={13} label="Followers" />
        <UserProfileStateItem value={13200} label="Following" />
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
