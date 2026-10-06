import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bg = 'bg-white border-[#DDE6E0] text-[#24332B]';
        let Icon = CheckCircle2;
        let iconColor = 'text-[#2B8A63]';

        if (toast.type === 'error') {
          bg = 'bg-[#FFF5F5] border-[#F7C6C6] text-[#9B1C1C]';
          Icon = AlertCircle;
          iconColor = 'text-[#D95E5E]';
        } else if (toast.type === 'warning') {
          bg = 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]';
          Icon = AlertTriangle;
          iconColor = 'text-[#C9892B]';
        } else if (toast.type === 'info') {
          bg = 'bg-[#EFF6FF] border-[#BFDBFE] text-[#1E40AF]';
          Icon = Info;
          iconColor = 'text-[#4B8FC8]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border shadow-lg transition-all animate-in slide-in-from-right duration-200 ${bg}`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className={`w-5 h-5 shrink-0 ${iconColor}`} />
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:opacity-75 transition-opacity"
            >
              <X className="w-4 h-4 opacity-60" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
