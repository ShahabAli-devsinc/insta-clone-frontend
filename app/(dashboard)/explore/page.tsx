"use client";
import React, { useEffect } from "react";
import ExploreMain from "./components/ExploreMain";
import { useDispatch } from "react-redux";
import { exploreApi } from "@/services/exploreApi";
import { setExplorePosts } from "@/store/features/exploreSlice";

const Explore = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchExplorePosts = async () => {
      try {
        const posts = await exploreApi.getExplorePosts();
        dispatch(setExplorePosts(posts));
      } catch (error) {
        console.error("Failed to fetch explore posts:", error);
      }
    };
    fetchExplorePosts();
  }, []);
  return (
    <div>
      <ExploreMain />
    </div>
  );
};

export default Explore;
