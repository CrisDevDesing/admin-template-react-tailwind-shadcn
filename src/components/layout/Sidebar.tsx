import { NavLink } from "react-router-dom";
import { useSidebar } from "@/store/useSidebar";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  Car,
  CreditCard,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
  { name: "Alunos", path: "/alunos", icon: <Users size={20} /> },
  { name: "Instrutores", path: "/instrutores", icon: <GraduationCap size={20} /> },
  { name: "Aulas", path: "/aulas", icon: <CalendarCheck size={20} /> },
  { name: "Exames", path: "/exames", icon: <CalendarCheck size={20} /> },
  { name: "Veículos", path: "/veiculos", icon: <Car size={20} /> },
  { name: "Pagamentos", path: "/pagamentos", icon: <CreditCard size={20} /> },
  { name: "Configurações", path: "/settings", icon: <Settings size={20} /> },
];

export function Sidebar() {
  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* Overlay no mobile */}
      {isOpen && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-50 top-0 left-0 h-full w-64 p-4 shadow-md transform transition-transform 
          bg-white dark:bg-dark ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        <h1 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Sys School Drive
        </h1>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={close}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
