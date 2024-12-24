import React from "react";
import FeedPost from "./FeedPost";
import { useSelector } from "react-redux";
import { selectFeedPosts } from "@/store/selector";
import Loader from "@/components/shared/Loader";
import { AlertCircle } from "lucide-react";
import { RootState } from "@/store/store";

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
      {/* {loading ? <Loader /> : null} */}

      {feedPosts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
      {currentPage < totalPages ? (
        <button
          onClick={onLoadMore}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Load More
        </button>
      ) : null}
    </div>
  );
};

export default FeedPosts;
