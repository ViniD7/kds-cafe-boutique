
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
