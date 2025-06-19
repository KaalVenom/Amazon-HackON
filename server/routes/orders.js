import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import EcoCoinWallet from '../models/EcoCoinWallet.js';
import { authenticate } from '../middleware/auth.js';
import { validateOrder, validateRequest } from '../middleware/validation.js';

const router = express.Router();

// Create order
router.post('/', authenticate, validateOrder, validateRequest, async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      deliveryType = 'standard',
      deliverySlot,
      groupDelivery,
      paymentMethod = 'cod'
    } = req.body;

    // Validate and calculate order
    let totalPrice = 0;
    let totalEcoCoins = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ message: `Product ${item.productId} not found` });
      }

      if (!product.inventory.inStock || product.inventory.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.title}` 
        });
      }

      const itemTotal = product.price * item.quantity;
      const itemEcoCoins = product.ecoCoinsReward * item.quantity;

      totalPrice += itemTotal;
      totalEcoCoins += itemEcoCoins;

      orderItems.push({
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        image: product.images[0]?.url,
        ecoCoinsEarned: itemEcoCoins
      });

      // Update product stock
      product.inventory.stock -= item.quantity;
      if (product.inventory.stock === 0) {
        product.inventory.inStock = false;
      }
      await product.save();
    }

    // Add delivery bonus coins
    if (deliveryType === 'eco-slot') totalEcoCoins += 100;
    if (deliveryType === 'group') totalEcoCoins += 150;

    // Create order
    const order = new Order({
      userId: req.user._id,
      items: orderItems,
      totalPrice,
      deliveryType,
      deliverySlot,
      groupDelivery,
      shippingAddress,
      paymentMethod,
      ecoCoinsEarned: totalEcoCoins,
      trackingId: `ECO${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days
    });

    await order.save();

    // Update user's EcoCoin wallet
    const wallet = await EcoCoinWallet.findOne({ userId: req.user._id });
    if (wallet && totalEcoCoins > 0) {
      await wallet.addTransaction({
        type: 'earned',
        amount: totalEcoCoins,
        reason: `Order Purchase - ${deliveryType} delivery`,
        orderId: order._id,
        date: new Date()
      });
    }

    res.status(201).json({
      message: 'Order created successfully',
      order,
      ecoCoinsEarned: totalEcoCoins
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});

// Get user orders
router.get('/my-orders', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const filter = { userId: req.user._id };
    if (status) filter.orderStatus = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const orders = await Order.find(filter)
      .populate('items.productId', 'title images category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

// Get single order
router.get('/:id', authenticate, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('items.productId', 'title images category sellerId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
});

// Return product for EcoCoins
router.post('/:id/return', authenticate, async (req, res) => {
  try {
    const { productId, returnReason, returnCategory } = req.body;

    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id,
      orderStatus: 'delivered'
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found or not eligible for return' });
    }

    const orderItem = order.items.find(item => 
      item.productId.toString() === productId
    );

    if (!orderItem) {
      return res.status(404).json({ message: 'Product not found in order' });
    }

    // Calculate EcoCoins based on return category
    let ecoCoins = 0;
    switch (returnCategory) {
      case 'reusable':
        ecoCoins = 200;
        break;
      case 'recyclable':
        ecoCoins = 100;
        break;
      case 'waste':
        ecoCoins = 50;
        break;
      default:
        return res.status(400).json({ message: 'Invalid return category' });
    }

    // Update wallet
    const wallet = await EcoCoinWallet.findOne({ userId: req.user._id });
    if (wallet) {
      await wallet.addTransaction({
        type: 'earned',
        amount: ecoCoins,
        reason: `Product Return - ${returnCategory}`,
        orderId: order._id,
        productId: productId,
        metadata: { returnCategory, returnReason },
        date: new Date()
      });
    }

    // Update order status
    order.orderStatus = 'returned';
    await order.save();

    res.json({
      message: 'Product return processed successfully',
      ecoCoinsEarned: ecoCoins,
      newBalance: wallet.balance
    });
  } catch (error) {
    console.error('Return product error:', error);
    res.status(500).json({ message: 'Failed to process return', error: error.message });
  }
});

// Update order status (for admin/seller)
router.patch('/:id/status', authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderStatus = status;
    if (status === 'delivered') {
      order.actualDelivery = new Date();
    }

    await order.save();

    res.json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
});

export default router;