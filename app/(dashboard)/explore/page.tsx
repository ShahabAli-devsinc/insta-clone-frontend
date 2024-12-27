"use client";
import React, { useEffect } from "react";
import ExploreMain from "./components/ExploreMain";
import { useDispatch, useSelector } from "react-redux";
import { exploreApi } from "@/services/exploreApi";
import {
  setError,
  setExplorePosts,
  setLoading,
} from "@/store/features/exploreSlice";
import { selectUserProfile } from "@/store/selector";
import { followApi } from "@/services/followApi";
import { setFollowing } from "@/store/features/followSlice";
import { AppDispatch } from "@/store/store";
import { ApiError } from "next/dist/server/api-utils";

const fetchData = async (userId: number, dispatch: AppDispatch) => {
  try {
    const [following, posts] = await Promise.all([
      followApi.fetchFollowing(userId),
      exploreApi.getExplorePosts(),
    ]);

    dispatch(setFollowing(following));
    dispatch(setExplorePosts(posts));
  } catch (error) {
    const apiError = error as ApiError;
    const errorMessage = apiError.message || "Failed to fetch data.";
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
};

const Explore = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUserProfile);
  useEffect(() => {
    if (!currentUser) return;
    fetchData(currentUser.id, dispatch);
  }, []);
  return (
    <div>
      <ExploreMain />
    </div>
  );
};

export default Explore;
