import React, { useEffect } from 'react'
import { createContext } from 'react'
import { useState } from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext()
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading,setLoading]=useState(true)

    
    //create an account
    const createUser =  (email, password) => {
        return  createUserWithEmailAndPassword(auth, email, password)
      
    }
    //Sign Up with gmail

    const signInWithGmail =  () => {
        return signInWithPopup(auth, googleProvider)

    }

    //logain using email and password

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //logout
    const logout = () => {
        return signOut(auth)
    }

    //update profile
    const updateUserProfile = (name,photoURL) => {
       return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
          })
      
    }

    //check signed in user
       useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
           
                setUser(currentUser)
                setLoading(false)
            
          });
            return () =>{
              return unsubscribe();
            }
       },[])




    const authInfo = {
        user,
        createUser,
        signInWithGmail,
        login,
        logout,
        updateUserProfile,
        loading
    }
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider