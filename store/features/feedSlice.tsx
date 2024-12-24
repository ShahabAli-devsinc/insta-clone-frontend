import { Post } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeedState {
  feedPosts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  feedPosts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setUserFeedPosts(state, action: PayloadAction<Post[]>) {
      state.feedPosts = action.payload;
    },
    addFeedPost(state, action: PayloadAction<Post>) {
      state.feedPosts.push(action.payload);
    },

    updateFeedPostAttributes(
      state,
      action: PayloadAction<{ id: number; data: Partial<Post> }>
    ) {
      const { id, data } = action.payload;
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
    },

    deleteFeedPost(state, action: PayloadAction<number>) {
      state.feedPosts = state.feedPosts.filter(
        (post) => post.id !== action.payload
      );
    },
  },
});

export const {
  setUserFeedPosts,
  addFeedPost,
  updateFeedPostAttributes,
  deleteFeedPost,
} = postSlice.actions;
export default postSlice.reducer;
