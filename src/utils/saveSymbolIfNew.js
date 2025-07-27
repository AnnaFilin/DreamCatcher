import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { fetchSymbolMeta } from "./fetchSymbolMeta";
import { ALLOWED_ARCHETYPES } from "../config/archetypes";

export async function saveSymbolIfNew(motif) {
  const symbolRef = doc(db, "symbols", motif);
  const symbolSnap = await getDoc(symbolRef);

  if (!symbolSnap.exists()) {
    console.log(`📌 Adding new motif to /symbols with GPT: ${motif}`);
    const { arch, meaning } = await fetchSymbolMeta(motif, ALLOWED_ARCHETYPES);
    await setDoc(symbolRef, {
      id: motif,
      arch,
      meaning,
      createdAt: serverTimestamp(),
    });
  } else {
    console.log(`✅ Motif already in /symbols: ${motif}`);
  }
}
