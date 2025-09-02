"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBolt, FaUsers, FaCalendarAlt, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function AboutClient() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        // Get JWT token from localStorage
        const token = localStorage.getItem('access');
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/team/`, {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : ""
          },
          credentials: "include"
        });

        if (!res.ok) {
          console.error("Failed to fetch team data");
          return;
        }

        const data = await res.json();
        setTeam(data);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0">
          <Image
            src="/images/cricket.jpg"
            alt="Cricket Court"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            About <span className="text-green-400">CricketCourt</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            CricketCourt is your ultimate platform to book cricket courts quickly
            and hassle-free. Enjoy seamless booking and play with friends anytime!
          </p>
          <Link
            href="#features"
            className="inline-block bg-green-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-green-900 transition transform hover:scale-105"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 text-center max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 bg-gray-900 rounded-xl shadow-lg hover:scale-105 transform transition">
            <FaBolt className="text-green-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Fast Booking</h3>
            <p className="text-gray-300">Book your favorite cricket courts within seconds.</p>
          </div>

          <div className="p-8 bg-gray-900 rounded-xl shadow-lg hover:scale-105 transform transition">
            <FaCalendarAlt className="text-green-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Easy Management</h3>
            <p className="text-gray-300">Manage your bookings and schedules effortlessly.</p>
          </div>

          <div className="p-8 bg-gray-900 rounded-xl shadow-lg hover:scale-105 transform transition">
            <FaUsers className="text-green-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Community</h3>
            <p className="text-gray-300">Play with friends and connect with other cricket enthusiasts.</p>
          </div>
        </div>
      </section>
<section className="py-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">About CricketCourt</h2>
        <p className="text-gray-300 text-lg md:text-xl mb-4">
          CricketCourt is your ultimate platform to book cricket courts quickly and hassle-free. 
          We provide a seamless experience for cricket enthusiasts to enjoy their games anytime, anywhere.
        </p>
        <p className="text-gray-300 text-lg md:text-xl mb-4">
          Our mission is to build a thriving cricket community, offering well-maintained courts, 
          organized tournaments, and easy scheduling for players of all skill levels.
        </p>
        <p className="text-gray-300 text-lg md:text-xl">
          Join CricketCourt today and experience the best way to play, connect, and enjoy cricket with friends.
        </p>
      </div>
    </section>
     
    </div>
  );
}
