import React, { useState } from 'react';
import { LogIn, UserPlus, KeyRound, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SEED_DISTRICTS } from '../../data/seedData';
import { translations } from '../../data/translations';

export const LoginPage: React.FC = () => {
  const { language, loginUser, navigateTo } = useApp();
  const t = translations[language];

  const [email, setEmail] = useState('tanvir@tangailbazar.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const ok = loginUser(email, password);
    if (ok) {
      navigateTo('dashboard', { tab: 'overview' });
    }
  };

  const handleQuickDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    loginUser(demoEmail, 'password123');
    navigateTo('dashboard', { tab: 'overview' });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6E0] shadow-sm">
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#E4F2EB] text-[#2B8A63] flex items-center justify-center font-bold text-2xl mx-auto mb-3">
            বা
          </div>
          <h1 className="text-2xl font-black text-[#24332B]">{t.login}</h1>
          <p className="text-xs text-[#718078] mt-1">
            {language === 'bn' ? 'বাজারবাংলা সাধারণ নাগরিক একাউন্টে প্রবেশ করুন' : 'Log in to your BazarBangla community account'}
          </p>
        </div>

        {/* Quick Demo Accounts Helper */}
        <div className="bg-[#FAFBF9] p-3 rounded-xl border border-[#DDE6E0] mb-5">
          <span className="text-[11px] font-bold text-[#718078] block mb-1.5 uppercase">
            {language === 'bn' ? '⚡ দ্রুত টেস্টের জন্য ডেমো একাউন্ট নির্বাচন করুন:' : '⚡ Quick 1-Click Demo Profiles:'}
          </span>
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemo('tanvir@tangailbazar.com')}
              className="text-left px-2.5 py-1.5 rounded-lg bg-white border border-[#DDE6E0] hover:border-[#2B8A63] text-xs font-semibold text-[#24332B] flex justify-between items-center cursor-pointer"
            >
              <span>তানভীর আহমেদ (টাঙ্গাইল কন্ট্রিবিউটর)</span>
              <span className="text-[10px] text-[#2B8A63]">লগইন →</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('nusrat@gmail.com')}
              className="text-left px-2.5 py-1.5 rounded-lg bg-white border border-[#DDE6E0] hover:border-[#2B8A63] text-xs font-semibold text-[#24332B] flex justify-between items-center cursor-pointer"
            >
              <span>নুসরাত জাহান (ঢাকা কারওয়ান বাজার)</span>
              <span className="text-[10px] text-[#2B8A63]">লগইন →</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#24332B] mb-1">ইমেইল বা ইউজারনেম</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE6E0] text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-[#24332B]">পাসওয়ার্ড</label>
              <button
                type="button"
                onClick={() => navigateTo('forgot-password')}
                className="text-xs text-[#2B8A63] hover:underline"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE6E0] text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#2B8A63] hover:bg-[#1F7451] text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
          >
            {t.login}
          </button>
        </form>

        <div className="pt-6 mt-6 border-t border-[#DDE6E0] text-center text-xs text-[#718078]">
          <span>অ্যাকাউন্ট নেই? </span>
          <button
            onClick={() => navigateTo('register')}
            className="font-bold text-[#2B8A63] hover:underline"
          >
            {language === 'bn' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Register Here'}
          </button>
        </div>

        <div className="mt-4 pt-3 text-center border-t border-[#F3F6F4]">
          <button
            onClick={() => navigateTo('admin')}
            className="text-[11px] text-[#718078] hover:text-[#24332B] flex items-center justify-center gap-1 mx-auto"
          >
            <Lock className="w-3 h-3 text-[#D8A04A]" />
            <span>{language === 'bn' ? 'মূল এডমিন প্যানেল লগইন এখানে' : 'Main Admin Panel Portal'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const { language, registerUser, navigateTo } = useApp();
  const t = translations[language];

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('Tangail');
  const [upazila, setUpazila] = useState('Tangail Sadar');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    registerUser({
      fullName,
      username: username || email.split('@')[0],
      email,
      district,
      upazila
    });

    navigateTo('dashboard', { tab: 'overview' });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6E0] shadow-sm">
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#E4F2EB] text-[#2B8A63] flex items-center justify-center font-bold text-2xl mx-auto mb-3">
            বা
          </div>
          <h1 className="text-2xl font-black text-[#24332B]">{t.register}</h1>
          <p className="text-xs text-[#718078] mt-1">
            {language === 'bn' ? 'সচেতন নাগরিক হিসেবে বাজারবাংলা পরিবারে যুক্ত হোন' : 'Join the BazarBangla price tracking community'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-[#24332B] mb-1">পূর্ণ নাম</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="আপনার নাম"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE6E0] text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#24332B] mb-1">ইউজারনেম</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="যেমন: tanvir_tangail"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE6E0] text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#24332B] mb-1">ইমেইল ঠিকানা</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE6E0] text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-[#24332B] mb-1">জেলা</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] bg-white text-xs text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
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
                required
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                placeholder="সদর / মধুপুর"
                className="w-full px-3 py-2 rounded-xl border border-[#DDE6E0] text-xs text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#2B8A63] hover:bg-[#1F7451] text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
          >
            {language === 'bn' ? 'নিবন্ধন সম্পন্ন করুন' : 'Complete Registration'}
          </button>
        </form>

        <div className="pt-6 mt-6 border-t border-[#DDE6E0] text-center text-xs text-[#718078]">
          <span>ইতিমধ্যে অ্যাকাউন্ট আছে? </span>
          <button
            onClick={() => navigateTo('login')}
            className="font-bold text-[#2B8A63] hover:underline"
          >
            {t.login}
          </button>
        </div>

      </div>
    </div>
  );
};

export const ForgotPasswordPage: React.FC = () => {
  const { language, navigateTo, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    showToast(language === 'bn' ? 'পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে।' : 'Password reset link sent to your email.', 'success');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6E0] shadow-sm">
        <button
          onClick={() => navigateTo('login')}
          className="flex items-center gap-1 text-xs text-[#718078] hover:text-[#24332B] mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>লগইনে ফিরুন</span>
        </button>

        <h1 className="text-xl font-bold text-[#24332B] mb-2">পাসওয়ার্ড রিসেট</h1>
        <p className="text-xs text-[#718078] mb-6">
          আপনার নিবন্ধিত ইমেইল ঠিকানাটি লিখুন। আমরা আপনাকে একটি পাসওয়ার্ড পুনরুদ্ধারের নির্দেশনা পাঠাব।
        </p>

        {submitted ? (
          <div className="p-4 rounded-xl bg-[#E4F2EB] text-xs text-[#1F7451] font-semibold text-center space-y-2">
            <p>আপনার ইমেইল ইনবক্স চেক করুন।</p>
            <button
              onClick={() => navigateTo('login')}
              className="px-4 py-1.5 rounded-lg bg-[#2B8A63] text-white text-xs font-bold"
            >
              লগইন পেজে যান
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#24332B] mb-1">ইমেইল ঠিকানা</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@mail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE6E0] text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#2B8A63] text-white font-bold text-xs hover:bg-[#1F7451]"
            >
              রিসেট নির্দেশনা পাঠান
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
