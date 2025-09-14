import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const schema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  codigo: z.string().min(2, "Código obrigatório"),
  percentagem: z.string().regex(/^\d+(\.\d{1,2})?$/, "Percentagem inválida"),
  ativo: z.boolean(),
});

export type ImpostoFormValues = z.infer<typeof schema>;

export function ImpostoForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: ImpostoFormValues;
  onSubmit: (data: ImpostoFormValues) => void;
}) {
  const form = useForm<ImpostoFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="ex: IVA Normal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="codigo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input placeholder="ex: IVA23" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="percentagem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Percentagem (%)</FormLabel>
              <FormControl>
                <Input placeholder="ex: 23.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="ativo"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between w-full">
                <FormLabel>Ativo</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
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
