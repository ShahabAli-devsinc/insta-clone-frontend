import React from "react";
import UserPost from "./UserPostComponents/UserPost";
import { useSelector } from "react-redux";
import { selectUserPosts } from "@/store/selector";
import Loader from "@/components/shared/Loader";
import { Post } from "@/types/types";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const UserPosts = () => {
  const posts: Post[] = useSelector(selectUserPosts);

  if (!posts) {
    return <Loader />;
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-600">
        <Link href={"/post"}>
          <PlusCircle className="w-16 h-16 mb-4 text-gray-400 hover:scale-110 hover:text-blue-500 transition-transform duration-300 ease-out" />
        </Link>
        <h2 className="text-2xl font-semibold">No Posts Yet</h2>
        <p className="text-sm text-gray-500 mt-2">
          Create your first post now!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mt-4">
      {posts.map((post: Post) => (
        <div key={post.id}>
          <UserPost post={post} />
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
