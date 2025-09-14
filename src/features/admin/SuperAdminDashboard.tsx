import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type Empresa = {
  id: number
  empresa: string
  representante: string
  cidade: string
}

const mockEmpresas: Empresa[] = [
  { id: 1, empresa: "Auto Escola Alfa", representante: "João Silva", cidade: "Lisboa" },
  { id: 2, empresa: "Drive Bem", representante: "Maria Costa", cidade: "Porto" },
]

export default function SuperAdminDashboard() {
  const [empresas, setEmpresas] = useState<Empresa[]>(mockEmpresas)
  const [nova, setNova] = useState<Partial<Empresa>>({})

  const addEmpresa = () => {
    if (!nova.empresa || !nova.representante) return
    const novaEmpresa = { ...nova, id: empresas.length + 1 } as Empresa
    setEmpresas([...empresas, novaEmpresa])
    setNova({})
  }

  const entrarNaEmpresa = (empresa: Empresa) => {
    localStorage.setItem("tenantId", empresa.id.toString())
    alert(`Entrou na empresa: ${empresa.empresa}`)
    // Aqui poderias navegar para o dashboard da empresa
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Super Admin - Empresas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {empresas.map((empresa) => (
          <Card key={empresa.id} className="p-4 flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-lg">{empresa.empresa}</h2>
              <p className="text-sm text-gray-600">Representante: {empresa.representante}</p>
              <p className="text-sm text-gray-600">Cidade: {empresa.cidade}</p>
            </div>
            <Button
              className="mt-4"
              onClick={() => entrarNaEmpresa(empresa)}
            >
              Aceder
            </Button>
          </Card>
        ))}
      </div>

      {/* Botão para abrir modal */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-6">+ Nova Empresa</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastrar Empresa</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Nome da Empresa"
              value={nova.empresa || ""}
              onChange={(e) => setNova({ ...nova, empresa: e.target.value })}
            />
            <Input
              placeholder="Representante"
              value={nova.representante || ""}
              onChange={(e) => setNova({ ...nova, representante: e.target.value })}
            />
            <Input
              placeholder="Cidade"
              value={nova.cidade || ""}
              onChange={(e) => setNova({ ...nova, cidade: e.target.value })}
            />
            <Button onClick={addEmpresa}>Salvar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
