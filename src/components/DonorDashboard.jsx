// components/DonorDashboard.jsx
import React from "react";
// import { useAuth } from "../context/AuthContext"; // Assuming useAuth is defined

export default function DonorDashboard() {
  // const { user } = useAuth(); // Assuming useAuth provides user data

  // Hard‑coded donations (demo)
  const donations = [
    {
      id: "d1",
      agency: "FoodBank NGO",
      amount: 1000,
      date: "12 Apr 2026",
      // Updated stable image URL
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "d2",
      agency: "Save Children Trust",
      amount: 500,
      date: "05 Apr 2026",
      // Updated stable image URL
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "d3",
      agency: "Health Center",
      amount: 1500,
      date: "28 Mar 2026",
      // Updated stable image URL
      image: "https://images.unsplash.com/photo-1538108197017-c13d6c73217f?auto=format&fit=crop&q=80&w=400",
    },
  ];
  let totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto pt-10"> {/* Added padding top */}
        <div className="mb-12"> {/* Container for headers */}
            {/* Added Welcome Back Text */}
            <span className="text-blue-400 font-mono text-xs uppercase tracking-widest mb-2 block">Personal Portal</span>
            <h1 className="text-5xl font-black text-white leading-tight">
              Welcome back, <span className="text-blue-300 italic">Donor</span>
            </h1>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6 border-t border-white/5 pt-8">
          Your Donation History
        </h2>
        <h3>
            <span className="text-emerald-400 text-3xl font-extrabold">
              Total Donated: ₹{totalDonated.toLocaleString()}
            </span>
        </h3>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {donations.map((d) => (
            <div
              key={d.id}
              className="bg-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-brand/20 transition-all duration-300 hover:-translate-y-1" /* UI Changes: rounded-3xl, shadow, hover effects */
            >
              <div className="flex flex-col md:flex-row"> {/* UI Change: Column on mobile, row on desktop */}
                {/* Image */}
                <div className="w-full md:w-32 h-32 shrink-0"> {/* UI Change: Responsive width, fixed height */}
                  <img
                    src={d.image}
                    alt={d.agency}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 p-6"> {/* UI Change: increased padding */}
                  {/* Agency name */}
                  <h2 className="text-2xl font-extrabold text-white"> {/* UI Change: font size/weight */}
                    {d.agency}
                  </h2>

                  {/* Amount */}
                  <p className="text-emerald-400 text-xl font-black mt-2"> {/* UI Change: color, font size/weight */}
                    ₹{d.amount.toLocaleString()}
                  </p>

                  {/* Date */}
                  <p className="text-gray-500 text-sm mt-1 uppercase tracking-wider"> {/* UI Change: color, uppercase */}
                    Donated on {d.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}