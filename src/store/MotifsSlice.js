import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export const fetchMotifs = createAsyncThunk("motifs/fetchMotifs", async () => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not authenticated");

  const motifsDocRef = doc(db, "users", uid, "meta", "motifs");
  const motifsSnap = await getDoc(motifsDocRef);

  if (!motifsSnap.exists()) {
    return [];
  }

  const data = motifsSnap.data();

  return (data.motifs || []).map((m) =>
    typeof m === "string" ? { value: m, count: 1 } : m
  );
});

const motifsSlice = createSlice({
  name: "motifs",
  initialState: {
    motifs: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMotifs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMotifs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.motifs = action.payload;
      })
      .addCase(fetchMotifs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default motifsSlice.reducer;
