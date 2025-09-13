import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Search, Edit, Trash2, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

// ⚠️ Mock data (substituir futuramente por API)
const pagamentos = [
  {
    id: 1,
    aluno: "João Silva",
    total: "150.00",
    data_pagamento: "2025-09-10",
    forma_pagamento: "Dinheiro",
    status: "Pago",
  },
  {
    id: 2,
    aluno: "Maria Oliveira",
    total: "200.00",
    data_pagamento: "2025-09-12",
    forma_pagamento: "Transferência",
    status: "Pendente",
  },
]

export default function PagamentosPage() {
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [results, setResults] = useState(pagamentos)
  const navigate = useNavigate()

  function handleSearch() {
    const q = query.trim().toLowerCase()
    const filtered = pagamentos.filter((p) => {
      if (q) {
        const inSearch =
          p.aluno.toLowerCase().includes(q) ||
          p.forma_pagamento.toLowerCase().includes(q) ||
          (p.status || "").toLowerCase().includes(q)
        if (!inSearch) return false
      }
      if (statusFilter !== "all") {
        if ((p.status || "").toLowerCase() !== statusFilter.toLowerCase())
          return false
      }
      return true
    })
    setResults(filtered)
  }

  function handleReset() {
    setQuery("")
    setStatusFilter("all")
    setResults(pagamentos)
  }

  return (
    <Card className="p-5 shadow-sm dark:bg-gray-800 space-y-8 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Gestão de Pagamentos
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Lista de todos os pagamentos registados
          </p>
        </div>
        <Button
          className="flex items-center gap-2 bg-blue-600 text-white"
          onClick={() => navigate("/pagamentos/novo")}
        >
          <Plus size={14} /> Novo Pagamento
        </Button>
      </div>

      {/* Área de Filtros */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 w-full md:w-1/2">
          <Input
            placeholder="Pesquisar por aluno, forma de pagamento ou estado..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          />
          <Button onClick={handleSearch} className="flex items-center gap-2">
            <Search size={14} /> Buscar
          </Button>
          <Button variant="ghost" onClick={handleReset}>
            Reset
          </Button>
        </div>

        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <span className="text-gray-400">Estado</span>
              </SelectItem>
              <SelectItem value="Pago">Pago</SelectItem>
              <SelectItem value="Pendente">Pendente</SelectItem>
              <SelectItem value="Cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabela */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Aluno</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Forma</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-sm">
                Nenhum pagamento encontrado com os filtros aplicados.
              </TableCell>
            </TableRow>
          ) : (
            results.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.aluno}</TableCell>
                <TableCell>{p.total} €</TableCell>
                <TableCell>{p.data_pagamento}</TableCell>
                <TableCell>{p.forma_pagamento}</TableCell>
                <TableCell>
                  {p.status === "Pago" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      {p.status}
                    </span>
                  )}
                  {p.status === "Pendente" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                      {p.status}
                    </span>
                  )}
                  {p.status === "Cancelado" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                      {p.status}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => navigate(`/pagamentos/${p.id}/editar`)}
                  >
                    <Edit size={14} /> Editar
                  </Button>
                  <Button size="sm" variant="destructive" className="flex items-center gap-2">
                    <Trash2 size={14} /> Remover
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
