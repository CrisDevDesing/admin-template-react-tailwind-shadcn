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
  Package,
  Building2,
  Warehouse,
  CreditCardIcon,
  Layers,
  UserCog,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Alunos", path: "/alunos", icon: Users },
  { name: "Instrutores", path: "/instrutores", icon: GraduationCap },
  { name: "Aulas", path: "/aulas", icon: CalendarCheck },
  { name: "Exames", path: "/exames", icon: CalendarCheck },
  { name: "Veículos", path: "/veiculos", icon: Car },
  { name: "Pagamentos", path: "/pagamentos", icon: CreditCard },
];

const settingsSubmenu = [
  { name: "Empresa", path: "/settings/empresa", icon: Building2 },
  { name: "Utilizadores", path: "/settings/utilizadores", icon: UserCog },
  { name: "Tipos de Pagamento", path: "/settings/tipos-pagamento", icon: CreditCardIcon },
  { name: "Categorias", path: "/settings/categorias", icon: Layers },
  { name: "Produtos", path: "/settings/produtos", icon: Package },
  { name: "Armazéns", path: "/settings/armazens", icon: Warehouse },
];

export function Sidebar() {
  const { isOpen, close, collapsed } = useSidebar();
  const [openSettings, setOpenSettings] = useState(false);

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
        className={`fixed lg:static z-50 top-0 left-0 h-full 
          ${collapsed ? "w-20" : "w-64"} 
          p-4 shadow-md transform transition-all duration-300
          bg-white dark:bg-gray-800 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <img
            src="https://th.bing.com/th/id/OIP.-c3-2zkixhfDOk7SWtEa1wHaE8?w=288&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="Logo"
            className="h-8 w-8"
          />
          {!collapsed && (
            <span className="ml-2 text-lg font-bold text-gray-600 dark:text-white">
              EscolaCondução
            </span>
          )}
        </div>

        {/* Menu principal */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
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
                title={collapsed ? item.name : ""}
              >
                <Icon size={20} />
                {!collapsed && item.name}
              </NavLink>
            );
          })}

          {/* Configurações */}
          <div>
            <button
              onClick={() => setOpenSettings(!openSettings)}
              className="flex items-center justify-between p-2 rounded-lg w-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              title={collapsed ? "Configurações" : ""}
            >
              <div className="flex items-center gap-2">
                <Settings size={20} />
                {!collapsed && "Configurações"}
              </div>
              {!collapsed &&
                (openSettings ? (
                  <ChevronDown size={16} className="text-gray-500" />
                ) : (
                  <ChevronRight size={16} className="text-gray-500" />
                ))}
            </button>

            {/* Submenu só aparece se não estiver colapsado */}
            {!collapsed && openSettings && (
              <div className="ml-6 mt-1 flex flex-col gap-1">
                {settingsSubmenu.map((sub) => {
                  const SubIcon = sub.icon;
                  return (
                    <NavLink
                      key={sub.name}
                      to={sub.path}
                      onClick={close}
                      className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`
                      }
                    >
                      <SubIcon size={18} />
                      {sub.name}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}
