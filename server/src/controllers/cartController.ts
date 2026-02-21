import { Request, Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; // Assuming middleware adds userId

    const cart = await Cart.findOne({ userId }).populate('items.productId');
    
    if (!cart) {
      return res.json({ items: [], total: 0 });
    }

    res.json(cart);
    return;
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; // Assuming middleware adds userId
    const { productId, variantId, quantity, isKit } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => 
        item.productId.toString() === productId &&
        item.variantId === variantId &&
        item.isKit === isKit
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        productId,
        variantId,
        quantity,
        isKit
      } as any); // Type assertion due to Mongoose schema
    }

    await cart.save();
    await cart.populate('items.productId');

    res.status(201).json(cart);
    return;
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; // Assuming middleware adds userId
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.productId');

    res.json(cart);
    return;
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; // Assuming middleware adds userId
    const { itemId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    await cart.populate('items.productId');

    res.json(cart);
    return;
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; // Assuming middleware adds userId

    await Cart.deleteMany({ userId });

    res.json({ message: 'Cart cleared successfully', items: [] });
    return;
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};