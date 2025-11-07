import { createContext, useContext, useState } from "react";
import { MOCK_DB } from "../mock/mockDb";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // stato che tiene l'utente corrente
  const [user, setUser] = useState(
    MOCK_DB.users.find(u => u.id === "user-admin-1") // default admin
  );

  const allUsers = MOCK_DB.users;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);