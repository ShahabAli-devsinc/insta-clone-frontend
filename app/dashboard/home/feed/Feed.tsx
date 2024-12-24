import React from "react";
import FeedPosts from "./components/FeedPosts";
import Suggestions from "./components/Suggestions/Suggestions";

const Feed = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      {/* FeedPosts Section */}
      <div className="w-full md:w-[70%] border-r">
        <FeedPosts />
      </div>

      {/* Suggestions Section */}
      <div className="hidden md:block md:w-[30%]">
        <Suggestions />
      </div>
    </div>
  );
};

export default Feed;
