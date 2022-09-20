import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
  },
  reducers: {
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
