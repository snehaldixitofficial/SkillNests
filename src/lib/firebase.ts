// Firebase initialization. Config is publishable — safe in code.
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADJ-wa3WukFkqHc2qRZL7iaLYEPAsvf20",
  authDomain: "skillnests-3002c.firebaseapp.com",
  projectId: "skillnests-3002c",
  storageBucket: "skillnests-3002c.firebasestorage.app",
  messagingSenderId: "705141411993",
  appId: "1:705141411993:web:6f7a089acb897feff0e808",
  measurementId: "G-GPYTCEZQC1",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
