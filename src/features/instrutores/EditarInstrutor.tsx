import { useEffect, useState } from "react"
import { InstrutorForm, InstrutorFormData } from "./InstrutorForm"
import { useParams } from "react-router-dom"

export default function EditarInstrutor() {
  const { id } = useParams()
  const [instrutor, setInstrutor] = useState<InstrutorFormData | null>(null)

  useEffect(() => {
    // mock GET /instrutores/:id
    setTimeout(() => {
      setInstrutor({
        nome: "Carlos Santos",
        email: "carlos@email.com",
        telefone: "912345678",
        categoria: "B",
        status: "Ativo",
      })
    }, 500)
  }, [id])

  function handleSubmit(data: InstrutorFormData) {
    console.log("Editando instrutor ID:", id, data)
    // chamada API -> PUT /instrutores/:id
  }

  if (!instrutor) return <p>Carregando...</p>

  return (
    <div className="max-w-6xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Editar Instrutor</h1>
      <InstrutorForm defaultValues={instrutor} onSubmit={handleSubmit} />
    </div>
  )
}
