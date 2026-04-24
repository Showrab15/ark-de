// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
 apiKey: "AIzaSyCAjwzJaepdz3nc_uwQ1gUh7DyQJlEVsNA",
  authDomain: "arkade-9a528.firebaseapp.com",
  projectId: "arkade-9a528",
  storageBucket: "arkade-9a528.firebasestorage.app",
  messagingSenderId: "847360584705",
  appId: "1:847360584705:web:67bb10a1ff18eb78df6400"
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