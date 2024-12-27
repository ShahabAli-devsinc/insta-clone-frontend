import React from "react";
import FeedPost from "./FeedPost";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Loader from "@/components/shared/Loader";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

type FeedPostsProps = {
  onLoadMore: () => void;
};

const FeedPosts = ({ onLoadMore }: FeedPostsProps) => {
  const { feedPosts, currentPage, totalPages, loading } = useSelector(
    (state: RootState) => state.feed
  );

  if (!feedPosts) {
    return <Loader />;
  }

  if (feedPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <AlertCircle className="w-16 h-16 mb-4 text-gray-400" />

        <h2 className="text-2xl font-semibold">No Posts Yet</h2>
        <p className="text-sm text-gray-500 mt-2">
          Start following people to see posts here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-2">
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {feedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <FeedPost post={post} />
          </motion.div>
        ))}
      </motion.div>

      {currentPage < totalPages ? (
        <motion.div
          className="w-full flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={onLoadMore}
            className="my-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
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
      ) : null}
    </div>
  );
};

export default FeedPosts;
