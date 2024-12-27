"use client";
import { CheckIcon, EditIcon, X } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alertDialogue";
import { PostApi } from "@/services/postApi";
import { useDispatch } from "react-redux";
import { updatePost } from "@/store/features/postSlice";
import { toast } from "sonner";

type PostCaptionProps = {
  postId: number;
  username: string;
  caption: string;
  feed?: boolean;
  isExplore?: boolean;
};

const PostCaption = ({
  postId,
  username,
  caption,
  feed,
  isExplore,
}: PostCaptionProps) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [postCaption, setPostCaption] = useState<string>(
    caption ? caption : ""
  );
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value.length <= 50) {
      setPostCaption(e.target.value);
    }
  };

  const updateCaption = async () => {
    try {
      if (postCaption !== caption) {
        setIsEditing(true);
        const updatedPostPayload = { caption: postCaption };
        await PostApi.update(postId, updatedPostPayload);
        dispatch(updatePost({ id: postId, data: updatedPostPayload }));
        toast.success("Post updated successfully!");
        setIsUpdating(false);
        setIsEditing(false);
      }
    } catch (error) {
      toast.warning("Failed to update post.");
    }
  };

  const handleStopEditing = () => {
    setIsEditing(false);
    setPostCaption(caption);
  };

  const DisplayEditingFlowContent = () => {
    if (!isEditing) {
      return (
        <EditIcon
          onClick={handleEdit}
          className="text-sm cursor-pointer hover:text-red-900 hover:scale-105"
        />
      );
    }
    return (
      <>
        <AlertDialog>
          <AlertDialogTrigger>
            {isEditing && postCaption !== caption ? (
              <CheckIcon className="text-sm text-blue-500 cursor-pointer hover:text-blue-600 hover:scale-105" />
            ) : null}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-light">
                Are you sure you want to update your post details?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={updateCaption}
              >
                {isUpdating ? (
                  <svg
                    className="animate-spin mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  "Continue"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <X
          onClick={handleStopEditing}
          className="text-sm text-red-500 cursor-pointer hover:text-red-600 hover:scale-105"
        />
      </>
    );
  };

  return (
    <div className="flex my-2 justify-between items-start">
      <div className="w-full flex gap-1 items-start pr-2">
        <p className="font-semibold text-sm whitespace-nowrap">{username}:</p>
        {!isEditing ? (
          <p className="flex-1 break-words text-sm text-wrap w-[30px] text-gray-600">{caption}</p>
        ) : (
          <input
            ref={inputRef}
            value={postCaption}
            onChange={handleCaptionChange}
            className="border-none focus:outline-none w-full resize-none"
            maxLength={70}
          />
        )}
      </div>
      {feed || isExplore ? null : <DisplayEditingFlowContent />}
    </div>
  );
};

export default PostCaption;
