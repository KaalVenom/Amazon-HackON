export class ReinforcementLearningAgent {
  constructor() {
    this.qTable = new Map(); // State-action value table
    this.learningRate = 0.1;
    this.discountFactor = 0.9;
    this.explorationRate = 0.1;
    this.groupingHistory = [];
    this.successMetrics = {
      totalAttempts: 0,
      successfulGroups: 0,
      avgGroupSize: 0,
      avgConfirmationTime: 0
    };
  }

  optimizeGrouping(locationClusters, similarUsers, history) {
    // State representation
    const state = this.encodeState({
      clusterCount: locationClusters.length,
      avgClusterSize: this.calculateAvgClusterSize(locationClusters),
      userSimilarityScore: this.calculateUserSimilarity(similarUsers),
      historicalSuccessRate: this.calculateHistoricalSuccessRate(history),
      timeOfDay: new Date().getHours(),
      dayOfWeek: new Date().getDay()
    });

    // Choose action (grouping strategy)
    const action = this.chooseAction(state);
    
    // Apply action to optimize clusters
    const optimizedClusters = this.applyAction(action, locationClusters, similarUsers);
    
    // Store state-action pair for future learning
    this.storeStateAction(state, action);
    
    return optimizedClusters;
  }

  optimizeClusters(clusters, history) {
    return clusters.map(cluster => {
      const optimizedCluster = { ...cluster };
      
      // Apply RL-based optimizations
      const state = this.encodeClusterState(cluster);
      const action = this.chooseClusterAction(state);
      
      switch (action) {
        case 'expand':
          optimizedCluster.score *= 1.2; // Boost score for larger groups
          break;
        case 'tighten':
          optimizedCluster.maxDistance = Math.min(cluster.maxDistance || 2, 1.5);
          break;
        case 'relax_time':
          optimizedCluster.timeFlexibility = 'high';
          break;
        case 'prioritize_similarity':
          optimizedCluster.score += this.calculateSimilarityBonus(cluster.members);
          break;
      }
      
      return optimizedCluster;
    });
  }

  updateReward(groupId, reward) {
    // Update Q-table based on group success/failure
    this.successMetrics.totalAttempts++;
    
    if (reward > 0) {
      this.successMetrics.successfulGroups++;
    }
    
    // Find the state-action pair for this group
    const groupHistory = this.groupingHistory.find(h => h.groupId === groupId);
    if (groupHistory) {
      const { state, action } = groupHistory;
      this.updateQValue(state, action, reward);
    }
    
    // Update success rate
    this.successMetrics.successRate = 
      this.successMetrics.successfulGroups / this.successMetrics.totalAttempts;
    
    console.log(`RL Agent updated: Success rate ${(this.successMetrics.successRate * 100).toFixed(1)}%`);
  }

  encodeState(stateData) {
    // Convert state data to string key for Q-table
    return [
      Math.floor(stateData.clusterCount / 2), // Discretize cluster count
      Math.floor(stateData.avgClusterSize),
      Math.floor(stateData.userSimilarityScore * 10),
      Math.floor(stateData.historicalSuccessRate * 10),
      Math.floor(stateData.timeOfDay / 6), // 4 time periods
      stateData.dayOfWeek < 5 ? 'weekday' : 'weekend'
    ].join('_');
  }

  encodeClusterState(cluster) {
    return [
      cluster.members.length,
      Math.floor(cluster.score / 10),
      cluster.deliveryWindow ? 'scheduled' : 'flexible'
    ].join('_');
  }

  chooseAction(state) {
    const actions = ['conservative', 'aggressive', 'balanced', 'similarity_focused'];
    
    // Epsilon-greedy strategy
    if (Math.random() < this.explorationRate) {
      // Explore: random action
      return actions[Math.floor(Math.random() * actions.length)];
    } else {
      // Exploit: best known action
      return this.getBestAction(state, actions);
    }
  }

  chooseClusterAction(state) {
    const actions = ['expand', 'tighten', 'relax_time', 'prioritize_similarity'];
    return this.getBestAction(state, actions);
  }

  getBestAction(state, actions) {
    let bestAction = actions[0];
    let bestValue = this.getQValue(state, bestAction);
    
    actions.forEach(action => {
      const value = this.getQValue(state, action);
      if (value > bestValue) {
        bestValue = value;
        bestAction = action;
      }
    });
    
    return bestAction;
  }

  getQValue(state, action) {
    const key = `${state}_${action}`;
    return this.qTable.get(key) || 0;
  }

  updateQValue(state, action, reward) {
    const key = `${state}_${action}`;
    const currentQ = this.getQValue(state, action);
    
    // Q-learning update rule
    const newQ = currentQ + this.learningRate * (reward - currentQ);
    this.qTable.set(key, newQ);
  }

  applyAction(action, clusters, similarUsers) {
    switch (action) {
      case 'conservative':
        return this.applyConservativeStrategy(clusters);
      case 'aggressive':
        return this.applyAggressiveStrategy(clusters);
      case 'balanced':
        return this.applyBalancedStrategy(clusters);
      case 'similarity_focused':
        return this.applySimilarityStrategy(clusters, similarUsers);
      default:
        return clusters;
    }
  }

  applyConservativeStrategy(clusters) {
    // Prefer smaller, more certain groups
    return clusters
      .filter(cluster => cluster.members.length >= 2 && cluster.members.length <= 3)
      .map(cluster => ({
        ...cluster,
        score: cluster.score * 1.1,
        confidence: 'high'
      }));
  }

  applyAggressiveStrategy(clusters) {
    // Try to form larger groups
    return clusters
      .filter(cluster => cluster.members.length >= 2)
      .map(cluster => ({
        ...cluster,
        score: cluster.score * (1 + cluster.members.length * 0.1),
        confidence: 'medium'
      }));
  }

  applyBalancedStrategy(clusters) {
    // Balance between group size and success probability
    return clusters
      .filter(cluster => cluster.members.length >= 2)
      .map(cluster => {
        const sizeBonus = Math.min(cluster.members.length * 0.05, 0.3);
        return {
          ...cluster,
          score: cluster.score * (1 + sizeBonus),
          confidence: 'medium'
        };
      });
  }

  applySimilarityStrategy(clusters, similarUsers) {
    // Prioritize groups with similar users
    return clusters
      .filter(cluster => cluster.members.length >= 2)
      .map(cluster => {
        const similarityBonus = this.calculateSimilarityBonus(cluster.members);
        return {
          ...cluster,
          score: cluster.score * (1 + similarityBonus),
          confidence: 'high'
        };
      });
  }

  calculateAvgClusterSize(clusters) {
    if (clusters.length === 0) return 0;
    return clusters.reduce((sum, cluster) => sum + cluster.members.length, 0) / clusters.length;
  }

  calculateUserSimilarity(similarUsers) {
    // Simple similarity score based on user count
    return Math.min(similarUsers.length / 10, 1);
  }

  calculateHistoricalSuccessRate(history) {
    if (history.length === 0) return 0.5; // Default neutral rate
    
    const recentHistory = history.slice(-10); // Last 10 clustering attempts
    const successful = recentHistory.filter(h => h.avgClusterSize >= 2).length;
    return successful / recentHistory.length;
  }

  calculateSimilarityBonus(members) {
    // Calculate bonus based on product category overlap
    if (members.length < 2) return 0;
    
    const allCategories = members.flatMap(member => member.productCategories || []);
    const uniqueCategories = new Set(allCategories);
    const overlapRatio = (allCategories.length - uniqueCategories.size) / allCategories.length;
    
    return Math.min(overlapRatio, 0.5); // Max 50% bonus
  }

  storeStateAction(state, action) {
    this.groupingHistory.push({
      groupId: `group_${Date.now()}`,
      state,
      action,
      timestamp: new Date()
    });
    
    // Keep only recent history
    if (this.groupingHistory.length > 100) {
      this.groupingHistory = this.groupingHistory.slice(-50);
    }
  }

  getPerformanceMetrics() {
    return {
      ...this.successMetrics,
      qTableSize: this.qTable.size,
      explorationRate: this.explorationRate,
      recentActions: this.groupingHistory.slice(-5).map(h => h.action)
    };
  }

  // Adaptive learning rate based on performance
  adaptLearningParameters() {
    if (this.successMetrics.totalAttempts > 20) {
      if (this.successMetrics.successRate > 0.7) {
        // High success rate: reduce exploration
        this.explorationRate = Math.max(0.05, this.explorationRate * 0.95);
      } else if (this.successMetrics.successRate < 0.3) {
        // Low success rate: increase exploration
        this.explorationRate = Math.min(0.3, this.explorationRate * 1.1);
      }
    }
  }
}