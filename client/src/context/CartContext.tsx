import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { cartAPI } from "../services/api";
import { useToast } from "../hooks/use-toast";
import { CartItem, CartItemDetail } from "../types/api";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    productId: string,
    quantity: number,
    variantId?: string,
    isKit?: boolean
  ) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  getCartItemDetails: () => CartItemDetail[];
  loading: boolean;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Load cart items from API on initial render
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const cartData = await cartAPI.getCart();
      setCartItems(cartData.items || []);
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error);
      // Initialize with empty cart if error occurs
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (
    productId: string,
    quantity: number,
    variantId?: string,
    isKit: boolean = false
  ) => {
    try {
      setLoading(true);
      const response = await cartAPI.addToCart({ productId, variantId, quantity, isKit });
      setCartItems(response.items || []);
      toast({
        title: "Adicionado ao carrinho",
        description: "O item foi adicionado ao seu carrinho de compras.",
      });
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o item ao carrinho.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      setLoading(true);
      const response = await cartAPI.removeFromCart(id);
      setCartItems(response.items || []);
    } catch (error) {
      console.error("Erro ao remover do carrinho:", error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o item do carrinho.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      setLoading(true);
      const response = await cartAPI.updateCartItem(id, quantity);
      setCartItems(response.items || []);
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a quantidade.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await cartAPI.clearCart();
      setCartItems([]);
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error);
      toast({
        title: "Erro",
        description: "Não foi possível limpar o carrinho.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    // In a real implementation, this would come from the API response
    // For now, we'll calculate it locally based on cart items
    return cartItems.reduce((total, item) => {
      // Since we don't have prices in cart items, we'd need to fetch product details
      // This is a simplified calculation - in reality, prices would come from the API
      return total + (item.quantity * 10); // Placeholder price
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartItemDetails = (): CartItemDetail[] => {
    // In a real implementation, this would use product data fetched from the API
    // For now, returning a simplified version
    return cartItems.map((item) => ({
      id: item.id,
      name: `Produto ${item.productId}`,
      price: 10, // Placeholder price
      quantity: item.quantity,
      image: "", // Placeholder image
      isKit: item.isKit,
    }));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        getCartItemDetails,
        loading,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
