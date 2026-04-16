// context/AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Hardcoded “Alice” exists as both donor and volunteer
    if (email === "donor@example.com") {
      setUser({
        id: "d1",
        email: "donor@example.com",
        role: "donor",
        orgId: null,
      });
    } else if (email === "volunteer@example.com") {
      setUser({
        id: "v1",
        email: "volunteer@example.com",
        role: "volunteer",
        orgId: "org1",
      });
    } else {
      throw new Error("User not found");
    }
  };

  const logout = () => {
    setUser(null);
  };

  const signup = (email, password, role) => {
    if (email.includes("@")) {
      setUser({
        id: "d1",
        email,
        role,
        orgId: role === "volunteer" ? "org1" : null,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);