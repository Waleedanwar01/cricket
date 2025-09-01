"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "../contexts/UserProvider";
import LogoutButton from "../LogoutProvider/LogoutButton";
import { Button } from "@/components/ui/button";
import { FiChevronDown, FiPlay, FiFlag } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname(); // current URL path
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  // ✅ helper function for active class
  const linkClass = (href) =>
    `hover:border-b-4 hover:border-green-900 transition ease-in-out hover:scale-105 transform ${
      pathname === href
        ? "border-b-4 border-green-900 text-white"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <nav
      className={`text-white sticky top-0 z-50 shadow-2xl shadow-gray-800 transition-all duration-300 ${
        isOpen ? "" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            🏏CricketCourt
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/about" className={linkClass("/about")}>
              About
            </Link>
            <Link href="/contact" className={linkClass("/contact")}>
              Contact
            </Link>
            <Link href="/booking" className={linkClass("/booking")}>
              Book
            </Link>

            {/* Tournament dropdown */}
            <div className="relative group">
              <button
                className={`inline-flex items-center gap-1 transition-all duration-200 ease-in 
                  ${
                    pathname.startsWith("/play") ||
                    pathname.startsWith("/tournament")
                      ? "border-b-4 border-green-900 text-white"
                      : "hover:border-b-4 hover:border-green-900 text-gray-400 hover:text-white"
                  }`}
              >
                <span>Tournament</span>
                <FiChevronDown
                  className={`mt-[1px] transition-transform duration-200 group-hover:rotate-180 ${
                    pathname.startsWith("/play") ||
                    pathname.startsWith("/tournament")
                      ? "text-white"
                      : ""
                  }`}
                />
              </button>
              <div className="absolute right-0 top-full origin-top-right transform opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto bg-gray-800 border border-gray-700 rounded-md mt-2 min-w-[200px] shadow-lg transition-all duration-300 ease-out">
                <Link
                  href="/play"
                  className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition-colors ${
                    pathname === "/play" ? "bg-gray-700 text-green-400" : ""
                  }`}
                >
                  <FiPlay />
                  <span>Play Tournament</span>
                </Link>
                <Link
                  href="/tournament"
                  className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition-colors ${
                    pathname === "/tournament"
                      ? "bg-gray-700 text-green-400"
                      : ""
                  }`}
                >
                  <FiFlag />
                  <span>Hold Tournament</span>
                </Link>
              </div>
            </div>

            {/* Auth */}
            {user ? (
              <div>
                <Link
                  href="/dashboard"
                  className={linkClass("/dashboard") + " mr-3"}
                >
                  Dashboard
                </Link>
                <LogoutButton />
              </div>
            ) : (
              <Button variant="outline">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none transition-all duration-200 hover:scale-110"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out backdrop-blur-sm border-t border-gray-700 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Link
          href="/"
          className={`${linkClass("/")} block px-4 py-3`}
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`${linkClass("/about")} block px-4 py-3`}
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={`${linkClass("/contact")} block px-4 py-3`}
          onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>
        <Link
          href="/booking"
          className={`${linkClass("/booking")} block px-4 py-3`}
          onClick={() => setIsOpen(false)}
        >
          Book
        </Link>

        {/* Tournament dropdown (Mobile) */}
        <details className="px-4 py-3 group">
          <summary
            className={`flex items-center justify-between cursor-pointer transition-all duration-200 ease-in ${
              pathname.startsWith("/play") || pathname.startsWith("/tournament")
                ? "border-b-4 border-green-900 text-white"
                : "hover:border-b-4 hover:border-green-900 text-gray-400 hover:text-white"
            }`}
          >
            <span>Tournament</span>
            <FiChevronDown className="transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="pl-4 mt-2 space-y-2">
            <Link
              href="/play"
              className={`block px-2 py-2 rounded transition-colors ${
                pathname === "/play"
                  ? "bg-gray-700 text-green-400"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <FiPlay className="inline mr-2" /> Play Tournament
            </Link>
            <Link
              href="/tournament"
              className={`block px-2 py-2 rounded transition-colors ${
                pathname === "/tournament"
                  ? "bg-gray-700 text-green-400"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <FiFlag className="inline mr-2" /> Hold Tournament
            </Link>
          </div>
        </details>

        {user ? (
          <div>
            <Link
              href="/dashboard"
              className={`${linkClass("/dashboard")} block px-4 py-3`}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <div className="px-4 py-3">
              <LogoutButton />
            </div>
          </div>
        ) : (
          <div className="px-4 py-3">
            <Button variant="outline">
              <Link href="/login" className="px-4">
                Login
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
