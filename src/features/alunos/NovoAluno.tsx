import { AlunoForm, AlunoFormData } from "./AlunoForm"

export default function NovoAluno() {
  function handleSubmit(data: AlunoFormData) {
    console.log("Cadastrando aluno...", data)
    // chamada API -> POST /alunos
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Novo Aluno</h1>
      <AlunoForm onSubmit={handleSubmit} />
    </div>
  )
}
