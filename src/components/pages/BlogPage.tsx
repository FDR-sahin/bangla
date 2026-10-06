import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  Share2,
  Tag,
  ArrowRight,
  Search,
  Sparkles,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SEED_BLOG_POSTS } from '../../data/seedData';
import { BlogPost } from '../../types';

export const BlogPage: React.FC = () => {
  const { language, openShareModal, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = [
    { id: 'all', nameBn: 'সবগুলো নিবন্ধ', nameEn: 'All Articles' },
    { id: 'Market Intelligence', nameBn: 'বাজার গবেষণা', nameEn: 'Market Intelligence' },
    { id: 'Fisheries & Quality', nameBn: 'মৎস্য ও মান যাচাই', nameEn: 'Fisheries & Quality' },
    { id: 'Local Heritage', nameBn: 'স্থানীয় ঐতিহ্য ও অর্থনীতি', nameEn: 'Local Heritage' },
    { id: 'Consumer Guide', nameBn: 'ভোক্তা গাইড', nameEn: 'Consumer Guide' }
  ];

  const filteredPosts = SEED_BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      post.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerptBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = SEED_BLOG_POSTS[0];

  const handleShare = (post: BlogPost) => {
    const url = window.location.origin + `?blog=${post.slug}`;
    openShareModal(language === 'bn' ? post.titleBn : post.titleEn, url);
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Blog Hero Header */}
      <section className="bg-gradient-to-b from-[#E4F2EB] to-[#F3F6F4] border-b border-[#DDE6E0] pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DDE6E0] text-[#2B8A63] text-xs font-bold mb-4 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'বাজারবাংলা ব্লগ ও বাজার গবেষণা' : 'BazarBangla Blog & Market Insights'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#24332B] tracking-tight mb-4">
            {language === 'bn'
              ? 'বাজার বিশ্লেষণ, কৃষি অর্থনীতি ও ভোক্তা সচেতনতা'
              : 'Market Analysis, Agri-Economics & Consumer Literacy'}
          </h1>

          <p className="text-sm sm:text-base text-[#718078] max-w-2xl mx-auto leading-relaxed mb-8">
            {language === 'bn'
              ? 'বাংলাদেশের নিত্যপণ্যের সাপ্লাই চেইন, পাইকারি আড়তের রহস্য, মৌসুমভিত্তিক দামের পূর্বাভাস এবং পণ্য যাচাইয়ের নির্ভরযোগ্য গাইড।'
              : 'Reliable guides on commodity supply chains, wholesale market dynamics, seasonal price predictions, and product quality checks across Bangladesh.'}
          </p>

          {/* Search Bar in Hero */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'bn' ? 'ব্লগ বা বিষয়ের নাম দিয়ে খুঁজুন...' : 'Search articles, commodities or guides...'}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#DDE6E0] bg-white text-sm text-[#24332B] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
            />
            <Search className="w-4 h-4 text-[#718078] absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#2B8A63] text-white shadow-xs'
                  : 'bg-white text-[#718078] border border-[#DDE6E0] hover:border-[#2B8A63] hover:text-[#24332B]'
              }`}
            >
              {language === 'bn' ? cat.nameBn : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Featured Article Card */}
        {selectedCategory === 'all' && !searchQuery && featuredPost && (
          <div className="mb-12 bg-white rounded-3xl border border-[#DDE6E0] overflow-hidden shadow-xs hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 h-64 lg:h-auto relative overflow-hidden bg-[#F3F6F4]">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.titleEn}
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#2B8A63] text-white text-xs font-bold shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'বিশেষ প্রতিবেদন' : 'Featured Insight'}</span>
                </span>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#718078] mb-3">
                    <span className="font-semibold text-[#2B8A63] bg-[#E4F2EB] px-2.5 py-0.5 rounded-md">
                      {language === 'bn' ? featuredPost.categoryBn : featuredPost.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2
                    onClick={() => setActiveArticle(featuredPost)}
                    className="text-xl sm:text-2xl font-bold text-[#24332B] mb-3 hover:text-[#2B8A63] cursor-pointer transition-colors leading-tight"
                  >
                    {language === 'bn' ? featuredPost.titleBn : featuredPost.titleEn}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#718078] line-clamp-3 mb-6 leading-relaxed">
                    {language === 'bn' ? featuredPost.excerptBn : featuredPost.excerptEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DDE6E0] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={featuredPost.authorAvatar}
                      alt={featuredPost.author}
                      className="w-9 h-9 rounded-full object-cover border border-[#DDE6E0]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#24332B]">{featuredPost.author}</p>
                      <p className="text-[10px] text-[#718078]">{featuredPost.authorRole}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveArticle(featuredPost)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2B8A63] hover:bg-[#1F7451] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'পুরো পড়ুন' : 'Read Article'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-[#DDE6E0] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div
                  onClick={() => setActiveArticle(post)}
                  className="h-48 overflow-hidden bg-[#F3F6F4] relative cursor-pointer"
                >
                  <img
                    src={post.coverImage}
                    alt={post.titleEn}
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[#2B8A63] font-bold text-[11px] border border-[#DDE6E0]">
                    {language === 'bn' ? post.categoryBn : post.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-[#718078] mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3
                    onClick={() => setActiveArticle(post)}
                    className="font-bold text-base sm:text-lg text-[#24332B] mb-2 hover:text-[#2B8A63] cursor-pointer transition-colors line-clamp-2 leading-snug"
                  >
                    {language === 'bn' ? post.titleBn : post.titleEn}
                  </h3>

                  <p className="text-xs text-[#718078] line-clamp-3 mb-4 leading-relaxed">
                    {language === 'bn' ? post.excerptBn : post.excerptEn}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#F3F6F4] text-[#718078] text-[10px] font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author & Footer */}
              <div className="px-5 py-3.5 bg-[#FAFBF9] border-t border-[#DDE6E0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div className="text-[11px]">
                    <span className="font-semibold text-[#24332B] block">{post.author}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare(post)}
                    className="p-1.5 rounded-lg text-[#718078] hover:text-[#24332B] hover:bg-[#E4F2EB] transition-colors"
                    title="Share"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveArticle(post)}
                    className="text-xs font-bold text-[#2B8A63] hover:underline flex items-center gap-0.5"
                  >
                    <span>{language === 'bn' ? 'পড়ুন' : 'Read'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#DDE6E0]">
            <BookOpen className="w-12 h-12 text-[#718078] mx-auto mb-3 opacity-40" />
            <h3 className="text-base font-bold text-[#24332B]">
              {language === 'bn' ? 'কোনো নিবন্ধ খুঁজে পাওয়া যায়নি' : 'No articles found'}
            </h3>
            <p className="text-xs text-[#718078] mt-1">
              {language === 'bn' ? 'অন্য কোনো কি-ওয়ার্ড দিয়ে আবার চেষ্টা করুন।' : 'Try adjusting your search criteria.'}
            </p>
          </div>
        )}
      </div>

      {/* Full Article Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full my-auto shadow-2xl border border-[#DDE6E0] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header Image */}
            <div className="relative h-64 sm:h-80 w-full bg-[#24332B]">
              <img
                src={activeArticle.coverImage}
                alt={activeArticle.titleEn}
                className="w-full h-full object-cover opacity-90"
              />
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-4 sm:left-6 right-4 text-white">
                <span className="px-2.5 py-1 rounded-md bg-[#2B8A63] font-bold text-xs inline-block mb-2">
                  {language === 'bn' ? activeArticle.categoryBn : activeArticle.category}
                </span>
                <h1 className="text-lg sm:text-2xl font-black leading-tight text-white drop-shadow-md">
                  {language === 'bn' ? activeArticle.titleBn : activeArticle.titleEn}
                </h1>
              </div>
            </div>

            {/* Author Bar */}
            <div className="px-6 py-4 border-b border-[#DDE6E0] flex items-center justify-between flex-wrap gap-3 bg-[#FAFBF9]">
              <div className="flex items-center gap-3">
                <img
                  src={activeArticle.authorAvatar}
                  alt={activeArticle.author}
                  className="w-10 h-10 rounded-full object-cover border border-[#DDE6E0]"
                />
                <div>
                  <p className="text-xs font-bold text-[#24332B]">{activeArticle.author}</p>
                  <p className="text-[10px] text-[#718078]">{activeArticle.authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#718078]">
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
                <button
                  onClick={() => handleShare(activeArticle)}
                  className="flex items-center gap-1 text-[#2B8A63] font-semibold hover:underline"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'শেয়ার' : 'Share'}</span>
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 max-h-[55vh] overflow-y-auto space-y-4 text-sm leading-relaxed text-[#24332B]">
              <div className="bg-[#E4F2EB] p-4 rounded-xl border border-[#C2E3D2] text-[#1F7451] font-medium text-xs sm:text-sm">
                <strong>{language === 'bn' ? 'সারসংক্ষেপ:' : 'Key Summary:'} </strong>
                {language === 'bn' ? activeArticle.excerptBn : activeArticle.excerptEn}
              </div>

              <div className="prose max-w-none whitespace-pre-line text-sm sm:text-base leading-relaxed text-[#24332B]">
                {language === 'bn' ? activeArticle.contentBn : activeArticle.contentEn}
              </div>

              <div className="pt-6 border-t border-[#DDE6E0]">
                <h4 className="text-xs font-bold text-[#718078] uppercase mb-2">
                  {language === 'bn' ? 'সম্পর্কিত ট্যাগসমূহ' : 'Related Topics'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeArticle.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#F3F6F4] text-[#24332B] font-medium text-xs border border-[#DDE6E0]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Market Action Banner */}
              <div className="mt-6 p-4 rounded-2xl bg-[#F8FAF9] border border-[#DDE6E0] flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#2B8A63]" />
                  <span className="text-xs font-semibold text-[#24332B]">
                    {language === 'bn' ? 'এই পণ্যের আজকের লাইভ দর দেখতে চান?' : 'Want to view live market rates for this item?'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    navigateTo('market-prices');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-[#2B8A63] text-white text-xs font-bold hover:bg-[#1F7451] transition-colors"
                >
                  {language === 'bn' ? 'বাজারদর দেখুন' : 'View Market Prices'}
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#DDE6E0] flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 rounded-xl bg-[#24332B] text-white text-xs font-semibold hover:bg-black transition-colors"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
