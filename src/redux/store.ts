import { configureStore } from '@reduxjs/toolkit';
import login from './slices/loginSlice';
import events from './slices/eventsSlice';
import filter from './slices/filterSlice';
import home from './slices/homeSlice';

export const store = configureStore({
  reducer: {
    login,
    events,
    filter,
    home,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
