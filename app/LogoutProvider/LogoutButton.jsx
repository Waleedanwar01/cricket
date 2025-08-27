"use client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUser } from "../contexts/UserProvider";
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
  const { user, setUser, loading } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    // Check if user is actually logged in
    if (!user) {
      toast.error("You are not logged in!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/auth/logout/", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      toast.success(data.message || "Logged out successfully");
      setUser(null);
      router.push("/login");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  // Don't show logout button if user is not logged in
  if (loading) {
    return <Button variant="outline" disabled>Loading...</Button>;
  }

  if (!user) {
    return null; // Don't show logout button if not logged in
  }

  return (
    <Button variant="outline" onClick={handleLogout}>Logout</Button>
  );
}
