import React, { memo } from 'react';
import { useSelfServiceCart } from '../context/SelfServiceCartContext';
import { toast } from '@/hooks/use-toast';
import Colors from '@/Constants/Colors/Colors';
import './Cart.css';

interface CartProps {
  onCheckout: () => void;
}

const Cart = memo<CartProps>(({ onCheckout }) => {
  const { items, updateQuantity, total, itemCount } = useSelfServiceCart();

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de continuar.",
        variant: "destructive"
      });
      return;
    }
    onCheckout();
  };

  if (items.length === 0) {
    return (
      <div className="selfservice-cart-empty">
        <p style={{ color: Colors.title, fontSize: '1.5rem' }}>
          Carrinho vazio
        </p>
      </div>
    );
  }

  return (
    <div className="selfservice-cart">
      <h2 className="selfservice-cart-title" style={{ color: Colors.title }}>
        Carrinho ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
      </h2>

      <div className="selfservice-cart-items">
        {items.map(item => (
          <div 
            key={item.id} 
            className="selfservice-cart-item"
            style={{ borderColor: Colors.primary }}
          >
            {item.image && (
              <div className="selfservice-cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
            )}
            
            <div className="selfservice-cart-item-details">
              <div className="selfservice-cart-item-header">
                <h3 style={{ color: Colors.title, margin: 0 }}>{item.name}</h3>
                <p style={{ color: Colors.primary, fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>
                  R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                </p>
              </div>
              
              <div className="selfservice-cart-item-controls">
                <div className="selfservice-qty-controls">
                  <button
                    className="selfservice-qty-button"
                    style={{ 
                      background: item.quantity === 1 ? Colors.danger : Colors.secondary,
                      borderColor: item.quantity === 1 ? Colors.danger : Colors.secondary
                    }}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    {item.quantity === 1 ? '✕' : '➖'}
                  </button>
                  
                  <span className="selfservice-qty-value" style={{ color: Colors.title }}>
                    {item.quantity}
                  </span>
                  
                  <button
                    className="selfservice-qty-button"
                    style={{ 
                      background: Colors.primary,
                      borderColor: Colors.primary
                    }}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    ➕
                  </button>
                </div>
                
                <div className="selfservice-item-info">
                  <span style={{ color: '#666', fontSize: '0.9rem' }}>
                    R$ {item.price.toFixed(2).replace('.', ',')} cada
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div 
        className="selfservice-cart-total"
        style={{ 
          background: Colors.background,
          borderColor: Colors.primary 
        }}
      >
        <div className="selfservice-cart-total-row">
          <span style={{ color: Colors.title }}>Total:</span>
          <span style={{ color: Colors.primary, fontSize: '2rem', fontWeight: 'bold' }}>
            R$ {total.toFixed(2).replace('.', ',')}
          </span>
        </div>
        
        <button
          className="selfservice-checkout-button"
          style={{ 
            background: Colors.primary,
            borderColor: Colors.primary
          }}
          onClick={handleProceedToCheckout}
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
});

Cart.displayName = 'Cart';

export default Cart;
