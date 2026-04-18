import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { SelfServiceCartItem, PaymentMethod } from '../types';

interface SelfServiceCartContextType {
  items: SelfServiceCartItem[];
  addToCart: (item: Omit<SelfServiceCartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const SelfServiceCartContext = createContext<SelfServiceCartContextType | undefined>(undefined);

export const SelfServiceCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<SelfServiceCartItem[]>([]);

  const addToCart = useCallback((item: Omit<SelfServiceCartItem, 'quantity'>) => {
    setItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.id !== id));
    } else {
      setItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [items]);

  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const value = useMemo(() => ({
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount
  }), [items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount]);

  return (
    <SelfServiceCartContext.Provider value={value}>
      {children}
    </SelfServiceCartContext.Provider>
  );
};

export const useSelfServiceCart = () => {
  const context = useContext(SelfServiceCartContext);
  if (!context) {
    throw new Error('useSelfServiceCart must be used within SelfServiceCartProvider');
  }
  return context;
};
