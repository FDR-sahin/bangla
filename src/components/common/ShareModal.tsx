import React, { useState } from 'react';
import { Share2, Copy, Check, X, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ShareModal: React.FC = () => {
  const { shareModalData, closeShareModal, language, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!shareModalData || !shareModalData.open) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareModalData.url);
    setCopied(true);
    showToast(language === 'bn' ? 'লিংক কপি করা হয়েছে!' : 'Link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`${shareModalData.title}\n${shareModalData.url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(shareModalData.url);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#DDE6E0] animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-[#2B8A63]">
            <Share2 className="w-5 h-5" />
            <h3 className="text-lg font-bold text-[#24332B]">
              {language === 'bn' ? 'পোস্টটি শেয়ার করুন' : 'Share this Post'}
            </h3>
          </div>
          <button onClick={closeShareModal} className="text-[#718078] hover:text-[#24332B] p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-[#718078] mb-4 line-clamp-2">
          {shareModalData.title}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            onClick={shareOnWhatsApp}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366]/10 text-[#128C7E] font-medium text-sm hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp</span>
          </button>
          <button
            onClick={shareOnFacebook}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1877F2]/10 text-[#1877F2] font-medium text-sm hover:bg-[#1877F2]/20 transition-colors"
          >
            <span className="font-bold text-base">f</span>
            <span>Facebook</span>
          </button>
        </div>

        <div className="flex items-center gap-2 p-1.5 bg-[#F3F6F4] border border-[#DDE6E0] rounded-xl">
          <input
            type="text"
            readOnly
            value={shareModalData.url}
            className="bg-transparent flex-1 text-xs text-[#718078] px-2 outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-[#2B8A63] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#1F7451] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (language === 'bn' ? 'কপি হয়েছে' : 'Copied') : (language === 'bn' ? 'কপি' : 'Copy')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
