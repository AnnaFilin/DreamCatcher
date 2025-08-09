import {
  collection,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { fetchSymbolMeta } from "./fetchSymbolMeta";
import { ALLOWED_ARCHETYPES } from "../config/archetypes";

export async function saveSymbolIfNew(motif) {
  motif = typeof motif === "string" ? motif : motif?.value;
  if (!motif) return;

  const motifLower = motif.toLowerCase();

  const symbolsSnap = await getDocs(collection(db, "symbols"));
  const existing = [];

  symbolsSnap.forEach((doc) => {
    const id = doc.id.toLowerCase();
    if (
      id === motifLower ||
      id.includes(motifLower) ||
      motifLower.includes(id)
    ) {
      existing.push(id);
    }
  });

  if (existing.length > 0) {
    return;
  }

  const { arch, meaning } = await fetchSymbolMeta(motif, ALLOWED_ARCHETYPES);

  const symbolRef = doc(db, "symbols", motif);
  await setDoc(symbolRef, {
    id: motif,
    arch,
    meaning,
    createdAt: serverTimestamp(),
  });
}
