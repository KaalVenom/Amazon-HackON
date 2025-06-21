import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Leaf } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useAppContext();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-gray-50 p-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {product.isEcoFriendly && (
            <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center space-x-1">
              <Leaf className="w-3 h-3" />
              <span>Eco Choice</span>
            </div>
          )}
          {/* {product.originalPrice && (
            // <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
            //   {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
            // </div>
          )} */}
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-sm text-gray-800 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors leading-tight">
            {product.title}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-orange-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Eco Score */}
          {product.isEcoFriendly && product.ecoScore && (
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded text-xs">
                <Leaf className="w-3 h-3 text-green-600" />
                <span className="font-semibold text-green-700">Eco Score: {product.ecoScore}/100</span>
              </div>
            </div>
          )}

          {/* Delivery Info */}
          <div className="text-xs text-gray-600 mb-3">
            <span className="text-green-600 font-medium">FREE Delivery</span> by tomorrow
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-auto w-full bg-orange-400 hover:bg-orange-500 text-gray-900 py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </Link>
  );
}