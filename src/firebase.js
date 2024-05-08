// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-next-b0126.firebaseapp.com",
  projectId: "x-next-b0126",
  storageBucket: "x-next-b0126.appspot.com",
  messagingSenderId: "319623432192",
  appId: "1:319623432192:web:0433d515efe23dc977b0e5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
