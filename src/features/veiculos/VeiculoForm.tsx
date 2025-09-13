import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const veiculoSchema = z.object({
  marca: z.string().min(2, "Marca obrigatória"),
  modelo: z.string().min(1, "Modelo obrigatório"),
  matricula: z.string().min(2, "Matrícula obrigatória"),
  ano_fabricacao: z.string().optional(),
  ano_modelo: z.string().optional(),
  cor: z.string().optional(),
  combustivel: z.string().optional(),
  transmissao: z.string().optional(),
  cilindrada: z.string().optional(),
  potencia: z.string().optional(),
  tipo: z.string().optional(),
  capacidade_pessoas: z.string().optional(),
  capacidade_bagageira: z.string().optional(),
  capacidade_combustivel: z.string().optional(),
  capacidade_peso: z.string().optional(),
  descricao: z.string().optional(),
  status: z.string().optional(),
})

export type VeiculoFormData = z.infer<typeof veiculoSchema>

interface VeiculoFormProps {
  defaultValues?: Partial<VeiculoFormData>
  onSubmit: (data: VeiculoFormData) => void
}

export function VeiculoForm({ defaultValues, onSubmit }: VeiculoFormProps) {
  const form = useForm<VeiculoFormData>({
    resolver: zodResolver(veiculoSchema),
    defaultValues: {
      marca: "",
      modelo: "",
      matricula: "",
      ...defaultValues, // sobrescreve se vier do backend
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* Seções iguais às que já montamos */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg bg-white shadow-sm">
          <FormField control={form.control} name="marca" render={({ field }) => (
            <FormItem>
              <FormLabel>Marca</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField control={form.control} name="modelo" render={({ field }) => (
            <FormItem>
              <FormLabel>Modelo</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <FormField control={form.control} name="matricula" render={({ field }) => (
            <FormItem>
              <FormLabel>Matrícula</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          {/* ... resto dos campos iguais ao exemplo anterior ... */}
        </section>

        <div className="flex justify-end">
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  )
}
