import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "firebase/auth";

interface AuthContextType {
  user: User | null; 
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean; 
  logout: () => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    setUser(null); 
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user, 
        logout,
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
