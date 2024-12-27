import React, { useState } from "react";
import { User, UserProfile, UserStat } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { DEFAULT_PROFILE_PIC } from "@/constants";
import EditProfileModal from "./EditProfileModal";
import { selectFollowers, selectFollowing } from "@/store/selector";
import FollowStatListModal from "@/app/(dashboard)/profile/components/UserInfoComponents/FollowStatListModal";
import Image from "next/image";

const StatItem = ({
  label,
  value,
  onOpen,
}: {
  label: string;
  value: number;
  onOpen?: (stat: string) => void;
}) => (
  <li
    onClick={() => onOpen && onOpen(label)}
    className={`text-center px-1 py-1 ${
      onOpen
        ? "cursor-pointer hover:scale-105 hover:bg-gray-200 rounded-md duration-300 transition-transform ease-in-out"
        : "hover:scale"
    }`}
  >
    <span className="font-semibold">{value}</span>&nbsp;{label}
  </li>
);

const UserMeta = ({ username, bio }: { username: string; bio: string }) => (
  <div className="flex flex-col justify-center items-center sm:items-start sm:justify-start">
    <h1 className="font-light italic mb-2 text-gray-600">@{username}</h1>
    <span>{bio}</span>
  </div>
);

type UserInfoProps = {
  userProfile: UserProfile;
};

const UserInfo = ({ userProfile }: UserInfoProps) => {
  const { total: totalPosts } = useSelector((state: RootState) => state.post);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const following = useSelector(selectFollowing);
  const followers = useSelector(selectFollowers);
  const [isFollowStatModalOpen, setIsFollowStatModalOpen] =
    useState<boolean>(false);
  const [followStatModalData, setFollowStatModalData] = useState<User[]>([]);
  const [statIdentifier, setStatIdentifier] = useState<string>("");
  const openFollowStatModal = (stat: string) => {
    setFollowStatModalData(stat === UserStat.Following ? following : followers);
    setStatIdentifier(stat);
    setIsFollowStatModalOpen(true);
  };

  const closeFollowStatModal = () => {
    setFollowStatModalData([]);
    setIsFollowStatModalOpen(false);
  };

  return (
    <main className="bg-gray-100 bg-opacity-25 md:border-b">
      <div className="w-full lg:w-full lg:mx-auto my-2">
        <header className="flex flex-col sm:flex-row items-center sm:justify-center p-4 md:py-8">
          <div className="md:w-[25%]">
            <Image
              className="w-32 h-32 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-full border-2 border-pink-600 p-1 ml-4 sm:ml-0 mb-2 sm:mb-0"
              src={userProfile.profilePicture || DEFAULT_PROFILE_PIC}
              alt="profile"
              width={100}
              height={100}
            />
          </div>

          <div className="w-8/12 md:w-7/12 md:ml-6 sm:ml-8 ml-4">
            <div className="flex flex-col items-center sm:flex-row sm:items-center md:flex-row mb-4 gap-2">
              <h2 className="text-3xl inline-block font-light md:mr-2 sm:mb-0">
                {userProfile.username}
              </h2>

              <button
                className=" bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-md text-white text-sm"
                onClick={() => setIsModalOpen(true)}
              >
                Edit Profile
              </button>
              <EditProfileModal
                userProfile={userProfile}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>

            <ul className="hidden md:flex space-x-8 mb-4">
              <StatItem label={UserStat.Post} value={totalPosts} />
              <StatItem
                label={UserStat.Followers}
                value={followers.length}
                onOpen={openFollowStatModal}
              />
              <StatItem
                label={UserStat.Following}
                value={following.length}
                onOpen={openFollowStatModal}
              />
            </ul>

            {isFollowStatModalOpen ? (
              <FollowStatListModal
                followData={followStatModalData}
                onClose={closeFollowStatModal}
                stat={statIdentifier}
              />
            ) : null}

            <div className="hidden md:block">
              <UserMeta
                username={userProfile.username}
                bio={userProfile.bio || "Edit profile and add bio..."}
              />
            </div>

            <div className="md:hidden text-sm my-2">
              <UserMeta
                username={userProfile.username}
                bio={userProfile.bio || "Edit profile and add bio..."}
              />
            </div>
          </div>
        </header>

        <div className="px-px md:px-3">
          <ul
            className="flex md:hidden justify-around space-x-8 border-t border-b
              text-center p-2 text-gray-900 leading-snug text-base py-4"
          >
            <StatItem label="posts" value={totalPosts} />
            <StatItem label="followers" value={followers.length} />
            <StatItem label="following" value={following.length} />
          </ul>
        </div>
      </div>
    </main>
  );
};

export default UserInfo;
