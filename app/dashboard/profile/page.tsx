"use client";
import React, { useEffect } from "react";
import UserProfile from "./components/UserProfile";
import { PostApi } from "@/services/postApi";
import { useDispatch } from "react-redux";
import { setUserPosts } from "@/store/features/postSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await PostApi.fetchAll();
      dispatch(setUserPosts(posts));
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <UserProfile />
    </div>
  );
};
export default ProfilePage;
