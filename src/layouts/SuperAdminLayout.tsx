// src/layouts/SuperAdminLayout.tsx
import { Outlet } from "react-router-dom"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { SidebarAdmin } from "@/components/layout/SidebarAdmin"
import { HeaderAdmin } from "@/components/layout/HeaderAdmin"

export default function SuperAdminLayout() {
  const menuItems = [
    { name: "Dashboard", path: "/super-admin/dashboard" },
    { name: "Empresas", path: "/super-admin/empresas" },
    { name: "Utilizadores", path: "/super-admin/utilizadores" },
    { name: "Estatísticas", path: "/super-admin/estatisticas" },
    { name: "Auditoria", path: "/super-admin/auditoria" },
  ]

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarAdmin items={menuItems} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <HeaderAdmin title="Super Admin" />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
