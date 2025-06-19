import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cron from 'node-cron';

// Import routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import userRoutes from './routes/users.js';
import walletRoutes from './routes/wallet.js';
import sellerRoutes from './routes/seller.js';
import groupDeliveryRoutes from './routes/groupDelivery.js';
import searchRoutes from './routes/search.js';
import uploadRoutes from './routes/upload.js';

// Import services
import { GroupDeliveryService } from './services/GroupDeliveryService.js';
import { seedDatabase } from './scripts/seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecocommerce')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    // Seed database with initial data
    seedDatabase();
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

// Initialize services
const groupDeliveryService = new GroupDeliveryService();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/group-delivery', groupDeliveryRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// Background clustering job - runs every 10 minutes
cron.schedule('*/10 * * * *', async () => {
  console.log('🔄 Running background clustering job...');
  try {
    await groupDeliveryService.performClustering();
    console.log('✅ Clustering completed successfully');
  } catch (error) {
    console.error('❌ Clustering job failed:', error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Group delivery clustering active`);
  console.log(`🔍 AI search engine ready`);
  console.log(`🌱 EcoCommerce backend initialized`);
});

export { groupDeliveryService };