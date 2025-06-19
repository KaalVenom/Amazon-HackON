import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, MapPin, User, Truck, Users, Clock, Coins } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { mockNearbyUsers } from '../data/mockData';

export function Checkout() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [selectedDelivery, setSelectedDelivery] = useState<'standard' | 'eco-slot' | 'group'>('standard');
  const [showEcoSlots, setShowEcoSlots] = useState(false);
  const [showGroupOptions, setShowGroupOptions] = useState(false);
  const [selectedEcoSlot, setSelectedEcoSlot] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [formData, setFormData] = useState({
    email: state.user.email,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    pincode: '',
    phone: ''
  });

  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const ecoSlots = [
    { id: 'slot1', time: 'Tomorrow 3-6 PM', label: 'Low-emission window', coins: 100 },
    { id: 'slot2', time: 'Next Day 9-11 AM', label: 'Green delivery slot', coins: 100 },
    { id: 'slot3', time: 'Day after 2-5 PM', label: 'Eco-friendly timing', coins: 100 },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEcoSlotSelect = (slotId: string) => {
    setSelectedEcoSlot(slotId);
    setSelectedDelivery('eco-slot');
    setShowEcoSlots(false);
  };

  const handleGroupSelect = (userId: string) => {
    setSelectedGroup(userId);
    setSelectedDelivery('group');
    setShowGroupOptions(false);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    let ecoCoinsEarned = 0;
    if (selectedDelivery === 'eco-slot') ecoCoinsEarned = 100;
    if (selectedDelivery === 'group') ecoCoinsEarned = 150;

    const newOrder = {
      id: `order-${Date.now()}`,
      items: [...state.cart],
      total,
      date: new Date().toISOString().split('T')[0],
      status: 'processing' as const,
      deliveryMethod: selectedDelivery,
      ecoCoinsEarned
    };

    dispatch({ type: 'ADD_ORDER', payload: newOrder });
    dispatch({ type: 'CLEAR_CART' });
    
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

  if (state.cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms and Delivery Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Billing Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Shipping Address</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Choose Delivery Option</h2>
              
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
                        <h3 className="font-semibold text-green-800">Eco Delivery Slot</h3>
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
                    type="button"
                    onClick={() => setShowEcoSlots(true)}
                    className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Choose Eco Delivery Slot
                  </button>
                </div>

                {/* Group Delivery */}
                <div className={`border rounded-lg p-4 transition-all ${
                  selectedDelivery === 'group' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Users className="w-6 h-6 text-purple-600" />
                      <div>
                        <h3 className="font-semibold text-purple-800">Group Delivery</h3>
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
                        Grouped with: {mockNearbyUsers.find(user => user.id === selectedGroup)?.name}
                      </p>
                    </div>
                  )}
                  
                  <button
                    type="button"
                    onClick={() => setShowGroupOptions(true)}
                    className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Join Group Delivery
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </div>
              
              <div className="space-y-4">
                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center space-x-3">
                    <input type="radio" name="payment" value="cod" defaultChecked className="text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Cash on Delivery</h3>
                      <p className="text-sm text-gray-600">Pay when your order arrives</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 opacity-60">
                  <div className="flex items-center space-x-3">
                    <input type="radio" name="payment" value="card" disabled className="text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Credit/Debit Card</h3>
                      <p className="text-sm text-gray-600">Coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {state.cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 mb-6 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
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
                
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-blue-600">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <Lock className="w-5 h-5" />
                <span>Place Order</span>
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </form>
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
            <h3 className="text-xl font-semibold mb-4">Join Group Delivery</h3>
            <p className="text-gray-600 mb-4">Choose neighbors to group your delivery with:</p>
            <div className="space-y-3">
              {mockNearbyUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleGroupSelect(user.id)}
                  className="w-full p-4 border border-purple-200 rounded-lg hover:bg-purple-50 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-purple-600">
                      <Coins className="w-4 h-4" />
                      <span className="font-semibold">+150</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
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