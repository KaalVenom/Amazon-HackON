import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { GreenBanner } from '../components/GreenBanner';
import { mockProducts } from '../data/mockData';
import { ChevronRight, Star, Truck, Shield, RotateCcw } from 'lucide-react';

export function HomePage() {
  const featuredProducts = mockProducts.slice(0, 8);
  const toothbrushProducts = mockProducts.filter(product => 
    product.title.toLowerCase().includes('toothbrush')
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <GreenBanner />
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-orange-400 to-orange-500 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">
              Great deals on everything you need
            </h1>
            <p className="text-xl mb-6 opacity-90">
              Shop millions of products with fast delivery and earn EcoCoins for sustainable choices
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span>✓ FREE Delivery on orders above ₹499</span>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span>🌱 Earn EcoCoins on eco-friendly purchases</span>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span>🚚 Same-day delivery available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div className="flex items-center justify-center space-x-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <RotateCcw className="w-5 h-5 text-orange-600" />
              <span>Easy Returns</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>Top Rated</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Toothbrush Section */}
        {toothbrushProducts.length > 0 && (
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Oral Care Essentials</h2>
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
                  <span>See all</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {toothbrushProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Products */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Today's Deals</h2>
              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
                <span>See all deals</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold">Electronics</h3>
                <p className="text-sm text-gray-600">Mobiles, Laptops & more</p>
              </div>
              <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-16 h-16 bg-pink-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">👕</span>
                </div>
                <h3 className="font-semibold">Fashion</h3>
                <p className="text-sm text-gray-600">Clothing & Accessories</p>
              </div>
              <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-semibold">Home & Kitchen</h3>
                <p className="text-sm text-gray-600">Furniture & Appliances</p>
              </div>
              <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">💄</span>
                </div>
                <h3 className="font-semibold">Beauty</h3>
                <p className="text-sm text-gray-600">Skincare & Cosmetics</p>
              </div>
            </div>
          </div>
        </section>

        {/* Eco-Friendly Highlight */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🌱 Shop Sustainably</h2>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Discover eco-friendly products and earn EcoCoins for making sustainable choices. 
              Every green purchase helps build a better future.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600">850+</div>
                <div className="text-sm text-gray-600">EcoCoins Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Eco Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">100+</div>
                <div className="text-sm text-gray-600">Green Brands</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}