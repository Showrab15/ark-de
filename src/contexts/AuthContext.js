"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [appUser, setAppUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('arkadeAppUser');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              uid: user.uid,
              name: user.displayName || '',
              email: user.email || '',
              photoURL: user.photoURL || ''
            }),
          });

          if (response.ok) {
            const data = await response.json();
            setAppUser(data);
            localStorage.setItem('arkadeAppUser', JSON.stringify(data));
          }
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      } else {
        setAppUser(null);
        localStorage.removeItem('arkadeAppUser');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signInWithEmailPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      if (!firebaseUser.emailVerified) {
        await signOut(auth);
        throw new Error('Email not verified');
      }

      // user state sync done by onAuthStateChanged
      return firebaseUser;
    } catch (error) {
      console.error('Error signing in with email:', error);
      throw error;
    }
  };

  const registerWithEmailPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      await sendEmailVerification(firebaseUser);
      return firebaseUser;
    } catch (error) {
      console.error('Error registering with email:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    appUser,
    loading,
    signInWithGoogle,
    signInWithEmailPassword,
    registerWithEmailPassword,
    logout,
    isAuthenticated: !!user,
    isAdmin: appUser?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}