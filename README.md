# EcoCommerce - Full-Stack Sustainable E-commerce Platform

A complete Amazon-style e-commerce platform with advanced sustainability features, AI-powered eco-friendliness analysis, and group delivery optimization.

## 🌟 Features

### 🛒 Core E-commerce
- **Product Catalog** with search, filtering, and categories
- **Shopping Cart** with persistent storage
- **Order Management** with tracking and history
- **User Authentication** with JWT tokens
- **Seller Dashboard** for product management

### 🌱 Sustainability Features
- **EcoCoin Wallet** - Earn coins for eco-friendly choices
- **Green Store** - Dedicated eco-friendly product marketplace
- **Product Returns** - Circular economy with EcoCoin rewards
- **Eco Delivery Slots** - Carbon-optimized delivery windows
- **Group Delivery** - AI-powered clustering for shared deliveries

### 🤖 AI-Powered Features
- **Eco-Friendliness Analysis** - NLP + Image analysis for sustainability scoring
- **Smart Search** - AI-enhanced product discovery
- **Group Delivery Clustering** - K-means + Reinforcement Learning
- **Collaborative Filtering** - User similarity matching

## 🏗️ Tech Stack

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with Mongoose ODM
- **Cloudinary** for image storage
- **JWT** for authentication
- **Natural.js** for NLP processing

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons

### AI/ML
- **K-means Clustering** for group delivery optimization
- **Reinforcement Learning** for delivery strategy optimization
- **NLP Analysis** for sustainability keyword detection
- **TF-IDF** for search relevance scoring

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd eco-commerce-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Database
MONGO_URI=mongodb://localhost:27017/ecocommerce

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
```

5. **Seed Database**
```bash
npm run seed
```

6. **Start Development Servers**
```bash
npm run dev
```

This starts both frontend (port 5173) and backend (port 3001) concurrently.

## 📁 Project Structure

```
eco-commerce-platform/
├── src/                          # Frontend React app
│   ├── components/               # Reusable UI components
│   ├── pages/                    # Page components
│   ├── services/                 # API service layers
│   ├── context/                  # React context providers
│   └── types/                    # TypeScript type definitions
├── server/                       # Backend Express app
│   ├── models/                   # MongoDB schemas
│   ├── routes/                   # API route handlers
│   ├── services/                 # Business logic services
│   ├── middleware/               # Express middleware
│   ├── config/                   # Configuration files
│   └── scripts/                  # Database seeding scripts
├── public/                       # Static assets
└── package.json                  # Dependencies and scripts
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products/eco` - Get eco-friendly products
- `GET /api/products/:id` - Get single product
- `GET /api/products/search/ai` - AI-powered search

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user orders
- `POST /api/orders/:id/return` - Return product for EcoCoins

### Wallet
- `GET /api/wallet` - Get wallet details
- `GET /api/wallet/transactions` - Get transaction history
- `POST /api/wallet/redeem` - Redeem EcoCoins

### Seller
- `POST /api/seller/products` - Create product with AI analysis
- `GET /api/seller/products` - Get seller's products
- `POST /api/seller/products/:id/analyze` - Run AI analysis

### Group Delivery
- `POST /api/group-delivery/join` - Join group delivery pool
- `GET /api/group-delivery/suggestions/:userId` - Get group suggestions
- `POST /api/group-delivery/confirm` - Confirm group participation

## 🧠 AI Features Deep Dive

### Eco-Friendliness Analysis
The AI system analyzes products using multiple techniques:

1. **NLP Analysis** (30 points max)
   - Keyword detection for sustainability terms
   - TF-IDF scoring for keyword importance
   - Sentiment analysis for eco claims

2. **Image Analysis** (20 points max)
   - Eco-label detection (simulated)
   - Packaging material analysis
   - Visual sustainability indicators

3. **Certification Scoring** (20 points max)
   - FSC, GOTS, Energy Star recognition
   - Organic and fair trade certifications
   - Third-party eco validations

4. **Material Analysis** (15 points max)
   - Sustainable material detection
   - Recycled content assessment
   - Biodegradability evaluation

5. **Sustainability Metrics** (15 points max)
   - Carbon footprint analysis
   - Energy usage assessment
   - Chemical safety evaluation

### Group Delivery Clustering
Advanced AI techniques for optimizing shared deliveries:

1. **K-means Clustering**
   - Geographic proximity grouping
   - Delivery time window optimization
   - Route efficiency calculation

2. **Reinforcement Learning**
   - Q-learning for strategy optimization
   - Success rate improvement over time
   - Dynamic parameter adjustment

3. **Collaborative Filtering**
   - User similarity matching
   - Purchase pattern analysis
   - Preference-based grouping

## 🌱 Sustainability Impact

### EcoCoin System
- **Earn Coins**: Eco deliveries, group orders, product returns
- **Redeem Rewards**: Discounts, vouchers, environmental actions
- **Track Impact**: CO₂ saved, trees planted, energy conserved

### Circular Economy
- **Product Returns**: Categorized as reusable, recyclable, or waste
- **Reward Structure**: 200/100/50 EcoCoins based on category
- **Environmental Tracking**: Real impact measurement

## 🔒 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcryptjs
- **Rate Limiting** to prevent abuse
- **Input Validation** with express-validator
- **CORS Protection** for cross-origin requests
- **Helmet.js** for security headers

## 📊 Database Schema

### Key Models
- **User**: Authentication, profile, location data
- **Product**: Catalog with eco-scoring and AI analysis
- **Order**: Purchase history with delivery preferences
- **EcoCoinWallet**: Transaction history and rewards
- **GroupDelivery**: AI-optimized delivery clusters

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=production_secret_key
CLOUDINARY_CLOUD_NAME=prod_cloud_name
CLOUDINARY_API_KEY=prod_api_key
CLOUDINARY_API_SECRET=prod_api_secret
```

### Deployment Platforms
- **Backend**: Heroku, Railway, DigitalOcean
- **Frontend**: Vercel, Netlify
- **Database**: MongoDB Atlas
- **Images**: Cloudinary

## 🧪 Testing

### Demo Accounts
After seeding, use these accounts:
- **Seller**: eco@example.com / password123
- **User**: green1@example.com / password123

### Test Features
1. **Product Search**: Try "toothbrush", "organic", "bamboo"
2. **Green Store**: Click "Think Green First" banner
3. **Group Delivery**: Use Buy Now with group options
4. **EcoCoin Wallet**: Check wallet after eco-friendly purchases
5. **Product Returns**: Return delivered items for coins

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Pexels** for product images
- **Lucide** for beautiful icons
- **Tailwind CSS** for styling system
- **MongoDB** for database platform
- **Cloudinary** for image management

---

**Built with ❤️ for a sustainable future** 🌍