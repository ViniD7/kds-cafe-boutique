import React from 'react';
import Colors from '@/Constants/Colors/Colors';
import './Success.css';

interface SuccessProps {
  onNewOrder: () => void;
}

const Success: React.FC<SuccessProps> = ({ onNewOrder }) => {
  return (
    <div className="selfservice-success">
      <div 
        className="selfservice-success-content"
        style={{ 
          background: Colors.white,
          borderColor: Colors.success
        }}
      >
        <div className="selfservice-success-icon" style={{ color: Colors.success }}>
          ✓
        </div>
        
        <h2 className="selfservice-success-title" style={{ color: Colors.title }}>
          Pedido Enviado!
        </h2>
        
        <p className="selfservice-success-message" style={{ color: Colors.text }}>
          Seu pedido foi enviado com sucesso para o balcão.
        </p>
        
        <p className="selfservice-success-submessage" style={{ color: Colors.secondary }}>
          Aguarde ser chamado!
        </p>
        
        <button
          className="selfservice-new-order-button"
          style={{ 
            background: Colors.primary,
            borderColor: Colors.primary
          }}
          onClick={onNewOrder}
        >
          Fazer Novo Pedido
        </button>
      </div>
    </div>
  );
};

export default Success;
