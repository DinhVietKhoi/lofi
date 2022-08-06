import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIa3BJYGkoDqqpczQA19kvObVv4r-b-H0",
  authDomain: "lofi-d6b4a.firebaseapp.com",
  projectId: "lofi-d6b4a",
  storageBucket: "lofi-d6b4a.appspot.com",
  messagingSenderId: "259308839157",
  appId: "1:259308839157:web:cc7c0251d21df230bce5bc",
  measurementId: "G-C9DZXDQ27G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;
