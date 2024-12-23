import React from "react";
import UserPost from "./UserPostComponents/UserPost";
import { useSelector } from "react-redux";
import { selectUserPosts } from "@/store/selector";
import Loader from "@/components/shared/Loader";
import { Post } from "@/types/types";

const UserPosts = () => {
  const posts: Post[] = useSelector(selectUserPosts);

  if (!posts) {
    return <Loader />;
  }

  if (posts.length === 0) {
    return <h3>No Posts Yet</h3>;
  }

  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mt-4">
      {sortedPosts.map((post: Post) => (
        <div key={post.id}>
          <UserPost post={post} />
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
