import { createSlice } from "@reduxjs/toolkit";
import { comments } from "../../utils/mockData";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: comments,
  },
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
  },
});

export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;
