export class CollaborativeFilteringService {
  constructor() {
    this.userSimilarityCache = new Map();
    this.productSimilarityCache = new Map();
    this.cacheExpiry = 60 * 60 * 1000; // 1 hour
  }

  async findSimilarUsers(targetUserId, allUsers) {
    const cacheKey = `user_${targetUserId}`;
    const cached = this.userSimilarityCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < this.cacheExpiry) {
      return cached.data;
    }

    const targetUser = allUsers.find(user => user.id === targetUserId);
    if (!targetUser) return [];

    const similarities = allUsers
      .filter(user => user.id !== targetUserId)
      .map(user => ({
        user,
        similarity: this.calculateUserSimilarity(targetUser, user)
      }))
      .filter(item => item.similarity > 0.3) // Minimum similarity threshold
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 10); // Top 10 similar users

    // Cache results
    this.userSimilarityCache.set(cacheKey, {
      data: similarities,
      timestamp: Date.now()
    });

    return similarities;
  }

  calculateUserSimilarity(user1, user2) {
    let similarity = 0;
    let factors = 0;

    // Location similarity (within 5km gets bonus)
    const distance = this.calculateDistance(user1.location, user2.location);
    if (distance <= 5) {
      similarity += (5 - distance) / 5 * 0.3; // 30% weight for location
      factors++;
    }

    // Purchase history similarity
    const purchaseSimilarity = this.calculatePurchaseSimilarity(user1, user2);
    similarity += purchaseSimilarity * 0.4; // 40% weight for purchase history
    factors++;

    // Delivery preference similarity
    const deliveryPreferenceSimilarity = this.calculateDeliveryPreferenceSimilarity(user1, user2);
    similarity += deliveryPreferenceSimilarity * 0.2; // 20% weight for delivery preferences
    factors++;

    // EcoCoin activity similarity
    const ecoActivitySimilarity = this.calculateEcoActivitySimilarity(user1, user2);
    similarity += ecoActivitySimilarity * 0.1; // 10% weight for eco activity
    factors++;

    return factors > 0 ? similarity / factors : 0;
  }

  calculatePurchaseSimilarity(user1, user2) {
    const orders1 = user1.orders || [];
    const orders2 = user2.orders || [];

    if (orders1.length === 0 || orders2.length === 0) return 0;

    // Extract product categories from orders
    const categories1 = new Set();
    const categories2 = new Set();

    orders1.forEach(order => {
      order.items.forEach(item => {
        categories1.add(item.category);
      });
    });

    orders2.forEach(order => {
      order.items.forEach(item => {
        categories2.add(item.category);
      });
    });

    // Calculate Jaccard similarity
    const intersection = new Set([...categories1].filter(x => categories2.has(x)));
    const union = new Set([...categories1, ...categories2]);

    return union.size > 0 ? intersection.size / union.size : 0;
  }

  calculateDeliveryPreferenceSimilarity(user1, user2) {
    const orders1 = user1.orders || [];
    const orders2 = user2.orders || [];

    if (orders1.length === 0 || orders2.length === 0) return 0;

    // Count delivery method preferences
    const methods1 = this.getDeliveryMethodCounts(orders1);
    const methods2 = this.getDeliveryMethodCounts(orders2);

    // Calculate cosine similarity
    return this.cosineSimilarity(methods1, methods2);
  }

  calculateEcoActivitySimilarity(user1, user2) {
    const ecoTransactions1 = user1.ecoTransactions || [];
    const ecoTransactions2 = user2.ecoTransactions || [];

    if (ecoTransactions1.length === 0 && ecoTransactions2.length === 0) return 1;
    if (ecoTransactions1.length === 0 || ecoTransactions2.length === 0) return 0;

    // Compare eco activity patterns
    const ecoScore1 = this.calculateEcoScore(ecoTransactions1);
    const ecoScore2 = this.calculateEcoScore(ecoTransactions2);

    // Similarity based on eco score difference
    const maxScore = Math.max(ecoScore1, ecoScore2);
    const minScore = Math.min(ecoScore1, ecoScore2);

    return maxScore > 0 ? minScore / maxScore : 1;
  }

  getDeliveryMethodCounts(orders) {
    const counts = { standard: 0, 'eco-slot': 0, group: 0 };
    
    orders.forEach(order => {
      const method = order.deliveryMethod || 'standard';
      counts[method] = (counts[method] || 0) + 1;
    });

    return counts;
  }

  calculateEcoScore(transactions) {
    return transactions
      .filter(t => t.type === 'earned')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  cosineSimilarity(vector1, vector2) {
    const keys = new Set([...Object.keys(vector1), ...Object.keys(vector2)]);
    
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    keys.forEach(key => {
      const val1 = vector1[key] || 0;
      const val2 = vector2[key] || 0;
      
      dotProduct += val1 * val2;
      norm1 += val1 * val1;
      norm2 += val2 * val2;
    });

    const denominator = Math.sqrt(norm1) * Math.sqrt(norm2);
    return denominator > 0 ? dotProduct / denominator : 0;
  }

  async enhanceClusters(clusters, allUsers) {
    return clusters.map(cluster => {
      const enhancedCluster = { ...cluster };
      
      // Add similarity scores between cluster members
      enhancedCluster.memberSimilarities = this.calculateClusterSimilarities(
        cluster.members,
        allUsers
      );
      
      // Boost score based on member similarities
      const avgSimilarity = enhancedCluster.memberSimilarities.reduce(
        (sum, sim) => sum + sim.score, 0
      ) / enhancedCluster.memberSimilarities.length;
      
      enhancedCluster.score *= (1 + avgSimilarity * 0.5);
      enhancedCluster.cohesionScore = avgSimilarity;
      
      return enhancedCluster;
    });
  }

  calculateClusterSimilarities(clusterMembers, allUsers) {
    const similarities = [];
    
    for (let i = 0; i < clusterMembers.length; i++) {
      for (let j = i + 1; j < clusterMembers.length; j++) {
        const user1 = allUsers.find(u => u.id === clusterMembers[i].userId);
        const user2 = allUsers.find(u => u.id === clusterMembers[j].userId);
        
        if (user1 && user2) {
          similarities.push({
            user1Id: user1.id,
            user2Id: user2.id,
            score: this.calculateUserSimilarity(user1, user2)
          });
        }
      }
    }
    
    return similarities;
  }

  async recommendGroupPartners(userId, potentialPartners, allUsers) {
    const targetUser = allUsers.find(user => user.id === userId);
    if (!targetUser) return [];

    const recommendations = potentialPartners
      .map(partner => {
        const partnerUser = allUsers.find(u => u.id === partner.userId);
        if (!partnerUser) return null;

        const similarity = this.calculateUserSimilarity(targetUser, partnerUser);
        const commonInterests = this.findCommonInterests(targetUser, partnerUser);
        
        return {
          ...partner,
          similarity,
          commonInterests,
          recommendationScore: similarity * 0.7 + (commonInterests.length / 10) * 0.3
        };
      })
      .filter(rec => rec !== null)
      .sort((a, b) => b.recommendationScore - a.recommendationScore);

    return recommendations;
  }

  findCommonInterests(user1, user2) {
    const interests1 = this.extractUserInterests(user1);
    const interests2 = this.extractUserInterests(user2);
    
    return interests1.filter(interest => interests2.includes(interest));
  }

  extractUserInterests(user) {
    const interests = new Set();
    
    // Extract from purchase history
    (user.orders || []).forEach(order => {
      order.items.forEach(item => {
        interests.add(item.category);
        if (item.isEcoFriendly) {
          interests.add('eco-friendly');
        }
      });
    });

    // Extract from eco transactions
    (user.ecoTransactions || []).forEach(transaction => {
      if (transaction.reason.includes('Eco')) {
        interests.add('sustainability');
      }
      if (transaction.reason.includes('Group')) {
        interests.add('group-delivery');
      }
    });

    return Array.from(interests);
  }

  calculateDistance(loc1, loc2) {
    const R = 6371; // Earth's radius in km
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLon = (loc2.lng - loc1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Clean up expired cache entries
  cleanupCache() {
    const now = Date.now();
    
    for (const [key, value] of this.userSimilarityCache.entries()) {
      if ((now - value.timestamp) > this.cacheExpiry) {
        this.userSimilarityCache.delete(key);
      }
    }
    
    for (const [key, value] of this.productSimilarityCache.entries()) {
      if ((now - value.timestamp) > this.cacheExpiry) {
        this.productSimilarityCache.delete(key);
      }
    }
  }
}