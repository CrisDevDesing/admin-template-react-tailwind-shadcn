import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const schema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  descricao: z.string().optional(),
  preco: z.string().regex(/^\d+(\.\d{1,2})?$/, "Preço inválido"),
  id_categoria: z.string().min(1, "Categoria obrigatória"),
  id_imposto: z.string().min(1, "Imposto obrigatório"),
  ativo: z.boolean(),
});

export type ProdutoFormValues = z.infer<typeof schema>;

export function ProdutoForm({
  categorias,
  impostos,
  defaultValues,
  onSubmit,
}: {
  categorias: any[];
  impostos: any[];
  defaultValues?: ProdutoFormValues;
  onSubmit: (data: ProdutoFormValues) => void;
}) {
  const form = useForm<ProdutoFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Nome */}
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="ex: Aula de Condução" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descrição */}
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição do produto/serviço" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Preço */}
        <FormField
          control={form.control}
          name="preco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço (€)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="ex: 50.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Categoria */}
        <FormField
          control={form.control}
          name="id_categoria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categorias.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Imposto */}
        <FormField
          control={form.control}
          name="id_imposto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imposto</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar imposto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {impostos.map((i) => (
                    <SelectItem key={i.id} value={String(i.id)}>
                      {i.nome} ({i.percentagem}%)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ativo */}
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="ativo"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between w-full">
                <FormLabel>Ativo</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
}
