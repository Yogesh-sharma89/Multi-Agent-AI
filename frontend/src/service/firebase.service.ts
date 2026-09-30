// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7DiC7Jnk0Wy1HAw6onBFdUDByJothZcE",
  authDomain: "multi-agent-ai-b94b7.firebaseapp.com",
  projectId: "multi-agent-ai-b94b7",
  storageBucket: "multi-agent-ai-b94b7.firebasestorage.app",
  messagingSenderId: "29241991730",
  appId: "1:29241991730:web:967e7bb72c5cfd2a0b522b",
  measurementId: "G-4VQ4XX4HHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);