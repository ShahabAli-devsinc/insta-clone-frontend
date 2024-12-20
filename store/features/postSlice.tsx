import { Post, User } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setUserPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    addPost(state, action: PayloadAction<Post>) {
      state.posts.push(action.payload);
    },
    updatePost(
      state,
      action: PayloadAction<{ id: number; data: Partial<Post> }>
    ) {
      const { id, data } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === id);
      if (postIndex !== -1) {
        state.posts[postIndex] = { ...state.posts[postIndex], ...data };
      }
    },
    deletePost(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { setUserPosts, addPost, updatePost, deletePost } =
  postSlice.actions;
export default postSlice.reducer;
