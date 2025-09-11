import { Notifications } from "./Notifications";
import { UserMenu } from "./UserMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useSidebar } from "@/store/useSidebar";
import { Menu } from "lucide-react";

export function Header() {
  const { toggle } = useSidebar();

  return (
    <header className="h-16 bg-white dark:bg-dark shadow-sm flex items-center justify-between px-6">
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
      </div>
    </header>
  );
}
