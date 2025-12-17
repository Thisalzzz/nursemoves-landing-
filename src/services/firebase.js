// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP6ItUfODTTmBYm3rc4cp9RbccHVUDpFg",
  authDomain: "landing-page-9eeb5.firebaseapp.com",
  projectId: "landing-page-9eeb5",
  storageBucket: "landing-page-9eeb5.firebasestorage.app",
  messagingSenderId: "573772829005",
  appId: "1:573772829005:web:eff88bdcb7628ce6c9e704"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);