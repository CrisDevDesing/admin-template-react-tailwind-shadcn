import React from "react"
import { Card } from "@/components/ui/card"
import { AulaForm, AulaFormData } from "./AulaForm"
import { useNavigate } from "react-router-dom"

export default function NovaAula() {
  const navigate = useNavigate()

  function handleSubmit(data: AulaFormData) {
    console.log("Nova aula:", data)
    // TODO: chamar API -> POST /aulas
    navigate("/aulas")
  }

  return (
    <Card className="p-5 shadow-sm dark:bg-gray-800 max-w-3xl mx-auto">
      <h1 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
        Nova Aula
      </h1>
      <AulaForm onSubmit={handleSubmit} />
    </Card>
  )
}
