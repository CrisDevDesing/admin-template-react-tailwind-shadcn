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

// Mock data (substituir pelo backend)
const mockVeiculos = [
  {
    id: 1,
    marca: "Renault",
    modelo: "Clio",
    matricula: "AA-12-BB",
    cor: "Branco",
    combustivel: "Gasolina",
    transmissao: "Manual",
    ano: "2020",
    status: "Ativo",
  },
  {
    id: 2,
    marca: "Volkswagen",
    modelo: "Golf",
    matricula: "CC-34-DD",
    cor: "Preto",
    combustivel: "Diesel",
    transmissao: "Automático",
    ano: "2019",
    status: "Manutenção",
  },
]

export default function VeiculosPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [results, setResults] = useState(mockVeiculos)

  function handleSearch() {
    const q = query.trim().toLowerCase()
    const filtered = mockVeiculos.filter((v) => {
      if (q) {
        const inSearch =
          v.marca.toLowerCase().includes(q) ||
          v.modelo.toLowerCase().includes(q) ||
          v.matricula.toLowerCase().includes(q)
        if (!inSearch) return false
      }
      if (statusFilter !== "all") {
        if ((v.status || "").toLowerCase() !== statusFilter.toLowerCase())
          return false
      }
      return true
    })
    setResults(filtered)
  }

  function handleReset() {
    setQuery("")
    setStatusFilter("all")
    setResults(mockVeiculos)
  }

  function handleDelete(id: number) {
    if (confirm("Deseja remover este veículo?")) {
      setResults(results.filter((v) => v.id !== id))
    }
  }

  return (
    <Card className="p-5 shadow-sm dark:bg-gray-800 space-y-8 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Gestão de Veículos
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Lista de todos os veículos cadastrados
          </p>
        </div>
        <Button
          className="flex items-center gap-2 bg-blue-600 text-white"
          onClick={() => navigate("/veiculos/novo")}
        >
          <Plus size={14} /> Novo Veículo
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 w-full md:w-1/2">
          <Input
            placeholder="Pesquisar por marca, modelo ou matrícula..."
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
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Ativo">Ativo</SelectItem>
              <SelectItem value="Manutenção">Manutenção</SelectItem>
              <SelectItem value="Inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabela */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Marca</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Matrícula</TableHead>
            <TableHead>Cor</TableHead>
            <TableHead>Combustível</TableHead>
            <TableHead>Transmissão</TableHead>
            <TableHead>Ano</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-6 text-sm">
                Nenhum veículo encontrado.
              </TableCell>
            </TableRow>
          ) : (
            results.map((veiculo) => (
              <TableRow key={veiculo.id}>
                <TableCell className="font-medium">{veiculo.marca}</TableCell>
                <TableCell>{veiculo.modelo}</TableCell>
                <TableCell>{veiculo.matricula}</TableCell>
                <TableCell>{veiculo.cor}</TableCell>
                <TableCell>{veiculo.combustivel}</TableCell>
                <TableCell>{veiculo.transmissao}</TableCell>
                <TableCell>{veiculo.ano}</TableCell>
                <TableCell>{veiculo.status}</TableCell>
                <TableCell className="text-right flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/veiculos/${veiculo.id}/editar`)}
                  >
                    <Edit size={14} /> Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(veiculo.id)}
                  >
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
