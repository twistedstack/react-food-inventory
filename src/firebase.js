// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDZdAEN9rYv8Xme94kmd28KeJpvQ_v52jk",
  authDomain: "food-project-4b9c2.firebaseapp.com",
  projectId: "food-project-4b9c2",
  storageBucket: "food-project-4b9c2.appspot.com",
  messagingSenderId: "468121867713",
  appId: "1:468121867713:web:c1c1b382bebcfc85dacb40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);