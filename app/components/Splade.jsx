"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";
import { FaGoogle } from "react-icons/fa6";
import { FaMicrosoft } from "react-icons/fa";
import { FaAmazon } from "react-icons/fa";
import { RiNetflixFill } from "react-icons/ri";

// React Icons (Brand Logos)



export default function Partners() {
  return (
    <section className="w-full py-12 text-white">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-wide">Our Partners</h2>
        <p className="text-gray-400 mt-2">Trusted by leading companies worldwide</p>
      </div>

      {/* Logos Carousel */}
      <div className="w-full">
        <Splide
          options={{
            type: "loop",
            drag: "free",
            focus: "center",
            perPage: 4,       // Desktop default
            arrows: false,
            pagination: false,
            gap: "2rem",
            autoScroll: {
              speed: 2,       // Desktop speed slightly faster
            },
            breakpoints: {
              1024: { perPage: 3, autoScroll: { speed: 2 } },  // Laptop/tablet
              768: { perPage: 2, autoScroll: { speed: 3 } },   // Mobile - show 2 logos & faster
              480: { perPage: 2, autoScroll: { speed: 3.5 } }, // Small mobile - still 2 logos & faster
            },
          }}
          extensions={{ AutoScroll }}
        >
          {/* Partner Logos using React Icons */}
          <SplideSlide>
            <FaGoogle className="text-6xl text-[#4285F4] mx-auto hover:scale-110 transition-transform duration-300" />
          </SplideSlide>
          <SplideSlide>
            <FaMicrosoft className="text-6xl text-[#F25022] mx-auto hover:scale-110 transition-transform duration-300" />
          </SplideSlide>
          <SplideSlide>
            <FaAmazon className="text-6xl text-[#FF9900] mx-auto hover:scale-110 transition-transform duration-300" />
          </SplideSlide>
          <SplideSlide>
            <RiNetflixFill className="text-6xl text-[#E50914] mx-auto hover:scale-110 transition-transform duration-300" />
          </SplideSlide>
          {/* <SplideSlide>
            <SiApple className="text-6xl text-gray-200 mx-auto hover:scale-110 transition-transform duration-300" />
          </SplideSlide>
          <SplideSlide>
            <SiSpotify className="text-6xl text-[#1DB954] mx-auto hover:scale-110 transition-transform duration-300" />
          </SplideSlide> */}
        </Splide>
      </div>
    </section>
  );
}
