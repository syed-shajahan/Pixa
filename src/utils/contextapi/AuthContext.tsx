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
  SignUp:(email: string, password: string) => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const logOut = () => {
    signOut(auth); 
  };

  const googleSignIn = async() => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };

  const emailSign = async(email:string , Password:string )=>{
   await signInWithEmailAndPassword(auth, email , Password)

  }


  const SignUp=async (email:string , Password:string)=>{
     createUserWithEmailAndPassword(auth, email , Password);

}

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user, 
        logOut,
        googleSignIn,
        emailSign,
        SignUp
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
