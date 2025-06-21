import { Product, User } from "../types";

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Wireless Bluetooth Headphones",
    price: 2999,
    originalPrice: 3999,
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg",
    category: "Electronics",
    rating: 4.5,
    reviews: 1234,
    description:
      "Premium wireless headphones with noise cancellation and 30-hour battery life.",
    features: [
      "Noise Cancellation",
      "30hr Battery",
      "Quick Charge",
      "Premium Sound",
    ],
  },
  {
    id: "2",
    title: "Organic Cotton T-Shirt",
    price: 899,
    originalPrice: 1299,
    image:
      "https://th.bing.com/th/id/OIP.sg3dxr4VE-0ABLM1Q4U7zwHaLH?w=204&h=306&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Fashion",
    rating: 4.8,
    reviews: 567,
    description:
      "Soft, comfortable organic cotton t-shirt made with sustainable materials.",
    features: [
      "100% Organic Cotton",
      "Fair Trade",
      "Eco-friendly Dyes",
      "Comfortable Fit",
    ],
    isEcoFriendly: true,
    ecoScore: 95,
    sustainabilityInfo:
      "Made from certified organic cotton with minimal water usage",
  },
  {
    id: "3",
    title: "Smart Fitness Watch",
    price: 12999,
    originalPrice: 15999,
    image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg",
    category: "Electronics",
    rating: 4.6,
    reviews: 2341,
    description:
      "Advanced fitness tracking with heart rate monitoring and GPS.",
    features: [
      "GPS Tracking",
      "Heart Rate Monitor",
      "Waterproof",
      "7-day Battery",
    ],
  },
  {
    id: "4",
    title: "Bamboo Coffee Cup Set",
    price: 799,
    originalPrice: 999,
    image:
      "https://th.bing.com/th/id/OIP.SgWdcDY1tGeZG7ITXGeeIwHaEz?w=272&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Home & Kitchen",
    rating: 4.7,
    reviews: 432,
    description: "Eco-friendly bamboo coffee cup set with leak-proof lid.",
    features: ["100% Bamboo", "Leak-proof", "Dishwasher Safe", "BPA Free"],
    isEcoFriendly: true,
    ecoScore: 92,
    sustainabilityInfo:
      "Made from sustainable bamboo, biodegradable and compostable",
  },
  {
    id: "5",
    title: "Organic Skincare Set",
    price: 1599,
    originalPrice: 2199,
    image:
      "https://th.bing.com/th/id/OIP.j_bQksEDU2aiM1f1kHgMnwAAAA?w=274&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Beauty",
    rating: 4.9,
    reviews: 876,
    description: "Complete organic skincare routine with natural ingredients.",
    features: [
      "All Natural",
      "Cruelty Free",
      "Organic Certified",
      "Sensitive Skin Safe",
    ],
    isEcoFriendly: true,
    ecoScore: 98,
    sustainabilityInfo: "Certified organic ingredients, recyclable packaging",
  },
  {
    id: "6",
    title: "Gaming Mechanical Keyboard",
    price: 4999,
    originalPrice: 6499,
    image:
      "https://th.bing.com/th/id/OIP.EXwXr2Brthq9d2kMfkqSGQHaF6?w=190&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Electronics",
    rating: 4.4,
    reviews: 1567,
    description: "RGB mechanical gaming keyboard with customizable keys.",
    features: [
      "Mechanical Switches",
      "RGB Lighting",
      "Customizable",
      "Durable Build",
    ],
  },
  // New Toothbrush Products
  {
    id: "tb-1",
    title: "Colgate Extra Clean Toothbrush - Pack of 3",
    price: 299,
    originalPrice: 399,
    image:
      "https://th.bing.com/th/id/OIP.MHXAWPnkArUSui252M0NtgHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Health & Personal Care",
    rating: 4.3,
    reviews: 892,
    description:
      "Premium toothbrush set with extra clean bristles for superior plaque removal.",
    features: [
      "Extra Clean Bristles",
      "Ergonomic Handle",
      "Pack of 3",
      "Dentist Recommended",
    ],
  },
  {
    id: "tb-2",
    title: "Oral-B Classic Toothbrush Set - Pack of 2",
    price: 249,
    originalPrice: 329,
    image:
      "data:image/webp;base64,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",
    category: "Health & Personal Care",
    rating: 4.5,
    reviews: 1245,
    description:
      "Classic toothbrush design with medium bristles for everyday oral care.",
    features: [
      "Medium Bristles",
      "Classic Design",
      "Pack of 2",
      "Trusted Brand",
    ],
  },
  {
    id: "tb-3",
    title: "Dr. Fresh Toothbrush Value Pack - Set of 4",
    price: 399,
    originalPrice: 549,
    image:
      "data:image/webp;base64,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",
    category: "Health & Personal Care",
    rating: 4.2,
    reviews: 567,
    description:
      "Value pack of premium toothbrushes with advanced cleaning technology.",
    features: [
      "Advanced Cleaning",
      "Value Pack of 4",
      "Multi-color",
      "Family Size",
    ],
  },
  {
    id: "tb-4",
    title: "Bamboo Charcoal Toothbrush - Eco-Friendly Pack of 2",
    price: 349,
    originalPrice: 449,
    image:
      "data:image/webp;base64,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",
    category: "Health & Personal Care",
    rating: 4.8,
    reviews: 734,
    description:
      "Sustainable bamboo toothbrush with charcoal-infused bristles for natural whitening.",
    features: [
      "100% Bamboo Handle",
      "Charcoal Bristles",
      "Biodegradable",
      "Natural Whitening",
    ],
    isEcoFriendly: true,
    ecoScore: 94,
    sustainabilityInfo:
      "Made from sustainable bamboo with biodegradable bristles",
  },
];

export const ecoProducts: Product[] = [
  {
    id: "eco-1",
    title: "Solar Power Bank 20000mAh",
    price: 1899,
    originalPrice: 2499,
    image:
      "https://th.bing.com/th/id/OIP.omcV55XGsonN3JZF_-nvcQHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Electronics",
    rating: 4.6,
    reviews: 543,
    description:
      "Eco-friendly solar power bank with fast charging capabilities.",
    features: [
      "Solar Charging",
      "20000mAh Capacity",
      "Waterproof",
      "LED Flashlight",
    ],
    isEcoFriendly: true,
    ecoScore: 89,
    sustainabilityInfo:
      "Reduces reliance on grid electricity, solar-powered charging",
  },
  {
    id: "eco-2",
    title: "Recycled Plastic Backpack",
    price: 2299,
    originalPrice: 2999,
    image:
      "https://th.bing.com/th/id/OIP.g0u9eR6t8j27Qds3sjQ9YAHaJe?w=139&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Fashion",
    rating: 4.8,
    reviews: 432,
    description: "Stylish backpack made from 100% recycled plastic bottles.",
    features: [
      "Recycled Materials",
      "Water Resistant",
      "Laptop Compartment",
      "Ergonomic",
    ],
    isEcoFriendly: true,
    ecoScore: 94,
    sustainabilityInfo:
      "Made from 25 recycled plastic bottles, carbon-neutral shipping",
  },
  {
    id: "eco-3",
    title: "Biodegradable Phone Case",
    price: 599,
    originalPrice: 899,
    image:
      "https://th.bing.com/th/id/OIP.OUWRdJSayLyEr6VZsRQxCAHaHa?w=188&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Electronics",
    rating: 4.5,
    reviews: 234,
    description:
      "Fully biodegradable phone case made from plant-based materials.",
    features: [
      "100% Biodegradable",
      "Drop Protection",
      "Natural Materials",
      "Compostable",
    ],
    isEcoFriendly: true,
    ecoScore: 96,
    sustainabilityInfo: "Breaks down completely in compost within 6 months",
  },
  {
    id: "eco-4",
    title: "Organic Hemp Clothing Set",
    price: 2799,
    originalPrice: 3599,
    image:
      "data:image/webp;base64,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",
    category: "Fashion",
    rating: 4.9,
    reviews: 654,
    description: "Comfortable clothing set made from organic hemp fibers.",
    features: ["Organic Hemp", "Hypoallergenic", "Moisture Wicking", "Durable"],
    isEcoFriendly: true,
    ecoScore: 97,
    sustainabilityInfo: "Hemp requires 50% less water than cotton to grow",
  },
  // Add eco-friendly toothbrush to Green Store
  {
    id: "eco-tb-1",
    title: "Bamboo Charcoal Toothbrush - Eco-Friendly Pack of 2",
    price: 349,
    originalPrice: 449,
    image:
      "data:image/webp;base64,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",
    category: "Health & Personal Care",
    rating: 4.8,
    reviews: 734,
    description:
      "Sustainable bamboo toothbrush with charcoal-infused bristles for natural whitening.",
    features: [
      "100% Bamboo Handle",
      "Charcoal Bristles",
      "Biodegradable",
      "Natural Whitening",
    ],
    isEcoFriendly: true,
    ecoScore: 94,
    sustainabilityInfo:
      "Made from sustainable bamboo with biodegradable bristles",
  },
  {
    id: "eco-tb-2",
    title: "Organic Neem Wood Toothbrush Set - Pack of 3",
    price: 449,
    originalPrice: 599,
    image:
      "https://th.bing.com/th/id/OIP.MN37gTEXbxtKOtVclzXShQAAAA?w=187&h=212&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Health & Personal Care",
    rating: 4.7,
    reviews: 456,
    description:
      "Traditional neem wood toothbrush with natural antibacterial properties.",
    features: [
      "Neem Wood Handle",
      "Natural Antibacterial",
      "Soft Bristles",
      "Ayurvedic",
    ],
    isEcoFriendly: true,
    ecoScore: 92,
    sustainabilityInfo:
      "Neem wood naturally prevents bacterial growth, fully biodegradable",
  },
];

export const mockUser: User = {
  id: "user-1",
  name: "EcoWarrior",
  email: "eco@example.com",
  ecoCoins: 850,
  location: {
    lat: 28.6139,
    lng: 77.209,
    address: "Delhi, India",
  },
  orders: [
    {
      id: "order-1",
      items: [
        { ...mockProducts[1], quantity: 2 },
        { ...mockProducts[3], quantity: 1 },
      ],
      total: 2597,
      date: "2024-01-15",
      status: "delivered",
      deliveryMethod: "eco-slot",
      ecoCoinsEarned: 100,
    },
    {
      id: "order-2",
      items: [{ ...mockProducts[4], quantity: 1 }],
      total: 1599,
      date: "2024-01-10",
      status: "delivered",
      deliveryMethod: "group",
      ecoCoinsEarned: 150,
    },
  ],
  ecoTransactions: [
    {
      id: "trans-1",
      type: "earned",
      amount: 100,
      reason: "Eco Delivery Slot",
      date: "2024-01-15",
      orderId: "order-1",
    },
    {
      id: "trans-2",
      type: "earned",
      amount: 150,
      reason: "Group Delivery",
      date: "2024-01-10",
      orderId: "order-2",
    },
    {
      id: "trans-3",
      type: "earned",
      amount: 200,
      reason: "Product Return - Reusable",
      date: "2024-01-08",
    },
    {
      id: "trans-4",
      type: "redeemed",
      amount: -200,
      reason: "Extra 10% Discount Voucher",
      date: "2024-01-05",
    },
  ],
};

export const mockNearbyUsers = [
  {
    id: "user-2",
    name: "GreenUser1",
    lat: 28.6149,
    lng: 77.21,
    address: "Connaught Place",
  },
  {
    id: "user-3",
    name: "EcoFriend2",
    lat: 28.6129,
    lng: 77.208,
    address: "India Gate",
  },
  {
    id: "user-4",
    name: "SustainableShopper",
    lat: 28.6159,
    lng: 77.211,
    address: "Rajiv Chowk",
  },
  {
    id: "user-5",
    name: "ClimateHero",
    lat: 28.6135,
    lng: 77.2095,
    address: "Barakhamba Road",
  },
];
