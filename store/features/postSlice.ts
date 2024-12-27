import { Post } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  posts: Post[] | null;
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: null,
  total: 0,
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setUserPosts(
      state,
      action: PayloadAction<{ posts: Post[]; total: number }>
    ) {
      state.posts = action.payload.posts;
      state.total = action.payload.total;
    },
    appendUserPosts(state, action: PayloadAction<Post[]>) {
      if (state.posts) {
        state.posts = [...state.posts, ...action.payload];
      }
    },
    addPost(state, action: PayloadAction<Post>) {
      if (state.posts) {
        state.posts.push(action.payload);
      }
    },
    updatePost(
      state,
      action: PayloadAction<{ id: number; data: Partial<Post> }>
    ) {
      const { id, data } = action.payload;
      if (state.posts) {
        const postIndex = state.posts.findIndex((post) => post.id === id);
        if (postIndex !== -1) {
          state.posts[postIndex] = { ...state.posts[postIndex], ...data };
        }
      }
    },

    updateUserPostAttributes(
      state,
      action: PayloadAction<{ id: number; data: Partial<Post> }>
    ) {
      const { id, data } = action.payload;
      if (state.posts) {
        const postIndex = state.posts.findIndex((post) => post.id === id);

        if (postIndex !== -1) {
          const currentPost = state.posts[postIndex];

          state.posts[postIndex] = {
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

    deletePost(state, action: PayloadAction<number>) {
      if (state.posts) {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      }
    },
  },
});

export const {
  setUserPosts,
  appendUserPosts,
  addPost,
  updatePost,
  updateUserPostAttributes,
  deletePost,
} = postSlice.actions;
export default postSlice.reducer;
