import { Routes, Route, Navigate } from "react-router-dom";
import Hero from "./Pages/Hero.jsx";
import { AdminDashboardPage } from "./Pages/Dashboard.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
