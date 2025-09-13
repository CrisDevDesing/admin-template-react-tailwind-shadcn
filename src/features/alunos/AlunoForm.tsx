import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"

const alunoSchema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  nif: z.string(),
  data_nascimento: z.string().optional(),
  telefone: z.string().optional(),
  telefone_alter: z.string().optional(),
  morada: z.string().optional(),
  pai: z.string().optional(),
  mae: z.string().optional(),
  profissao: z.string().optional(),
  carta: z.string().optional(),
  id_instrutor: z.string().optional(),
  id_veiculo: z.string().optional(),
  data_inicio: z.string().optional(),
  data_fim: z.string().optional(),
  hora_inicio: z.string().optional(),
  hora_fim: z.string().optional(),
  num_aula: z.string().optional(),
  status: z.string().optional(),
})

export type AlunoFormData = z.infer<typeof alunoSchema>

interface AlunoFormProps {
  defaultValues?: Partial<AlunoFormData>
  onSubmit: (data: AlunoFormData) => void
}

export function AlunoForm({ defaultValues, onSubmit }: AlunoFormProps) {
  const form = useForm<AlunoFormData>({
    resolver: zodResolver(alunoSchema),
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
    
              {/* FOTO + STATUS FIXOS NO TOPO */}
              <div className="flex items-start gap-6 border rounded-lg  bg-white dark:bg-gray-800  shadow-sm p-6">
                {/* FOTO */}
                <div className="space-y-3">
                  <FormLabel>Foto do Aluno</FormLabel>
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm text-gray-500">Preview</span>
                  </div>
                  <Input type="file" />
                </div>
    
                {/* STATUS */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-48 text-white ml-auto">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1" >Ativo</SelectItem>
                            <SelectItem value="0">Inativo</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
    
              {/* ACCORDION SECTIONS */}
              <Accordion type="multiple" className="space-y-4">
                {/* INFORMAÇÕES PESSOAIS */}
                <AccordionItem value="pessoal" className="border rounded-lg bg-white dark:bg-gray-800 dark:text-white shadow-sm">
                  <AccordionTrigger className="px-6 py-4 text-lg font-semibold">Informações Pessoais</AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField control={form.control} name="nome" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Digite o nome completo" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="data_nascimento" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Nascimento</FormLabel>
                          <FormControl><Input type="date" {...field} placeholder="Selecione a data"/></FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="nif" render={({ field }) => (
                        <FormItem>
                          <FormLabel>NIF</FormLabel>
                          <FormControl><Input {...field} placeholder="Digite o NIF"  /></FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="morada" render={({ field }) => (
                        <FormItem className="md:col-span-3">
                          <FormLabel>Morada</FormLabel>
                          <FormControl><Textarea {...field} placeholder="Digite a morada completa" /></FormControl>
                        </FormItem>
                      )} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
    
                {/* CONTATO */}
                <AccordionItem value="contato" className="border rounded-lg bg-white dark:bg-gray-800 dark:text-white shadow-sm">
                  <AccordionTrigger className="px-6 py-4 text-lg font-semibold">Contato</AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="telefone" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl><Input {...field} placeholder="Digite o telefone principal"/></FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="telefone_alter" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone Alternativo</FormLabel>
                          <FormControl><Input {...field} placeholder="Digite o telefone alternativo" /></FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Email</FormLabel>
                          <FormControl><Input type="email" {...field} placeholder="Digite o email" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
    
                {/* FAMÍLIA */}
                <AccordionItem value="familia" className="border rounded-lg bg-white dark:bg-gray-800 dark:text-white shadow-sm">
                  <AccordionTrigger className="px-6 py-4 text-lg font-semibold">Família</AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="pai" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pai</FormLabel>
                          <FormControl><Input {...field} placeholder="Nome do pai"  /></FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="mae" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mãe</FormLabel>
                          <FormControl><Input {...field} placeholder="Nome da mãe" /></FormControl>
                        </FormItem>
                      )} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
    
                {/* PROFISSÃO */}
                <AccordionItem value="profissao" className="border rounded-lg bg-white dark:bg-gray-800 dark:text-white shadow-sm">
                  <AccordionTrigger className="px-6 py-4 text-lg font-semibold">Profissão</AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="profissao" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profissão</FormLabel>
                          <FormControl><Input {...field} placeholder="Digite a profissão" /></FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="carta" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Carta</FormLabel>
                          <FormControl><Input {...field} placeholder="Categoria da carta (ex: B)" /></FormControl>
                        </FormItem>
                      )} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
    
                {/* CURSO */}
                <AccordionItem value="curso" className="border rounded-lg bg-white dark:bg-gray-800 dark:text-white shadow-sm">
                  <AccordionTrigger className="px-6 py-4 text-lg font-semibold">Curso</AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField control={form.control} name="id_instrutor" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instrutor</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">Instrutor A</SelectItem>
                                <SelectItem value="2">Instrutor B</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="id_veiculo" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Veículo</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">Carro 1</SelectItem>
                                <SelectItem value="2">Carro 2</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="num_aula" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de Aulas</FormLabel>
                          <FormControl><Input type="number" {...field} placeholder="Ex: 20" /></FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="data_inicio" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data Início</FormLabel>
                          <FormControl><Input type="date" {...field} placeholder="Selecione a data de início" /></FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="data_fim" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data Fim</FormLabel>
                          <FormControl><Input type="date" {...field} placeholder="Selecione a data de fim" /></FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="hora_inicio" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hora Início</FormLabel>
                          <FormControl><Input type="time" {...field} placeholder="Selecione o horário de início" /></FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="hora_fim" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hora Fim</FormLabel>
                          <FormControl><Input type="time" {...field} placeholder="Selecione o horário de fim" /></FormControl>
                        </FormItem>
                      )} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
    
              {/* BOTÃO FINAL */}
              <div className="flex justify-end">
                <Button type="submit" size="lg">Salvar Aluno</Button>
              </div>
            </form>
          </Form>
  )
}
