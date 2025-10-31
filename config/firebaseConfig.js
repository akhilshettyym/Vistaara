import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-O7yENZx3wrLFvQLt-XIO8LLscVWQGGA",
  authDomain: "vistaara-a6b3d.firebaseapp.com",
  projectId: "vistaara-a6b3d",
  storageBucket: "vistaara-a6b3d.firebasestorage.app",
  messagingSenderId: "318884238619",
  appId: "1:318884238619:web:f9723ce982ce5df8ddefbe",
  measurementId: "G-QWZXZP6RS2"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);