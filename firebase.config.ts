import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// api key and other config values
const firebaseConfig = {
  apiKey: "AIzaSyAddjnWNufLkSsCZiWvjoAb2Y5-HkF_CkM",
  authDomain: "assignment4-109a1.firebaseapp.com",
  projectId: "assignment4-109a1",
  storageBucket: "assignment4-109a1.firebasestorage.app",
  messagingSenderId: "244687303389",
  appId: "1:244687303389:web:ebe44a6c97edf396fc2134"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
