"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import UserInfo from "./UserInfo";
import Separator from "@/components/shared/Separator";
import Loader from "@/components/shared/Loader";

const UserProfile: React.FC = () => {
  const userProfile = useSelector((state: RootState) => state.user.userProfile);

  if (userProfile.username === "") {
    return <Loader />;
  }

  return (
    <div className="w-full mx-auto p-4">
      <UserInfo userProfile={userProfile} />
      {/* Separator */}
      <Separator />
      {/* User Posts */}
      {/* <UserPosts /> */}
    </div>
  );
};

export default UserProfile;
