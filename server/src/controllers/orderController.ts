import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Order from '../models/Order';
import Cart from '../models/Cart';
import Product from '../models/Product';

export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    
    res.json(orders);
    return;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const order = await Order.findOne({ _id: id, userId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
    return;
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { items, total, shippingAddress, paymentMethod } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Create order items from cart
    const orderItems = cart.items.map(item => ({
      productId: item.productId,
      variantId: item.variantId,
      name: '', // Will populate from product
      quantity: item.quantity,
      price: 0, // Will populate from product
      isKit: item.isKit
    }));

    // Fetch product details to populate order items
    for (let i = 0; i < orderItems.length; i++) {
      const product = await Product.findById(orderItems[i].productId);
      if (product) {
        orderItems[i].name = product.name;
        
        // Calculate price based on variants if applicable
        if (orderItems[i].variantId) {
          const variant = product.variants.find(v => v._id.toString() === orderItems[i].variantId);
          orderItems[i].price = variant ? variant.price : product.price;
        } else {
          orderItems[i].price = product.price;
        }
      }
    }

    // Create new order
    const order = new Order({
      userId,
      items: orderItems,
      total,
      status: 'Pendente'
    });

    await order.save();
    await order.populate('items.productId');

    // Clear the user's cart after creating the order
    await Cart.deleteOne({ userId });

    res.status(201).json(order);
    return;
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export const updateOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.userId;

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: id, userId },
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
    return;
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export const deleteOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const deletedOrder = await Order.findOneAndDelete({ _id: id, userId });

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
    return;
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};