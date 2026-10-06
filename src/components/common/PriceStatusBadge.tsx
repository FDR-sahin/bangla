import React from 'react';
import { ArrowDownRight, ArrowUpRight, Minus, AlertTriangle } from 'lucide-react';
import { PriceStatus } from '../../types';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

interface Props {
  status: PriceStatus;
  size?: 'sm' | 'md';
}

export const PriceStatusBadge: React.FC<Props> = ({ status, size = 'md' }) => {
  const { language } = useApp();
  const t = translations[language];

  switch (status) {
    case 'low':
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium rounded-full bg-[#E4F2EB] text-[#1F7451] border border-[#C2E3D2] ${
            size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs sm:text-sm'
          }`}
          title={t.statusLow}
        >
          <ArrowDownRight className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
          <span>{t.statusLow}</span>
        </span>
      );
    case 'high':
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium rounded-full bg-[#FFF4E5] text-[#C9892B] border border-[#F3DFC1] ${
            size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs sm:text-sm'
          }`}
          title={t.statusHigh}
        >
          <ArrowUpRight className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
          <span>{t.statusHigh}</span>
        </span>
      );
    case 'unusual':
      return (
        <span
          className={`inline-flex items-center gap-1 font-semibold rounded-full bg-[#FDE8E8] text-[#D95E5E] border border-[#F7C6C6] ${
            size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs sm:text-sm'
          }`}
          title={t.statusUnusual}
        >
          <AlertTriangle className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
          <span>{t.statusUnusual}</span>
        </span>
      );
    case 'average':
    default:
      return (
        <span
          className={`inline-flex items-center gap-1 font-medium rounded-full bg-[#E9F2F8] text-[#2B8A63] border border-[#D0E4EE] ${
            size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs sm:text-sm'
          }`}
          title={t.statusAverage}
        >
          <Minus className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
          <span>{t.statusAverage}</span>
        </span>
      );
  }
};
