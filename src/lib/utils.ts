import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CartItemDetail } from "@/context/CartContext"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
}

export function getImageUrl(path: string): string {
  // Check if the path is already a full URL
  if (path.startsWith('http') || path.startsWith('/')) {
    return path;
  }
  
  // Otherwise, assume it's a local path
  return `/${path}`;
}

export function formatWhatsAppMessage(items: CartItemDetail[], total: number): string {
  let message = "Olá! Gostaria de fazer o pedido dos seguintes itens:%0A%0A";
  
  items.forEach(item => {
    message += `- ${item.name}${item.variantName ? ` (${item.variantName})` : ''} (${item.quantity}x) - ${formatCurrency(item.price * item.quantity)}%0A`;
  });
  
  message += `%0AValor total: ${formatCurrency(total)}%0A%0AAguardo confirmação do pedido.`;
  
  return message;
}