import React, { useState } from 'react';
import {
  Search,
  PlusCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Store,
  Users,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Award,
  Clock,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  SEED_DISTRICTS,
  SEED_PRODUCTS,
  SEED_MARKET_PRICES,
  SEED_USERS
} from '../../data/seedData';
import { PostCard } from '../common/PostCard';
import { QuickPostComposer } from '../common/QuickPostComposer';
import { PriceStatusBadge } from '../common/PriceStatusBadge';
import { translations } from '../../data/translations';

// High-fidelity generated imagery
const HERO_MARKET_IMG = '/src/assets/images/bangladesh_bazar_hero_1791217931670.jpg';
const TANGAIL_PRODUCE_IMG = '/src/assets/images/tangail_market_produce_1791217946299.jpg';

export const HomePage: React.FC = () => {
  const {
    language,
    currentUser,
    posts,
    navigateTo,
    openCreatePostModal,
    setLoginRequiredModal
  } = useApp();

  const t = translations[language];

  // Hero interactive search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPriceType, setSelectedPriceType] = useState<string>('retail');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Top contributors
  const topContributors = SEED_USERS.filter((u) => u.role !== 'main_admin').slice(0, 4);

  // Active posts for feed
  const activePosts = posts
    .filter((p) => p.postStatus === 'active' || p.postStatus === 'under_review')
    .slice(0, 6);

  // Price gainers & losers
  const topGainers = SEED_PRODUCTS.filter((p) => p.changeWeeklyPct > 0).slice(0, 3);
  const topLosers = SEED_PRODUCTS.filter((p) => p.changeWeeklyPct < 0).slice(0, 3);

  // Ticker items
  const tickerItems = [
    { name: 'আলু (কার্ডিনাল)', price: '৳৫৫', change: '-৩.৫%', status: 'down' },
    { name: 'দেশি পেঁয়াজ', price: '৳১১২', change: '+৭.৬%', status: 'up' },
    { name: 'পাকা টমেটো', price: '৳৪৮', change: '-১৬.৬%', status: 'down' },
    { name: 'মিনিকেট চাল', price: '৳৭২', change: '+১.৪%', status: 'up' },
    { name: 'ফার্মের লাল ডিম', price: '৳১৪৫', change: '-৪.০%', status: 'down' },
    { name: 'পদ্মার ইলিশ (১কেজি)', price: '৳১৬৫০', change: '+১২.৫%', status: 'up' },
    { name: 'কাঁচা মরিচ', price: '৳১৮৫', change: '+২৬.৬%', status: 'up' },
    { name: 'মধুপুরের আনারস', price: '৳৪০', change: '-৬.৫%', status: 'down' },
    { name: 'টাঙ্গাইল তাঁতের শাড়ি', price: '৳৯৫০', change: 'স্থিতিশীল', status: 'neutral' }
  ];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('explore', {
      q: searchQuery,
      district: selectedDistrict,
      category: selectedCategory,
      type: selectedPriceType
    });
  };

  const handleQuickDistrictClick = (districtName: string) => {
    setSelectedDistrict(districtName);
    navigateTo('explore', { district: districtName });
  };

  const handleQuickProductSearch = (prodName: string) => {
    setSearchQuery(prodName);
    navigateTo('explore', { q: prodName });
  };

  const handleAddPriceClick = () => {
    if (!currentUser) {
      setLoginRequiredModal(true);
    } else {
      openCreatePostModal();
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      
      {/* 1. LIVE COMMODITY TICKER BAR */}
      <section className="bg-[#1C2E24] text-white py-2 px-4 border-b border-[#2C4235] overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-[#385444]">
            <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
            <span className="font-bold tracking-tight text-[#E4F2EB]">
              {language === 'bn' ? 'লাইভ বাজারদর' : 'Live Market Ticker'}
            </span>
          </div>

          <div className="flex items-center gap-6 overflow-x-auto scrollbar-none whitespace-nowrap text-[11px] sm:text-xs">
            {tickerItems.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 font-medium text-[#D1DDD7]">
                <span>{item.name}</span>
                <span className="font-bold text-white tabular-nums">{item.price}</span>
                {item.status === 'up' ? (
                  <span className="text-[#F87171] inline-flex items-center text-[10px]">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>{item.change}</span>
                  </span>
                ) : item.status === 'down' ? (
                  <span className="text-[#34D399] inline-flex items-center text-[10px]">
                    <ArrowDownRight className="w-3 h-3" />
                    <span>{item.change}</span>
                  </span>
                ) : (
                  <span className="text-[#9CA3AF] text-[10px]">({item.change})</span>
                )}
                {i < tickerItems.length - 1 && <span className="text-[#385444] ml-2">/</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. REIMAGINED HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Authentic Typography & Search Console */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed Metadata Kicker (Zero-Pill Discipline) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2B8A63] tracking-wide">
              <span>{language === 'bn' ? 'কমিউনিটি চালিত উন্মুক্ত বাজারদর' : 'Crowd-Sourced Price Transparency'}</span>
              <span aria-hidden="true">·</span>
              <span>{language === 'bn' ? '৬৪ জেলা লাইভ' : '64 Districts Live'}</span>
              <span aria-hidden="true">·</span>
              <span>{language === 'bn' ? 'নন-ই-কমার্স তথ্য সেবা' : 'Non-Commercial'}</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-[#1C2E24] tracking-tight leading-[1.15] text-balance">
              {language === 'bn'
                ? 'বাংলাদেশের প্রতিটি বাজারের আসল পাইকারি ও খুচরা দর জানুন'
                : 'Discover Genuine Wholesale & Retail Market Prices Across Bangladesh'}
            </h1>

            {/* Descriptive Body */}
            <p className="text-sm sm:text-base text-[#607368] leading-relaxed max-w-2xl">
              {language === 'bn'
                ? 'আড়তের কারসাজি ও মধ্যস্বত্বভোগীদের সিন্ডিকেট এড়িয়ে সাধারণ ক্রেতা, কৃষক এবং খুচরা বিক্রেতাদের শেয়ার করা সঠিক তথ্যের ওপর নির্ভর করুন।'
                : 'Avoid arbitrary middleman price gouging. Access real-time price reports, verified receipts, and community insights posted directly from local arats and neighborhood bazars.'}
            </p>

            {/* Interactive Search Console Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#DDE6E0] shadow-sm space-y-4">
              <form onSubmit={handleHeroSearch} className="space-y-3.5">
                
                {/* Search Bar with Autocomplete Suggestions */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onFocus={() => setIsSearchFocused(true)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'bn' ? 'পণ্য, জেলা বা বাজারের নাম লিখুন (যেমন: আলু, পেঁয়াজ, কারওয়ান বাজার)...' : 'Search product, district or market (e.g. Potato, Onion, Kawran Bazar)...'}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-[#DDE6E0] bg-[#FAFBF9] text-sm text-[#24332B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2B8A63] transition-all font-medium"
                  />
                  <Search className="w-5 h-5 text-[#607368] absolute left-4 top-1/2 -translate-y-1/2" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#718078] hover:text-[#24332B]"
                    >
                      মুছুন
                    </button>
                  )}
                </div>

                {/* Popular Search Chips (Instant click) */}
                <div className="flex items-center gap-2 flex-wrap text-xs text-[#607368]">
                  <span className="font-semibold text-[#1C2E24]">{language === 'bn' ? 'জনপ্রিয় অনুসন্ধান:' : 'Trending:'}</span>
                  {['আলু', 'দেশি পেঁয়াজ', 'পাকা টমেটো', 'ডিম', 'রুই মাছ', 'কাঁচা মরিচ'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleQuickProductSearch(item)}
                      className="px-2.5 py-1 rounded-lg bg-[#F4F7F5] hover:bg-[#E4F2EB] hover:text-[#2B8A63] font-medium transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {/* Quick District Picker & Retail/Wholesale Switch */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                  
                  {/* District Quick Select */}
                  <div className="sm:col-span-7">
                    <label className="block text-[11px] font-bold text-[#607368] uppercase mb-1">
                      {language === 'bn' ? 'জেলা ভিত্তিক দ্রুত ফিল্টার' : 'Select District'}
                    </label>
                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {['টাঙ্গাইল', 'ঢাকা', 'বগুড়া', 'রাজশাহী', 'চট্টগ্রাম', 'কুমিল্লা'].map((dist) => (
                        <button
                          key={dist}
                          type="button"
                          onClick={() => handleQuickDistrictClick(dist)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                            selectedDistrict === dist
                              ? 'bg-[#2B8A63] text-white'
                              : 'bg-[#F4F7F5] text-[#24332B] hover:bg-[#E4F2EB]'
                          }`}
                        >
                          {dist}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Wholesale vs Retail Switch */}
                  <div className="sm:col-span-5">
                    <label className="block text-[11px] font-bold text-[#607368] uppercase mb-1">
                      {language === 'bn' ? 'বাজারের ধরন' : 'Market Type'}
                    </label>
                    <div className="flex bg-[#F4F7F5] p-1 rounded-xl border border-[#DDE6E0]">
                      <button
                        type="button"
                        onClick={() => setSelectedPriceType('retail')}
                        className={`flex-1 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                          selectedPriceType === 'retail' ? 'bg-white text-[#2B8A63] shadow-xs' : 'text-[#607368]'
                        }`}
                      >
                        {t.retail}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPriceType('wholesale')}
                        className={`flex-1 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                          selectedPriceType === 'wholesale' ? 'bg-white text-[#2B8A63] shadow-xs' : 'text-[#607368]'
                        }`}
                      >
                        {t.wholesale}
                      </button>
                    </div>
                  </div>

                </div>

                {/* Primary Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-[#2B8A63] hover:bg-[#1F7451] text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>{t.heroBtnViewPrices}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAddPriceClick}
                    className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-[#E4F2EB] hover:bg-[#D5EADF] text-[#1F7451] font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4 text-[#2B8A63]" />
                    <span>{t.heroBtnAddPrice}</span>
                  </button>
                </div>

              </form>
            </div>

            {/* Quiet Human Trust Markers (Zero-Pill) */}
            <div className="flex items-center gap-4 text-xs text-[#607368] pt-1 flex-wrap">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#2B8A63]" />
                <span>{language === 'bn' ? '৩২০+ দৈনিক রিপোর্ট' : '320+ Daily Reports'}</span>
              </span>
              <span aria-hidden="true" className="text-[#DDE6E0]">·</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Store className="w-4 h-4 text-[#2B8A63]" />
                <span>{language === 'bn' ? 'সরাসরি কাঁচাবাজার ও আড়ত' : 'Direct Farmgate & Arats'}</span>
              </span>
              <span aria-hidden="true" className="text-[#DDE6E0]">·</span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#2B8A63]" />
                <span>{language === 'bn' ? 'কমিউনিটি যাচাইকৃত' : 'Community Moderated'}</span>
              </span>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase & Real Market Spotlight */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#DDE6E0] shadow-md bg-white">
              {/* Image Container with measured contrast scrim */}
              <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-[#24332B]">
                <img
                  src={HERO_MARKET_IMG}
                  alt="Bangladeshi vegetable wholesale arat"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                
                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-xs">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs font-bold text-[#1C2E24] shadow-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#2B8A63] animate-pulse" />
                    <span>{language === 'bn' ? 'আজকের বাজার স্পটলাইট' : 'Market Spotlight'}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
                    কারওয়ান বাজার ও টাঙ্গাইল
                  </span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-3">
                  <div>
                    <span className="text-[11px] text-[#A0B0A8] uppercase tracking-wider block font-semibold">
                      {language === 'bn' ? 'আজকের প্রধান দর বিবরণী' : 'Key Commodity Rates Today'}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {language === 'bn' ? 'আলু ও দেশি পেঁয়াজের পাইকারি সরবরাহ স্বাভাবিক' : 'Potato and Onion Wholesale Supply Steady'}
                    </h3>
                  </div>

                  {/* Overlaid Micro Price Comparison */}
                  <div className="grid grid-cols-2 gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-2.5 border border-white/20 text-xs">
                    <div>
                      <span className="text-[10px] text-white/80 block">কার্ডিনাল আলু</span>
                      <span className="text-base font-black text-[#A7F3D0]">৳ ৫৪-৫৫</span>
                      <span className="text-[10px] text-white/80"> / কেজি (খুচরা)</span>
                    </div>
                    <div className="border-l border-white/20 pl-2.5">
                      <span className="text-[10px] text-white/80">দেশি পেঁয়াজ</span>
                      <span className="text-base font-black text-[#FDE68A]">৳ ১১২</span>
                      <span className="text-[10px] text-white/80"> / কেজি (খুচরা)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigateTo('market-prices')}
                    className="w-full py-2 rounded-xl bg-white text-[#1C2E24] hover:bg-[#F3F6F4] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'সব পণ্যের লাইভ রেট দেখুন' : 'View Full Price Board'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. TODAY'S MARKET HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C2E24] tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#2B8A63]" />
              <span>{t.todayHighlights}</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#607368] mt-0.5">
              {language === 'bn' ? 'সরাসরি যাচাইকৃত ও কমিউনিটি রিপোর্টেড সর্বশেষ দর' : 'Directly reported & verified market rates'}
            </p>
          </div>
          <button
            onClick={() => navigateTo('market-prices')}
            className="text-xs sm:text-sm font-bold text-[#2B8A63] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'bn' ? 'সব দেখুন' : 'View All'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SEED_MARKET_PRICES.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => navigateTo('market-prices')}
              className="bg-white rounded-2xl p-4 border border-[#DDE6E0] shadow-2xs hover:shadow-md hover:border-[#2B8A63] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[11px] font-semibold text-[#607368]">
                    {language === 'bn' ? item.categoryBn : item.category}
                  </span>
                  <PriceStatusBadge status={item.priceStatus} size="sm" />
                </div>

                <h3 className="font-bold text-base text-[#1C2E24] group-hover:text-[#2B8A63] transition-colors">
                  {language === 'bn' ? item.productNameBn : item.productName}
                </h3>

                <div className="flex items-center gap-1 text-xs text-[#607368] mt-0.5 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#2B8A63]" />
                  <span>{language === 'bn' ? item.marketBn : item.market}, {language === 'bn' ? item.districtBn : item.district}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#DDE6E0] flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-[#607368] block">{t.retailPrice}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-[#2B8A63] tabular-nums">৳ {item.retailPrice}</span>
                    <span className="text-[11px] text-[#607368]">/ {language === 'bn' ? item.unitBn : item.unit}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#607368] block">{t.wholesalePrice}</span>
                  <span className="text-sm font-bold text-[#1C2E24] tabular-nums">৳ {item.wholesalePrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. COMMUNITY POSTS FEED (WITH QUICK POST COMPOSER AT TOP) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C2E24] tracking-tight">
              {t.latestPosts}
            </h2>
            <p className="text-xs sm:text-sm text-[#607368] mt-0.5">
              {language === 'bn' ? 'সরাসরি ক্রেতা ও ব্যবসায়ীদের পোস্ট করা তাজা দাম ও রসিদ' : 'Live rates and market photos posted directly by consumers and merchants'}
            </p>
          </div>
          <button
            onClick={() => navigateTo('explore')}
            className="text-xs sm:text-sm font-bold text-[#2B8A63] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'bn' ? 'সকল পোস্ট দেখুন' : 'View All Posts'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* PROMINENT QUICK POST COMPOSER (Elevating Post Creation Option!) */}
        <QuickPostComposer />

        {/* 2-Column Responsive Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* 5. TANGAIL & REGIONAL MARKET SPOTLIGHT (AUTHENTIC BANGLADESH HERITAGE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#DDE6E0] overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-5 h-64 lg:h-80 bg-[#24332B] relative overflow-hidden">
              <img
                src={TANGAIL_PRODUCE_IMG}
                alt="Tangail local agricultural produce"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[10px] font-bold bg-[#2B8A63] px-2 py-0.5 rounded-md mb-1 inline-block">
                  ঐতিহ্যবাহী আঞ্চলিক হাট
                </span>
                <h4 className="font-bold text-base">টাঙ্গাইল: মধুপুরের আনারস ও তাঁত বাজার</h4>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#2B8A63] uppercase tracking-wider">
                  {language === 'bn' ? 'আঞ্চলিক বাজার অনুসন্ধান' : 'Regional Market Spotlight'}
                </span>
                <h3 className="text-2xl font-bold text-[#1C2E24]">
                  {language === 'bn' ? 'টাঙ্গাইল জেলা: স্থানীয় হাট থেকে সরাসরি লাইভ দর' : 'Tangail District: Direct Arat Prices from Source'}
                </h3>
                <p className="text-xs sm:text-sm text-[#607368] leading-relaxed">
                  {language === 'bn'
                    ? 'টাঙ্গাইলের মধুপুর গড়ের মিষ্টি আনারস এবং পাথরাইলের তাঁত শাড়ির সঠিক পাইকারি দর জানুন। মধ্যস্বত্বভোগীদের অতিরিক্ত মুনাফা এড়াতে স্থানীয় বাজার পর্যবেক্ষকদের দেওয়া নির্ভরযোগ্য তথ্যের সাথে যুক্ত থাকুন।'
                    : 'Discover authentic farmgate prices of Madhupur Giant Kew pineapples and Pathrail handloom sarees. Direct community reports prevent unfair markups between regional arats and city supermarkets.'}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => navigateTo('district-detail', { slug: 'tangail' })}
                  className="px-5 py-2.5 rounded-xl bg-[#2B8A63] hover:bg-[#1F7451] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'টাঙ্গাইলের সকল বাজার দেখুন' : 'Explore Tangail Markets'}
                </button>
                <button
                  onClick={() => navigateTo('districts')}
                  className="px-4 py-2.5 rounded-xl border border-[#DDE6E0] text-[#1C2E24] hover:bg-[#F4F7F5] text-xs font-bold transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'অন্যান্য ৬৩ জেলা' : 'Browse All 64 Districts'}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. WEEKLY PRICE MOVERS & TRENDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Trending Products (2 Cols) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-[#DDE6E0] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#1C2E24] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#2B8A63]" />
                <span>{t.trendingProducts}</span>
              </h2>
              <button
                onClick={() => navigateTo('products')}
                className="text-xs font-bold text-[#2B8A63] hover:underline cursor-pointer"
              >
                {language === 'bn' ? 'সব পণ্য' : 'All Products'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SEED_PRODUCTS.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigateTo('product-detail', { slug: p.slug })}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAFBF9] border border-[#DDE6E0] hover:border-[#2B8A63] transition-colors cursor-pointer"
                >
                  <img
                    src={p.image}
                    alt={p.nameEn}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-[#1C2E24] truncate">
                      {language === 'bn' ? p.nameBn : p.nameEn}
                    </h4>
                    <span className="text-[11px] text-[#607368] block">{language === 'bn' ? p.categoryBn : p.category}</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-black text-sm text-[#2B8A63] tabular-nums">
                        ৳ {p.avgRetailPrice} <span className="text-[10px] font-normal text-[#607368]">/ {language === 'bn' ? p.unitBn : p.unit}</span>
                      </span>
                      <PriceStatusBadge status={p.priceStatus} size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* This Week Price Movers (1 Col) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#DDE6E0] shadow-xs">
            <h2 className="text-lg sm:text-xl font-bold text-[#1C2E24] mb-4">
              {t.priceChangesThisWeek}
            </h2>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#D95E5E] flex items-center gap-1 mb-2">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>{language === 'bn' ? 'দাম বেড়েছে (ঊর্ধ্বগতি)' : 'Biggest Increases'}</span>
                </span>
                <div className="space-y-2">
                  {topGainers.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-[#F4F7F5]">
                      <span className="font-semibold text-[#1C2E24]">{language === 'bn' ? item.nameBn : item.nameEn}</span>
                      <span className="font-bold text-[#D95E5E] tabular-nums">+{item.changeWeeklyPct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-[#2B8A63] flex items-center gap-1 mb-2">
                  <ArrowDownRight className="w-4 h-4" />
                  <span>{language === 'bn' ? 'দাম কমেছে (স্বস্তি)' : 'Biggest Drops'}</span>
                </span>
                <div className="space-y-2">
                  {topLosers.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-[#F4F7F5]">
                      <span className="font-semibold text-[#1C2E24]">{language === 'bn' ? item.nameBn : item.nameEn}</span>
                      <span className="font-bold text-[#2B8A63] tabular-nums">{item.changeWeeklyPct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. TOP COMMUNITY CONTRIBUTORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6E0] shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#1C2E24] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D8A04A]" />
                <span>{t.topContributors}</span>
              </h2>
              <p className="text-xs text-[#607368] mt-0.5">
                {language === 'bn' ? 'যাঁদের তথ্যে প্রতিদিন হাজারো মানুষ উপকৃত হচ্ছেন' : 'Active contributors providing verified price intelligence'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topContributors.map((user) => (
              <div
                key={user.id}
                onClick={() => navigateTo('user-profile', { username: user.username })}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAFBF9] border border-[#DDE6E0] hover:border-[#2B8A63] cursor-pointer transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-12 h-12 rounded-full object-cover border border-[#DDE6E0]"
                />
                <div className="min-w-0">
                  <p className="font-bold text-sm text-[#1C2E24] truncate">{user.fullName}</p>
                  <p className="text-[11px] text-[#607368]">{user.district}</p>
                  <span className="text-[10px] font-semibold text-[#2B8A63] block mt-0.5">
                    ট্রাস্ট স্কোর: {user.trustScore}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C2E24] rounded-3xl p-8 sm:p-10 text-center text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.ctaTitle}
            </h2>
            <p className="text-xs sm:text-base text-[#D1DDD7] max-w-xl mx-auto">
              {t.ctaSubtitle}
            </p>
            <div className="pt-2">
              <button
                onClick={handleAddPriceClick}
                className="px-6 py-3 rounded-xl bg-[#2B8A63] text-white font-bold text-xs sm:text-sm hover:bg-[#1F7451] shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t.ctaButton}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
