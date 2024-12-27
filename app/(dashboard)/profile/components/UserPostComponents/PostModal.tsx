import React, { useState } from "react";
import Image from "next/image";
import LikeCommentBox from "./LikeCommentBox";
import { Post } from "@/types";
import PostUserProfile from "../../../../../components/shared/PostUserProfile";
import PostCaption from "./PostCaption";
import CommentsModal from "@/app/(dashboard)/home/feed/components/CommentsModal";

interface PostModalProps {
  post: Post;
  onClose: () => void;
  isExplore?: boolean;
}

const PostModal: React.FC<PostModalProps> = ({ post, onClose, isExplore }) => {
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const openCommentsModal = () => setIsCommentsModalOpen(true);
  const closeCommentsModal = () => setIsCommentsModalOpen(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg p-4 max-w-lg w-full relative">
        <PostUserProfile user={post.user} onClose={onClose} />
        <Image
          src={post.imageUrl}
          alt={"Post"}
          width={400}
          height={300}
          className="object-cover rounded-lg mb-2 w-full h-[400px]"
        />
        <LikeCommentBox
          postId={post.id}
          isProfile={true}
          isExplore={isExplore || false}
          comments={post.comments}
          likes={post.likes}
          onOpen={openCommentsModal}
        />
        {/* Caption */}
        <PostCaption
          postId={post.id}
          username={post.user.username}
          caption={post.caption}
          isExplore={isExplore || false}
        />
        {/* Render comments */}
        {post.comments?.length ? (
          <div className="mt-2">
            <button
              onClick={openCommentsModal}
              className="text-gray-400  hover:text-gray-600 font-light focus:outline-none"
            >
              View all {post.comments?.length ? post.comments?.length : ""}{" "}
              comments
            </button>
          </div>
        ) : null}

        {/* Comments Modal */}
        {isCommentsModalOpen ? (
          <CommentsModal
            isExplore={isExplore || false}
            isProfile={true}
            postId={post.id}
            comments={post.comments}
            onClose={closeCommentsModal}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PostModal;
