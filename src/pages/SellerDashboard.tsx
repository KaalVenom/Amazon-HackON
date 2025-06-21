import React, { useState, useEffect } from "react";
import {
  Upload,
  Brain,
  Leaf,
  Star,
  Package,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Sparkles,
  BarChart3,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductForm {
  title: string;
  description: string;
  bulletPoints: string[];
  materials: string;
  packagingType: string;
  carbonEmissions: string;
  energyUsage: string;
  certifications: string[];
  price: string;
  category: string;
  images: File[];
}

interface AIAnalysis {
  efsScore: number;
  ecoCoins: number;
  breakdown: {
    nlpScore: number;
    imageScore: number;
    certificationScore: number;
    materialScore: number;
    sustainabilityScore: number;
  };
  detectedFeatures: string[];
  recommendations: string[];
}

export function SellerDashboard() {
  const [formData, setFormData] = useState<ProductForm>({
    title: "",
    description: "",
    bulletPoints: [""],
    materials: "",
    packagingType: "",
    carbonEmissions: "",
    energyUsage: "",
    certifications: [],
    price: "",
    category: "",
    images: [],
  });

  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Debug effect to log score calculation when analysis changes
  useEffect(() => {
    if (aiAnalysis) {
      console.log("EFS Score:", aiAnalysis.efsScore);
      console.log("Score Breakdown:", aiAnalysis.breakdown);

      // Verify total score calculation
      const calculatedTotal =
        aiAnalysis.breakdown.nlpScore +
        aiAnalysis.breakdown.imageScore +
        aiAnalysis.breakdown.certificationScore +
        aiAnalysis.breakdown.materialScore +
        aiAnalysis.breakdown.sustainabilityScore;

      console.log("Calculated Total:", calculatedTotal);
      console.log("Reported EFS Score:", aiAnalysis.efsScore);

      // Check if scores match (accounting for rounding)
      if (Math.abs(calculatedTotal - aiAnalysis.efsScore) > 1) {
        console.warn("Score calculation mismatch detected");
      }
    }
  }, [aiAnalysis]);

  const sustainabilityKeywords = [
    "organic",
    "bamboo",
    "recycled",
    "biodegradable",
    "compostable",
    "eco-friendly",
    "sustainable",
    "renewable",
    "natural",
    "hemp",
    "cork",
    "FSC certified",
    "energy star",
    "GOTS",
    "fair trade",
    "carbon neutral",
    "plastic-free",
  ];

  const certificationOptions = [
    "FSC Certified",
    "GOTS",
    "Energy Star",
    "USDA Organic",
    "Fair Trade",
    "Cradle to Cradle",
    "EPEAT",
    "Green Seal",
    "EcoLogo",
    "Carbon Neutral",
  ];

  const handleInputChange = (field: keyof ProductForm, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addBulletPoint = () => {
    setFormData((prev) => ({
      ...prev,
      bulletPoints: [...prev.bulletPoints, ""],
    }));
  };

  const updateBulletPoint = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      bulletPoints: prev.bulletPoints.map((point, i) =>
        i === index ? value : point
      ),
    }));
  };

  const removeBulletPoint = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      bulletPoints: prev.bulletPoints.filter((_, i) => i !== index),
    }));
  };

  const handleCertificationChange = (cert: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      certifications: checked
        ? [...prev.certifications, cert]
        : prev.certifications.filter((c) => c !== cert),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(e.target.files || []),
      }));
    }
  };

  const analyzeProduct = async () => {
    setIsAnalyzing(true);

    // Simulate AI analysis with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // NLP Analysis - Check for sustainability keywords
    const allText = `${formData.title} ${
      formData.description
    } ${formData.bulletPoints.join(" ")} ${formData.materials}`.toLowerCase();
    const detectedKeywords = sustainabilityKeywords.filter((keyword) =>
      allText.includes(keyword.toLowerCase())
    );

    const nlpScore = Math.min(30, detectedKeywords.length * 5);

    // Image Analysis Simulation (would use actual CNN in production)
    // Using a deterministic score based on number of images
    // Each image is worth 5 points, up to a maximum of 20 points (4 images)
    const imageScore = Math.min(20, formData.images.length * 5);

    // Store the exact score to avoid floating point issues
    const imageScoreExact = imageScore;

    // Certification Score
    const certificationScore = Math.min(20, formData.certifications.length * 4);

    // Material Score - More granular based on number of sustainable materials detected
    const sustainableMaterials = [
      "bamboo",
      "organic",
      "recycled",
      "hemp",
      "cork",
      "biodegradable",
      "compostable",
      "natural",
      "renewable",
      "plastic-free",
    ];

    // Count how many sustainable materials are mentioned
    const detectedMaterials = sustainableMaterials.filter((material) =>
      formData.materials.toLowerCase().includes(material)
    );

    // Calculate score based on number of sustainable materials (max 15 points)
    const materialScore = Math.min(15, detectedMaterials.length * 3 || 5);

    // Sustainability Score (packaging, carbon, energy) - More consistent scoring
    let sustainabilityScore = 0;

    // Packaging score (max 5 points)
    const packagingKeywords = [
      "plastic-free",
      "recyclable",
      "compostable",
      "biodegradable",
      "minimal",
    ];
    const packagingScore = packagingKeywords.some((keyword) =>
      formData.packagingType.toLowerCase().includes(keyword)
    )
      ? 5
      : 0;

    // Carbon footprint score (max 5 points)
    const carbonKeywords = [
      "low",
      "neutral",
      "zero",
      "negative",
      "reduced",
      "minimal",
    ];
    const carbonScore = carbonKeywords.some((keyword) =>
      formData.carbonEmissions.toLowerCase().includes(keyword)
    )
      ? 5
      : 0;

    // Energy usage score (max 5 points)
    const energyKeywords = [
      "efficient",
      "renewable",
      "solar",
      "wind",
      "sustainable",
      "low",
    ];
    const energyScore = energyKeywords.some((keyword) =>
      formData.energyUsage.toLowerCase().includes(keyword)
    )
      ? 5
      : 0;

    // Total sustainability score (max 15 points)
    sustainabilityScore = packagingScore + carbonScore + energyScore;

    // Calculate total score using exact values to ensure consistency
    const totalScore =
      nlpScore +
      imageScoreExact + // Use the exact image score
      certificationScore +
      materialScore +
      sustainabilityScore;

    // Round to nearest integer and cap at 100
    const efsScore = Math.min(100, Math.round(totalScore));

    // Calculate EcoCoin rewards based on EFS
    let ecoCoins = 5;
    if (efsScore >= 90) ecoCoins = 100;
    else if (efsScore >= 75) ecoCoins = 75;
    else if (efsScore >= 60) ecoCoins = 50;
    else if (efsScore >= 40) ecoCoins = 25;

    // Create the analysis object with exact scores to ensure consistency
    const analysis: AIAnalysis = {
      efsScore,
      ecoCoins,
      breakdown: {
        nlpScore: Math.round(nlpScore),
        imageScore: imageScoreExact, // Use the exact score to avoid rounding issues
        certificationScore,
        materialScore,
        sustainabilityScore: sustainabilityScore, // No need to round as this is already an integer
      },
      detectedFeatures: detectedKeywords,
      recommendations: generateRecommendations(efsScore, formData),
    };

    setAiAnalysis(analysis);
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const generateRecommendations = (
    score: number,
    data: ProductForm
  ): string[] => {
    const recommendations = [];

    // Material recommendations
    const sustainableMaterials = [
      "bamboo",
      "organic",
      "recycled",
      "hemp",
      "cork",
      "biodegradable",
    ];
    const hasSustainableMaterial = sustainableMaterials.some((material) =>
      data.materials.toLowerCase().includes(material)
    );

    if (!hasSustainableMaterial) {
      recommendations.push(
        "Consider using more sustainable materials like bamboo, hemp, or recycled content"
      );
    }

    // Certification recommendations
    if (data.certifications.length === 0) {
      recommendations.push(
        "Obtain relevant eco-certifications (FSC, GOTS, Energy Star) to increase credibility"
      );
    } else if (data.certifications.length < 3) {
      recommendations.push(
        "Add more eco-certifications to strengthen your product's green credentials"
      );
    }

    // Packaging recommendations
    const sustainablePackaging = [
      "recyclable",
      "compostable",
      "biodegradable",
      "plastic-free",
    ];
    const hasSustainablePackaging = sustainablePackaging.some((type) =>
      data.packagingType.toLowerCase().includes(type)
    );

    if (!hasSustainablePackaging) {
      recommendations.push(
        "Switch to recyclable, compostable, or plastic-free packaging"
      );
    }

    // Description recommendations
    if (data.description.length < 100) {
      recommendations.push(
        "Provide more detailed sustainability information in your product description"
      );
    }

    // Carbon footprint recommendations
    const lowCarbonTerms = ["low", "neutral", "zero", "negative"];
    const hasLowCarbonMention = lowCarbonTerms.some((term) =>
      data.carbonEmissions.toLowerCase().includes(term)
    );

    if (!hasLowCarbonMention) {
      recommendations.push(
        "Highlight your product's low carbon footprint or carbon neutrality"
      );
    }

    // Energy usage recommendations
    const goodEnergyTerms = ["renewable", "efficient", "sustainable"];
    const hasGoodEnergyMention = goodEnergyTerms.some((term) =>
      data.energyUsage.toLowerCase().includes(term)
    );

    if (!hasGoodEnergyMention) {
      recommendations.push(
        "Mention energy efficiency or renewable energy usage in manufacturing"
      );
    }

    // Limit to top 4 recommendations to avoid overwhelming the user
    return recommendations.slice(0, 4);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 75) return "bg-green-100";
    if (score >= 50) return "bg-yellow-100";
    return "bg-red-100";
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
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

  const pulse = {
    scale: [1, 1.05, 1],
    transition: { duration: 1.5, repeat: Infinity },
  };

  // Gradient background colors
  const gradientBg = "bg-gradient-to-br from-emerald-50 to-teal-100";
  const cardBg = "bg-white backdrop-blur-sm bg-opacity-90";
  const primaryColor = "from-emerald-500 to-teal-600";
  const secondaryColor = "from-indigo-500 to-purple-600";
  const accentColor = "from-amber-400 to-orange-500";

  return (
    <div className={`min-h-screen ${gradientBg} pb-12`}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto px-4 py-8"
      >
        {/* Header */}
        <motion.div className="text-center mb-10" variants={slideUp}>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.div
              animate={pulse}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 p-3 rounded-full"
            >
              <Package className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Seller Dashboard
            </h1>
          </div>
          <p className="text-gray-700 text-lg">
            List your products and get AI-powered eco-friendliness analysis
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Form */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Basic Information */}
            <motion.div
              className={`${cardBg} rounded-xl shadow-lg p-6 border border-emerald-100`}
              variants={slideUp}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-2 rounded-lg">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Product Information
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Title
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g., Organic Bamboo Toothbrush Set - Eco-Friendly Pack of 4"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <motion.select
                      whileFocus={{ scale: 1.01 }}
                      value={formData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Category</option>
                      <option value="Health & Personal Care">
                        Health & Personal Care
                      </option>
                      <option value="Home & Kitchen">Home & Kitchen</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Beauty">Beauty</option>
                    </motion.select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (₹)
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      placeholder="299"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Detailed product description highlighting sustainability features..."
                    rows={4}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Features
                  </label>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {formData.bulletPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                        variants={slideUp}
                      >
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="text"
                          value={point}
                          onChange={(e) =>
                            updateBulletPoint(index, e.target.value)
                          }
                          placeholder="e.g., 100% Biodegradable"
                          className="flex-1 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                        />
                        {formData.bulletPoints.length > 1 && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={() => removeBulletPoint(index)}
                            className="bg-red-100 text-red-500 hover:bg-red-200 p-2 rounded-full transition-colors"
                          >
                            ×
                          </motion.button>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={addBulletPoint}
                    className="text-teal-600 hover:text-teal-800 text-sm font-medium flex items-center space-x-1 mt-2"
                  >
                    <span>+</span>
                    <span>Add Feature</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Sustainability Information */}
            <motion.div
              className={`${cardBg} rounded-xl shadow-lg p-6 border border-emerald-100`}
              variants={slideUp}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-2 rounded-lg">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Sustainability Details
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Materials Used
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    value={formData.materials}
                    onChange={(e) =>
                      handleInputChange("materials", e.target.value)
                    }
                    placeholder="e.g., Organic bamboo, recycled plastic, hemp fiber"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Packaging Type
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    value={formData.packagingType}
                    onChange={(e) =>
                      handleInputChange("packagingType", e.target.value)
                    }
                    placeholder="e.g., Plastic-free, recyclable cardboard"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Carbon Footprint
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      value={formData.carbonEmissions}
                      onChange={(e) =>
                        handleInputChange("carbonEmissions", e.target.value)
                      }
                      placeholder="e.g., Low carbon, carbon neutral"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Energy Usage
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      value={formData.energyUsage}
                      onChange={(e) =>
                        handleInputChange("energyUsage", e.target.value)
                      }
                      placeholder="e.g., Renewable energy, energy efficient"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Eco Certifications
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {certificationOptions.map((cert) => (
                      <motion.label
                        key={cert}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.certifications.includes(cert)}
                          onChange={(e) =>
                            handleCertificationChange(cert, e.target.checked)
                          }
                          className="text-teal-600 rounded focus:ring-teal-500 h-4 w-4"
                        />
                        <span className="text-sm">{cert}</span>
                      </motion.label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Image Upload */}
            <motion.div
              className={`${cardBg} rounded-xl shadow-lg p-6 border border-emerald-100`}
              variants={slideUp}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-2 rounded-lg">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Product Images
                </h2>
              </div>

              <motion.div
                className="border-2 border-dashed border-emerald-200 rounded-xl p-8 text-center"
                whileHover={{ boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.2)" }}
              >
                <motion.div
                  animate={pulse}
                  className="bg-emerald-50 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center"
                >
                  <Upload className="w-10 h-10 text-emerald-500" />
                </motion.div>
                <p className="text-gray-600 mb-4">
                  Upload product images for AI analysis
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <motion.label
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  htmlFor="image-upload"
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 inline-block font-medium shadow-md"
                >
                  Choose Images
                </motion.label>
                {formData.images.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-gray-600 mt-3 font-medium"
                  >
                    {formData.images.length} image(s) selected
                  </motion.p>
                )}
              </motion.div>
            </motion.div>

            {/* Analyze Button */}
            <motion.div className="text-center" variants={slideUp}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={analyzeProduct}
                disabled={
                  isAnalyzing || !formData.title || !formData.description
                }
                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-400 text-white px-10 py-4 rounded-xl transition-all duration-300 font-semibold flex items-center space-x-3 mx-auto shadow-lg disabled:shadow-none"
              >
                <Brain className="w-6 h-6" />
                <span className="text-lg">
                  {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
                </span>
                <Sparkles className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* AI Analysis Results */}
          <div className="lg:col-span-1">
            <motion.div
              className={`${cardBg} rounded-xl shadow-lg p-6 sticky top-4 border border-emerald-100`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  AI Analysis Results
                </h2>
              </div>

              <AnimatePresence mode="wait">
                {!showResults && !isAnalyzing && (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10"
                  >
                    <motion.div
                      animate={pulse}
                      className="bg-indigo-50 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center"
                    >
                      <Brain className="w-10 h-10 text-indigo-500" />
                    </motion.div>
                    <p className="text-gray-500">
                      Fill out the form and click "Analyze with AI" to see
                      results
                    </p>
                  </motion.div>
                )}

                {isAnalyzing && (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-20 w-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-6"
                    ></motion.div>
                    <p className="text-gray-600 font-medium mb-4">
                      Analyzing product with AI...
                    </p>
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="mt-4 space-y-3 text-sm text-gray-500 max-w-xs mx-auto"
                    >
                      <motion.div
                        variants={slideUp}
                        className="flex items-center space-x-2 bg-indigo-50 p-2 rounded-lg"
                      >
                        <Brain className="w-4 h-4 text-indigo-500" />
                        <p>Processing text with NLP...</p>
                      </motion.div>
                      <motion.div
                        variants={slideUp}
                        className="flex items-center space-x-2 bg-purple-50 p-2 rounded-lg"
                      >
                        <Upload className="w-4 h-4 text-purple-500" />
                        <p>Analyzing images...</p>
                      </motion.div>
                      <motion.div
                        variants={slideUp}
                        className="flex items-center space-x-2 bg-teal-50 p-2 rounded-lg"
                      >
                        <BarChart3 className="w-4 h-4 text-teal-500" />
                        <p>Calculating EFS score...</p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}

                {showResults && aiAnalysis && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Overall Score */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className={`text-center p-6 rounded-xl bg-gradient-to-br ${
                        aiAnalysis.efsScore >= 75
                          ? "from-emerald-50 to-green-100"
                          : aiAnalysis.efsScore >= 50
                          ? "from-amber-50 to-yellow-100"
                          : "from-red-50 to-orange-100"
                      }`}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.3,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className={`text-5xl font-bold mb-2 ${
                          aiAnalysis.efsScore >= 75
                            ? "text-emerald-600"
                            : aiAnalysis.efsScore >= 50
                            ? "text-amber-600"
                            : "text-red-600"
                        }`}
                      >
                        {aiAnalysis.efsScore}/100
                      </motion.div>
                      <p className="text-gray-700 font-semibold">
                        Eco-Friendliness Score
                      </p>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center justify-center space-x-2 mt-3"
                      >
                        <Leaf className="w-5 h-5 text-emerald-600" />
                        <span className="font-semibold text-emerald-600">
                          {aiAnalysis.ecoCoins} EcoCoins for buyers
                        </span>
                      </motion.div>
                    </motion.div>

                    {/* Score Breakdown */}
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      <h3 className="font-semibold mb-3 flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-gray-700" />
                        <span>Score Breakdown</span>
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(aiAnalysis.breakdown).map(
                          ([key, value], index) => {
                            const maxValue =
                              key === "nlpScore"
                                ? 30
                                : key === "imageScore"
                                ? 20
                                : key === "certificationScore"
                                ? 20
                                : 15;
                            const percentage = (value / maxValue) * 100;

                            return (
                              <motion.div
                                key={key}
                                variants={slideUp}
                                className="space-y-1"
                              >
                                <div className="flex justify-between items-center">
                                  <span className="text-sm capitalize">
                                    {key.replace("Score", "")}
                                  </span>
                                  <span className="font-semibold">
                                    {value}/{maxValue}
                                  </span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{
                                      duration: 1,
                                      delay: index * 0.1,
                                    }}
                                    className={`h-full rounded-full ${
                                      percentage > 70
                                        ? "bg-emerald-500"
                                        : percentage > 40
                                        ? "bg-amber-500"
                                        : "bg-red-500"
                                    }`}
                                  ></motion.div>
                                </div>
                              </motion.div>
                            );
                          }
                        )}
                      </div>
                    </motion.div>

                    {/* Detected Features */}
                    {aiAnalysis.detectedFeatures.length > 0 && (
                      <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        <h3 className="font-semibold mb-3 flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-gray-700" />
                          <span>Detected Eco Features</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {aiAnalysis.detectedFeatures.map((feature, index) => (
                            <motion.span
                              key={index}
                              variants={slideUp}
                              className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1"
                            >
                              <Leaf className="w-3 h-3" />
                              <span>{feature}</span>
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Recommendations */}
                    {aiAnalysis.recommendations.length > 0 && (
                      <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                      >
                        <h3 className="font-semibold mb-3 flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-gray-700" />
                          <span>Recommendations</span>
                        </h3>
                        <div className="space-y-2">
                          {aiAnalysis.recommendations.map((rec, index) => (
                            <motion.div
                              key={index}
                              variants={slideUp}
                              className="flex items-start space-x-2 bg-amber-50 p-2 rounded-lg"
                            >
                              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">
                                {rec}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Action Buttons */}
                    <motion.div
                      className="space-y-3 pt-2"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.button
                        variants={slideUp}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 px-4 rounded-lg transition-all duration-300 font-semibold shadow-md flex items-center justify-center space-x-2"
                      >
                        <Shield className="w-5 h-5" />
                        <span>List Product</span>
                      </motion.button>
                      <motion.button
                        variants={slideUp}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setShowResults(false)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg transition-all duration-300 font-medium flex items-center justify-center space-x-2"
                      >
                        <Brain className="w-5 h-5" />
                        <span>Analyze Again</span>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* AI Technology Explanation */}
        <motion.div
          className={`mt-12 ${cardBg} rounded-xl shadow-lg p-8 border border-emerald-100`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">
            How Our AI Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={pulse}
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-5 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg"
              >
                <Brain className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="font-semibold mb-2 text-indigo-700">
                NLP Analysis
              </h3>
              <p className="text-gray-600 text-sm">
                Our AI scans product titles and descriptions for sustainability
                keywords, certifications, and eco-friendly claims using advanced
                natural language processing.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={pulse}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-5 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg"
              >
                <Upload className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="font-semibold mb-2 text-emerald-700">
                Image Recognition
              </h3>
              <p className="text-gray-600 text-sm">
                Computer vision models analyze product images to detect
                eco-labels, packaging materials, and visual sustainability
                indicators.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={pulse}
                className="bg-gradient-to-r from-amber-500 to-amber-600 p-5 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg"
              >
                <TrendingUp className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="font-semibold mb-2 text-amber-700">
                Smart Scoring
              </h3>
              <p className="text-gray-600 text-sm">
                Combines multiple data points to generate an accurate
                Eco-Friendliness Score and appropriate EcoCoin rewards for
                customers.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
