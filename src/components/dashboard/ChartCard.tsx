import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ChartCard() {
  return (
    <Card className="shadow-sm shadow-sm dark:bg-gray-800">
      <CardHeader>
        <CardTitle>Progresso de Aulas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-40 flex items-center justify-center text-gray-400">
          [Gráfico aqui]
        </div>
      </CardContent>
    </Card>
  );
}
