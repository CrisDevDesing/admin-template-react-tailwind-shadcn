// src/components/layout/Header.tsx
interface HeaderProps {
  title?: string
}

export function HeaderAdmin({ title }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-500 dark:text-gray-300">Super Admin</span>
        <button className="text-sm text-red-600 hover:underline" onClick={() => {
          localStorage.clear(); 
          window.location.href = "/login";
        }}>
          Logout
        </button>
      </div>
    </header>
  )
}
