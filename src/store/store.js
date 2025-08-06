import { configureStore } from "@reduxjs/toolkit";
import snippetReducer from "./SnippetSlice";
import motifsReducer from "./MotifsSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    snippets: snippetReducer,
    motifs: motifsReducer,
  },
});
