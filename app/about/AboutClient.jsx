"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBolt, FaUsers, FaCalendarAlt } from "react-icons/fa"; // icons for features
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
// --- Metadata (server-side, SEO) ---


export default function AboutClient() {
  const [team, setteam] = useState([])

  useEffect(() => {

    const fetchTeam = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/team/", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        if (!res.ok) {
          return "Data is not fetched";
        }
        const data = await res.json()
        setteam(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchTeam()
  }, [])


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>


        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-900 to-black">
            {/* Your full page content here */}
          </div>
        )}
      </>
    );
  }

  return (

    <>


      <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center">
          {/* Background Overlay */}
          <div className="absolute inset-0">
            <Image
              src="/images/cricket.jpg"
              alt="Cricket Court"
              fill
              className="object-cover opacity-30"
            />
          </div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg" data-aos="fade">
              About <span className="text-green-400">CricketCourt</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto" data-aos="fade">
              CricketCourt is your ultimate platform to book cricket courts quickly
              and hassle-free. Enjoy seamless booking and play with friends anytime!
            </p>
            <Link
              href="#features"
              className="inline-block bg-green-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-green-900 transition transform hover:scale-105"
              data-aos="fade">
              Learn More
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-20 px-4 text-center max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-white mb-12" data-aos="fade">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 bg-gray-900 rounded-xl shadow-lg hover:scale-105 transform transition">
              <FaBolt className="text-green-400 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white" data-aos="fade">Fast Booking</h3>
              <p className="text-gray-300" data-aos="fade">
                Book your favorite cricket courts within seconds.
              </p>
            </div>

            <div className="p-8 bg-gray-900 rounded-xl shadow-lg hover:scale-105 transform transition">
              <FaCalendarAlt className="text-green-400 text-5xl mx-auto mb-4" data-aos="fade" />
              <h3 className="text-xl font-semibold mb-2 text-white" data-aos="fade">Easy Management</h3>
              <p className="text-gray-300" data-aos="fade">
                Manage your bookings and schedules effortlessly.
              </p>
            </div>

            <div className="p-8 bg-gray-900 rounded-xl shadow-lg hover:scale-105 transform transition">
              <FaUsers className="text-green-400 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white" data-aos="fade">Community</h3>
              <p className="text-gray-300" data-aos="fade">
                Play with friends and connect with other cricket enthusiasts.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4 text-center bg-gray-950/60">
          <h2 className="text-4xl font-bold text-white mb-12" data-aos="fade">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="p-6 rounded-xl shadow-lg bg-gray-900 hover:shadow-2xl transition transform hover:scale-105"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={`http://127.0.0.1:8000/media/${member.image}`}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         33vw"
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1 text-white">{member.name}</h3>
                <p className="text-green-400 font-medium mb-3">
                  {member.rank}
                </p>
                {/* Social Links */}
                <div className="flex justify-center gap-4 text-gray-400">
                  <Link href={member.facebook}><FaFacebook className="hover:text-blue-500 cursor-pointer transition" /></Link>
                  <Link href={member.twitter}><FaTwitter className="hover:text-sky-400 cursor-pointer transition" /></Link>
                  <Link href={member.linkdin}><FaLinkedin className="hover:text-blue-600 cursor-pointer transition" /></Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
