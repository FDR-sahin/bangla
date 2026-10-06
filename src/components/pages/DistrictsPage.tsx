import React, { useState } from 'react';
import { MapPin, Search, ChevronRight, Store } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SEED_DISTRICTS } from '../../data/seedData';
import { translations } from '../../data/translations';

export const DistrictsPage: React.FC = () => {
  const { language, navigateTo } = useApp();
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');

  const divisions = [
    { id: 'all', nameBn: 'সকল বিভাগ', nameEn: 'All Divisions' },
    { id: 'Dhaka', nameBn: 'ঢাকা বিভাগ', nameEn: 'Dhaka Division' },
    { id: 'Rajshahi', nameBn: 'রাজশাহী বিভাগ', nameEn: 'Rajshahi Division' },
    { id: 'Chittagong', nameBn: 'চট্টগ্রাম বিভাগ', nameEn: 'Chittagong Division' },
    { id: 'Khulna', nameBn: 'খুলনা বিভাগ', nameEn: 'Khulna Division' },
    { id: 'Sylhet', nameBn: 'সিলেট বিভাগ', nameEn: 'Sylhet Division' },
    { id: 'Barishal', nameBn: 'বরিশাল বিভাগ', nameEn: 'Barishal Division' },
    { id: 'Rangpur', nameBn: 'রংপুর বিভাগ', nameEn: 'Rangpur Division' },
    { id: 'Mymensingh', nameBn: 'ময়মনসিংহ বিভাগ', nameEn: 'Mymensingh Division' }
  ];

  const filteredDistricts = SEED_DISTRICTS.filter((dist) => {
    const matchesDiv = selectedDivision === 'all' || dist.division === selectedDivision;
    const matchesSearch =
      dist.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dist.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dist.division.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiv && matchesSearch;
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
          <span className="text-[#24332B] font-semibold">{t.navDistricts}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#24332B] tracking-tight">
          {language === 'bn' ? 'বাংলাদেশের ৬৪ জেলার বাজার তালিকা' : 'Districts & Local Markets Directory'}
        </h1>
        <p className="text-xs sm:text-sm text-[#718078] mt-1">
          {language === 'bn'
            ? 'আপনার জেলা নির্বাচন করে স্থানীয় উপজেলা, বড় কাঁচাবাজার ও পাইকারি আড়তের সর্বশেষ দর দেখুন।'
            : 'Select your district to explore local upazilas, prominent bazars, and daily price trends.'}
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DDE6E0] shadow-xs space-y-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'bn' ? 'জেলার নাম খুঁজুন (টাঙ্গাইল, ঢাকা, রাজশাহী...)' : 'Search district (Tangail, Dhaka, Rajshahi...)...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DDE6E0] text-xs sm:text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
          />
          <Search className="w-4 h-4 text-[#718078] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {divisions.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDivision(d.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedDivision === d.id
                  ? 'bg-[#2B8A63] text-white'
                  : 'bg-[#F3F6F4] text-[#718078] hover:bg-[#E4F2EB] hover:text-[#2B8A63]'
              }`}
            >
              {language === 'bn' ? d.nameBn : d.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Districts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDistricts.map((dist) => (
          <div
            key={dist.id}
            onClick={() => navigateTo('district-detail', { slug: dist.slug })}
            className="bg-white p-5 rounded-2xl border border-[#DDE6E0] shadow-xs hover:border-[#2B8A63] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#E4F2EB] text-[#2B8A63] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-[#24332B] group-hover:text-[#2B8A63] transition-colors">
                      {language === 'bn' ? dist.nameBn : dist.nameEn}
                    </h3>
                    <span className="text-xs text-[#718078]">বিভাগ: {dist.division}</span>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-[#2B8A63] bg-[#E4F2EB] px-2 py-0.5 rounded-md">
                  {dist.activeReportsCount} {language === 'bn' ? 'রিপোর্ট' : 'Reports'}
                </span>
              </div>

              {/* Markets List */}
              <div className="mt-3">
                <span className="text-[11px] font-semibold text-[#718078] block mb-1.5">
                  {language === 'bn' ? 'প্রধান বাজার ও আড়ত:' : 'Top Prominent Bazars:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(language === 'bn' ? dist.topMarketsBn : dist.topMarkets).slice(0, 3).map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[#FAFBF9] border border-[#DDE6E0] text-[11px] text-[#24332B]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Popular Local Items */}
              <div className="mt-3">
                <span className="text-[11px] font-semibold text-[#718078] block mb-1.5">
                  {language === 'bn' ? 'বিখ্যাত পণ্য:' : 'Special Local Commodities:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(language === 'bn' ? dist.popularProductsBn : dist.popularProducts).map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[#E9F2F8] text-[#4B8FC8] text-[10px] font-medium"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#DDE6E0] flex items-center justify-between text-xs font-semibold text-[#2B8A63]">
              <span>{language === 'bn' ? `${dist.totalMarkets} টি বাজার দেখুন` : `Explore ${dist.totalMarkets} Markets`}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
