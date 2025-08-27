"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { UserProvider } from "./contexts/UserProvider";

export default function ClientProvider({ children }) {
  useEffect(() => {
    // ✅ AOS animations
    AOS.init({
      duration: 1000, // animation duration
      once: false,    // animation bar bar chale
    });

    // Smooth Scroll
    const handleWheel = (event) => {
      event.preventDefault();
      window.scrollBy({
        top: event.deltaY * 0.15, // 0.10–0.20 normal lagta hai
        behavior: "smooth",
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return <UserProvider>{children}</UserProvider>;
}
