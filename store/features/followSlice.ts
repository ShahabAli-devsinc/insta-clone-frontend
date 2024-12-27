import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";

interface FollowState {
  followers: User[];
  following: User[];
  loading: boolean;
  error: string | null;
}

const initialState: FollowState = {
  followers: [],
  following: [],
  loading: false,
  error: null,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setFollowers(state, action: PayloadAction<User[]>) {
      state.followers = action.payload;
    },
    setFollowing(state, action: PayloadAction<User[]>) {
      state.following = action.payload;
    },
    addFollowing(state, action: PayloadAction<User>) {
      state.following.push(action.payload);
    },
    removeFollowing(state, action: PayloadAction<number>) {
      state.following = state.following.filter(
        (user) => user.id !== action.payload
      );
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setFollowers,
  setFollowing,
  addFollowing,
  removeFollowing,
  setLoading,
  setError,
} = followSlice.actions;

export default followSlice.reducer;
