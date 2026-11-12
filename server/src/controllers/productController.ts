import { Request, Response } from 'express';
import Product from '../models/Product';

interface ProductFilter {
  featured?: boolean;
  category?: string;
}

export const getAllProducts = async (req: Request, res: Response) => {
  try {
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
    
    // Validate ObjectId format
    if (!id || id.length === 0) {
      console.error('❌ Backend - Invalid product ID:', id);
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    
    const product = await Product.findById(id);

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
    console.error('Error stack:', error.stack);
    
    // Check for specific MongoDB errors
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