import React, { useState } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Bookmark,
  ShieldCheck,
  MapPin,
  Clock,
  MoreVertical,
  Flag,
  Send,
  Trash2,
  BadgeCheck,
  AlertTriangle
} from 'lucide-react';
import { Post } from '../../types';
import { useApp } from '../../context/AppContext';
import { PriceStatusBadge } from './PriceStatusBadge';
import { translations } from '../../data/translations';

interface Props {
  post: Post;
  showCommentsInitially?: boolean;
}

export const PostCard: React.FC<Props> = ({ post, showCommentsInitially = false }) => {
  const {
    currentUser,
    language,
    handleReaction,
    getUserReaction,
    toggleSavePost,
    isPostSaved,
    openReportModal,
    openShareModal,
    setLoginRequiredModal,
    comments,
    addComment,
    deleteComment,
    navigateTo
  } = useApp();

  const t = translations[language];
  const userReaction = getUserReaction(post.id);
  const isSaved = isPostSaved(post.id);

  const [showComments, setShowComments] = useState(showCommentsInitially);
  const [commentText, setCommentText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // Filter comments for this post
  const postComments = comments.filter((c) => c.postId === post.id && c.status === 'active');

  const handleLike = () => {
    handleReaction(post.id, 'like');
  };

  const handleDislike = () => {
    handleReaction(post.id, 'dislike');
  };

  const handleSave = () => {
    toggleSavePost(post.id);
  };

  const handleShare = () => {
    const postUrl = window.location.origin + `?post=${post.id}`;
    openShareModal(post.title || post.description.slice(0, 60), postUrl);
  };

  const handleReport = () => {
    setMenuOpen(false);
    openReportModal('post', post.id, post.title || post.description.slice(0, 60));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!currentUser) {
      setLoginRequiredModal(true);
      return;
    }
    addComment(post.id, commentText.trim());
    setCommentText('');
  };

  // Format date readable
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (language === 'bn') {
        return d.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
      }
      return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateStr;
    }
  };

  return (
    <article className="bg-white rounded-2xl border border-[#DDE6E0] shadow-xs hover:shadow-md transition-shadow overflow-hidden mb-5">
      {/* Moderation banner if under review */}
      {post.postStatus === 'under_review' && (
        <div className="bg-[#FFFBEB] border-b border-[#FDE68A] px-4 py-2 flex items-center gap-2 text-xs text-[#92400E]">
          <AlertTriangle className="w-4 h-4 shrink-0 text-[#C9892B]" />
          <span>
            {language === 'bn'
              ? 'কমিউনিটির অধিক ডিসলাইকের কারণে পোস্টটি বর্তমানে পর্যালোচনার অধীনে রয়েছে।'
              : 'This post is currently under review due to community dislikes threshold.'}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="p-4 sm:p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('user-profile', { username: post.authorUsername })}
              className="relative shrink-0 hover:opacity-90"
            >
              <img
                src={post.authorAvatar}
                alt={post.authorName}
                className="w-11 h-11 rounded-full object-cover border border-[#DDE6E0]"
              />
              {post.authorTrusted && (
                <span
                  title={t.trustedContributor}
                  className="absolute -bottom-1 -right-1 bg-[#2B8A63] text-white rounded-full p-0.5"
                >
                  <ShieldCheck className="w-3 h-3" />
                </span>
              )}
            </button>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => navigateTo('user-profile', { username: post.authorUsername })}
                  className="font-bold text-[#24332B] hover:text-[#2B8A63] text-sm sm:text-base cursor-pointer"
                >
                  {post.authorName}
                </button>
                {post.authorTrusted && (
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-[#2B8A63] bg-[#E4F2EB] px-1.5 py-0.5 rounded-md">
                    <BadgeCheck className="w-3 h-3" />
                    <span>{t.trustedContributor}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-[#718078] mt-0.5 flex-wrap">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(post.createdAt)}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium text-[#24332B]">
                  <MapPin className="w-3 h-3 text-[#2B8A63]" />
                  {post.marketBn || post.market}, {post.upazilaBn || post.upazila}, {post.districtBn || post.district}
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#718078] hover:text-[#24332B] p-1.5 rounded-lg hover:bg-[#F3F6F4]"
              aria-label="Post Options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-8 bg-white border border-[#DDE6E0] rounded-xl shadow-lg p-1 w-44 z-20">
                <button
                  onClick={handleReport}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-[#D95E5E] hover:bg-[#FDE8E8] rounded-lg flex items-center gap-2 cursor-pointer"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{t.report}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Clean Typographic Metadata (Zero-Pill Discipline) */}
        <div className="mt-2.5 flex items-center gap-2 text-xs text-[#718078] flex-wrap">
          <span className="font-semibold text-[#24332B]">
            {post.postType === 'price_report'
              ? language === 'bn'
                ? 'মূল্য রিপোর্ট'
                : 'Price Report'
              : language === 'bn'
              ? 'বাজার পরিস্থিতি'
              : 'Market Situation'}
          </span>
          {post.priceType && (
            <>
              <span aria-hidden="true" className="text-[#DDE6E0] font-bold">·</span>
              <span className={post.priceType === 'wholesale' ? 'text-[#4B8FC8] font-medium' : 'text-[#C9892B] font-medium'}>
                {post.priceType === 'wholesale' ? t.wholesale : t.retail}
              </span>
            </>
          )}
          {post.isAdminVerified && (
            <>
              <span aria-hidden="true" className="text-[#DDE6E0] font-bold">·</span>
              <span className="text-[#2B8A63] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 inline" />
                <span>{t.verifiedBadge}</span>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Main Content & Price Box */}
      <div className="px-4 sm:px-5">
        {post.title && (
          <h4
            onClick={() => navigateTo('post-detail', { postId: post.id })}
            className="text-base sm:text-lg font-bold text-[#24332B] mb-2 hover:text-[#2B8A63] cursor-pointer"
          >
            {post.title}
          </h4>
        )}

        <p className="text-sm text-[#24332B] leading-relaxed mb-4 whitespace-pre-line">
          {post.description}
        </p>

        {/* Price Highlight Card if it is a price report */}
        {post.price !== undefined && (
          <div className="bg-[#F8FAF9] border border-[#DDE6E0] rounded-xl p-3.5 mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs text-[#718078] block">
                {post.productNameBn || post.productName} ({post.priceType === 'wholesale' ? t.wholesalePrice : t.retailPrice})
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-[#2B8A63]">
                  ৳ {post.price}
                </span>
                <span className="text-xs text-[#718078]">
                  / {post.unitBn || post.unit || 'কেজি'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {post.previousPrice && (
                <div className="text-right">
                  <span className="text-[11px] text-[#718078] block">পূর্বে ছিল</span>
                  <span className="text-xs text-[#718078] line-through">৳ {post.previousPrice}</span>
                </div>
              )}
              {post.priceStatus && <PriceStatusBadge status={post.priceStatus} />}
            </div>
          </div>
        )}
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div
          onClick={() => navigateTo('post-detail', { postId: post.id })}
          className="cursor-pointer bg-[#F3F6F4] relative max-h-96 overflow-hidden border-y border-[#DDE6E0]"
        >
          <img
            src={post.images[0]}
            alt={post.productName || 'Market photo'}
            className="w-full object-cover h-64 sm:h-80 hover:scale-101 transition-transform duration-300"
          />
        </div>
      )}

      {/* Counts Summary Bar */}
      <div className="px-4 sm:px-5 py-2.5 flex items-center justify-between text-xs text-[#718078] border-b border-[#DDE6E0]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-medium text-[#2B8A63]">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{post.likesCount}</span>
          </span>
          {post.dislikesCount > 0 && (
            <span className="flex items-center gap-1 text-[#D95E5E]">
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>{post.dislikesCount}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowComments(!showComments)}
            className="hover:underline cursor-pointer"
          >
            {postComments.length} {t.comment}
          </button>
          <span>•</span>
          <span>{post.savesCount || 0} {t.save}</span>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="px-2 sm:px-4 py-1.5 grid grid-cols-5 gap-1 text-xs sm:text-sm font-medium text-[#718078]">
        {/* Like */}
        <button
          onClick={handleLike}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl transition-colors cursor-pointer ${
            userReaction === 'like'
              ? 'text-[#2B8A63] bg-[#E4F2EB] font-bold'
              : 'hover:bg-[#F3F6F4] hover:text-[#24332B]'
          }`}
          title={t.like}
        >
          <ThumbsUp className={`w-4 h-4 ${userReaction === 'like' ? 'fill-current' : ''}`} />
          <span className="hidden sm:inline">{t.like}</span>
        </button>

        {/* Dislike */}
        <button
          onClick={handleDislike}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl transition-colors cursor-pointer ${
            userReaction === 'dislike'
              ? 'text-[#D95E5E] bg-[#FDE8E8] font-bold'
              : 'hover:bg-[#F3F6F4] hover:text-[#24332B]'
          }`}
          title={t.dislike}
        >
          <ThumbsDown className={`w-4 h-4 ${userReaction === 'dislike' ? 'fill-current' : ''}`} />
          <span className="hidden sm:inline">{t.dislike}</span>
        </button>

        {/* Comment Toggle */}
        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl transition-colors cursor-pointer ${
            showComments ? 'text-[#2B8A63] bg-[#F3F6F4]' : 'hover:bg-[#F3F6F4] hover:text-[#24332B]'
          }`}
          title={t.comment}
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">{t.comment}</span>
        </button>

        {/* Save */}
        <button
          onClick={handleSave}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl transition-colors cursor-pointer ${
            isSaved
              ? 'text-[#D8A04A] bg-[#FFF9ED] font-bold'
              : 'hover:bg-[#F3F6F4] hover:text-[#24332B]'
          }`}
          title={t.save}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-[#D8A04A]' : ''}`} />
          <span className="hidden sm:inline">{t.save}</span>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-[#F3F6F4] hover:text-[#24332B] transition-colors cursor-pointer"
          title={t.share}
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">{t.share}</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="bg-[#FAFBF9] border-t border-[#DDE6E0] p-4 sm:p-5 space-y-3 animate-in fade-in duration-200">
          {/* New Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <img
              src={
                currentUser?.avatar ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
              }
              alt="User"
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
            <div className="flex-1 relative">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={t.writeComment}
                className="w-full pl-3 pr-10 py-2 rounded-xl border border-[#DDE6E0] bg-white text-xs sm:text-sm text-[#24332B] focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#2B8A63] hover:text-[#1F7451] disabled:opacity-40 p-1"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Comments List */}
          {postComments.length === 0 ? (
            <p className="text-xs text-[#718078] text-center py-2">
              {language === 'bn' ? 'এখনো কোনো মন্তব্য নেই। প্রথম মন্তব্যটি আপনি করুন!' : 'No comments yet. Be the first to comment!'}
            </p>
          ) : (
            <div className="space-y-2.5 pt-2">
              {postComments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-2.5 text-xs">
                  <img
                    src={comment.authorAvatar}
                    alt={comment.authorName}
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div className="flex-1 bg-white p-2.5 rounded-xl border border-[#DDE6E0]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#24332B]">
                        {comment.authorName}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#718078]">
                          {formatDate(comment.createdAt)}
                        </span>
                        {currentUser && currentUser.id === comment.authorId && (
                          <button
                            onClick={() => deleteComment(comment.id)}
                            className="text-[#718078] hover:text-[#D95E5E]"
                            title="Delete comment"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-[#24332B] leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
};
