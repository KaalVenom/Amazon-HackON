import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Leaf,
  Star,
  Search,
  ShoppingBag,
  Filter,
  ArrowRight,
  Sparkles,
  Globe,
  Droplets,
  Wind,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "../components/ProductCard";
import { ecoProducts } from "../data/mockData";

export function GreenStore() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.1,
      },
    },
  };

  // Added missing animation variants
  const itemFadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const scaleUpWithEcho = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  const heroElementAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let products = ecoProducts;

    // Filter by search query
    if (query) {
      products = products.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.sustainabilityInfo
            ?.toLowerCase()
            .includes(query.toLowerCase())
      );
    }

    // Filter by category if selected
    if (selectedCategory) {
      products = products.filter((product) =>
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    return products;
  }, [query, selectedCategory]);

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
        >
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 text-white py-20 relative overflow-hidden">
            {/* Animated background elements */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full opacity-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 2 }}
            >
              <motion.div
                className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"
                animate={{
                  x: [0, 20, 0],
                  y: [0, 10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-white"
                animate={{
                  x: [0, -30, 0],
                  y: [0, 20, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                className="max-w-4xl mx-auto text-center"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="flex items-center justify-center space-x-4 mb-8"
                  variants={itemFadeIn}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 5, 0, -5, 0],
                      scale: [1, 1.05, 1, 1.05, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut",
                    }}
                    className="bg-white/20 p-4 rounded-full"
                  >
                    <Leaf className="w-12 h-12 text-emerald-200" />
                  </motion.div>
                  <h1 className="text-6xl font-bold tracking-tight">
                    <span className="text-white">Green</span>
                    <span className="text-emerald-200">Store</span>
                  </h1>
                </motion.div>

                <motion.p
                  className="text-2xl mb-10 text-white/90 font-light"
                  variants={itemFadeIn}
                >
                  Discover eco-friendly alternatives that make a difference
                </motion.p>

                <motion.div
                  className="flex flex-wrap items-center justify-center gap-4"
                  variants={itemFadeIn}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full"
                  >
                    <Star className="w-5 h-5 text-yellow-300" />
                    <span className="font-medium">Certified Eco Products</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full"
                  >
                    <Leaf className="w-5 h-5 text-emerald-300" />
                    <span className="font-medium">Sustainable Materials</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full"
                  >
                    <Globe className="w-5 h-5 text-blue-300" />
                    <span className="font-medium">Carbon Neutral</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <div className="container mx-auto px-4 py-12">
            {/* Search Results Header */}
            <AnimatePresence mode="wait">
              {query && (
                <motion.div
                  key="search-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mb-12 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
                >
                  <div className="flex items-center space-x-3 text-teal-600 mb-3">
                    <Search className="w-6 h-6" />
                    <span className="text-lg font-medium">
                      Eco-friendly alternatives for:
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-2">
                    "{query}"
                  </h2>
                  <p className="text-gray-600">
                    <span className="font-semibold text-teal-600">
                      {filteredProducts.length}
                    </span>{" "}
                    sustainable{" "}
                    {filteredProducts.length === 1 ? "product" : "products"}{" "}
                    found
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Category Filter */}
            {!query && (
              <motion.div variants={scaleUp} className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-800">
                    Shop by Category
                  </h2>
                  {selectedCategory && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(null)}
                      className="text-sm text-teal-600 flex items-center space-x-1 hover:text-teal-800 transition-colors"
                    >
                      <span>Clear filter</span>
                      <Filter className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>

                <motion.div
                  variants={staggerContainer}
                  className="grid md:grid-cols-4 gap-6"
                >
                  <motion.div
                    variants={itemFadeIn}
                    whileHover={{
                      y: -8,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory("Fashion")}
                    className={`bg-white rounded-2xl p-8 text-center shadow-md cursor-pointer transition-all duration-300 ${
                      selectedCategory === "Fashion"
                        ? "ring-2 ring-emerald-500"
                        : ""
                    }`}
                  >
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                      }}
                      className="bg-emerald-100 p-5 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center"
                    >
                      <Leaf className="w-10 h-10 text-emerald-600" />
                    </motion.div>
                    <h3 className="font-semibold text-lg mb-2">
                      Organic Fashion
                    </h3>
                    <p className="text-gray-600">
                      Sustainable clothing & accessories
                    </p>
                  </motion.div>

                  <motion.div
                    variants={itemFadeIn}
                    whileHover={{
                      y: -8,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory("Electronics")}
                    className={`bg-white rounded-2xl p-8 text-center shadow-md cursor-pointer transition-all duration-300 ${
                      selectedCategory === "Electronics"
                        ? "ring-2 ring-emerald-500"
                        : ""
                    }`}
                  >
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                      className="bg-blue-100 p-5 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center"
                    >
                      <Star className="w-10 h-10 text-blue-600" />
                    </motion.div>
                    <h3 className="font-semibold text-lg mb-2">
                      Eco Electronics
                    </h3>
                    <p className="text-gray-600">
                      Energy-efficient & recyclable tech
                    </p>
                  </motion.div>

                  <motion.div
                    variants={itemFadeIn}
                    whileHover={{
                      y: -8,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory("Home")}
                    className={`bg-white rounded-2xl p-8 text-center shadow-md cursor-pointer transition-all duration-300 ${
                      selectedCategory === "Home"
                        ? "ring-2 ring-emerald-500"
                        : ""
                    }`}
                  >
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                        delay: 0.4,
                      }}
                      className="bg-amber-100 p-5 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center"
                    >
                      <Wind className="w-10 h-10 text-amber-600" />
                    </motion.div>
                    <h3 className="font-semibold text-lg mb-2">Green Home</h3>
                    <p className="text-gray-600">
                      Sustainable home & kitchen products
                    </p>
                  </motion.div>

                  <motion.div
                    variants={itemFadeIn}
                    whileHover={{
                      y: -8,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory("Beauty")}
                    className={`bg-white rounded-2xl p-8 text-center shadow-md cursor-pointer transition-all duration-300 ${
                      selectedCategory === "Beauty"
                        ? "ring-2 ring-emerald-500"
                        : ""
                    }`}
                  >
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                        delay: 0.6,
                      }}
                      className="bg-purple-100 p-5 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center"
                    >
                      <Droplets className="w-10 h-10 text-purple-600" />
                    </motion.div>
                    <h3 className="font-semibold text-lg mb-2">
                      Natural Beauty
                    </h3>
                    <p className="text-gray-600">
                      Organic skincare & cosmetics
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Products Grid with Advanced Animations */}
            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div
                  key="products-grid"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="mb-16 relative"
                >
                  {/* Decorative background elements */}
                  <div className="absolute inset-0 -z-10 overflow-hidden">
                    <motion.div
                      className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-100/40 to-transparent"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 15,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-teal-100/30 to-transparent"
                      animate={{
                        scale: [1, 1.15, 1],
                        rotate: [0, -5, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 18,
                        ease: "easeInOut",
                        delay: 3,
                      }}
                    />
                  </div>

                  {/* Section header with animated underline */}
                  <div className="relative mb-12">
                    <motion.h2
                      variants={heroElementAnimation}
                      className="text-3xl font-bold text-gray-800 mb-2 flex items-center"
                    >
                      <motion.div
                        className="mr-4 p-3 bg-gradient-to-br from-emerald-100 to-teal-50 rounded-xl shadow-sm"
                        whileHover={{
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.5 },
                        }}
                      >
                        <ShoppingBag className="w-8 h-8 text-teal-600" />
                      </motion.div>
                      <span>
                        {query || selectedCategory
                          ? "Matching Products"
                          : "All Eco Products"}
                      </span>
                    </motion.h2>

                    {/* Animated underline */}
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "100%", opacity: 1 }}
                      transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-[2px] bg-gradient-to-r from-emerald-300/0 via-emerald-400 to-emerald-300/0"
                    />

                    {/* Subtle description text */}
                    {!query && !selectedCategory && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ delay: 0.5 }}
                        className="text-emerald-700 mt-3 max-w-2xl"
                      >
                        Browse our curated collection of sustainable products
                        that help reduce environmental impact
                      </motion.p>
                    )}
                  </div>

                  {/* Product grid with advanced hover effects */}
                  <motion.div
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  >
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        variants={itemFadeInUp}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        exit={{
                          opacity: 0,
                          y: 20,
                          transition: { duration: 0.2 },
                        }}
                        whileHover={{
                          y: -12,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          },
                          boxShadow:
                            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        }}
                        className="relative group"
                      >
                        {/* Highlight effect on hover */}
                        <motion.div
                          className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-100/0 to-teal-100/0"
                          initial={{ opacity: 0 }}
                          whileHover={{
                            opacity: 1,
                            background:
                              "radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0) 70%)",
                          }}
                          transition={{ duration: 0.3 }}
                        />

                        <ProductCard product={product} />

                        {/* Subtle eco badge */}
                        <motion.div
                          className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileHover={{ scale: 1.1 }}
                          whileInView={{
                            scale: 1,
                            opacity: 1,
                            transition: { delay: 0.2 + index * 0.05 },
                          }}
                        >
                          Eco
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ) : query ? (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg relative overflow-hidden"
                >
                  {/* Decorative background elements */}
                  <motion.div
                    className="absolute inset-0 -z-10 opacity-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 1 }}
                  >
                    {/* Animated pattern */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full bg-emerald-200"
                        style={{
                          width: `${Math.random() * 100 + 50}px`,
                          height: `${Math.random() * 100 + 50}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          x: [0, Math.random() * 40 - 20],
                          y: [0, Math.random() * 40 - 20],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          repeat: Infinity,
                          repeatType: "mirror",
                          duration: Math.random() * 10 + 10,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.div>

                  <div className="relative z-10">
                    {/* Animated icon with particle effects */}
                    <div className="relative inline-block mb-8">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-emerald-100"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Orbiting particles */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-3 h-3 rounded-full bg-emerald-300"
                          style={{
                            top: "50%",
                            left: "50%",
                            margin: "-4px 0 0 -4px",
                          }}
                          animate={{
                            x: [0, Math.cos((i * (Math.PI * 2)) / 3) * 50],
                            y: [0, Math.sin((i * (Math.PI * 2)) / 3) * 50],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut",
                            delay: i * 0.3,
                          }}
                        />
                      ))}

                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          rotate: {
                            repeat: Infinity,
                            duration: 20,
                            ease: "linear",
                          },
                          scale: {
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut",
                          },
                        }}
                        className="relative z-10 bg-white p-6 rounded-full shadow-lg"
                      >
                        <Leaf className="w-20 h-20 text-emerald-500" />
                      </motion.div>
                    </div>

                    {/* Text content with animated reveal */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <h2 className="text-3xl font-bold text-gray-700 mb-3">
                        No eco products found
                      </h2>
                      <motion.p
                        className="text-gray-500 mb-8 max-w-md mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        We couldn't find sustainable alternatives for "
                        <span className="text-emerald-600 font-medium">
                          {query}
                        </span>
                        " right now, but we're constantly expanding our
                        collection.
                      </motion.p>

                      {/* Animated button with hover effects */}
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => (window.location.href = "/greenstore")}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-full transition-all duration-300 font-medium shadow-lg flex items-center space-x-2 mx-auto relative overflow-hidden"
                      >
                        {/* Button shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                          initial={{ x: "-100%" }}
                          animate={{ x: ["100%", "-100%"] }}
                          transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 2.5,
                            ease: "easeInOut",
                            repeatDelay: 1,
                          }}
                        />

                        <span>Browse All Eco Products</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeInOut",
                          }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Sustainability Promise with Advanced Animations */}
            <motion.div
              variants={scaleUpWithEcho}
              className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-3xl p-10 mt-16 text-center shadow-lg relative overflow-hidden"
            >
              {/* Interactive background elements */}
              <div className="absolute inset-0 -z-10">
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-200/10 to-teal-300/10"
                  animate={{
                    background: [
                      "linear-gradient(to bottom right, rgba(16, 185, 129, 0.05), rgba(20, 184, 166, 0.1))",
                      "linear-gradient(to bottom right, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.05))",
                      "linear-gradient(to bottom right, rgba(16, 185, 129, 0.05), rgba(20, 184, 166, 0.1))",
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut",
                  }}
                />

                {/* Floating eco symbols */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-emerald-600/10 font-bold text-5xl"
                    style={{
                      left: `${Math.random() * 90 + 5}%`,
                      top: `${Math.random() * 90 + 5}%`,
                      transform: `rotate(${Math.random() * 40 - 20}deg)`,
                    }}
                    animate={{
                      y: [0, Math.random() * -30 - 10, 0],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: Math.random() * 5 + 10,
                      ease: "easeInOut",
                      delay: Math.random() * 5,
                    }}
                  >
                    {
                      ["♻️", "🌱", "🌿", "🍃", "💧", "🌎"][
                        Math.floor(Math.random() * 6)
                      ]
                    }
                  </motion.div>
                ))}

                {/* Decorative circles */}
                <motion.div
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-200/20 to-emerald-300/0"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-tr from-teal-200/20 to-teal-300/0"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut",
                    delay: 4,
                  }}
                />
              </div>

              {/* Content with advanced animations */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10"
              >
                {/* Title with animated sparkle effect */}
                <div className="relative inline-block mb-8">
                  <motion.div
                    className="absolute -inset-6 rounded-full"
                    animate={{
                      background: [
                        "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0) 70%)",
                        "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0) 70%)",
                        "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0) 70%)",
                      ],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="flex items-center justify-center space-x-3">
                    <motion.div
                      className="relative"
                      whileHover={{
                        rotate: [0, 15, -15, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      {/* Animated sparkles around icon */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full"
                          style={{
                            top: "50%",
                            left: "50%",
                            margin: "-1px 0 0 -1px",
                          }}
                          animate={{
                            x: [0, Math.cos((i * (Math.PI * 2)) / 6) * 20],
                            y: [0, Math.sin((i * (Math.PI * 2)) / 6) * 20],
                            opacity: [0, 1, 0],
                            scale: [0.5, 1, 0.5],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut",
                            delay: i * 0.1,
                          }}
                        />
                      ))}

                      <motion.div
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 12,
                          ease: "linear",
                        }}
                        className="bg-gradient-to-br from-emerald-100 to-emerald-50 p-3 rounded-full shadow-md"
                      >
                        <Sparkles className="w-8 h-8 text-emerald-600" />
                      </motion.div>
                    </motion.div>

                    <motion.h2
                      className="text-3xl font-bold text-emerald-800 relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      Our Sustainability Promise
                      {/* Animated underline */}
                      <motion.div
                        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-emerald-300/0 via-emerald-400 to-emerald-300/0 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      />
                    </motion.h2>
                  </div>
                </div>

                {/* Description with animated text reveal */}
                <motion.div
                  className="overflow-hidden mb-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.p
                    className="text-emerald-700 max-w-3xl mx-auto text-lg leading-relaxed"
                    initial={{ y: 40 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    Every product in our Green Store meets strict environmental
                    standards. We carefully vet each item for sustainability,
                    ethical sourcing, and minimal environmental impact. When you
                    shop green, you're not just buying a product – you're
                    <span className="relative inline-block mx-2 font-medium">
                      investing in a better future
                      <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-emerald-400"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                      />
                    </span>
                    .
                  </motion.p>
                </motion.div>

                {/* Stats with advanced animations */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid md:grid-cols-3 gap-8"
                >
                  {/* 100% Eco-Certified */}
                  <motion.div
                    variants={itemFadeInUp}
                    whileHover={{
                      y: -8,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-md relative overflow-hidden group"
                  >
                    {/* Background pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 20px 20px, rgba(16, 185, 129, 0.2) 0, rgba(16, 185, 129, 0.2) 2px, transparent 0), radial-gradient(circle at 40px 40px, rgba(16, 185, 129, 0.2) 0, rgba(16, 185, 129, 0.2) 2px, transparent 0)",
                        backgroundSize: "40px 40px",
                      }}
                    />

                    {/* Circular progress indicator */}
                    <div className="relative mb-4 mx-auto w-24 h-24">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#ecfdf5"
                          strokeWidth="8"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="283"
                          initial={{ strokeDashoffset: 283 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            delay: 0.5,
                          }}
                        />
                      </svg>
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-emerald-600"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                      >
                        100%
                      </motion.div>
                    </div>

                    <motion.div
                      className="text-emerald-800 font-medium text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                    >
                      Eco-Certified Products
                    </motion.div>
                  </motion.div>

                  {/* 0% Harmful Chemicals */}
                  <motion.div
                    variants={itemFadeInUp}
                    whileHover={{
                      y: -8,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-md relative overflow-hidden group"
                  >
                    {/* Background pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 20px 20px, rgba(16, 185, 129, 0.2) 0, rgba(16, 185, 129, 0.2) 2px, transparent 0), radial-gradient(circle at 40px 40px, rgba(16, 185, 129, 0.2) 0, rgba(16, 185, 129, 0.2) 2px, transparent 0)",
                        backgroundSize: "40px 40px",
                      }}
                    />

                    {/* Circular progress indicator */}
                    <div className="relative mb-4 mx-auto w-24 h-24">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#ecfdf5"
                          strokeWidth="8"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="283"
                          initial={{ strokeDashoffset: 283 }}
                          animate={{ strokeDashoffset: 283 }}
                          transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            delay: 0.7,
                          }}
                        />
                      </svg>
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-emerald-600"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.4, duration: 0.5 }}
                      >
                        0%
                      </motion.div>
                    </div>

                    <motion.div
                      className="text-emerald-800 font-medium text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.7 }}
                    >
                      Harmful Chemicals
                    </motion.div>
                  </motion.div>

                  {/* 50% Less Carbon */}
                  <motion.div
                    variants={itemFadeInUp}
                    whileHover={{
                      y: -8,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-md relative overflow-hidden group"
                  >
                    {/* Background pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 20px 20px, rgba(16, 185, 129, 0.2) 0, rgba(16, 185, 129, 0.2) 2px, transparent 0), radial-gradient(circle at 40px 40px, rgba(16, 185, 129, 0.2) 0, rgba(16, 185, 129, 0.2) 2px, transparent 0)",
                        backgroundSize: "40px 40px",
                      }}
                    />

                    {/* Circular progress indicator */}
                    <div className="relative mb-4 mx-auto w-24 h-24">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#ecfdf5"
                          strokeWidth="8"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="283"
                          initial={{ strokeDashoffset: 283 }}
                          animate={{ strokeDashoffset: 141.5 }}
                          transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            delay: 0.9,
                          }}
                        />
                      </svg>
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-emerald-600"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.6, duration: 0.5 }}
                      >
                        50%
                      </motion.div>
                    </div>

                    <motion.div
                      className="text-emerald-800 font-medium text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.9 }}
                    >
                      Less Carbon Footprint
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
