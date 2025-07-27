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

// export const addSnippet = createAsyncThunk(
//   "snippets/addSnippet",
//   async ({ text, isLucid, vividness, knownMotifs }) => {
//     const uid = auth.currentUser?.uid;
//     if (!uid) throw new Error("Not authenticated");

//     if (!knownMotifs) knownMotifs = [];

//     const motifsDocRef = doc(db, "users", uid, "meta", "motifs");

//     try {
//       const motifsDocSnap = await getDoc(motifsDocRef);
//       if (!motifsDocSnap.exists()) {
//         console.log("📂 Creating empty motifs doc...");
//         await setDoc(motifsDocRef, { motifs: [] });
//       }

//       // const motifs = ["forest", "door", "trees"];
//       // console.log("✅ MOCK MOTIFS:", motifs);

//       // const newMotifs = motifs.filter((m) => !knownMotifs.includes(m));
//       // console.log("✅ NEW MOTIFS TO SAVE:", newMotifs);

//       const prompt = `
// Here is a dream text: """${text}"""

// The dream may be in any language.

// Known motifs so far: [${knownMotifs.join(", ")}].

// Extract 1–3 key motifs as clear English words or short phrases.
// If any new motif matches the meaning of an existing one — reuse it.
// If the meaning is truly new — add it.

// Return only a comma-separated list.
// Do not add any extra text.
// `;

//       const response = await fetch(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
//           },
//           body: JSON.stringify({
//             model: "gpt-4o",
//             messages: [
//               {
//                 role: "system",
//                 content: "You help analyze dreams and extract motifs.",
//               },
//               {
//                 role: "user",
//                 content: prompt,
//               },
//             ],
//           }),
//         }
//       );

//       const data = await response.json();
//       if (!response.ok) {
//         console.error("❌ GPT error:", data);
//         throw new Error(data?.error?.message || "GPT failed");
//       }

//       const raw = data.choices[0].message.content;

//       console.log("✅ GPT RAW:", raw);

//       const cleaned = raw.replace(/Motifs:\s*/i, "").trim();
//       const motifs = cleaned
//         .split(",")
//         .map((w) => w.trim())
//         .filter(Boolean);

//       console.log("✅ FINAL MOTIFS:", motifs);

//       const newMotifs = motifs.filter((m) => !knownMotifs.includes(m));

//       if (newMotifs.length > 0) {
//         await setDoc(motifsDocRef, {
//           motifs: [...knownMotifs, ...newMotifs],
//         });
//         console.log("✅ META/MOTIFS UPDATED");
//       } else {
//         console.log("⚠️ No new motifs to add");
//       }

//       for (const motif of motifs) {
//         const symbolRef = doc(db, "symbols", motif);
//         const symbolSnap = await getDoc(symbolRef);

//         if (!symbolSnap.exists()) {
//           console.log(`📌 Adding new motif to /symbols with GPT: ${motif}`);
//           const { arch, meaning } = await fetchSymbolMeta(
//             motif,
//             ALLOWED_ARCHETYPES
//           );
//           await setDoc(symbolRef, {
//             id: motif,
//             arch,
//             meaning,
//             createdAt: serverTimestamp(),
//           });
//         } else {
//           console.log(`✅ Motif already in /symbols: ${motif}`);
//         }
//       }

//       const docRef = await addDoc(collection(db, "users", uid, "snippets"), {
//         text,
//         isLucid,
//         vividness,
//         motifs,
//         createdAt: serverTimestamp(),
//       });

//       console.log("✅ SNIPPET SAVED WITH ID:", docRef.id);

//       return {
//         id: docRef.id,
//         text,
//         isLucid,
//         vividness,
//         motifs,
//         createdAt: Date.now(),
//       };
//     } catch (err) {
//       console.error("❌ Firestore or GPT error:", err);
//       throw err;
//     }
//   }
// );

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
