"use client";
import React, { useEffect } from "react";
import UserProfile from "./components/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { followApi } from "@/services/followApi";
import {
  setError,
  setFollowers,
  setFollowing,
  setLoading,
} from "@/store/features/followSlice";
import { selectUserProfile } from "@/store/selector";
import { AppDispatch } from "@/store/store";

const fetchFollowData = async (userId: number, dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const [followers, following] = await Promise.all([
      followApi.fetchFollowers(userId),
      followApi.fetchFollowing(userId),
    ]);

    dispatch(setFollowers(followers));
    dispatch(setFollowing(following));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector(selectUserProfile);

  useEffect(() => {
    if (userProfile?.id) {
      fetchFollowData(userProfile.id, dispatch);
    }
  }, []);
  return (
    <div>
      <UserProfile userProfile={userProfile} />
    </div>
  );
};
export default ProfilePage;
