import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, MapPin, Coins, Store } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { AISearchBar } from './AISearchBar';

export function Header() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-gray-900 text-white">
      {/* Top Bar */}
      <div className="bg-gray-800 text-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Deliver to Delhi 110001</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/about" className="hover:text-orange-400 transition-colors">About</Link>
              <Link to="/seller" className="hover:text-orange-400 transition-colors flex items-center space-x-1">
                <Store className="w-4 h-4" />
                <span>Sell on Eco</span>
              </Link>
              <Link to="/orders" className="hover:text-orange-400 transition-colors">Returns & Orders</Link>
              <Link to="/wallet" className="flex items-center space-x-1 hover:text-orange-400 transition-colors">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span>{state.user.ecoCoins} EcoCoins</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-white hover:text-orange-400 transition-colors">
            <div className="bg-orange-500 px-2 py-1 rounded text-black font-bold text-xl">
              Eco
            </div>
            <span className="text-xl font-bold">.in</span>
          </Link>

          {/* AI Search Bar */}
          <AISearchBar onSearch={handleSearch} placeholder="Search products with AI..." />

          {/* Right Side Navigation */}
          <div className="flex items-center space-x-6">
            {/* Green Store Link */}
            <Link
              to="/greenstore"
              className="flex flex-col items-center hover:text-orange-400 transition-colors"
            >
              <span className="text-xs">Eco</span>
              <span className="text-sm font-semibold">Green Store</span>
            </Link>

            {/* Account */}
            <div className="relative group">
              <button className="flex flex-col items-center hover:text-orange-400 transition-colors">
                <span className="text-xs">Hello, {state.user.name}</span>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-semibold">Account & Lists</span>
                  <User className="w-4 h-4" />
                </div>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg">
                  Your Orders
                </Link>
                <Link to="/wallet" className="block px-4 py-2 hover:bg-gray-100">
                  EcoCoin Wallet
                </Link>
                <Link to="/returns" className="block px-4 py-2 hover:bg-gray-100">
                  Returns & EcoCoins
                </Link>
                <Link to="/seller" className="block px-4 py-2 hover:bg-gray-100 rounded-b-lg">
                  Seller Dashboard
                </Link>
              </div>
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center hover:text-orange-400 transition-colors">
              <div className="relative">
                <ShoppingCart className="w-8 h-8" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="ml-1 text-sm font-semibold">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 py-2 text-sm">
            <Link to="/" className="hover:text-orange-400 transition-colors font-medium">All</Link>
            <Link to="/search?q=electronics" className="hover:text-orange-400 transition-colors">Electronics</Link>
            <Link to="/search?q=fashion" className="hover:text-orange-400 transition-colors">Fashion</Link>
            <Link to="/search?q=home" className="hover:text-orange-400 transition-colors">Home & Kitchen</Link>
            <Link to="/search?q=beauty" className="hover:text-orange-400 transition-colors">Beauty</Link>
            <Link to="/search?q=toothbrush" className="hover:text-orange-400 transition-colors">Health Care</Link>
            <Link to="/greenstore" className="text-green-400 hover:text-green-300 transition-colors font-medium">🌱 Green Store</Link>
            <Link to="/seller" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">📦 Sell</Link>
          </div>
        </div>
      </div>
    </header>
  );
}