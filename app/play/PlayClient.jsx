"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PlayTournamentsPage() {
  const [items, setItems] = useState([]);

  const [joiningId, setJoiningId] = useState(null);
  const [teamInputs, setTeamInputs] = useState({}); 

  const load = async () => {
    try {
      setLoading(true);
      // Get JWT token from localStorage
      const token = localStorage.getItem('access');
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tournaments/all/`, {
        headers: {
          "Authorization": token ? `Bearer ${token}` : ""
        },
        credentials: "include"
      });
      const data = await res.json();
      if (res.ok) setItems(data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load tournaments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const setInput = (id, field, value) => {
    setTeamInputs((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || { teamName: "", phone: "" }), [field]: value },
    }));
  };

  const join = async (id) => {
    const values = teamInputs[id] || { teamName: "", phone: "" };
    if (!values.teamName) return toast.error("Enter team name");
    try {
      setJoiningId(id);
      const res = await fetch(`http://localhost:8000/tournaments/${id}/entries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ team_name: values.teamName, contact_phone: values.phone || "" }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Team entry created");
        setTeamInputs((prev) => ({ ...prev, [id]: { teamName: "", phone: "" } }));
      } else {
        toast.error(data.error || data.detail || "Failed to join");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to join");
    } finally {
      setJoiningId(null);
    }
  };
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
    <div className="min-h-screen text-white px-4 py-10">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Play Tournaments</h1>
          <span className="text-xs px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-300">
            Entries are limited per tournament
          </span>
        </div>

        {/* Rules Section (TOP) */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg mb-10">
          <h2 className="text-2xl font-bold mb-3">📌 Tournament Rules</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>All teams must arrive at least <span className="text-red-400 font-semibold">10 minutes before</span> the scheduled match time.</li>
            <li>If a team is late, a maximum wait of <span className="text-red-400 font-semibold">5 minutes</span> will be allowed. After that, the team will be disqualified.</li>
            <li>The entry fee will only be collected in <span className="text-green-400 font-semibold">cash on the match day</span>.</li>
            <li>Cash must be given directly to the <span className="text-green-400 font-semibold">tournament holder</span>. The owner has no involvement in fee collection.</li>
          </ul>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-400">No tournaments right now.</p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
            {items.map((t) => {
              const disabledStatus = ["cancelled"].includes(t.status);
              const deadline = t.registration_deadline ? new Date(t.registration_deadline) : null;
              const deadlinePassed = deadline ? deadline < new Date(new Date().toDateString()) : false;
              const isJoinDisabled = disabledStatus || deadlinePassed || (t.remaining_spots <= 0);
              const values = teamInputs[t.id] || { teamName: "", phone: "" };

              return (
                <div key={t.id} className="bg-gray-800 border border-gray-700 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold line-clamp-2">{t.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                      t.status === 'confirmed' || t.status === 'booked'
                        ? 'border-green-600 text-green-300'
                        : t.status === 'pending'
                        ? 'border-yellow-600 text-yellow-300'
                        : 'border-red-600 text-red-300'
                    }`}>{t.status}</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-2">Start: {new Date(t.start_date).toLocaleDateString()} at {t.daily_start_time?.slice(0,5)}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-300 mt-2">
                    <span className="px-2 py-1 bg-gray-700 rounded">Max teams: {t.max_teams}</span>
                    <span className="px-2 py-1 bg-gray-700 rounded">Current: {t.entries_count}</span>
                    <span className="px-2 py-1 bg-gray-700 rounded">Remaining: {t.remaining_spots}</span>
                    <span className="px-2 py-1 bg-gray-700 rounded">Max players/team: {t.max_players_per_team}</span>
                    {deadline && (
                      <span className={`px-2 py-1 rounded ${deadlinePassed ? 'bg-red-900/50 text-red-200' : 'bg-gray-700'}`}>
                        Register by: {deadline.toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-300 mt-1">Holder Phone: <span className="text-gray-200">{t.holder_phone || 'N/A'}</span></p>
                  <p className="text-sm text-gray-300">Prize Money: <span className="text-gray-200">Rs. {Number(t.prize_money || 0).toLocaleString()}</span></p>
                  <p className="text-sm text-gray-300 mb-3">Entry fee: <span className="text-gray-200">Rs. {Number(t.entry_fee).toLocaleString()}</span></p>

                  <div className="space-y-2">
                    <label className="block text-xs text-gray-400">Team Name</label>
                    <input
                      value={values.teamName}
                      onChange={(e)=>setInput(t.id, 'teamName', e.target.value)}
                      placeholder="Enter your team name"
                      className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition"
                      disabled={isJoinDisabled}
                    />
                    <label className="block text-xs text-gray-400">Captain Phone</label>
                    <input
                      value={values.phone}
                      onChange={(e)=>setInput(t.id, 'phone', e.target.value)}
                      placeholder="03XX-XXXXXXX"
                      className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition"
                      disabled={isJoinDisabled}
                    />
                    <button
                      disabled={isJoinDisabled || joiningId===t.id}
                      onClick={()=>join(t.id)}
                      className={`w-full mt-2 px-4 py-2 rounded font-medium transition transform ${
                        isJoinDisabled || joiningId===t.id
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700 hover:scale-[1.02]'
                      }`}
                    >
                      {joiningId===t.id? 'Joining...' : deadlinePassed ? 'Registration closed' : disabledStatus ? 'Unavailable' : t.remaining_spots <= 0 ? 'Full' : 'Join'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
