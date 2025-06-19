import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  title: String,
  price: Number,
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: String,
  ecoCoinsEarned: {
    type: Number,
    default: 0
  }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  deliveryType: {
    type: String,
    enum: ['standard', 'eco-slot', 'group'],
    default: 'standard'
  },
  deliverySlot: {
    date: Date,
    timeSlot: String,
    isEcoFriendly: Boolean
  },
  groupDelivery: {
    groupId: String,
    members: [{
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
      address: String
    }],
    co2Saved: String,
    isConfirmed: Boolean
  },
  shippingAddress: {
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'card', 'upi', 'wallet'],
    default: 'cod'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'confirmed', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'processing'
  },
  trackingId: String,
  estimatedDelivery: Date,
  actualDelivery: Date,
  ecoCoinsEarned: {
    type: Number,
    default: 0
  },
  environmentalImpact: {
    co2Saved: String,
    treesEquivalent: Number,
    energySaved: String
  },
  notes: String
}, {
  timestamps: true
});

// Indexes
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ trackingId: 1 });

// Calculate total eco coins earned
orderSchema.methods.calculateEcoCoins = function() {
  let totalCoins = 0;
  
  // Coins from products
  this.items.forEach(item => {
    totalCoins += item.ecoCoinsEarned || 0;
  });
  
  // Bonus coins for delivery type
  if (this.deliveryType === 'eco-slot') totalCoins += 100;
  if (this.deliveryType === 'group') totalCoins += 150;
  
  this.ecoCoinsEarned = totalCoins;
  return totalCoins;
};

export default mongoose.model('Order', orderSchema);