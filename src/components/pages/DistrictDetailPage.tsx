import React from 'react';
import { ArrowLeft, MapPin, Store, PlusCircle, Share2, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SEED_DISTRICTS, SEED_MARKET_PRICES } from '../../data/seedData';
import { PostCard } from '../common/PostCard';
import { PriceStatusBadge } from '../common/PriceStatusBadge';
import { translations } from '../../data/translations';

export const DistrictDetailPage: React.FC = () => {
  const { language, pageParams, navigateTo, posts, openShareModal, currentUser, setLoginRequiredModal } = useApp();
  const t = translations[language];

  const slug = pageParams.slug || 'tangail';
  const district = SEED_DISTRICTS.find((d) => d.slug === slug) || SEED_DISTRICTS[0];

  // Prices in this district
  const districtPrices = SEED_MARKET_PRICES.filter(
    (m) => m.district.toLowerCase() === district.nameEn.toLowerCase()
  );

  // Posts in this district
  const districtPosts = posts.filter(
    (p) => p.district.toLowerCase() === district.nameEn.toLowerCase()
  );

  const handleShare = () => {
    openShareModal(
      language === 'bn' ? `${district.nameBn}-এর আজকের বাজারদর | বাজারবাংলা` : `Today's Market Prices in ${district.nameEn} | BazarBangla`,
      window.location.href
    );
  };

  const handleAddPrice = () => {
    if (!currentUser) {
      setLoginRequiredModal(true);
    } else {
      navigateTo('dashboard', { tab: 'create-post' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('districts')}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#718078] hover:text-[#24332B] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'সকল জেলার তালিকায় ফিরুন' : 'Back to Districts'}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DDE6E0] bg-white text-xs font-semibold text-[#24332B] hover:bg-[#F3F6F4] cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{t.share}</span>
        </button>
      </div>

      {/* Hero District Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6E0] shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#DDE6E0]">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-[#E4F2EB] text-[#2B8A63] flex items-center justify-center font-bold text-2xl">
              <MapPin className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#24332B] tracking-tight">
                {language === 'bn' ? `${district.nameBn} জেলা বাজারদর` : `${district.nameEn} District Market Prices`}
              </h1>
              <span className="text-xs text-[#718078]">
                {language === 'bn' ? `বিভাগ: ${district.divisionBn} • মোট বাজার: ${district.totalMarkets} টি` : `Division: ${district.division} • Total Markets: ${district.totalMarkets}`}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddPrice}
            className="px-4 py-2.5 rounded-xl bg-[#2B8A63] hover:bg-[#1F7451] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{language === 'bn' ? 'এই জেলার বাজারদর যোগ করুন' : 'Submit Price for this District'}</span>
          </button>
        </div>

        {/* Prominent Markets & Local Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div>
            <h3 className="text-xs font-bold text-[#718078] uppercase mb-2 flex items-center gap-1.5">
              <Store className="w-4 h-4 text-[#2B8A63]" />
              <span>{language === 'bn' ? 'উপজেলা ও প্রধান বাজারসমূহ' : 'Key Upazilas & Markets'}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {(language === 'bn' ? district.topMarketsBn : district.topMarkets).map((market, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-[#FAFBF9] border border-[#DDE6E0] text-xs font-semibold text-[#24332B]"
                >
                  {market}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#718078] uppercase mb-2">
              {language === 'bn' ? 'বিখ্যাত ও স্থানীয় পণ্যসমূহ' : 'Special Local Commodities'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(language === 'bn' ? district.popularProductsBn : district.popularProducts).map((prod, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-[#E9F2F8] text-[#4B8FC8] text-xs font-semibold"
                >
                  {prod}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* District Live Price Table */}
      {districtPrices.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-[#DDE6E0] shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-[#24332B]">
            {language === 'bn' ? `${district.nameBn}-এর আজকের পণ্যের দর` : `Today's Commodity Rates in ${district.nameEn}`}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAFBF9] border-b border-[#DDE6E0] text-[11px] font-bold text-[#718078] uppercase">
                <tr>
                  <th className="py-3 px-4">{language === 'bn' ? 'পণ্য' : 'Product'}</th>
                  <th className="py-3 px-4">{language === 'bn' ? 'বাজার' : 'Market'}</th>
                  <th className="py-3 px-4">{t.wholesalePrice}</th>
                  <th className="py-3 px-4">{t.retailPrice}</th>
                  <th className="py-3 px-4">{language === 'bn' ? 'অবস্থা' : 'Status'}</th>
                  <th className="py-3 px-4">{language === 'bn' ? 'আপডেট' : 'Update'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDE6E0]">
                {districtPrices.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F8FAF9]">
                    <td className="py-3 px-4 font-bold text-[#24332B]">
                      {language === 'bn' ? item.productNameBn : item.productName}
                    </td>
                    <td className="py-3 px-4 text-[#718078]">
                      {language === 'bn' ? item.marketBn : item.market}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#24332B]">৳ {item.wholesalePrice}</td>
                    <td className="py-3 px-4 font-black text-[#2B8A63]">৳ {item.retailPrice}</td>
                    <td className="py-3 px-4">
                      <PriceStatusBadge status={item.priceStatus} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-xs text-[#718078]">{item.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Community Posts for this District */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#24332B]">
          {language === 'bn' ? `${district.nameBn} জেলার সর্বশেষ পোস্ট` : `Latest Posts from ${district.nameEn}`}
        </h2>

        {districtPosts.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-[#DDE6E0] text-center text-xs text-[#718078]">
            {language === 'bn' ? 'এই জেলায় এখনও কোনো পোস্ট নেই।' : 'No community posts yet from this district.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {districtPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
