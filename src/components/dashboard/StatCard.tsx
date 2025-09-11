import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className="shadow-sm dark:bg-gray-800">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-2xl font-bold">{value}</h2>
        </div>
        {icon && <div className="text-blue-600">{icon}</div>}
      </CardContent>
    </Card> 
  );
}
