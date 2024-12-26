import { useDebounce } from "@/helpers/helper";
import { likeApi } from "@/services/likeApi";
import { updateExplorePostAttributes } from "@/store/features/exploreSlice";
import { updateFeedPostAttributes } from "@/store/features/feedSlice";
import { updateUserPostAttributes } from "@/store/features/postSlice";
import { selectUserProfile } from "@/store/selector";
import { Comment, Like } from "@/types/types";
import { Heart, MessageCircle } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
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
  const [liked, setLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(likes.length || 0);

  console.log(likes.length);

  const isLiked = useMemo(() => {
    return likes.some((like) => like.userId === currentUser.id);
  }, [likes]);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleUserLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => (prev > 0 ? prev - 1 : 0));
      delayedLikeCall();
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
      delayedLikeCall();
    }
  };

  const handleLike = async () => {
    try {
      const isAddingLike = !liked;

      // payload structure
      const payload = {
        id: postId,
        data: {
          likes: isAddingLike
            ? [
                ...(likes || []),
                {
                  ...(await likeApi.create({
                    userId: currentUser.id,
                    postId: postId,
                  })),
                  user: { ...currentUser },
                },
              ]
            : likes.filter((like) => like.userId !== currentUser.id),
        },
      };

      // Dispatch updates
      dispatch(updateExplorePostAttributes(payload));
      dispatch(updateFeedPostAttributes(payload));
      dispatch(updateUserPostAttributes(payload));

      // Handle like API deletion if removing
      if (!isAddingLike) {
        await likeApi.delete({ userId: currentUser.id, postId: postId });
      }
    } catch (error) {
      console.error("Error in handleLike:", error);
    }
  };

  const delayedLikeCall = useDebounce(handleLike, 1000);

  return (
    <div className="flex gap-3 items-center">
      <div className="flex items-center gap-1">
        <Heart
          className={`text-black ${
            liked ? "text-red-600 fill-red-600" : "text-black"
          } cursor-pointer hover:scale-110 transition-transform duration-300 ease-out`}
          onClick={handleUserLike}
        />
        <p>{likesCount}</p>
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
