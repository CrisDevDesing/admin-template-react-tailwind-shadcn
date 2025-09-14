import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Users,
  CreditCard,
  Tags,
  Percent,
  Package,
  Warehouse,
} from "lucide-react";

const settingsItems = [
  {
    title: "Empresa",
    description: "Definições da empresa e informações gerais",
    icon: <Building2 className="h-6 w-6 text-blue-600" />,
    path: "/settings/empresa",
  },
  {
    title: "Utilizadores",
    description: "Gestão de contas de utilizadores",
    icon: <Users className="h-6 w-6 text-green-600" />,
    path: "/settings/utilizadores",
  },
  {
    title: "Tipos de Pagamento",
    description: "Configurar métodos de pagamento aceites",
    icon: <CreditCard className="h-6 w-6 text-purple-600" />,
    path: "/settings/tipos-pagamento",
  },
  {
    title: "Categorias",
    description: "Organizar produtos e serviços em categorias",
    icon: <Tags className="h-6 w-6 text-orange-600" />,
    path: "/settings/categorias",
  },
  {
    title: "Impostos",
    description: "Gerir taxas de IVA/Impostos",
    icon: <Percent className="h-6 w-6 text-red-600" />,
    path: "/settings/impostos",
  },
  {
    title: "Produtos",
    description: "Produtos e serviços disponíveis",
    icon: <Package className="h-6 w-6 text-indigo-600" />,
    path: "/settings/produtos",
  },
  {
    title: "Armazéns",
    description: "Gestão de armazéns e locais de stock",
    icon: <Warehouse className="h-6 w-6 text-teal-600" />,
    path: "/settings/armazens",
  },
];

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {settingsItems.map((item) => (
        <Card
          key={item.title}
          className="p-6 flex flex-col justify-between shadow-sm hover:shadow-md cursor-pointer transition"
          onClick={() => navigate(item.path)}
        >
          <div className="flex items-center gap-3 mb-4">
            {item.icon}
            <h2 className="text-lg font-semibold">{item.title}</h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex-1">
            {item.description}
          </p>
          <div className="mt-4">
            <Button variant="outline" size="sm">
              Gerir {item.title}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
