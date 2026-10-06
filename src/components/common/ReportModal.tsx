import React, { useState } from 'react';
import { AlertCircle, X, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ReportReason } from '../../types';
import { translations } from '../../data/translations';

export const ReportModal: React.FC = () => {
  const { reportModalData, closeReportModal, submitReport, currentUser, language } = useApp();
  const t = translations[language];

  const [reason, setReason] = useState<ReportReason>('fake_price');
  const [details, setDetails] = useState('');

  if (!reportModalData || !reportModalData.open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    submitReport({
      reporterId: currentUser.id,
      reporterName: currentUser.fullName,
      targetType: reportModalData.targetType,
      targetId: reportModalData.targetId,
      targetSummary: reportModalData.targetSummary,
      reason,
      details
    });

    setDetails('');
    closeReportModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#DDE6E0] animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-[#D95E5E]">
            <ShieldAlert className="w-6 h-6" />
            <h3 className="text-lg font-bold text-[#24332B]">{t.reportTitle}</h3>
          </div>
          <button
            onClick={closeReportModal}
            className="text-[#718078] hover:text-[#24332B] p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-[#F3F6F4] p-3 rounded-xl mb-4 border border-[#DDE6E0] text-sm text-[#718078]">
          <span className="font-semibold text-[#24332B] block mb-1">
            {reportModalData.targetType === 'post' ? 'পোস্ট' : reportModalData.targetType === 'comment' ? 'মন্তব্য' : 'ব্যবহারকারী'}:
          </span>
          <p className="line-clamp-2 italic">"{reportModalData.targetSummary}"</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#24332B] mb-1.5">
              {t.reportReasonPrompt}
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as ReportReason)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE6E0] bg-white text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
            >
              <option value="fake_price">{t.reasonFakePrice}</option>
              <option value="wrong_info">{t.reasonWrongInfo}</option>
              <option value="spam">{t.reasonSpam}</option>
              <option value="abusive_comment">{t.reasonAbusive}</option>
              <option value="inappropriate_image">{t.reasonInappropriate}</option>
              <option value="duplicate_post">{t.reasonDuplicate}</option>
              <option value="other">{t.reasonOther}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#24332B] mb-1.5">
              {t.detailsPrompt}
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={language === 'bn' ? 'কেন এটি ভুল বা বিভ্রান্তিকর তা সংক্ষেপে লিখুন...' : 'Briefly describe why this is incorrect...'}
              className="w-full px-3.5 py-2 rounded-xl border border-[#DDE6E0] text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={closeReportModal}
              className="flex-1 py-2.5 px-4 rounded-xl border border-[#DDE6E0] text-sm font-medium text-[#718078] hover:bg-[#F3F6F4]"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#D95E5E] hover:bg-[#c84d4d] text-sm font-medium text-white shadow-sm flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{t.submit}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
