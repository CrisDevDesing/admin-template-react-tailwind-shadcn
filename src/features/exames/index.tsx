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
const exames = [
  {
    id: 1,
    aluno: "João Silva",
    instrutor: "Carlos Santos",
    veiculo: "Toyota Yaris - 12-AB-34",
    data: "2025-09-20",
    horaInicio: "09:00",
    horaFim: "10:00",
    tipo: "Prático",
    local: "Pista Central",
    examinador: "Paulo Gomes",
    pontuacao: "85/100",
    resultado: "Aprovado",
    status: "Concluído",
  },
  {
    id: 2,
    aluno: "Maria Oliveira",
    instrutor: "Ana Ferreira",
    veiculo: "Renault Clio - 56-CD-78",
    data: "2025-09-22",
    horaInicio: "14:00",
    horaFim: "15:00",
    tipo: "Teórico",
    local: "Sala 3",
    examinador: "Joana Mendes",
    pontuacao: "60/100",
    resultado: "Reprovado",
    status: "Concluído",
  },
]

export default function ExamesPage() {
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [results, setResults] = useState(exames)
  const navigate = useNavigate()

  function handleSearch() {
    const q = query.trim().toLowerCase()
    const filtered = exames.filter((e) => {
      if (q) {
        const inSearch =
          e.aluno.toLowerCase().includes(q) ||
          e.instrutor.toLowerCase().includes(q) ||
          e.veiculo.toLowerCase().includes(q) ||
          (e.resultado || "").toLowerCase().includes(q)
        if (!inSearch) return false
      }
      if (statusFilter !== "all") {
        if ((e.status || "").toLowerCase() !== statusFilter.toLowerCase())
          return false
      }
      return true
    })
    setResults(filtered)
  }

  function handleReset() {
    setQuery("")
    setStatusFilter("all")
    setResults(exames)
  }

  return (
    <Card className="p-5 shadow-sm dark:bg-gray-800 space-y-8 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Gestão de Exames
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Lista de todos os exames agendados e concluídos
          </p>
        </div>
        <Button
          className="flex items-center gap-2 bg-blue-600 text-white"
          onClick={() => navigate("/exames/novo")}
        >
          <Plus size={14} /> Novo Exame
        </Button>
      </div>

      {/* Área de Filtros */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 w-full md:w-1/2">
          <Input
            placeholder="Pesquisar por aluno, instrutor, veículo ou resultado..."
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
              <SelectItem value="Agendado">Agendado</SelectItem>
              <SelectItem value="Concluído">Concluído</SelectItem>
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
            <TableHead>Instrutor</TableHead>
            <TableHead>Veículo</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Local</TableHead>
            <TableHead>Examinador</TableHead>
            <TableHead>Pontuação</TableHead>
            <TableHead>Resultado</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.length === 0 ? (
            <TableRow>
              <TableCell colSpan={12} className="text-center py-6 text-sm">
                Nenhum exame encontrado com os filtros aplicados.
              </TableCell>
            </TableRow>
          ) : (
            results.map((exame) => (
              <TableRow key={exame.id}>
                <TableCell className="font-medium">{exame.aluno}</TableCell>
                <TableCell>{exame.instrutor}</TableCell>
                <TableCell>{exame.veiculo}</TableCell>
                <TableCell>{exame.data}</TableCell>
                <TableCell>
                  {exame.horaInicio} - {exame.horaFim}
                </TableCell>
                <TableCell>{exame.tipo}</TableCell>
                <TableCell>{exame.local}</TableCell>
                <TableCell>{exame.examinador}</TableCell>
                <TableCell>{exame.pontuacao}</TableCell>
                <TableCell>{exame.resultado}</TableCell>
                <TableCell>
                  {exame.status === "Concluído" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      {exame.status}
                    </span>
                  )}
                  {exame.status === "Agendado" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                      {exame.status}
                    </span>
                  )}
                  {exame.status === "Cancelado" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                      {exame.status}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => navigate(`/exames/${exame.id}/editar`)}
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
