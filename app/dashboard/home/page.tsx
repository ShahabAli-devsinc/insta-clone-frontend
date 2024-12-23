"use client";
import React, { useEffect } from "react";
import Feed from "./feed/Feed";
import { feedApi } from "@/services/feedApi";
import { useDispatch } from "react-redux";
import { setUserFeedPosts } from "@/store/features/feedSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchFeed = async () => {
      const feedPosts = await feedApi.getUserFeed();
      dispatch(setUserFeedPosts(feedPosts));
    };

    fetchFeed();
  }, []);

  return (
    <div className="border-r mt-6 ">
      <Feed />
    </div>
  );
};

export default Home;
