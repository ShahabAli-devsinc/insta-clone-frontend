import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";

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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignore specific action types
        ignoredPaths: ["register"], // Ignore specific paths in state
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);