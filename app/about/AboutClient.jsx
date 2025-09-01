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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/team/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-900 to-black">
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

      {/* Team Section */}
      <section className="py-20 px-4 text-center bg-gray-950/60">
        <h2 className="text-4xl font-bold text-white mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <div
              key={index}
              className="p-6 rounded-xl shadow-lg bg-gray-900 hover:shadow-2xl transition transform hover:scale-105"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={member.image ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/media/${member.image}` : "/images/default-avatar.png"}
                  alt={member.name || "Team Member"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1 text-white">{member.name || "Unknown"}</h3>
              <p className="text-green-400 font-medium mb-3">{member.rank || "Member"}</p>

              {/* Social Links */}
              <div className="flex justify-center gap-4 text-gray-400">
                {member.facebook && (
                  <Link href={member.facebook} target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="hover:text-blue-500 cursor-pointer transition" />
                  </Link>
                )}
                {member.twitter && (
                  <Link href={member.twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="hover:text-sky-400 cursor-pointer transition" />
                  </Link>
                )}
                {member.linkedin && (
                  <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="hover:text-blue-600 cursor-pointer transition" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
