import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const activities = [
  { id: 1, text: "Novo aluno registado: João Silva", date: "10/09/2025" },
  { id: 2, text: "Pagamento recebido de Maria", date: "09/09/2025" },
  { id: 3, text: "Aula marcada com Instrutor Carlos", date: "08/09/2025" },
];

export function RecentActivity() {
  return (
    <Card className="shadow-sm shadow-sm dark:bg-gray-800">
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {activities.map((item) => (
            <li key={item.id} className="flex justify-between text-sm">
              <span>{item.text}</span>
              <span className="text-gray-400">{item.date}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
