import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BagDrawer } from './components/BagDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutDemoModal } from './components/CheckoutDemoModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { LookbookPage } from './pages/LookbookPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { JournalPage } from './pages/JournalPage';
import { AboutPage } from './pages/AboutPage';

const AppContent: React.FC = () => {
  const { route, selectedProductId, selectedCollectionId, toast } = useStore();

  const renderPage = () => {
    switch (route) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage key="shop-all" initialFilter="all" />;
      case 'new-arrivals':
        return <ShopPage key="shop-new" initialFilter="new-arrivals" />;
      case 'womenswear':
        return <ShopPage key="shop-womens" initialFilter="womenswear" />;
      case 'menswear':
        return <ShopPage key="shop-mens" initialFilter="menswear" />;
      case 'accessories':
        return <ShopPage key="shop-acc" initialFilter="accessories" />;
      case 'collections':
        return <CollectionsPage key={`col-${selectedCollectionId ?? 'default'}`} />;
      case 'lookbook':
        return <LookbookPage />;
      case 'campaigns':
        return <CampaignsPage />;
      case 'journal':
        return <JournalPage />;
      case 'about':
        return <AboutPage />;
      case 'product':
        return <ProductDetailPage key={`prod-${selectedProductId ?? 'default'}`} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F5F0] text-[#1A1A1A]">
      <Header />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${route}-${selectedProductId ?? ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <BagDrawer />
      <WishlistDrawer />
      <CheckoutDemoModal />

      {/* Subtle Toast Feedback */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 bg-[#0E0E0E] px-5 py-2.5 text-[13px] text-[#F7F5F0] shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
