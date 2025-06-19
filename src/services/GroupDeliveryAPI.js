const API_BASE = 'http://localhost:3001/api';

export class GroupDeliveryAPI {
  static async joinGroupDelivery(orderData) {
    try {
      const response = await fetch(`${API_BASE}/group-delivery/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error joining group delivery:', error);
      throw error;
    }
  }

  static async getGroupSuggestions(userId) {
    try {
      const response = await fetch(`${API_BASE}/group-delivery/suggestions/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting group suggestions:', error);
      return []; // Return empty array on error
    }
  }

  static async confirmGroupDelivery(groupId, userId) {
    try {
      const response = await fetch(`${API_BASE}/group-delivery/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groupId, userId })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error confirming group delivery:', error);
      throw error;
    }
  }

  static async getRewards(userId) {
    try {
      const response = await fetch(`${API_BASE}/group-delivery/rewards/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting rewards:', error);
      return null;
    }
  }

  static async getAnalytics() {
    try {
      const response = await fetch(`${API_BASE}/group-delivery/analytics`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting analytics:', error);
      return null;
    }
  }
}