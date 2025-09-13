import React, { useState, useMemo } from "react"
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
const instrutores = [
  {
    id: 1,
    image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    nome: "Carlos Santos",
    email: "carlos@email.com",
    telefone: "912345678",
    dataNascimento: "1985-04-12",
    profissao: "Instrutor de Condução",
    carta: "B, C",
    status: "Ativo",
  },
  {
    id: 2,
    image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    nome: "Ana Ferreira",
    email: "ana@email.com",
    telefone: "934567890",
    dataNascimento: "1990-09-25",
    profissao: "Instrutora",
    carta: "B",
    status: "Inativo",
  },
]

export default function InstrutoresPage() {
  // Estados de filtros
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [results, setResults] = useState(instrutores)

const navigate = useNavigate()


  // Função de busca
  function handleSearch() {
    const q = query.trim().toLowerCase()
    const filtered = instrutores.filter((i) => {
      if (q) {
        const inSearch =
          i.nome.toLowerCase().includes(q) ||
          (i.email || "").toLowerCase().includes(q) ||
          (i.telefone || "").toLowerCase().includes(q)
        if (!inSearch) return false
      }
      if (statusFilter !== "all") {
        if ((i.status || "").toLowerCase() !== statusFilter.toLowerCase())
          return false
      }
      return true
    })
    setResults(filtered)
  }

  function handleReset() {
    setQuery("")
    setStatusFilter("all")
    setResults(instrutores)
  }

  return (
    <Card className="p-5 shadow-sm dark:bg-gray-800 space-y-8 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Gestão de Instrutores
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Lista de todos os instrutores cadastrados
          </p>
        </div>
        <Button
          className="flex items-center gap-2 bg-blue-600 text-white"
          onClick={() => (window.location.href = "/instrutores/novo")}
        >
          <Plus size={14} /> Novo Instrutor
        </Button>
      </div>

      {/* Área de Filtros */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 w-full md:w-1/2">
          <Input
            placeholder="Pesquisar por nome, email ou telefone..."
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
              <SelectItem value="Ativo">Ativo</SelectItem>
              <SelectItem value="Inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabela */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Foto</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Data Nascimento</TableHead>
            <TableHead>Profissão</TableHead>
            <TableHead>Carta</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-6 text-sm">
                Nenhum instrutor encontrado com os filtros aplicados.
              </TableCell>
            </TableRow>
          ) : (
            results.map((instrutor) => (
              <TableRow key={instrutor.id}>
                <TableCell>
                  <img
                    src={instrutor.image}
                    alt={instrutor.nome}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{instrutor.nome}</TableCell>
                <TableCell>{instrutor.email}</TableCell>
                <TableCell>{instrutor.telefone}</TableCell>
                <TableCell>{instrutor.dataNascimento}</TableCell>
                <TableCell>{instrutor.profissao}</TableCell>
                <TableCell>{instrutor.carta}</TableCell>
                <TableCell>
                  {instrutor.status === "Ativo" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      {instrutor.status}
                    </span>
                  )}
                  {instrutor.status === "Inativo" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      {instrutor.status}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right flex gap-2 justify-end">
                  <Button size="sm" variant="outline" className="flex items-center gap-2"
                    onClick={() => navigate(`/instrutores/${instrutor.id}/editar`)}
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
