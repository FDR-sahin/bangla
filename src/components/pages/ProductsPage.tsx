import React, { useState } from 'react';
import { Search, Tag, TrendingUp, ChevronRight, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SEED_PRODUCTS } from '../../data/seedData';
import { PriceStatusBadge } from '../common/PriceStatusBadge';
import { translations } from '../../data/translations';

export const ProductsPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const t = translations[language];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', nameBn: 'সকল ক্যাটাগরি', nameEn: 'All Categories' },
    { id: 'Vegetables', nameBn: 'সবজি', nameEn: 'Vegetables' },
    { id: 'Spices', nameBn: 'মসলা', nameEn: 'Spices' },
    { id: 'Fish', nameBn: 'মাছ', nameEn: 'Fish' },
    { id: 'Grains & Rice', nameBn: 'চাল ও খাদ্যশস্য', nameEn: 'Grains & Rice' },
    { id: 'Poultry & Dairy', nameBn: 'পোল্ট্রি ও দুগ্ধজাত', nameEn: 'Poultry & Dairy' },
    { id: 'Fruits', nameBn: 'ফলমূল', nameEn: 'Fruits' },
    { id: 'Heritage & Textiles', nameBn: 'ঐতিহ্য ও টেক্সটাইল', nameEn: 'Heritage & Textiles' }
  ];

  const filteredProducts = SEED_PRODUCTS.filter((prod) => {
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesSearch =
      prod.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#718078] mb-1">
          <button onClick={() => navigateTo('home')} className="hover:underline">
            {t.navHome}
          </button>
          <span>/</span>
          <span className="text-[#24332B] font-semibold">{t.navProducts}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#24332B] tracking-tight">
          {language === 'bn' ? 'নিত্যপ্রয়োজনীয় পণ্যের তালিকা' : 'Commodities & Products Catalog'}
        </h1>
        <p className="text-xs sm:text-sm text-[#718078] mt-1">
          {language === 'bn'
            ? 'জাতীয় পর্যায়ের গড় পাইকারি ও খুচরা দর এবং জেলাভিত্তিক মূল্যের তুলনা দেখতে পণ্য নির্বাচন করুন।'
            : 'Explore national average wholesale & retail price trends and district comparisons.'}
        </p>
      </div>

      {/* Search & Categories */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DDE6E0] shadow-xs space-y-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'bn' ? 'পণ্যের নাম খুঁজুন (যেমন: আলু, পেঁয়াজ, চাল...)' : 'Search commodities (e.g. Potato, Onion, Rice)...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DDE6E0] text-xs sm:text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
          />
          <Search className="w-4 h-4 text-[#718078] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#2B8A63] text-white'
                  : 'bg-[#F3F6F4] text-[#718078] hover:bg-[#E4F2EB] hover:text-[#2B8A63]'
              }`}
            >
              {language === 'bn' ? cat.nameBn : cat.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            onClick={() => navigateTo('product-detail', { slug: prod.slug })}
            className="bg-white rounded-2xl border border-[#DDE6E0] overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="h-44 overflow-hidden bg-[#F3F6F4] relative">
                <img
                  src={prod.image}
                  alt={prod.nameEn}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[#24332B] font-bold text-[11px] border border-[#DDE6E0]">
                  {language === 'bn' ? prod.categoryBn : prod.category}
                </span>
                <div className="absolute top-3 right-3">
                  <PriceStatusBadge status={prod.priceStatus} size="sm" />
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-base sm:text-lg text-[#24332B] group-hover:text-[#2B8A63] transition-colors mb-1">
                  {language === 'bn' ? prod.nameBn : prod.nameEn}
                </h3>
                <p className="text-xs text-[#718078] line-clamp-2 mb-4 leading-relaxed">
                  {language === 'bn' ? prod.descriptionBn : prod.descriptionEn}
                </p>

                {/* Price Stats Box */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-[#FAFBF9] rounded-xl border border-[#DDE6E0] mb-3">
                  <div>
                    <span className="text-[10px] text-[#718078] block">{t.retailPrice} (জাতীয় গড়)</span>
                    <span className="text-base font-black text-[#2B8A63]">৳ {prod.avgRetailPrice}</span>
                    <span className="text-[10px] text-[#718078]"> / {language === 'bn' ? prod.unitBn : prod.unit}</span>
                  </div>
                  <div className="border-l border-[#DDE6E0] pl-2">
                    <span className="text-[10px] text-[#718078] block">{t.wholesalePrice} (আড়ত দর)</span>
                    <span className="text-sm font-bold text-[#24332B]">৳ {prod.avgWholesalePrice}</span>
                    <span className="text-[10px] text-[#718078]"> / {language === 'bn' ? prod.unitBn : prod.unit}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 bg-[#F8FAF9] border-t border-[#DDE6E0] flex items-center justify-between text-xs">
              <span className="text-[#718078]">
                {prod.seasonalStatus || 'সারা বছরের নিয়মিত পণ্য'}
              </span>
              <span className="font-bold text-[#2B8A63] flex items-center gap-1 group-hover:underline">
                <span>{language === 'bn' ? 'বিস্তারিত বিশ্লেষণ' : 'Detailed Analysis'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
