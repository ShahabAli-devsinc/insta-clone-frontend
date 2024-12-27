import { useDebounce } from "@/helpers";
import { followApi } from "@/services/followApi";
import { addFollowing, removeFollowing } from "@/store/features/followSlice";
import { selectFollowing } from "@/store/selector";
import { AppDispatch } from "@/store/store";
import { User } from "@/types";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

type FollowButtonProps = {
  user: User;
  isExplore?: boolean;
  isAlreadyFollowed?: boolean;
};

const FollowButton = ({
  user,
  isExplore,
  isAlreadyFollowed,
}: FollowButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const following = useSelector(selectFollowing);
  const [isFollowed, setIsFollowed] = useState<boolean | null>(
    isAlreadyFollowed || null
  );
  if (!following) {
    return <Loader />;
  }

  useEffect(() => {
    const isUserFollowed = following.some(
      (followedUser) => followedUser.id === user.id
    );
    setIsFollowed(isUserFollowed);
  }, [following, user.id]);

  const handleOptimisticFollow = () => {
    if (!isFollowed) {
      setIsFollowed(true);
      debouncedHandleFollow();
    } else {
      setIsFollowed(false);
      debouncedHandleFollow();
    }
  };

  const handleFollow = async () => {
    try {
      if (!isFollowed) {
        await followApi.followUser(user.id);
        dispatch(addFollowing(user));
        toast.success(`Followed ${user.username}.`);
      } else {
        await followApi.unfollowUser(user.id);
        dispatch(removeFollowing(user.id));
        toast.success(`Unfollowed ${user.username}.`);
      }
    } catch (error) {
      toast.warning("Action failed, Please try again.");
    }
  };

  const debouncedHandleFollow = useDebounce(handleFollow, 1000);
  return (
    <button
      onClick={handleOptimisticFollow}
      className={`${
        isExplore ? "px-6 py-2 rounded-full" : "px-4 py-1 text-sm rounded-md"
      } ${
        isFollowed
          ? "text-gray-700 bg-white hover:bg-gray-50 border border-gray-300"
          : "text-white bg-blue-500"
      } hover:bg-blue-600 transition`}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
