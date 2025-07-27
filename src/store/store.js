import { configureStore } from "@reduxjs/toolkit";
import snippetReducer from "../features/snippets/SnippetSlice";
import motifsReducer from "../features/motifs/MotifsSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    snippets: snippetReducer,
    motifs: motifsReducer,
  },
});
