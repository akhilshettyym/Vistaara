// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-O7yENZx3wrLFvQLt-XIO8LLscVWQGGA",
  authDomain: "vistaara-a6b3d.firebaseapp.com",
  projectId: "vistaara-a6b3d",
  storageBucket: "vistaara-a6b3d.firebasestorage.app",
  messagingSenderId: "318884238619",
  appId: "1:318884238619:web:f9723ce982ce5df8ddefbe",
  measurementId: "G-QWZXZP6RS2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);