import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product, CartItem, Order, User, EcoTransaction } from '../types';
import { mockUser } from '../data/mockData';

interface AppState {
  user: User;
  cart: CartItem[];
  searchQuery: string;
  selectedProduct: Product | null;
}

type AppAction =
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_PRODUCT'; payload: Product | null }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'ADD_ECO_TRANSACTION'; payload: EcoTransaction }
  | { type: 'UPDATE_ECO_COINS'; payload: number }
  | { type: 'LOAD_USER_DATA'; payload: User };

const initialState: AppState = {
  user: mockUser,
  cart: [],
  searchQuery: '',
  selectedProduct: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'SET_SELECTED_PRODUCT':
      return { ...state, selectedProduct: action.payload };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'ADD_ORDER':
      return {
        ...state,
        user: {
          ...state.user,
          orders: [action.payload, ...state.user.orders]
        }
      };
    
    case 'ADD_ECO_TRANSACTION':
      return {
        ...state,
        user: {
          ...state.user,
          ecoTransactions: [action.payload, ...state.user.ecoTransactions]
        }
      };
    
    case 'UPDATE_ECO_COINS':
      return {
        ...state,
        user: {
          ...state.user,
          ecoCoins: state.user.ecoCoins + action.payload
        }
      };
    
    case 'LOAD_USER_DATA':
      return { ...state, user: action.payload };
    
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ecoCommerceUser');
    if (savedUser) {
      dispatch({ type: 'LOAD_USER_DATA', payload: JSON.parse(savedUser) });
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ecoCommerceUser', JSON.stringify(state.user));
  }, [state.user]);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('ecoCommerceCart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ecoCommerceCart');
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      cartItems.forEach((item: CartItem) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
      });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};