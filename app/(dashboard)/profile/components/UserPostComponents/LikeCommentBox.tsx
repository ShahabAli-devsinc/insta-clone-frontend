import { likeApi } from "@/services/likeApi";
import { updateExplorePostAttributes } from "@/store/features/exploreSlice";
import { updateFeedPostAttributes } from "@/store/features/feedSlice";
import { updateUserPostAttributes } from "@/store/features/postSlice";
import { selectUserProfile } from "@/store/selector";
import { Comment, Like } from "@/types/types";
import { Heart, MessageCircle } from "lucide-react";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

type LikeCommentBoxProps = {
  postId: number;
  isProfile: boolean;
  comments: Comment[] | undefined;
  likes: Like[] | undefined;
  onOpen?: () => void;
  isExplore?: boolean;
};

const LikeCommentBox = ({
  postId,
  isProfile,
  comments = [],
  likes = [],
  isExplore,
  onOpen,
}: LikeCommentBoxProps) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUserProfile);
  const isLiked = useMemo(() => {
    return likes.some((like) => like.userId === currentUser.id);
  }, [likes]);

  const handleLike = async () => {
    try {
      const action = isExplore
        ? updateExplorePostAttributes
        : isProfile
        ? updateUserPostAttributes
        : updateFeedPostAttributes;

      if (!isLiked) {
        const createdLike = await likeApi.create({
          userId: currentUser.id,
          postId: postId,
        });
        const actionPayload = {
          id: postId,
          data: {
            likes: [
              ...(likes || []),
              {
                ...createdLike,
                user: {
                  ...currentUser,
                },
              },
            ],
          },
        };
        dispatch(action(actionPayload));
      } else {
        // Remove like
        await likeApi.delete({
          userId: currentUser.id,
          postId: postId,
        });
        dispatch(
          action({
            id: postId,
            data: {
              likes: likes.filter((like) => like.userId !== currentUser.id),
            },
          })
        );
      }
    } catch (error) {}
  };
  return (
    <div className="flex gap-3 items-center">
      <div className="flex items-center gap-1">
        <Heart
          className={`text-black ${
            isLiked ? "text-red-600 fill-red-600" : "text-black"
          } cursor-pointer hover:scale-110 transition-transform duration-300 ease-out`}
          onClick={handleLike}
        />
        <p>{likes.length}</p>
      </div>
      <div className="flex items-center gap-1 ">
        <MessageCircle
          onClick={onOpen}
          className="text-black cursor-pointer hover:scale-110 transition-transform duration-300 ease-out"
        />
        <p>{comments.length}</p>
      </div>
    </div>
  );
};

export default LikeCommentBox;
