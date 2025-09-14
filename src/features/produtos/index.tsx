import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import { ProdutoForm, ProdutoFormValues } from "./ProdutoForm";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [impostos, setImpostos] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("all");
  const [ativoFilter, setAtivoFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  // 🔹 Carregar dados
  useEffect(() => {
    Promise.all([
      fetch("/api/produtos").then((r) => r.json()),
      fetch("/api/categorias").then((r) => r.json()),
      fetch("/api/impostos").then((r) => r.json()),
    ])
      .then(([p, c, i]) => {
        setProdutos(p);
        setCategorias(c);
        setImpostos(i);
        setResults(p);
      })
      .catch(console.error);
  }, []);

  // 🔹 Pesquisa e filtros
  function handleSearch() {
    const q = query.trim().toLowerCase();
    const filtered = produtos.filter((p) => {
      if (q) {
        const inSearch =
          (p.nome || "").toLowerCase().includes(q) ||
          (p.descricao || "").toLowerCase().includes(q);
        if (!inSearch) return false;
      }
      if (categoriaFilter !== "all" && p.id_categoria !== parseInt(categoriaFilter)) return false;
      if (ativoFilter !== "all" && String(p.ativo) !== ativoFilter) return false;
      return true;
    });
    setResults(filtered);
  }

  function handleReset() {
    setQuery("");
    setCategoriaFilter("all");
    setAtivoFilter("all");
    setResults(produtos);
  }

  // 🔹 Guardar (criar/editar)
  const handleSave = async (data: ProdutoFormValues) => {
    if (editing) {
      await fetch(`/api/produtos/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    // Refresh
    fetch("/api/produtos")
      .then((res) => res.json())
      .then((p) => {
        setProdutos(p);
        setResults(p);
      });

    setOpen(false);
    setEditing(null);
  };

  // 🔹 Remover
  const handleDelete = async (id: number) => {
    await fetch(`/api/produtos/${id}`, { method: "DELETE" });
    const updated = produtos.filter((p) => p.id !== id);
    setProdutos(updated);
    setResults(updated);
  };

  return (
    <Card className="p-5 shadow-sm dark:bg-gray-800 space-y-8 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Gestão de Produtos</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Lista de produtos e serviços</p>
        </div>
        <Button
          className="flex items-center gap-2 bg-blue-600 text-white"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus size={14} /> Novo Produto
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 w-full md:w-1/2">
          <Input
            placeholder="Pesquisar por nome ou descrição..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={handleSearch} className="flex items-center gap-2">
            <Search size={14} /> Buscar
          </Button>
          <Button variant="ghost" onClick={handleReset}>
            Reset
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Categoria */}
          <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <span className="text-gray-400">Todas Categorias</span>
              </SelectItem>
              {categorias.map((c) => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Estado */}
          <Select value={ativoFilter} onValueChange={setAtivoFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <span className="text-gray-400">Todos</span>
              </SelectItem>
              <SelectItem value="1">Ativo</SelectItem>
              <SelectItem value="0">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabela */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Imposto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-sm">
                Nenhum produto encontrado.
              </TableCell>
            </TableRow>
          ) : (
            results.map((p) => {
              const categoria = categorias.find((c) => c.id === p.id_categoria);
              const imposto = impostos.find((i) => i.id === p.id_imposto);
              return (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.nome}</TableCell>
                  <TableCell>{categoria ? categoria.nome : "-"}</TableCell>
                  <TableCell>{parseFloat(p.preco).toFixed(2)} €</TableCell>
                  <TableCell>{imposto ? `${imposto.percentagem}%` : "-"}</TableCell>
                  <TableCell>
                    {p.ativo ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        Ativo
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        Inativo
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditing(p);
                        setOpen(true);
                      }}
                      className="flex items-center gap-2"
                    >
                      <Edit size={14} /> Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(p.id)}
                      className="flex items-center gap-2"
                    >
                      <Trash2 size={14} /> Remover
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {/* Modal Novo/Editar */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Editar Produto" : "Novo Produto"}</DialogTitle>
          </DialogHeader>
          <ProdutoForm
            categorias={categorias}
            impostos={impostos}
            defaultValues={editing || { ativo: true }}
            onSubmit={handleSave}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
