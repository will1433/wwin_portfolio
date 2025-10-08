// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDQ8E8Tpkdp4nQiv8YwJ4MOABauT_mBG8",
  authDomain: "portfolio-admin-c9384.firebaseapp.com",
  projectId: "portfolio-admin-c9384",
  storageBucket: "portfolio-admin-c9384.firebasestorage.app",
  messagingSenderId: "960481217091",
  appId: "1:960481217091:web:7eebcff0d6383a06fce2f6",
  measurementId: "G-FZ4EH9X1KD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
