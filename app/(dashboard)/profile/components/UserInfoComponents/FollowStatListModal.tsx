import FollowStatUserCard from "@/app/(dashboard)/profile/components/UserInfoComponents/FollowStatUserCard";
import { User } from "@/types/types";
import { X } from "lucide-react";
import React from "react";

type FollowStatListProps = {
  followData: User[];
  onClose: () => void;
  stat: string;
};

const FollowStatListModal = ({
  followData,
  onClose,
  stat,
}: FollowStatListProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 max-h-[600px]">
        <X
          onClick={onClose}
          className="absolute right-1 top-1 text-sm text-gray-700 cursor-pointer hover:text-gray-900 hover:scale-105"
        />
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-2">{stat}</h2>
        </div>
        {followData.map((item) => (
          <div className="mb-2">
            <FollowStatUserCard user={item} stat={stat} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowStatListModal;
