import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import AuthPage from "./pages/AuthPage";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

// --- Lazy load everything ---
const Footer = lazy(() => import('./components/Footer'));
const HeroStorytelling = lazy(() => import('./components/HeroStorytelling'));
const CampaignsDashboard = lazy(() => import('./components/CampaignsDashboard'));
const ImpactMatrix = lazy(() => import('./components/ImpactMatrix'));
const DonationInterface = lazy(() => import('./components/DonationInterface'));
const VolunteerSignup = lazy(() => import('./components/VolunteerSignup'));
const CrisisMatrix = lazy(() => import('./components/CrisisMatrix'));
const ImpactFlow = lazy(() => import('./components/ImpactFlow'));
const ImpactGallery = lazy(() => import('./components/ImpactGallery'));

// Lazy‑load the heavy 3D canvas separately so it never blocks the HTML content
const ThreeCanvas = lazy(() => import('./components/ThreeCanvas'));

// ─── Loading Screen ───────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate progress while JS bundles parse
    const steps = [15, 35, 55, 72, 88, 100];
    let i = 0;
    const tick = () => {
      if (i < steps.length) {
        setProgress(steps[i++]);
        setTimeout(tick, 200 + Math.random() * 250);
      } else {
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onDone, 600);
        }, 300);
      }
    };
    const id = setTimeout(tick, 100);
    return () => clearTimeout(id);
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#020817',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        transition: 'opacity 0.6s ease',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      {/* Animated orb */}
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #3b82f6, #6366f1 50%, #10b981)',
          animation: 'pulse-orb 2s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', inset: -8,
          borderRadius: '50%',
          border: '1.5px solid rgba(99,102,241,0.3)',
          animation: 'ring-expand 2s ease-in-out infinite',
        }} />
      </div>

      {/* Brand */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#fff', fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>
          CanSupport
        </p>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase', margin: '6px 0 0' }}>
          Loading experience…
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ width: 220, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #3b82f6, #10b981)',
          borderRadius: 2,
          transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>

      <style>{`
        @keyframes pulse-orb {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.85; }
        }
        @keyframes ring-expand {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.15; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

// ─── Section fallback — shown while each lazy section hydrates ────────────────
function SectionSkeleton() {
  return (
    <div style={{
      minHeight: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        border: '2px solid rgba(59,130,246,0.3)',
        borderTopColor: '#3b82f6',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
function App() {
  const [ready, setReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  const handleLoadDone = () => {
    setShowLoader(false);
    setReady(true);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Main app (hero + canvas + sections) */}
          <Route
            path="*"
            element={
              <div className="relative w-full bg-slate-950" style={{ minHeight: '100vh' }}>
                {/* Loading screen — shown until JS is parsed */}
                {showLoader && <LoadingScreen onDone={handleLoadDone} />}

                {/* Navbar always visible once loader fades */}
                {ready && <Navbar />}

                {ready && (
                  <>
                    {/* 3D canvas */}
                    <Suspense fallback={null}>
                      <ThreeCanvas />
                    </Suspense>

                    {/* All HTML sections */}
                    <main
                      className="relative z-10 w-full bg-transparent"
                      style={{ position: 'relative' }}
                    >
                      <Suspense fallback={<SectionSkeleton />}>
                        <HeroStorytelling />
                      </Suspense>

                      <Suspense fallback={<SectionSkeleton />}>
                        <CrisisMatrix />
                      </Suspense>

                      <Suspense fallback={<SectionSkeleton />}>
                        <CampaignsDashboard />
                      </Suspense>

                      <Suspense fallback={<SectionSkeleton />}>
                        <ImpactMatrix />
                      </Suspense>

                      <Suspense fallback={<SectionSkeleton />}>
                        <ImpactFlow />
                      </Suspense>

                      <Suspense fallback={<SectionSkeleton />}>
                        <DonationInterface />
                      </Suspense>

                      <Suspense fallback={<SectionSkeleton />}>
                        <VolunteerSignup />
                      </Suspense>

                      <Suspense fallback={<SectionSkeleton />}>
                        <ImpactGallery />
                      </Suspense>

                      <Suspense fallback={null}>
                        <Footer />
                      </Suspense>
                    </main>
                  </>
                )}
              </div>
            }
          />

          {/* Login / Register page */}
          <Route path="/login" element={<AuthPage />} />

          {/* Protected dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;