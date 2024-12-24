import React from "react";
import FeedPost from "./FeedPost";
import { useSelector } from "react-redux";
import { selectFeedPosts } from "@/store/selector";
import Loader from "@/components/shared/Loader";
import { AlertCircle } from "lucide-react";

const FeedPosts = () => {
  const feedPosts = useSelector(selectFeedPosts);
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
      {feedPosts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default FeedPosts;
