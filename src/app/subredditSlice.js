import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchSubreddit } from "../api/fetchData";

export const loadSubreddit = createAsyncThunk(
  "sunreddit/loadSubreddit",
  async () => {
    return await fetchSubreddit();
  }
);

export const subredditSlice = createSlice({
  name: "sunreddit",
  initialState: {
    subredditnames: [],
    currentSubreddit: "/",
    rLoading: false,
    rError: false,
  },
  reducers: {
    currentSubreddit: (state, action) => {
      state.currentSubreddit = action.payload;
    },
  },
  extraReducers: {
    [loadSubreddit.pending]: (state, action) => {
      state.rLoading = true;
      state.rError = false;
    },
    [loadSubreddit.fulfilled]: (state, action) => {
      state.subredditnames = action.payload;
      state.rLoading = false;
      state.rError = false;
    },
    [loadSubreddit.rejected]: (state, action) => {
      state.rLoading = false;
      state.rError = true;
    },
  },
});

export const selectCurrentSubreddit = (state) =>
  state.subreddit.currentSubreddit;
export const selectSubredditname = (state) => state.subreddit.subredditnames;


export const { currentSubreddit } = subredditSlice.actions;

export default subredditSlice.reducer;
