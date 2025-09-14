import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CategoriaForm, CategoriaFormValues } from "./CategoriaForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  // 🔹 Carregar categorias
  useEffect(() => {
    fetch("/api/categorias")
      .then((res) => res.json())
      .then(setCategorias)
      .catch(console.error);
  }, []);

  // 🔹 Guardar (criar/editar)
  const handleSave = async (data: CategoriaFormValues) => {
    if (editing) {
      await fetch(`/api/categorias/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/categorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    // Recarregar lista
    fetch("/api/categorias")
      .then((res) => res.json())
      .then(setCategorias);

    setOpen(false);
    setEditing(null);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Categorias</CardTitle>
        <Button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Nova Categoria
        </Button>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Nome</th>
              <th className="p-2">Descrição</th>
              <th className="p-2">Ativo</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="p-2">{c.nome}</td>
                <td className="p-2">{c.descricao}</td>
                <td className="p-2">{c.ativo ? "Sim" : "Não"}</td>
                <td className="p-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditing(c);
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
            <DialogTitle>{editing ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>
          </DialogHeader>
          <CategoriaForm
            defaultValues={editing || { ativo: true }}
            onSubmit={handleSave}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
