"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { CiLogin } from "react-icons/ci";
import ProtectedRoute from "../components/ProtectedRoute";
import apiConfig from "@/lib/api";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000); // simulate loading
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 borde-green-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }
    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // ✅ save tokens
                localStorage.setItem("access", data.jwt_access);
                localStorage.setItem("refresh", data.jwt_refresh);
                toast.success(data.message); // ✅ show success
                window.location.href = "/";
            } else {
                toast.error(data.error); // ❌ show error
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        }

    }

    return (
        <ProtectedRoute requireAuth={false} redirectTo="/">
            <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]">
                <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 sm:p-10">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>

                    {/* Normal login form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 mb-2">Username</label>
                            <input
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition text-black"
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
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition text-black"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-white shadow-xl border border-black text-black font-semibold py-3 rounded-lg hover:scale-105 transform transition flex items-center justify-center gap-2"
                        >
                            <CiLogin className="text-xl" />
                            Login
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <hr className="flex-1 border-gray-300" />
                        <span className="mx-2 text-gray-500">OR</span>
                        <hr className="flex-1 border-gray-300" />
                    </div>

                    {/* Google login */}
                    <a
                        href="https://web-staging-cc40.up.railway.app/accounts/login/google-oauth2/?next=https://cricket-zeta-hazel.vercel.app"
                        className="w-full flex items-center justify-center gap-2 bg-white shadow-xl text-black py-3 rounded-lg font-semibold hover:scale-105 border-1 border-black transition"
                    >
                        <FcGoogle className="text-xl bg-white rounded-full" />
                        Login with Google
                    </a>


                    <p className="text-center text-gray-500 mt-6">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-gray-500 font-medium hover:underline">
                            Signup
                        </a>
                    </p>
                </div>
            </div>
        </ProtectedRoute>
    );
}
