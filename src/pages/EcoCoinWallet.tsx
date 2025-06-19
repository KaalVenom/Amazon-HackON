import React, { useState } from 'react';
import { Coins, Gift, History, Star, ShoppingBag, Leaf } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export function EcoCoinWallet() {
  const { state, dispatch } = useAppContext();
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);

  const rewards = [
    { id: 'voucher-50', name: '₹50 Shopping Voucher', cost: 500, icon: Gift, description: 'Use on your next purchase' },
    { id: 'discount-10', name: 'Extra 10% Discount', cost: 200, icon: Star, description: 'Apply to any order' },
    { id: 'free-shipping', name: 'Free Express Shipping', cost: 150, icon: ShoppingBag, description: 'Next 3 orders' },
    { id: 'plant-tree', name: 'Plant a Tree', cost: 300, icon: Leaf, description: 'We plant a tree in your name' },
  ];

  const handleRedeem = (reward: any) => {
    if (state.user.ecoCoins >= reward.cost) {
      dispatch({ type: 'UPDATE_ECO_COINS', payload: -reward.cost });
      dispatch({
        type: 'ADD_ECO_TRANSACTION',
        payload: {
          id: `trans-${Date.now()}`,
          type: 'redeemed',
          amount: -reward.cost,
          reason: reward.name,
          date: new Date().toISOString().split('T')[0]
        }
      });
      setShowRedeemModal(false);
      setSelectedReward(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Coins className="w-12 h-12 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-800">EcoCoin Wallet</h1>
          </div>
          <p className="text-gray-600">Earn and redeem coins for sustainable choices</p>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl p-8 mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Current Balance</h2>
          <div className="text-6xl font-bold mb-4">{state.user.ecoCoins}</div>
          <p className="text-green-100">EcoCoins earned through sustainable actions</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Rewards Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Gift className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-semibold">Available Rewards</h2>
            </div>
            
            <div className="space-y-4">
              {rewards.map((reward) => {
                const IconComponent = reward.icon;
                const canAfford = state.user.ecoCoins >= reward.cost;
                
                return (
                  <div
                    key={reward.id}
                    className={`border rounded-lg p-4 transition-all ${
                      canAfford ? 'border-green-200 hover:border-green-400' : 'border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${canAfford ? 'bg-green-100' : 'bg-gray-100'}`}>
                          <IconComponent className={`w-5 h-5 ${canAfford ? 'text-green-600' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{reward.name}</h3>
                          <p className="text-sm text-gray-600">{reward.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-2">
                          <Coins className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold">{reward.cost}</span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedReward(reward);
                            setShowRedeemModal(true);
                          }}
                          disabled={!canAfford}
                          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                            canAfford
                              ? 'bg-green-600 hover:bg-green-700 text-white'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-6">
              <History className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold">Transaction History</h2>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {state.user.ecoTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <Coins className={`w-4 h-4 ${
                        transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold">{transaction.reason}</p>
                      <p className="text-sm text-gray-600">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className={`font-bold ${
                    transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'earned' ? '+' : ''}{transaction.amount}
                  </div>
                </div>
              ))}
              
              {state.user.ecoTransactions.length === 0 && (
                <div className="text-center py-8">
                  <History className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No transactions yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How to Earn More */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-6">How to Earn More EcoCoins</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Eco Delivery</h3>
              <p className="text-gray-600 text-sm">Choose eco-friendly delivery slots</p>
              <p className="text-green-600 font-semibold">+100 coins</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Group Shopping</h3>
              <p className="text-gray-600 text-sm">Join group deliveries with neighbors</p>
              <p className="text-purple-600 font-semibold">+150 coins</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Gift className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Return Products</h3>
              <p className="text-gray-600 text-sm">Return items for recycling</p>
              <p className="text-yellow-600 font-semibold">50-200 coins</p>
            </div>
          </div>
        </div>
      </div>

      {/* Redeem Confirmation Modal */}
      {showRedeemModal && selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Confirm Redemption</h3>
            <div className="text-center mb-6">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <selectedReward.icon className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-lg">{selectedReward.name}</h4>
              <p className="text-gray-600 mb-4">{selectedReward.description}</p>
              <div className="flex items-center justify-center space-x-2 text-lg font-bold">
                <Coins className="w-5 h-5 text-yellow-500" />
                <span>{selectedReward.cost} EcoCoins</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowRedeemModal(false);
                  setSelectedReward(null);
                }}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRedeem(selectedReward)}
                disabled={state.user.ecoCoins < selectedReward.cost}
                className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:bg-gray-400"
              >
                Redeem Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}