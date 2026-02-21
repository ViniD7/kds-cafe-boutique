import mongoose, { Document, Schema } from 'mongoose';
import { IProduct } from './Product';

export interface ICartItem extends Document {
  productId: mongoose.Types.ObjectId;
  variantId?: string;
  quantity: number;
  isKit: boolean;
}

const CartItemSchema: Schema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  variantId: {
    type: String
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  isKit: {
    type: Boolean,
    default: false
  }
});

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [CartItemSchema]
}, {
  timestamps: true
});

export default mongoose.model<ICart>('Cart', CartSchema);