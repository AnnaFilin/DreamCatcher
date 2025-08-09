import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { getMotifs } from "../utils/getMotifs";
import { saveSymbolIfNew } from "../utils/saveSymbolIfNew";
import { validateDreamText } from "../utils/sanitize";

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
        interpretations: data.interpretations || [],

        createdAt: data.createdAt?.toMillis?.() || Date.now(),
      });
    });

    return snippets;
  }
);

export const saveInterpretation = createAsyncThunk(
  "snippets/saveInterpretation",
  async ({ snippetId, interpretationText }) => {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("Not authenticated");

    const snippetRef = doc(db, "users", uid, "snippets", snippetId);

    const newInterpretation = {
      id: Date.now().toString(),
      text: interpretationText,
      createdAt: new Date().toISOString(),
    };

    await updateDoc(snippetRef, {
      interpretations: arrayUnion(newInterpretation),
    });

    return { snippetId, interpretation: newInterpretation };
  }
);

export const addSnippet = createAsyncThunk(
  "snippets/addSnippet",
  async ({ text, isLucid, vividness, knownMotifs }) => {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("Not authenticated");

    const checked = validateDreamText(text);
    if (!checked.ok) {
      throw new Error(
        checked.reason === "too_short" ? "Dream too short" : "Dream too long"
      );
    }
    const safeText = checked.value;

    try {
      const motifsDocRef = doc(db, "users", uid, "meta", "motifs");

      const symbolsSnapshot = await getDocs(collection(db, "symbols"));

      const globalMotifIds = symbolsSnapshot.docs
        .map((doc) => doc.id)
        .filter((id) => typeof id === "string")
        .map((id) => id.toLowerCase());

      const rawMotifs = knownMotifs || [];

      const existingMotifs = rawMotifs.map((m) =>
        typeof m === "string" ? { value: m, count: 1 } : m
      );

      const userMotifValues = existingMotifs.map((m) => m.value.toLowerCase());

      const knownValues = [...new Set([...userMotifValues, ...globalMotifIds])];

      const motifsFromGPT = await getMotifs(safeText, knownValues);

      // console.log("🧠 GPT motifs:", motifsFromGPT);
      // console.log("📌 Known motifs (user):", userMotifValues);
      // console.log("🌐 Global motifs:", globalMotifIds);

      const motifsForSnippet = [];
      const updatedMotifs = [...existingMotifs];

      for (const motif of motifsFromGPT) {
        const lower = motif.toLowerCase();
        const existing = updatedMotifs.find(
          (m) => m.value.toLowerCase() === lower
        );

        if (existing) {
          const updated = {
            ...existing,
            count: (existing.count || 1) + 1,
          };

          const index = updatedMotifs.findIndex(
            (m) => m.value.toLowerCase() === lower
          );
          updatedMotifs[index] = updated;

          motifsForSnippet.push(updated.value);
        } else {
          const value = typeof motif === "string" ? motif : motif.value;
          updatedMotifs.push({ value, count: 1 });
          motifsForSnippet.push(value);
          await saveSymbolIfNew(value);
        }
      }

      // console.log("🔁 Final motifs for snippet:", motifsForSnippet);
      // console.log("🧾 Updated meta.motifs:", updatedMotifs);

      await setDoc(motifsDocRef, { motifs: updatedMotifs });

      const docRef = await addDoc(collection(db, "users", uid, "snippets"), {
        text: safeText,
        isLucid,
        vividness,
        motifs: motifsForSnippet.map((m) =>
          typeof m === "string" ? m : m.value
        ),

        createdAt: serverTimestamp(),
      });

      // console.log("✅ Snippet saved with ID:", docRef.id);

      return {
        id: docRef.id,
        text: safeText,
        isLucid,
        vividness,
        motifs: motifsForSnippet,
        createdAt: Date.now(),
      };
    } catch (err) {
      console.error("❌ Error saving snippet:", err);
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
      .addCase(saveInterpretation.fulfilled, (state, action) => {
        const { snippetId, interpretation } = action.payload;
        const target = state.snippets.find((s) => s.id === snippetId);
        if (target) {
          target.interpretations = [
            ...(target.interpretations || []),
            interpretation,
          ].slice(-3);
        }
      })
      .addCase(deleteSnippet.fulfilled, (state, action) => {
        state.snippets = state.snippets.filter(
          (snippet) => snippet.id !== action.payload
        );
      });
  },
});

export default snippetSlice.reducer;
