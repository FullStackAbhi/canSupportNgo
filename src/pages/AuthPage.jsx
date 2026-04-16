// pages/AuthPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor"); // for signup
  const [error, setError] = useState("");
  const { login, signup, loading } = useAuth();
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (isLogin) {
      await login(email, password);
    } else {
      await signup(email, password, role);
    }
    navigate("/"); // 👈 go back to main page, not dashboard
  } catch (err) {
    setError(err.message);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-6">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">
          {isLogin ? "Log In" : "Create Account"}
        </h2>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-brand"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-brand"
              required
            />
          </div>

          {!isLogin && (
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">I am a</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600"
              >
                <option value="donor">Donor</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand text-white rounded-full font-bold hover:bg-brand-dark transition-colors"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>

          <div className="mt-4 text-center text-sm text-white/70">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    setError("");
                  }}
                  className="text-brand hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setError("");
                  }}
                  className="text-brand hover:underline"
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}