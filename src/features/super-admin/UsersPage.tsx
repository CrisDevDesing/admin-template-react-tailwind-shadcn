// src/features/super-admin/UtilizadoresPage.tsx
const mockUsers = [
  { id: 1, nome: "User 1", email: "user1@test.com", empresa: "Empresa 1", role: "admin" },
  { id: 2, nome: "User 2", email: "user2@test.com", empresa: "Empresa 2", role: "instrutor" },
]

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Utilizadores</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Nome</th>
            <th className="p-2">Email</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map(u => (
            <tr key={u.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.nome}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.empresa}</td>
              <td className="p-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
