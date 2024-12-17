import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  id: number | null;
  username: string | null;
  email: string | null;
  bio: string | null;
  profile_picture: string | null;
}

interface ProfileState {
  userProfile: UserProfile | null;
}

const initialState: ProfileState = {
  userProfile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile(state, action: PayloadAction<UserProfile>) {
      state.userProfile = action.payload;
    },
    updateUserProfile(state, action: PayloadAction<Partial<UserProfile>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUserProfile, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
