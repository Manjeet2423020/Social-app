import { createSlice } from "@reduxjs/toolkit";
import { posts } from "../../utils/mockData";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: posts,
  },
  reducers: {
    addPosts: (state, action) => {
      state.posts.unshift(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
  },
});

export default postsSlice.reducer;
export const { addPosts, deletePost } = postsSlice.actions;
