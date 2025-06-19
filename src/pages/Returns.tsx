import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Package, Recycle, Coins, MapPin, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export function Returns() {
  const { state, dispatch } = useAppContext();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [returnMethod, setReturnMethod] = useState<'pickup' | 'dropoff'>('pickup');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const orders = state.user.orders.filter(order => order.status === 'delivered');
  const selectedOrderData = orders.find(order => order.id === (orderId || selectedOrder));

  const categorizeProduct = (productTitle: string) => {
    // Simple categorization logic based on product type
    if (productTitle.toLowerCase().includes('organic') || 
        productTitle.toLowerCase().includes('bamboo') ||
        productTitle.toLowerCase().includes('reusable')) {
      return { category: 'reusable', coins: 200, color: 'green' };
    } else if (productTitle.toLowerCase().includes('electronic') ||
               productTitle.toLowerCase().includes('phone') ||
               productTitle.toLowerCase().includes('headphone')) {
      return { category: 'recyclable', coins: 100, color: 'blue' };
    } else {
      return { category: 'waste', coins: 50, color: 'yellow' };
    }
  };

  const handleReturn = () => {
    if (!selectedOrderData || !selectedItem) return;

    const item = selectedOrderData.items.find(item => item.id === selectedItem);
    if (!item) return;

    const categoryInfo = categorizeProduct(item.title);
    
    dispatch({ type: 'UPDATE_ECO_COINS', payload: categoryInfo.coins });
    dispatch({
      type: 'ADD_ECO_TRANSACTION',
      payload: {
        id: `trans-${Date.now()}`,
        type: 'earned',
        amount: categoryInfo.coins,
        reason: `Product Return - ${categoryInfo.category.charAt(0).toUpperCase() + categoryInfo.category.slice(1)}`,
        date: new Date().toISOString().split('T')[0],
        orderId: selectedOrderData.id
      }
    });

    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 mb-8">
          <Recycle className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-800">Return for EcoCoins</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Return Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Start a Return</h2>
            
            <div className="space-y-6">
              {/* Select Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Order
                </label>
                <select
                  value={orderId || selectedOrder}
                  onChange={(e) => setSelectedOrder(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose an order...</option>
                  {orders.map((order) => (
                    <option key={order.id} value={order.id}>
                      Order #{order.id.slice(-6)} - {new Date(order.date).toLocaleDateString()} - ₹{order.total.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Item */}
              {selectedOrderData && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Item to Return
                  </label>
                  <div className="space-y-3">
                    {selectedOrderData.items.map((item) => {
                      const categoryInfo = categorizeProduct(item.title);
                      return (
                        <div
                          key={item.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedItem === item.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedItem(item.id)}
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-gray-600">₹{item.price.toLocaleString()}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-${categoryInfo.color}-100 text-${categoryInfo.color}-800`}>
                                  {categoryInfo.category}
                                </span>
                                <div className="flex items-center space-x-1">
                                  <Coins className="w-3 h-3 text-yellow-500" />
                                  <span className="text-sm font-semibold">+{categoryInfo.coins}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Return Method */}
              {selectedItem && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Method
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`border rounded-lg p-4 cursor-pointer text-center transition-all ${
                        returnMethod === 'pickup' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setReturnMethod('pickup')}
                    >
                      <Package className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <h3 className="font-semibold">Home Pickup</h3>
                      <p className="text-sm text-gray-600">We'll collect from your address</p>
                    </div>
                    <div
                      className={`border rounded-lg p-4 cursor-pointer text-center transition-all ${
                        returnMethod === 'dropoff' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setReturnMethod('dropoff')}
                    >
                      <MapPin className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <h3 className="font-semibold">Drop-off Point</h3>
                      <p className="text-sm text-gray-600">Drop at nearest collection center</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              {selectedItem && (
                <button
                  onClick={handleReturn}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors font-semibold flex items-center justify-center space-x-2"
                >
                  <Recycle className="w-5 h-5" />
                  <span>Process Return</span>
                </button>
              )}
            </div>
          </div>

          {/* Circular Economy Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Circular Economy Rewards</h2>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Recycle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Return & Earn</h3>
                <p className="text-gray-600">Turn your used products into EcoCoins and contribute to a sustainable future</p>
              </div>

              <div className="space-y-4">
                <div className="border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-green-800">Reusable Items</h4>
                    <div className="flex items-center space-x-1">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold text-green-600">200 coins</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Products that can be refurbished and reused</p>
                  <p className="text-xs text-green-600 mt-1">Examples: Organic products, bamboo items, reusable containers</p>
                </div>

                <div className="border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-800">Recyclable Items</h4>
                    <div className="flex items-center space-x-1">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold text-blue-600">100 coins</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Products that can be broken down and recycled</p>
                  <p className="text-xs text-blue-600 mt-1">Examples: Electronics, phone accessories, gadgets</p>
                </div>

                <div className="border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-yellow-800">Waste Items</h4>
                    <div className="flex items-center space-x-1">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold text-yellow-600">50 coins</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Items that require special disposal</p>
                  <p className="text-xs text-yellow-600 mt-1">Examples: Non-recyclable plastics, mixed materials</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Return Process</h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Select your delivered order</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Choose item to return</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Select pickup or drop-off</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Earn EcoCoins instantly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && selectedOrderData && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md text-center">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Coins className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Return Processed!</h3>
            <p className="text-gray-600 mb-4">
              Your return has been initiated and EcoCoins have been added to your wallet.
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-center space-x-2 text-lg font-bold text-green-600">
                <Coins className="w-6 h-6" />
                <span>+{categorizeProduct(selectedOrderData.items.find(item => item.id === selectedItem)?.title || '').coins} EcoCoins</span>
              </div>
            </div>
            <button
              onClick={() => {
                setShowConfirmation(false);
                window.location.href = '/wallet';
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors font-semibold"
            >
              View Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}