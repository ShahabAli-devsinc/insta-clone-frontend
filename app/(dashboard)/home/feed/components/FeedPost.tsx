"use client";
import LikeCommentBox from "@/app/(dashboard)/profile/components/UserPostComponents/LikeCommentBox";
import PostCaption from "@/app/(dashboard)/profile/components/UserPostComponents/PostCaption";
import React, { useState } from "react";
import CommentsModal from "./CommentsModal";
import { Post } from "@/types/types";
import Image from "next/image";

type FeedPostProps = {
  post: Post;
};

const FeedPost = ({ post }: FeedPostProps) => {
  const user = post.user;
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const openCommentsModal = () => setIsCommentsModalOpen(true);
  const closeCommentsModal = () => setIsCommentsModalOpen(false);

  return (
    <div className="flex justify-center p-2 w-full">
      <div className="bg-white border rounded-md">
        <div className="flex items-center px-4 py-3">
          <Image
            className="h-8 w-8 rounded-full"
            width={100}
            height={100}
            src={user.profilePicture}
            alt={user.username}
          />
          <div className="ml-3 ">
            <span className="text-sm font-semibold antialiased block leading-tight">
              {user.username}
            </span>
            <span className="text-gray-600 text-xs block"></span>
          </div>
        </div>
        <Image
          src={post.imageUrl}
          alt={post.caption}
          width={500}
          height={500}
          className="h-[500px] w-[500px] object-cover"
        />
        <div className="p-3">
          <LikeCommentBox
            postId={post.id}
            isProfile={false}
            comments={post.comments}
            likes={post.likes}
            onOpen={openCommentsModal}
          />{" "}
          <PostCaption
            postId={post.id}
            username={user.username}
            caption={post.caption}
            feed={true}
          />
          <div className="mt-2">
            <button
              onClick={openCommentsModal}
              className="text-gray-400  hover:text-gray-600 font-light focus:outline-none"
            >
              View all {post.comments?.length ? post.comments?.length : ""}{" "}
              comments
            </button>
          </div>
          {/* Comments Modal */}
          {isCommentsModalOpen ? (
            <CommentsModal
              isProfile={false}
              postId={post.id}
              comments={post.comments}
              onClose={closeCommentsModal}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FeedPost;
