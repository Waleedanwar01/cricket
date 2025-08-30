"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ProtectedRoute from "../components/ProtectedRoute";
import { FcGoogle } from "react-icons/fc";
import { FaUserPlus } from "react-icons/fa";   

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        credentials: "include", // important if backend sets cookies
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message); // ✅ show success
        // optional: redirect after signup
        window.location.href = "/login";
      } else {
        toast.error(data.error); // ❌ show error
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <ProtectedRoute requireAuth={false} redirectTo="/">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 sm:p-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Signup <span className="text-green-500 font-bold">Cricket Court</span></h1>
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
        <button
  type="submit"
  className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:scale-105 transition transform ease-in-out shadow-2xl border-2 border-gray-500 hover:border-3 flex items-center justify-center gap-2"
>
  <FaUserPlus className="text-xl" />
  Signup Now
</button>


                              {/* Divider */}
                              <div className="flex items-center my-6">
                                  <hr className="flex-1 border-gray-300" />
                                  <span className="mx-2 text-gray-500">OR</span>
                                  <hr className="flex-1 border-gray-300" />
                              </div>
          
                              {/* Google login */}
                              <a
                                  href="http://localhost:8000/accounts/login/google-oauth2/?next=http://localhost:3000"
                                  className="w-full flex items-center justify-center gap-2 bg-white shadow-xl text-black py-3 rounded-lg font-semibold hover:scale-105 border-1 border-black transition"
                              >
                                  <FcGoogle className="text-xl bg-white rounded-full" />
                                  Login with Google
                              </a>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-gray-500 font-medium hover:underline">
            Login
          </a>
        </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
