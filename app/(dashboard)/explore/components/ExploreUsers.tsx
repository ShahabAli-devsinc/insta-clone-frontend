"use client";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Loader from "@/components/shared/Loader";
import { RootState } from "@/store/store";
import UserProfileCard from "@/components/shared/UserProfileCard";

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
    <div className="p-6 bg-gray-50 rounded-lg mb-4 mt-10 mx-0">
      {loading ? (
        <Loader />
      ) : exploreUsers.length === 0 ? (
        <div className="text-center text-gray-500">No users found.</div>
      ) : (
        <>
          {/* User Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {exploreUsers.map((user, index) => (
              <motion.div
                key={user.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 mb-10"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                <UserProfileCard user={user} />
              </motion.div>
            ))}
          </motion.div>

          {/* Load More Button */}
          {usersPagination.currentPage < usersPagination.totalPages ? (
            <motion.div
              className="w-full flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={handleLoadMore}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#3b82f6",
                }}
                whileTap={{
                  scale: 0.95,
                  backgroundColor: "#2563eb",
                }}
              >
                Load More Users
              </motion.button>
            </motion.div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ExploreUsers;
