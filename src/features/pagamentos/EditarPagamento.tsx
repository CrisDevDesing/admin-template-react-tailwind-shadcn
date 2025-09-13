import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PagamentoForm, { PagamentoFormData } from "./PagamentoForm"

export default function EditarPagamento() {
  const { id } = useParams()
  const [pagamento, setPagamento] = useState<PagamentoFormData | null>(null)

  useEffect(() => {
    fetch(`/api/pagamentos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // adaptar os campos recebidos do backend ao schema do form
        const mapped: PagamentoFormData = {
          aluno: data.aluno,
          data_pagamento: data.data_pagamento,
          forma_pagamento: data.forma_pagamento,
          status: data.status || "Pendente",
          observacoes: data.observacoes || "",
          itens: data.itens.map((it: any) => ({
            produto: it.produto_id.toString(),
            quantidade: it.quantidade,
            preco_unitario: parseFloat(it.preco_unitario),
            imposto: parseFloat(it.imposto) || 0,
          })),
        }
        setPagamento(mapped)
      })
  }, [id])

  function handleSubmit(data: PagamentoFormData) {
    console.log("Atualizar pagamento:", id, data)
    // API -> PUT /api/pagamentos/:id { ...data }
  }

  if (!pagamento) return <div className="p-6">Carregando...</div>

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Editar Pagamento #{id}</h2>
      <PagamentoForm defaultValues={pagamento} onSubmit={handleSubmit} />
    </div>
  )
}
