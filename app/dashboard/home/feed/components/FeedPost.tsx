"use client";
import LikeCommentBox from "@/app/dashboard/profile/components/UserPostComponents/LikeCommentBox";
import PostCaption from "@/app/dashboard/profile/components/UserPostComponents/PostCaption";
import PostUserProfile from "@/components/shared/PostUserProfile";
import Image from "next/image";
import React, { useState } from "react";
import CommentsModal from "./CommentsModal";
import { Post } from "@/types/types";

type FeedPostProps = {
  post: Post;
};

const FeedPost = ({ post }: FeedPostProps) => {
  const user = post.user;
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const openCommentsModal = () => setIsCommentsModalOpen(true);
  const closeCommentsModal = () => setIsCommentsModalOpen(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <PostUserProfile user={user} />
      <Image
        src={post.imageUrl}
        alt={"Post"}
        width={400}
        height={300}
        className="object-cover rounded-lg mb-2 w-full h-[400px]"
      />
      <LikeCommentBox
        postId={post.id}
        isProfile={false}
        comments={post.comments}
        likes={post.likes}
        openCommentsModal={openCommentsModal}
      />
      <PostCaption
        postId={post.id}
        username={user.username}
        caption={post.caption}
        feed={true}
      />

      <div className="mt-2">
        <button
          onClick={openCommentsModal}
          className="text-blue-500 hover:text-blue-700 font-light focus:outline-none"
        >
          See Comments
        </button>
      </div>

      {/* Comments Modal */}
      {isCommentsModalOpen && (
        <CommentsModal
          isProfile={false}
          postId={post.id}
          comments={post.comments}
          onClose={closeCommentsModal}
        />
      )}
    </div>
  );
};

export default FeedPost;
