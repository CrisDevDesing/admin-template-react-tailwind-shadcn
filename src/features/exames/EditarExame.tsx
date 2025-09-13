import React from "react"
import { Card } from "@/components/ui/card"
import { ExameForm, ExameFormData } from "./ExameForm"
import { useNavigate, useParams } from "react-router-dom"

export default function EditarExame() {
  const navigate = useNavigate()
  const { id } = useParams()

  // ⚠️ Mock: substituir futuramente por fetch ao backend
  const exameExistente: ExameFormData = {
    aluno: "João Silva",
    instrutor: "Carlos Santos",
    veiculo: "Toyota Yaris - 12-AB-34",
    data: "2025-09-20",
    horaInicio: "09:00",
    horaFim: "10:00",
    lessonName: "Estacionamento",
    tipo: "Prático",
    local: "Pista Central",
    examinador: "Paulo Gomes",
    pontuacao: "85/100",
    resultado: "Aprovado",
    status: "Concluído",
  }

  function handleSubmit(data: ExameFormData) {
    console.log("Atualizar exame:", id, data)
    // TODO: chamar API -> PUT /exames/:id
    navigate("/exames")
  }

  return (
    <Card className="p-5 shadow-sm dark:bg-gray-800 max-w-3xl mx-auto">
      <h1 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
        Editar Exame #{id}
      </h1>
      <ExameForm defaultValues={exameExistente} onSubmit={handleSubmit} />
    </Card>
  )
}
