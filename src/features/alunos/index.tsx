import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

import { Search, Edit, Trash2, Plus } from "lucide-react";

// Mock data (substituir pelo backend futuramente)
const alunos = [
  {
    id: 1,
    foto: "https://www.clipartmax.com/png/middle/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png",
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "912345678",
    dataInicio: "2025-01-15",
    status: "Ativo",
    instrutor: "Carlos Santos",
    veiculo: "Renault Clio",
  },
  {
    id: 2,
    foto: "https://www.clipartmax.com/png/middle/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png",
    nome: "Maria Oliveira",
    email: "maria@email.com",
    telefone: "934567890",
    dataInicio: "2025-02-01",
    status: "Concluído",
    instrutor: "Ana Ferreira",
    veiculo: "VW Golf",
  },
  {
    id: 3,
    foto: './avatar.png',
    nome: "Pedro Costa",
    email: "pedro@email.com",
    telefone: "967890123",
    dataInicio: "2025-03-10",
    status: "Inativo",
    instrutor: "Carlos Santos",
    veiculo: "Renault Clio",
  },
];

export default function AlunosPage() {
  // Estados dos filtros
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [instrutorFilter, setInstrutorFilter] = useState("all");
  const [veiculoFilter, setVeiculoFilter] = useState("all");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [results, setResults] = useState(alunos);

  const navigate = useNavigate();

  // Valores únicos para Selects
  const instrutores = useMemo(
    () => Array.from(new Set(alunos.map((a) => a.instrutor))).filter(Boolean),
    []
  );
  const veiculos = useMemo(
    () => Array.from(new Set(alunos.map((a) => a.veiculo))).filter(Boolean),
    []
  );

  // Função de busca
  function handleSearch() {
    const q = query.trim().toLowerCase();

    const filtered = alunos.filter((a) => {
      // pesquisa global
      if (q) {
        const inSearch =
          (a.nome || "").toLowerCase().includes(q) ||
          (a.email || "").toLowerCase().includes(q) ||
          (a.telefone || "").toLowerCase().includes(q);
        if (!inSearch) return false;
      }

      // status
      if (statusFilter !== "all") {
        if ((a.status || "").toLowerCase() !== statusFilter.toLowerCase())
          return false;
      }

      // instrutor
      if (instrutorFilter !== "all" && a.instrutor !== instrutorFilter)
        return false;

      // veiculo
      if (veiculoFilter !== "all" && a.veiculo !== veiculoFilter)
        return false;

      // data
      if (dateStart) {
        const aDate = new Date(a.dataInicio);
        const start = new Date(dateStart);
        if (aDate < start) return false;
      }
      if (dateEnd) {
        const aDate = new Date(a.dataInicio);
        const end = new Date(dateEnd);
        end.setHours(23, 59, 59, 999);
        if (aDate > end) return false;
      }

      return true;
    });

    setResults(filtered);
  }

  function handleReset() {
    setQuery("");
    setStatusFilter("all");
    setInstrutorFilter("all");
    setVeiculoFilter("all");
    setDateStart("");
    setDateEnd("");
    setResults(alunos);
  }

  return (
    <>
      <Card className="p-5 shadow-sm dark:bg-gray-800 space-y-8 max-w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Gestão de Alunos
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Lista de todos os alunos cadastrados
            </p>
          </div>
          {/* Use useRouter for navigation on button click */}
          <Button
            className="flex items-center gap-2 bg-blue-600 text-white"
            onClick={() => window.location.href = "/alunos/novo"}
          >
            <Plus size={14} /> Novo Aluno
          </Button>
        </div>

        {/* Área de Filtros */}
        <div className="flex flex-col  ">
          {/* Pesquisa */}
          <div className="flex items-center gap-2 w-full md:w-1/2 mb-4">
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

          {/* Selects e datas */}
          <div className="flex  gap-2 flex-row justify-between flex-wrap">
            <div className="flex gap-2 flex-wrap">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <span className="text-gray-400">Estado</span>
                  </SelectItem>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>

              {/* Instrutor */}
              <Select value={instrutorFilter} onValueChange={setInstrutorFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Instrutor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <span className="text-gray-400">Instrutor</span>

                  </SelectItem>
                  {instrutores.map((i) => (
                    <SelectItem key={i} value={i}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Status */}


            {/* Veículo 
          <Select value={veiculoFilter} onValueChange={setVeiculoFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Veículo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Veículo</SelectItem>
              {veiculos.map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>*/}

            {/* Datas */}
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                className="rounded-md border px-2 py-1 text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
              <span className="text-sm text-gray-400">→</span>
              <input
                type="date"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                className="rounded-md border px-2 py-1 text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
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
              <TableHead>Data Início</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Opções</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-sm">
                  Nenhum aluno encontrado com os filtros aplicados.
                </TableCell>
              </TableRow>
            ) : (
              results.map((aluno) => (
                <TableRow key={aluno.id}>
                  <TableCell>
                    
                    <img
                      src={aluno.foto}
                      alt={aluno.nome}
                      className="h-10 w-10 rounded-full object-cover" 
                    />
                  </TableCell>
                  <TableCell className="font-medium">{aluno.nome}</TableCell>
                  <TableCell>{aluno.email}</TableCell>
                  <TableCell>{aluno.telefone}</TableCell>
                  <TableCell>{aluno.dataInicio}</TableCell>
                  <TableCell>
                    {aluno.status === "Ativo" && (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        {aluno.status}
                      </span>
                    )}
                    {aluno.status === "Concluído" && (
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        {aluno.status}
                      </span>
                    )}
                    {aluno.status === "Inativo" && (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        {aluno.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Button size="sm" variant="outline" className="flex items-center gap-2"
                     onClick={() => navigate(`/alunos/${aluno.id}/editar`)}
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
      {/* <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog> */}
    </>
  );
}
