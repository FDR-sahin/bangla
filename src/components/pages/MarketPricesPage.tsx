import React, { useState } from 'react';
import {
  Search,
  Filter,
  TrendingUp,
  MapPin,
  ShieldCheck,
  Users,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SEED_MARKET_PRICES, SEED_DISTRICTS, SEED_PRODUCTS } from '../../data/seedData';
import { PriceStatusBadge } from '../common/PriceStatusBadge';
import { translations } from '../../data/translations';

export const MarketPricesPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const t = translations[language];

  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceTypeView, setPriceTypeView] = useState<'both' | 'retail' | 'wholesale'>('both');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

  const filteredPrices = SEED_MARKET_PRICES.filter((item) => {
    const matchesDistrict = selectedDistrict === 'all' || item.district === selectedDistrict;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.productNameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.market.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.marketBn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDistrict && matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Page Title & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#718078] mb-1">
          <button onClick={() => navigateTo('home')} className="hover:underline">
            {t.navHome}
          </button>
          <span>/</span>
          <span className="text-[#24332B] font-semibold">{t.navMarketPrices}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#24332B] tracking-tight">
          {language === 'bn' ? 'বাংলাদেশের বাজারদর তালিকা' : 'Market Prices Directory'}
        </h1>
        <p className="text-xs sm:text-sm text-[#718078] mt-1">
          {language === 'bn'
            ? 'বিভিন্ন জেলা ও বাজারের পাইকারি ও খুচরা মূল্যের লাইভ বিবরণী ও তুলনামূলক তালিকা।'
            : 'Live wholesale and retail rates across various districts and arats in Bangladesh.'}
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DDE6E0] shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'bn' ? 'পণ্য বা বাজারের নাম...' : 'Search product or market...'}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDE6E0] text-xs sm:text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
            />
            <Search className="w-4 h-4 text-[#718078] absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* District Filter */}
          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] bg-white text-xs sm:text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
            >
              <option value="all">{t.allDistricts}</option>
              {SEED_DISTRICTS.map((d) => (
                <option key={d.id} value={d.nameEn}>
                  {language === 'bn' ? d.nameBn : d.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] bg-white text-xs sm:text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
            >
              <option value="all">{t.allCategories}</option>
              <option value="Vegetables">{language === 'bn' ? 'সবজি' : 'Vegetables'}</option>
              <option value="Spices">{language === 'bn' ? 'মসলা' : 'Spices'}</option>
              <option value="Fish">{language === 'bn' ? 'মাছ' : 'Fish'}</option>
              <option value="Grains & Rice">{language === 'bn' ? 'চাল ও খাদ্যশস্য' : 'Grains & Rice'}</option>
            </select>
          </div>

          {/* Price Type Toggle */}
          <div className="flex bg-[#F3F6F4] p-1 rounded-xl border border-[#DDE6E0]">
            <button
              onClick={() => setPriceTypeView('both')}
              className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                priceTypeView === 'both' ? 'bg-white text-[#2B8A63] shadow-xs' : 'text-[#718078]'
              }`}
            >
              {t.both}
            </button>
            <button
              onClick={() => setPriceTypeView('retail')}
              className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                priceTypeView === 'retail' ? 'bg-white text-[#2B8A63] shadow-xs' : 'text-[#718078]'
              }`}
            >
              {t.retail}
            </button>
            <button
              onClick={() => setPriceTypeView('wholesale')}
              className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                priceTypeView === 'wholesale' ? 'bg-white text-[#2B8A63] shadow-xs' : 'text-[#718078]'
              }`}
            >
              {t.wholesale}
            </button>
          </div>

        </div>

        {/* View Switcher Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-[#DDE6E0] text-xs text-[#718078]">
          <span>
            {language === 'bn' ? `মোট পাওয়া গেছে: ${filteredPrices.length} টি দর রিপোর্ট` : `Showing ${filteredPrices.length} price records`}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-lg font-medium cursor-pointer ${
                viewMode === 'table' ? 'bg-[#2B8A63] text-white' : 'hover:bg-[#F3F6F4]'
              }`}
            >
              {language === 'bn' ? 'টেবিল ভিউ' : 'Table View'}
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`px-3 py-1 rounded-lg font-medium cursor-pointer ${
                viewMode === 'card' ? 'bg-[#2B8A63] text-white' : 'hover:bg-[#F3F6F4]'
              }`}
            >
              {language === 'bn' ? 'কার্ড ভিউ' : 'Card View'}
            </button>
          </div>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-[#DDE6E0] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAFBF9] border-b border-[#DDE6E0] text-[11px] font-bold text-[#718078] uppercase">
                <tr>
                  <th className="py-3 px-4">{language === 'bn' ? 'পণ্য ও বাজার' : 'Product & Market'}</th>
                  {(priceTypeView === 'both' || priceTypeView === 'wholesale') && (
                    <th className="py-3 px-4">{t.wholesalePrice}</th>
                  )}
                  {(priceTypeView === 'both' || priceTypeView === 'retail') && (
                    <th className="py-3 px-4">{t.retailPrice}</th>
                  )}
                  <th className="py-3 px-4">{language === 'bn' ? 'পরিবর্তন' : 'Change'}</th>
                  <th className="py-3 px-4">{language === 'bn' ? 'অবস্থা' : 'Status'}</th>
                  <th className="py-3 px-4">{language === 'bn' ? 'উৎস ও সত্যতা' : 'Source & Verification'}</th>
                  <th className="py-3 px-4">{language === 'bn' ? 'সর্বশেষ আপডেট' : 'Last Updated'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDE6E0]">
                {filteredPrices.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F8FAF9] transition-colors">
                    {/* Product & Market */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#24332B] text-sm sm:text-base">
                        {language === 'bn' ? item.productNameBn : item.productName}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#718078] mt-0.5">
                        <MapPin className="w-3 h-3 text-[#2B8A63]" />
                        <span>{language === 'bn' ? item.marketBn : item.market}, {language === 'bn' ? item.districtBn : item.district}</span>
                      </div>
                    </td>

                    {/* Wholesale */}
                    {(priceTypeView === 'both' || priceTypeView === 'wholesale') && (
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-[#24332B] text-sm sm:text-base">৳ {item.wholesalePrice}</span>
                        <span className="text-[11px] text-[#718078]"> / {language === 'bn' ? item.unitBn : item.unit}</span>
                      </td>
                    )}

                    {/* Retail */}
                    {(priceTypeView === 'both' || priceTypeView === 'retail') && (
                      <td className="py-3.5 px-4">
                        <span className="font-black text-[#2B8A63] text-sm sm:text-base">৳ {item.retailPrice}</span>
                        <span className="text-[11px] text-[#718078]"> / {language === 'bn' ? item.unitBn : item.unit}</span>
                      </td>
                    )}

                    {/* Change */}
                    <td className="py-3.5 px-4 font-semibold">
                      {item.changePct > 0 ? (
                        <span className="text-[#D95E5E] flex items-center gap-0.5">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          <span>+{item.changePct}%</span>
                        </span>
                      ) : item.changePct < 0 ? (
                        <span className="text-[#2B8A63] flex items-center gap-0.5">
                          <ArrowDownRight className="w-3.5 h-3.5" />
                          <span>{item.changePct}%</span>
                        </span>
                      ) : (
                        <span className="text-[#718078] flex items-center gap-0.5">
                          <Minus className="w-3.5 h-3.5" />
                          <span>0%</span>
                        </span>
                      )}
                    </td>

                    {/* Price Status */}
                    <td className="py-3.5 px-4">
                      <PriceStatusBadge status={item.priceStatus} size="sm" />
                    </td>

                    {/* Source & Verification */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1">
                        {item.isAdminVerified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2B8A63] bg-[#E4F2EB] px-2 py-0.5 rounded-md w-fit">
                            <ShieldCheck className="w-3 h-3" />
                            <span>{t.verifiedBadge}</span>
                          </span>
                        )}
                        {item.isCommunityReported && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-[#718078] bg-[#F3F6F4] px-1.5 py-0.5 rounded-md w-fit">
                            <Users className="w-2.5 h-2.5" />
                            <span>{t.communityReported}</span>
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Last Updated */}
                    <td className="py-3.5 px-4 text-xs text-[#718078]">
                      {item.lastUpdated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Card View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrices.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-[#DDE6E0] shadow-xs">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] text-[#718078] bg-[#F3F6F4] px-2 py-0.5 rounded-md">
                  {language === 'bn' ? item.categoryBn : item.category}
                </span>
                <PriceStatusBadge status={item.priceStatus} size="sm" />
              </div>

              <h3 className="font-bold text-base text-[#24332B]">
                {language === 'bn' ? item.productNameBn : item.productName}
              </h3>

              <p className="text-xs text-[#718078] flex items-center gap-1 mt-0.5 mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#2B8A63]" />
                <span>{language === 'bn' ? item.marketBn : item.market}, {language === 'bn' ? item.districtBn : item.district}</span>
              </p>

              <div className="p-3 bg-[#FAFBF9] rounded-xl border border-[#DDE6E0] flex justify-between items-baseline mb-3">
                <div>
                  <span className="text-[10px] text-[#718078] block">{t.retailPrice}</span>
                  <span className="text-lg font-black text-[#2B8A63]">৳ {item.retailPrice}</span>
                  <span className="text-xs text-[#718078]"> / {language === 'bn' ? item.unitBn : item.unit}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#718078] block">{t.wholesalePrice}</span>
                  <span className="text-sm font-bold text-[#24332B]">৳ {item.wholesalePrice}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[11px] text-[#718078] pt-1">
                <span>{item.lastUpdated}</span>
                {item.isAdminVerified && (
                  <span className="text-[#2B8A63] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{t.verifiedBadge}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Historical Trend Note Banner */}
      <div className="bg-[#E4F2EB] p-4 rounded-2xl border border-[#C2E3D2] text-xs text-[#1F7451] flex items-center justify-between flex-wrap gap-2">
        <span className="font-medium">
          {language === 'bn'
            ? '💡 বাজারমূল্য স্থানীয় আড়তদার ও খুচরা দোকানে ওঠানামা করতে পারে। যেকোনো অসংগতি দেখলে রিপোর্ট করুন।'
            : '💡 Prices may vary depending on time of day and stock arrival. Report any fake entries.'}
        </span>
        <button
          onClick={() => navigateTo('analysis')}
          className="font-bold underline hover:opacity-80 cursor-pointer"
        >
          {language === 'bn' ? 'বাজার বিশ্লেষণ গ্রাফ দেখুন →' : 'View Visual Analytics →'}
        </button>
      </div>

    </div>
  );
};
