import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../post/postSlice";
import usersReducer from "../users/userSlice";
import commentReducer from "../comment/commentSlice";
import likeReducer from "../like/likeSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    comments: commentReducer,
    likes: likeReducer,
  },
});
