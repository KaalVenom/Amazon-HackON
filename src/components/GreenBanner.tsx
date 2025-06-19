import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export function GreenBanner() {
  const { state } = useAppContext();
  const navigate = useNavigate();

  const handleThinkGreen = () => {
    navigate(`/greenstore${state.searchQuery ? `?q=${encodeURIComponent(state.searchQuery)}` : ''}`);
  };

  if (!state.searchQuery) return null;

  return (
    <div className="fixed top-20 right-4 z-40 animate-bounce">
      <button
        onClick={handleThinkGreen}
        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2"
      >
        <Leaf className="w-5 h-5" />
        <span className="font-semibold">Think Green First!</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}