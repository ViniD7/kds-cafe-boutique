import mongoose, { Document, Schema } from 'mongoose';

export interface IProductVariant extends Document {
  name: string;
  price: number;
  stock: number;
}

const ProductVariantSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  }
});

export interface IProduct extends Document {
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  images: string[];
  variants: IProductVariant[];
  category: string;
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  variants: [ProductVariantSchema],
  category: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

export default mongoose.model<IProduct>('Product', ProductSchema);