import { StatCard } from "@/components/dashboard/StatCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { Users, GraduationCap, Car, CalendarCheck } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Alunos" value="124" icon={<Users />} />
        <StatCard title="Instrutores" value="12" icon={<GraduationCap />} />
        <StatCard title="Veículos" value="8" icon={<Car />} />
        <StatCard title="Aulas" value="356" icon={<CalendarCheck />} />
      </div>

      {/* Conteúdo em 2 colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard />
        <RecentActivity />
      </div>
    </div>
  );
}
