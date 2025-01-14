import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import postReducer from "./features/postSlice";
import feedReducer from "./features/feedSlice";
import exploreReducer from "./features/exploreSlice";
import followReducer from "./features/followSlice";

// Persist config for auth slice
const authPersistConfig = {
  key: "auth",
  storage,
};

// Persist config for user slice
const userPersistConfig = {
  key: "user",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    user: persistedUserReducer,
    post: postReducer,
    feed: feedReducer,
    explore: exploreReducer,
    follow: followReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        ignoredPaths: ["register"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
