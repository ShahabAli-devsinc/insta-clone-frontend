"use client";
import React from "react";
import { useSelector } from "react-redux";
import Loader from "@/components/shared/Loader";
import UserSuggestionCard from "../../home/feed/components/Suggestions/UserSuggestionCard";
import { RootState } from "@/store/store";

type ExploreUsersProps = {
  onFetchMore: () => void;
};

const ExploreUsers = ({ onFetchMore }: ExploreUsersProps) => {
  const { exploreUsers, usersPagination, loading } = useSelector(
    (state: RootState) => state.explore
  );

  const handleLoadMore = () => {
    if (usersPagination.currentPage < usersPagination.totalPages) {
      onFetchMore();
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg mb-4 mt-0 mx-0">
      {loading ? (
        <Loader />
      ) : exploreUsers.length === 0 ? (
        <div className="text-center text-gray-500">No users found.</div>
      ) : (
        <>
          {/* User Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exploreUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <UserSuggestionCard user={user} />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {usersPagination.currentPage < usersPagination.totalPages ? (
            <button
              onClick={handleLoadMore}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Load More Users
            </button>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ExploreUsers;
