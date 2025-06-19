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
    image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg',
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
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
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
    image: 'https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg',
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
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg',
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
    image: 'https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg',
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
    image: 'https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg',
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
    image: 'https://images.pexels.com/photos/6621464/pexels-photo-6621464.jpeg',
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
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg',
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