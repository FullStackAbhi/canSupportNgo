// pages/UserDashboard.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import DonorDashboard from "../components/DonorDashboard";
import VolunteerDashboard from "../components/VolunteerDashboard";

export default function UserDashboard() {
  const { user } = useAuth();

  if (!user) return <div>Not logged in.</div>;

  if (user.role === "donor") {
    return <DonorDashboard />;
  } else if (user.role === "volunteer") {
    return <VolunteerDashboard />;
  }

  return <div>Unsupported role.</div>;
}