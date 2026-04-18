import React, { useState } from 'react';
import { useSelfServiceCart } from '../context/SelfServiceCartContext';
import { PaymentMethod, SelfServiceOrder } from '../types';
import { SELFSERVICE_CONFIG } from '../config';
import { toast } from '@/hooks/use-toast';
import Colors from '@/Constants/Colors/Colors';
import './Checkout.css';

interface CheckoutProps {
  onSuccess: (order: SelfServiceOrder) => void;
  onCancel: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onSuccess, onCancel }) => {
  const { items, total, clearCart } = useSelfServiceCart();
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);

  const handleSendOrder = async () => {
    if (!customerName.trim() || !paymentMethod) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o nome e selecione a forma de pagamento.",
        variant: "destructive"
      });
      return;
    }

    const order: SelfServiceOrder = {
      items,
      customerName: customerName.trim(),
      paymentMethod,
      total,
      timestamp: new Date().toISOString()
    };

    // Montar mensagem formatada
    let message = 'Pedido:\n\n';
    items.forEach(item => {
      message += `• ${item.quantity}x ${item.name} - R$${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });
    message += `\nCliente: ${order.customerName}`;
    
    const paymentLabels = {
      credito: 'Crédito',
      debito: 'Débito',
      pix: 'Pix'
    };
    
    message += `\nPagamento: ${paymentLabels[paymentMethod]}`;
    message += `\nTotal: R$${total.toFixed(2).replace('.', ',')}`;

    // Codificar para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Obter IP do servidor
    const serverIP = SELFSERVICE_CONFIG.serverIP === 'auto'
      ? (window.location.hostname === 'localhost' ? 'localhost' : window.location.hostname)
      : SELFSERVICE_CONFIG.serverIP;
    
    const port = SELFSERVICE_CONFIG.serverPort;
    
    // Enviar pedido de forma silenciosa via fetch
    try {
      const orderURL = `http://${serverIP}:${port}/pedido?data=${encodedMessage}`;
      
      await fetch(orderURL, {
        method: 'GET',
        mode: 'no-cors' // Permite envio sem esperar resposta
      });

      // Limpar carrinho e notificar sucesso
      clearCart();
      onSuccess(order);
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar o pedido. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const paymentMethods: { value: PaymentMethod; label: string; icon: string }[] = [
    { value: 'credito', label: 'Crédito', icon: '💳' },
    { value: 'debito', label: 'Débito', icon: '💳' },
    { value: 'pix', label: 'Pix', icon: '⚡' }
  ];

  return (
    <div className="selfservice-checkout">
      <h2 className="selfservice-checkout-title" style={{ color: Colors.title }}>
        Finalizar Pedido
      </h2>

      <div className="selfservice-checkout-form">
        <div className="selfservice-form-group">
          <label style={{ color: Colors.title }}>Nome do Cliente</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Digite seu nome"
            className="selfservice-input"
            style={{ 
              borderColor: Colors.primary
            }}
          />
        </div>

        <div className="selfservice-form-group">
          <label style={{ color: Colors.title }}>Forma de Pagamento</label>
          <div className="selfservice-payment-options">
            {paymentMethods.map(method => (
              <button
                key={method.value}
                className={`selfservice-payment-option ${
                  paymentMethod === method.value ? 'selected' : ''
                }`}
                style={{
                  borderColor: paymentMethod === method.value ? Colors.primary : '#ddd',
                  background: paymentMethod === method.value ? Colors.primary : 'white',
                  color: paymentMethod === method.value ? 'white' : Colors.title
                }}
                onClick={() => setPaymentMethod(method.value)}
              >
                <span className="selfservice-payment-icon">{method.icon}</span>
                <span>{method.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div 
          className="selfservice-order-summary"
          style={{ 
            background: Colors.background,
            borderColor: Colors.primary
          }}
        >
          <h3 style={{ color: Colors.title }}>Resumo do Pedido</h3>
          {items.map(item => (
            <div key={item.id} className="selfservice-summary-item">
              <span>{item.quantity}x {item.name}</span>
              <span style={{ color: Colors.primary, fontWeight: 'bold' }}>
                R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
              </span>
            </div>
          ))}
          <div className="selfservice-summary-total" style={{ borderColor: Colors.primary }}>
            <span style={{ color: Colors.title }}>Total:</span>
            <span style={{ color: Colors.primary }}>
              R$ {total.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

        <div className="selfservice-checkout-actions">
          <button
            className="selfservice-cancel-button"
            style={{ borderColor: Colors.secondary, color: Colors.secondary }}
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="selfservice-send-button"
            style={{ 
              background: Colors.primary,
              borderColor: Colors.primary
            }}
            onClick={handleSendOrder}
          >
            Enviar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
