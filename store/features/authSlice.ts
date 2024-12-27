import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: {
    id: 1,
    username: "",
    email: "",
    bio: "",
    profilePicture: "",
  },
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set user data after login
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    // Clear user data (logout)
    logout: (state) => {
      state.user = null;
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const { setUser, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
