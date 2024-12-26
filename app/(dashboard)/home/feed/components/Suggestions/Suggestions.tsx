import React, { useEffect, useState } from "react";
import UserSuggestionCard from "./UserSuggestionCard";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPlatformUsers, selectUserProfile } from "@/store/selector";
import Loader from "@/components/shared/Loader";
import { followApi } from "@/services/followApi";
import { setFollowing } from "@/store/features/followSlice";
import { Post } from "@/types/types";

const Suggestions = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllPlatformUsers);
  const currentUser = useSelector(selectUserProfile);
  const [currentUserFollowingList, setCurrentUserFollowingList] = useState<
    Post[]
  >([]);
  if (!users) {
    return <Loader />;
  }

  // Filter out users who are already being followed by the current user
  const filteredUsers = users
    .filter(
      (user) =>
        !currentUserFollowingList.some((following) => following.id === user.id)
    )
    .slice(0, 5);

  useEffect(() => {
    const fetchData = async (userId: number) => {
      const following = await followApi.fetchFollowing(userId);
      dispatch(setFollowing(following));
      setCurrentUserFollowingList(following);
    };
    fetchData(currentUser.id);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Suggestions For You</h2>
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <UserSuggestionCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
