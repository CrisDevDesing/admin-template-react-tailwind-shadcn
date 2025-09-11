import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/dashboard";
import AlunosPage from "@/pages/alunos";
import InstrutoresPage from "@/pages/instrutores";
import AulasPage from "@/pages/aulas";
import ExamesPage from "@/pages/exames";
import VeiculosPage from "@/pages/veiculos";
import PagamentosPage from "@/pages/pagamentos";
import SettingsPage from "@/pages/settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alunos" element={<AlunosPage />} />
        <Route path="/instrutores" element={<InstrutoresPage />} />
        <Route path="/aulas" element={<AulasPage />} />
        <Route path="/exames" element={<ExamesPage />} />
        <Route path="/veiculos" element={<VeiculosPage />} />
        <Route path="/pagamentos" element={<PagamentosPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
