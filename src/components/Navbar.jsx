import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

function scrollToSection(id) {
  if (!id) {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: 0,
      ease: "power1.inOut",
    });
    return;
  }

  const element = document.getElementById(id);
  if (element) {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: {
        y: element,
        offsetY: 0,
      },
      ease: "power1.inOut",
    });
  } else {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: 0,
      ease: "power1.inOut",
    });
  }
}

export default function Navbar() {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-slate-950/60 backdrop-blur-md border-b border-white/10">
      {/* Desktop + mobile layout */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4">
        {/* Logo / website name */}
        <div
          onClick={() => scrollToSection()}
          className="flex items-center gap-2 text-xl font-bold tracking-wide text-white cursor-pointer group"
        >
          <svg
            className="w-7 h-7 text-brand group-hover:scale-110 transition-transform"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            CanSupport
          </span>
        </div>

        {/* Desktop nav (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { id: "campaigns", label: "Campaigns", icon: "🎯" },
            { id: "volunteer", label: "Volunteer", icon: "🤝" },
            { id: "donate", label: "Donate", icon: "❤️" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="flex items-center gap-2 text-white/80 hover:text-brand transition-all duration-200 hover:scale-105 group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
              <span className="block w-0 h-0.5 bg-brand origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </button>
          ))}

          {/* Login button (only when not logged in) */}
          {!user && (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-xs font-medium text-white bg-white/10 border border-white/30 rounded-full hover:bg-white/20 transition-colors"
            >
              Login
            </button>
          )}

          {/* My Dashboard button (only when logged in) */}
          {user && (
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 text-xs font-medium text-brand border border-brand rounded-full hover:bg-brand/20 hover:text-white transition-colors"
            >
              My Dashboard
            </button>
          )}
        </div>

        {/* Hamburger button (mobile only) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none relative w-8 h-8"
            aria-label="Toggle menu"
          >
            <span
              className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
                isMenuOpen ? "rotate-45 top-2" : "top-1.5"
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
                isMenuOpen ? "w-0 opacity-0" : "top-3"
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 top-4" : "top-4.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`${
          isMenuOpen ? "max-h-80" : "max-h-0"
        } overflow-hidden transition-all duration-300 md:hidden bg-slate-900/90`}
      >
        <div className="flex flex-col p-6 space-y-3">
          {[
            { id: "campaigns", label: "Campaigns", emoji: "🎯" },
            { id: "volunteer", label: "Volunteer", emoji: "🤝" },
            { id: "donate", label: "Donate", emoji: "❤️" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 text-left text-white/80 hover:text-brand transition-all hover:scale-105"
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}

          {/* Login / Dashboard in mobile menu */}
          {!user && (
            <button
              onClick={() => {
                navigate("/login");
                setIsMenuOpen(false);
              }}
              className="text-left text-white/80 hover:text-brand transition-all"
            >
              Login
            </button>
          )}

          {user && (
            <button
              onClick={() => {
                navigate("/dashboard");
                setIsMenuOpen(false);
              }}
              className="text-left text-brand hover:text-white transition-all"
            >
              My Dashboard
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}