"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Loader2 } from "lucide-react";

const ContactClient = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false); // ✅ new state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // ✅ show loader
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setSubmitting(false); // ✅ hide loader
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
          Have questions or need help booking a cricket court? Reach out to us
          and we&apos;ll respond promptly!
        </p>
      </section>

      {/* Contact Info + Form Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Contact Info */}
        <div className="flex-1 bg-gray-900/80 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
          <p className="text-gray-300 mb-6">
            You can reach us via email, phone, or visit our office.
          </p>
          <div className="space-y-6 text-white">
            <p className="flex items-center gap-3">
              <MdEmail className="text-green-400 text-2xl" /> info@cricketcourt.com
            </p>
            <p className="flex items-center gap-3">
              <MdPhone className="text-green-400 text-2xl" /> +92 300 1234567
            </p>
            <p className="flex items-center gap-3">
              <MdLocationOn className="text-green-400 text-2xl" /> 123 Cricket Street,
              Lahore, Pakistan
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex-1 bg-gray-900/80 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6">Send a Message</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-300 mb-1 font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1 font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1 font-semibold">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactClient;
