import "./Orders.css";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

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
  status: "Pendente" | "Processando" | "Enviado" | "Entregue" | "Cancelado" | "Pago";
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
      <div className="orders-login-container">
        <div className="orders-login-card">
          <p style={{ color: 'var(--text-body)', marginBottom: '20px' }}>Você precisa estar logado para acessar esta página.</p>
          <button 
            onClick={() => window.location.href = "/login"}
            className="btn-shop"
          >
            Ir para Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="orders-loading-container">
        <p className="orders-loading-text">Carregando pedidos...</p>
      </div>
    );
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pendente":
        return { backgroundColor: '#fef3c7', color: '#92400e' };
      case "Processando":
        return { backgroundColor: '#dbeafe', color: '#1e40af' };
      case "Enviado":
        return { backgroundColor: '#e0e7ff', color: '#3730a3' };
      case "Entregue":
        return { backgroundColor: '#d1fae5', color: '#065f46' };
      case "Cancelado":
        return { backgroundColor: '#fee2e2', color: '#b91c1c' };
      case "Pago":
        return { backgroundColor: '#d1fae5', color: '#065f46' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#1f2937' };
    }
  };

  return (
    <div className="orders-container">
      <div className="orders-card">
        <div className="orders-header">
          <h1 className="orders-title">Meus Pedidos</h1>
          <p className="orders-description">Veja o histórico dos seus pedidos</p>
        </div>
        
        {orders.length === 0 ? (
          <div className="orders-empty">
            <p className="orders-empty-text">Você ainda não fez nenhum pedido.</p>
            <button 
              onClick={() => window.location.href = "/"}
              className="btn-shop"
            >
              Começar a comprar
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const statusStyle = getStatusStyle(order.status);
              return (
                <div key={order.id} className="order-item-card">
                  <div className="order-item-header">
                    <div>
                      <h3 className="order-id">Pedido #{order.id}</h3>
                      <p className="order-date">Data: {new Date(order.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <span className="order-status-badge" style={statusStyle}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="order-items-section">
                    <h4 className="order-items-title">Itens do pedido:</h4>
                    <ul className="order-items-list">
                      {order.items.map((item) => (
                        <li key={item.id} className="order-item-row">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="order-item-price">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="order-item-footer">
                    <span className="order-total-label">Total:</span>
                    <span className="order-total-value">R$ {order.total.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;