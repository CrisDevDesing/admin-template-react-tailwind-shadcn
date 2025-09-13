import { useEffect, useState } from "react"
import { AlunoForm, AlunoFormData } from "./AlunoForm"
import { useParams } from "react-router-dom"

export default function EditarAluno() {
  const { id } = useParams()
  const [aluno, setAluno] = useState<AlunoFormData | null>(null)

  useEffect(() => {
    // mock GET /alunos/:id
    setTimeout(() => {
      setAluno({
        nome: "João Silva",
        email: "joao@email.com",
        nif: "123456789",
        telefone: "912345678",
        data_inicio: "2025-01-15",
        status: "Ativo",
        id_instrutor: "Carlos Santos",
        id_veiculo: "Renault Clio",
      })
    }, 500)
  }, [id])

  function handleSubmit(data: AlunoFormData) {
    console.log("Editando aluno ID:", id, data)
    // chamada API -> PUT /alunos/:id
  }

  if (!aluno) return <p>Carregando...</p>

  return (
    <div className="max-w-6xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Editar Aluno</h1>
      <AlunoForm defaultValues={aluno} onSubmit={handleSubmit} />
    </div>
  )
}
