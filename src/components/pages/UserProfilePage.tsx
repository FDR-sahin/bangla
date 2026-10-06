import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  ShieldCheck,
  FileText,
  ThumbsUp,
  Bookmark,
  Share2,
  Flag,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SEED_USERS } from '../../data/seedData';
import { PostCard } from '../common/PostCard';
import { translations } from '../../data/translations';

export const UserProfilePage: React.FC = () => {
  const { language, pageParams, navigateTo, posts, openReportModal, openShareModal } = useApp();
  const t = translations[language];

  const username = pageParams.username || 'tanvir_tangail';
  const user = SEED_USERS.find((u) => u.username === username) || SEED_USERS[1];

  const [activeTab, setActiveTab] = useState<'posts' | 'reports'>('posts');

  const userPosts = posts.filter((p) => p.authorUsername === user.username);
  const userPriceReports = userPosts.filter((p) => p.postType === 'price_report');

  const displayedPosts = activeTab === 'posts' ? userPosts : userPriceReports;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Back button */}
      <button
        onClick={() => navigateTo('home')}
        className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#718078] hover:text-[#24332B] cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{language === 'bn' ? 'হোমে ফিরুন' : 'Back to Home'}</span>
      </button>

      {/* User Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6E0] shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#E4F2EB] shadow-xs shrink-0"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[#24332B] flex items-center justify-center sm:justify-start gap-2">
                  <span>{user.fullName}</span>
                  {user.isTrustedContributor && (
                    <span
                      title={t.trustedContributor}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#2B8A63] bg-[#E4F2EB] px-2 py-0.5 rounded-full"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{t.trustedContributor}</span>
                    </span>
                  )}
                </h1>
                <p className="text-xs text-[#718078]">@{user.username}</p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => openShareModal(user.fullName, window.location.href)}
                  className="p-2 rounded-xl border border-[#DDE6E0] text-[#718078] hover:text-[#24332B]"
                  title="Share profile"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openReportModal('user', user.id, `@${user.username}`)}
                  className="p-2 rounded-xl border border-[#DDE6E0] text-[#D95E5E] hover:bg-[#FDE8E8]"
                  title="Report user"
                >
                  <Flag className="w-4 h-4" />
                </button>
              </div>
            </div>

            {user.bio && (
              <p className="text-xs sm:text-sm text-[#24332B] leading-relaxed max-w-xl">
                {user.bio}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#718078] pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#2B8A63]" />
                <span>{user.upazila}, {user.district}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>সদস্য হয়েছেন: ২০২৬</span>
              </span>
            </div>

            {/* User Stat Highlights */}
            <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#DDE6E0] max-w-md">
              <div className="p-2.5 rounded-xl bg-[#FAFBF9] text-center border border-[#DDE6E0]">
                <span className="text-lg font-black text-[#2B8A63] block">{userPosts.length}</span>
                <span className="text-[10px] text-[#718078]">মোট পোস্ট</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAFBF9] text-center border border-[#DDE6E0]">
                <span className="text-lg font-black text-[#2B8A63] block">{userPriceReports.length}</span>
                <span className="text-[10px] text-[#718078]">দাম রিপোর্ট</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAFBF9] text-center border border-[#DDE6E0]">
                <span className="text-lg font-black text-[#D8A04A] block">{user.trustScore}%</span>
                <span className="text-[10px] text-[#718078]">ট্রাস্ট স্কোর</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#DDE6E0] gap-4 text-sm font-bold">
        <button
          onClick={() => setActiveTab('posts')}
          className={`pb-3 px-1 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'posts' ? 'border-[#2B8A63] text-[#2B8A63]' : 'border-transparent text-[#718078] hover:text-[#24332B]'
          }`}
        >
          {language === 'bn' ? `সকল পোস্ট (${userPosts.length})` : `All Posts (${userPosts.length})`}
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`pb-3 px-1 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'reports' ? 'border-[#2B8A63] text-[#2B8A63]' : 'border-transparent text-[#718078] hover:text-[#24332B]'
          }`}
        >
          {language === 'bn' ? `মূল্য রিপোর্টসমূহ (${userPriceReports.length})` : `Price Reports (${userPriceReports.length})`}
        </button>
      </div>

      {/* User Posts List */}
      <div className="space-y-4">
        {displayedPosts.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-[#DDE6E0] text-center text-xs text-[#718078]">
            {language === 'bn' ? 'কোনো পোস্ট নেই।' : 'No posts found.'}
          </div>
        ) : (
          displayedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>

    </div>
  );
};
