import SidebarAdmin from "@/components/layout/SidebarAdmin";
import { Outlet } from "react-router-dom";

export default function SuperAdminLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin /> {/* Sidebar específica */}
      <div className="flex-1 p-6">
        <h1>Área Super Admin</h1>
        <Outlet />
      </div>
    </div>
  );
}
