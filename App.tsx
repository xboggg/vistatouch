
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BuyPage from './pages/BuyPage';
import RentPage from './pages/RentPage';
import BTRPage from './pages/BTRPage';
import DevelopmentsPage from './pages/DevelopmentsPage';
import FundingPage from './pages/FundingPage';
import ContactPage from './pages/ContactPage';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import SavedPropertiesPage from './pages/SavedPropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/rent" element={<RentPage />} />
            <Route path="/btr" element={<BTRPage />} />
            <Route path="/developments" element={<DevelopmentsPage />} />
            <Route path="/funding" element={<FundingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/saved" element={<SavedPropertiesPage />} />
            <Route path="/property/:id" element={<PropertyDetailsPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </HashRouter>
  );
};

export default App;
