// Enhanced mock data with additional fields for AI search
export const enhancedMockProducts = [
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
    features: ['Noise Cancellation', '30hr Battery', 'Quick Charge', 'Premium Sound'],
    inStock: true,
    dateAdded: '2024-01-15',
    supportsReturnAtEndOfLife: true,
    ecoScore: 65
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
    sustainabilityInfo: 'Made from certified organic cotton with minimal water usage',
    inStock: true,
    dateAdded: '2024-01-20',
    supportsReturnAtEndOfLife: true
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
    features: ['GPS Tracking', 'Heart Rate Monitor', 'Waterproof', '7-day Battery'],
    inStock: true,
    dateAdded: '2024-01-10',
    supportsReturnAtEndOfLife: true,
    ecoScore: 70
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
    sustainabilityInfo: 'Made from sustainable bamboo, biodegradable and compostable',
    inStock: true,
    dateAdded: '2024-01-25',
    supportsReturnAtEndOfLife: true
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
    sustainabilityInfo: 'Certified organic ingredients, recyclable packaging',
    inStock: true,
    dateAdded: '2024-01-18',
    supportsReturnAtEndOfLife: false
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
    features: ['Mechanical Switches', 'RGB Lighting', 'Customizable', 'Durable Build'],
    inStock: false,
    dateAdded: '2024-01-05',
    supportsReturnAtEndOfLife: true,
    ecoScore: 55
  },
  // Toothbrush Products
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
    features: ['Extra Clean Bristles', 'Ergonomic Handle', 'Pack of 3', 'Dentist Recommended'],
    inStock: true,
    dateAdded: '2024-01-22',
    supportsReturnAtEndOfLife: false,
    ecoScore: 45
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
    features: ['Medium Bristles', 'Classic Design', 'Pack of 2', 'Trusted Brand'],
    inStock: true,
    dateAdded: '2024-01-20',
    supportsReturnAtEndOfLife: false,
    ecoScore: 50
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
    features: ['Advanced Cleaning', 'Value Pack of 4', 'Multi-color', 'Family Size'],
    inStock: true,
    dateAdded: '2024-01-15',
    supportsReturnAtEndOfLife: false,
    ecoScore: 40
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
    sustainabilityInfo: 'Made from sustainable bamboo with biodegradable bristles',
    inStock: true,
    dateAdded: '2024-01-28',
    supportsReturnAtEndOfLife: true
  },
  // Additional products for better search testing
  {
    id: 'eco-phone-1',
    title: 'Fairphone 4 - Sustainable Smartphone',
    price: 45999,
    originalPrice: 49999,
    image: 'https://images.pexels.com/photos/163065/mobile-phone-android-apps-phone-163065.jpeg',
    category: 'Electronics',
    rating: 4.6,
    reviews: 423,
    description: 'Modular smartphone designed for longevity with replaceable parts and ethical sourcing.',
    features: ['Modular Design', 'Replaceable Parts', 'Ethical Sourcing', '5G Ready'],
    isEcoFriendly: true,
    ecoScore: 88,
    sustainabilityInfo: 'Fair trade materials, modular design for repairability',
    inStock: true,
    dateAdded: '2024-01-30',
    supportsReturnAtEndOfLife: true
  },
  {
    id: 'green-laptop-1',
    title: 'Framework Laptop - Modular & Repairable',
    price: 89999,
    originalPrice: 94999,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
    category: 'Electronics',
    rating: 4.7,
    reviews: 234,
    description: 'Revolutionary modular laptop with upgradeable ports and components.',
    features: ['Modular Ports', 'Upgradeable', 'Repairable Design', 'Long-lasting'],
    isEcoFriendly: true,
    ecoScore: 85,
    sustainabilityInfo: 'Designed for longevity and repairability to reduce e-waste',
    inStock: true,
    dateAdded: '2024-02-01',
    supportsReturnAtEndOfLife: true
  }
];

// Mock users for group delivery clustering
export const mockUsers = [
  {
    id: 'user-1',
    name: 'EcoWarrior',
    email: 'eco@example.com',
    location: { lat: 28.6139, lng: 77.2090, address: 'Delhi, India' },
    orders: [],
    ecoTransactions: []
  },
  {
    id: 'user-2',
    name: 'GreenUser1',
    email: 'green1@example.com',
    location: { lat: 28.6149, lng: 77.2100, address: 'Connaught Place, Delhi' },
    orders: [],
    ecoTransactions: []
  },
  {
    id: 'user-3',
    name: 'EcoFriend2',
    email: 'eco2@example.com',
    location: { lat: 28.6129, lng: 77.2080, address: 'India Gate, Delhi' },
    orders: [],
    ecoTransactions: []
  },
  {
    id: 'user-4',
    name: 'SustainableShopper',
    email: 'sustainable@example.com',
    location: { lat: 28.6159, lng: 77.2110, address: 'Rajiv Chowk, Delhi' },
    orders: [],
    ecoTransactions: []
  },
  {
    id: 'user-5',
    name: 'ClimateHero',
    email: 'climate@example.com',
    location: { lat: 28.6135, lng: 77.2095, address: 'Barakhamba Road, Delhi' },
    orders: [],
    ecoTransactions: []
  }
];

// Mock orders for clustering
export const mockOrders = [
  {
    id: 'order-1',
    userId: 'user-1',
    items: [{ id: 'tb-4', category: 'Health & Personal Care', title: 'Bamboo Toothbrush' }],
    deliveryLocation: { lat: 28.6139, lng: 77.2090 },
    preferredDeliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    productCategories: ['Health & Personal Care']
  },
  {
    id: 'order-2',
    userId: 'user-2',
    items: [{ id: '2', category: 'Fashion', title: 'Organic Cotton T-Shirt' }],
    deliveryLocation: { lat: 28.6149, lng: 77.2100 },
    preferredDeliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    productCategories: ['Fashion']
  },
  {
    id: 'order-3',
    userId: 'user-3',
    items: [{ id: '4', category: 'Home & Kitchen', title: 'Bamboo Coffee Cup' }],
    deliveryLocation: { lat: 28.6129, lng: 77.2080 },
    preferredDeliveryDate: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(),
    productCategories: ['Home & Kitchen']
  }
];