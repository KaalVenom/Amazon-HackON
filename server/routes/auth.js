import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import EcoCoinWallet from '../models/EcoCoinWallet.js';
import { validateRegistration, validateLogin, validateRequest } from '../middleware/validation.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', validateRegistration, validateRequest, async (req, res) => {
  try {
    const { name, email, password, location, address, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create user
    const user = new User({
      name,
      email,
      password,
      location,
      address,
      phone
    });

    await user.save();

    // Create EcoCoin wallet
    const wallet = new EcoCoinWallet({
      userId: user._id,
      balance: 100, // Welcome bonus
      totalEarned: 100
    });

    await wallet.addTransaction({
      type: 'bonus',
      amount: 100,
      reason: 'Welcome Bonus',
      date: new Date()
    });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: user.toJSON(),
      wallet: { balance: wallet.balance, tier: wallet.tier }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Login
router.post('/login', validateLogin, validateRequest, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Get wallet
    const wallet = await EcoCoinWallet.findOne({ userId: user._id });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: user.toJSON(),
      wallet: wallet ? { 
        balance: wallet.balance, 
        tier: wallet.tier,
        totalEarned: wallet.totalEarned 
      } : null
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Get current user
router.get('/me', authenticate, async (req, res) => {
  try {
    const wallet = await EcoCoinWallet.findOne({ userId: req.user._id });
    
    res.json({
      user: req.user.toJSON(),
      wallet: wallet ? {
        balance: wallet.balance,
        tier: wallet.tier,
        totalEarned: wallet.totalEarned
      } : null
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user data', error: error.message });
  }
});

// Logout (client-side token removal)
router.post('/logout', authenticate, (req, res) => {
  res.json({ message: 'Logout successful' });
});

export default router;