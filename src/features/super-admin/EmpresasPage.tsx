// src/features/super-admin/EmpresasPage.tsx
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableCell } from "@/components/ui/table"

const mockEmpresas = [
  { id: 1, nome: "Empresa 1", admin: "admin1", status: "Ativa" },
  { id: 2, nome: "Empresa 2", admin: "admin2", status: "Inativa" },
]

export default function EmpresasPage() {
  const [filter, setFilter] = useState("")

  const filteredEmpresas = mockEmpresas.filter(e =>
    e.nome.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Empresas</h2>
        <Button onClick={() => alert("Nova empresa/admin")}>Nova Empresa/Admin</Button>
      </div>

      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Pesquisar empresa..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button onClick={() => setFilter("")}>Limpar</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {filteredEmpresas.map(e => (
            <TableRow key={e.id}>
              <TableCell>{e.id}</TableCell>
              <TableCell>{e.nome}</TableCell>
              <TableCell>{e.admin}</TableCell>
              <TableCell>{e.status}</TableCell>
              <TableCell>
                <Button variant="secondary" size="sm">Editar</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
