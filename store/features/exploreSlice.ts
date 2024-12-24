import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, UserPopulated } from "@/types/types";

interface ExploreState {
  explorePosts: Post[];
  exploreUsers: UserPopulated[];
  postsPagination: { currentPage: number; totalPages: number };
  usersPagination: { currentPage: number; totalPages: number };
  loading: boolean;
  error: string | null;
}

const initialState: ExploreState = {
  explorePosts: [],
  exploreUsers: [],
  postsPagination: { currentPage: 1, totalPages: 1 },
  usersPagination: { currentPage: 1, totalPages: 1 },
  loading: false,
  error: null,
};

const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    setExplorePosts(
      state,
      action: PayloadAction<{ posts: Post[]; total: number }>
    ) {
      state.explorePosts = action.payload.posts; // Save only the array of posts
      state.postsPagination.totalPages = Math.ceil(action.payload.total / 10); // Update pagination
    },
    addExplorePosts(state, action: PayloadAction<Post[]>) {
      state.explorePosts = [...state.explorePosts, ...action.payload];
    },
    setExploreUsers(state, action: PayloadAction<UserPopulated[]>) {
      state.exploreUsers = action.payload;
    },
    addExploreUsers(state, action: PayloadAction<UserPopulated[]>) {
      state.exploreUsers = [...state.exploreUsers, ...action.payload];
    },
    setPostsPagination(
      state,
      action: PayloadAction<{ currentPage: number; totalPages: number }>
    ) {
      state.postsPagination = action.payload;
    },
    setUsersPagination(
      state,
      action: PayloadAction<{ currentPage: number; totalPages: number }>
    ) {
      state.usersPagination = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    updateExplorePostAttributes(
      state,
      action: PayloadAction<{ id: number; data: Partial<Post> }>
    ) {
      const { id, data } = action.payload;

      if (state.explorePosts) {
        // Check if explorePosts is not null
        const postIndex = state.explorePosts.findIndex(
          (post) => post.id === id
        );

        if (postIndex !== -1) {
          const currentPost = state.explorePosts[postIndex];

          state.explorePosts[postIndex] = {
            ...currentPost,
            ...data,
            comments: data.comments
              ? [...(currentPost.comments || []), ...data.comments]
              : currentPost.comments,
            likes: data.likes !== undefined ? data.likes : currentPost.likes,
          };
        }
      }
    },
  },
});

export const {
  setExplorePosts,
  addExplorePosts,
  setExploreUsers,
  addExploreUsers,
  setPostsPagination,
  setUsersPagination,
  setLoading,
  setError,
  updateExplorePostAttributes,
} = exploreSlice.actions;

export default exploreSlice.reducer;
