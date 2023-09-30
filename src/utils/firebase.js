// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyComm4dh45acXVdsRAqESyOZOgTyUYDLIw",
  authDomain: "netflixgpt-159aa.firebaseapp.com",
  projectId: "netflixgpt-159aa",
  storageBucket: "netflixgpt-159aa.appspot.com",
  messagingSenderId: "688734683308",
  appId: "1:688734683308:web:1c6fbabe91a089245d5f09",
  measurementId: "G-F60CMWSFWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();
