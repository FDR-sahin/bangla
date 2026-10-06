import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  BarChart3,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SEED_PRODUCTS, SEED_DISTRICTS } from '../../data/seedData';
import { translations } from '../../data/translations';

export const AnalysisPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const t = translations[language];

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  // Category distribution calculation
  const categoryCounts = [
    { name: language === 'bn' ? 'সবজি ও কাঁচাবাজার' : 'Vegetables', pct: 38, count: '38%', color: '#2B8A63' },
    { name: language === 'bn' ? 'মসলা ও রান্নার উপকরণ' : 'Spices', pct: 24, count: '24%', color: '#D8A04A' },
    { name: language === 'bn' ? 'মাছ ও জলজ' : 'Fish & Seafood', pct: 18, count: '18%', color: '#4B8FC8' },
    { name: language === 'bn' ? 'চাল ও খাদ্যশস্য' : 'Grains & Rice', pct: 12, count: '12%', color: '#718078' },
    { name: language === 'bn' ? 'ফলমূল ও অন্যান্য' : 'Fruits & Others', pct: 8, count: '8%', color: '#C9892B' }
  ];

  // 7-day commodity trend data for SVG visualization
  const trendCommodities = [
    {
      name: language === 'bn' ? 'আলু (কার্ডিনাল)' : 'Potato (Cardinal)',
      points: [58, 57, 56, 56, 55, 54, 55],
      change: -5.1,
      current: 55,
      unit: 'কেজি'
    },
    {
      name: language === 'bn' ? 'দেশি পেঁয়াজ' : 'Onion (Deshi)',
      points: [100, 102, 104, 105, 108, 110, 112],
      change: +12.0,
      current: 112,
      unit: 'কেজি'
    },
    {
      name: language === 'bn' ? 'পাকা টমেটো' : 'Ripe Tomato',
      points: [68, 64, 60, 56, 52, 50, 48],
      change: -29.4,
      current: 48,
      unit: 'কেজি'
    },
    {
      name: language === 'bn' ? 'কাঁচা মরিচ' : 'Green Chili',
      points: [130, 140, 145, 150, 165, 175, 185],
      change: +42.3,
      current: 185,
      unit: 'কেজি'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#718078] mb-1">
            <button onClick={() => navigateTo('home')} className="hover:underline">
              {t.navHome}
            </button>
            <span>/</span>
            <span className="text-[#24332B] font-semibold">{t.navAnalysis}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#24332B] tracking-tight flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-[#2B8A63]" />
            <span>{language === 'bn' ? 'পাবলিক বাজার বিশ্লেষণ ও ট্রেন্ড' : 'Public Market Analysis & Price Trends'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#718078] mt-1">
            {language === 'bn'
              ? 'সারাদেশের জেলা ও পাইকারি আড়ত থেকে সংগৃহীত তথ্যের ভিত্তিতে পণ্যমূল্যের ওঠানামা বিশ্লেষণ।'
              : 'Statistical trends and price movement analysis across Bangladeshi wholesale markets.'}
          </p>
        </div>

        {/* Time range selector */}
        <div className="flex bg-white p-1 rounded-xl border border-[#DDE6E0] shadow-2xs">
          {(['7d', '30d', '90d'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                timeRange === r ? 'bg-[#2B8A63] text-white' : 'text-[#718078] hover:text-[#24332B]'
              }`}
            >
              {r === '7d' ? (language === 'bn' ? '৭ দিন' : '7 Days') : r === '30d' ? (language === 'bn' ? '৩০ দিন' : '30 Days') : (language === 'bn' ? '৯০ দিন' : '90 Days')}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#DDE6E0] shadow-2xs">
          <span className="text-xs text-[#718078] block">{language === 'bn' ? 'ট্র্যাককৃত পণ্য' : 'Tracked Products'}</span>
          <span className="text-2xl font-black text-[#24332B] mt-1 block">৬৪+ টি</span>
          <span className="text-[11px] text-[#2B8A63] font-semibold">সকল ৮ বিভাগে লাইভ</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#DDE6E0] shadow-2xs">
          <span className="text-xs text-[#718078] block">{language === 'bn' ? 'সক্রিয় বাজার ও আড়ত' : 'Active Arats & Markets'}</span>
          <span className="text-2xl font-black text-[#2B8A63] mt-1 block">৩১০+ টি</span>
          <span className="text-[11px] text-[#2B8A63] font-semibold">টাঙ্গাইল, ঢাকা, চট্টগ্রাম ইত্যাদি</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#DDE6E0] shadow-2xs">
          <span className="text-xs text-[#718078] block">{language === 'bn' ? 'সাপ্তাহিক সর্বোচ্চ বৃদ্ধি' : 'Top Spike This Week'}</span>
          <span className="text-2xl font-black text-[#D95E5E] mt-1 block">+৪২.৩%</span>
          <span className="text-[11px] text-[#718078]">কাঁচা মরিচ (বৃষ্টির কারণে)</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#DDE6E0] shadow-2xs">
          <span className="text-xs text-[#718078] block">{language === 'bn' ? 'সাপ্তাহিক সর্বোচ্চ পতন' : 'Top Drop (Relief)'}</span>
          <span className="text-2xl font-black text-[#2B8A63] mt-1 block">-২৯.৪%</span>
          <span className="text-[11px] text-[#718078]">টমেটো (নতুন ফলন)</span>
        </div>
      </div>

      {/* Visual Line Trend Cards */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6E0] shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#24332B]">
              {language === 'bn' ? 'নিত্যপণ্যের ৭ দিনের দামের পরিবর্তন রেখাচিত্র' : '7-Day Price Trend Charts for Staple Commodities'}
            </h2>
            <p className="text-xs text-[#718078]">
              {language === 'bn' ? 'দৈনিক গড় খুচরা মূল্যের গতিবিধি (টাকা/কেজি)' : 'Daily average retail price movement (BDT / kg)'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trendCommodities.map((item, idx) => {
            const min = Math.min(...item.points) - 5;
            const max = Math.max(...item.points) + 5;
            const height = 90;
            const width = 280;

            const pathData = item.points
              .map((val, i) => {
                const x = (i / (item.points.length - 1)) * width;
                const y = height - ((val - min) / (max - min)) * height;
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              })
              .join(' ');

            return (
              <div key={idx} className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#DDE6E0]">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-sm text-[#24332B]">{item.name}</h3>
                    <span className="text-xs text-[#718078]">বর্তমান গড়: ৳ {item.current} / {item.unit}</span>
                  </div>
                  <span
                    className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-md ${
                      item.change > 0 ? 'bg-[#FDE8E8] text-[#D95E5E]' : 'bg-[#E4F2EB] text-[#2B8A63]'
                    }`}
                  >
                    {item.change > 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    <span>{item.change > 0 ? `+${item.change}%` : `${item.change}%`}</span>
                  </span>
                </div>

                {/* SVG Trend Sparkline */}
                <div className="py-2">
                  <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-24 overflow-visible">
                    <path
                      d={pathData}
                      fill="none"
                      stroke={item.change > 0 ? '#D95E5E' : '#2B8A63'}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {item.points.map((val, i) => {
                      const x = (i / (item.points.length - 1)) * width;
                      const y = height - ((val - min) / (max - min)) * height;
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r="3"
                          fill={item.change > 0 ? '#D95E5E' : '#2B8A63'}
                        />
                      );
                    })}
                  </svg>
                </div>

                <div className="flex justify-between text-[10px] text-[#718078] pt-1 border-t border-[#DDE6E0]">
                  <span>৭ দিন পূর্বে</span>
                  <span>আজকে</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Category Distribution & Most Active Districts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Breakdown */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6E0] shadow-xs">
          <h2 className="text-lg font-bold text-[#24332B] mb-2 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#2B8A63]" />
            <span>{language === 'bn' ? 'ক্যাটাগরিভিত্তিক রিপোর্ট বিভাজন' : 'Category-wise Report Share'}</span>
          </h2>
          <p className="text-xs text-[#718078] mb-6">
            {language === 'bn' ? 'ব্যবহারকারীদের প্রেরিত মূল্য রিপোর্টের অনুপাত' : 'Distribution of community reported commodity updates'}
          </p>

          <div className="space-y-3.5">
            {categoryCounts.map((cat, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs font-semibold text-[#24332B] mb-1">
                  <span>{cat.name}</span>
                  <span>{cat.count}</span>
                </div>
                <div className="w-full bg-[#F3F6F4] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.pct}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Active Districts */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6E0] shadow-xs">
          <h2 className="text-lg font-bold text-[#24332B] mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#2B8A63]" />
            <span>{language === 'bn' ? 'শীর্ষ সক্রিয় জেলাসমূহের অবদান' : 'Top Active District Contributors'}</span>
          </h2>
          <p className="text-xs text-[#718078] mb-6">
            {language === 'bn' ? 'সাপ্তাহিক সর্বাধিক রিপোর্ট প্রাপ্ত অঞ্চলসমূহ' : 'Regions generating the highest volume of verified submissions'}
          </p>

          <div className="space-y-3">
            {SEED_DISTRICTS.slice(0, 5).map((dist, idx) => (
              <div
                key={dist.id}
                onClick={() => navigateTo('district-detail', { slug: dist.slug })}
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAFBF9] border border-[#DDE6E0] hover:border-[#2B8A63] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#E4F2EB] text-[#2B8A63] text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#24332B]">
                      {language === 'bn' ? dist.nameBn : dist.nameEn}
                    </h4>
                    <span className="text-[10px] text-[#718078]">{dist.totalMarkets} টি বাজার তালিকাভুক্ত</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-[#2B8A63] block">{dist.activeReportsCount} টি রিপোর্ট</span>
                  <span className="text-[10px] text-[#718078]">বিভাগ: {dist.division}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
