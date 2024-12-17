"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const UserProfile = () => {
  const userProfile = useSelector((state: RootState) => state.user.userProfile);

  return <div></div>;
};

export default UserProfile;
