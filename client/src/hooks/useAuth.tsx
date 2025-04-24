import React, { createContext, useContext, useState } from "react";
import { User } from "../api";

interface AuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
}
const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
});

interface Props {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
