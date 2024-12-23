import React, { useState } from "react";
import Image from "next/image";
import PostModal from "./PostModal";
import { FaComment, FaHeart, FaTrash } from "react-icons/fa";
import { Post } from "@/types/types";
import { Trash2Icon } from "lucide-react";
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
import { useDispatch } from "react-redux";
import { PostApi } from "@/services/postApi";
import { deletePost } from "@/store/features/postSlice";
import { toast } from "sonner";
interface UserPostProps {
  post: Post;
}

const UserPost = ({ post }: UserPostProps) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeletePost = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      await PostApi.delete(post.id);
      dispatch(deletePost(post.id));
      toast("Post deleted successfully!");
      e.stopPropagation();
    } catch (error) {
      toast("Failed to delete post.");
    }
  };

  return (
    <div className="relative group rounded-sm">
      <Image
        src={post.imageUrl}
        alt={"Helloo"}
        width={400}
        height={400}
        className="object-cover rounded-sm cursor-pointer w-full h-[300px] md:h-[250px] group-hover:scale-95 transition-transform duration-300 ease-in-out"
      />
      <div
        onClick={handleOpenModal}
        className="absolute inset-0 rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity"
      >
        <AlertDialog>
          <AlertDialogTrigger
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="absolute top-2 right-2 z-50 text-white bg-black bg-opacity-70 p-2 rounded-full cursor-pointer hover:bg-red-700 transition-colors duration-300 ease-in-out hover:scale-105"
          >
            <Trash2Icon size={20} />
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
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={handleDeletePost}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-white text-lg ">
          <div className="flex items-center gap-2">
            <FaHeart className="text-white" />
            <p>{post.likes?.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <FaComment className="text-white" />
            <p>{post.comments?.length}</p>
          </div>
        </div>
      </div>
      {isModalOpen && <PostModal post={post} onClose={handleCloseModal} />}
    </div>
  );
};

export default UserPost;
