import { Post } from "@/types/types";
import React, { useState } from "react";
import PostModal from "../../profile/components/UserPostComponents/PostModal";
import { FaComment, FaHeart } from "react-icons/fa";
import Image from "next/image";

type ExplorePostProps = {
  post: Post;
};

const ExplorePost = ({ post }: ExplorePostProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (post: Post) => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div
        key={post.id}
        className="relative group rounded-sm overflow-hidden shadow-md break-inside-avoid cursor-pointer"
        onClick={() => handleOpenModal(post)}
      >
        <Image
          src={post.imageUrl}
          alt={post.caption}
          layout="responsive"
          width={500}
          height={900}
          className="w-[500px] h-[900px] object-cover rounded-md group-hover:scale-95 duration-300 transition-transform ease-in-out"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-white text-lg">
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
      </div>
      {/* Post Modal */}
      {isModalOpen ? (
        <PostModal isExplore={true} post={post} onClose={handleCloseModal} />
      ) : null}
    </>
  );
};

export default ExplorePost;
