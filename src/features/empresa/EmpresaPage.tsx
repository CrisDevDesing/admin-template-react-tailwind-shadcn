import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmpresaForm } from "./EmpresaForm";

export default function EmpresaPage() {
  const defaultValues = {
    empresa: "Auto Escola Exemplo",
    nome_comercial: "AE Exemplo",
    contribuinte: "123456789",
    representante: "João Silva",
    telefone: "912345678",
    email: "info@autoescola.pt",
    website: "https://autoescola.pt",
    morada: "Rua Principal, 123",
    cidade: "Lisboa",
    regiao: "Lisboa",
    iva: "23%",
    cae: "85530",
    slogan: "Formando condutores responsáveis",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Definições da Empresa</CardTitle>
      </CardHeader>
      <CardContent>
        <EmpresaForm defaultValues={defaultValues} />
      </CardContent>
    </Card>
  );
}
