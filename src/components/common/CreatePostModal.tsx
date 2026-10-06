import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  FileText,
  MapPin,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Camera,
  Layers,
  ArrowRight,
  Eye,
  Store,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SEED_PRODUCTS, SEED_DISTRICTS } from '../../data/seedData';
import { PostType, PriceType, PriceStatus } from '../../types';
import { PriceStatusBadge } from './PriceStatusBadge';
import { translations } from '../../data/translations';

// Sample authentic market photos for 1-click photo attachment
const SAMPLE_MARKET_PHOTOS = [
  {
    name: 'আলুর বস্তা ও খুচরা বাজার',
    url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=700&auto=format&fit=crop&q=80'
  },
  {
    name: 'দেশি পেঁয়াজের আড়ত',
    url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=700&auto=format&fit=crop&q=80'
  },
  {
    name: 'তাজা পাকা টমেটো',
    url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=700&auto=format&fit=crop&q=80'
  },
  {
    name: 'কাঁচা মরিচ ও সবজি বাজার',
    url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=700&auto=format&fit=crop&q=80'
  }
];

export const CreatePostModal: React.FC = () => {
  const {
    createPostModalOpen,
    closeCreatePostModal,
    currentUser,
    language,
    createPost,
    showToast
  } = useApp();

  const t = translations[language];

  const [postType, setPostType] = useState<PostType>('price_report');
  const [selectedProductSlug, setSelectedProductSlug] = useState('potato');
  const [customProductName, setCustomProductName] = useState('');
  const [price, setPrice] = useState<number | ''>(55);
  const [priceType, setPriceType] = useState<PriceType>('retail');
  const [unit, setUnit] = useState('কেজি');
  const [district, setDistrict] = useState(currentUser?.district || 'Tangail');
  const [upazila, setUpazila] = useState(currentUser?.upazila || 'Tangail Sadar');
  const [marketName, setMarketName] = useState('টাঙ্গাইল নতুন বাজার');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(SAMPLE_MARKET_PHOTOS[0].url);
  const [showLivePreview, setShowLivePreview] = useState(false);

  if (!createPostModalOpen || !currentUser) return null;

  const currentProduct = SEED_PRODUCTS.find((p) => p.slug === selectedProductSlug);

  // Auto calculate price benchmark status
  let priceStatus: PriceStatus = 'average';
  let benchmarkNote = '';
  if (postType === 'price_report' && currentProduct && typeof price === 'number') {
    const diff = price - currentProduct.avgRetailPrice;
    if (diff <= -5) {
      priceStatus = 'low';
      benchmarkNote = language === 'bn'
        ? `জাতীয় গড় (৳${currentProduct.avgRetailPrice})-এর চেয়ে ৳${Math.abs(diff)} কম (সাশ্রয়ী)`
        : `৳${Math.abs(diff)} lower than national average (৳${currentProduct.avgRetailPrice})`;
    } else if (diff >= 15) {
      priceStatus = 'unusual';
      benchmarkNote = language === 'bn'
        ? `জাতীয় গড় (৳${currentProduct.avgRetailPrice})-এর চেয়ে অস্বাভাবিক ৳${diff} বেশি`
        : `Unusually high (৳${diff} above national avg)`;
    } else if (diff >= 5) {
      priceStatus = 'high';
      benchmarkNote = language === 'bn'
        ? `জাতীয় গড় (৳${currentProduct.avgRetailPrice})-এর চেয়ে ৳${diff} বেশি`
        : `৳${diff} higher than national avg`;
    } else {
      priceStatus = 'average';
      benchmarkNote = language === 'bn'
        ? `জাতীয় গড় (৳${currentProduct.avgRetailPrice})-এর সমান বা কাছাকাছি`
        : `Close to national average (৳${currentProduct.avgRetailPrice})`;
    }
  }

  const handleProductSelect = (slug: string) => {
    setSelectedProductSlug(slug);
    const prod = SEED_PRODUCTS.find((p) => p.slug === slug);
    if (prod) {
      setPrice(prod.avgRetailPrice);
      setUnit(prod.unitBn);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      showToast(language === 'bn' ? 'অনুগ্রহ করে কিছু বিবরণ লিখুন।' : 'Please enter a description.', 'warning');
      return;
    }

    const prodName = currentProduct ? (language === 'bn' ? currentProduct.nameBn : currentProduct.nameEn) : customProductName;

    createPost({
      postType,
      title: title || (postType === 'price_report' ? `${marketName}-এ ${prodName}-এর লাইভ দর` : 'বাজার পরিস্থিতি ও সরবরাহ আপডেট'),
      description: description.trim(),
      productName: currentProduct?.nameEn || customProductName,
      productNameBn: currentProduct?.nameBn || customProductName,
      productSlug: selectedProductSlug,
      category: currentProduct?.category || 'General',
      categoryBn: currentProduct?.categoryBn || 'সাধারণ',
      price: postType === 'price_report' && typeof price === 'number' ? price : undefined,
      unit: currentProduct?.unit || 'kg',
      unitBn: unit,
      priceType,
      priceStatus,
      district,
      districtBn: district,
      upazila,
      upazilaBn: upazila,
      market: marketName,
      marketBn: marketName,
      images: imageUrl ? [imageUrl] : []
    });

    closeCreatePostModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-auto shadow-2xl border border-[#DDE6E0] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#DDE6E0] flex items-center justify-between bg-[#F8FAF9]">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.fullName}
              className="w-10 h-10 rounded-full object-cover border border-[#DDE6E0]"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#24332B]">{currentUser.fullName}</span>
                <span className="text-[11px] text-[#718078]">(@{currentUser.username})</span>
              </div>
              <span className="text-xs text-[#2B8A63] font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{currentUser.upazila}, {currentUser.district}</span>
              </span>
            </div>
          </div>

          <button
            onClick={closeCreatePostModal}
            className="p-1.5 rounded-xl text-[#718078] hover:text-[#24332B] hover:bg-[#EAEFEA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post Type Selector Tabs */}
        <div className="p-4 sm:px-6 bg-[#FAFBF9] border-b border-[#DDE6E0]">
          <div className="grid grid-cols-2 gap-2 bg-[#EAEFEA] p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setPostType('price_report')}
              className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                postType === 'price_report'
                  ? 'bg-white text-[#2B8A63] shadow-xs'
                  : 'text-[#718078] hover:text-[#24332B]'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>{language === 'bn' ? 'মূল্য রিপোর্ট (দাম জানান)' : 'Price Report'}</span>
            </button>

            <button
              type="button"
              onClick={() => setPostType('market_post')}
              className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                postType === 'market_post'
                  ? 'bg-white text-[#2B8A63] shadow-xs'
                  : 'text-[#718078] hover:text-[#24332B]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{language === 'bn' ? 'বাজার পরিস্থিতি (মতামত/সংবাদ)' : 'Market Situation'}</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[72vh] overflow-y-auto">
          
          {/* If Price Report: Product & Benchmark Section */}
          {postType === 'price_report' && (
            <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#DDE6E0] space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#24332B] mb-1.5">
                  {language === 'bn' ? 'পণ্য নির্বাচন করুন (বা দ্রুত ট্যাপ করুন):' : 'Select Commodity:'}
                </label>
                
                {/* Quick Commodity Chips */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {SEED_PRODUCTS.slice(0, 6).map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => handleProductSelect(prod.slug)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedProductSlug === prod.slug
                          ? 'bg-[#2B8A63] text-white shadow-2xs'
                          : 'bg-white text-[#718078] border border-[#DDE6E0] hover:border-[#2B8A63]'
                      }`}
                    >
                      {language === 'bn' ? prod.nameBn : prod.nameEn}
                    </button>
                  ))}
                </div>

                <select
                  value={selectedProductSlug}
                  onChange={(e) => handleProductSelect(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] bg-white text-xs sm:text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
                >
                  {SEED_PRODUCTS.map((prod) => (
                    <option key={prod.id} value={prod.slug}>
                      {language === 'bn' ? prod.nameBn : prod.nameEn} ({language === 'bn' ? prod.categoryBn : prod.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Price & Unit & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Price input */}
                <div>
                  <label className="block text-xs font-bold text-[#24332B] mb-1">
                    {language === 'bn' ? 'দর (টাকায়)' : 'Price (BDT)'} *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-black text-sm text-[#2B8A63]">৳</span>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                      placeholder="55"
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#DDE6E0] bg-white text-sm font-bold text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
                    />
                  </div>
                </div>

                {/* Wholesale / Retail */}
                <div>
                  <label className="block text-xs font-bold text-[#24332B] mb-1">
                    {language === 'bn' ? 'বিক্রির ধরন' : 'Price Type'}
                  </label>
                  <select
                    value={priceType}
                    onChange={(e) => setPriceType(e.target.value as PriceType)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] bg-white text-xs sm:text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
                  >
                    <option value="retail">{language === 'bn' ? 'খুচরা দর (দোকান)' : 'Retail (Shop)'}</option>
                    <option value="wholesale">{language === 'bn' ? 'পাইকারি দর (আড়ত)' : 'Wholesale (Arat)'}</option>
                  </select>
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-xs font-bold text-[#24332B] mb-1">
                    {language === 'bn' ? 'একক' : 'Unit'}
                  </label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="কেজি / ডজন / পিস"
                    className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] bg-white text-xs sm:text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
                  />
                </div>
              </div>

              {/* Dynamic Benchmark Indicator Bar */}
              {benchmarkNote && (
                <div className="p-2.5 rounded-xl bg-white border border-[#DDE6E0] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#2B8A63]" />
                    <span className="font-semibold text-[#24332B]">{benchmarkNote}</span>
                  </div>
                  <PriceStatusBadge status={priceStatus} size="sm" />
                </div>
              )}
            </div>
          )}

          {/* Location Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#24332B] mb-1">
                {language === 'bn' ? 'জেলা' : 'District'} *
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] bg-white text-xs sm:text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
              >
                {SEED_DISTRICTS.map((d) => (
                  <option key={d.id} value={d.nameEn}>
                    {language === 'bn' ? d.nameBn : d.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#24332B] mb-1">
                {language === 'bn' ? 'উপজেলা' : 'Upazila'}
              </label>
              <input
                type="text"
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                placeholder="সদর / মধুপুর / বোয়ালিয়া"
                className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] bg-white text-xs sm:text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#24332B] mb-1">
                {language === 'bn' ? 'বাজার / আড়তের নাম' : 'Market Name'} *
              </label>
              <input
                type="text"
                required
                value={marketName}
                onChange={(e) => setMarketName(e.target.value)}
                placeholder="যেমন: কারওয়ান বাজার, টাঙ্গাইল নতুন বাজার"
                className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] bg-white text-xs sm:text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
              />
            </div>
          </div>

          {/* Title (Optional for price report, required for market post) */}
          <div>
            <label className="block text-xs font-bold text-[#24332B] mb-1">
              {language === 'bn' ? 'পোস্টের শিরোনাম (ঐচ্ছিক)' : 'Post Title (Optional)'}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                postType === 'price_report'
                  ? 'যেমন: টাঙ্গাইল নতুন বাজারে কার্ডিনাল আলুর পাইকারি ও খুচরা দর'
                  : 'যেমন: কারওয়ান বাজারে আজ মাছের সরবরাহ স্বাভাবিক রয়েছে'
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE6E0] bg-white text-xs sm:text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#24332B] mb-1">
              {language === 'bn' ? 'বাজারের বিবরণ ও ক্যাপশন' : 'Description & Caption'} *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                language === 'bn'
                  ? 'আজ বাজারে কী দেখলেন? দামের অবস্থা কেমন? পণ্যের গুণমান ও জোগান কেমন দেখলেন সংক্ষেপে জানান...'
                  : 'Share what you experienced in the market today (quality, supply, price trend)...'
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE6E0] bg-white text-xs sm:text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
            />
          </div>

          {/* Photo / Receipt Attachment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[#24332B] flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-[#2B8A63]" />
                <span>{language === 'bn' ? 'পণ্যের তাজা ছবি বা রসিদ (ছবি সংযুক্ত করুন):' : 'Photo or Receipt:'}</span>
              </label>
              <span className="text-[11px] text-[#718078]">ছবি থাকলে বিশ্বাসযোগ্যতা বাড়ে</span>
            </div>

            {/* Quick Sample Photos */}
            <div className="grid grid-cols-4 gap-2">
              {SAMPLE_MARKET_PHOTOS.map((photo, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setImageUrl(photo.url)}
                  className={`relative rounded-xl overflow-hidden h-14 border-2 transition-all cursor-pointer ${
                    imageUrl === photo.url ? 'border-[#2B8A63] ring-2 ring-[#2B8A63]/30 scale-102' : 'border-[#DDE6E0] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                  {imageUrl === photo.url && (
                    <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#2B8A63] text-white flex items-center justify-center text-[9px]">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="বা নিজস্ব ইমেজের লিঙ্ক দিন: https://..."
              className="w-full px-3 py-1.5 rounded-xl border border-[#DDE6E0] bg-[#FAFBF9] text-[11px] text-[#718078]"
            />
          </div>

          {/* Live Preview Toggle */}
          <div className="pt-2 flex justify-between items-center border-t border-[#DDE6E0]">
            <button
              type="button"
              onClick={() => setShowLivePreview(!showLivePreview)}
              className="text-xs font-bold text-[#2B8A63] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>{showLivePreview ? 'প্রিভিউ বন্ধ করুন' : 'পোস্টের লাইভ প্রিভিউ দেখুন'}</span>
            </button>
          </div>

          {/* Preview Box */}
          {showLivePreview && (
            <div className="p-4 rounded-2xl bg-[#F3F6F4] border border-[#DDE6E0] space-y-2 animate-in fade-in duration-150">
              <span className="text-[10px] font-bold text-[#718078] uppercase tracking-wider block">ফিডে যেমন দেখাবে:</span>
              <div className="bg-white p-4 rounded-xl border border-[#DDE6E0] space-y-2">
                <div className="flex items-center gap-2">
                  <img src={currentUser.avatar} alt="User" className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <span className="font-bold text-xs text-[#24332B]">{currentUser.fullName}</span>
                    <span className="text-[10px] text-[#718078] block">{marketName}, {district}</span>
                  </div>
                </div>
                {postType === 'price_report' && (
                  <div className="p-2.5 bg-[#F8FAF9] rounded-lg border border-[#DDE6E0] flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-[#24332B]">{currentProduct?.nameBn || customProductName}</span>
                      <span className="text-xs text-[#718078]"> ({priceType === 'wholesale' ? 'পাইকারি' : 'খুচরা'})</span>
                    </div>
                    <span className="text-base font-black text-[#2B8A63]">৳ {price} / {unit}</span>
                  </div>
                )}
                <p className="text-xs text-[#24332B]">{description || 'বিবরণ এখানে প্রদর্শিত হবে...'}</p>
                {imageUrl && (
                  <div className="h-32 rounded-lg overflow-hidden bg-gray-100">
                    <img src={imageUrl} alt="Market" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-4 border-t border-[#DDE6E0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeCreatePostModal}
              className="px-4 py-2.5 rounded-xl border border-[#DDE6E0] text-xs font-bold text-[#718078] hover:bg-[#F3F6F4] transition-colors"
            >
              {t.cancel}
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#2B8A63] hover:bg-[#1F7451] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{language === 'bn' ? 'পোস্টটি প্রকাশ করুন' : 'Publish Report'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
