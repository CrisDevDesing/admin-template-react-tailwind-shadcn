import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { BreadcrumbWrapper } from "@/components/layout/BreadcrumbWrapper";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="px-6 py-2">
          <BreadcrumbWrapper />
        </div>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
