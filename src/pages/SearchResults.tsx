import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { GreenBanner } from "../components/GreenBanner";
import { SearchAPI } from "../services/SearchAPI";
import { Search, Sparkles, Filter, SlidersHorizontal } from "lucide-react";

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchAnalytics, setSearchAnalytics] = useState(null);
  const [filters, setFilters] = useState({
    inStockOnly: false,
    ecoFriendlyOnly: false,
    minRating: 0,
    maxPrice: null,
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (query) {
      performAISearch();
    }
  }, [query, filters]);

  const performAISearch = async () => {
    setLoading(true);
    try {
      const searchOptions = {
        limit: 20,
        ...filters,
      };

      const response = await SearchAPI.searchProducts(query, searchOptions);
      setProducts(response.results || []);
      setSearchAnalytics(response.searchAnalytics);
    } catch (error) {
      console.error("Search failed:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GreenBanner />

      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-gray-600 mb-2">
            <Search className="w-5 h-5" />
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>AI-powered search results for:</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">"{query}"</h1>
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-600">
              {loading
                ? "Searching..."
                : `${products.length} ${
                    products.length === 1 ? "product" : "products"
                  } found`}
            </p>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* AI Search Analytics */}
        {/* {searchAnalytics && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">
                AI Search Insights
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-600">Indexed Products:</span>
                <span className="ml-2 font-semibold">
                  {searchAnalytics.indexedProducts}
                </span>
              </div>
              <div>
                <span className="text-blue-600">Cache Size:</span>
                <span className="ml-2 font-semibold">
                  {searchAnalytics.cacheSize}
                </span>
              </div>
              <div>
                <span className="text-blue-600">TF-IDF Documents:</span>
                <span className="ml-2 font-semibold">
                  {searchAnalytics.documentsInTfIdf}
                </span>
              </div>
            </div>
          </div>
        )} */}

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Search Filters</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) =>
                      handleFilterChange("inStockOnly", e.target.checked)
                    }
                    className="text-blue-600"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.ecoFriendlyOnly}
                    onChange={(e) =>
                      handleFilterChange("ecoFriendlyOnly", e.target.checked)
                    }
                    className="text-green-600"
                  />
                  <span>Eco-Friendly Only</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Rating
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) =>
                    handleFilterChange("minRating", parseFloat(e.target.value))
                  }
                  className="w-full border border-gray-300 rounded px-3 py-1"
                >
                  <option value={0}>Any Rating</option>
                  <option value={3}>3+ Stars</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price (₹)
                </label>
                <input
                  type="number"
                  value={filters.maxPrice || ""}
                  onChange={(e) =>
                    handleFilterChange(
                      "maxPrice",
                      e.target.value ? parseFloat(e.target.value) : null
                    )
                  }
                  placeholder="Any price"
                  className="w-full border border-gray-300 rounded px-3 py-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
              <span className="text-lg text-gray-600">
                AI is searching for the best results...
              </span>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                {/* AI Score Indicator - moved down to avoid overlap with discount */}
                {product.aiScore && (
                  <div className="absolute top-12 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>{Math.round(product.aiScore)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && products.length === 0 && query && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              No products found
            </h2>
            <p className="text-gray-500 mb-6">
              Our AI couldn't find any products matching "{query}". Try
              adjusting your search terms or filters.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Suggestions:</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Check your spelling</li>
                <li>• Try more general terms</li>
                <li>• Remove some filters</li>
                <li>• Browse our categories instead</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
