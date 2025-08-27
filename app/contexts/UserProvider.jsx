"use client";

import { createContext, useContext, useEffect, useState } from "react";
import apiConfig from "@/lib/api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user from backend
  const fetchUser = async () => {
    try {
      const res = await fetch(apiConfig.endpoints.auth.me, {
        credentials: "include", // important for cookies
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for easy access
export const useUser = () => useContext(UserContext);
