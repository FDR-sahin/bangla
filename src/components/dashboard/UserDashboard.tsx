import React, { useState } from 'react';
import {
  LayoutDashboard,
  User as UserIcon,
  PlusCircle,
  FileText,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ShieldCheck,
  MapPin,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Upload,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PostCard } from '../common/PostCard';
import { SEED_PRODUCTS, SEED_DISTRICTS } from '../../data/seedData';
import { PostType, PriceType, PriceStatus, Post } from '../../types';
import { translations } from '../../data/translations';

export const UserDashboard: React.FC = () => {
  const {
    currentUser,
    logoutUser,
    language,
    pageParams,
    navigateTo,
    posts,
    createPost,
    deletePost,
    savedPostIds,
    comments,
    deleteComment,
    notifications,
    markAllNotificationsRead,
    updateUserProfile
  } = useApp();

  const t = translations[language];

  // Current sub-tab
  const [tab, setTab] = useState<string>(pageParams.tab || 'overview');

  // If user is not logged in, redirect or prompt
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-[#DDE6E0] text-center space-y-4">
        <h2 className="text-xl font-bold text-[#24332B]">লগইন আবশ্যক</h2>
        <p className="text-xs text-[#718078]">ড্যাশবোর্ডে প্রবেশ করতে অনুগ্রহ করে আপনার একাউন্টে লগইন করুন।</p>
        <button
          onClick={() => navigateTo('login')}
          className="px-5 py-2.5 rounded-xl bg-[#2B8A63] text-white text-xs font-bold"
        >
          লগইন করুন
        </button>
      </div>
    );
  }

  // Filter user's specific data
  const myPosts = posts.filter((p) => p.authorId === currentUser.id || p.authorUsername === currentUser.username);
  const myPriceReports = myPosts.filter((p) => p.postType === 'price_report');
  const mySavedPosts = posts.filter((p) => savedPostIds.includes(p.id));
  const myCommentsList = comments.filter((c) => c.authorId === currentUser.id);

  // Wizard state for Create Post (5-steps)
  const [step, setStep] = useState<number>(1);
  const [newPostType, setNewPostType] = useState<PostType>('price_report');
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('Potato');
  const [selectedProductBn, setSelectedProductBn] = useState('আলু');
  const [selectedProductSlug, setSelectedProductSlug] = useState('potato');
  const [postPrice, setPostPrice] = useState<number | ''>(55);
  const [postPreviousPrice, setPostPreviousPrice] = useState<number | ''>(58);
  const [postUnit, setPostUnit] = useState('kg');
  const [postUnitBn, setPostUnitBn] = useState('কেজি');
  const [postPriceType, setPostPriceType] = useState<PriceType>('retail');
  const [postPriceStatus, setPostPriceStatus] = useState<PriceStatus>('average');
  const [postDistrict, setPostDistrict] = useState(currentUser.district || 'Tangail');
  const [postUpazila, setPostUpazila] = useState(currentUser.upazila || 'Tangail Sadar');
  const [postMarket, setPostMarket] = useState('টাঙ্গাইল নতুন বাজার');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=700&auto=format&fit=crop&q=80');

  // Handle post creation submit
  const handleWizardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = createPost({
      postType: newPostType,
      title: postTitle || (newPostType === 'price_report' ? `${postDistrict} বাজারে ${selectedProductBn}-এর দর` : ''),
      description: postDescription,
      productName: selectedProduct,
      productNameBn: selectedProductBn,
      productSlug: selectedProductSlug,
      price: typeof postPrice === 'number' ? postPrice : undefined,
      previousPrice: typeof postPreviousPrice === 'number' ? postPreviousPrice : undefined,
      unit: postUnit,
      unitBn: postUnitBn,
      priceType: postPriceType,
      priceStatus: postPriceStatus,
      district: postDistrict,
      districtBn: postDistrict,
      upazila: postUpazila,
      upazilaBn: postUpazila,
      market: postMarket,
      marketBn: postMarket,
      images: [imageUrl]
    });

    // Reset wizard
    setStep(1);
    setPostDescription('');
    setTab('my-posts');
  };

  const navMenuItems = [
    { id: 'overview', label: language === 'bn' ? 'ড্যাশবোর্ড ওভারভিউ' : 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: language === 'bn' ? 'আমার প্রোফাইল' : 'My Profile', icon: UserIcon },
    { id: 'create-post', label: language === 'bn' ? 'নতুন পোস্ট তৈরি' : 'Create Post', icon: PlusCircle, isPrimary: true },
    { id: 'my-posts', label: language === 'bn' ? `আমার পোস্টসমূহ (${myPosts.length})` : `My Posts (${myPosts.length})`, icon: FileText },
    { id: 'my-price-reports', label: language === 'bn' ? `মূল্য রিপোর্ট (${myPriceReports.length})` : `Price Reports (${myPriceReports.length})`, icon: TrendingUp },
    { id: 'saved-posts', label: language === 'bn' ? `সংরক্ষিত পোস্ট (${mySavedPosts.length})` : `Saved Posts (${mySavedPosts.length})`, icon: Bookmark },
    { id: 'my-comments', label: language === 'bn' ? `আমার মন্তব্য (${myCommentsList.length})` : `My Comments (${myCommentsList.length})`, icon: MessageSquare },
    { id: 'notifications', label: language === 'bn' ? 'নোটিফিকেশন' : 'Notifications', icon: Bell },
    { id: 'settings', label: language === 'bn' ? 'সেটিংস' : 'Settings', icon: Settings }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Welcome Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6E0] shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.fullName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#E4F2EB]"
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#24332B]">
              {language === 'bn' ? `আবারও স্বাগতম, ${currentUser.fullName}` : `Welcome back, ${currentUser.fullName}`}
            </h1>
            <p className="text-xs text-[#718078] flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#2B8A63]" />
              <span>{currentUser.upazila}, {currentUser.district}</span>
              <span>•</span>
              <span className="text-[#2B8A63] font-bold">ট্রাস্ট স্কোর: {currentUser.trustScore}%</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setTab('create-post')}
          className="px-5 py-2.5 rounded-xl bg-[#2B8A63] hover:bg-[#1F7451] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.createPost}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar Menu */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="bg-white rounded-2xl p-2 border border-[#DDE6E0] shadow-2xs divide-y divide-[#DDE6E0]">
            <div className="space-y-1 pb-2">
              {navMenuItems.map((item) => {
                const Icon = item.icon;
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setTab(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer text-left ${
                      active
                        ? 'bg-[#E4F2EB] text-[#2B8A63]'
                        : item.isPrimary
                        ? 'bg-[#F8FAF9] text-[#2B8A63] hover:bg-[#E4F2EB]'
                        : 'text-[#718078] hover:text-[#24332B] hover:bg-[#F3F6F4]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={logoutUser}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#D95E5E] hover:bg-[#FDE8E8] transition-colors cursor-pointer text-left"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>{t.logout}</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {tab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#DDE6E0] shadow-2xs">
                  <span className="text-xs text-[#718078] block">আমার মোট পোস্ট</span>
                  <span className="text-2xl font-black text-[#24332B] mt-1 block">{myPosts.length}</span>
                  <span className="text-[10px] text-[#2B8A63]">সরাসরি প্রকাশিত</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#DDE6E0] shadow-2xs">
                  <span className="text-xs text-[#718078] block">মূল্য রিপোর্ট</span>
                  <span className="text-2xl font-black text-[#2B8A63] mt-1 block">{myPriceReports.length}</span>
                  <span className="text-[10px] text-[#2B8A63]">যাচাই প্রক্রিয়ায়</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#DDE6E0] shadow-2xs">
                  <span className="text-xs text-[#718078] block">প্রাপ্ত লাইক</span>
                  <span className="text-2xl font-black text-[#2B8A63] mt-1 block">{currentUser.likesReceived || 120}</span>
                  <span className="text-[10px] text-[#718078]">কমিউনিটি প্রশংসা</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#DDE6E0] shadow-2xs">
                  <span className="text-xs text-[#718078] block">সংরক্ষিত পোস্ট</span>
                  <span className="text-2xl font-black text-[#D8A04A] mt-1 block">{mySavedPosts.length}</span>
                  <span className="text-[10px] text-[#718078]">দ্রুত নজরে রাখতে</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-3xl p-6 border border-[#DDE6E0] shadow-xs">
                <h3 className="font-bold text-sm text-[#24332B] mb-3">দ্রুত কার্যক্রম</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      setNewPostType('price_report');
                      setTab('create-post');
                    }}
                    className="p-4 rounded-2xl bg-[#E4F2EB] text-[#1F7451] hover:bg-[#d5ebdf] text-left transition-colors cursor-pointer"
                  >
                    <TrendingUp className="w-5 h-5 mb-2 text-[#2B8A63]" />
                    <span className="font-bold text-xs sm:text-sm block">মূল্য রিপোর্ট দিন</span>
                    <span className="text-[11px] text-[#718078]">বাজারে আজ যে দামে কিনলেন</span>
                  </button>

                  <button
                    onClick={() => {
                      setNewPostType('market_post');
                      setTab('create-post');
                    }}
                    className="p-4 rounded-2xl bg-[#E9F2F8] text-[#1E40AF] hover:bg-[#dceaf5] text-left transition-colors cursor-pointer"
                  >
                    <FileText className="w-5 h-5 mb-2 text-[#4B8FC8]" />
                    <span className="font-bold text-xs sm:text-sm block">সাধারণ আপডেট লিখুন</span>
                    <span className="text-[11px] text-[#718078]">বাজারে সরবরাহ বা সিন্ডিকেট কথা</span>
                  </button>

                  <button
                    onClick={() => navigateTo('market-prices')}
                    className="p-4 rounded-2xl bg-[#FFF9ED] text-[#92400E] hover:bg-[#faebd0] text-left transition-colors cursor-pointer"
                  >
                    <LayoutDashboard className="w-5 h-5 mb-2 text-[#D8A04A]" />
                    <span className="font-bold text-xs sm:text-sm block">লাইভ বাজারদর দেখুন</span>
                    <span className="text-[11px] text-[#718078]">সারাদেশের পাইকারি রেট</span>
                  </button>
                </div>
              </div>

              {/* My Recent Activity / Posts */}
              <div className="space-y-4">
                <h3 className="font-bold text-base text-[#24332B]">আমার সাম্প্রতিক পোস্টসমূহ</h3>
                {myPosts.length === 0 ? (
                  <div className="p-8 bg-white rounded-2xl border border-[#DDE6E0] text-center text-xs text-[#718078]">
                    আপনি এখনও কোনো পোস্ট তৈরি করেননি।
                  </div>
                ) : (
                  myPosts.slice(0, 3).map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                )}
              </div>

            </div>
          )}

          {/* TAB 2: CREATE POST 5-STEP WIZARD */}
          {tab === 'create-post' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6E0] shadow-xs space-y-6 animate-in fade-in duration-150">
              
              <div className="border-b border-[#DDE6E0] pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-[#24332B] flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-[#2B8A63]" />
                    <span>নতুন বাজারদর বা পরিস্থিতি পোস্ট করুন</span>
                  </h2>
                  <span className="text-xs font-bold text-[#2B8A63] bg-[#E4F2EB] px-2.5 py-1 rounded-full">
                    ধাপ {step} / ৫
                  </span>
                </div>
                <p className="text-xs text-[#718078]">
                  আপনার তথ্যের সততাই বাজারবাংলার প্রধান ভিত্তি। অনুগ্রহ করে নির্ভুল তথ্য দিন।
                </p>
              </div>

              {/* Step Indicators */}
              <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] font-bold text-[#718078]">
                <div className={`p-1.5 rounded-lg ${step >= 1 ? 'bg-[#2B8A63] text-white' : 'bg-[#F3F6F4]'}`}>১. ধরন</div>
                <div className={`p-1.5 rounded-lg ${step >= 2 ? 'bg-[#2B8A63] text-white' : 'bg-[#F3F6F4]'}`}>২. তথ্য</div>
                <div className={`p-1.5 rounded-lg ${step >= 3 ? 'bg-[#2B8A63] text-white' : 'bg-[#F3F6F4]'}`}>৩. স্থান ও দাম</div>
                <div className={`p-1.5 rounded-lg ${step >= 4 ? 'bg-[#2B8A63] text-white' : 'bg-[#F3F6F4]'}`}>৪. ছবি</div>
                <div className={`p-1.5 rounded-lg ${step >= 5 ? 'bg-[#2B8A63] text-white' : 'bg-[#F3F6F4]'}`}>৫. প্রকাশ</div>
              </div>

              <form onSubmit={handleWizardSubmit} className="space-y-4">
                
                {/* STEP 1: CHOOSE POST TYPE */}
                {step === 1 && (
                  <div className="space-y-3 pt-2">
                    <h3 className="font-bold text-sm text-[#24332B]">পোস্টের ধরন নির্বাচন করুন:</h3>
                    
                    <div
                      onClick={() => setNewPostType('price_report')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        newPostType === 'price_report'
                          ? 'border-[#2B8A63] bg-[#E4F2EB]/50 shadow-xs'
                          : 'border-[#DDE6E0] hover:border-[#2B8A63]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-[#2B8A63]" />
                        <div>
                          <span className="font-bold text-sm text-[#24332B] block">ক. মূল্য রিপোর্ট (Price Report)</span>
                          <span className="text-xs text-[#718078]">নির্দিষ্ট পণ্যের প্রতি কেজি বা এককের পাইকারি বা খুচরা দামের রেকর্ড।</span>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setNewPostType('market_post')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        newPostType === 'market_post'
                          ? 'border-[#2B8A63] bg-[#E4F2EB]/50 shadow-xs'
                          : 'border-[#DDE6E0] hover:border-[#2B8A63]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#4B8FC8]" />
                        <div>
                          <span className="font-bold text-sm text-[#24332B] block">খ. সাধারণ বাজার আপডেট (General Market Post)</span>
                          <span className="text-xs text-[#718078]">বাজারের সামগ্রিক পরিস্থিতি, সরবরাহ ঘাটতি বা ক্রেতা-বিক্রেতার মতামত।</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-5 py-2.5 rounded-xl bg-[#2B8A63] text-white text-xs font-bold flex items-center gap-1.5"
                      >
                        <span>পরবর্তী ধাপে যান</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: DETAILS */}
                {step === 2 && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-[#24332B] mb-1">পোস্টের শিরোনাম</label>
                      <input
                        type="text"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        placeholder="যেমন: টাঙ্গাইল নতুন বাজারে কার্ডিনাল আলুর তাজা পাইকারি দর"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE6E0] text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#24332B] mb-1">বিস্তারিত বিবরণ (ক্যাপশন)</label>
                      <textarea
                        rows={4}
                        required
                        value={postDescription}
                        onChange={(e) => setPostDescription(e.target.value)}
                        placeholder="বাজারে কী দেখলেন? দামের তুলনামূলক অবস্থা কেমন? পণ্যের গুণমান কেমন ছিল?"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE6E0] text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
                      />
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-2 rounded-xl border border-[#DDE6E0] text-xs font-bold text-[#718078]"
                      >
                        পূর্ববর্তী
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-5 py-2 rounded-xl bg-[#2B8A63] text-white text-xs font-bold flex items-center gap-1.5"
                      >
                        <span>পরবর্তী</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: LOCATION & PRICE */}
                {step === 3 && (
                  <div className="space-y-4 pt-2">
                    {newPostType === 'price_report' && (
                      <div className="p-3 bg-[#FAFBF9] rounded-2xl border border-[#DDE6E0] space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#24332B] mb-1">পণ্যের নাম</label>
                            <select
                              value={selectedProduct}
                              onChange={(e) => {
                                const found = SEED_PRODUCTS.find((p) => p.nameEn === e.target.value);
                                if (found) {
                                  setSelectedProduct(found.nameEn);
                                  setSelectedProductBn(found.nameBn);
                                  setSelectedProductSlug(found.slug);
                                }
                              }}
                              className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] bg-white text-xs text-[#24332B]"
                            >
                              {SEED_PRODUCTS.map((p) => (
                                <option key={p.id} value={p.nameEn}>
                                  {language === 'bn' ? p.nameBn : p.nameEn}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#24332B] mb-1">দর (টাকায়)</label>
                            <input
                              type="number"
                              required
                              value={postPrice}
                              onChange={(e) => setPostPrice(e.target.value ? Number(e.target.value) : '')}
                              placeholder="55"
                              className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] text-xs text-[#24332B]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <label className="block text-[11px] font-bold text-[#718078] mb-1">একক</label>
                            <select
                              value={postUnit}
                              onChange={(e) => {
                                setPostUnit(e.target.value);
                                setPostUnitBn(e.target.value === 'kg' ? 'কেজি' : e.target.value === 'dozen' ? 'ডজন' : 'পিস');
                              }}
                              className="w-full px-2 py-1.5 rounded-lg border border-[#DDE6E0] bg-white text-xs"
                            >
                              <option value="kg">কেজি (kg)</option>
                              <option value="dozen">ডজন (dozen)</option>
                              <option value="piece">পিস (piece)</option>
                              <option value="liter">লিটার (liter)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-[#718078] mb-1">ধরন</label>
                            <select
                              value={postPriceType}
                              onChange={(e) => setPostPriceType(e.target.value as PriceType)}
                              className="w-full px-2 py-1.5 rounded-lg border border-[#DDE6E0] bg-white text-xs"
                            >
                              <option value="retail">খুচরা (Retail)</option>
                              <option value="wholesale">পাইকারি (Wholesale)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-[#718078] mb-1">অবস্থা</label>
                            <select
                              value={postPriceStatus}
                              onChange={(e) => setPostPriceStatus(e.target.value as PriceStatus)}
                              className="w-full px-2 py-1.5 rounded-lg border border-[#DDE6E0] bg-white text-xs"
                            >
                              <option value="average">স্বাভাবিক (Average)</option>
                              <option value="low">কম (Low)</option>
                              <option value="high">বেশি (High)</option>
                              <option value="unusual">অস্বাভাবিক (Unusual)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Location fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#24332B] mb-1">জেলা</label>
                        <select
                          value={postDistrict}
                          onChange={(e) => setPostDistrict(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] bg-white text-xs"
                        >
                          {SEED_DISTRICTS.map((d) => (
                            <option key={d.id} value={d.nameEn}>
                              {language === 'bn' ? d.nameBn : d.nameEn}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#24332B] mb-1">উপজেলা</label>
                        <input
                          type="text"
                          value={postUpazila}
                          onChange={(e) => setPostUpazila(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#24332B] mb-1">বাজারের নাম</label>
                        <input
                          type="text"
                          required
                          value={postMarket}
                          onChange={(e) => setPostMarket(e.target.value)}
                          placeholder="যেমন: কারওয়ান বাজার"
                          className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-4 py-2 rounded-xl border border-[#DDE6E0] text-xs font-bold text-[#718078]"
                      >
                        পূর্ববর্তী
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="px-5 py-2 rounded-xl bg-[#2B8A63] text-white text-xs font-bold flex items-center gap-1.5"
                      >
                        <span>পরবর্তী</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: IMAGE */}
                {step === 4 && (
                  <div className="space-y-4 pt-2">
                    <label className="block text-xs font-bold text-[#24332B]">পণ্যের ছবি বা রসিদের লিংক</label>
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE6E0] text-sm text-[#24332B]"
                    />

                    {imageUrl && (
                      <div className="h-44 rounded-2xl overflow-hidden bg-[#F3F6F4] border border-[#DDE6E0]">
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-4 py-2 rounded-xl border border-[#DDE6E0] text-xs font-bold text-[#718078]"
                      >
                        পূর্ববর্তী
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(5)}
                        className="px-5 py-2 rounded-xl bg-[#2B8A63] text-white text-xs font-bold flex items-center gap-1.5"
                      >
                        <span>প্রিভিউ ও নিশ্চিত করুন</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 5: REVIEW & SUBMIT */}
                {step === 5 && (
                  <div className="space-y-4 pt-2">
                    <div className="p-4 bg-[#FAFBF9] rounded-2xl border border-[#DDE6E0] space-y-2 text-xs">
                      <p><strong>ধরন:</strong> {newPostType === 'price_report' ? 'মূল্য রিপোর্ট' : 'সাধারণ আপডেট'}</p>
                      <p><strong>স্থান:</strong> {postMarket}, {postUpazila}, {postDistrict}</p>
                      {newPostType === 'price_report' && (
                        <p><strong>পণ্য ও দর:</strong> {selectedProductBn} - ৳ {postPrice} / {postUnitBn} ({postPriceType === 'wholesale' ? 'পাইকারি' : 'খুচরা'})</p>
                      )}
                      <p><strong>বিবরণ:</strong> {postDescription}</p>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="px-4 py-2 rounded-xl border border-[#DDE6E0] text-xs font-bold text-[#718078]"
                      >
                        পূর্ববর্তী
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#2B8A63] hover:bg-[#1F7451] text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
                      >
                        সরাসরি পোস্ট প্রকাশ করুন
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>
          )}

          {/* TAB 3: MY POSTS */}
          {tab === 'my-posts' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#24332B]">আমার প্রকাশিত সকল পোস্ট</h2>
                <button
                  onClick={() => setTab('create-post')}
                  className="px-3.5 py-1.5 rounded-xl bg-[#2B8A63] text-white text-xs font-bold"
                >
                  + নতুন পোস্ট
                </button>
              </div>

              {myPosts.length === 0 ? (
                <div className="p-8 bg-white rounded-2xl border border-[#DDE6E0] text-center text-xs text-[#718078]">
                  আপনি এখনও কোনো পোস্ট করেননি।
                </div>
              ) : (
                myPosts.map((post) => (
                  <div key={post.id} className="relative">
                    <PostCard post={post} />
                    <button
                      onClick={() => deletePost(post.id)}
                      className="absolute top-4 right-12 p-1.5 rounded-lg text-[#D95E5E] hover:bg-[#FDE8E8] transition-colors"
                      title="Delete post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: MY PRICE REPORTS */}
          {tab === 'my-price-reports' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h2 className="text-xl font-bold text-[#24332B]">আমার প্রেরিত বাজারমূল্য রিপোর্ট</h2>
              {myPriceReports.length === 0 ? (
                <div className="p-8 bg-white rounded-2xl border border-[#DDE6E0] text-center text-xs text-[#718078]">
                  কোনো মূল্য রিপোর্ট জমা দেননি।
                </div>
              ) : (
                myPriceReports.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
              )}
            </div>
          )}

          {/* TAB 5: SAVED POSTS */}
          {tab === 'saved-posts' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h2 className="text-xl font-bold text-[#24332B]">আমার সংরক্ষিত পোস্টসমূহ</h2>
              {mySavedPosts.length === 0 ? (
                <div className="p-8 bg-white rounded-2xl border border-[#DDE6E0] text-center text-xs text-[#718078]">
                  কোনো সংরক্ষিত পোস্ট নেই।
                </div>
              ) : (
                mySavedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
              )}
            </div>
          )}

          {/* TAB 6: MY COMMENTS */}
          {tab === 'my-comments' && (
            <div className="bg-white rounded-3xl p-6 border border-[#DDE6E0] shadow-xs space-y-4 animate-in fade-in duration-150">
              <h2 className="text-xl font-bold text-[#24332B]">আমার সাম্প্রতিক মন্তব্যসমূহ</h2>
              {myCommentsList.length === 0 ? (
                <p className="text-xs text-[#718078] py-4 text-center">আপনি এখনও কোনো মন্তব্য করেননি।</p>
              ) : (
                <div className="divide-y divide-[#DDE6E0]">
                  {myCommentsList.map((c) => (
                    <div key={c.id} className="py-3 flex justify-between items-start gap-4">
                      <div>
                        <p className="text-xs text-[#24332B] font-medium leading-relaxed">{c.content}</p>
                        <span className="text-[10px] text-[#718078] mt-1 block">{c.createdAt}</span>
                      </div>
                      <button
                        onClick={() => deleteComment(c.id)}
                        className="text-[#D95E5E] hover:underline text-xs shrink-0"
                      >
                        মুছুন
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: NOTIFICATIONS */}
          {tab === 'notifications' && (
            <div className="bg-white rounded-3xl p-6 border border-[#DDE6E0] shadow-xs space-y-4 animate-in fade-in duration-150">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#24332B]">সকল নোটিফিকেশন</h2>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-xs font-semibold text-[#2B8A63] hover:underline"
                >
                  সব পড়া হয়েছে হিসেবে চিহ্নিত করুন
                </button>
              </div>

              <div className="divide-y divide-[#DDE6E0]">
                {notifications.map((n) => (
                  <div key={n.id} className="py-3 text-xs flex justify-between items-start gap-4">
                    <div>
                      <span className="font-bold text-[#24332B] block mb-0.5">
                        {language === 'bn' ? n.titleBn : n.title}
                      </span>
                      <p className="text-[#718078]">{language === 'bn' ? n.messageBn : n.message}</p>
                    </div>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#2B8A63] shrink-0 mt-1.5" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: PROFILE / SETTINGS */}
          {(tab === 'profile' || tab === 'settings') && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6E0] shadow-xs space-y-6 animate-in fade-in duration-150">
              <h2 className="text-xl font-bold text-[#24332B]">প্রোফাইল ও সেটিংস সম্পাদনা</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#24332B] mb-1">পূর্ণ নাম</label>
                  <input
                    type="text"
                    defaultValue={currentUser.fullName}
                    onChange={(e) => updateUserProfile({ fullName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#DDE6E0] text-xs text-[#24332B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#24332B] mb-1">জেলা</label>
                  <input
                    type="text"
                    defaultValue={currentUser.district}
                    onChange={(e) => updateUserProfile({ district: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#DDE6E0] text-xs text-[#24332B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#24332B] mb-1">উপজেলা</label>
                  <input
                    type="text"
                    defaultValue={currentUser.upazila}
                    onChange={(e) => updateUserProfile({ upazila: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#DDE6E0] text-xs text-[#24332B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#24332B] mb-1">প্রোফাইল ছবির লিংক</label>
                  <input
                    type="text"
                    defaultValue={currentUser.avatar}
                    onChange={(e) => updateUserProfile({ avatar: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#DDE6E0] text-xs text-[#24332B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#24332B] mb-1">বায়ো (পরিচিতি)</label>
                <textarea
                  rows={3}
                  defaultValue={currentUser.bio}
                  onChange={(e) => updateUserProfile({ bio: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDE6E0] text-xs text-[#24332B]"
                />
              </div>

              <div className="pt-4 border-t border-[#DDE6E0]">
                <p className="text-xs text-[#718078]">
                  আপনার পরিবর্তনগুলো স্বয়ংক্রিয়ভাবে সংরক্ষিত হয়েছে।
                </p>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
