import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const instrutorSchema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(9, "Telefone inválido"),
  categoria: z.string().optional(),   // ex: A, B, C...
  status: z.string().optional(),
})

export type InstrutorFormData = z.infer<typeof instrutorSchema>

interface InstrutorFormProps {
  defaultValues?: Partial<InstrutorFormData>
  onSubmit: (data: InstrutorFormData) => void
}

export function InstrutorForm({ defaultValues, onSubmit }: InstrutorFormProps) {
  const form = useForm<InstrutorFormData>({
    resolver: zodResolver(instrutorSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      status: "Ativo",
      ...defaultValues,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* Identificação */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg bg-white shadow-sm">
          <FormField control={form.control} name="nome" render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input type="email" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField control={form.control} name="telefone" render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}/>
        </section>

        {/* Categoria e Status */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg bg-white shadow-sm">
          <FormField control={form.control} name="categoria" render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}/>
          <FormField control={form.control} name="status" render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}/>
        </section>

        {/* Botão */}
        <div className="flex justify-end">
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  )
}
