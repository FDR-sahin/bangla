import React, { useState } from 'react';
import {
  Search,
  Filter,
  PlusCircle,
  Sparkles,
  ArrowUpDown,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SEED_DISTRICTS } from '../../data/seedData';
import { PostCard } from '../common/PostCard';
import { QuickPostComposer } from '../common/QuickPostComposer';
import { translations } from '../../data/translations';

export const ExplorePage: React.FC = () => {
  const { language, posts, pageParams, currentUser, setLoginRequiredModal, openCreatePostModal, navigateTo } = useApp();
  const t = translations[language];

  const initialQuery = pageParams.q || '';
  const initialDistrict = pageParams.district || 'all';
  const initialCategory = pageParams.category || 'all';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedType, setSelectedType] = useState<string>('all'); // all, price_report, market_post
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price_low' | 'price_high'>('newest');

  const filteredPosts = posts
    .filter((post) => {
      if (post.postStatus === 'deleted' || post.postStatus === 'temporarily_hidden') return false;

      const matchesSearch =
        !searchQuery ||
        (post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.productName && post.productName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.productNameBn && post.productNameBn.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.market.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.district.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDistrict = selectedDistrict === 'all' || post.district.toLowerCase() === selectedDistrict.toLowerCase();
      const matchesCategory = selectedCategory === 'all' || (post.category && post.category.toLowerCase() === selectedCategory.toLowerCase());
      const matchesType = selectedType === 'all' || post.postType === selectedType;

      return matchesSearch && matchesDistrict && matchesCategory && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.likesCount - a.likesCount;
      if (sortBy === 'price_low') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price_high') return (b.price || 0) - (a.price || 0);
      // default newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const handleCreateClick = () => {
    if (!currentUser) {
      setLoginRequiredModal(true);
    } else {
      openCreatePostModal();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#718078] mb-1">
            <button onClick={() => navigateTo('home')} className="hover:underline">
              {t.navHome}
            </button>
            <span>/</span>
            <span className="text-[#24332B] font-semibold">{t.navExplore}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#24332B] tracking-tight">
            {language === 'bn' ? 'কমিউনিটি মার্কেট পোস্ট এক্সপ্লোর করুন' : 'Explore Community Market Posts'}
          </h1>
          <p className="text-xs sm:text-sm text-[#718078] mt-1">
            {language === 'bn'
              ? 'সারা দেশের ক্রেতা ও বিক্রেতাদের শেয়ার করা দাম, ছবি ও বাজারের সাম্প্রতিক পরিস্থিতি।'
              : 'Direct market photos, receipts, and live price updates shared across Bangladesh.'}
          </p>
        </div>

        <button
          onClick={handleCreateClick}
          className="px-4 py-2.5 rounded-xl bg-[#2B8A63] hover:bg-[#1F7451] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.createPost}</span>
        </button>
      </div>

      {/* Filter and Search Box */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DDE6E0] shadow-xs space-y-3">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DDE6E0] text-xs sm:text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
          />
          <Search className="w-4 h-4 text-[#718078] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {/* Post Type Tab */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] bg-white text-xs text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
          >
            <option value="all">{language === 'bn' ? 'সকল পোস্টের ধরন' : 'All Post Types'}</option>
            <option value="price_report">{language === 'bn' ? 'শুধুমাত্র মূল্য রিপোর্ট' : 'Price Reports Only'}</option>
            <option value="market_post">{language === 'bn' ? 'সাধারণ বাজার আপডেট' : 'Market Updates'}</option>
          </select>

          {/* District Filter */}
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] bg-white text-xs text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
          >
            <option value="all">{t.allDistricts}</option>
            {SEED_DISTRICTS.map((d) => (
              <option key={d.id} value={d.nameEn}>
                {language === 'bn' ? d.nameBn : d.nameEn}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] bg-white text-xs text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
          >
            <option value="all">{t.allCategories}</option>
            <option value="Vegetables">{language === 'bn' ? 'সবজি' : 'Vegetables'}</option>
            <option value="Spices">{language === 'bn' ? 'মসলা' : 'Spices'}</option>
            <option value="Fish">{language === 'bn' ? 'মাছ' : 'Fish'}</option>
            <option value="Grains & Rice">{language === 'bn' ? 'চাল ও খাদ্যশস্য' : 'Grains & Rice'}</option>
            <option value="Fruits">{language === 'bn' ? 'ফলমূল' : 'Fruits'}</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] bg-white text-xs text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
          >
            <option value="newest">{language === 'bn' ? 'সর্বশেষ প্রকাশিত' : 'Newest First'}</option>
            <option value="popular">{language === 'bn' ? 'সর্বাধিক পছন্দ (লাইক)' : 'Most Liked'}</option>
            <option value="price_low">{language === 'bn' ? 'মূল্য: কম থেকে বেশি' : 'Price: Low to High'}</option>
            <option value="price_high">{language === 'bn' ? 'মূল্য: বেশি থেকে কম' : 'Price: High to Low'}</option>
          </select>
        </div>

        {/* Counter */}
        <div className="pt-2 text-xs text-[#718078] flex justify-between items-center border-t border-[#DDE6E0]">
          <span>
            {language === 'bn' ? `মোট প্রদর্শিত: ${filteredPosts.length} টি পোস্ট` : `Showing ${filteredPosts.length} posts`}
          </span>
          {(searchQuery || selectedDistrict !== 'all' || selectedCategory !== 'all' || selectedType !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDistrict('all');
                setSelectedCategory('all');
                setSelectedType('all');
              }}
              className="text-[#D95E5E] hover:underline"
            >
              {language === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}
            </button>
          )}
        </div>
      </div>

      {/* Quick Post Composer at top of feed */}
      <QuickPostComposer />

      {/* Posts Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#DDE6E0]">
          <Tag className="w-12 h-12 text-[#718078] mx-auto mb-3 opacity-40" />
          <h3 className="text-base font-bold text-[#24332B]">
            {language === 'bn' ? 'কোনো পোস্ট খুঁজে পাওয়া যায়নি' : 'No posts match your filters'}
          </h3>
          <p className="text-xs text-[#718078] mt-1 mb-4">
            {language === 'bn' ? 'ফিল্টার পরিবর্তন করে দেখুন অথবা এই বাজারের প্রথম দামটি আপনি যোগ করুন।' : 'Try changing your filter settings or submit the first price report.'}
          </p>
          <button
            onClick={handleCreateClick}
            className="px-4 py-2 rounded-xl bg-[#2B8A63] text-white text-xs font-semibold hover:bg-[#1F7451]"
          >
            {t.createPost}
          </button>
        </div>
      )}

    </div>
  );
};
