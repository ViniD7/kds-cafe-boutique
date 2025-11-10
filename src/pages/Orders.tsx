import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Interface para os pedidos
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: "Pendente" | "Processando" | "Enviado" | "Entregue" | "Cancelado";
  items: OrderItem[];
}

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Simular carregamento de pedidos
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Aqui seria a chamada para obter os pedidos do usuário
        // const response = await fetch(`/api/orders/${user.id}`);
        // const data = await response.json();
        
        // Simulando dados de pedidos
        const mockOrders: Order[] = [
          {
            id: "ORD-001",
            date: "2023-06-15",
            total: 125.90,
            status: "Entregue",
            items: [
              { id: "1", name: "KDS Café Especial Lata", quantity: 1, price: 42.90 },
              { id: "2", name: "Cookie Cup Cookie", quantity: 2, price: 15.60 }
            ]
          },
          {
            id: "ORD-002",
            date: "2023-06-20",
            total: 75.50,
            status: "Processando",
            items: [
              { id: "3", name: "Kit Degustação KDS", quantity: 1, price: 75.50 }
            ]
          },
          {
            id: "ORD-003",
            date: "2023-06-25",
            total: 55.50,
            status: "Enviado",
            items: [
              { id: "4", name: "Kit Café + Cookie Cup", quantity: 1, price: 55.50 }
            ]
          }
        ];
        
        setOrders(mockOrders);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <p>Você precisa estar logado para acessar esta página.</p>
            <Button className="mt-4" onClick={() => window.location.href = "/login"}>
              Ir para Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando pedidos...</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente":
        return "bg-yellow-100 text-yellow-800";
      case "Processando":
        return "bg-blue-100 text-blue-800";
      case "Enviado":
        return "bg-indigo-100 text-indigo-800";
      case "Entregue":
        return "bg-green-100 text-green-800";
      case "Cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Meus Pedidos</CardTitle>
            <CardDescription>Veja o histórico dos seus pedidos</CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Você ainda não fez nenhum pedido.</p>
                <Button className="mt-4" onClick={() => window.location.href = "/"}>
                  Começar a comprar
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">Pedido #{order.id}</h3>
                        <p className="text-gray-500">Data: {new Date(order.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Itens do pedido:</h4>
                      <ul className="space-y-2">
                        {order.items.map((item) => (
                          <li key={item.id} className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-lg">R$ {order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Orders;