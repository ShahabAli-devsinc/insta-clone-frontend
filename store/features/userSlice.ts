import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserPopulated, UserProfile } from "@/types/types";

interface ProfileState {
  userProfile: UserProfile;
  platformUsers: UserPopulated[] | null;
}

const initialState: ProfileState = {
  userProfile: {
    id: 1,
    username: "",
    email: "",
    bio: "",
    profilePicture: "",
  },
  platformUsers: null,
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
    setAllPlatformUsers(state, action: PayloadAction<UserPopulated[]>) {
      state.platformUsers = action.payload;
    },
  },
});

export const { setUserProfile, updateUserProfile, setAllPlatformUsers } =
  userSlice.actions;
export default userSlice.reducer;
