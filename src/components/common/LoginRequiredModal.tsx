import React from 'react';
import { LogIn, UserPlus, X, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

export const LoginRequiredModal: React.FC = () => {
  const { loginRequiredModal, setLoginRequiredModal, navigateTo, language } = useApp();
  const t = translations[language];

  if (!loginRequiredModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#DDE6E0] animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-full bg-[#E4F2EB] flex items-center justify-center text-[#2B8A63]">
            <Lock className="w-6 h-6" />
          </div>
          <button
            onClick={() => setLoginRequiredModal(false)}
            className="text-[#718078] hover:text-[#24332B] p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-xl font-bold text-[#24332B] mb-2">{t.loginRequiredTitle}</h3>
        <p className="text-sm text-[#718078] mb-6 leading-relaxed">
          {t.loginRequiredDesc}
        </p>

        <div className="space-y-3">
          <button
            onClick={() => {
              setLoginRequiredModal(false);
              navigateTo('login');
            }}
            className="w-full py-2.5 px-4 bg-[#2B8A63] hover:bg-[#1F7451] text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>{language === 'bn' ? 'লগইন করুন' : 'Log In'}</span>
          </button>

          <button
            onClick={() => {
              setLoginRequiredModal(false);
              navigateTo('register');
            }}
            className="w-full py-2.5 px-4 bg-[#E4F2EB] hover:bg-[#d5ebdf] text-[#2B8A63] font-medium rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>{language === 'bn' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Create Free Account'}</span>
          </button>

          <button
            onClick={() => setLoginRequiredModal(false)}
            className="w-full py-2 text-sm text-[#718078] hover:text-[#24332B] transition-colors"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};
