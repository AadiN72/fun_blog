import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhVfS1OkcC5ptniSE5lisfjS6Eslhz72g",
  authDomain: "personal-blog-9b829.firebaseapp.com",
  projectId: "personal-blog-9b829",
  storageBucket: "personal-blog-9b829.firebasestorage.app",
  messagingSenderId: "495689537579",
  appId: "1:495689537579:web:5795be795769ba659ff26e",
  measurementId: "G-XM4Y19T6SZ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
