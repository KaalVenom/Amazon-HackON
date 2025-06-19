export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  isEcoFriendly?: boolean;
  ecoScore?: number;
  sustainabilityInfo?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'delivered' | 'shipped' | 'processing';
  deliveryMethod?: 'eco-slot' | 'group' | 'standard';
  ecoCoinsEarned?: number;
}

export interface EcoTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  amount: number;
  reason: string;
  date: string;
  orderId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  ecoCoins: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  orders: Order[];
  ecoTransactions: EcoTransaction[];
}