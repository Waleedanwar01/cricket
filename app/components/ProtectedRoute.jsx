"use client";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem("access"); // token get karo
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me/`, {
          headers: {
            "Authorization": `Bearer ${accessToken}`, // 👈 token bhejna zaroori hai
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null); // token expired or invalid
        }
      } catch (err) {
        console.error("User fetch failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
