import { likes } from "../../utils/mockData";
import { createSlice } from "@reduxjs/toolkit";

const likeSlice = createSlice({
  name: "likes",
  initialState: {
    likes: likes,
  },
  reducers: {
    toggleLike: (state, action) => {
      const { postId, userId } = action.payload;

      const existing = state.likes.find(
        (l) => l.postId === postId && l.userId === userId,
      );
      if (existing) {
        state.likes = state.likes.filter(
          (l) => !(l.postId === postId && l.userId === userId),
        );
      } else {
        state.likes.push({
          id: Date.now(),
          postId,
          userId,
        });
      }
    },
  },
});

export const { toggleLike } = likeSlice.actions;
export default likeSlice.reducer;
