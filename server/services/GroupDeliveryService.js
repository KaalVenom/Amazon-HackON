import { KMeansService } from './KMeansService.js';
import { ReinforcementLearningAgent } from './ReinforcementLearningAgent.js';
import { CollaborativeFilteringService } from './CollaborativeFilteringService.js';

export class GroupDeliveryService {
  constructor() {
    this.kmeansService = new KMeansService();
    this.rlAgent = new ReinforcementLearningAgent();
    this.collaborativeFiltering = new CollaborativeFilteringService();
    this.activeOrders = new Map();
    this.groupedOrders = new Map();
    this.users = new Map();
    this.clusteringHistory = [];
  }

  initializeWithMockData(users, orders) {
    // Initialize users
    users.forEach(user => {
      this.users.set(user.id, user);
    });

    // Initialize active orders
    orders.forEach(order => {
      this.activeOrders.set(order.id, {
        ...order,
        timestamp: new Date(),
        status: 'pending_group'
      });
    });

    console.log(`Initialized with ${users.length} users and ${orders.length} orders`);
  }

  async joinGroupDelivery(orderData) {
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const order = {
      id: orderId,
      userId: orderData.userId,
      items: orderData.items,
      deliveryLocation: orderData.deliveryLocation,
      preferredDeliveryDate: orderData.preferredDeliveryDate,
      productCategories: orderData.items.map(item => item.category),
      timestamp: new Date(),
      status: 'pending_group'
    };

    this.activeOrders.set(orderId, order);

    // Try to find immediate matches
    const suggestions = await this.findGroupSuggestions(orderData.userId);
    
    return {
      orderId,
      status: 'added_to_pool',
      suggestions,
      estimatedGroupingTime: '15-30 minutes'
    };
  }

  async findGroupSuggestions(userId) {
    const userOrders = Array.from(this.activeOrders.values())
      .filter(order => order.userId === userId);
    
    if (userOrders.length === 0) return [];

    const userOrder = userOrders[0];
    const user = this.users.get(userId);
    
    if (!user || !userOrder) return [];

    // Get potential group members using all AI techniques
    const locationClusters = await this.kmeansService.clusterByLocation(
      Array.from(this.activeOrders.values()),
      userOrder.deliveryLocation
    );

    const similarUsers = await this.collaborativeFiltering.findSimilarUsers(
      userId,
      Array.from(this.users.values())
    );

    const rlOptimizedGroups = this.rlAgent.optimizeGrouping(
      locationClusters,
      similarUsers,
      this.clusteringHistory
    );

    return rlOptimizedGroups.slice(0, 5).map(group => ({
      groupId: group.id,
      members: group.members.map(member => ({
        userId: member.userId,
        name: this.users.get(member.userId)?.name || 'Anonymous',
        location: member.deliveryLocation,
        commonProducts: this.findCommonProducts(userOrder, member),
        distance: this.calculateDistance(
          userOrder.deliveryLocation,
          member.deliveryLocation
        )
      })),
      estimatedSavings: {
        ecoCoins: 150 + (group.members.length * 25),
        co2Reduction: `${(group.members.length * 0.5).toFixed(1)} kg`,
        deliveryFee: group.members.length > 3 ? 'FREE' : '50% OFF'
      },
      deliveryWindow: group.deliveryWindow
    }));
  }

  async confirmGroupDelivery(groupId, userId) {
    const group = this.groupedOrders.get(groupId);
    
    if (!group) {
      throw new Error('Group not found');
    }

    // Add user to confirmed group
    group.confirmedMembers = group.confirmedMembers || [];
    if (!group.confirmedMembers.includes(userId)) {
      group.confirmedMembers.push(userId);
    }

    // Check if all members have confirmed
    const allConfirmed = group.members.every(member => 
      group.confirmedMembers.includes(member.userId)
    );

    if (allConfirmed) {
      // Finalize group delivery
      group.status = 'confirmed';
      group.finalizedAt = new Date();

      // Reward RL agent for successful grouping
      this.rlAgent.updateReward(groupId, 1);

      // Calculate rewards
      const rewards = this.calculateGroupRewards(group);

      // Remove orders from active pool
      group.members.forEach(member => {
        this.activeOrders.delete(member.orderId);
      });

      return {
        status: 'group_confirmed',
        groupId,
        rewards,
        estimatedDelivery: this.calculateGroupDeliveryTime(group),
        trackingId: `GRP_${groupId.slice(-8).toUpperCase()}`
      };
    }

    return {
      status: 'waiting_for_others',
      confirmedCount: group.confirmedMembers.length,
      totalMembers: group.members.length,
      waitingFor: group.members
        .filter(member => !group.confirmedMembers.includes(member.userId))
        .map(member => this.users.get(member.userId)?.name || 'User')
    };
  }

  async performClustering() {
    const activeOrdersArray = Array.from(this.activeOrders.values());
    
    if (activeOrdersArray.length < 2) {
      console.log('Not enough orders for clustering');
      return;
    }

    console.log(`Clustering ${activeOrdersArray.length} active orders...`);

    // Perform K-means clustering
    const clusters = await this.kmeansService.performClustering(activeOrdersArray);
    
    // Apply collaborative filtering
    const enhancedClusters = await this.collaborativeFiltering.enhanceClusters(
      clusters,
      Array.from(this.users.values())
    );

    // Optimize with RL
    const optimizedClusters = this.rlAgent.optimizeClusters(
      enhancedClusters,
      this.clusteringHistory
    );

    // Store successful clusters
    optimizedClusters.forEach(cluster => {
      if (cluster.members.length >= 2) {
        const groupId = `group_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
        this.groupedOrders.set(groupId, {
          id: groupId,
          ...cluster,
          createdAt: new Date(),
          status: 'pending_confirmation',
          expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
        });
      }
    });

    // Record clustering history for RL
    this.clusteringHistory.push({
      timestamp: new Date(),
      inputOrders: activeOrdersArray.length,
      clustersFormed: optimizedClusters.length,
      avgClusterSize: optimizedClusters.reduce((sum, c) => sum + c.members.length, 0) / optimizedClusters.length
    });

    // Clean up expired groups
    this.cleanupExpiredGroups();

    console.log(`Formed ${optimizedClusters.length} potential groups`);
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

  findCommonProducts(order1, order2) {
    const categories1 = new Set(order1.productCategories);
    const categories2 = new Set(order2.productCategories);
    return Array.from(categories1).filter(cat => categories2.has(cat));
  }

  calculateGroupRewards(group) {
    const baseReward = 150;
    const memberBonus = (group.members.length - 1) * 25;
    const totalEcoCoins = baseReward + memberBonus;
    
    return {
      ecoCoins: totalEcoCoins,
      co2Saved: `${(group.members.length * 0.5).toFixed(1)} kg`,
      deliveryDiscount: group.members.length > 3 ? '100%' : '50%'
    };
  }

  calculateGroupDeliveryTime(group) {
    // Simulate optimized delivery time
    const baseTime = new Date();
    baseTime.setHours(baseTime.getHours() + 24 + Math.random() * 24);
    return baseTime.toISOString();
  }

  cleanupExpiredGroups() {
    const now = new Date();
    for (const [groupId, group] of this.groupedOrders.entries()) {
      if (group.expiresAt < now && group.status === 'pending_confirmation') {
        // Return orders to active pool
        group.members.forEach(member => {
          if (!this.activeOrders.has(member.orderId)) {
            this.activeOrders.set(member.orderId, {
              ...member,
              status: 'pending_group'
            });
          }
        });
        
        this.groupedOrders.delete(groupId);
        console.log(`Cleaned up expired group: ${groupId}`);
      }
    }
  }

  getAnalytics() {
    const totalOrders = this.activeOrders.size + this.groupedOrders.size;
    const successfulGroups = Array.from(this.groupedOrders.values())
      .filter(group => group.status === 'confirmed').length;
    
    const totalCO2Saved = successfulGroups * 2.5; // Estimated
    
    return {
      totalOrders,
      activeOrders: this.activeOrders.size,
      groupedOrders: this.groupedOrders.size,
      successfulGroups,
      clusteringSuccessRate: totalOrders > 0 ? (successfulGroups / totalOrders * 100).toFixed(1) : 0,
      totalCO2Saved: `${totalCO2Saved.toFixed(1)} kg`,
      avgGroupSize: this.clusteringHistory.length > 0 
        ? this.clusteringHistory[this.clusteringHistory.length - 1].avgClusterSize?.toFixed(1) || 0
        : 0
    };
  }
}