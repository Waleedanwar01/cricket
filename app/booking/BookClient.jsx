"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../contexts/UserProvider"; // adjust path
import ProtectedRoute from "../components/ProtectedRoute";

const PRICE_PER_HOUR = 1500;

const BookClient = () => {
  const router = useRouter();
  const { user, loading } = useUser();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    hours: "",
    user_id: null, // added user_id
  });
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Redirect if not logged in and fill form
  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.info("You need to login first!");
        router.push("/login");
      } else {
        setForm((prev) => ({
          ...prev,
          name: user.username || "",
          email: user.email || "",
          user_id: user.id || null, // set user_id
        }));
      }
    }
  }, [loading, user, router]);

  // Fetch booked slots when date changes
  useEffect(() => {
    if (form.date) fetchBookedSlots(form.date);
  }, [form.date]);

  // Update total price when hours change
  useEffect(() => {
    setTotalPrice(form.hours ? parseInt(form.hours) * PRICE_PER_HOUR : 0);
  }, [form.hours]);

  const fetchBookedSlots = async (date) => {
    try {
      setLoadingSlots(true);
      const res = await fetch(`http://localhost:8000/booked-slots/?date=${date}`);
      const data = await res.json();
      if (res.ok) setBookedSlots(data.booked_slots || []);
      else setBookedSlots([]);
    } catch (error) {
      console.error(error);
      setBookedSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getBookingRange = (startHour, duration) => {
    const start = parseInt(startHour.split(":")[0]);
    const hours = [];
    for (let i = 0; i < duration; i++) {
      const hour = (start + i) % 24;
      hours.push(hour < 10 ? `0${hour}:00` : `${hour}:00`);
    }
    return hours;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!user) {
      toast.error("Please login first to make a booking");
      router.push("/login");
      return;
    }

    if (!form.time || !form.hours)
      return toast.error("Select start time and hours");

    const selectedRange = getBookingRange(form.time, parseInt(form.hours));
    const overlap = selectedRange.some((hour) => bookedSlots.includes(hour));

    if (overlap)
      return toast.error(
        "Some or all selected hours are already booked. Please choose another."
      );

    try {
      setSubmitting(true);
      
      // Prepare booking data
      const bookingData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        date: form.date,
        time: form.time,
        hours: parseInt(form.hours),
      };

      console.log("Submitting booking data:", bookingData);

      const res = await fetch("http://localhost:8000/book/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bookingData),
      });
      
      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);

      if (res.ok) {
        toast.info("Booking created. Please confirm from the email to finalize.");
        const bookedDate = form.date; // keep date for refetch
        setForm({
          name: form.name,
          email: form.email,
          phone: "",
          date: "",
          time: "",
          hours: "",
          user_id: form.user_id,
        });
        setTotalPrice(0);
        fetchBookedSlots(bookedDate);
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        toast.error(data.error || data.detail || "Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour <= 23; hour++) {
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const formatted = `${displayHour}:00 ${ampm}`;
      const value = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      slots.push({ value, label: formatted });
    }
    return slots;
  };

  const getDisabledHours = (slotValue) => {
    const duration = form.hours ? parseInt(form.hours) : 1;
    const slotStart = parseInt(slotValue.split(":")[0]);
    for (let i = 0; i < duration; i++) {
      const hour = (slotStart + i) % 24;
      const hourStr = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      if (bookedSlots.includes(hourStr)) return true;
    }
    return false;
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-white bg-gray-900">Checking authentication...</p>
    );

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="mb-4">You need to login to book a court.</p>
          <button 
            onClick={() => router.push("/login")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requireAuth={true}>
      <div className="min-h-screen relative">
      <ToastContainer />

      {/* Hero Section */}
      <div className="relative w-full h-80">
        <Image
          src="/images/court1.webp"
          alt="Cricket Court"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Book Cricket Court
          </h1>
          <p className="mt-3 text-gray-300 text-lg max-w-xl">
            Reserve your turf and enjoy the best facilities for your cricket
            matches.
          </p>
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-6 -mt-10 relative z-10">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center shadow-lg">
          <h2 className="text-lg font-semibold text-white">📍 Location</h2>
          <p className="mt-2 text-gray-400">Johar Town, Lahore</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center shadow-lg">
          <h2 className="text-lg font-semibold text-white">💰 Price</h2>
          <p className="mt-2 text-gray-400">Rs. 1500 / hour</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center shadow-lg">
          <h2 className="text-lg font-semibold text-white">⚡ Facilities</h2>
          <p className="mt-2 text-gray-400">Floodlights, Parking, Refreshments</p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="max-w-2xl mx-auto mt-16 mb-16 rounded-2xl shadow-lg border border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-center text-white">Reserve Your Slot</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">Full Name</label>
            <input
              value={form.name}
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none text-gray-200 placeholder-gray-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">Email</label>
            <input
              value={form.email}
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none text-gray-200 placeholder-gray-400"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">Phone Number</label>
            <input
              value={form.phone}
              onChange={handleChange}
              name="phone"
              type="tel"
              placeholder="03XX-XXXXXXX"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none text-gray-200 placeholder-gray-400"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">Select Date</label>
            <input
              value={form.date}
              onChange={handleChange}
              name="date"
              type="date"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none text-gray-200"
              required
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">Start Time</label>
            {loadingSlots ? (
              <p className="text-gray-400 text-sm">Loading slots...</p>
            ) : (
              <select
                value={form.time}
                onChange={handleChange}
                name="time"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none text-gray-200"
                required
              >
                <option value="">Select time</option>
                {generateTimeSlots().map((slot) => (
                  <option
                    key={slot.value}
                    value={slot.value}
                    disabled={getDisabledHours(slot.value)}
                  >
                    {slot.label} {getDisabledHours(slot.value) ? "(Booked)" : ""}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">Duration (Hours)</label>
            <select
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none text-gray-200"
              required
              value={form.hours}
              onChange={handleChange}
              name="hours"
            >
              <option value="">Select hours</option>
              {[1, 2, 3, 4, 5].map((h) => (
                <option key={h} value={h}>
                  {h} hour(s)
                </option>
              ))}
            </select>
          </div>

          {/* Total Price */}
          <div className="text-right text-lg font-semibold text-green-400">
            Total: Rs. {totalPrice.toLocaleString()}
          </div>

          {/* Submit */}
          <button
           
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105"
          >
            {submitting ? "Booking..." : "Book Now"}
          </button>
        </form>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default BookClient;
