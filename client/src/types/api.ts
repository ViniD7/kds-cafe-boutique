// User-related types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
}

// Product-related types
export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  images: string[];
  variants: ProductVariant[];
  category: string;
  featured?: boolean;
}

export interface Kit {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  images: string[];
  products: string[];
  featured?: boolean;
}

// Cart-related types
export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  isKit: boolean;
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

export interface Cart {
  id?: string;
  userId: string;
  items: CartItem[];
  total?: number;
}

// Order-related types
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Pendente' | 'Processando' | 'Enviado' | 'Entregue' | 'Cancelado';
  items: OrderItem[];
}