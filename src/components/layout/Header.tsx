import { Notifications } from "./Notifications";
import { UserMenu } from "./UserMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useSidebar } from "@/store/useSidebar";
import { Menu, MoreVertical } from "lucide-react";

export function Header() {
  const { toggle, toggleCollapse } = useSidebar();

  return (
    <header className="h-16 bg-white shadow-sm dark:bg-gray-800 flex items-center justify-between px-6">
      {/* Botão hambúrguer (mobile) */}
      <button
        onClick={toggle}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Menu size={24} />
      </button>

      <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Painel de Administração
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Notifications />
        <UserMenu />

        {/* Botão 3 pontinhos para colapsar sidebar (desktop only) */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <MoreVertical size={22} />
        </button>
      </div>
    </header>
  );
}
