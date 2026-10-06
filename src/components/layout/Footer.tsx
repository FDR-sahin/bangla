import React from 'react';
import { ShieldCheck, Heart, ExternalLink, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

export const Footer: React.FC = () => {
  const { language, navigateTo } = useApp();
  const t = translations[language];

  return (
    <footer className="bg-white border-t border-[#DDE6E0] pt-12 pb-8 mt-16 text-[#718078] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#DDE6E0]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2B8A63] text-white flex items-center justify-center font-black text-lg">
                বা
              </div>
              <span className="font-extrabold text-2xl text-[#24332B] tracking-tight">
                {t.brandName}
              </span>
            </div>
            
            <p className="text-[#24332B] font-semibold text-sm">
              “{t.tagline}”
            </p>

            <p className="text-xs leading-relaxed max-w-sm">
              {language === 'bn'
                ? 'বাংলাদেশের ৬৪ জেলার কাঁচাবাজার, আড়ত ও স্থানীয় হাটসমূহের পাইকারি ও খুচরা বাজারদর সাধারণ নাগরিক ও ব্যবসায়ীদের দ্বারা সরাসরি হালনাগাদ করার উন্মুক্ত প্ল্যাটফর্ম।'
                : 'An open crowd-sourced platform for daily wholesale and retail commodity prices across 64 districts and local arats in Bangladesh.'}
            </p>

            <div className="p-3 bg-[#F3F6F4] rounded-xl border border-[#DDE6E0] text-xs text-[#24332B] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#2B8A63] shrink-0" />
              <span>
                {language === 'bn'
                  ? 'এটি কোনো ই-কমার্স সাইট নয়। এখানে কোনো কেনাবেচা বা লেনদেন হয় না।'
                  : 'Notice: This platform is NOT an e-commerce site. No orders or payments are processed.'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#24332B] text-sm uppercase tracking-wider">
              {language === 'bn' ? 'প্রধান পেজসমূহ' : 'Main Pages'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#2B8A63] transition-colors cursor-pointer">
                  {t.navHome}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explore')} className="hover:text-[#2B8A63] transition-colors cursor-pointer">
                  {t.navExplore}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('market-prices')} className="hover:text-[#2B8A63] transition-colors cursor-pointer">
                  {t.navMarketPrices}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('analysis')} className="hover:text-[#2B8A63] transition-colors cursor-pointer">
                  {t.navAnalysis}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blog')} className="hover:text-[#2B8A63] font-semibold text-[#2B8A63] transition-colors cursor-pointer flex items-center gap-1">
                  <span>{t.navBlog}</span>
                  <span className="px-1 py-0.2 bg-[#D8A04A] text-white text-[9px] rounded-full">NEW</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Products & Districts */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#24332B] text-sm uppercase tracking-wider">
              {language === 'bn' ? 'অঞ্চল ও পণ্য' : 'Regions & Items'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('districts')} className="hover:text-[#2B8A63] transition-colors cursor-pointer">
                  {t.navDistricts} (৬৪ জেলা)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('district-detail', { slug: 'tangail' })} className="hover:text-[#2B8A63] transition-colors cursor-pointer">
                  {language === 'bn' ? 'টাঙ্গাইল জেলা বাজারদর' : 'Tangail District Prices'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('district-detail', { slug: 'dhaka' })} className="hover:text-[#2B8A63] transition-colors cursor-pointer">
                  {language === 'bn' ? 'ঢাকা কারওয়ান বাজার' : 'Dhaka Kawran Bazar'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('products')} className="hover:text-[#2B8A63] transition-colors cursor-pointer">
                  {t.navProducts}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('product-detail', { slug: 'potato' })} className="hover:text-[#2B8A63] transition-colors cursor-pointer">
                  {language === 'bn' ? 'আলুর লাইভ বাজারদর' : 'Potato Live Prices'}
                </button>
              </li>
            </ul>
          </div>

          {/* Guidelines & Separate Admin Access */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#24332B] text-sm uppercase tracking-wider">
              {language === 'bn' ? 'নীতিমালা ও তথ্য' : 'Information & Access'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('how-it-works')} className="hover:text-[#2B8A63] transition-colors cursor-pointer">
                  {t.navHowItWorks}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#2B8A63] transition-colors cursor-pointer">
                  {t.navAbout}
                </button>
              </li>
              <li>
                <span className="text-[#718078]">{language === 'bn' ? 'কমিউনিটি নীতিমালা' : 'Community Guidelines'}</span>
              </li>
              <li className="pt-2">
                {/* Completely separate Main Admin Access link */}
                <button
                  onClick={() => navigateTo('admin')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#24332B] text-white hover:bg-black transition-colors font-medium text-xs cursor-pointer shadow-xs"
                >
                  <Lock className="w-3 h-3 text-[#D8A04A]" />
                  <span>{language === 'bn' ? 'মেইন এডমিন প্যানেল' : 'Main Admin Panel'}</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 BazarBangla. Made with pride for Bangladesh.</p>
          <div className="flex items-center gap-4 text-[#718078]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Community</span>
            <span>•</span>
            <span className="text-[#2B8A63] font-semibold">ভোক্তা সচেতনতা মঞ্চ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
