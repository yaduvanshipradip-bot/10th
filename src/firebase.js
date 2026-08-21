// Firebase Configuration & Initialization
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC-L0taKk5NVRsGH1_Sr7c0hz0rmOzCfFw",
  authDomain: "th-53d0c.firebaseapp.com",
  projectId: "th-53d0c",
  storageBucket: "th-53d0c.firebasestorage.app",
  messagingSenderId: "174902939460",
  appId: "1:174902939460:web:d3b9fe2558ac9fb5c75111"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);