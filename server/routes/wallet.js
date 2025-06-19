import express from 'express';
import EcoCoinWallet from '../models/EcoCoinWallet.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get wallet details
router.get('/', authenticate, async (req, res) => {
  try {
    let wallet = await EcoCoinWallet.findOne({ userId: req.user._id });
    
    if (!wallet) {
      // Create wallet if it doesn't exist
      wallet = new EcoCoinWallet({
        userId: req.user._id,
        balance: 100,
        totalEarned: 100
      });
      
      await wallet.addTransaction({
        type: 'bonus',
        amount: 100,
        reason: 'Welcome Bonus',
        date: new Date()
      });
    }

    res.json(wallet);
  } catch (error) {
    console.error('Get wallet error:', error);
    res.status(500).json({ message: 'Failed to fetch wallet', error: error.message });
  }
});

// Get transaction history
router.get('/transactions', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 20, type } = req.query;

    const wallet = await EcoCoinWallet.findOne({ userId: req.user._id });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    let transactions = wallet.transactions;
    
    if (type) {
      transactions = transactions.filter(t => t.type === type);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const paginatedTransactions = transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(skip, skip + parseInt(limit));

    res.json({
      transactions: paginatedTransactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: transactions.length,
        pages: Math.ceil(transactions.length / parseInt(limit))
      },
      summary: {
        balance: wallet.balance,
        totalEarned: wallet.totalEarned,
        totalRedeemed: wallet.totalRedeemed,
        tier: wallet.tier
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Failed to fetch transactions', error: error.message });
  }
});

// Redeem EcoCoins
router.post('/redeem', authenticate, async (req, res) => {
  try {
    const { rewardId, amount, description } = req.body;

    const wallet = await EcoCoinWallet.findOne({ userId: req.user._id });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    if (!wallet.canAfford(amount)) {
      return res.status(400).json({ message: 'Insufficient EcoCoins' });
    }

    await wallet.addTransaction({
      type: 'redeemed',
      amount: amount,
      reason: description || `Reward Redemption - ${rewardId}`,
      metadata: { rewardId },
      date: new Date()
    });

    res.json({
      message: 'Reward redeemed successfully',
      newBalance: wallet.balance,
      amountRedeemed: amount
    });
  } catch (error) {
    console.error('Redeem error:', error);
    res.status(500).json({ message: 'Failed to redeem reward', error: error.message });
  }
});

// Get available rewards
router.get('/rewards', authenticate, async (req, res) => {
  try {
    const wallet = await EcoCoinWallet.findOne({ userId: req.user._id });
    const balance = wallet ? wallet.balance : 0;

    const rewards = [
      {
        id: 'voucher-50',
        name: '₹50 Shopping Voucher',
        cost: 500,
        description: 'Use on your next purchase',
        available: balance >= 500,
        category: 'voucher'
      },
      {
        id: 'discount-10',
        name: 'Extra 10% Discount',
        cost: 200,
        description: 'Apply to any order',
        available: balance >= 200,
        category: 'discount'
      },
      {
        id: 'free-shipping',
        name: 'Free Express Shipping',
        cost: 150,
        description: 'Next 3 orders',
        available: balance >= 150,
        category: 'shipping'
      },
      {
        id: 'plant-tree',
        name: 'Plant a Tree',
        cost: 300,
        description: 'We plant a tree in your name',
        available: balance >= 300,
        category: 'environmental'
      }
    ];

    res.json({
      rewards,
      userBalance: balance,
      userTier: wallet ? wallet.tier : 'bronze'
    });
  } catch (error) {
    console.error('Get rewards error:', error);
    res.status(500).json({ message: 'Failed to fetch rewards', error: error.message });
  }
});

export default router;