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

// Mock data (substituir pelo backend futuramente)
const aulas = [
  {
    id: 1,
    aluno: "João Silva",
    instrutor: "Carlos Santos",
    veiculo: "Toyota Yaris - 12-AB-34",
    data: "2025-09-15",
    horaInicio: "10:00",
    horaFim: "11:00",
    numAula: "A001",
    lessonName: "Estacionamento",
    tipo: "Prática",
    presenca: true,
    local: "Pista de Treino",
    status: "Concluída",
  },
  {
    id: 2,
    aluno: "Maria Oliveira",
    instrutor: "Ana Ferreira",
    veiculo: "Renault Clio - 56-CD-78",
    data: "2025-09-16",
    horaInicio: "14:00",
    horaFim: "15:30",
    numAula: "A002",
    lessonName: "Regras de trânsito",
    tipo: "Teórica",
    presenca: false,
    local: "Sala 2",
    status: "Agendada",
  },
]

export default function AulasPage() {
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [results, setResults] = useState(aulas)
  const navigate = useNavigate()

  function handleSearch() {
    const q = query.trim().toLowerCase()
    const filtered = aulas.filter((a) => {
      if (q) {
        const inSearch =
          a.aluno.toLowerCase().includes(q) ||
          a.instrutor.toLowerCase().includes(q) ||
          a.veiculo.toLowerCase().includes(q) ||
          (a.lessonName || "").toLowerCase().includes(q)
        if (!inSearch) return false
      }
      if (statusFilter !== "all") {
        if ((a.status || "").toLowerCase() !== statusFilter.toLowerCase())
          return false
      }
      return true
    })
    setResults(filtered)
  }

  function handleReset() {
    setQuery("")
    setStatusFilter("all")
    setResults(aulas)
  }

  return (
    <Card className="p-5 shadow-sm dark:bg-gray-800 space-y-8 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Gestão de Aulas
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Lista de todas as aulas agendadas
          </p>
        </div>
        <Button
          className="flex items-center gap-2 bg-blue-600 text-white"
          onClick={() => navigate("/aulas/nova")}
        >
          <Plus size={14} /> Nova Aula
        </Button>
      </div>

      {/* Área de Filtros */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 w-full md:w-1/2">
          <Input
            placeholder="Pesquisar por aluno, instrutor, veículo ou lição..."
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
              <SelectItem value="Agendada">Agendada</SelectItem>
              <SelectItem value="Concluída">Concluída</SelectItem>
              <SelectItem value="Cancelada">Cancelada</SelectItem>
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
            <TableHead>Lição</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Presença</TableHead>
            <TableHead>Local</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} className="text-center py-6 text-sm">
                Nenhuma aula encontrada com os filtros aplicados.
              </TableCell>
            </TableRow>
          ) : (
            results.map((aula) => (
              <TableRow key={aula.id}>
                <TableCell className="font-medium">{aula.aluno}</TableCell>
                <TableCell>{aula.instrutor}</TableCell>
                <TableCell>{aula.veiculo}</TableCell>
                <TableCell>{aula.data}</TableCell>
                <TableCell>
                  {aula.horaInicio} - {aula.horaFim}
                </TableCell>
                <TableCell>{aula.lessonName}</TableCell>
                <TableCell>{aula.tipo}</TableCell>
                <TableCell>
                  {aula.presenca ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      Presente
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                      Ausente
                    </span>
                  )}
                </TableCell>
                <TableCell>{aula.local}</TableCell>
                <TableCell>
                  {aula.status === "Concluída" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      {aula.status}
                    </span>
                  )}
                  {aula.status === "Agendada" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                      {aula.status}
                    </span>
                  )}
                  {aula.status === "Cancelada" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                      {aula.status}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => navigate(`/aulas/${aula.id}/editar`)}
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
