import { Product, User } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Wireless Bluetooth Headphones',
    price: 2999,
    originalPrice: 3999,
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg',
    category: 'Electronics',
    rating: 4.5,
    reviews: 1234,
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
    features: ['Noise Cancellation', '30hr Battery', 'Quick Charge', 'Premium Sound']
  },
  {
    id: '2',
    title: 'Organic Cotton T-Shirt',
    price: 899,
    originalPrice: 1299,
    image: 'https://th.bing.com/th/id/OIP.sg3dxr4VE-0ABLM1Q4U7zwHaLH?w=204&h=306&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    category: 'Fashion',
    rating: 4.8,
    reviews: 567,
    description: 'Soft, comfortable organic cotton t-shirt made with sustainable materials.',
    features: ['100% Organic Cotton', 'Fair Trade', 'Eco-friendly Dyes', 'Comfortable Fit'],
    isEcoFriendly: true,
    ecoScore: 95,
    sustainabilityInfo: 'Made from certified organic cotton with minimal water usage'
  },
  {
    id: '3',
    title: 'Smart Fitness Watch',
    price: 12999,
    originalPrice: 15999,
    image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg',
    category: 'Electronics',
    rating: 4.6,
    reviews: 2341,
    description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
    features: ['GPS Tracking', 'Heart Rate Monitor', 'Waterproof', '7-day Battery']
  },
  {
    id: '4',
    title: 'Bamboo Coffee Cup Set',
    price: 799,
    originalPrice: 999,
    image: 'https://th.bing.com/th/id/OIP.SgWdcDY1tGeZG7ITXGeeIwHaEz?w=272&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    category: 'Home & Kitchen',
    rating: 4.7,
    reviews: 432,
    description: 'Eco-friendly bamboo coffee cup set with leak-proof lid.',
    features: ['100% Bamboo', 'Leak-proof', 'Dishwasher Safe', 'BPA Free'],
    isEcoFriendly: true,
    ecoScore: 92,
    sustainabilityInfo: 'Made from sustainable bamboo, biodegradable and compostable'
  },
  {
    id: '5',
    title: 'Organic Skincare Set',
    price: 1599,
    originalPrice: 2199,
    image: 'https://th.bing.com/th/id/OIP.j_bQksEDU2aiM1f1kHgMnwAAAA?w=274&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    category: 'Beauty',
    rating: 4.9,
    reviews: 876,
    description: 'Complete organic skincare routine with natural ingredients.',
    features: ['All Natural', 'Cruelty Free', 'Organic Certified', 'Sensitive Skin Safe'],
    isEcoFriendly: true,
    ecoScore: 98,
    sustainabilityInfo: 'Certified organic ingredients, recyclable packaging'
  },
  {
    id: '6',
    title: 'Gaming Mechanical Keyboard',
    price: 4999,
    originalPrice: 6499,
    image: 'https://th.bing.com/th/id/OIP.EXwXr2Brthq9d2kMfkqSGQHaF6?w=190&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    category: 'Electronics',
    rating: 4.4,
    reviews: 1567,
    description: 'RGB mechanical gaming keyboard with customizable keys.',
    features: ['Mechanical Switches', 'RGB Lighting', 'Customizable', 'Durable Build']
  },
  // New Toothbrush Products
  {
    id: 'tb-1',
    title: 'Colgate Extra Clean Toothbrush - Pack of 3',
    price: 299,
    originalPrice: 399,
    image: 'https://th.bing.com/th/id/OIP.MHXAWPnkArUSui252M0NtgHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    category: 'Health & Personal Care',
    rating: 4.3,
    reviews: 892,
    description: 'Premium toothbrush set with extra clean bristles for superior plaque removal.',
    features: ['Extra Clean Bristles', 'Ergonomic Handle', 'Pack of 3', 'Dentist Recommended']
  },
  {
    id: 'tb-2',
    title: 'Oral-B Classic Toothbrush Set - Pack of 2',
    price: 249,
    originalPrice: 329,
    image: 'data:image/webp;base64,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',
    category: 'Health & Personal Care',
    rating: 4.5,
    reviews: 1245,
    description: 'Classic toothbrush design with medium bristles for everyday oral care.',
    features: ['Medium Bristles', 'Classic Design', 'Pack of 2', 'Trusted Brand']
  },
  {
    id: 'tb-3',
    title: 'Dr. Fresh Toothbrush Value Pack - Set of 4',
    price: 399,
    originalPrice: 549,
    image: 'data:image/webp;base64,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',
    category: 'Health & Personal Care',
    rating: 4.2,
    reviews: 567,
    description: 'Value pack of premium toothbrushes with advanced cleaning technology.',
    features: ['Advanced Cleaning', 'Value Pack of 4', 'Multi-color', 'Family Size']
  },
  {
    id: 'tb-4',
    title: 'Bamboo Charcoal Toothbrush - Eco-Friendly Pack of 2',
    price: 349,
    originalPrice: 449,
    image: 'data:image/webp;base64,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',
    category: 'Health & Personal Care',
    rating: 4.8,
    reviews: 734,
    description: 'Sustainable bamboo toothbrush with charcoal-infused bristles for natural whitening.',
    features: ['100% Bamboo Handle', 'Charcoal Bristles', 'Biodegradable', 'Natural Whitening'],
    isEcoFriendly: true,
    ecoScore: 94,
    sustainabilityInfo: 'Made from sustainable bamboo with biodegradable bristles'
  }
];

export const ecoProducts: Product[] = [
  {
    id: 'eco-1',
    title: 'Solar Power Bank 20000mAh',
    price: 1899,
    originalPrice: 2499,
    image: 'https://images.pexels.com/photos/159876/solar-panel-array-power-sun-electricity-159876.jpeg',
    category: 'Electronics',
    rating: 4.6,
    reviews: 543,
    description: 'Eco-friendly solar power bank with fast charging capabilities.',
    features: ['Solar Charging', '20000mAh Capacity', 'Waterproof', 'LED Flashlight'],
    isEcoFriendly: true,
    ecoScore: 89,
    sustainabilityInfo: 'Reduces reliance on grid electricity, solar-powered charging'
  },
  {
    id: 'eco-2',
    title: 'Recycled Plastic Backpack',
    price: 2299,
    originalPrice: 2999,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg',
    category: 'Fashion',
    rating: 4.8,
    reviews: 432,
    description: 'Stylish backpack made from 100% recycled plastic bottles.',
    features: ['Recycled Materials', 'Water Resistant', 'Laptop Compartment', 'Ergonomic'],
    isEcoFriendly: true,
    ecoScore: 94,
    sustainabilityInfo: 'Made from 25 recycled plastic bottles, carbon-neutral shipping'
  },
  {
    id: 'eco-3',
    title: 'Biodegradable Phone Case',
    price: 599,
    originalPrice: 899,
    image: 'https://images.pexels.com/photos/163065/mobile-phone-android-apps-phone-163065.jpeg',
    category: 'Electronics',
    rating: 4.5,
    reviews: 234,
    description: 'Fully biodegradable phone case made from plant-based materials.',
    features: ['100% Biodegradable', 'Drop Protection', 'Natural Materials', 'Compostable'],
    isEcoFriendly: true,
    ecoScore: 96,
    sustainabilityInfo: 'Breaks down completely in compost within 6 months'
  },
  {
    id: 'eco-4',
    title: 'Organic Hemp Clothing Set',
    price: 2799,
    originalPrice: 3599,
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    category: 'Fashion',
    rating: 4.9,
    reviews: 654,
    description: 'Comfortable clothing set made from organic hemp fibers.',
    features: ['Organic Hemp', 'Hypoallergenic', 'Moisture Wicking', 'Durable'],
    isEcoFriendly: true,
    ecoScore: 97,
    sustainabilityInfo: 'Hemp requires 50% less water than cotton to grow'
  },
  // Add eco-friendly toothbrush to Green Store
  {
    id: 'eco-tb-1',
    title: 'Bamboo Charcoal Toothbrush - Eco-Friendly Pack of 2',
    price: 349,
    originalPrice: 449,
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg',
    category: 'Health & Personal Care',
    rating: 4.8,
    reviews: 734,
    description: 'Sustainable bamboo toothbrush with charcoal-infused bristles for natural whitening.',
    features: ['100% Bamboo Handle', 'Charcoal Bristles', 'Biodegradable', 'Natural Whitening'],
    isEcoFriendly: true,
    ecoScore: 94,
    sustainabilityInfo: 'Made from sustainable bamboo with biodegradable bristles'
  },
  {
    id: 'eco-tb-2',
    title: 'Organic Neem Wood Toothbrush Set - Pack of 3',
    price: 449,
    originalPrice: 599,
    image: 'https://images.pexels.com/photos/6621464/pexels-photo-6621464.jpeg',
    category: 'Health & Personal Care',
    rating: 4.7,
    reviews: 456,
    description: 'Traditional neem wood toothbrush with natural antibacterial properties.',
    features: ['Neem Wood Handle', 'Natural Antibacterial', 'Soft Bristles', 'Ayurvedic'],
    isEcoFriendly: true,
    ecoScore: 92,
    sustainabilityInfo: 'Neem wood naturally prevents bacterial growth, fully biodegradable'
  }
];

export const mockUser: User = {
  id: 'user-1',
  name: 'EcoWarrior',
  email: 'eco@example.com',
  ecoCoins: 850,
  location: {
    lat: 28.6139,
    lng: 77.2090,
    address: 'Delhi, India'
  },
  orders: [
    {
      id: 'order-1',
      items: [
        { ...mockProducts[1], quantity: 2 },
        { ...mockProducts[3], quantity: 1 }
      ],
      total: 2597,
      date: '2024-01-15',
      status: 'delivered',
      deliveryMethod: 'eco-slot',
      ecoCoinsEarned: 100
    },
    {
      id: 'order-2',
      items: [
        { ...mockProducts[4], quantity: 1 }
      ],
      total: 1599,
      date: '2024-01-10',
      status: 'delivered',
      deliveryMethod: 'group',
      ecoCoinsEarned: 150
    }
  ],
  ecoTransactions: [
    {
      id: 'trans-1',
      type: 'earned',
      amount: 100,
      reason: 'Eco Delivery Slot',
      date: '2024-01-15',
      orderId: 'order-1'
    },
    {
      id: 'trans-2',
      type: 'earned',
      amount: 150,
      reason: 'Group Delivery',
      date: '2024-01-10',
      orderId: 'order-2'
    },
    {
      id: 'trans-3',
      type: 'earned',
      amount: 200,
      reason: 'Product Return - Reusable',
      date: '2024-01-08'
    },
    {
      id: 'trans-4',
      type: 'redeemed',
      amount: -200,
      reason: 'Extra 10% Discount Voucher',
      date: '2024-01-05'
    }
  ]
};

export const mockNearbyUsers = [
  { id: 'user-2', name: 'GreenUser1', lat: 28.6149, lng: 77.2100, address: 'Connaught Place' },
  { id: 'user-3', name: 'EcoFriend2', lat: 28.6129, lng: 77.2080, address: 'India Gate' },
  { id: 'user-4', name: 'SustainableShopper', lat: 28.6159, lng: 77.2110, address: 'Rajiv Chowk' },
  { id: 'user-5', name: 'ClimateHero', lat: 28.6135, lng: 77.2095, address: 'Barakhamba Road' }
];