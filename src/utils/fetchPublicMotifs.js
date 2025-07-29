import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function fetchPublicMotifs() {
  const snapshot = await getDocs(collection(db, "symbols"));
  return snapshot.docs.map((doc) => doc.data());
}
