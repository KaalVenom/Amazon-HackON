import React from 'react';
import { 
  Coins, 
  Recycle, 
  Clock, 
  Users, 
  Leaf, 
  Brain, 
  Database, 
  Target,
  TrendingUp,
  Award,
  CheckCircle
} from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About EcoCommerce</h1>
            <p className="text-xl opacity-90 mb-8">
              Where sustainability meets shopping. We're revolutionizing e-commerce by making 
              eco-friendly choices rewarding and accessible to everyone.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span>🌍 Carbon Neutral Shipping</span>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span>♻️ Circular Economy</span>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span>🏆 Sustainability Rewards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Green Features Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">🌍 Our Green Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sustainability Meets Shopping - Our Website Helps You Shop Smarter and Greener
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* EcoCoin Wallet */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Coins className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">EcoCoin Wallet</h3>
              <p className="text-gray-600 text-center mb-4">
                Earn coins when you return products, choose eco-delivery slots, or join group deliveries. 
                Redeem rewards using your EcoCoins for discounts and exclusive offers.
              </p>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Current Rate:</span>
                  <span className="font-semibold text-yellow-600">1 EcoCoin = ₹0.10</span>
                </div>
              </div>
            </div>

            {/* Return for EcoCoins */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Recycle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Return for EcoCoins</h3>
              <p className="text-gray-600 text-center mb-4">
                Return past purchases for recycling/reuse and earn coins based on the item type. 
                Support the circular economy while getting rewarded.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Reusable Items:</span>
                  <span className="font-semibold text-green-600">200 coins</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Recyclable Items:</span>
                  <span className="font-semibold text-blue-600">100 coins</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Waste Items:</span>
                  <span className="font-semibold text-yellow-600">50 coins</span>
                </div>
              </div>
            </div>

            {/* Eco Delivery Slot */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Eco Delivery Slots</h3>
              <p className="text-gray-600 text-center mb-4">
                Choose time slots that are optimized for fewer emissions, and earn coins for it. 
                Help reduce carbon footprint with smart delivery scheduling.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold text-blue-600">+100 EcoCoins per order</span>
                </div>
              </div>
            </div>

            {/* Group Shopping */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Group Shopping</h3>
              <p className="text-gray-600 text-center mb-4">
                Join nearby users to receive one combined delivery, reducing environmental impact. 
                Connect with your community while saving the planet.
              </p>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold text-purple-600">+150 EcoCoins per group order</span>
                </div>
              </div>
            </div>

            {/* Green Store */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Green Store</h3>
              <p className="text-gray-600 text-center mb-4">
                A separate section to discover eco-friendly product alternatives easily. 
                Find sustainable options for every product category.
              </p>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-center">
                  <span className="font-semibold text-green-600">500+ Certified Eco Products</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Recommendations Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">🤖 AI-Powered Eco Recommendations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Behind the Scenes: How We Decide What's Green
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Our AI Process</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Database className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Product Tagging</h4>
                      <p className="text-gray-600 text-sm">
                        Each product is tagged with metadata like material, recyclability, 
                        brand sustainability score, and environmental certifications.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Target className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Eco-Friendliness Score (EFS)</h4>
                      <p className="text-gray-600 text-sm">
                        We assign an EFS based on material sustainability, packaging, 
                        brand efforts, and eco-certifications.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Brain className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">AI Recommendation Logic</h4>
                      <p className="text-gray-600 text-sm">
                        Products with EFS above 75 are marked eco-friendly and featured 
                        in our Green Store recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">EFS Calculation</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Material Sustainability</span>
                      <span className="font-semibold text-green-600">30%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '30%'}}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Packaging Impact</span>
                      <span className="font-semibold text-blue-600">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Brand Sustainability</span>
                      <span className="font-semibold text-purple-600">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Certifications</span>
                      <span className="font-semibold text-orange-600">20%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{width: '20%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Pipeline Visualization */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">AI Recommendation Pipeline</h3>
            <div className="flex flex-wrap justify-center items-center space-x-4 space-y-4 md:space-y-0">
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-2">
                <Database className="w-6 h-6 text-blue-600" />
                <span className="font-semibold">Search Query</span>
              </div>
              <div className="text-2xl text-gray-400">→</div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-2">
                <Target className="w-6 h-6 text-green-600" />
                <span className="font-semibold">Filter Products</span>
              </div>
              <div className="text-2xl text-gray-400">→</div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <span className="font-semibold">Calculate EFS</span>
              </div>
              <div className="text-2xl text-gray-400">→</div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-2">
                <Award className="w-6 h-6 text-orange-600" />
                <span className="font-semibold">Tag as Green</span>
              </div>
              <div className="text-2xl text-gray-400">→</div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-2">
                <Leaf className="w-6 h-6 text-green-600" />
                <span className="font-semibold">Green Store</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sustainable Dataset Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sustainable Product Dataset</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Data Sources</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Ecolabel Index Database</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Brand Sustainability Reports</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Third-party Certifications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">User Reviews & Ratings</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Manual Expert Curation</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Example: Bamboo Toothbrush</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Material:</span>
                      <span className="font-semibold text-green-600">Sustainable Bamboo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Packaging:</span>
                      <span className="font-semibold text-green-600">Plastic-free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Biodegradable:</span>
                      <span className="font-semibold text-green-600">Yes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">EFS Score:</span>
                      <span className="font-semibold text-green-600">94/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-semibold text-green-600">Eco-Friendly ✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-4">Join the Sustainable Shopping Revolution</h2>
            <p className="text-xl mb-8 opacity-90">
              Every purchase you make can contribute to a greener future. Start earning EcoCoins today!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => window.location.href = '/greenstore'}
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Green Store
              </button>
              <button 
                onClick={() => window.location.href = '/wallet'}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                View EcoCoin Wallet
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}