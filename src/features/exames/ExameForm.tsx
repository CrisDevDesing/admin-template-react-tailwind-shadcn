import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Schema de validação com Zod
const exameSchema = z.object({
  aluno: z.string().min(1, "Aluno obrigatório"),
  instrutor: z.string().min(1, "Instrutor obrigatório"),
  veiculo: z.string().min(1, "Veículo obrigatório"),
  data: z.string().min(1, "Data obrigatória"),
  horaInicio: z.string().min(1, "Hora inicial obrigatória"),
  horaFim: z.string().min(1, "Hora final obrigatória"),
  lessonName: z.string().optional(),
  tipo: z.string().min(1, "Tipo obrigatório"),
  local: z.string().min(1, "Local obrigatório"),
  examinador: z.string().min(1, "Examinador obrigatório"),
  pontuacao: z.string().optional(),
  resultado: z.string().optional(),
  status: z.string().min(1, "Estado obrigatório"),
})

export type ExameFormData = z.infer<typeof exameSchema>

interface ExameFormProps {
  defaultValues?: Partial<ExameFormData>
  onSubmit: (data: ExameFormData) => void
}

// ⚠️ Mock (depois substituir por fetch ao backend)
const alunos = ["João Silva", "Maria Oliveira"]
const instrutores = ["Carlos Santos", "Ana Ferreira"]
const veiculos = ["Toyota Yaris - 12-AB-34", "Renault Clio - 56-CD-78"]

export function ExameForm({ defaultValues, onSubmit }: ExameFormProps) {
  const form = useForm<ExameFormData>({
    resolver: zodResolver(exameSchema),
    defaultValues: {
      aluno: "",
      instrutor: "",
      veiculo: "",
      data: "",
      horaInicio: "",
      horaFim: "",
      tipo: "",
      local: "",
      examinador: "",
      status: "Agendado",
      ...defaultValues,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* Participantes */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border rounded-lg bg-white shadow-sm">
          <FormField control={form.control} name="aluno" render={({ field }) => (
            <FormItem>
              <FormLabel>Aluno</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger><SelectValue placeholder="Selecione o aluno" /></SelectTrigger>
                  <SelectContent>
                    {alunos.map((a) => (
                      <SelectItem key={a} value={a}>{a}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField control={form.control} name="instrutor" render={({ field }) => (
            <FormItem>
              <FormLabel>Instrutor</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger><SelectValue placeholder="Selecione o instrutor" /></SelectTrigger>
                  <SelectContent>
                    {instrutores.map((i) => (
                      <SelectItem key={i} value={i}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField control={form.control} name="veiculo" render={({ field }) => (
            <FormItem>
              <FormLabel>Veículo</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger><SelectValue placeholder="Selecione o veículo" /></SelectTrigger>
                  <SelectContent>
                    {veiculos.map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
        </section>

        {/* Data e horários */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border rounded-lg bg-white shadow-sm">
          <FormField control={form.control} name="data" render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <FormControl><Input type="date" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField control={form.control} name="horaInicio" render={({ field }) => (
            <FormItem>
              <FormLabel>Hora Início</FormLabel>
              <FormControl><Input type="time" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField control={form.control} name="horaFim" render={({ field }) => (
            <FormItem>
              <FormLabel>Hora Fim</FormLabel>
              <FormControl><Input type="time" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}/>
        </section>

        {/* Detalhes do exame */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border rounded-lg bg-white shadow-sm">
          <FormField control={form.control} name="lessonName" render={({ field }) => (
            <FormItem>
              <FormLabel>Lição / Tema</FormLabel>
              <FormControl><Input {...field} /></FormControl>
            </FormItem>
          )}/>
          <FormField control={form.control} name="tipo" render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Teórico">Teórico</SelectItem>
                    <SelectItem value="Prático">Prático</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField control={form.control} name="local" render={({ field }) => (
            <FormItem>
              <FormLabel>Local</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}/>
        </section>

        {/* Examinador e resultado */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border rounded-lg bg-white shadow-sm">
          <FormField control={form.control} name="examinador" render={({ field }) => (
            <FormItem>
              <FormLabel>Examinador</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField control={form.control} name="pontuacao" render={({ field }) => (
            <FormItem>
              <FormLabel>Pontuação</FormLabel>
              <FormControl><Input placeholder="Ex: 85/100" {...field} /></FormControl>
            </FormItem>
          )}/>
          <FormField control={form.control} name="resultado" render={({ field }) => (
            <FormItem>
              <FormLabel>Resultado</FormLabel>
              <FormControl><Input placeholder="Aprovado / Reprovado" {...field} /></FormControl>
            </FormItem>
          )}/>
        </section>

        {/* Status */}
        <section className="p-4 border rounded-lg bg-white shadow-sm">
          <FormField control={form.control} name="status" render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Agendado">Agendado</SelectItem>
                    <SelectItem value="Concluído">Concluído</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
        </section>

        {/* Botão */}
        <div className="flex justify-end">
          <Button type="submit">Salvar Exame</Button>
        </div>
      </form>
    </Form>
  )
}
