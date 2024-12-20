"use client";
import React from "react";
import { useSelector } from "react-redux";
import UserInfo from "./UserInfo";
import Separator from "@/components/shared/Separator";
import Loader from "@/components/shared/Loader";
import { selectUserProfile } from "@/store/selector";
import UserPosts from "./UserPosts";

const UserProfile: React.FC = () => {
  const userProfile = useSelector(selectUserProfile);

  if (userProfile.username === "") {
    return <Loader />;
  }

  return (
    <div className="w-full mx-auto p-4">
      <UserInfo userProfile={userProfile} />
      {/* Separator */}
      <Separator />
      {/* User Posts */}
      <UserPosts />
    </div>
  );
};

export default UserProfile;
