import kmeans from 'ml-kmeans';

export class KMeansService {
  constructor() {
    this.maxDistance = 2; // 2km radius
    this.maxDeliveryTimeDiff = 24 * 60 * 60 * 1000; // 24 hours
  }

  async performClustering(orders) {
    if (orders.length < 2) return [];

    // Prepare data for clustering
    const points = orders.map(order => [
      order.deliveryLocation.lat,
      order.deliveryLocation.lng,
      this.normalizeTimestamp(order.preferredDeliveryDate)
    ]);

    // Determine optimal number of clusters
    const k = Math.min(Math.ceil(orders.length / 3), 5);
    
    try {
      const result = kmeans(points, k, {
        initialization: 'kmeans++',
        maxIterations: 100
      });

      return this.processClusters(result, orders);
    } catch (error) {
      console.error('K-means clustering failed:', error);
      return this.fallbackClustering(orders);
    }
  }

  async clusterByLocation(orders, targetLocation) {
    // Find orders within delivery radius
    const nearbyOrders = orders.filter(order => {
      const distance = this.calculateDistance(
        targetLocation,
        order.deliveryLocation
      );
      return distance <= this.maxDistance;
    });

    if (nearbyOrders.length < 2) return [];

    return this.performClustering(nearbyOrders);
  }

  processClusters(kmeansResult, orders) {
    const clusters = [];
    
    // Group orders by cluster assignment
    const clusterGroups = {};
    kmeansResult.clusters.forEach((clusterId, index) => {
      if (!clusterGroups[clusterId]) {
        clusterGroups[clusterId] = [];
      }
      clusterGroups[clusterId].push(orders[index]);
    });

    // Process each cluster
    Object.entries(clusterGroups).forEach(([clusterId, clusterOrders]) => {
      if (clusterOrders.length >= 2) {
        // Validate cluster constraints
        if (this.validateCluster(clusterOrders)) {
          clusters.push({
            id: `cluster_${clusterId}_${Date.now()}`,
            members: clusterOrders,
            centroid: this.calculateCentroid(clusterOrders),
            deliveryWindow: this.calculateDeliveryWindow(clusterOrders),
            score: this.calculateClusterScore(clusterOrders)
          });
        }
      }
    });

    return clusters.sort((a, b) => b.score - a.score);
  }

  validateCluster(orders) {
    // Check geographic proximity
    const maxDistance = this.findMaxDistanceInCluster(orders);
    if (maxDistance > this.maxDistance) return false;

    // Check delivery time compatibility
    const deliveryTimes = orders.map(order => 
      new Date(order.preferredDeliveryDate).getTime()
    );
    const timeSpread = Math.max(...deliveryTimes) - Math.min(...deliveryTimes);
    if (timeSpread > this.maxDeliveryTimeDiff) return false;

    return true;
  }

  calculateCentroid(orders) {
    const avgLat = orders.reduce((sum, order) => 
      sum + order.deliveryLocation.lat, 0) / orders.length;
    const avgLng = orders.reduce((sum, order) => 
      sum + order.deliveryLocation.lng, 0) / orders.length;
    
    return { lat: avgLat, lng: avgLng };
  }

  calculateDeliveryWindow(orders) {
    const times = orders.map(order => new Date(order.preferredDeliveryDate));
    const earliest = new Date(Math.min(...times));
    const latest = new Date(Math.max(...times));
    
    return {
      start: earliest.toISOString(),
      end: latest.toISOString(),
      duration: `${Math.ceil((latest - earliest) / (1000 * 60 * 60))} hours`
    };
  }

  calculateClusterScore(orders) {
    // Score based on multiple factors
    let score = 0;
    
    // Size bonus (more orders = better efficiency)
    score += orders.length * 10;
    
    // Proximity bonus (closer orders = less travel)
    const avgDistance = this.calculateAverageDistance(orders);
    score += Math.max(0, (this.maxDistance - avgDistance) * 20);
    
    // Time window bonus (tighter window = easier scheduling)
    const timeSpread = this.calculateTimeSpread(orders);
    score += Math.max(0, (this.maxDeliveryTimeDiff - timeSpread) / (1000 * 60 * 60));
    
    return score;
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

  findMaxDistanceInCluster(orders) {
    let maxDistance = 0;
    for (let i = 0; i < orders.length; i++) {
      for (let j = i + 1; j < orders.length; j++) {
        const distance = this.calculateDistance(
          orders[i].deliveryLocation,
          orders[j].deliveryLocation
        );
        maxDistance = Math.max(maxDistance, distance);
      }
    }
    return maxDistance;
  }

  calculateAverageDistance(orders) {
    if (orders.length < 2) return 0;
    
    let totalDistance = 0;
    let pairCount = 0;
    
    for (let i = 0; i < orders.length; i++) {
      for (let j = i + 1; j < orders.length; j++) {
        totalDistance += this.calculateDistance(
          orders[i].deliveryLocation,
          orders[j].deliveryLocation
        );
        pairCount++;
      }
    }
    
    return pairCount > 0 ? totalDistance / pairCount : 0;
  }

  calculateTimeSpread(orders) {
    const times = orders.map(order => new Date(order.preferredDeliveryDate).getTime());
    return Math.max(...times) - Math.min(...times);
  }

  normalizeTimestamp(dateString) {
    // Normalize timestamp to 0-1 range for clustering
    const date = new Date(dateString);
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return dayOfYear / 365;
  }

  fallbackClustering(orders) {
    // Simple distance-based fallback clustering
    const clusters = [];
    const processed = new Set();
    
    orders.forEach((order, index) => {
      if (processed.has(index)) return;
      
      const cluster = [order];
      processed.add(index);
      
      orders.forEach((otherOrder, otherIndex) => {
        if (processed.has(otherIndex) || index === otherIndex) return;
        
        const distance = this.calculateDistance(
          order.deliveryLocation,
          otherOrder.deliveryLocation
        );
        
        if (distance <= this.maxDistance) {
          cluster.push(otherOrder);
          processed.add(otherIndex);
        }
      });
      
      if (cluster.length >= 2) {
        clusters.push({
          id: `fallback_cluster_${clusters.length}`,
          members: cluster,
          centroid: this.calculateCentroid(cluster),
          deliveryWindow: this.calculateDeliveryWindow(cluster),
          score: this.calculateClusterScore(cluster)
        });
      }
    });
    
    return clusters;
  }
}