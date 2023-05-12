import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaa4wUfLii5TVuQg8GZ9-uExGfZr7HStQ",
  authDomain: "petconnect-2e6a9.firebaseapp.com",
  projectId: "petconnect-2e6a9",
  storageBucket: "petconnect-2e6a9.appspot.com",
  messagingSenderId: "405923028901",
  appId: "1:405923028901:web:2b314dd6f0e9179092924c",
  measurementId: "G-FH6Z9WRDBZ",
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);
