import express from "express";
import { AISearchService } from "../services/AISearchService.js";
import { enhancedMockProducts } from "../data/mockData.js";

const router = express.Router();
const aiSearchService = new AISearchService();

// Initialize search index with products
aiSearchService.indexProducts(enhancedMockProducts);

// AI-powered product search
router.get("/products", async (req, res) => {
  try {
    const {
      q: query,
      limit,
      inStockOnly,
      ecoFriendlyOnly,
      minRating,
      maxPrice,
    } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const options = {
      limit: parseInt(limit) || 20,
      inStockOnly: inStockOnly === "true",
      ecoFriendlyOnly: ecoFriendlyOnly === "true",
      minRating: minRating ? parseFloat(minRating) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    };

    const results = await aiSearchService.intelligentSearch(
      query,
      enhancedMockProducts,
      options
    );

    res.json({
      query,
      totalResults: results.length,
      results,
      searchAnalytics: aiSearchService.getSearchAnalytics(),
    });
  } catch (error) {
    console.error("Error in AI search:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get search suggestions/autocomplete
router.get("/suggestions", async (req, res) => {
  try {
    const { q: query } = req.query;

    if (!query || query.length < 2) {
      return res.json({ suggestions: [] });
    }

    // Simple suggestion logic - in production, this could use more sophisticated NLP
    const suggestions = enhancedMockProducts
      .filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5)
      .map((product) => ({
        text: product.title,
        category: product.category,
        isEcoFriendly: product.isEcoFriendly,
      }));

    res.json({ suggestions });
  } catch (error) {
    console.error("Error getting search suggestions:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get trending searches
router.get("/trending", async (req, res) => {
  try {
    // Mock trending searches - in production, this would come from analytics
    const trending = [
      "bamboo charcoal toothbrush",
      "organic cotton t-shirt",
      "eco-friendly electronics",
      "sustainable fashion",
      "recyclable packaging",
    ];

    res.json({ trending });
  } catch (error) {
    console.error("Error getting trending searches:", error);
    res.status(500).json({ error: error.message });
  }
});

// Re-index products (for admin use)
router.post("/reindex", async (req, res) => {
  try {
    aiSearchService.indexProducts(enhancedMockProducts);
    res.json({
      message: "Products re-indexed successfully",
      indexedCount: enhancedMockProducts.length,
    });
  } catch (error) {
    console.error("Error re-indexing products:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
