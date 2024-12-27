import React, { useEffect, useState } from "react";
import UserSuggestionCard from "./UserSuggestionCard";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPlatformUsers, selectUserProfile } from "@/store/selector";
import Loader from "@/components/shared/Loader";
import { followApi } from "@/services/followApi";
import { setFollowing } from "@/store/features/followSlice";
import { UserPopulated } from "@/types";
import { Globe2 } from "lucide-react";
import Link from "next/link";

const Suggestions = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllPlatformUsers);
  const currentUser = useSelector(selectUserProfile);
  const [filteredUsers, setFilteredUsers] = useState<UserPopulated[]>(
    users || []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser || !users) return;

      // Fetch current user's following list
      const following = await followApi.fetchFollowing(currentUser.id);
      dispatch(setFollowing(following));

      // Filter out already-followed users
      const filtered = users
        .filter(
          (user) => !following.some((f: UserPopulated) => f.id === user.id)
        )
        .slice(0, 5);

      setFilteredUsers(filtered || []);
      setIsLoading(false);
    };

    fetchData();
  }, [currentUser, users, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Suggestions For You</h2>
      <div className="flex flex-col justify-center items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-lg bg-white">
        {filteredUsers.length === 0 ? (
          <p className="w-full text-center text-sm text-gray-500">
            No suggestions yet. Start exploring!
          </p>
        ) : (
          <div className="w-full flex flex-col gap-2 justify-between">
            {filteredUsers.map((user) => (
              <UserSuggestionCard key={user.id} user={user} />
            ))}
          </div>
        )}

        <div className="flex flex-col items-center gap-2">
          <Link
            href={"/explore"}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white text-sm font-semibold rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            <Globe2 className="text-white w-5 h-5" />
            Explore Now
          </Link>
          <p className="text-xs text-gray-400">
            Discover amazing content curated just for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
