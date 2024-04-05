import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tribe-language.firebaseapp.com",
  projectId: "tribe-language",
  storageBucket: "tribe-language.appspot.com",
  messagingSenderId: "982455078894",
  appId: "1:982455078894:web:910670a51a6ae0ea3b88ff",
  measurementId: "G-H49FV9QNYK",
};

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app);

export {app, analytics, db};
