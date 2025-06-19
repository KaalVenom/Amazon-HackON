import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['earned', 'redeemed', 'bonus', 'refund'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  metadata: {
    deliveryType: String,
    groupId: String,
    returnCategory: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  totalEarned: {
    type: Number,
    default: 0
  },
  totalRedeemed: {
    type: Number,
    default: 0
  },
  transactions: [transactionSchema],
  achievements: [{
    type: String,
    unlockedAt: Date,
    description: String
  }],
  tier: {
    type: String,
    enum: ['bronze', 'silver', 'gold', 'platinum'],
    default: 'bronze'
  }
}, {
  timestamps: true
});

// Update tier based on total earned
walletSchema.methods.updateTier = function() {
  if (this.totalEarned >= 5000) this.tier = 'platinum';
  else if (this.totalEarned >= 2000) this.tier = 'gold';
  else if (this.totalEarned >= 500) this.tier = 'silver';
  else this.tier = 'bronze';
};

// Add transaction
walletSchema.methods.addTransaction = function(transaction) {
  this.transactions.unshift(transaction);
  
  if (transaction.type === 'earned' || transaction.type === 'bonus' || transaction.type === 'refund') {
    this.balance += transaction.amount;
    this.totalEarned += transaction.amount;
  } else if (transaction.type === 'redeemed') {
    this.balance -= transaction.amount;
    this.totalRedeemed += transaction.amount;
  }
  
  this.updateTier();
  return this.save();
};

// Check if user can afford redemption
walletSchema.methods.canAfford = function(amount) {
  return this.balance >= amount;
};

export default mongoose.model('EcoCoinWallet', walletSchema);