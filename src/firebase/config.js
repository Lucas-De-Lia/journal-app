// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_YyhUTs7-xWBSAi4aqEJcC7S0l5pkPfo",
  authDomain: "react-cursos-58da1.firebaseapp.com",
  projectId: "react-cursos-58da1",
  storageBucket: "react-cursos-58da1.firebasestorage.app",
  messagingSenderId: "37423155179",
  appId: "1:37423155179:web:828bf59d0fb154a9ca7bae"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);