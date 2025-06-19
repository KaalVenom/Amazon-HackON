import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: 'text'
  },
  description: {
    type: String,
    required: true,
    index: 'text'
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Fashion', 'Home & Kitchen', 'Health & Personal Care', 'Beauty', 'Sports', 'Books', 'Toys']
  },
  images: [{
    url: String,
    publicId: String,
    alt: String
  }],
  features: [String],
  specifications: {
    brand: String,
    model: String,
    weight: String,
    dimensions: String,
    warranty: String
  },
  inventory: {
    stock: { type: Number, default: 0 },
    sku: String,
    inStock: { type: Boolean, default: true }
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Eco-friendly properties
  isEcoFriendly: {
    type: Boolean,
    default: false
  },
  ecoScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  sustainabilityInfo: String,
  supportsReturnAtEndOfLife: {
    type: Boolean,
    default: false
  },
  ecoCoinsReward: {
    type: Number,
    min: 5,
    max: 100,
    default: 5
  },
  // AI Analysis metadata
  aiAnalysis: {
    nlpScore: Number,
    imageScore: Number,
    certificationScore: Number,
    materialScore: Number,
    sustainabilityScore: Number,
    detectedFeatures: [String],
    lastAnalyzed: Date
  },
  // Product metadata for AI
  metadata: {
    materials: [String],
    packaging: {
      type: String,
      isRecyclable: Boolean,
      isPlasticFree: Boolean
    },
    carbonFootprint: {
      rating: String, // 'low', 'medium', 'high'
      details: String
    },
    energyUsage: String,
    certifications: [String],
    chemicals: {
      bpaFree: Boolean,
      toxicFree: Boolean,
      naturalIngredients: Boolean
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'rejected'],
    default: 'active'
  },
  tags: [String],
  dateAdded: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for search and filtering
productSchema.index({ title: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, ecoScore: -1 });
productSchema.index({ isEcoFriendly: 1, ecoScore: -1 });
productSchema.index({ 'rating.average': -1 });
productSchema.index({ price: 1 });
productSchema.index({ dateAdded: -1 });

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Method to update eco score and rewards
productSchema.methods.updateEcoAnalysis = function(analysis) {
  this.aiAnalysis = analysis;
  this.ecoScore = analysis.totalScore || 0;
  this.isEcoFriendly = this.ecoScore >= 60;
  
  // Calculate EcoCoin rewards based on score
  if (this.ecoScore >= 90) this.ecoCoinsReward = 100;
  else if (this.ecoScore >= 75) this.ecoCoinsReward = 75;
  else if (this.ecoScore >= 60) this.ecoCoinsReward = 50;
  else if (this.ecoScore >= 40) this.ecoCoinsReward = 25;
  else this.ecoCoinsReward = 5;
  
  return this.save();
};

export default mongoose.model('Product', productSchema);