"use client";
import React, { useEffect } from "react";
import FeedPosts from "./components/FeedPosts";
import Suggestions from "./components/Suggestions/Suggestions";
import { useDispatch, useSelector } from "react-redux";
import { feedApi } from "@/services/feedApi";
import {
  setUserFeedPosts,
  addFeedPosts,
  setPagination,
  setLoading,
} from "@/store/features/feedSlice";
import { AppDispatch, RootState } from "@/store/store";
import { setAllPlatformUsers } from "@/store/features/userSlice";
import { UserApi } from "@/services/userApi";

const fetchPlatformUsers = async (dispatch: AppDispatch) => {
  try {
    const platformUsers = await UserApi.getAllPlatformUsers();

    dispatch(setAllPlatformUsers(platformUsers));
  } catch (error: any) {
    console.error("Error occurred while fetching users");
  }
};

const Feed = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, totalPages } = useSelector(
    (state: RootState) => state.feed
  );

  const fetchFeed = async (page: number, limit: number) => {
    try {
      dispatch(setLoading(true));
      const { posts, total } = await feedApi.getUserFeed(page, limit);
      if (page === 1) {
        dispatch(setUserFeedPosts(posts));
      } else {
        dispatch(addFeedPosts(posts));
      }
      dispatch(
        setPagination({
          currentPage: page,
          totalPages: Math.ceil(total / limit),
        })
      );
    } catch (error) {
      console.error("Failed to fetch feed posts:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchFeed(1, 10);
    fetchPlatformUsers(dispatch);
  }, []);

  const loadMorePosts = () => {
    if (currentPage < totalPages) {
      fetchFeed(currentPage + 1, 10);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2">
      {/* FeedPosts Section */}
      <div className="w-full lg:w-[70%] border-r">
        <FeedPosts onLoadMore={loadMorePosts} />
      </div>

      {/* Suggestions Section */}
      <div className="hidden lg:block md:w-[30%]">
        <Suggestions />
      </div>
    </div>
  );
};

export default Feed;
