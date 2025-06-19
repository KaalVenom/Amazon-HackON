import mongoose from 'mongoose';

const groupDeliverySchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
    unique: true
  },
  members: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    name: String,
    location: {
      lat: Number,
      lng: Number,
      address: String
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    confirmed: {
      type: Boolean,
      default: false
    }
  }],
  centroid: {
    lat: Number,
    lng: Number
  },
  deliveryWindow: {
    start: Date,
    end: Date,
    preferredDate: Date
  },
  status: {
    type: String,
    enum: ['forming', 'ready', 'confirmed', 'dispatched', 'delivered', 'cancelled'],
    default: 'forming'
  },
  maxMembers: {
    type: Number,
    default: 5
  },
  minMembers: {
    type: Number,
    default: 2
  },
  score: {
    type: Number,
    default: 0
  },
  estimatedSavings: {
    co2Reduction: String,
    ecoCoins: Number,
    deliveryFee: String
  },
  aiMetrics: {
    clusterScore: Number,
    similarityScore: Number,
    efficiencyScore: Number
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
  }
}, {
  timestamps: true
});

// Indexes
groupDeliverySchema.index({ status: 1, expiresAt: 1 });
groupDeliverySchema.index({ 'members.userId': 1 });
groupDeliverySchema.index({ centroid: '2dsphere' });

// Check if group is ready for confirmation
groupDeliverySchema.methods.isReadyForConfirmation = function() {
  return this.members.length >= this.minMembers && 
         this.members.length <= this.maxMembers &&
         this.status === 'forming';
};

// Calculate group efficiency
groupDeliverySchema.methods.calculateEfficiency = function() {
  const memberCount = this.members.length;
  const co2Saved = memberCount * 0.5; // kg per member
  const ecoCoinsPerMember = 150 + (memberCount - 1) * 25;
  
  this.estimatedSavings = {
    co2Reduction: `${co2Saved.toFixed(1)} kg`,
    ecoCoins: ecoCoinsPerMember,
    deliveryFee: memberCount > 3 ? 'FREE' : '50% OFF'
  };
  
  return this.estimatedSavings;
};

export default mongoose.model('GroupDelivery', groupDeliverySchema);