// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOAHvs-q59jZCFl1HMF7pdrdToUgI3GbM",
  authDomain: "studybro-f8884.firebaseapp.com",
  databaseURL: "https://studybro-f8884-default-rtdb.firebaseio.com",
  projectId: "studybro-f8884",
  storageBucket: "studybro-f8884.appspot.com",
  messagingSenderId: "466749782222",
  appId: "1:466749782222:web:a2fee189fe8e002fc2789f",
  measurementId: "G-NJDTYZC23R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export storage and database
export const storage = getStorage(app);
export const db = getFirestore(app);
