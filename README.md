# EcoCommerce - Full-Stack Sustainable E-commerce Platform

A complete Amazon-style e-commerce platform with advanced sustainability features, AI-powered eco-friendliness analysis, and group delivery optimization.

## 🌟 Features

### 🛒 Core E-commerce
- **Product Catalog** with search, filtering, and categories
- **Shopping Cart** with persistent storage
- **Order Management** with tracking and history
- **User Authentication** with JWT tokens
- **Seller Dashboard** for product management

### 🌱 Sustainability Features
- **EcoCoin Wallet** - Earn coins for eco-friendly choices
- **Green Store** - Dedicated eco-friendly product marketplace
- **Product Returns** - Circular economy with EcoCoin rewards
- **Eco Delivery Slots** - Carbon-optimized delivery windows
- **Group Delivery** - AI-powered clustering for shared deliveries

### 🤖 AI-Powered Features
- **Eco-Friendliness Analysis** - NLP + Image analysis for sustainability scoring
- **Smart Search** - AI-enhanced product discovery
- **Group Delivery Clustering** - K-means + Reinforcement Learning
- **Collaborative Filtering** - User similarity matching

## AI Features Deep Dive

### Eco-Friendliness Analysis
The AI system analyzes products using multiple techniques:

1. **NLP Analysis** (30 points max)
   - Keyword detection for sustainability terms
   - TF-IDF scoring for keyword importance
   - Sentiment analysis for eco claims

2. **Image Analysis** (20 points max)
   - Eco-label detection (simulated)
   - Packaging material analysis
   - Visual sustainability indicators

3. **Certification Scoring** (20 points max)
   - FSC, GOTS, Energy Star recognition
   - Organic and fair trade certifications
   - Third-party eco validations

4. **Material Analysis** (15 points max)
   - Sustainable material detection
   - Recycled content assessment
   - Biodegradability evaluation

5. **Sustainability Metrics** (15 points max)
   - Carbon footprint analysis
   - Energy usage assessment
   - Chemical safety evaluation

### Group Delivery Clustering
Advanced AI techniques for optimizing shared deliveries:

1. **K-means Clustering**
   - Geographic proximity grouping
   - Delivery time window optimization
   - Route efficiency calculation

2. **Reinforcement Learning**
   - Q-learning for strategy optimization
   - Success rate improvement over time
   - Dynamic parameter adjustment

3. **Collaborative Filtering**
   - User similarity matching
   - Purchase pattern analysis
   - Preference-based grouping

## Sustainability Impact

### EcoCoin System
- **Earn Coins**: Eco deliveries, group orders, product returns
- **Redeem Rewards**: Discounts, vouchers, environmental actions
- **Track Impact**: CO₂ saved, trees planted, energy conserved

### Circular Economy
- **Product Returns**: Categorized as reusable, recyclable, or waste
- **Reward Structure**: 200/100/50 EcoCoins based on category
- **Environmental Tracking**: Real impact measurement

##  Database Schema

### Key Models
- **User**: Authentication, profile, location data
- **Product**: Catalog with eco-scoring and AI analysis
- **Order**: Purchase history with delivery preferences
- **EcoCoinWallet**: Transaction history and rewards
- **GroupDelivery**: AI-optimized delivery clusters


### Test Features
1. **Product Search**: Try "toothbrush", "organic", "bamboo"
2. **Green Store**: Click "Think Green First" banner
3. **Group Delivery**: Use Buy Now with group options
4. **EcoCoin Wallet**: Check wallet after eco-friendly purchases
5. **Product Returns**: Return delivered items for coins


🪙 EcoCoins – Earn While You Go Green
🌱 What are EcoCoins?
EcoCoins are a unique digital reward currency introduced in our platform to encourage and incentivize users to make sustainable shopping decisions. This feature is part of our broader effort to integrate environmental consciousness directly into everyday e-commerce behavior.

Instead of only promoting green habits passively, we provide a gamified reward system that turns eco-friendly actions into tangible benefits.

✅ How Can Users Earn EcoCoins?

Eco-Friendly Action	                                  EcoCoins Earned
🛍️ Buy EcoGrade A+ to B certified products	          +10 to +50 coins
📦 Choose compostable/sustainable packaging	         +15 coins
👥 Participate in Group Delivery	+20 coins
🚲 Opt for low-emission delivery slots (EV/Bike)	   +15 coins
🌿 Join eco-challenges (e.g., “No Plastic Week”)	   +25–100 coins

Each action reinforces a sustainable habit and brings users closer to becoming an EcoChampion.

💡 Where Can Users Spend EcoCoins?
EcoCoins aren’t just symbolic — they’re valuable.

Use Case	                                       Details
🎁 Redeem Green Gift Bundles	                 Eco-friendly kits (bamboo toothbrushes, cloth bags, etc.)
🎟️ Amazon Gift Vouchers	                     Trade coins for vouchers usable across the platform
🌳 Carbon Offset Actions	                    e.g., 500 EcoCoins = 1 tree planted via verified NGOs
🧾 Sustainable Discounts	                    Use EcoCoins for discounts on select eco-friendly brands




🚚 Group Delivery Clustering – Making Deliveries Smarter and Greener
🔍 What is it?
Group Delivery Clustering is a sustainability-focused feature integrated into our e-commerce platform. It allows users to opt-in to share their delivery with other nearby users who are expecting deliveries around the same date. This helps us bundle multiple deliveries into a single trip, significantly reducing the number of vehicles required, which in turn lowers carbon emissions and fuel usage.

🌿 Why it matters?
E-commerce logistics generate a large amount of last-mile delivery emissions. 
By intelligently grouping orders based on proximity and schedule, we:

Reduce redundant trips
Minimize packaging waste
Promote shared responsibility for environmental impact

⚙️ How it Works
✅ Inputs Collected:
Each active order contains:

User ID
Delivery Location (Latitude & Longitude)
Preferred Delivery Date

📌 Clustering Criteria:
To be grouped together, orders must:

Be within 1–2 km of each other
Have delivery dates within ±1 day
Belong to a group of at least 2 users

🧠 The Algorithm:

We apply K-Means Clustering on geolocation coordinates to find nearby users.
Only orders meeting both distance and date proximity are clustered.


🛠️ Technologies Behind the Feature
Component	                       Tools/Frameworks
Programming Language	              Python
Clustering	                       K-Means (from scikit-learn)
Geospatial Calculation	           Haversine Formula
Math & Data Handling	              NumPy, datetime
Scalability Ready	                 Designed as a modular microservice

💡 Visualize This:
Imagine 3 users living in the same apartment block placing orders 1 day apart. 
Normally, 3 delivery vehicles might be dispatched. With clustering:

We group them into a single delivery cluster
Dispatch one delivery vehicle
Reward users with EcoCoins and free shipping as incentives


♻️ Return at End of Life (EOL) Program

🔄 How It Works:
1. EOL Notification or Voluntary Return:
Customers are notified when a product is nearing the end of its typical usage period, or they can manually initiate a return via the “Return for EcoCoins” option in their order history.

2. Pickup & Verification:
Amazon schedules a pickup or provides drop-off instructions. The returned product is inspected and classified into reusable, recyclable, or waste categories.

3. EcoCoin Rewards:
Based on the return classification, customers earn EcoCoins which can be used for discounts, green bundles, or environmental donations.

4. Material Flow:
Reusable components go to refurbishment centers
Recyclables are sent to partner recycling units
Remaining waste is handled via eco-friendly disposal methods

5. Customer Dashboard:
Users can track their environmental contribution, view total waste diverted, and see lifetime EcoCoins earned.

🚚 Eco-Slot Delivery – Dynamic, Sustainable Delivery Scheduling

Eco-Slot Delivery is a customer-facing feature that enables users to select environmentally optimized delivery time slots during checkout. These “Eco-Slots” are dynamically scheduled based on real-time delivery clustering and route optimization, aligning user orders with other nearby deliveries to reduce redundant trips.

🔄 How It Works:

1. During checkout, customers can opt-in to an Eco-Slot — a flexible delivery window.
2. The system uses geographic clustering and fleet telemetry to group orders that are nearby and scheduled for the same timeframe.
3. Delivery routes are optimized in real-time using location intelligence, minimizing distance and improving efficiency.
4. As a reward for choosing a greener delivery option, customers receive EcoCoins.

🌱 Benefits:

1. Reduced Carbon Emissions – By batching nearby deliveries, Eco-Slots minimize fuel usage and environmental impact.
2. Improved Logistics – Delivery agents can fulfill more orders per route, increasing efficiency.
3. User Incentives – EcoCoins are awarded to customers who participate, encouraging sustainable shopping behavior.


🛍️ Green Store – AI-Powered Eco-Friendly Product Recommendations
The Green Store is an AI-powered module that recommends eco-friendly alternatives to users based on their search behavior and sustainability preferences. It intelligently scores and ranks products using an Eco-Friendliness Scoring Model and recommends them through a personalized interface.

🔧 Core Components:

1. Product Database: Aggregates product data, certifications, and attributes from trusted sources.

2. Eco-Friendliness Scoring Model (EFS): Calculates a product’s sustainability score based on factors like material, packaging, carbon footprint, certifications, durability, end-of-life, and toxicity using:
       EFS = W1*M + W2*P + W3*C + W4*S + W5*D + W6*E + W7*T
       M (Material): Use of recycled, biodegradable, or organic inputs
       P (Packaging): Use of recyclable or compostable packaging
       C (Carbon Footprint): Emissions during production and transport
       S (Certifications): Official eco-labels like Energy Star, USDA Organic
       D (Durability): Product lifespan, reusability, and ease of repair
       E (End-of-Life): Support for recycling, composting, or Return-at-EOL
       T (Toxicity): Absence of harmful chemicals like BPA or heavy metals
Each parameter is normalized and assigned a weight (W1–W7) based on its environmental importance.

3. Recommendation Engine: Uses collaborative filtering, content-based filtering, or hybrid AI models to suggest relevant eco-friendly products.

4. NLP Pipeline: Applies BERT/GPT-based models for text classification, sentiment analysis, and eco-feature extraction from product descriptions and reviews.

5. UI Integration: Displays personalized eco-product suggestions with Eco-Friendly Badges based on user intent and prior behavior.

🧠 ML Techniques:

1. Supervised Learning (Random Forest, Logistic Regression) for product classification
2. Collaborative & Content-Based Filtering for recommendations
3. NLP models for extracting sustainability insights from unstructured text

This system encourages sustainable shopping by surfacing green alternatives and educating users through smart, AI-driven insights.
