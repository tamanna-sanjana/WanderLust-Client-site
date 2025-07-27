import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase.init';

const AuthProvider = ({children}) => {
const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setLoading(false);
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };
  

  const GoogleProvider = new GoogleAuthProvider();


  const userInfo = {
    register,
    loading,
    setLoading,
    user,
    setUser,
    login,
    logout,
    GoogleProvider,
  };
    return (
        <>
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
            
        </>
    );
};

export default AuthProvider;