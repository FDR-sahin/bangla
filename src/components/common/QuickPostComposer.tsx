import React from 'react';
import { TrendingUp, Camera, MapPin, Plus, Sparkles, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickPostComposer: React.FC = () => {
  const { currentUser, openCreatePostModal, setLoginRequiredModal, language } = useApp();

  const handleClick = () => {
    if (!currentUser) {
      setLoginRequiredModal(true);
    } else {
      openCreatePostModal();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#DDE6E0] shadow-xs mb-6 hover:border-[#2B8A63]/50 transition-all">
      <div className="flex items-center gap-3">
        <img
          src={
            currentUser?.avatar ||
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
          }
          alt={currentUser?.fullName || 'User'}
          className="w-10 h-10 rounded-full object-cover border border-[#DDE6E0] shrink-0"
        />

        <div
          onClick={handleClick}
          className="flex-1 bg-[#F8FAF9] hover:bg-[#F0F5F2] border border-[#DDE6E0] rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[#718078] cursor-pointer flex items-center justify-between transition-colors"
        >
          <span>
            {currentUser
              ? language === 'bn'
                ? `আজ বাজারে কী কিনলেন, ${currentUser.fullName.split(' ')[0]}? দাম শেয়ার করুন...`
                : `What did you buy today, ${currentUser.fullName.split(' ')[0]}? Share market rate...`
              : language === 'bn'
              ? 'আজকের কেনাকাটার দাম জানান এবং অন্যদের সাহায্য করুন...'
              : 'Share commodity prices and help fellow shoppers...'}
          </span>
          <span className="p-1 rounded-lg bg-[#2B8A63] text-white">
            <Plus className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-[#DDE6E0]/70 text-xs font-semibold text-[#718078]">
        <button
          onClick={handleClick}
          className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl hover:bg-[#E4F2EB] hover:text-[#2B8A63] transition-colors cursor-pointer"
        >
          <TrendingUp className="w-4 h-4 text-[#2B8A63]" />
          <span className="truncate">{language === 'bn' ? 'মূল্য রিপোর্ট' : 'Price Report'}</span>
        </button>

        <button
          onClick={handleClick}
          className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl hover:bg-[#E9F2F8] hover:text-[#4B8FC8] transition-colors cursor-pointer"
        >
          <Camera className="w-4 h-4 text-[#4B8FC8]" />
          <span className="truncate">{language === 'bn' ? 'ছবি ও রসিদ' : 'Photo / Receipt'}</span>
        </button>

        <button
          onClick={handleClick}
          className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl hover:bg-[#FAF0E6] hover:text-[#D8A04A] transition-colors cursor-pointer"
        >
          <MapPin className="w-4 h-4 text-[#D8A04A]" />
          <span className="truncate">{language === 'bn' ? 'বাজারের তথ্য' : 'Market Status'}</span>
        </button>
      </div>
    </div>
  );
};
