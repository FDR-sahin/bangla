import React from 'react';
import { ArrowLeft, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PostCard } from '../common/PostCard';
import { translations } from '../../data/translations';

export const PostDetailPage: React.FC = () => {
  const { language, pageParams, navigateTo, posts, openShareModal } = useApp();
  const t = translations[language];

  const postId = pageParams.postId;
  const post = posts.find((p) => p.id === postId) || posts[0];

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-[#718078] mb-4">পোস্টটি খুঁজে পাওয়া যায়নি।</p>
        <button
          onClick={() => navigateTo('explore')}
          className="px-4 py-2 rounded-xl bg-[#2B8A63] text-white text-xs font-semibold"
        >
          {t.navExplore}
        </button>
      </div>
    );
  }

  const handleShare = () => {
    openShareModal(post.title || post.description.slice(0, 60), window.location.href);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('explore')}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#718078] hover:text-[#24332B] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'ফিরে যান' : 'Back'}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DDE6E0] bg-white text-xs font-semibold text-[#24332B] hover:bg-[#F3F6F4] cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{t.share}</span>
        </button>
      </div>

      <PostCard post={post} showCommentsInitially={true} />
    </div>
  );
};
