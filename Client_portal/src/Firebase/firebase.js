// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBhtcV9F71dgd0dDDpGAJ7IdrYzqsL5oQs",
  authDomain: "it-portal-e57c9.firebaseapp.com",
  projectId: "it-portal-e57c9",
  storageBucket: "it-portal-e57c9.firebasestorage.app",
  messagingSenderId: "513293148204",
  appId: "1:513293148204:web:93ecbb2b875cbc06e4b189",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
