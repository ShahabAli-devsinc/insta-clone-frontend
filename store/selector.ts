import { RootState } from "./store";

export const selectUserProfile = (state: RootState) => state.user.userProfile;

export const selectUserPosts = (state: RootState) => state.post.posts;
