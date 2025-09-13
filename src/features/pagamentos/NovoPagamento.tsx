import PagamentoForm, { PagamentoFormData } from "./PagamentoForm"

export default function NovoPagamento() {
  function handleSubmit(data: PagamentoFormData) {
    console.log("Novo pagamento:", data)
    // API -> POST /api/pagamentos { ...data }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Novo Pagamento</h2>
      <PagamentoForm onSubmit={handleSubmit} />
    </div>
  )
}
