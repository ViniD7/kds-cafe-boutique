import axios from 'axios';
import { 
  User, 
  LoginCredentials, 
  RegisterData, 
  Product, 
  CartItem, 
  Order 
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Only redirect if not already on login page to prevent infinite loops
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// AUTHENTICATION
export const authAPI = {
  register: (userData: RegisterData) => 
    api.post('/auth/register', userData).then(res => res.data),
  
  login: (credentials: LoginCredentials) => 
    api.post('/auth/login', credentials).then(res => {
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      return { token, user };
    }),
  
  logout: () => {
    localStorage.removeItem('token');
    return api.post('/auth/logout').then(res => res.data);
  },
  
  getProfile: () => 
    api.get('/auth/profile').then(res => res.data),
  
  updateProfile: (profileData: Partial<User>) => 
    api.put('/auth/profile', profileData).then(res => res.data),
};

// PRODUCTS
export const productAPI = {
  getAllProducts: (params?: { featured?: boolean; category?: string }) => 
    api.get<Product[]>('/products', { params }).then(res => res.data),
  
  getProductById: (id: string) => 
    api.get<Product>(`/products/${id}`).then(res => res.data),
  
  getProductsByCategory: (category: string) => 
    api.get<Product[]>(`/products/category/${category}`).then(res => res.data),
};

// CART
export const cartAPI = {
  getCart: () => 
    api.get('/cart').then(res => res.data),
  
  addToCart: (itemData: { productId: string; variantId?: string; quantity: number; isKit?: boolean }) => 
    api.post('/cart/add', itemData).then(res => res.data),
  
  updateCartItem: (itemId: string, quantity: number) => 
    api.put(`/cart/update/${itemId}`, { quantity }).then(res => res.data),
  
  removeFromCart: (itemId: string) => 
    api.delete(`/cart/remove/${itemId}`).then(res => res.data),
  
  clearCart: () => 
    api.delete('/cart/clear').then(res => res.data),
};

// ORDERS
export const orderAPI = {
  getUserOrders: () => 
    api.get<Order[]>('/orders').then(res => res.data),
  
  getOrderById: (orderId: string) => 
    api.get<Order>(`/orders/${orderId}`).then(res => res.data),
  
  createOrder: (orderData: { items: CartItem[]; total: number; shippingAddress?: string; paymentMethod?: string }) => 
    api.post('/orders', orderData).then(res => res.data),
};

export default api;