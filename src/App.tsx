import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { ExplorePage } from './components/pages/ExplorePage';
import { MarketPricesPage } from './components/pages/MarketPricesPage';
import { AnalysisPage } from './components/pages/AnalysisPage';
import { ProductsPage } from './components/pages/ProductsPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { DistrictsPage } from './components/pages/DistrictsPage';
import { DistrictDetailPage } from './components/pages/DistrictDetailPage';
import { BlogPage } from './components/pages/BlogPage';
import { PostDetailPage } from './components/pages/PostDetailPage';
import { UserProfilePage } from './components/pages/UserProfilePage';
import { AboutPage } from './components/pages/AboutPage';
import { HowItWorksPage } from './components/pages/HowItWorksPage';
import { LoginPage, RegisterPage, ForgotPasswordPage } from './components/pages/AuthPages';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { AdminPortal } from './components/admin/AdminPortal';
import { LoginRequiredModal } from './components/common/LoginRequiredModal';
import { CreatePostModal } from './components/common/CreatePostModal';
import { ReportModal } from './components/common/ReportModal';
import { ShareModal } from './components/common/ShareModal';
import { ToastContainer } from './components/common/ToastContainer';

const MainAppContent: React.FC = () => {
  const { activePage } = useApp();

  // If visiting the isolated Main Admin Panel
  if (activePage === 'admin') {
    return (
      <>
        <AdminPortal />
        <ToastContainer />
      </>
    );
  }

  // Render the public website + user dashboard layout
  return (
    <div className="min-h-screen flex flex-col bg-[#F3F6F4] text-[#24332B] font-['Hind_Siliguri','Inter',sans-serif]">
      {/* Sticky Header with prominent Blog navigation link */}
      <Navbar />

      {/* Main Page Dynamic Router */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'explore' && <ExplorePage />}
        {activePage === 'market-prices' && <MarketPricesPage />}
        {activePage === 'analysis' && <AnalysisPage />}
        {activePage === 'products' && <ProductsPage />}
        {activePage === 'product-detail' && <ProductDetailPage />}
        {activePage === 'districts' && <DistrictsPage />}
        {activePage === 'district-detail' && <DistrictDetailPage />}
        {activePage === 'blog' && <BlogPage />} {/* Explicit user requirement! */}
        {activePage === 'post-detail' && <PostDetailPage />}
        {activePage === 'user-profile' && <UserProfilePage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'how-it-works' && <HowItWorksPage />}
        {activePage === 'login' && <LoginPage />}
        {activePage === 'register' && <RegisterPage />}
        {activePage === 'forgot-password' && <ForgotPasswordPage />}
        {activePage === 'dashboard' && <UserDashboard />}
      </main>

      {/* Public Footer */}
      <Footer />

      {/* Global Modals & Notifications */}
      <LoginRequiredModal />
      <CreatePostModal />
      <ReportModal />
      <ShareModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
