// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7YF6PazsYRWItIYKRvD0YxMguYiRIg6Q",
  authDomain: "chat-room-3750c.firebaseapp.com",
  projectId: "chat-room-3750c",
  storageBucket: "chat-room-3750c.appspot.com",
  messagingSenderId: "10485404343",
  appId: "1:10485404343:web:f4df5ba421bc6f710a3332"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
