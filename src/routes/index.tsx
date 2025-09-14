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
import EmpresaPage from "@/features/empresa/EmpresaPage";
import UtilizadoresPage from "@/features/utilizadores/UtilizadoresPage";
import TiposPagamentoPage from "@/features/tipos-pagamento/TiposPagamentoPage";
import CategoriasPage from "@/features/categorias/CategoriaPage";
import ImpostosPage from "@/features/impostos/ImpostosPage";
import ProdutosPage from "@/features/produtos";
import ArmazensPage from "@/features/armazens/ArmazemPage";
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/features/auth/LoginPage";
import SuperAdminLayout from "@/layouts/SuperAdminLayout";
import SuperAdminDashboard from "@/features/super-admin/SuperAdminDashboard";
import EmpresasPage from "@/features/super-admin/EmpresasPage";
import EstatisticasPage from "@/features/super-admin/EstatisticasPage";
import AuditoriaPage from "@/features/super-admin/AuditoriaPage";
import UsersPage from "@/features/super-admin/UsersPage";
import { ProtectedRoute } from "./ProtectedRoute";
import RelatoriosPage from "@/features/relatorios/RelatoriosPage";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Rotas Privadas */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "super_admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
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

          {/* CRUD Setting */}
          <Route path="settings">
            <Route index element={<SettingsPage />} />
          </Route>
          <Route path="settings">
            <Route path="empresa" element={<EmpresaPage />} />
            {/* aqui vamos ligar os outros módulos mais tarde */}
            <Route path="utilizadores" element={<UtilizadoresPage />} />
            <Route path="tipos-pagamento" element={<TiposPagamentoPage />} />
            <Route path="categorias" element={<CategoriasPage />} />
            <Route path="impostos" element={<ImpostosPage />} />
            <Route path="produtos" element={<ProdutosPage />} />
            <Route path="armazens" element={<ArmazensPage />} />
          </Route>
          <Route path="relatorios" element={<RelatoriosPage />} />
          {/* Page Not Find */}
          <Route path="*" element={<p>Página não encontrada</p>} />
        </Route>

      </Route>


      {/* Rotas públicas */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["super_admin"]} />}>
        <Route element={<SuperAdminLayout />}>
          <Route path="/super-admin" element={<SuperAdminDashboard />} />
          <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/super-admin/empresas" element={<EmpresasPage />} />
          <Route path="/super-admin/utilizadores" element={<UsersPage />} />
          <Route path="/super-admin/estatisticas" element={<EstatisticasPage />} />
          <Route path="/super-admin/auditoria" element={<AuditoriaPage />} />
        </Route>
      </Route>

    </Routes>
  );
}
