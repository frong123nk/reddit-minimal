import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import {
  fetchAbout,
  fetchComment,
  fetchSubredditPosts,
} from "../api/fetchData";

export const loadPost = createAsyncThunk(
  "app/loadSubredditPosts",
  async (subreddit) => {
    return await fetchSubredditPosts(subreddit);
  }
);

export const loadAbout = createAsyncThunk(
  "app/loadAbout",
  async (subreddit) => {
    return await fetchAbout(subreddit);
  }
);

export const loadComment = createAsyncThunk(
  "app/loadComment",
  async ({ index, permalink }) => {
    const comments = await fetchComment(permalink);
    return { index: index, comments: comments };
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState: {
    post: [],
    about: [],
    searchTerm: "",
    isLoading: false,
    error: false,
  },
  reducers: {
    toggleShowComments(state, action) {
      state.post[action.payload].showingComments =
        !state.post[action.payload].showingComments;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },

  extraReducers: {
    [loadPost.pending]: (state, action) => {
      state.searchTerm = "";
      state.isLoading = true;
      state.error = false;
    },
    [loadPost.fulfilled]: (state, action) => {
      state.post = action.payload;
      state.post = state.post.map((po) => ({
        ...po,
        comments: [],
        showingComments: false,
        loadingComments: false,
        errorComments: false,
      }));
      state.isLoading = false;
      state.error = false;
    },
    [loadPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    [loadAbout.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [loadAbout.fulfilled]: (state, action) => {
      state.about = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    [loadAbout.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    [loadComment.pending]: (state, action) => {
      console.log("padding comment");
      state.post[action.meta.arg.index].loadingComments = true;
      state.errorComments = false;
    },
    [loadComment.fulfilled]: (state, action) => {
      console.log("fufilled comment");
      state.post[action.payload.index].comments = action.payload.comments;
      state.post[action.meta.arg.index].loadingComments = false;
      state.errorComments = false;
    },
    [loadComment.rejected]: (state, action) => {
      state.loadingComments = false;
      state.errorComments = true;
    },
  },
});

export const selectPost = (state) => state.app.post;
export const selectIsLoading = (state) => state.app.isLoading;
export const selectError = (state) => state.app.error;
export const selectSearch = (state) => state.app.searchTerm;
export const { toggleShowComments, setSearchTerm } = appSlice.actions;

export default appSlice.reducer;

export const selectFilteredPosts = createSelector(
  [selectPost, selectSearch],
  (posts, searchTerm) => {
    if (searchTerm !== "") {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return posts;
  }
);
