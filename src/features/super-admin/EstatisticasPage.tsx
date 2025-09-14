// src/features/super-admin/EstatisticasPage.tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { empresa: "Empresa 1", alunos: 120, instrutores: 15, exames: 20 },
  { empresa: "Empresa 2", alunos: 80, instrutores: 10, exames: 15 },
]

export default function EstatisticasPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Estatísticas Globais</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="empresa" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="alunos" fill="#3b82f6" />
          <Bar dataKey="instrutores" fill="#10b981" />
          <Bar dataKey="exames" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
