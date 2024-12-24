import { Post } from "@/types/types";
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

    updateUserPostAttributes(
      state,
      action: PayloadAction<{ id: number; data: Partial<Post> }>
    ) {
      const { id, data } = action.payload;
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
    },

    deletePost(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const {
  setUserPosts,
  addPost,
  updatePost,
  updateUserPostAttributes,
  deletePost,
} = postSlice.actions;
export default postSlice.reducer;
