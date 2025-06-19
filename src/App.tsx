import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { SearchResults } from './pages/SearchResults';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { BuyNow } from './pages/BuyNow';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { OrderHistory } from './pages/OrderHistory';
import { EcoCoinWallet } from './pages/EcoCoinWallet';
import { Returns } from './pages/Returns';
import { GreenStore } from './pages/GreenStore';
import { About } from './pages/About';
import { SellerDashboard } from './pages/SellerDashboard';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/buy-now" element={<BuyNow />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/wallet" element={<EcoCoinWallet />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/greenstore" element={<GreenStore />} />
            <Route path="/about" element={<About />} />
            <Route path="/seller" element={<SellerDashboard />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;