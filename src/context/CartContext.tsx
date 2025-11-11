import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import {
  Product,
  ProductVariant,
  Kit,
  getProductById,
  getKitById,
} from "../data/products";
import { useToast } from "@/components/ui/use-toast";
import { saveCart, loadCart, clearCartStorage } from "../lib/syncStorage";

interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  isKit: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    productId: string,
    quantity: number,
    variantId?: string,
    isKit?: boolean
  ) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  getCartItemDetails: () => CartItemDetail[];
}

export interface CartItemDetail {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variantName?: string;
  isKit: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Load cart items from localStorage on initial render
    return loadCart();
  });
  const { toast } = useToast();

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  const addToCart = (
    productId: string,
    quantity: number,
    variantId?: string,
    isKit: boolean = false
  ) => {
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.productId === productId &&
        item.variantId === variantId &&
        item.isKit === isKit
    );

    if (existingItemIndex > -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: `${productId}_${variantId || "default"}_${Date.now()}`,
          productId,
          variantId,
          quantity,
          isKit,
        },
      ]);
    }

    toast({
      title: "Adicionado ao carrinho",
      description: "O item foi adicionado ao seu carrinho de compras.",
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    clearCartStorage();
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.isKit) {
        const kit = getKitById(item.productId);
        return total + (kit ? kit.price * item.quantity : 0);
      } else {
        const product = getProductById(item.productId);
        if (!product) return total;

        if (item.variantId) {
          const variant = product.variants.find((v) => v.id === item.variantId);
          return total + (variant ? variant.price * item.quantity : 0);
        }

        return total + product.price * item.quantity;
      }
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartItemDetails = (): CartItemDetail[] => {
    return cartItems.map((item) => {
      if (item.isKit) {
        const kit = getKitById(item.productId);
        if (!kit) return {} as CartItemDetail;

        return {
          id: item.id,
          name: kit.name,
          price: kit.price,
          quantity: item.quantity,
          image: kit.images[0],
          isKit: true,
        };
      } else {
        const product = getProductById(item.productId);
        if (!product) return {} as CartItemDetail;

        let price = product.price;
        let variantName;

        if (item.variantId) {
          const variant = product.variants.find((v) => v.id === item.variantId);
          if (variant) {
            price = variant.price;
            variantName = variant.name;
          }
        }

        return {
          id: item.id,
          name: product.name,
          price,
          quantity: item.quantity,
          image: product.images[0],
          variantName,
          isKit: false,
        };
      }
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
