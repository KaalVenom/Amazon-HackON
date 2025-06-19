// seedData.js
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import User from '../models/User.js';

const demoSellerId = new mongoose.Types.ObjectId();

const createDemoProducts = () => [
  {
    title: 'Eco-Friendly Notebook',
    description: 'A notebook made from 100% recycled paper.',
    price: 5.99,
    originalPrice: 7.99,
    category: 'Books',
    images: [{ url: 'https://example.com/notebook.jpg', alt: 'Eco notebook' }],
    features: ['100% recycled paper', 'Biodegradable cover'],
    specifications: {
      brand: 'GreenWrites',
      model: 'GW-Notebook-100',
      weight: '200g',
      dimensions: '21 x 14.8 cm',
      warranty: '6 months'
    },
    inventory: {
      stock: 100,
      sku: 'GW-NB-100',
      inStock: true
    },
    rating: {
      average: 4.5,
      count: 12
    },
    sellerId: demoSellerId,
    isEcoFriendly: true,
    ecoScore: 80,
    sustainabilityInfo: 'Manufactured using solar energy.',
    supportsReturnAtEndOfLife: true,
    ecoCoinsReward: 50,
    aiAnalysis: {
      nlpScore: 85,
      imageScore: 70,
      certificationScore: 75,
      materialScore: 90,
      sustainabilityScore: 80,
      detectedFeatures: ['recycled', 'biodegradable'],
      lastAnalyzed: new Date()
    },
    metadata: {
      materials: ['Recycled Paper'],
      packaging: 'Recyclable paper',
      carbonFootprint: {
        rating: 'low',
        details: 'Minimal emissions during manufacturing'
      },
      energyUsage: 'Low',
      certifications: ['FSC', 'EcoLabel'],
      chemicals: {
        bpaFree: true,
        toxicFree: true,
        naturalIngredients: true
      }
    },
    status: 'active',
    tags: ['eco', 'recycled', 'stationery']
  }
];

export const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const existingUsers = await User.countDocuments();
    if (existingUsers === 0) {
      await User.create({
        _id: demoSellerId,
        username: 'demo_seller',
        email: 'seller@example.com',
        password: 'SecurePass123!',
        role: 'seller'
      });
      console.log('👤 Demo seller created');
    }

    const existingProducts = await Product.countDocuments();
    if (existingProducts === 0) {
      const products = createDemoProducts();
      await Product.insertMany(products);
      console.log('🛍️ Demo products inserted');
    }
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
  } finally {
    await mongoose.disconnect();
  }
};
