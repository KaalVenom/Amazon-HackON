const API_BASE = 'http://localhost:3001/api';

export class SearchAPI {
  static async searchProducts(query, options = {}) {
    try {
      const params = new URLSearchParams({
        q: query,
        ...options
      });
      
      const response = await fetch(`${API_BASE}/search/products?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  static async getSearchSuggestions(query) {
    try {
      const response = await fetch(`${API_BASE}/search/suggestions?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting search suggestions:', error);
      return { suggestions: [] };
    }
  }

  static async getTrendingSearches() {
    try {
      const response = await fetch(`${API_BASE}/search/trending`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting trending searches:', error);
      return { trending: [] };
    }
  }
}