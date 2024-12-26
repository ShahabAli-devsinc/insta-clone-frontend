import { RootState } from "./store";

export const selectUserProfile = (state: RootState) => state.user.userProfile;

export const selectUserPosts = (state: RootState) => state.post.posts;

export const selectFeedPosts = (state: RootState) => state.feed.feedPosts;

export const selectExplorePosts = (state: RootState) =>
  state.explore.explorePosts;

export const selectFollowers = (state: RootState) => state.follow.followers;
export const selectFollowing = (state: RootState) => state.follow.following;

export const selectAllPlatformUsers = (state: RootState) =>
  state.user.platformUsers;
