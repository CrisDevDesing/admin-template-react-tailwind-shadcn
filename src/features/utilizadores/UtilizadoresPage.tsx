import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UtilizadorForm } from "./UtilizadorForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";

const mockUsers = [
  { id: 1, username: "admin", email: "admin@site.com", role: "admin", telefone: "912345678" },
  { id: 2, username: "joao", email: "joao@site.com", role: "instrutor", telefone: "934567890" },
];

export default function UtilizadoresPage() {
  const [users, setUsers] = useState(mockUsers);
  const [editing, setEditing] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const handleSave = (data: any) => {
    if (editing) {
      setUsers(users.map(u => (u.id === editing.id ? { ...u, ...data } : u)));
    } else {
      setUsers([...users, { id: Date.now(), ...data }]);
    }
    setOpen(false);
    setEditing(null);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Utilizadores</CardTitle>
        <Button onClick={() => { setEditing(null); setOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Novo Utilizador
        </Button>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Nome</th>
              <th className="p-2">Email</th>
              <th className="p-2">Função</th>
              <th className="p-2">Telefone</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2 capitalize">{user.role}</td>
                <td className="p-2">{user.telefone}</td>
                <td className="p-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => { setEditing(user); setOpen(true); }}
                  >
                    <Pencil size={16} className="mr-1" /> Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Editar Utilizador" : "Novo Utilizador"}</DialogTitle>
          </DialogHeader>
          <UtilizadorForm defaultValues={editing || undefined} onSubmit={handleSave} />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
