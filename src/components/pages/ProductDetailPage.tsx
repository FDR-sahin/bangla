import React from 'react';
import {
  ArrowLeft,
  MapPin,
  TrendingUp,
  ShieldCheck,
  PlusCircle,
  Calendar,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SEED_PRODUCTS, SEED_MARKET_PRICES } from '../../data/seedData';
import { PriceStatusBadge } from '../common/PriceStatusBadge';
import { PostCard } from '../common/PostCard';
import { translations } from '../../data/translations';

export const ProductDetailPage: React.FC = () => {
  const { language, pageParams, navigateTo, posts, openShareModal, currentUser, setLoginRequiredModal } = useApp();
  const t = translations[language];

  const slug = pageParams.slug || 'potato';
  const product = SEED_PRODUCTS.find((p) => p.slug === slug) || SEED_PRODUCTS[0];

  // Market prices for this product
  const marketList = SEED_MARKET_PRICES.filter((m) => m.productId === product.id);

  // Related posts
  const productPosts = posts.filter(
    (p) => p.productSlug === product.slug || (p.productName && p.productName.toLowerCase().includes(product.nameEn.toLowerCase()))
  );

  const handleShare = () => {
    openShareModal(
      language === 'bn' ? `${product.nameBn}-এর আজকের বাজারদর | বাজারবাংলা` : `Today's ${product.nameEn} Market Price in Bangladesh`,
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
      
      {/* Back button and breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('products')}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#718078] hover:text-[#24332B] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'সকল পণ্যের তালিকায় ফিরুন' : 'Back to Products'}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DDE6E0] bg-white text-xs font-semibold text-[#24332B] hover:bg-[#F3F6F4] cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{t.share}</span>
        </button>
      </div>

      {/* Hero Product Banner */}
      <div className="bg-white rounded-3xl border border-[#DDE6E0] overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          <div className="lg:col-span-5 h-64 lg:h-auto bg-[#F3F6F4] relative">
            <img
              src={product.image}
              alt={product.nameEn}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <PriceStatusBadge status={product.priceStatus} />
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#718078] mb-2">
                <span className="font-semibold text-[#2B8A63] bg-[#E4F2EB] px-2.5 py-0.5 rounded-md">
                  {language === 'bn' ? product.categoryBn : product.category}
                </span>
                <span>•</span>
                <span>{product.seasonalStatus || 'সারা বছরের নিয়মিত পণ্য'}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-[#24332B] tracking-tight mb-2">
                {language === 'bn' ? product.nameBn : product.nameEn}
              </h1>

              <p className="text-xs sm:text-sm text-[#718078] leading-relaxed mb-6">
                {language === 'bn' ? product.descriptionBn : product.descriptionEn}
              </p>

              {/* Price Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#F8FAF9] border border-[#DDE6E0] mb-6">
                <div>
                  <span className="text-xs text-[#718078] block">{t.retailPrice} (জাতীয় গড়)</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black text-[#2B8A63]">৳ {product.avgRetailPrice}</span>
                    <span className="text-xs text-[#718078]">/ {language === 'bn' ? product.unitBn : product.unit}</span>
                  </div>
                </div>

                <div className="sm:border-l sm:border-[#DDE6E0] sm:pl-4">
                  <span className="text-xs text-[#718078] block">{t.wholesalePrice} (আড়তদার রেট)</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-bold text-[#24332B]">৳ {product.avgWholesalePrice}</span>
                    <span className="text-xs text-[#718078]">/ {language === 'bn' ? product.unitBn : product.unit}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleAddPrice}
                className="px-5 py-2.5 rounded-xl bg-[#2B8A63] hover:bg-[#1F7451] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{language === 'bn' ? 'এই পণ্যের নতুন দর যোগ করুন' : 'Submit Price for this Item'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* District Market Price Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6E0] shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#24332B] flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#2B8A63]" />
          <span>{language === 'bn' ? 'বিভিন্ন জেলা ও বাজারের সর্বশেষ লাইভ দর' : 'Live Prices Across District Markets'}</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FAFBF9] border-b border-[#DDE6E0] text-[11px] font-bold text-[#718078] uppercase">
              <tr>
                <th className="py-3 px-4">{language === 'bn' ? 'জেলা ও বাজার' : 'District & Market'}</th>
                <th className="py-3 px-4">{t.wholesalePrice}</th>
                <th className="py-3 px-4">{t.retailPrice}</th>
                <th className="py-3 px-4">{language === 'bn' ? 'অবস্থা' : 'Status'}</th>
                <th className="py-3 px-4">{language === 'bn' ? 'যাচাইকরণ' : 'Verification'}</th>
                <th className="py-3 px-4">{language === 'bn' ? 'সর্বশেষ আপডেট' : 'Last Updated'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE6E0]">
              {marketList.map((item) => (
                <tr key={item.id} className="hover:bg-[#F8FAF9]">
                  <td className="py-3.5 px-4 font-semibold text-[#24332B]">
                    {language === 'bn' ? item.marketBn : item.market}, {language === 'bn' ? item.districtBn : item.district}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#24332B]">৳ {item.wholesalePrice}</td>
                  <td className="py-3.5 px-4 font-black text-[#2B8A63]">৳ {item.retailPrice}</td>
                  <td className="py-3.5 px-4">
                    <PriceStatusBadge status={item.priceStatus} size="sm" />
                  </td>
                  <td className="py-3.5 px-4">
                    {item.isAdminVerified ? (
                      <span className="text-[11px] text-[#2B8A63] font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>যাচাইকৃত</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#718078]">কমিউনিটি রিপোর্ট</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#718078]">{item.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Community Feed for this Product */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#24332B]">
          {language === 'bn' ? `${product.nameBn} সংক্রান্ত কমিউনিটি পোস্ট` : `Community Posts on ${product.nameEn}`}
        </h2>

        {productPosts.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-[#DDE6E0] text-center text-xs text-[#718078]">
            {language === 'bn' ? 'এই পণ্যে এখনও কোনো আলাদা পোস্ট নেই। আপনিই প্রথম মূল্য রিপোর্ট তৈরি করুন।' : 'No dedicated community posts yet for this item. Be the first to submit a report.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
