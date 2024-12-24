"use client";
import React from "react";
import UserInfo from "./UserInfo";
import Separator from "@/components/shared/Separator";
import Loader from "@/components/shared/Loader";
import UserPosts from "./UserPosts";
import { UserProfile as UserProfileType } from "@/types/types";

type UserProfileProps = {
  userProfile: UserProfileType;
};

const UserProfile = ({ userProfile }: UserProfileProps) => {
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
