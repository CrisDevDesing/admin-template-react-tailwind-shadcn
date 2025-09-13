import React from "react"
import { Card } from "@/components/ui/card"
import { AulaForm, AulaFormData } from "./AulaForm"
import { useNavigate, useParams } from "react-router-dom"

export default function EditarAula() {
  const navigate = useNavigate()
  const { id } = useParams()

  // ⚠️ Mock: substituir por fetch ao backend
  const aulaExistente: AulaFormData = {
    aluno: "João Silva",
    instrutor: "Carlos Santos",
    veiculo: "Toyota Yaris - 12-AB-34",
    data: "2025-09-15",
    horaInicio: "10:00",
    horaFim: "11:00",
    numAula: "A001",
    lessonName: "Estacionamento",
    tipo: "Prática",
    local: "Pista de Treino",
    status: "Concluída",
  }

  function handleSubmit(data: AulaFormData) {
    console.log("Atualizar aula:", id, data)
    // TODO: chamar API -> PUT /aulas/:id
    navigate("/aulas")
  }

  return (
    <Card className="p-5 shadow-sm dark:bg-gray-800 max-w-3xl mx-auto">
      <h1 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
        Editar Aula #{id}
      </h1>
      <AulaForm defaultValues={aulaExistente} onSubmit={handleSubmit} />
    </Card>
  )
}
