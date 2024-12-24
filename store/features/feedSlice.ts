import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "@/types/types";

interface FeedState {
  feedPosts: Post[] | null;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  feedPosts: null,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setUserFeedPosts(state, action: PayloadAction<Post[]>) {
      state.feedPosts = action.payload;
    },

    addFeedPosts(state, action: PayloadAction<Post[]>) {
      if (state.feedPosts) {
        state.feedPosts = [...state.feedPosts, ...action.payload];
      }
    },

    setPagination(
      state,
      action: PayloadAction<{ currentPage: number; totalPages: number }>
    ) {
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    deleteFeedPost(state, action: PayloadAction<number>) {
      if (state.feedPosts) {
        state.feedPosts = state.feedPosts.filter(
          (post) => post.id !== action.payload
        );
      }
    },

    updateFeedPostAttributes(
      state,
      action: PayloadAction<{ id: number; data: Partial<Post> }>
    ) {
      const { id, data } = action.payload;
      if (state.feedPosts) {
        const postIndex = state.feedPosts.findIndex((post) => post.id === id);

        if (postIndex !== -1) {
          const currentPost = state.feedPosts[postIndex];

          state.feedPosts[postIndex] = {
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
  setUserFeedPosts,
  addFeedPosts,
  setPagination,
  setLoading,
  setError,
  deleteFeedPost,
  updateFeedPostAttributes,
} = feedSlice.actions;

export default feedSlice.reducer;
