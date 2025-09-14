// src/features/super-admin/AuditoriaPage.tsx
const mockLogs = [
  { id: 1, usuario: "admin1", acao: "Criou empresa", data: "2025-09-14 10:00" },
  { id: 2, usuario: "user2", acao: "Editou utilizador", data: "2025-09-14 11:00" },
]

export default function AuditoriaPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Logs de Auditoria</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Usuário</th>
            <th className="p-2">Ação</th>
            <th className="p-2">Data</th>
          </tr>
        </thead>
        <tbody>
          {mockLogs.map(log => (
            <tr key={log.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="p-2">{log.id}</td>
              <td className="p-2">{log.usuario}</td>
              <td className="p-2">{log.acao}</td>
              <td className="p-2">{log.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
