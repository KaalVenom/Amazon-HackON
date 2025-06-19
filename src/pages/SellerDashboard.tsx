import React, { useState } from 'react';
import { Upload, Brain, Leaf, Star, Package, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

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
    title: '',
    description: '',
    bulletPoints: [''],
    materials: '',
    packagingType: '',
    carbonEmissions: '',
    energyUsage: '',
    certifications: [],
    price: '',
    category: '',
    images: []
  });

  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const sustainabilityKeywords = [
    'organic', 'bamboo', 'recycled', 'biodegradable', 'compostable', 'eco-friendly',
    'sustainable', 'renewable', 'natural', 'hemp', 'cork', 'FSC certified',
    'energy star', 'GOTS', 'fair trade', 'carbon neutral', 'plastic-free'
  ];

  const certificationOptions = [
    'FSC Certified', 'GOTS', 'Energy Star', 'USDA Organic', 'Fair Trade',
    'Cradle to Cradle', 'EPEAT', 'Green Seal', 'EcoLogo', 'Carbon Neutral'
  ];

  const handleInputChange = (field: keyof ProductForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addBulletPoint = () => {
    setFormData(prev => ({
      ...prev,
      bulletPoints: [...prev.bulletPoints, '']
    }));
  };

  const updateBulletPoint = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      bulletPoints: prev.bulletPoints.map((point, i) => i === index ? value : point)
    }));
  };

  const removeBulletPoint = (index: number) => {
    setFormData(prev => ({
      ...prev,
      bulletPoints: prev.bulletPoints.filter((_, i) => i !== index)
    }));
  };

  const handleCertificationChange = (cert: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      certifications: checked 
        ? [...prev.certifications, cert]
        : prev.certifications.filter(c => c !== cert)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: Array.from(e.target.files || [])
      }));
    }
  };

  const analyzeProduct = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // NLP Analysis - Check for sustainability keywords
    const allText = `${formData.title} ${formData.description} ${formData.bulletPoints.join(' ')} ${formData.materials}`.toLowerCase();
    const detectedKeywords = sustainabilityKeywords.filter(keyword => 
      allText.includes(keyword.toLowerCase())
    );
    
    const nlpScore = Math.min(30, detectedKeywords.length * 5);

    // Image Analysis Simulation (would use actual CNN in production)
    const imageScore = formData.images.length > 0 ? Math.random() * 20 : 0;

    // Certification Score
    const certificationScore = Math.min(20, formData.certifications.length * 4);

    // Material Score
    const sustainableMaterials = ['bamboo', 'organic', 'recycled', 'hemp', 'cork'];
    const materialScore = sustainableMaterials.some(material => 
      formData.materials.toLowerCase().includes(material)
    ) ? 15 : 5;

    // Sustainability Score (packaging, carbon, energy)
    let sustainabilityScore = 0;
    if (formData.packagingType.toLowerCase().includes('plastic-free')) sustainabilityScore += 5;
    if (formData.packagingType.toLowerCase().includes('recyclable')) sustainabilityScore += 3;
    if (formData.carbonEmissions.toLowerCase().includes('low') || formData.carbonEmissions.toLowerCase().includes('neutral')) sustainabilityScore += 4;
    if (formData.energyUsage.toLowerCase().includes('efficient') || formData.energyUsage.toLowerCase().includes('renewable')) sustainabilityScore += 3;

    const totalScore = nlpScore + imageScore + certificationScore + materialScore + sustainabilityScore;
    const efsScore = Math.min(100, Math.round(totalScore));

    // Calculate EcoCoin rewards based on EFS
    let ecoCoins = 5;
    if (efsScore >= 90) ecoCoins = 100;
    else if (efsScore >= 75) ecoCoins = 75;
    else if (efsScore >= 60) ecoCoins = 50;
    else if (efsScore >= 40) ecoCoins = 25;

    const analysis: AIAnalysis = {
      efsScore,
      ecoCoins,
      breakdown: {
        nlpScore: Math.round(nlpScore),
        imageScore: Math.round(imageScore),
        certificationScore,
        materialScore,
        sustainabilityScore: Math.round(sustainabilityScore)
      },
      detectedFeatures: detectedKeywords,
      recommendations: generateRecommendations(efsScore, formData)
    };

    setAiAnalysis(analysis);
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const generateRecommendations = (score: number, data: ProductForm): string[] => {
    const recommendations = [];
    
    if (score < 60) {
      recommendations.push("Consider using more sustainable materials like bamboo or recycled content");
      recommendations.push("Add eco-certifications to increase credibility");
    }
    
    if (data.certifications.length === 0) {
      recommendations.push("Obtain relevant eco-certifications (FSC, GOTS, Energy Star)");
    }
    
    if (!data.packagingType.toLowerCase().includes('recyclable')) {
      recommendations.push("Switch to recyclable or compostable packaging");
    }
    
    if (data.description.length < 100) {
      recommendations.push("Provide more detailed sustainability information in description");
    }

    return recommendations;
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 75) return 'bg-green-100';
    if (score >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Package className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Seller Dashboard</h1>
          </div>
          <p className="text-gray-600 text-lg">List your products and get AI-powered eco-friendliness analysis</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Product Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Organic Bamboo Toothbrush Set - Eco-Friendly Pack of 4"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      <option value="Health & Personal Care">Health & Personal Care</option>
                      <option value="Home & Kitchen">Home & Kitchen</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Beauty">Beauty</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="299"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Detailed product description highlighting sustainability features..."
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Key Features</label>
                  {formData.bulletPoints.map((point, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => updateBulletPoint(index, e.target.value)}
                        placeholder="e.g., 100% Biodegradable"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {formData.bulletPoints.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeBulletPoint(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addBulletPoint}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Sustainability Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Sustainability Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Materials Used</label>
                  <input
                    type="text"
                    value={formData.materials}
                    onChange={(e) => handleInputChange('materials', e.target.value)}
                    placeholder="e.g., Organic bamboo, recycled plastic, hemp fiber"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Packaging Type</label>
                  <input
                    type="text"
                    value={formData.packagingType}
                    onChange={(e) => handleInputChange('packagingType', e.target.value)}
                    placeholder="e.g., Plastic-free, recyclable cardboard"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Carbon Footprint</label>
                    <input
                      type="text"
                      value={formData.carbonEmissions}
                      onChange={(e) => handleInputChange('carbonEmissions', e.target.value)}
                      placeholder="e.g., Low carbon, carbon neutral"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Energy Usage</label>
                    <input
                      type="text"
                      value={formData.energyUsage}
                      onChange={(e) => handleInputChange('energyUsage', e.target.value)}
                      placeholder="e.g., Renewable energy, energy efficient"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Eco Certifications</label>
                  <div className="grid grid-cols-2 gap-2">
                    {certificationOptions.map((cert) => (
                      <label key={cert} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.certifications.includes(cert)}
                          onChange={(e) => handleCertificationChange(cert, e.target.checked)}
                          className="text-blue-600"
                        />
                        <span className="text-sm">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Product Images</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Upload product images for AI analysis</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Choose Images
                </label>
                {formData.images.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {formData.images.length} image(s) selected
                  </p>
                )}
              </div>
            </div>

            {/* Analyze Button */}
            <div className="text-center">
              <button
                onClick={analyzeProduct}
                disabled={isAnalyzing || !formData.title || !formData.description}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg transition-colors font-semibold flex items-center space-x-2 mx-auto"
              >
                <Brain className="w-5 h-5" />
                <span>{isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}</span>
              </button>
            </div>
          </div>

          {/* AI Analysis Results */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-6">AI Analysis Results</h2>
              
              {!showResults && !isAnalyzing && (
                <div className="text-center py-8">
                  <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Fill out the form and click "Analyze with AI" to see results</p>
                </div>
              )}

              {isAnalyzing && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Analyzing product with AI...</p>
                  <div className="mt-4 space-y-2 text-sm text-gray-500">
                    <p>🔍 Processing text with NLP...</p>
                    <p>🖼️ Analyzing images...</p>
                    <p>📊 Calculating EFS score...</p>
                  </div>
                </div>
              )}

              {showResults && aiAnalysis && (
                <div className="space-y-6">
                  {/* Overall Score */}
                  <div className={`text-center p-6 rounded-lg ${getScoreBg(aiAnalysis.efsScore)}`}>
                    <div className={`text-4xl font-bold ${getScoreColor(aiAnalysis.efsScore)} mb-2`}>
                      {aiAnalysis.efsScore}/100
                    </div>
                    <p className="text-gray-700 font-semibold">Eco-Friendliness Score</p>
                    <div className="flex items-center justify-center space-x-2 mt-3">
                      <Leaf className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-600">
                        {aiAnalysis.ecoCoins} EcoCoins for buyers
                      </span>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div>
                    <h3 className="font-semibold mb-3">Score Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">NLP Analysis</span>
                        <span className="font-semibold">{aiAnalysis.breakdown.nlpScore}/30</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Image Analysis</span>
                        <span className="font-semibold">{aiAnalysis.breakdown.imageScore}/20</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Certifications</span>
                        <span className="font-semibold">{aiAnalysis.breakdown.certificationScore}/20</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Materials</span>
                        <span className="font-semibold">{aiAnalysis.breakdown.materialScore}/15</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Sustainability</span>
                        <span className="font-semibold">{aiAnalysis.breakdown.sustainabilityScore}/15</span>
                      </div>
                    </div>
                  </div>

                  {/* Detected Features */}
                  {aiAnalysis.detectedFeatures.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Detected Eco Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {aiAnalysis.detectedFeatures.map((feature, index) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  {aiAnalysis.recommendations.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Recommendations</h3>
                      <div className="space-y-2">
                        {aiAnalysis.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-semibold">
                      List Product
                    </button>
                    <button 
                      onClick={() => setShowResults(false)}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors"
                    >
                      Analyze Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI Technology Explanation */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How Our AI Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">NLP Analysis</h3>
              <p className="text-gray-600 text-sm">
                Our AI scans product titles and descriptions for sustainability keywords, 
                certifications, and eco-friendly claims using advanced natural language processing.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Upload className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Image Recognition</h3>
              <p className="text-gray-600 text-sm">
                Computer vision models analyze product images to detect eco-labels, 
                packaging materials, and visual sustainability indicators.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Smart Scoring</h3>
              <p className="text-gray-600 text-sm">
                Combines multiple data points to generate an accurate Eco-Friendliness Score 
                and appropriate EcoCoin rewards for customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}