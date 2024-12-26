import React, { useEffect, useState } from "react";
import UserPost from "./UserPostComponents/UserPost";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { PostApi } from "@/services/postApi";
import { appendUserPosts, setUserPosts } from "@/store/features/postSlice";
import Loader from "@/components/shared/Loader";
import { Post } from "@/types/types";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const UserPosts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, total } = useSelector((state: RootState) => state.post);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const fetchPosts = async (isLoadMore = false) => {
    const { data, total } = await PostApi.fetchAll(offset, limit);

    if (isLoadMore) {
      dispatch(appendUserPosts(data));
    } else {
      dispatch(setUserPosts({ posts: data, total }));
    }
    setOffset(offset + limit);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!posts) {
    return <Loader />;
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-600 mt-4">
        <Link href={"/post"}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 mb-4 text-gray-400 hover:text-blue-500 transition-transform duration-300 ease-out"
          >
            <PlusCircle />
          </motion.div>
        </Link>
        <h2 className="text-2xl font-semibold">No Posts Yet</h2>
        <p className="text-sm text-gray-500 mt-2">
          Create your first post now!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Post Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {posts.map((post: Post, index) => (
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
            <UserPost post={post} />
          </motion.div>
        ))}
      </motion.div>

      {posts.length < total && (
        <motion.div
          className="flex justify-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={() => fetchPosts(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
    </div>
  );
};

export default UserPosts;
