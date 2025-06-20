import React, { useState, useEffect, useRef } from "react";
import { Search, TrendingUp, Sparkles } from "lucide-react";
import { SearchAPI } from "../services/SearchAPI";
import { useAppContext } from "../context/AppContext";

interface SearchSuggestion {
  text: string;
  category: string;
  isEcoFriendly: boolean;
}

interface AISearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  showSuggestions?: boolean;
}

export function AISearchBar({
  onSearch,
  placeholder = "Search with AI...",
  showSuggestions = true,
}: AISearchBarProps) {
  const { state, dispatch } = useAppContext();
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [trending, setTrending] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load trending searches on mount
    SearchAPI.getTrendingSearches().then((data) => {
      setTrending(data.trending || []);
    });
  }, []);

  useEffect(() => {
    // Get suggestions when query changes
    if (state.searchQuery.length >= 2 && showSuggestions) {
      const timeoutId = setTimeout(async () => {
        setIsLoading(true);
        try {
          const data = await SearchAPI.getSearchSuggestions(state.searchQuery);
          setSuggestions(data.suggestions || []);
        } catch (error) {
          console.error("Error getting suggestions:", error);
        } finally {
          setIsLoading(false);
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setSuggestions([]);
    }
  }, [state.searchQuery, showSuggestions]);

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: "SET_SEARCH_QUERY", payload: value });
    setShowDropdown(value.length > 0);
  };

  const handleSearch = (query?: string) => {
    const searchQuery = query || state.searchQuery;
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: suggestion.text });
    handleSearch(suggestion.text);
  };

  const handleTrendingClick = (trend: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: trend });
    handleSearch(trend);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  const handleFocus = () => {
    if (state.searchQuery.length > 0 || trending.length > 0) {
      setShowDropdown(true);
    }
  };

  return (
    <div ref={searchRef} className="relative flex-1 max-w-3xl">
      <div className="flex">
        <select className="bg-gray-200 text-gray-800 px-3 py-2 rounded-l-md border-r border-gray-300 focus:outline-none">
          <option>All</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Home & Kitchen</option>
          <option>Health & Personal Care</option>
          <option>Beauty</option>
        </select>

        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={state.searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            placeholder={placeholder}
            className="w-full px-4 py-2 text-black focus:outline-none"
            style={{ color: "black" }}
          />

          {/* AI Indicator */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-blue-500 font-medium">AI</span>
          </div>
        </div>

        <button
          onClick={() => handleSearch()}
          className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-r-md transition-colors"
        >
          <Search className="w-5 h-5 text-gray-900" />
        </button>
      </div>

      {/* Dropdown with suggestions and trending */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-96 overflow-y-auto text-black">
          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600">
                <Sparkles className="w-4 h-4" />
                <span>AI Suggestions</span>
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center justify-between group text-black"
                >
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-black">{suggestion.text}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {suggestion.isEcoFriendly && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Eco
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {suggestion.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="p-4 text-center">
              <div className="inline-flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span className="text-sm text-gray-600">
                  Getting AI suggestions...
                </span>
              </div>
            </div>
          )}

          {/* Trending Searches */}
          {trending.length > 0 && suggestions.length === 0 && !isLoading && (
            <div className="p-2">
              <div className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>Trending Searches</span>
              </div>
              {trending.map((trend, index) => (
                <button
                  key={index}
                  onClick={() => handleTrendingClick(trend)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center space-x-2 text-black"
                >
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <span className="text-black">{trend}</span>
                </button>
              ))}
            </div>
          )}

          {/* No results */}
          {state.searchQuery.length >= 2 &&
            suggestions.length === 0 &&
            !isLoading && (
              <div className="p-4 text-center text-gray-600">
                <span className="text-sm">No suggestions found</span>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
