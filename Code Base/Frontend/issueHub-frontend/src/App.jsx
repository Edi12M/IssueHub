import { Routes, Route, Navigate } from "react-router-dom";
import Hero from "./Pages/Hero.jsx";
import { AdminDashboardPage } from "./Pages/Dashboard.jsx";
import Users from "./Pages/Users.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
