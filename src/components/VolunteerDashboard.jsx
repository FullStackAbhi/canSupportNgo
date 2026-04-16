// components/VolunteerDashboard.jsx
import React from "react";
// import { useAuth } from "../context/AuthContext"; // Assuming useAuth is defined

export default function VolunteerDashboard() {
  // const { user } = useAuth(); // Assuming useAuth provides user data

  // Hard‑coded donors (demo)
  const donations = [
    {
      id: "v1",
      donor: "Arjun M.",
      amount: 1000,
      date: "12 Apr 2026",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: "v2",
      donor: "Sarah J.",
      amount: 750,
      date: "09 Apr 2026",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: "v3",
      donor: "Rahul K.",
      amount: 1200,
      date: "02 Apr 2026",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto pt-10">
        <div className="mb-12">
          {/* Welcome Back Text & UI Polish */}
          <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2 block">Volunteer Portal</span>
          <h1 className="text-5xl font-black text-white leading-tight">
            Welcome back, <span className="text-emerald-300 italic">Coordinator</span>
          </h1>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6 border-t border-white/5 pt-8">
          Donors to Your Organisation
        </h2>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {donations.map((d) => (
            <div
              key={d.id}
              className="bg-slate-800 rounded-3xl p-6 shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1 flex items-center gap-6 border border-white/5"
            >
              {/* Avatar UI Change: Circular with glow */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-500/30 shrink-0">
                <img
                  src={d.avatar}
                  alt={d.donor}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                {/* Donor Name */}
                <h2 className="text-2xl font-extrabold text-white mb-1">
                  {d.donor}
                </h2>

                {/* Amount UI Change: High Contrast Emerald */}
                <p className="text-emerald-400 text-xl font-black">
                  ₹{d.amount.toLocaleString()}
                </p>

                {/* Date UI Change: Muted Tracking */}
                <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-bold">
                  Received: {d.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}