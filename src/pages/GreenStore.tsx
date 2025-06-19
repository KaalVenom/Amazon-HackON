import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Leaf, Star, Search } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ecoProducts } from '../data/mockData';

export function GreenStore() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const filteredProducts = useMemo(() => {
    if (!query) return ecoProducts;
    
    return ecoProducts.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.sustainabilityInfo?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Leaf className="w-12 h-12 text-green-300" />
              <h1 className="text-5xl font-bold">Green Store</h1>
            </div>
            <p className="text-xl mb-8 opacity-90">
              Discover eco-friendly alternatives that make a difference
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>Certified Eco Products</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <Leaf className="w-5 h-5 text-green-300" />
                <span>Sustainable Materials</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search Results Header */}
        {query && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-green-600 mb-2">
              <Search className="w-5 h-5" />
              <span>Eco-friendly alternatives for:</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">"{query}"</h2>
            <p className="text-gray-600 mt-2">
              {filteredProducts.length} sustainable {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16">
            <div className="text-green-400 mb-4">
              <Leaf className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No eco products found</h2>
            <p className="text-gray-500 mb-6">
              We couldn't find sustainable alternatives for "{query}" right now.
            </p>
            <button 
              onClick={() => window.location.href = '/greenstore'}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Browse All Eco Products
            </button>
          </div>
        ) : (
          <>
            {/* Featured Categories */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Shop by Category</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Organic Fashion</h3>
                  <p className="text-gray-600 text-sm">Sustainable clothing & accessories</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Star className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Eco Electronics</h3>
                  <p className="text-gray-600 text-sm">Energy-efficient & recyclable tech</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Green Home</h3>
                  <p className="text-gray-600 text-sm">Sustainable home & kitchen products</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Star className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Natural Beauty</h3>
                  <p className="text-gray-600 text-sm">Organic skincare & cosmetics</p>
                </div>
              </div>
            </div>

            {/* All Products */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">All Eco Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {ecoProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Sustainability Promise */}
        <div className="bg-green-50 rounded-xl p-8 mt-16 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Our Sustainability Promise</h2>
          <p className="text-green-700 mb-6 max-w-3xl mx-auto">
            Every product in our Green Store meets strict environmental standards. We carefully vet each item 
            for sustainability, ethical sourcing, and minimal environmental impact. When you shop green, 
            you're not just buying a product – you're investing in a better future.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-green-700">
            <div>
              <div className="text-3xl font-bold text-green-600">100%</div>
              <div className="text-sm">Eco-Certified Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">0%</div>
              <div className="text-sm">Harmful Chemicals</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">50%</div>
              <div className="text-sm">Less Carbon Footprint</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}