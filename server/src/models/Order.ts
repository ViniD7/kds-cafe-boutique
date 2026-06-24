import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem extends Document {
  productId: mongoose.Types.ObjectId;
  variantId?: string;
  name: string;
  quantity: number;
  price: number;
  isKit: boolean;
}

const OrderItemSchema: Schema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  variantId: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  isKit: {
    type: Boolean,
    default: false
  }
});

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  total: number;
  status: 'Pendente' | 'Processando' | 'Enviado' | 'Entregue' | 'Cancelado';
  paymentStatus?: 'PENDING' | 'PAID' | 'FAILED';
  paymentMethod?: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX';
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [OrderItemSchema],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pendente', 'Processando', 'Enviado', 'Entregue', 'Cancelado'],
    default: 'Pendente'
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'PAID', 'FAILED'],
    default: 'PENDING'
  },
  paymentMethod: {
    type: String,
    enum: ['CREDIT_CARD', 'DEBIT_CARD', 'PIX']
  }
}, {
  timestamps: true
});

export default mongoose.model<IOrder>('Order', OrderSchema);