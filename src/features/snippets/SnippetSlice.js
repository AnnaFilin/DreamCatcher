import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { getMotifs } from "../../utils/getMotifs";
import { saveSymbolIfNew } from "../../utils/saveSymbolIfNew";

export const fetchSnippets = createAsyncThunk(
  "snippets/fetchSnippets",
  async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("Not authenticated");

    const snippetsQuery = query(
      collection(db, "users", uid, "snippets"),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(snippetsQuery);

    const snippets = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      snippets.push({
        id: docSnap.id,
        text: data.text,
        isLucid: data.isLucid || false,
        vividness: data.vividness || "",
        motifs: data.motifs || [],
        createdAt: data.createdAt?.toMillis?.() || Date.now(),
      });
    });

    return snippets;
  }
);

export const addSnippet = createAsyncThunk(
  "snippets/addSnippet",
  async ({ text, isLucid, vividness, knownMotifs }) => {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("Not authenticated");

    if (!knownMotifs) knownMotifs = [];

    const motifsDocRef = doc(db, "users", uid, "meta", "motifs");

    try {
      const motifsDocSnap = await getDoc(motifsDocRef);
      if (!motifsDocSnap.exists()) {
        console.log("📂 Creating empty motifs doc...");
        await setDoc(motifsDocRef, { motifs: [] });
      }

      const motifs = await getMotifs(text, knownMotifs);
      console.log("✅ FINAL MOTIFS:", motifs);

      const newMotifs = motifs.filter((m) => !knownMotifs.includes(m));

      if (newMotifs.length > 0) {
        await setDoc(motifsDocRef, {
          motifs: [...knownMotifs, ...newMotifs],
        });
        console.log("✅ META/MOTIFS UPDATED");
      } else {
        console.log("⚠️ No new motifs to add");
      }

      for (const motif of motifs) {
        await saveSymbolIfNew(motif);
      }

      const docRef = await addDoc(collection(db, "users", uid, "snippets"), {
        text,
        isLucid,
        vividness,
        motifs,
        createdAt: serverTimestamp(),
      });

      console.log("✅ SNIPPET SAVED WITH ID:", docRef.id);

      return {
        id: docRef.id,
        text,
        isLucid,
        vividness,
        motifs,
        createdAt: Date.now(),
      };
    } catch (err) {
      console.error("❌ Firestore or GPT error:", err);
      throw err;
    }
  }
);

export const deleteSnippet = createAsyncThunk(
  "snippets/deleteSnippet",
  async (id) => {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("Not authenticated");
    await deleteDoc(doc(db, "users", uid, "snippets", id));
    return id;
  }
);

const snippetSlice = createSlice({
  name: "snippets",
  initialState: {
    snippets: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSnippets.fulfilled, (state, action) => {
        state.snippets = action.payload;
      })
      .addCase(addSnippet.fulfilled, (state, action) => {
        state.snippets.push(action.payload);
      })
      .addCase(deleteSnippet.fulfilled, (state, action) => {
        state.snippets = state.snippets.filter(
          (snippet) => snippet.id !== action.payload
        );
      });
  },
});

export default snippetSlice.reducer;
