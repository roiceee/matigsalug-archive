//script for adding data to firestore
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "../firebase.ts";
import data from "./data.json";

async function addDataToFirestore(
  data: { english: string; matigsalug: string }[]
) {
  data.forEach(async (entry) => {
    const docRef = await addDoc(collection(db, "data"), {
      english: entry.english.toLowerCase(),
      matigsalug: entry.matigsalug.toLowerCase(),
    });
    console.log("Added: " + docRef);
  });
}

async function clearFirestoreDb() {
  const q = query(collection(db, "data"));

  const data = await getDocs(q);

  data.forEach(async (obj) => {
    await deleteDoc(doc(db, "data", obj.id));
  });
}

async function clearAndResetDb() {
  await clearFirestoreDb();
  await addDataToFirestore(data);
}

export default clearAndResetDb;
