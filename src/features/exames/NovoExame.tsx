import React from "react"
import { Card } from "@/components/ui/card"
import { ExameForm, ExameFormData } from "./ExameForm"
import { useNavigate } from "react-router-dom"

export default function NovoExame() {
  const navigate = useNavigate()

  function handleSubmit(data: ExameFormData) {
    console.log("Novo exame:", data)
    // TODO: chamar API -> POST /exames
    navigate("/exames")
  }

  return (
    <Card className="p-5 shadow-sm dark:bg-gray-800 max-w-3xl mx-auto">
      <h1 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
        Novo Exame
      </h1>
      <ExameForm onSubmit={handleSubmit} />
    </Card>
  )
}
