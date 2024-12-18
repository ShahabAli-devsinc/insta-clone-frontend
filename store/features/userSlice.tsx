import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@/types/types";

interface ProfileState {
  userProfile: UserProfile;
}

const initialState: ProfileState = {
  userProfile: {
    id: 1,
    username: "",
    email: "",
    bio: "",
    profilePicture: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile(state, action: PayloadAction<UserProfile>) {
      state.userProfile = action.payload;
    },
    updateUserProfile(state, action: PayloadAction<Partial<UserProfile>>) {
      state.userProfile = { ...state.userProfile, ...action.payload };
    },
  },
});

export const { setUserProfile, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
