import { configureStore } from "@reduxjs/toolkit";
import theme from "./themeSlice";
import user from "./userSlice";
export default configureStore({
  reducer: {
    theme,
    user,
  },
});
