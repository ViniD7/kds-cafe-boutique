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

// Image cache to prevent redundant API calls
const productCache = new Map<string, { data: Product[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

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
  getAllProducts: async (params?: { featured?: boolean; category?: string }) => {
    const cacheKey = `products_${JSON.stringify(params || {})}`;
    const cached = productCache.get(cacheKey);
    
    // Return cached data if still valid
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    
    // Fetch fresh data
    const response = await api.get<Product[]>('/products', { params });
    productCache.set(cacheKey, { data: response.data, timestamp: Date.now() });
    return response.data;
  },
  
  getProductById: async (id: string) => {
    const cacheKey = `product_${id}`;
    const cached = productCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data[0];
    }
    
    const response = await api.get<Product>(`/products/${id}`);
    productCache.set(cacheKey, { data: [response.data], timestamp: Date.now() });
    return response.data;
  },
  
  getProductsByCategory: async (category: string) => {
    const cacheKey = `products_category_${category}`;
    const cached = productCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    
    const response = await api.get<Product[]>(`/products/category/${category}`);
    productCache.set(cacheKey, { data: response.data, timestamp: Date.now() });
    return response.data;
  },
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