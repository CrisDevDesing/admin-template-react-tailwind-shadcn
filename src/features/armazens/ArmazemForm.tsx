import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const schema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  localizacao: z.string().optional(),
  descricao: z.string().optional(),
  ativo: z.boolean(),
});

export type ArmazemFormValues = z.infer<typeof schema>;

export function ArmazemForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: ArmazemFormValues;
  onSubmit: (data: ArmazemFormValues) => void;
}) {
  const form = useForm<ArmazemFormValues>({
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
                <Input placeholder="ex: Armazém Central" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Localização */}
        <FormField
          control={form.control}
          name="localizacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Localização</FormLabel>
              <FormControl>
                <Input placeholder="ex: Rua Principal, 123" {...field} />
              </FormControl>
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
                <Textarea placeholder="Descrição do armazém..." {...field} />
              </FormControl>
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
