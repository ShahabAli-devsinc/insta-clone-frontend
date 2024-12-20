import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import LikeCommentBox from "./LikeCommentBox";
import { Post } from "@/types/types";
import { useSelector } from "react-redux";
import { selectUserProfile } from "@/store/selector";
import PostUserProfile from "../../../../../components/shared/PostUserProfile";
import PostCaption from "./PostCaption";

interface PostModalProps {
  post: Post;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  const user = useSelector(selectUserProfile);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg p-4 max-w-lg w-full relative">
        <PostUserProfile user={user} onClose={onClose} />
        <Image
          src={post.imageUrl}
          alt={"Post"}
          width={400}
          height={300}
          className="object-cover rounded-lg mb-2 w-full h-[400px]"
        />
        <LikeCommentBox />
        {/* Caption */}
        <PostCaption
          postId={post.id}
          username={post.user.username}
          caption={post.caption}
        />
        <Separator />
        {/* Render comments */}

        {/* {post.comments.map((comment) => ( */}
        <div className="mt-2">
          <span className="font-semibold">comment.user.username: </span>
          comment.text
        </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default PostModal;
