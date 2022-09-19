import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiRE9rxcxboO1fpsiTQ7BMwMlbtRqhmXI",
  authDomain: "snapchat-117ad.firebaseapp.com",
  projectId: "snapchat-117ad",
  storageBucket: "snapchat-117ad.appspot.com",
  messagingSenderId: "5540996455",
  appId: "1:5540996455:web:7c08cb251049b80891bbc2",
  measurementId: "G-YYCZ1PYGMH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
