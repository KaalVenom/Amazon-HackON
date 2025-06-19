import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Users, Clock, MapPin, Coins, CreditCard, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { GroupDeliveryAPI } from '../services/GroupDeliveryAPI';

export function BuyNow() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [selectedDelivery, setSelectedDelivery] = useState<'standard' | 'eco-slot' | 'group'>('standard');
  const [showEcoSlots, setShowEcoSlots] = useState(false);
  const [showGroupOptions, setShowGroupOptions] = useState(false);
  const [selectedEcoSlot, setSelectedEcoSlot] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [groupSuggestions, setGroupSuggestions] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(false);

  const product = state.selectedProduct;

  useEffect(() => {
    // Load group suggestions when component mounts
    if (product) {
      loadGroupSuggestions();
    }
  }, [product]);

  const loadGroupSuggestions = async () => {
    setLoadingGroups(true);
    try {
      const suggestions = await GroupDeliveryAPI.getGroupSuggestions(state.user.id);
      setGroupSuggestions(suggestions);
    } catch (error) {
      console.error('Failed to load group suggestions:', error);
    } finally {
      setLoadingGroups(false);
    }
  };

  if (!product) {
    navigate('/');
    return null;
  }

  const ecoSlots = [
    { id: 'slot1', time: 'Tomorrow 3-6 PM', label: 'Low-emission window', coins: 100 },
    { id: 'slot2', time: 'Next Day 9-11 AM', label: 'Green delivery slot', coins: 100 },
    { id: 'slot3', time: 'Day after 2-5 PM', label: 'Eco-friendly timing', coins: 100 },
  ];

  const handleEcoSlotSelect = (slotId: string) => {
    setSelectedEcoSlot(slotId);
    setSelectedDelivery('eco-slot');
    setShowEcoSlots(false);
  };

  const handleGroupSelect = async (groupId: string) => {
    try {
      // Join the group delivery
      const orderData = {
        userId: state.user.id,
        items: [product],
        deliveryLocation: state.user.location,
        preferredDeliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };

      await GroupDeliveryAPI.joinGroupDelivery(orderData);
      setSelectedGroup(groupId);
      setSelectedDelivery('group');
      setShowGroupOptions(false);
    } catch (error) {
      console.error('Failed to join group:', error);
    }
  };

  const handlePlaceOrder = async () => {
    let ecoCoinsEarned = 0;
    if (selectedDelivery === 'eco-slot') ecoCoinsEarned = 100;
    if (selectedDelivery === 'group') ecoCoinsEarned = 150;

    const newOrder = {
      id: `order-${Date.now()}`,
      items: [{ ...product, quantity: 1 }],
      total: product.price,
      date: new Date().toISOString().split('T')[0],
      status: 'processing' as const,
      deliveryMethod: selectedDelivery,
      ecoCoinsEarned
    };

    dispatch({ type: 'ADD_ORDER', payload: newOrder });
    
    if (ecoCoinsEarned > 0) {
      dispatch({ type: 'UPDATE_ECO_COINS', payload: ecoCoinsEarned });
      dispatch({
        type: 'ADD_ECO_TRANSACTION',
        payload: {
          id: `trans-${Date.now()}`,
          type: 'earned',
          amount: ecoCoinsEarned,
          reason: selectedDelivery === 'eco-slot' ? 'Eco Delivery Slot' : 'Group Delivery',
          date: new Date().toISOString().split('T')[0],
          orderId: newOrder.id
        }
      });
    }

    navigate('/order-confirmation', { state: { order: newOrder } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Complete Your Purchase</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{product.title}</h3>
                  <p className="text-gray-600">{product.category}</p>
                  <p className="text-xl font-bold text-blue-600">₹{product.price.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <h2 className="text-xl font-semibold">Choose Delivery Option</h2>
                <Sparkles className="w-5 h-5 text-blue-500" />
              </div>
              
              <div className="space-y-4">
                {/* Standard Delivery */}
                <div className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedDelivery === 'standard' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedDelivery('standard')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Truck className="w-6 h-6 text-gray-600" />
                      <div>
                        <h3 className="font-semibold">Standard Delivery</h3>
                        <p className="text-sm text-gray-600">2-3 business days</p>
                      </div>
                    </div>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                </div>

                {/* Eco Slot Delivery */}
                <div className={`border rounded-lg p-4 transition-all ${
                  selectedDelivery === 'eco-slot' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-6 h-6 text-green-600" />
                      <div>
                        <h3 className="font-semibold text-green-800">AI-Optimized Eco Delivery</h3>
                        <p className="text-sm text-green-600">Choose eco-friendly delivery time</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span className="text-green-600 font-semibold">+100 EcoCoins</span>
                    </div>
                  </div>
                  
                  {selectedEcoSlot && (
                    <div className="mt-3 p-3 bg-green-100 rounded-lg">
                      <p className="text-green-800 font-medium">
                        Selected: {ecoSlots.find(slot => slot.id === selectedEcoSlot)?.time}
                      </p>
                    </div>
                  )}
                  
                  <button
                    onClick={() => setShowEcoSlots(true)}
                    className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Choose Eco Delivery Slot
                  </button>
                </div>

                {/* AI Group Delivery */}
                <div className={`border rounded-lg p-4 transition-all ${
                  selectedDelivery === 'group' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Users className="w-6 h-6 text-purple-600" />
                      <div>
                        <h3 className="font-semibold text-purple-800">AI Group Delivery</h3>
                        <p className="text-sm text-purple-600">Join neighbors for shared delivery</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span className="text-purple-600 font-semibold">+150 EcoCoins</span>
                    </div>
                  </div>
                  
                  {selectedGroup && (
                    <div className="mt-3 p-3 bg-purple-100 rounded-lg">
                      <p className="text-purple-800 font-medium">
                        Joined group delivery successfully!
                      </p>
                    </div>
                  )}
                  
                  <button
                    onClick={() => setShowGroupOptions(true)}
                    disabled={loadingGroups}
                    className="mt-3 w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    {loadingGroups ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Finding Groups...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Find AI Group</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Product Price</span>
                  <span className="font-semibold">₹{product.price.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                
                {(selectedDelivery === 'eco-slot' || selectedDelivery === 'group') && (
                  <div className="flex justify-between text-green-600">
                    <span>EcoCoins Earned</span>
                    <span className="font-semibold">
                      +{selectedDelivery === 'eco-slot' ? '100' : '150'}
                    </span>
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">₹{product.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>Place Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Eco Slot Modal */}
      {showEcoSlots && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Choose Eco Delivery Slot</h3>
            <div className="space-y-3">
              {ecoSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleEcoSlotSelect(slot.id)}
                  className="w-full p-4 border border-green-200 rounded-lg hover:bg-green-50 text-left"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{slot.time}</p>
                      <p className="text-sm text-gray-600">{slot.label}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <Coins className="w-4 h-4" />
                      <span className="font-semibold">+{slot.coins}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowEcoSlots(false)}
              className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Group Options Modal */}
      {showGroupOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="text-xl font-semibold">AI Group Delivery</h3>
            </div>
            
            {groupSuggestions.length > 0 ? (
              <>
                <p className="text-gray-600 mb-4">AI found these optimal group delivery options:</p>
                <div className="space-y-3">
                  {groupSuggestions.slice(0, 3).map((group) => (
                    <button
                      key={group.groupId}
                      onClick={() => handleGroupSelect(group.groupId)}
                      className="w-full p-4 border border-purple-200 rounded-lg hover:bg-purple-50 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-purple-600" />
                          <div>
                            <p className="font-semibold">{group.members.length} members</p>
                            <p className="text-sm text-gray-600">
                              {group.estimatedSavings.co2Reduction} CO₂ saved
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-purple-600">
                          <Coins className="w-4 h-4" />
                          <span className="font-semibold">+{group.estimatedSavings.ecoCoins}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No group delivery options available right now.</p>
                <p className="text-sm text-gray-500">Try again in a few minutes or choose eco delivery slot instead.</p>
              </div>
            )}
            
            <button
              onClick={() => setShowGroupOptions(false)}
              className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}