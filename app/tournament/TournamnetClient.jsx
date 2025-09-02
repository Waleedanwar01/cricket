"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const TournamentClient = () => {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    game: "Cricket (Indoor Tapeball)",
    location: "Faisalabad",
    date: "",
    time: "",
    entryFee: "",
    maxTeams: "",
    maxPlayer: "",
    maxOvers: "",
    description: "",
  });

  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in to create a tournament", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => router.replace("/login"), 1500);
      } else {
        setLoading(false);
      }
    };

    checkLogin();
  }, [router]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to create a tournament", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      console.log("Submitting with token:", token); // Debug log
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tournaments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", res.status); // Debug log
      
      const data = await res.json();
      console.log("Response data:", data); // Debug log

      if (res.ok) {
        toast.success("Tournament created successfully!", {
          position: "top-right",
          autoClose: 4000,
        });

        // Reset form
        setFormData({
          name: "",
          game: "Cricket (Indoor Tapeball)",
          location: "Faisalabad",
          date: "",
          time: "",
          entryFee: "",
          maxTeams: "",
          maxPlayer: "",
          maxOvers: "",
          description: "",
        });
        
        // Redirect to tournaments list after successful creation
        setTimeout(() => router.push("/tournaments"), 2000);
      } else {
        toast.error("Error: " + (data.detail || JSON.stringify(data)), {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Server error!", { position: "top-right", autoClose: 5000 });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-100 transition-colors duration-300 p-6">
      <ToastContainer />

      {/* Rules & Regulations */}
      <div className="max-w-4xl mx-auto mb-8 p-6 bg-gray-800 rounded-2xl shadow-md">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Rules & Regulations</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm md:text-base">
          <li>No fights will be tolerated during the tournament.</li>
          <li>The court owner will charge <span className="font-semibold text-red-400">PKR 1800 per hour</span>.</li>
          <li>Each tournament will strictly have a <span className="font-semibold text-yellow-400">daily 2-hour slot</span>.</li>
          <li>The tournament holder is responsible for organizing and managing within the allotted time.</li>
          <li>Maximum teams in a tournament will determine the total number of days required.</li>
        </ul>
      </div>

      {/* Tournament Form */}
      <div className="max-w-4xl mx-auto shadow-lg rounded-2xl p-8 bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Create New Tournament</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-medium">Tournament Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter tournament name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium">Game Type</label>
            <input
              type="text"
              name="game"
              placeholder="Enter game type"
              value={formData.game}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 font-medium">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium">Start Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium">Daily Start Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-medium">Entry Fee (PKR)</label>
              <input
                type="number"
                name="entryFee"
                placeholder="e.g. 1000"
                value={formData.entryFee}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium">Max Teams</label>
              <input
                type="number"
                name="maxTeams"
                placeholder="e.g. 16"
                value={formData.maxTeams}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium">Max Players (Each Team)</label>
              <input
                type="number"
                name="maxPlayer"
                placeholder="e.g. 5"
                value={formData.maxPlayer}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium">Max Overs</label>
              <input
                type="number"
                name="maxOvers"
                placeholder="e.g. 5"
                value={formData.maxOvers}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium">Description</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Write tournament details..."
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              required
            ></textarea>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="reset"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition hover:scale-105 transform ease-in-out duration-200"
            >
              Create Tournament
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TournamentClient;