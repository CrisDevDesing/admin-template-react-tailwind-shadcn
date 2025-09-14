// src/components/layout/Sidebar.tsx
import { NavLink } from "react-router-dom"

interface SidebarProps {
  items: { name: string; path: string }[]
}

export function SidebarAdmin({ items }: SidebarProps) {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
      <div className="p-6 font-bold text-xl text-gray-800 dark:text-white">
        Super Admin
      </div>
      <nav className="flex flex-col">
        {items.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-200 dark:bg-gray-700 font-semibold" : "font-normal"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
