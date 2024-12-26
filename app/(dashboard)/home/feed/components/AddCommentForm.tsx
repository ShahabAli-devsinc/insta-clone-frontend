"use client";
import { commentApi } from "@/services/commentApi";
import { updateExplorePostAttributes } from "@/store/features/exploreSlice";
import { updateFeedPostAttributes } from "@/store/features/feedSlice";
import { updateUserPostAttributes } from "@/store/features/postSlice";
import { selectUserProfile } from "@/store/selector";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

type AddCommentProps = {
  isProfile: boolean;
  postId: number;
  isExplore: boolean;
};

const AddCommentForm = ({ isProfile, postId, isExplore }: AddCommentProps) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUserProfile);
  const [comment, setComment] = useState("");
  const maxLength = 60;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const commentPayload = {
        userId: currentUser.id,
        postId: postId,
        content: comment,
      };
      const createdComment = await commentApi.create({ ...commentPayload });
      const action = isExplore
        ? updateExplorePostAttributes
        : isProfile
        ? updateUserPostAttributes
        : updateFeedPostAttributes;
      const actionPayload = {
        id: postId,
        data: {
          comments: [
            {
              ...createdComment,
              user: {
                ...currentUser,
              },
            },
          ],
        },
      };
      dispatch(action(actionPayload));
      setComment("");
      toast.success("Comment posted successfully!");
    } catch (error) {
      toast.warning("Failed to uploaded comment, Try Again!");
    }
  };

  return (
    <form
      onSubmit={(e) => handleAddComment(e)}
      className="mt-4 w-full flex flex-col items-start"
    >
      <div className="w-full h-full flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={handleInputChange}
          placeholder="Add a comment..."
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={comment.trim().length === 0}
          className={`rounded px-6 py-2 ${
            comment.trim().length === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Post
        </button>
      </div>

      <div className="text-right text-sm text-gray-500 mt-1">
        {comment.length}/{maxLength}
      </div>
    </form>
  );
};

export default AddCommentForm;
