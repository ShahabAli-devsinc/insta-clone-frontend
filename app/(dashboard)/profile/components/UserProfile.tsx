"use client";
import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import Separator from "@/components/shared/Separator";
import Loader from "@/components/shared/Loader";
import UserPosts from "./UserPosts";
import { UserProfile as UserProfileType } from "@/types";

type UserProfileProps = {
  userProfile: UserProfileType;
};

const UserProfile = ({ userProfile }: UserProfileProps) => {
  // if (userProfile.username === "") {
  //   return <Loader />;
  // }
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    if (userProfile.username) {
      setIsLoading(false);
    }
  }, [userProfile]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full mx-auto p-4">
      <UserInfo userProfile={userProfile} />

      <UserPosts />
    </div>
  );
};

export default UserProfile;
