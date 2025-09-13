import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useEffect, useState } from "react"
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"

// ---------------- Schema ----------------
const itemSchema = z.object({
  produto: z.string().min(1, "Obrigatório"),
  quantidade: z.coerce.number().min(1, "Min 1"),
  preco_unitario: z.coerce.number().min(0, "Obrigatório"),
  imposto: z.coerce.number().min(0).default(0),
})

const schema = z.object({
  aluno: z.string().min(1, "Aluno obrigatório"),
  data_pagamento: z.string().min(1, "Data obrigatória"),
  forma_pagamento: z.string().min(1, "Selecione a forma de pagamento"),
  status: z.enum(["Pago", "Pendente", "Cancelado"]),
  observacoes: z.string().optional(),
  itens: z.array(itemSchema).min(1, "Adicione pelo menos um item"),
})

export type PagamentoFormData = z.infer<typeof schema>

interface PagamentoFormProps {
  defaultValues?: Partial<PagamentoFormData>
  onSubmit: (data: PagamentoFormData) => void
}

// ---------------- Component ----------------
export default function PagamentoForm({ defaultValues, onSubmit }: PagamentoFormProps) {
  const [produtos, setProdutos] = useState<any[]>([])

  const form = useForm<PagamentoFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      aluno: "",
      data_pagamento: "",
      forma_pagamento: "",
      status: "Pendente",
      observacoes: "",
      itens: [{ produto: "", quantidade: 1, preco_unitario: 0, imposto: 0 }],
      ...defaultValues,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "itens",
  })

  // Carregar produtos da API
  useEffect(() => {
    fetch("/api/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch(() => setProdutos([]))
  }, [])

  const itens = form.watch("itens")
  const total = itens.reduce((acc, item) => {
    const subtotal = item.quantidade * item.preco_unitario
    const impostoValor = (subtotal * (item.imposto || 0)) / 100
    return acc + subtotal + impostoValor
  }, 0)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Dados gerais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="aluno"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aluno</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do aluno" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="data_pagamento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="forma_pagamento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Forma de Pagamento</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="Multibanco">Multibanco</SelectItem>
                      <SelectItem value="Cartão">Cartão</SelectItem>
                      <SelectItem value="Transferência">Transferência</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pago">Pago</SelectItem>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="observacoes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Input placeholder="Notas adicionais..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Itens da fatura */}
        <div>
          <h3 className="text-md font-bold mb-2">Itens</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto/Serviço</TableHead>
                <TableHead>Qtd</TableHead>
                <TableHead>Preço Unitário</TableHead>
                <TableHead>Imposto (%)</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => {
                const item = itens[index]
                const subtotal = item.quantidade * item.preco_unitario
                const impostoValor = (subtotal * (item.imposto || 0)) / 100
                return (
                  <TableRow key={field.id}>
                    <TableCell>
                      <Select
                        value={item.produto}
                        onValueChange={(value) => {
                          form.setValue(`itens.${index}.produto`, value)
                          const prod = produtos.find((p) => p.id.toString() === value)
                          if (prod) {
                            form.setValue(`itens.${index}.preco_unitario`, prod.price_v)
                            form.setValue(`itens.${index}.imposto`, prod.tax || 0)
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {produtos.map((p) => (
                            <SelectItem key={p.id} value={p.id.toString()}>
                              {p.name_produt} — {Number(p.price_v).toFixed(2)} €
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        {...form.register(`itens.${index}.quantidade` as const, { valueAsNumber: true })}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.01"
                        {...form.register(`itens.${index}.preco_unitario` as const, { valueAsNumber: true })}
                        className="w-28"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.01"
                        {...form.register(`itens.${index}.imposto` as const, { valueAsNumber: true })}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>
                      {(subtotal + impostoValor).toFixed(2)} €
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <Button
            type="button"
            variant="outline"
            className="mt-2 flex items-center gap-2"
            onClick={() => append({ produto: "", quantidade: 1, preco_unitario: 0, imposto: 0 })}
          >
            <Plus size={14} /> Adicionar Item
          </Button>
        </div>

        {/* Total */}
        <div className="flex justify-end text-lg font-bold">
          Total: {total.toFixed(2)} €
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-600 text-white">
            Salvar Pagamento
          </Button>
        </div>
      </form>
    </Form>
  )
}
