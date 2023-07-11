// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC420z35YtymsLBjh1XeB_oJQREyihEqYM",
  authDomain: "fire-auth-metamask.firebaseapp.com",
  projectId: "fire-auth-metamask",
  storageBucket: "fire-auth-metamask.appspot.com",
  messagingSenderId: "555894209055",
  appId: "1:555894209055:web:90693a2ee48bd2749e732a",
  measurementId: "G-RML94XB7F6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);