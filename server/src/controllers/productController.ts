import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product';

interface ProductFilter {
  featured?: boolean;
  category?: string;
}

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.warn('⚠️ MongoDB not connected, returning empty products list');
      return res.json([]);
    }

    const { featured, category } = req.query;
    const filter: ProductFilter = {};

    if (featured === 'true') {
      filter.featured = true;
    }

    if (typeof category === 'string') {
      filter.category = category;
    }

    const products = await Product.find(filter);
    res.json(products);
    return;
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    console.log('🔍 Backend - Fetching product with ID:', id);
    
    if (!id || id.length === 0) {
      console.error('❌ Backend - Invalid product ID:', id);
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    if (mongoose.connection.readyState !== 1) {
      console.warn('⚠️ MongoDB not connected, returning 404 for fallback handling');
      return res.status(404).json({ message: 'Product not found (DB offline)' });
    }
    
    let product = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    } else {
      product = await Product.findOne({
        $or: [
          { slug: id },
          { name: new RegExp(`^${id.replace(/-/g, ' ')}$`, 'i') }
        ]
      });
    }

    if (!product) {
      console.warn('⚠️ Backend - Product not found for ID:', id);
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log('✅ Backend - Product found:', product.name);
    res.json(product);
    return;
  } catch (error: any) {
    console.error('❌ Backend - Error fetching product:', error);
    console.error('Error details:', error.message);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid product ID format',
        error: error.message 
      });
    }
    
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
    return;
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });

    res.json(products);
    return;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const product = new Product(productData);
    await product.save();

    res.status(201).json(product);
    return;
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      productData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
    return;
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
    return;
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};