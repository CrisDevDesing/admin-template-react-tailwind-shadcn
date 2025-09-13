import { useEffect, useState } from "react"
import { VeiculoForm, VeiculoFormData } from "./VeiculoForm"
import { useParams } from "react-router-dom"

export default function EditarVeiculo() {
  const { id } = useParams()
  const [veiculo, setVeiculo] = useState<VeiculoFormData | null>(null)

  useEffect(() => {
    // mock do backend -> futuramente GET /veiculos/:id
    setTimeout(() => {
      setVeiculo({
        marca: "Renault",
        modelo: "Clio",
        matricula: "AA-12-BB",
        cor: "Branco",
        combustivel: "Gasolina",
        transmissao: "Manual",
        status: "Ativo",
      })
    }, 500)
  }, [id])

  function handleSubmit(data: VeiculoFormData) {
    console.log("Editando veículo ID:", id, data)
    // chamada API -> PUT /veiculos/:id
  }

  if (!veiculo) return <p>Carregando...</p>

  return (
    <div className="max-w-6xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Editar Veículo</h1>
      <VeiculoForm defaultValues={veiculo} onSubmit={handleSubmit} />
    </div>
  )
}
