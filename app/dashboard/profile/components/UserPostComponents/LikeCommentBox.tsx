import { Heart } from "lucide-react";
import React from "react";
import { FaComment, FaHeart } from "react-icons/fa";

const LikeCommentBox = () => {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex items-center gap-2">
        <Heart className="fill-red-500 text-white" />
        <FaHeart className="text-black cursor-pointer" />
        <p>5</p>
      </div>
      <div className="flex items-center gap-2">
        <FaComment className="text-black cursor-pointer" />
        <p>10</p>
      </div>
    </div>
  );
};

export default LikeCommentBox;
