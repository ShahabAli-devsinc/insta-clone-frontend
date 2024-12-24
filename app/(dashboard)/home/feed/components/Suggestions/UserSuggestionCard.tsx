import Avatar from "@/components/shared/Avatar";
import { DEFAULT_PROFILE_PIC } from "@/constants/constants";
import { followApi } from "@/services/followApi";
import { addFollowing, removeFollowing } from "@/store/features/followSlice";
import { selectFollowing } from "@/store/selector";
import { UserPopulated } from "@/types/types";
import { Loader, User2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

type UserSuggestionCardProps = {
  user: UserPopulated;
};

const UserSuggestionCard = ({ user }: UserSuggestionCardProps) => {
  const dispatch = useDispatch();
  const following = useSelector(selectFollowing);
  const [isFollowed, setIsFollowed] = useState<boolean | null>(null);
  if (!following) {
    return <Loader />;
  }

  useEffect(() => {
    const isUserFollowed = following.some(
      (followedUser) => followedUser.id === user.id
    );
    setIsFollowed(isUserFollowed);
  }, [following, user.id]);

  const handleFollow = async () => {
    try {
      if (!isFollowed) {
        await followApi.followUser(user.id);
        dispatch(addFollowing(user));
        toast(`Followed ${user.username}.`);
      } else {
        await followApi.unfollowUser(user.id);
        dispatch(removeFollowing(user.id));
        toast(`Unfollowed ${user.username}.`);
      }
    } catch (error) {
      toast("Action failed, Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:shadow">
      <div className="flex items-center">
        <Avatar
          src={user.profilePicture || DEFAULT_PROFILE_PIC}
          alt={user.username}
          size="h-8 w-8"
        />
        <div className="ml-3 text-sm">
          <p className="font-medium">{user.username}</p>
        </div>
      </div>
      <button
        onClick={handleFollow}
        className={`px-4 py-1 text-sm ${
          isFollowed
            ? "text-gray-700 bg-white hover:bg-gray-50 border border-gray-200"
            : "text-white bg-blue-500"
        } rounded-md hover:bg-blue-600`}
      >
        {isFollowed ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserSuggestionCard;
