// Tipos para o módulo de autoatendimento

export interface SelfServiceCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface SelfServiceOrder {
  items: SelfServiceCartItem[];
  customerName: string;
  paymentMethod: 'credito' | 'debito' | 'pix';
  total: number;
  timestamp: string;
}

export type PaymentMethod = 'credito' | 'debito' | 'pix';
