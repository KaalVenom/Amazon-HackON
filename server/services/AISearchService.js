import natural from 'natural';
import nlp from 'compromise';

export class AISearchService {
  constructor() {
    this.stemmer = natural.PorterStemmer;
    this.tfidf = new natural.TfIdf();
    this.productIndex = new Map();
    this.searchCache = new Map();
    this.cacheExpiry = 30 * 60 * 1000; // 30 minutes
    
    // Initialize NLP components
    this.initializeNLP();
  }

  initializeNLP() {
    // Tokenizer for query processing
    this.tokenizer = new natural.WordTokenizer();
    
    // Sentiment analyzer for query intent
    this.sentimentAnalyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

    
    // Distance metrics for similarity
    this.distance = natural.JaroWinklerDistance;
  }

  indexProducts(products) {
    console.log(`Indexing ${products.length} products for AI search...`);
    
    // Clear existing index
    this.tfidf = new natural.TfIdf();
    this.productIndex.clear();
    
    products.forEach((product, index) => {
      // Create searchable text combining all relevant fields
      const searchableText = this.createSearchableText(product);
      
      // Add to TF-IDF index
      this.tfidf.addDocument(searchableText);
      
      // Store product reference
      this.productIndex.set(index, product);
      
      // Create keyword index for fast lookup
      this.indexProductKeywords(product, index);
    });
    
    console.log('Product indexing completed');
  }

  createSearchableText(product) {
    const textParts = [
      product.title || '',
      product.description || '',
      product.category || '',
      (product.features || []).join(' '),
      product.sustainabilityInfo || '',
      product.isEcoFriendly ? 'eco-friendly sustainable green' : '',
      product.supportsReturnAtEndOfLife ? 'returnable recyclable' : ''
    ];
    
    return textParts.join(' ').toLowerCase();
  }

  indexProductKeywords(product, index) {
    const keywords = this.extractKeywords(product);
    keywords.forEach(keyword => {
      if (!this.keywordIndex) this.keywordIndex = new Map();
      
      if (!this.keywordIndex.has(keyword)) {
        this.keywordIndex.set(keyword, []);
      }
      this.keywordIndex.get(keyword).push(index);
    });
  }

  extractKeywords(product) {
    const text = this.createSearchableText(product);
    const tokens = this.tokenizer.tokenize(text);
    
    // Remove stop words and stem
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
    
    return tokens
      .filter(token => token.length > 2 && !stopWords.has(token))
      .map(token => this.stemmer.stem(token))
      .filter((token, index, arr) => arr.indexOf(token) === index); // Remove duplicates
  }

  async intelligentSearch(query, products, options = {}) {
    const cacheKey = `${query}_${JSON.stringify(options)}`;
    const cached = this.searchCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < this.cacheExpiry) {
      return cached.results;
    }

    console.log(`AI Search: Processing query "${query}"`);
    
    // Step 1: Parse and understand the query
    const queryAnalysis = this.analyzeQuery(query);
    
    // Step 2: Get initial candidates using multiple methods
    const candidates = await this.getCandidates(query, products, queryAnalysis);
    
    // Step 3: Score and rank candidates
    const scoredResults = this.scoreAndRankProducts(candidates, query, queryAnalysis);
    
    // Step 4: Apply final filters and sorting
    const finalResults = this.applyFinalRanking(scoredResults, options);
    
    // Cache results
    this.searchCache.set(cacheKey, {
      results: finalResults,
      timestamp: Date.now()
    });
    
    console.log(`AI Search: Returning ${finalResults.length} results for "${query}"`);
    return finalResults;
  }

  analyzeQuery(query) {
    const doc = nlp(query);
    
    return {
      originalQuery: query,
      normalizedQuery: query.toLowerCase().trim(),
      tokens: this.tokenizer.tokenize(query.toLowerCase()),
      stems: this.tokenizer.tokenize(query.toLowerCase()).map(token => this.stemmer.stem(token)),
      nouns: doc.nouns().out('array'),
      adjectives: doc.adjectives().out('array'),
      intent: this.detectSearchIntent(query),
      ecoIntent: this.detectEcoIntent(query),
      categoryHint: this.detectCategoryHint(query),
      brandHint: this.detectBrandHint(query)
    };
  }

  detectSearchIntent(query) {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('best') || lowerQuery.includes('top') || lowerQuery.includes('recommend')) {
      return 'recommendation';
    }
    if (lowerQuery.includes('cheap') || lowerQuery.includes('affordable') || lowerQuery.includes('budget')) {
      return 'price_sensitive';
    }
    if (lowerQuery.includes('eco') || lowerQuery.includes('green') || lowerQuery.includes('sustainable')) {
      return 'eco_focused';
    }
    if (lowerQuery.includes('new') || lowerQuery.includes('latest')) {
      return 'novelty_seeking';
    }
    
    return 'general';
  }

  detectEcoIntent(query) {
    const ecoKeywords = [
      'eco', 'green', 'sustainable', 'organic', 'bamboo', 'recycled',
      'biodegradable', 'compostable', 'renewable', 'natural', 'environmentally friendly'
    ];
    
    return ecoKeywords.some(keyword => 
      query.toLowerCase().includes(keyword)
    );
  }

  detectCategoryHint(query) {
    const categoryKeywords = {
      'electronics': ['phone', 'laptop', 'headphone', 'electronic', 'device', 'gadget'],
      'fashion': ['shirt', 'clothing', 'wear', 'fashion', 'apparel'],
      'health': ['toothbrush', 'health', 'care', 'medical', 'wellness'],
      'home': ['kitchen', 'home', 'furniture', 'appliance'],
      'beauty': ['beauty', 'skincare', 'cosmetic', 'makeup']
    };
    
    const lowerQuery = query.toLowerCase();
    
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        return category;
      }
    }
    
    return null;
  }

  detectBrandHint(query) {
    const brands = ['colgate', 'oral-b', 'apple', 'samsung', 'nike', 'adidas'];
    const lowerQuery = query.toLowerCase();
    
    return brands.find(brand => lowerQuery.includes(brand)) || null;
  }

  async getCandidates(query, products, queryAnalysis) {
    const candidates = new Set();
    
    // Method 1: TF-IDF similarity search
    if (this.tfidf.documents.length > 0) {
      this.tfidf.tfidfs(query, (i, measure) => {
        if (measure > 0.1) { // Threshold for relevance
          const product = this.productIndex.get(i);
          if (product) candidates.add(product);
        }
      });
    }
    
    // Method 2: Keyword matching
    const keywordMatches = this.findKeywordMatches(queryAnalysis.stems, products);
    keywordMatches.forEach(product => candidates.add(product));
    
    // Method 3: Fuzzy string matching
    const fuzzyMatches = this.findFuzzyMatches(query, products);
    fuzzyMatches.forEach(product => candidates.add(product));
    
    // Method 4: Category-based search
    if (queryAnalysis.categoryHint) {
      const categoryMatches = products.filter(product => 
        product.category.toLowerCase().includes(queryAnalysis.categoryHint)
      );
      categoryMatches.forEach(product => candidates.add(product));
    }
    
    // Method 5: Semantic similarity (simplified)
    const semanticMatches = this.findSemanticMatches(queryAnalysis, products);
    semanticMatches.forEach(product => candidates.add(product));
    
    return Array.from(candidates);
  }

  findKeywordMatches(queryStems, products) {
    const matches = [];
    
    products.forEach(product => {
      const productKeywords = this.extractKeywords(product);
      const matchCount = queryStems.filter(stem => 
        productKeywords.includes(stem)
      ).length;
      
      if (matchCount > 0) {
        matches.push({ ...product, keywordMatchCount: matchCount });
      }
    });
    
    return matches;
  }

  findFuzzyMatches(query, products) {
    const matches = [];
    const threshold = 0.7;
    
    products.forEach(product => {
      const titleSimilarity = this.distance(query.toLowerCase(), product.title.toLowerCase());
      const descSimilarity = this.distance(query.toLowerCase(), (product.description || '').toLowerCase());
      
      const maxSimilarity = Math.max(titleSimilarity, descSimilarity);
      
      if (maxSimilarity >= threshold) {
        matches.push({ ...product, fuzzySimilarity: maxSimilarity });
      }
    });
    
    return matches;
  }

  findSemanticMatches(queryAnalysis, products) {
    const matches = [];
    
    // Simple semantic matching based on related terms
    const semanticMap = {
      'toothbrush': ['oral', 'dental', 'teeth', 'mouth', 'hygiene'],
      'phone': ['mobile', 'smartphone', 'device', 'communication'],
      'eco': ['green', 'sustainable', 'organic', 'natural', 'environment'],
      'beauty': ['skincare', 'cosmetic', 'makeup', 'care']
    };
    
    queryAnalysis.tokens.forEach(token => {
      const relatedTerms = semanticMap[token] || [];
      
      products.forEach(product => {
        const productText = this.createSearchableText(product);
        const hasSemanticMatch = relatedTerms.some(term => 
          productText.includes(term)
        );
        
        if (hasSemanticMatch && !matches.includes(product)) {
          matches.push({ ...product, semanticMatch: true });
        }
      });
    });
    
    return matches;
  }

  scoreAndRankProducts(candidates, query, queryAnalysis) {
    return candidates.map(product => {
      const scores = {
        relevance: this.calculateRelevanceScore(product, query, queryAnalysis),
        ecoScore: this.calculateEcoScore(product, queryAnalysis),
        availability: this.calculateAvailabilityScore(product),
        rating: this.calculateRatingScore(product),
        freshness: this.calculateFreshnessScore(product),
        returnability: this.calculateReturnabilityScore(product)
      };
      
      // Weighted combination
      const weights = {
        relevance: 0.35,
        ecoScore: 0.20,
        availability: 0.15,
        rating: 0.15,
        freshness: 0.10,
        returnability: 0.05
      };
      
      const totalScore = Object.entries(scores).reduce((sum, [key, score]) => {
        return sum + (score * weights[key]);
      }, 0);
      
      return {
        ...product,
        aiScore: totalScore,
        scoreBreakdown: scores
      };
    });
  }

  calculateRelevanceScore(product, query, queryAnalysis) {
    let score = 0;
    
    // Exact title match
    if (product.title.toLowerCase().includes(query.toLowerCase())) {
      score += 50;
    }
    
    // Description match
    if ((product.description || '').toLowerCase().includes(query.toLowerCase())) {
      score += 30;
    }
    
    // Keyword matches
    const keywordMatches = queryAnalysis.stems.filter(stem => {
      const productText = this.createSearchableText(product);
      return productText.includes(stem);
    }).length;
    
    score += keywordMatches * 10;
    
    // Category match
    if (queryAnalysis.categoryHint && 
        product.category.toLowerCase().includes(queryAnalysis.categoryHint)) {
      score += 25;
    }
    
    // Fuzzy similarity bonus
    if (product.fuzzySimilarity) {
      score += product.fuzzySimilarity * 20;
    }
    
    return Math.min(score, 100); // Cap at 100
  }

  calculateEcoScore(product, queryAnalysis) {
    let score = 0;
    
    if (product.isEcoFriendly) {
      score += 50;
    }
    
    if (product.ecoScore) {
      score += (product.ecoScore / 100) * 30;
    }
    
    if (product.sustainabilityInfo) {
      score += 20;
    }
    
    // Bonus for eco-intent queries
    if (queryAnalysis.ecoIntent) {
      score *= 1.5;
    }
    
    return Math.min(score, 100);
  }

  calculateAvailabilityScore(product) {
    return product.inStock ? 100 : 0;
  }

  calculateRatingScore(product) {
    if (!product.rating) return 50; // Neutral score for unrated products
    return (product.rating / 5) * 100;
  }

  calculateFreshnessScore(product) {
    if (!product.dateAdded) return 50; // Neutral score for products without date
    
    const now = new Date();
    const productDate = new Date(product.dateAdded);
    const daysDiff = (now - productDate) / (1000 * 60 * 60 * 24);
    
    // Fresher products get higher scores
    if (daysDiff <= 7) return 100;
    if (daysDiff <= 30) return 80;
    if (daysDiff <= 90) return 60;
    if (daysDiff <= 180) return 40;
    return 20;
  }

  calculateReturnabilityScore(product) {
    return product.supportsReturnAtEndOfLife ? 100 : 0;
  }

  applyFinalRanking(scoredProducts, options = {}) {
    let results = [...scoredProducts];
    
    // Sort by AI score
    results.sort((a, b) => b.aiScore - a.aiScore);
    
    // Apply additional filters
    if (options.inStockOnly) {
      results = results.filter(product => product.inStock);
    }
    
    if (options.ecoFriendlyOnly) {
      results = results.filter(product => product.isEcoFriendly);
    }
    
    if (options.minRating) {
      results = results.filter(product => 
        product.rating >= options.minRating
      );
    }
    
    if (options.maxPrice) {
      results = results.filter(product => 
        product.price <= options.maxPrice
      );
    }
    
    // Limit results
    const limit = options.limit || 20;
    return results.slice(0, limit);
  }

  // Cleanup expired cache entries
  cleanupCache() {
    const now = Date.now();
    for (const [key, value] of this.searchCache.entries()) {
      if ((now - value.timestamp) > this.cacheExpiry) {
        this.searchCache.delete(key);
      }
    }
  }

  // Get search analytics
  getSearchAnalytics() {
    return {
      indexedProducts: this.productIndex.size,
      cacheSize: this.searchCache.size,
      documentsInTfIdf: this.tfidf.documents.length
    };
  }
}