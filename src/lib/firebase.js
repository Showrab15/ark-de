// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCfiOL5l1N1Ozn5IkhAl5oBC6mg7qEZMfQ",
  authDomain: "arcade-e8b7c.firebaseapp.com",
  projectId: "arcade-e8b7c",
  storageBucket: "arcade-e8b7c.firebasestorage.app",
  messagingSenderId: "230491133244",
  appId: "1:230491133244:web:af1206e60bbbf707ca3a39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;