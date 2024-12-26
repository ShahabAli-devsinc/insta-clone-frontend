"use client";
import React from "react";
import AddCommentForm from "./AddCommentForm";
import { Comment } from "@/types/types";
import Avatar from "@/components/shared/Avatar";
import { format } from "date-fns";

type CommentsModalProps = {
  isProfile: boolean;
  postId: number;
  comments: Comment[] | undefined;
  onClose: () => void;
  isExplore?: boolean;
};

const CommentsModal = ({
  isProfile,
  postId,
  comments = [],
  onClose,
  isExplore,
}: CommentsModalProps) => {
  const RenderComments = () => {
    return (
      <div className="max-h-[430px] pr-3 overflow-auto">
        {comments.length > 0 ? (
          comments?.map((comment) => (
            <div
              key={comment.id}
              className="w-full mb-3 flex flex-col items-start gap-2 border-b pb-2"
            >
              {/* Comment Header */}
              <div className="flex justify-between w-full">
                <div className="flex gap-2 items-center">
                  <Avatar
                    src={comment.user.profilePicture}
                    alt={comment.user.username}
                    size="w-6 h-6"
                  />
                  <p className="font-semibold text-sm">
                    {comment.user.username}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 text-xs whitespace-nowrap">
                    {format(new Date(comment.createdAt), "MMM d, yyyy h:mm a")}
                  </span>
                </div>
              </div>

              {/* Comment Content */}
              <div className="w-full">
                <p className="text-gray-700 text-sm break-words">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    );
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative max-h-[600px]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        <RenderComments />

        {/* Add Comment Form */}
        <AddCommentForm
          isExplore={isExplore || false}
          isProfile={isProfile}
          postId={postId}
        />
      </div>
    </div>
  );
};

export default CommentsModal;
