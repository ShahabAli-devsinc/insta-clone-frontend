"use client";
import React from "react";
import { useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import Loader from "@/components/shared/Loader";
import ExplorePost from "./ExplorePost";
import { RootState } from "@/store/store";

type ExplorePostsProps = {
  onFetchMore: () => void;
};

const ExplorePosts = ({ onFetchMore }: ExplorePostsProps) => {
  const {
    explorePosts = [],
    postsPagination,
    loading,
  } = useSelector((state: RootState) => state.explore);

  if (!explorePosts) {
    return <Loader />;
  }

  const breakpointColumnsObj = {
    default: Math.min(explorePosts.length, 4),
    1024: Math.min(explorePosts.length, 3),
    768: Math.min(explorePosts.length, 2),
    480: 1,
  };

  const handleLoadMore = () => {
    if (postsPagination.currentPage < postsPagination.totalPages) {
      onFetchMore();
    }
  };

  return (
    <div className="w-full p-4 min-h-screen">
      {loading ? (
        <Loader />
      ) : explorePosts.length === 0 ? (
        <div className="text-center text-gray-500">No posts found.</div>
      ) : (
        <>
          <motion.div
            className="flex w-auto gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex w-auto gap-2"
              columnClassName="flex flex-col gap-2"
            >
              {explorePosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  <ExplorePost post={post} />
                </motion.div>
              ))}
            </Masonry>
          </motion.div>

          {postsPagination.currentPage < postsPagination.totalPages && (
            <motion.div
              className="w-full flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={handleLoadMore}
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#3b82f6",
                }}
                whileTap={{
                  scale: 0.95,
                  backgroundColor: "#2563eb",
                }}
              >
                Load More
              </motion.button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default ExplorePosts;
