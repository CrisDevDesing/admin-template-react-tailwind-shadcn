// src/features/super-admin/Dashboard.tsx
export default function SuperAdminDashboard() {
  const stats = [
    { label: "Empresas", value: 12 },
    { label: "Alunos", value: 450 },
    { label: "Instrutores", value: 34 },
    { label: "Exames", value: 120 },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col items-center">
            <span className="text-gray-400">{s.label}</span>
            <span className="text-3xl font-bold">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
