import { users } from "../../utils/mockData";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: users,
  },
});
export default userSlice.reducer;
