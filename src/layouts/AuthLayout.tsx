// src/layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <main className="w-full rounded-lg shadow-md">
        <Outlet />
      </main>
    </div>
  );
}
