"use client";
import { FaSignInAlt, FaCalendarAlt, FaClock, FaRegCalendarCheck, FaListOl, FaCheckCircle } from "react-icons/fa";
import { MdSportsTennis } from "react-icons/md";
import Splade from './components/Splade'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  MdOutlineSportsCricket,
  MdOutlineLocalCafe,
  MdEventSeat,
} from "react-icons/md";
import { GiTrophyCup } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Fullscreen } from "lucide-react";
import ParticlesScene from "./components/ParticalsScene";

// Typing effect component
const TypingText = ({ texts, speed = 15, pause = 1700 }) => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let timeout;
    if (displayed.length < texts[index].length) {
      timeout = setTimeout(
        () => setDisplayed(texts[index].slice(0, displayed.length + 1)),
        speed
      );
    } else {
      timeout = setTimeout(() => {
        setDisplayed("");
        setIndex((prev) => (prev + 1) % texts.length);
      }, pause);
    }
    return () => clearTimeout(timeout);
  }, [displayed, index, texts, speed, pause]);

  return <span>{displayed}</span>;
};

export default function HomeClient() {
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
    
    <main className="relative flex-1 flex flex-col justify-start items-center text-center w-full overflow-x-hidden px-4 py-20 bg-gradient-to-b from-green-900 via-gray-900 to-black">
       {/* ✅ Particles Background */}
  <ParticlesScene />

      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex-1 text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-green-400">
            <TypingText
              texts={[
                "Hi, from CricketCourt",
                "Book Your Court",
                "Play With Friends",
                "Play With Passion",
              ]}
            />
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-200 max-w-lg" data-aos="fade">
            Book your cricket courts quickly and enjoy your games with friends.
            Experience modern facilities, fast booking, and a community of
            cricket enthusiasts.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <Link href="/booking">Book Now</Link>
            </Button>
            <Button className="hover:border-2 hover:border-green-500 text-green-500 hover:scale-105 transform hover:bg-white transition ease-in border-2 border-white rounded-2xl">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 relative w-full h-96 md:h-[28rem] overflow-hidden">
          {/* Top Left - Small */}
          <div className="absolute top-0 left-0 w-1/3 h-1/2 rounded-2xl overflow-hidden shadow-2xl z-10">
            <Image
              src="/images/ball.jpg"
              alt="Top Left Small"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
             fill
              priority
            />
          </div>

          {/* Top Right - Large */}
          <div className="absolute top-0 right-0 w-2/3 h-1/2 rounded-2xl overflow-hidden shadow-2xl z-20">
            <Image
              src="/images/cricket1.jpg"
              alt="Top Right Large"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              fill
               priority
            />
          </div>

          {/* Bottom Left - Large */}
          <div className="absolute bottom-0 left-0 w-2/3 h-1/2 rounded-2xl overflow-hidden shadow-2xl z-20">
            <Image
              src="/images/cricket3.jpg"
              alt="Bottom Left Large"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              fill
               priority
            />
          </div>

          {/* Bottom Right - Small */}
          <div className="absolute bottom-0 right-0 w-1/3 h-1/2 rounded-2xl overflow-hidden shadow-2xl z-10">
            <Image
              src="/images/ball2.jpg"
              alt="Bottom Right Small"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
               fill
                priority
            />
          </div>
        </div>
      </section>

      {/* Features Carousel */}
      <section className="w-full max-w-5xl mt-20" >
        
        <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-8">
          Explore Our Facilities
        </h2>
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent className="gap-4">
            {[
              { icon: <MdOutlineSportsCricket />, label: "Cricket" },
              { icon: <MdOutlineLocalCafe />, label: "Cafe" },
              { icon: <MdEventSeat />, label: "Seating Area" },
              { icon: <GiTrophyCup />, label: "Tournaments" },
              { icon: <FaUsers />, label: "Teams" },
            ].map((item, idx) => (
              <CarouselItem
                key={idx}
                className="md:basis-1/2 lg:basis-1/3 h-48 flex flex-col items-center justify-center rounded-xl bg-gray-800 hover:bg-gray-700 transition shadow-lg"
              >
                <div className="text-6xl text-green-400">{item.icon}</div>
                <p className="mt-2 text-lg font-semibold text-gray-100">
                  {item.label}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="text-green-400 hover:text-green-300" />
          <CarouselNext className="text-green-400 hover:text-green-300" />
        </Carousel>
      </section>

      {/* Statistics Section */}
      <section className="w-full max-w-5xl mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition">
          <h3 className="text-4xl font-bold text-green-400 mb-2" data-aos="fade">50+</h3>
          <p className="text-gray-200">Courts Available</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition">
          <h3 className="text-4xl font-bold text-green-400 mb-2" data-aos="fade">1000+</h3>
          <p className="text-gray-200">Happy Players</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition">
          <h3 className="text-4xl font-bold text-green-400 mb-2" data-aos="fade">25+</h3>
          <p className="text-gray-200">Tournaments</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition">
          <h3 className="text-4xl font-bold text-green-400 mb-2" data-aos="fade">10+</h3>
          <p className="text-gray-200" >Years of Experience</p>
        </div>
      </section>

      {/* Call-to-action Section */}
      <section className="w-full max-w-4xl mt-20 bg-gray-800 p-12 rounded-2xl shadow-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400" data-aos="fade">
          Ready to Play?
        </h2>
        <p className="text-gray-200 mb-6" data-aos="fade">
          Reserve your cricket court today and join a vibrant community of
          cricket lovers.
        </p>
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          <Link href="/booking" data-aos="fade">Book Your Court</Link>
        </Button>
      </section>

      <section className="w-full py-16 bg-gray-900 mt-20 rounded-full transition-colors duration-300" data-aos="fade">
      <div className="max-w-3xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white" data-aos="fade">
            How to Book a Court
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400" data-aos="fade">
            Follow these simple steps to complete your booking.
          </p>
        </div>

        {/* Steps */}
        <ol className="space-y-6 text-lg text-gray-800 dark:text-gray-300">
          <li className="flex items-start gap-3">
            <FaSignInAlt className="mt-1 text-green-600 dark:text-green-400" data-aos="fade" />
            <span> Login to your account</span>
          </li>

          <li className="flex items-start gap-3" data-aos="fade">
            <MdSportsTennis className="mt-1 text-green-600 dark:text-green-400" />
            <span>
              Go to the{" "}
              <span className="font-semibold text-green-600 dark:text-green-400">
                Book Court
              </span>{" "}
              page
            </span>
          </li>

          <li className="flex items-start gap-3" data-aos="fade">
            <FaCalendarAlt className="mt-1 text-green-600 dark:text-green-400" />
            <span>Select your preferred date</span>
          </li>

          <li className="flex items-start gap-3" data-aos="fade">
            <FaClock className="mt-1 text-green-600 dark:text-green-400" />
            <span>
              Select the start time (e.g., 7 AM, 3 PM, 7 PM)
            </span>
          </li>

          <li className="flex items-start gap-3" data-aos="fade">
            <FaListOl className="mt-1 text-green-600 dark:text-green-400" />
            <span>Select total hours (up to 5)</span>
          </li>

          <li className="flex items-start gap-3" data-aos="fade">
            <FaRegCalendarCheck className="mt-1 text-green-600 dark:text-green-400" />
            <span>
              Press the{" "}
              <span className="font-semibold text-green-600 dark:text-green-400">
                Book Now
              </span>{" "}
              button
            </span>
          </li>

          <li className="flex items-start gap-3" data-aos="fade">
            <FaCheckCircle className="mt-1 text-green-600 dark:text-green-400" />
            <span>Check your email for booking confirmation</span>
          </li>
        </ol>
      </div>
    </section>


    <section>
      <div>
        <Splade / >
      </div>
    </section>
    </main>
  );
}
