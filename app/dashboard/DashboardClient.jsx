"use client";

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardClient() {
  const [bookings, setBookings] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [myEntries, setMyEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [cancellingTournamentId, setCancellingTournamentId] = useState(null);

  const loadBookings = async () => {
    try {
      const res = await fetch("http://localhost:8000/bookings/", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setBookings(data);
      else toast.error(data.error || data.detail || "Failed to load bookings");
    } catch {
      toast.error("Failed to load bookings");
    }
  };

  const loadTournaments = async () => {
    try {
      const res = await fetch("http://localhost:8000/tournaments/", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setTournaments(data);
    } catch {}
  };

  const loadMyEntries = async () => {
    try {
      const res = await fetch("http://localhost:8000/my/entries/", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setMyEntries(data);
    } catch {}
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([loadBookings(), loadTournaments(), loadMyEntries()]);
      setLoading(false);
    })();
  }, []);

  const cancelBooking = async (id) => {
    try {
      setCancellingId(id);
      const res = await fetch(`http://localhost:8000/bookings/${id}/cancel/`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Booking cancelled");
        await loadBookings();
      } else {
        toast.error(data.error || "Cancel failed");
      }
    } catch {
      toast.error("Cancel failed");
    } finally {
      setCancellingId(null);
    }
  };

  const cancelTournament = async (id) => {
    try {
      setCancellingTournamentId(id);
      const res = await fetch(
        `http://localhost:8000/tournaments/${id}/cancel/`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Tournament cancelled");
        await loadTournaments();
      } else {
        toast.error(data.error || "Cancel failed");
      }
    } catch {
      toast.error("Cancel failed");
    } finally {
      setCancellingTournamentId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <ToastContainer />
      <div className="max-w-6xl mx-auto space-y-12">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-gray-400">Manage your bookings & tournaments</p>
        </header>

        {/* BOOKINGS */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
          {bookings.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-6 text-gray-400">
              No bookings yet.
            </div>
          ) : (
            <div className="overflow-x-auto bg-gray-900 border border-gray-800 rounded-xl shadow-lg">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Time
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Hours
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Payment
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {bookings.map((b) => {
                    const date = new Date(b.date);
                    return (
                      <tr
                        key={b.id}
                        className="hover:bg-gray-800/40 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm">
                          {date.toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {b.time?.slice(0, 5)}
                        </td>
                        <td className="px-4 py-3 text-sm">{b.hours}</td>
                        <td className="px-4 py-3 text-sm font-medium">
                          Rs. {Number(b.total_price || 0).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              b.status === "cancelled"
                                ? "bg-red-900/40 text-red-300"
                                : b.status === "completed"
                                ? "bg-green-900/40 text-green-300"
                                : b.status === "confirmed"
                                ? "bg-blue-900/40 text-blue-300"
                                : "bg-yellow-900/40 text-yellow-300"
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              b.payment_status === "paid"
                                ? "bg-green-900/40 text-green-300"
                                : b.payment_status === "refunded"
                                ? "bg-purple-900/40 text-purple-300"
                                : "bg-gray-700 text-gray-300"
                            }`}
                          >
                            {b.payment_status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-sm">
                          <button
                            disabled={
                              cancellingId === b.id ||
                              ["cancelled", "completed"].includes(b.status)
                            }
                            onClick={() => cancelBooking(b.id)}
                            className={`px-3 py-2 rounded border text-white transition ${
                              cancellingId === b.id
                                ? "opacity-70 cursor-not-allowed border-gray-600"
                                : ["cancelled", "completed"].includes(b.status)
                                ? "opacity-50 cursor-not-allowed border-gray-700"
                                : "hover:bg-red-600/20 border-red-600"
                            }`}
                          >
                            {cancellingId === b.id ? "Cancelling..." : "Cancel"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* TOURNAMENTS */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">My Tournaments</h2>
          {tournaments.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-6 text-gray-400">
              No tournaments yet.
            </div>
          ) : (
            <div className="overflow-x-auto bg-gray-900 border border-gray-800 rounded-xl shadow-lg">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Start
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Daily Time
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Max Teams
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {tournaments.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm">{t.name}</td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(t.start_date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {t.daily_start_time?.slice(0, 5)} ({t.daily_hours}h)
                      </td>
                      <td className="px-4 py-3 text-sm">{t.max_teams}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 text-xs bg-blue-900/40 rounded">
                          {t.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-sm">
                        <button
                          disabled={
                            cancellingTournamentId === t.id ||
                            t.status === "cancelled"
                          }
                          onClick={() => cancelTournament(t.id)}
                          className={`px-3 py-2 rounded border text-white transition ${
                            cancellingTournamentId === t.id
                              ? "opacity-70 cursor-not-allowed border-gray-600"
                              : t.status === "cancelled"
                              ? "opacity-50 cursor-not-allowed border-gray-700"
                              : "hover:bg-red-600/20 border-red-600"
                          }`}
                        >
                          {cancellingTournamentId === t.id
                            ? "Cancelling..."
                            : "Cancel"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* TEAM ENTRIES */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">My Team Entries</h2>
          {myEntries.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-6 text-gray-400">
              No team entries yet.
            </div>
          ) : (
            <div className="overflow-x-auto bg-gray-900 border border-gray-800 rounded-xl shadow-lg">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Tournament
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Start
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Time
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Team
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {myEntries.map((e) => (
                    <tr
                      key={e.id}
                      className="hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm">{e.tournament_name}</td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(e.start_date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {e.daily_start_time?.slice(0, 5)}
                      </td>
                      <td className="px-4 py-3 text-sm">{e.team_name}</td>
                      <td className="px-4 py-3 text-sm">{e.status}</td>
                      <td className="px-4 py-3 text-right text-sm">
                        <button
                          onClick={async () => {
                            const res = await fetch(
                              `http://localhost:8000/entries/${e.id}/cancel/`,
                              { method: "POST", credentials: "include" }
                            );
                            const data = await res.json();
                            if (res.ok) {
                              toast.success(data.message);
                              loadMyEntries();
                            } else {
                              toast.error(data.error || "Failed");
                            }
                          }}
                          className="px-3 py-2 rounded border hover:bg-red-600/20 border-red-600"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
