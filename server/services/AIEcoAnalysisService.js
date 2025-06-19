import natural from 'natural';
import nlp from 'compromise';

export class AIEcoAnalysisService {
  constructor() {
    this.stemmer = natural.PorterStemmer;
    this.tokenizer = new natural.WordTokenizer();
    this.sentimentAnalyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, ['negation']);
    
    // Sustainability keywords dictionary
    this.sustainabilityKeywords = {
      materials: {
        high: ['organic', 'bamboo', 'hemp', 'cork', 'recycled', 'upcycled', 'renewable'],
        medium: ['cotton', 'wood', 'paper', 'cardboard', 'glass'],
        low: ['plastic', 'synthetic', 'petroleum', 'chemical']
      },
      certifications: [
        'fsc', 'gots', 'energy star', 'usda organic', 'fair trade',
        'cradle to cradle', 'epeat', 'green seal', 'ecolabel', 'carbon neutral'
      ],
      claims: [
        'biodegradable', 'compostable', 'recyclable', 'reusable', 'sustainable',
        'eco-friendly', 'environmentally friendly', 'green', 'natural',
        'bpa-free', 'toxic-free', 'chemical-free', 'plastic-free'
      ],
      packaging: {
        good: ['plastic-free', 'recyclable', 'compostable', 'minimal', 'biodegradable'],
        bad: ['plastic', 'non-recyclable', 'excessive']
      }
    };
  }

  async analyzeProduct(product) {
    try {
      console.log(`Analyzing product: ${product.title}`);

      // NLP Analysis
      const nlpScore = this.performNLPAnalysis(product);
      
      // Image Analysis (simulated)
      const imageScore = this.performImageAnalysis(product);
      
      // Certification Analysis
      const certificationScore = this.analyzeCertifications(product);
      
      // Material Analysis
      const materialScore = this.analyzeMaterials(product);
      
      // Sustainability Analysis
      const sustainabilityScore = this.analyzeSustainability(product);

      // Calculate total score
      const totalScore = Math.min(100, Math.round(
        nlpScore + imageScore + certificationScore + materialScore + sustainabilityScore
      ));

      // Detect features
      const detectedFeatures = this.extractSustainabilityFeatures(product);

      // Generate recommendations
      const recommendations = this.generateRecommendations(totalScore, product);

      const analysis = {
        nlpScore: Math.round(nlpScore),
        imageScore: Math.round(imageScore),
        certificationScore,
        materialScore,
        sustainabilityScore: Math.round(sustainabilityScore),
        totalScore,
        detectedFeatures,
        recommendations,
        lastAnalyzed: new Date()
      };

      console.log(`Analysis complete for ${product.title}: Score ${totalScore}/100`);
      return analysis;

    } catch (error) {
      console.error('AI analysis error:', error);
      throw new Error('AI analysis failed');
    }
  }

  performNLPAnalysis(product) {
    const allText = [
      product.title || '',
      product.description || '',
      (product.features || []).join(' '),
      product.sustainabilityInfo || '',
      (product.metadata?.materials || []).join(' ')
    ].join(' ').toLowerCase();

    let score = 0;
    const tokens = this.tokenizer.tokenize(allText);
    const stems = tokens.map(token => this.stemmer.stem(token));

    // Check for sustainability keywords
    const allKeywords = [
      ...this.sustainabilityKeywords.materials.high,
      ...this.sustainabilityKeywords.materials.medium,
      ...this.sustainabilityKeywords.certifications,
      ...this.sustainabilityKeywords.claims
    ];

    const detectedKeywords = allKeywords.filter(keyword => 
      allText.includes(keyword.toLowerCase())
    );

    // Score based on keyword density and quality
    score += Math.min(25, detectedKeywords.length * 2);

    // Bonus for high-value keywords
    const highValueKeywords = this.sustainabilityKeywords.materials.high.filter(keyword =>
      allText.includes(keyword.toLowerCase())
    );
    score += highValueKeywords.length * 2;

    // TF-IDF style scoring for keyword importance
    const keywordFrequency = {};
    detectedKeywords.forEach(keyword => {
      keywordFrequency[keyword] = (allText.match(new RegExp(keyword, 'gi')) || []).length;
    });

    const frequencyBonus = Object.values(keywordFrequency).reduce((sum, freq) => sum + Math.min(freq, 3), 0);
    score += frequencyBonus;

    return Math.min(30, score); // Max 30 points for NLP
  }

  performImageAnalysis(product) {
    // Simulated image analysis - in production, this would use actual computer vision
    let score = 0;
    
    if (product.images && product.images.length > 0) {
      // Base score for having images
      score += 5;
      
      // Simulate eco-label detection based on product metadata
      if (product.metadata?.certifications?.length > 0) {
        score += 10; // Simulated eco-label detection
      }
      
      // Simulate packaging analysis
      if (product.metadata?.packaging?.isPlasticFree) {
        score += 5;
      }
      
      if (product.metadata?.packaging?.isRecyclable) {
        score += 3;
      }
      
      // Random component to simulate actual image analysis variance
      score += Math.random() * 7;
    }

    return Math.min(20, score); // Max 20 points for image analysis
  }

  analyzeCertifications(product) {
    let score = 0;
    const certifications = product.metadata?.certifications || [];
    
    // Score based on number and quality of certifications
    score += Math.min(15, certifications.length * 3);
    
    // Bonus for high-value certifications
    const highValueCerts = ['fsc', 'gots', 'energy star', 'usda organic', 'carbon neutral'];
    const hasHighValueCert = certifications.some(cert => 
      highValueCerts.some(hvc => cert.toLowerCase().includes(hvc))
    );
    
    if (hasHighValueCert) {
      score += 5;
    }

    return Math.min(20, score); // Max 20 points for certifications
  }

  analyzeMaterials(product) {
    let score = 0;
    const materials = product.metadata?.materials || [];
    const materialsText = materials.join(' ').toLowerCase();

    // High sustainability materials
    const highSustainabilityMaterials = this.sustainabilityKeywords.materials.high;
    const hasHighSustainability = highSustainabilityMaterials.some(material =>
      materialsText.includes(material)
    );

    if (hasHighSustainability) {
      score += 12;
    }

    // Medium sustainability materials
    const mediumSustainabilityMaterials = this.sustainabilityKeywords.materials.medium;
    const hasMediumSustainability = mediumSustainabilityMaterials.some(material =>
      materialsText.includes(material)
    );

    if (hasMediumSustainability && !hasHighSustainability) {
      score += 8;
    }

    // Penalty for low sustainability materials
    const lowSustainabilityMaterials = this.sustainabilityKeywords.materials.low;
    const hasLowSustainability = lowSustainabilityMaterials.some(material =>
      materialsText.includes(material)
    );

    if (hasLowSustainability) {
      score -= 5;
    }

    return Math.max(0, Math.min(15, score)); // Max 15 points for materials
  }

  analyzeSustainability(product) {
    let score = 0;

    // Packaging analysis
    if (product.metadata?.packaging) {
      if (product.metadata.packaging.isPlasticFree) score += 4;
      if (product.metadata.packaging.isRecyclable) score += 3;
    }

    // Carbon footprint analysis
    if (product.metadata?.carbonFootprint) {
      const rating = product.metadata.carbonFootprint.rating?.toLowerCase();
      if (rating === 'low') score += 4;
      else if (rating === 'medium') score += 2;
    }

    // Energy usage analysis
    if (product.metadata?.energyUsage) {
      const energyText = product.metadata.energyUsage.toLowerCase();
      if (energyText.includes('renewable') || energyText.includes('efficient')) {
        score += 3;
      }
    }

    // Chemical analysis
    if (product.metadata?.chemicals) {
      if (product.metadata.chemicals.bpaFree) score += 2;
      if (product.metadata.chemicals.toxicFree) score += 2;
      if (product.metadata.chemicals.naturalIngredients) score += 2;
    }

    return Math.min(15, score); // Max 15 points for sustainability
  }

  extractSustainabilityFeatures(product) {
    const features = [];
    const allText = [
      product.title || '',
      product.description || '',
      (product.features || []).join(' ')
    ].join(' ').toLowerCase();

    // Extract detected sustainability keywords
    const allKeywords = [
      ...this.sustainabilityKeywords.materials.high,
      ...this.sustainabilityKeywords.certifications,
      ...this.sustainabilityKeywords.claims
    ];

    allKeywords.forEach(keyword => {
      if (allText.includes(keyword.toLowerCase())) {
        features.push(keyword);
      }
    });

    return [...new Set(features)]; // Remove duplicates
  }

  generateRecommendations(score, product) {
    const recommendations = [];

    if (score < 60) {
      recommendations.push("Consider using more sustainable materials like bamboo or recycled content");
      recommendations.push("Add eco-certifications to increase credibility");
    }

    if (!product.metadata?.certifications?.length) {
      recommendations.push("Obtain relevant eco-certifications (FSC, GOTS, Energy Star)");
    }

    if (!product.metadata?.packaging?.isRecyclable) {
      recommendations.push("Switch to recyclable or compostable packaging");
    }

    if (!product.description || product.description.length < 100) {
      recommendations.push("Provide more detailed sustainability information in description");
    }

    if (!product.metadata?.carbonFootprint) {
      recommendations.push("Include carbon footprint information");
    }

    if (score >= 75) {
      recommendations.push("Excellent sustainability score! Consider highlighting this in marketing");
    }

    return recommendations;
  }
}