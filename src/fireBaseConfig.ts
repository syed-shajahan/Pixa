// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCrFa836AhRchJjij64BKvFQpU5JWiM7X0",
  authDomain: "pixa-auth.firebaseapp.com",
  projectId: "pixa-auth",
  storageBucket: "pixa-auth.firebasestorage.app",
  messagingSenderId: "328685186719",
  appId: "1:328685186719:web:18e46f1d36c651a8dd3caa",
  measurementId: "G-33CQP0QFSL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)
const db = getFirestore(app)


export const  auth = getAuth(app)
;