import { InstrutorForm, InstrutorFormData } from "./InstrutorForm"

export default function NovoInstrutor() {
  function handleSubmit(data: InstrutorFormData) {
    console.log("Cadastrando instrutor...", data)
    // chamada API -> POST /instrutores
  }

  return (
    <div className="max-w-6xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Novo Instrutor</h1>
      <InstrutorForm onSubmit={handleSubmit} />
    </div>
  )
}
