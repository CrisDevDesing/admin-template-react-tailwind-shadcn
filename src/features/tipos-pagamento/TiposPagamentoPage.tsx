import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TipoPagamentoForm, TipoPagamentoFormValues } from "./TipoPagamentoForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";

export default function TiposPagamentoPage() {
  const [tipos, setTipos] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  // 🔹 Carregar da API
  useEffect(() => {
    fetch("/api/tipos-pagamento")
      .then((res) => res.json())
      .then(setTipos)
      .catch(console.error);
  }, []);

  // 🔹 Guardar (criar/editar)
  const handleSave = async (data: TipoPagamentoFormValues) => {
    if (editing) {
      await fetch(`/api/tipos-pagamento/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/tipos-pagamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    // Refresh da lista
    fetch("/api/tipos-pagamento")
      .then((res) => res.json())
      .then(setTipos);

    setOpen(false);
    setEditing(null);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Tipos de Pagamento</CardTitle>
        <Button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Novo Tipo
        </Button>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Título</th>
              <th className="p-2">Tipo</th>
              <th className="p-2">Troco</th>
              <th className="p-2">Ativo</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {tipos.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="p-2">{t.titulo}</td>
                <td className="p-2">{t.tipo}</td>
                <td className="p-2">{t.troco ? "Sim" : "Não"}</td>
                <td className="p-2">{t.ativo ? "Sim" : "Não"}</td>
                <td className="p-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditing(t);
                      setOpen(true);
                    }}
                  >
                    <Pencil size={16} className="mr-1" /> Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>

      {/* Modal de formulário */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar Tipo de Pagamento" : "Novo Tipo de Pagamento"}
            </DialogTitle>
          </DialogHeader>
          <TipoPagamentoForm
            defaultValues={editing || { troco: false, ativo: true }}
            onSubmit={handleSave}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
