import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { BreadcrumbWrapper } from "@/components/layout/BreadcrumbWrapper";
import { useSidebar } from "@/store/useSidebar";

export default function AdminLayout() {
  const { collapsed } = useSidebar();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark">
      <Sidebar />
      <div className="flex flex-col flex-1">
        {/* Header fixo no topo */}
        <Header />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-4 py-2 border-b dark:border-gray-700">
            <BreadcrumbWrapper />
          </div>
          <main
            className={`flex-1 overflow-y-auto p-4 transition-all duration-300 ${
              collapsed ? "" : ""
            }`}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
