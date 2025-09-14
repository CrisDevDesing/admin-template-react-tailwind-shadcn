import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

// Função utilitária para exportar dados para CSV
function exportToCSV(data: any[], filename: string) {
  if (!data.length) return;
  const csvRows = [
    Object.keys(data[0]).join(","),
    ...data.map((row) => Object.values(row).join(",")),
  ];
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

const filterSchema = z.object({
  tipo: z.enum(["pagamentos", "alunos", "cursos"]),
  aluno: z.string().optional(),
  curso: z.string().optional(),
  dataInicio: z.string().optional(),
  dataFim: z.string().optional(),
});

type FilterValues = z.infer<typeof filterSchema>;

export default function RelatoriosPage() {
  const { register, handleSubmit, watch, control, reset, formState: { errors } } = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      tipo: "pagamentos",
    },
  });

  const tipo = watch("tipo");

  function onSubmit(data: FilterValues) {
    // TODO: fetch and update report data
    console.log(data);
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relatório Financeiro</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block mb-1">Tipo</label>
              <select {...register("tipo")} className="input">
                <option value="pagamentos">Pagamentos</option>
                <option value="alunos">Alunos</option>
                <option value="cursos">Cursos</option>
              </select>
            </div>
            {tipo === "pagamentos" && (
              <>
                <div>
                  <label className="block mb-1">Aluno</label>
                  <Input {...register("aluno")} placeholder="Nome do aluno" />
                </div>
                <div>
                  <label className="block mb-1">Curso/Produto</label>
                  <Input {...register("curso")} placeholder="Nome do curso/produto" />
                </div>
              </>
            )}
            <div>
              <label className="block mb-1">Data início</label>
              <Input type="date" {...register("dataInicio")} />
            </div>
            <div>
              <label className="block mb-1">Data fim</label>
              <Input type="date" {...register("dataFim")} />
            </div>
            <Button type="submit">Filtrar</Button>
          </form>
        </CardContent>
      </Card>

      {/* Relatórios */}
      {tipo === "pagamentos" && <RelatorioPagamentos />}
      {tipo === "alunos" && <RelatorioAlunos />}
      {tipo === "cursos" && <RelatorioCursos />}
    </div>
  );
}

function RelatorioPagamentos() {
  // Exemplo de dados mockados
  const pagamentos = [
    { id: 1, aluno: "João Silva", curso: "Categoria B", valor: 200, data: "2025-09-01" },
    { id: 2, aluno: "Maria Souza", curso: "Categoria A", valor: 150, data: "2025-09-02" },
  ];
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Pagamentos</CardTitle>
        <Button variant="outline" size="sm" onClick={() => exportToCSV(pagamentos, "pagamentos.csv")}>Exportar CSV</Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Curso</th>
                <th>Valor</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {pagamentos.map((p) => (
                <tr key={p.id}>
                  <td>{p.aluno}</td>
                  <td>{p.curso}</td>
                  <td>R$ {p.valor}</td>
                  <td>{p.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function RelatorioAlunos() {
  // Exemplo de dados mockados
  const alunos = [
    {
      id: 1,
      foto: "https://randomuser.me/api/portraits/men/1.jpg",
      nome: "João Silva",
      email: "joao@email.com",
      telefone: "99999-0001",
      dataInicio: "2025-09-01",
      status: "Ativo",
    },
    {
      id: 2,
      foto: "https://randomuser.me/api/portraits/women/2.jpg",
      nome: "Maria Souza",
      email: "maria@email.com",
      telefone: "99999-0002",
      dataInicio: "2025-09-02",
      status: "Concluído",
    },
  ];
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Alunos</CardTitle>
        <Button variant="outline" size="sm" onClick={() => exportToCSV(alunos, "alunos.csv")}>Exportar CSV</Button>
      </CardHeader>
      <CardContent>
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
            {alunos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-sm">
                  Nenhum aluno encontrado com os filtros aplicados.
                </TableCell>
              </TableRow>
            ) : (
              alunos.map((aluno) => (
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
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      Editar
                    </Button>
                    <Button size="sm" variant="destructive" className="flex items-center gap-2">
                      Remover
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function RelatorioCursos() {
  // Exemplo de dados mockados
  const cursos = [
    { id: 1, nome: "Categoria B", inscritos: 30 },
    { id: 2, nome: "Categoria A", inscritos: 18 },
  ];
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Cursos Mais Aderidos</CardTitle>
        <Button variant="outline" size="sm" onClick={() => exportToCSV(cursos, "cursos.csv")}>Exportar CSV</Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th>Curso</th>
                <th>Inscritos</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((c) => (
                <tr key={c.id}>
                  <td>{c.nome}</td>
                  <td>{c.inscritos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
