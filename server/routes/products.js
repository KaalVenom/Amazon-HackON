import express from 'express';
import Product from '../models/Product.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import { validateProduct, validateRequest } from '../middleware/validation.js';

const router = express.Router();

// Get all products with filtering
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      minRating,
      ecoFriendly,
      inStock,
      search,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 20
    } = req.query;

    // Build filter object
    const filter = { status: 'active' };

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (minRating) filter['rating.average'] = { $gte: parseFloat(minRating) };
    if (ecoFriendly === 'true') filter.isEcoFriendly = true;
    if (inStock === 'true') filter['inventory.inStock'] = true;
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const products = await Product.find(filter)
      .populate('sellerId', 'name')
      .sort(sortObj)
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
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

// Get eco-friendly products for Green Store
router.get('/eco', optionalAuth, async (req, res) => {
  try {
    const {
      search,
      category,
      minEcoScore = 60,
      sort = 'ecoScore',
      order = 'desc',
      page = 1,
      limit = 20
    } = req.query;

    const filter = {
      status: 'active',
      isEcoFriendly: true,
      ecoScore: { $gte: parseInt(minEcoScore) }
    };

    if (category) filter.category = category;
    if (search) {
      filter.$text = { $search: search };
    }

    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const products = await Product.find(filter)
      .populate('sellerId', 'name')
      .sort(sortObj)
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
    console.error('Get eco products error:', error);
    res.status(500).json({ message: 'Failed to fetch eco products', error: error.message });
  }
});

// Get single product
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('sellerId', 'name email')
      .populate('reviews.userId', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
});

// Search products (for AI search integration)
router.get('/search/ai', optionalAuth, async (req, res) => {
  try {
    const { q: query, limit = 20, ...filters } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Build search filter
    const filter = {
      status: 'active',
      $text: { $search: query }
    };

    // Apply additional filters
    if (filters.inStockOnly === 'true') filter['inventory.inStock'] = true;
    if (filters.ecoFriendlyOnly === 'true') filter.isEcoFriendly = true;
    if (filters.minRating) filter['rating.average'] = { $gte: parseFloat(filters.minRating) };
    if (filters.maxPrice) filter.price = { $lte: parseFloat(filters.maxPrice) };

    const products = await Product.find(filter, { score: { $meta: 'textScore' } })
      .populate('sellerId', 'name')
      .sort({ score: { $meta: 'textScore' }, ecoScore: -1 })
      .limit(parseInt(limit));

    res.json({
      query,
      totalResults: products.length,
      results: products,
      searchAnalytics: {
        indexedProducts: await Product.countDocuments({ status: 'active' }),
        ecoProducts: await Product.countDocuments({ status: 'active', isEcoFriendly: true })
      }
    });
  } catch (error) {
    console.error('AI search error:', error);
    res.status(500).json({ message: 'Search failed', error: error.message });
  }
});

// Add product review
router.post('/:id/reviews', authenticate, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already reviewed
    const existingReview = product.reviews.find(
      review => review.userId.toString() === req.user._id.toString()
    );

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    // Add review
    product.reviews.push({
      userId: req.user._id,
      rating: parseInt(rating),
      comment,
      date: new Date()
    });

    // Update average rating
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    product.rating.average = totalRating / product.reviews.length;
    product.rating.count = product.reviews.length;

    await product.save();

    res.json({ message: 'Review added successfully', product });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'Failed to add review', error: error.message });
  }
});

export default router;