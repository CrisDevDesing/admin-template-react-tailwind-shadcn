import { VeiculoForm, VeiculoFormData } from "./VeiculoForm"

export default function NovoVeiculo() {
  function handleSubmit(data: VeiculoFormData) {
    console.log("Cadastrando veículo...", data)
    // chamada API -> POST /veiculos
  }

  return (
    <div className="max-w-6xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Novo Veículo</h1>
      <VeiculoForm onSubmit={handleSubmit} />
    </div>
  )
}
