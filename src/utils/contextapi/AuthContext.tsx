import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../fireBaseConfig";

interface AuthContextType {
  user: User | null; 
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean; 
  logOut: () => void; 
  googleSignIn: ()=>void;
  emailSign: (email: string, password: string) => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const logOut = () => {
    signOut(auth); 
  };

  const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };

  const emailSign = (name:string , Password:string )=>{
    signInWithEmailAndPassword(auth, name , Password)

  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user, 
        logOut,
        googleSignIn,
        emailSign
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
