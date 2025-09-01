"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../contexts/UserProvider";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, requireAuth = true, redirectTo = "/" }) => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && requireAuth && !user) {
      toast.warning("Please login first!");
      router.push(redirectTo);
    }
  }, [user, loading]);

  if (loading || (requireAuth && !user)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
