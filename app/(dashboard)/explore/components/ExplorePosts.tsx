"use client";
import React from "react";
import { useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import Loader from "@/components/shared/Loader";
import ExplorePost from "./ExplorePost";
import { RootState } from "@/store/store";

type ExplorePostsProps = {
  onFetchMore: () => void;
};

const ExplorePosts = ({ onFetchMore }: ExplorePostsProps) => {
  const { explorePosts, postsPagination, loading } = useSelector(
    (state: RootState) => state.explore
  );

  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    480: 1,
  };

  const handleLoadMore = () => {
    if (postsPagination.currentPage < postsPagination.totalPages) {
      onFetchMore();
    }
  };

  return (
    <div className="p-4">
      {loading ? (
        <Loader />
      ) : explorePosts.length === 0 ? (
        <div className="text-center text-gray-500">No posts found.</div>
      ) : (
        <>
          {/* Masonry Grid */}
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto gap-2"
            columnClassName="flex flex-col gap-2"
          >
            {explorePosts.map((post) => (
              <ExplorePost key={post.id} post={post} />
            ))}
          </Masonry>

          {/* Load More Button */}
          {postsPagination.currentPage < postsPagination.totalPages ? (
            <button
              onClick={handleLoadMore}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Load More Posts
            </button>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ExplorePosts;
