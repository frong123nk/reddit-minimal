import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice'
import subredditReducer from './subredditSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    subreddit: subredditReducer
  },
});
