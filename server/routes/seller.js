import express from 'express';
import Product from '../models/Product.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateProduct, validateRequest } from '../middleware/validation.js';
import { AIEcoAnalysisService } from '../services/AIEcoAnalysisService.js';

const router = express.Router();

// Create product
router.post('/products', authenticate, validateProduct, validateRequest, async (req, res) => {
  try {
    const productData = {
      ...req.body,
      sellerId: req.user._id,
      status: 'pending' // Pending AI analysis
    };

    const product = new Product(productData);
    await product.save();

    // Run AI analysis
    try {
      const aiAnalysis = await AIEcoAnalysisService.analyzeProduct(product);
      await product.updateEcoAnalysis(aiAnalysis);
      product.status = 'active';
      await product.save();
    } catch (aiError) {
      console.error('AI analysis failed:', aiError);
      // Product remains pending for manual review
    }

    res.status(201).json({
      message: 'Product created successfully',
      product,
      aiAnalysis: product.aiAnalysis
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
});

// Get seller's products
router.get('/products', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const filter = { sellerId: req.user._id };
    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get seller products error:', error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

// Update product
router.put('/products/:id', authenticate, async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      sellerId: req.user._id
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product
    Object.assign(product, req.body);
    product.status = 'pending'; // Re-analyze after update

    await product.save();

    // Re-run AI analysis
    try {
      const aiAnalysis = await AIEcoAnalysisService.analyzeProduct(product);
      await product.updateEcoAnalysis(aiAnalysis);
      product.status = 'active';
      await product.save();
    } catch (aiError) {
      console.error('AI re-analysis failed:', aiError);
    }

    res.json({
      message: 'Product updated successfully',
      product,
      aiAnalysis: product.aiAnalysis
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
});

// Delete product
router.delete('/products/:id', authenticate, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      sellerId: req.user._id
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
});

// Analyze product with AI
router.post('/products/:id/analyze', authenticate, async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      sellerId: req.user._id
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const aiAnalysis = await AIEcoAnalysisService.analyzeProduct(product);
    await product.updateEcoAnalysis(aiAnalysis);

    res.json({
      message: 'AI analysis completed',
      analysis: aiAnalysis,
      ecoScore: product.ecoScore,
      ecoCoinsReward: product.ecoCoinsReward,
      isEcoFriendly: product.isEcoFriendly
    });
  } catch (error) {
    console.error('AI analysis error:', error);
    res.status(500).json({ message: 'AI analysis failed', error: error.message });
  }
});

// Get seller dashboard stats
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const sellerId = req.user._id;

    const stats = await Product.aggregate([
      { $match: { sellerId: sellerId } },
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          activeProducts: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          },
          ecoProducts: {
            $sum: { $cond: ['$isEcoFriendly', 1, 0] }
          },
          avgEcoScore: { $avg: '$ecoScore' },
          totalViews: { $sum: '$views' },
          avgRating: { $avg: '$rating.average' }
        }
      }
    ]);

    const dashboardStats = stats[0] || {
      totalProducts: 0,
      activeProducts: 0,
      ecoProducts: 0,
      avgEcoScore: 0,
      totalViews: 0,
      avgRating: 0
    };

    res.json(dashboardStats);
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: error.message });
  }
});

export default router;