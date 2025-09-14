import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import { ArmazemForm, ArmazemFormValues } from "./ArmazemForm";

export default function ArmazensPage() {
  const [armazens, setArmazens] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  // 🔹 Carregar dados
  useEffect(() => {
    fetch("/api/armazens")
      .then((r) => r.json())
      .then((data) => {
        setArmazens(data);
        setResults(data);
      })
      .catch(console.error);
  }, []);

  // 🔹 Pesquisa
  function handleSearch() {
    const q = query.trim().toLowerCase();
    const filtered = armazens.filter((a) => {
      if (q) {
        return (
          (a.nome || "").toLowerCase().includes(q) ||
          (a.localizacao || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
    setResults(filtered);
  }

  function handleReset() {
    setQuery("");
    setResults(armazens);
  }

  // 🔹 Guardar
  const handleSave = async (data: ArmazemFormValues) => {
    if (editing) {
      await fetch(`/api/armazens/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/armazens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    // Refresh
    fetch("/api/armazens")
      .then((res) => res.json())
      .then((data) => {
        setArmazens(data);
        setResults(data);
      });

    setOpen(false);
    setEditing(null);
  };

  // 🔹 Remover
  const handleDelete = async (id: number) => {
    await fetch(`/api/armazens/${id}`, { method: "DELETE" });
    const updated = armazens.filter((a) => a.id !== id);
    setArmazens(updated);
    setResults(updated);
  };

  return (
    <Card className="p-5 shadow-sm dark:bg-gray-800 space-y-8 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Gestão de Armazéns</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Lista de todos os armazéns cadastrados
          </p>
        </div>
        <Button
          className="flex items-center gap-2 bg-blue-600 text-white"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus size={14} /> Novo Armazém
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-2 w-full md:w-1/2">
        <Input
          placeholder="Pesquisar por nome ou localização..."
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

      {/* Tabela */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Localização</TableHead>
            <TableHead>Ativo</TableHead>
            <TableHead className="text-right">Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-sm">
                Nenhum armazém encontrado.
              </TableCell>
            </TableRow>
          ) : (
            results.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.nome}</TableCell>
                <TableCell>{a.localizacao}</TableCell>
                <TableCell>
                  {a.ativo ? (
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
                      setEditing(a);
                      setOpen(true);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Edit size={14} /> Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(a.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 size={14} /> Remover
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Modal Novo/Editar */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Editar Armazém" : "Novo Armazém"}</DialogTitle>
          </DialogHeader>
          <ArmazemForm
            defaultValues={editing || { ativo: true }}
            onSubmit={handleSave}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
