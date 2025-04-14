// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7cFFbka-dN796_DSZZRKXSNIEww9Tpcg",
  authDomain: "sistema-ead-1f362.firebaseapp.com",
  projectId: "sistema-ead-1f362",
  storageBucket: "sistema-ead-1f362.firebasestorage.app",
  messagingSenderId: "608974026947",
  appId: "1:608974026947:web:ee95ae6ff6c95ff49e8a76",
  measurementId: "G-BYLJPR336C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);