import { createSlice } from "@reduxjs/toolkit";
import dark from "../constants/dark";
import light from "../constants/light";
export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    activeTheme: light,
  },
  reducers: {
    toggleTheme: (state) => {
      return {
        activeTheme: state.activeTheme.type === "light" ? dark : light,
      };
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
