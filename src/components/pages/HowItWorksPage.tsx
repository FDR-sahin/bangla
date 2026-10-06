import React from 'react';
import { ShoppingBag, Camera, Send, ShieldAlert, Award, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

export const HowItWorksPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const t = translations[language];

  const steps = [
    {
      step: '০১',
      titleBn: 'বাজারে যান ও দাম জানুন',
      titleEn: 'Observe Market & Discover Price',
      descBn: 'আপনার এলাকার কাঁচাবাজার, পাইকারি আড়ত বা স্থানীয় হাটে গিয়ে পণ্যের পাইকারি বা খুচরা দর লক্ষ্য করুন।',
      descEn: 'Visit your local kitchen market, arat, or grocery and check current wholesale or retail prices.'
    },
    {
      step: '০২',
      titleBn: 'ছবি বা রসিদ তুলুন (ঐচ্ছিক)',
      titleEn: 'Snap Photo or Receipt',
      descBn: 'পণ্যের তাজা ছবি বা কেনাকাটার রসিদের ছবি তুললে আপনার রিপোর্টের গ্রহণযোগ্যতা বহুগুণ বেড়ে যায়।',
      descEn: 'Take a clear photo of the produce or the market price board for extra trust.'
    },
    {
      step: '০৩',
      titleBn: 'সহজ ফর্মে পোস্ট করুন',
      titleEn: 'Submit Quick Price Report',
      descBn: 'পণ্য, জেলা, বাজার ও প্রতি কেজির দর উল্লেখ করে কয়েক সেকেন্ডেই পোস্ট করুন।',
      descEn: 'Specify item, market name, district, unit, and price per kg/piece in simple steps.'
    },
    {
      step: '০৪',
      titleBn: 'কমিউনিটি ও এডমিন যাচাইকরণ',
      titleEn: 'Community & Admin Verification',
      descBn: 'অন্যান্য ক্রেতারা দাম সঠিক পেলে লাইক দেবেন। ভুল দাম হলে রিপোর্ট বা ডিসলাইক দেবেন। এডমিন যাচাই করলে ভেরিফায়েড ব্যাজ যুক্ত হবে।',
      descEn: 'Fellow citizens upvote accurate rates. If a post receives 10+ dislikes, it undergoes manual admin review.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-[#24332B] tracking-tight">
          {language === 'bn' ? 'বাজারবাংলা কীভাবে কাজ করে?' : 'How BazarBangla Works'}
        </h1>
        <p className="text-xs sm:text-base text-[#718078] max-w-xl mx-auto">
          {language === 'bn'
            ? 'সহজ ৪টি ধাপে নিজের জানা বাজারদর সবার সাথে শেয়ার করুন এবং বাজার সিন্ডিকেট ভেঙে স্বচ্ছতা ফিরিয়ে আনুন।'
            : '4 simple steps to share authentic commodity prices and build market transparency in Bangladesh.'}
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="bg-white p-5 sm:p-6 rounded-2xl border border-[#DDE6E0] shadow-xs flex items-start gap-4 sm:gap-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E4F2EB] text-[#2B8A63] flex items-center justify-center font-black text-lg shrink-0">
              {s.step}
            </div>

            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-bold text-[#24332B] mb-1">
                {language === 'bn' ? s.titleBn : s.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-[#718078] leading-relaxed">
                {language === 'bn' ? s.descBn : s.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dislike & Moderation Section 15 highlight */}
      <div className="bg-[#FAFBF9] border border-[#DDE6E0] rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-[#D8A04A]">
          <ShieldAlert className="w-6 h-6 text-[#C9892B]" />
          <h3 className="text-base sm:text-lg font-bold text-[#24332B]">
            {language === 'bn' ? '১০টি বা ততোধিক ডিসলাইক পেলে কী ঘটে?' : 'What Happens at 10+ Dislikes?'}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#718078] leading-relaxed">
          {language === 'bn'
            ? 'বাজারবাংলায় কোনো ব্যবহারকারীকে স্বয়ংক্রিয়ভাবে ব্লক করা হয় না। যদি কোনো পোস্টে কমিউনিটির ১০ বা ততোধিক ডিসলাইক পড়ে, পোস্টটির দৃশ্যমানতা কমিয়ে তাৎক্ষণিকভাবে মূল এডমিনের পর্যালোচনায় পাঠানো হয়। এডমিন যাচাই করে পোস্টটি অনুমোদন, সংশোধন বা বাতিল করেন।'
            : 'To prevent abuse, users are never auto-blocked purely based on dislikes. When a post reaches 10+ dislikes, its visibility is minimized and it is automatically queued for Main Admin human review.'}
        </p>
      </div>

      {/* CTA */}
      <div className="text-center pt-2">
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-3 rounded-xl bg-[#2B8A63] text-white font-bold text-xs sm:text-sm hover:bg-[#1F7451] transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <span>{language === 'bn' ? 'আজকের বাজারদর দেখুন' : 'View Today’s Market Prices'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
