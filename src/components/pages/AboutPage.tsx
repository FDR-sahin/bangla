import React from 'react';
import { ShieldCheck, Heart, Users, MapPin, Eye, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

export const AboutPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4F2EB] text-[#2B8A63] text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>{language === 'bn' ? 'আমাদের লক্ষ্য ও পরিচিতি' : 'Our Mission & Vision'}</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#24332B] tracking-tight">
          {t.brandName}
        </h1>
        <p className="text-base sm:text-lg font-semibold text-[#2B8A63]">
          “{t.tagline}”
        </p>
      </div>

      {/* Main Philosophy Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6E0] shadow-xs space-y-4 text-sm sm:text-base leading-relaxed text-[#24332B]">
        <h2 className="text-xl font-bold text-[#24332B]">
          {language === 'bn' ? 'বাজারবাংলা কী এবং কেন?' : 'What is BazarBangla?'}
        </h2>
        <p>
          {language === 'bn'
            ? 'বাজারবাংলা হলো বাংলাদেশের প্রতিটি জেলা, উপজেলা ও কাঁচাবাজারের নিত্যপ্রয়োজনীয় পণ্যের সঠিক দাম সবার সামনে তুলে ধরার একটি উন্মুক্ত ও নিরপেক্ষ কমিউনিটি প্ল্যাটফর্ম।'
            : 'BazarBangla is an open public community platform dedicated to providing genuine market transparency for daily commodities across all 64 districts in Bangladesh.'}
        </p>
        <p>
          {language === 'bn'
            ? 'আমরা বিশ্বাস করি তথ্যের অবাধ প্রবাহই পারে বাজার সিন্ডিকেট ও মধ্যস্বত্বভোগীদের কৃত্রিম কারসাজি রোধ করতে। সাধারণ ক্রেতা, কৃষক এবং ক্ষুদ্র ব্যবসায়ীরা যখন সরাসরি বাজারের প্রকৃত পাইকারি ও খুচরা দর শেয়ার করেন, তখন পুরো সমাজ উপকৃত হয়।'
            : 'We believe real-time market transparency empowers citizens and small traders against arbitrary price gouging. When shoppers, farmers, and retailers report genuine rates directly from the ground, the entire society benefits.'}
        </p>
      </div>

      {/* Strict Distinction: Not E-commerce */}
      <div className="bg-[#FFF4E5] border border-[#F3DFC1] rounded-2xl p-6 text-sm text-[#92400E] space-y-2">
        <h3 className="font-bold text-base flex items-center gap-2 text-[#C9892B]">
          <ShieldCheck className="w-5 h-5" />
          <span>{language === 'bn' ? 'গুরুত্বপূর্ণ বিজ্ঞপ্তি: এটি কোনো ই-কমার্স সাইট নয়' : 'Important Notice: NOT an E-Commerce Website'}</span>
        </h3>
        <p className="leading-relaxed">
          {language === 'bn'
            ? 'বাজারবাংলা কোনো পণ্য কেনাবেচার ওয়েবসাইট নয়। এখানে কোনো শপিং কার্ট, চেকআউট, পেমেন্ট গেটওয়ে বা হোম ডেলিভারি ব্যবস্থা নেই। আমাদের একমাত্র উদ্দেশ্য হলো বাজারদর সম্পর্কিত তথ্য সকলের জন্য উন্মুক্ত ও স্বচ্ছ রাখা।'
            : 'BazarBangla is strictly an information & community crowd-sourced platform. We do not sell items, process payments, operate delivery logistics, or take commissions.'}
        </p>
      </div>

      {/* Core Values 3-col */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#DDE6E0] text-center">
          <div className="w-10 h-10 rounded-xl bg-[#E4F2EB] text-[#2B8A63] flex items-center justify-center mx-auto mb-3">
            <Eye className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-[#24332B] mb-1">
            {language === 'bn' ? 'স্বচ্ছতা ও সত্যতা' : 'Transparency'}
          </h4>
          <p className="text-xs text-[#718078] leading-relaxed">
            {language === 'bn' ? 'যাচাইকৃত রসিদ ও ছবি দিয়ে সঠিক মূল্যের নিশ্চয়তা।' : 'Verified receipts and photos directly from arats.'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#DDE6E0] text-center">
          <div className="w-10 h-10 rounded-xl bg-[#E9F2F8] text-[#4B8FC8] flex items-center justify-center mx-auto mb-3">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-[#24332B] mb-1">
            {language === 'bn' ? 'কমিউনিটি শক্তি' : 'Citizen Community'}
          </h4>
          <p className="text-xs text-[#718078] leading-relaxed">
            {language === 'bn' ? 'নাগরিকরাই এই প্ল্যাটফর্মের প্রাণ এবং তথ্যের মূল উৎস।' : 'Every citizen can report prices and help fellow shoppers.'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#DDE6E0] text-center">
          <div className="w-10 h-10 rounded-xl bg-[#FFF9ED] text-[#D8A04A] flex items-center justify-center mx-auto mb-3">
            <MapPin className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-[#24332B] mb-1">
            {language === 'bn' ? '৬৪ জেলার সংযোগ' : '64 Districts'}
          </h4>
          <p className="text-xs text-[#718078] leading-relaxed">
            {language === 'bn' ? 'সীমান্তের আড়ত থেকে রাজধানীর কাঁচাবাজারের যোগসূত্র।' : 'Connecting rural farmgate arats with urban kitchen markets.'}
          </p>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => navigateTo('how-it-works')}
          className="px-6 py-3 rounded-xl bg-[#2B8A63] text-white font-bold text-xs sm:text-sm hover:bg-[#1F7451] transition-colors"
        >
          {language === 'bn' ? 'এটি কীভাবে কাজ করে জানুন →' : 'Learn How It Works →'}
        </button>
      </div>

    </div>
  );
};
