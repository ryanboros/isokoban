import { configureStore } from "@reduxjs/toolkit";

import LevelSlice from "./LevelSlice";
import MapSlice from "./map-slice";

export const store = configureStore({
  reducer: {
    level: LevelSlice.reducer,
    map: MapSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
