'use client';

import { auth } from '@/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useContext, useState, useEffect, createContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDataObject, setUserDataObject] = useState(null);
  const [loading, setLoading] = useState(true);

  //AUTH HANDLERS
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setUserDataObject(null);
    setCurrentUser(null);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      try {
        // Set the user to our local context state
        setLoading(true)
        setCurrentUser(user)
        if (!user) { 
          console.log('No user found')
          return }

        // If user exists, fetch data from firestore database
        console.log('Fetching user data...')
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        let firebaseData = {};
        if (docSnap.exists()) {
          console.log('Found user data');
          firebaseData = docSnap.data();
        }

        setUserDataObject(firebaseData);

      } catch (err) {
        console.log(err.message)
      } finally {
        setLoading(false)
      }
    })
    return unsubscribe;
  }, [])


  const value = {
    currentUser,
    userDataObject,
    setUserDataObject,
    signup,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}