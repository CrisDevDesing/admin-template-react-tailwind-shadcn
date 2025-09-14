import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImpostoForm, ImpostoFormValues } from "./ImpostoForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";

export default function ImpostosPage() {
  const [impostos, setImpostos] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  // 🔹 Carregar impostos
  useEffect(() => {
    fetch("/api/impostos")
      .then((res) => res.json())
      .then(setImpostos)
      .catch(console.error);
  }, []);

  // 🔹 Guardar (criar/editar)
  const handleSave = async (data: ImpostoFormValues) => {
    if (editing) {
      await fetch(`/api/impostos/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/impostos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    // Recarregar lista
    fetch("/api/impostos")
      .then((res) => res.json())
      .then(setImpostos);

    setOpen(false);
    setEditing(null);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Impostos</CardTitle>
        <Button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Novo Imposto
        </Button>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Nome</th>
              <th className="p-2">Código</th>
              <th className="p-2">Percentagem</th>
              <th className="p-2">Ativo</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {impostos.map((i) => (
              <tr key={i.id} className="border-b">
                <td className="p-2">{i.nome}</td>
                <td className="p-2">{i.codigo}</td>
                <td className="p-2">{i.percentagem}%</td>
                <td className="p-2">{i.ativo ? "Sim" : "Não"}</td>
                <td className="p-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditing(i);
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

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Editar Imposto" : "Novo Imposto"}</DialogTitle>
          </DialogHeader>
          <ImpostoForm
            defaultValues={editing || { ativo: true }}
            onSubmit={handleSave}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
