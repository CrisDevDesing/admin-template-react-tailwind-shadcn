import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import Dashboard from "@/features/dashboard";
import AlunosPage from "@/features/alunos";
import InstrutoresPage from "@/features/instrutores";
import AulasPage from "@/features/aulas";
import ExamesPage from "@/features/exames";
import VeiculosPage from "@/features/veiculos";
import PagamentosPage from "@/features/pagamentos";
import SettingsPage from "@/features/settings";
import NovoAluno from "@/features/alunos/NovoAluno";
import NovoVeiculo from "@/features/veiculos/NovoVeiculo";
import EditarVeiculo from "@/features/veiculos/EditarVeiculo";
import EditarAluno from "@/features/alunos/EditarAluno";
import NovoInstrutor from "@/features/instrutores/NovoInstrutor";
import EditarInstrutor from "@/features/instrutores/EditarInstrutor";
import NovaAula from "@/features/aulas/NovaAula";
import EditarAula from "@/features/aulas/EditarAula";
import NovoExame from "@/features/exames/NovoExame";
import EditarExame from "@/features/exames/EditarExame";
import NovoPagamento from "@/features/pagamentos/NovoPagamento";
import EditarPagamento from "@/features/pagamentos/EditarPagamento";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* CRUD Veículos */}
        <Route path="/veiculos" element={<VeiculosPage />} />
        <Route path="/veiculos/novo" element={<NovoVeiculo />} />
        <Route path="/veiculos/:id/editar" element={<EditarVeiculo />} />
        {/* CRUD Alunos */}
          <Route path="/alunos" element={<AlunosPage />} />
          <Route path="/alunos/novo" element={<NovoAluno />} />
          <Route path="/alunos/:id/editar" element={<EditarAluno />} />
        {/* CRUD Instrutores */}
          <Route path="/instrutores" element={<InstrutoresPage />} />
          <Route path="/instrutores/novo" element={<NovoInstrutor />} />
          <Route path="/instrutores/:id/editar" element={<EditarInstrutor />} />
          {/* CRUD Aulas */} 
          <Route path="/aulas" element={<AulasPage />} /> 
          <Route path="/aulas/nova" element={<NovaAula />} /> 
          <Route path="/aulas/:id/editar" element={<EditarAula />} />
         {/* CRUD Exames */} 
          <Route path="/exames" element={<ExamesPage />} /> 
          <Route path="/exames/novo" element={<NovoExame />} /> 
          <Route path="/exames/:id/editar" element={<EditarExame />} />
          {/* CRUD Pagamentos */} 
        <Route path="/pagamentos" element={<PagamentosPage />} />
          <Route path="/pagamentos/novo" element={<NovoPagamento />} /> 
          <Route path="/pagamentos/:id/editar" element={<EditarPagamento />} />
        {/* Page Not Find */}
        <Route path="*" element={<p>Página não encontrada</p>} />
      </Route>
    </Routes>
  );
}
