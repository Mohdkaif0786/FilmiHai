// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAtek0fFMZaIw8MbI6-871qQqwlhxtcnkY",
  authDomain: "filmyzone-9f136.firebaseapp.com",
  projectId: "filmyzone-9f136",
  storageBucket: "filmyzone-9f136.appspot.com",
  messagingSenderId: "484797668961",
  appId: "1:484797668961:web:a8487d4e172404bf459420"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const moviesRef=collection(db,"movies");
export const reviewsRef=collection(db,"reviews");
export const usersRef=collection(db,"user");
export default app;