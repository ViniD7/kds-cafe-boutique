// Utility functions for syncing cart data with localStorage
import { CartItem } from "@/types/api";

const CART_STORAGE_KEY = "kds_cafe_cart";

/**
 * Saves the current cart items to localStorage
 * @param cartItems - Array of cart items to save
 */
export const saveCart = (cartItems: CartItem[]): void => {
  try {
    const serializedCart = JSON.stringify(cartItems);
    localStorage.setItem(CART_STORAGE_KEY, serializedCart);
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

/**
 * Loads cart items from localStorage
 * @returns Array of cart items or empty array if none found/error
 */
export const loadCart = (): CartItem[] => {
  try {
    const serializedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return [];
  }
};

/**
 * Clears the cart from localStorage
 */
export const clearCartStorage = (): void => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear cart from localStorage:", error);
  }
};

/**
 * Updates a specific cart item in storage
 * @param updatedItem - The updated cart item
 */
export const updateCartItemInStorage = (updatedItem: CartItem): void => {
  try {
    const cartItems = loadCart();
    const itemIndex = cartItems.findIndex((item) => item.id === updatedItem.id);
    
    if (itemIndex !== -1) {
      cartItems[itemIndex] = updatedItem;
      saveCart(cartItems);
    }
  } catch (error) {
    console.error("Failed to update cart item in localStorage:", error);
  }
};

/**
 * Removes a specific cart item from storage
 * @param itemId - The ID of the item to remove
 */
export const removeCartItemFromStorage = (itemId: string): void => {
  try {
    const cartItems = loadCart();
    const filteredItems = cartItems.filter((item) => item.id !== itemId);
    saveCart(filteredItems);
  } catch (error) {
    console.error("Failed to remove cart item from localStorage:", error);
  }
};