import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { cartAPI } from "../services/api";
import { toast } from "sonner";
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

  // Load cart items from API on initial render
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    // Only fetch cart from API if user has a token
    const token = localStorage.getItem('token');
    if (!token) {
      setCartItems([]);
      setLoading(false);
      return;
    }

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
      toast.success("Adicionado ao carrinho", {
        description: "O item foi adicionado ao seu carrinho de compras.",
      });
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      toast.error("Erro", {
        description: "Não foi possível adicionar o item ao carrinho.",
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
      toast.error("Erro", {
        description: "Não foi possível remover o item do carrinho.",
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
      toast.error("Erro", {
        description: "Não foi possível atualizar a quantidade.",
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
      toast.error("Erro", {
        description: "Não foi possível limpar o carrinho.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // Use price from populated productId, fallback to 0
      const price = item.productId?.price || 0;
      return total + (item.quantity * price);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartItemDetails = (): CartItemDetail[] => {
    return cartItems.map((item) => {
      // Handle missing populated data gracefully
      const product = item.productId || {};
      
      // Determine image (first image from array, or fallback)
      const image = product.images && product.images.length > 0 
        ? product.images[0] 
        : "";

      return {
        id: item._id || item.id || "",
        name: product.name || "Produto indisponível",
        price: product.price || 0,
        quantity: item.quantity,
        image: image,
        isKit: item.isKit,
      };
    });
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
