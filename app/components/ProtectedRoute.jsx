"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../contexts/UserProvider";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children, requireAuth = true, redirectTo = "/" }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        // User must be logged in but isn't
        toast.error("Please login to access this page");
        router.push("/login");
      } else if (!requireAuth && user) {
        // User must NOT be logged in but is
        toast.info("You are already logged in!");
        router.push(redirectTo);
      }
    }
  }, [user, loading, requireAuth, redirectTo, router]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  // Don't render children if authentication requirement is not met
  if (requireAuth && !user) {
    return null;
  }

  if (!requireAuth && user) {
    return null;
  }

  return children;
} 