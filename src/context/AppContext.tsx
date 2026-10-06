import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  User,
  Post,
  Comment,
  Reaction,
  Report,
  NotificationItem,
  AuditLog,
  PostStatus,
  AccountStatus
} from '../types';
import {
  SEED_USERS,
  SEED_POSTS,
  SEED_COMMENTS,
  SEED_REPORTS,
  SEED_AUDIT_LOGS
} from '../data/seedData';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  
  // Navigation
  activePage: string;
  navigateTo: (page: string, params?: Record<string, string>) => void;
  pageParams: Record<string, string>;

  // User Auth
  currentUser: User | null;
  loginUser: (email: string, pass: string) => boolean;
  registerUser: (userData: { fullName: string; username: string; email: string; district: string; upazila: string }) => boolean;
  logoutUser: () => void;
  updateUserProfile: (data: Partial<User>) => void;

  // Admin Auth (Separate)
  currentAdmin: User | null;
  loginAdmin: (email: string, pass: string) => { success: boolean; message?: string };
  logoutAdmin: () => void;

  // Posts
  posts: Post[];
  createPost: (postData: Partial<Post>) => Post;
  updatePost: (id: string, postData: Partial<Post>) => void;
  deletePost: (id: string) => void;
  handleReaction: (postId: string, type: 'like' | 'dislike') => void;
  getUserReaction: (postId: string) => 'like' | 'dislike' | null;

  // Saved Posts
  savedPostIds: string[];
  toggleSavePost: (postId: string) => void;
  isPostSaved: (postId: string) => boolean;

  // Comments
  comments: Comment[];
  addComment: (postId: string, content: string) => void;
  deleteComment: (commentId: string) => void;

  // Reports
  reports: Report[];
  submitReport: (report: Omit<Report, 'id' | 'createdAt' | 'status'>) => void;
  resolveReport: (reportId: string, resolution: string) => void;
  rejectReport: (reportId: string) => void;

  // Admin Actions
  updateUserStatus: (userId: string, status: AccountStatus) => void;
  deleteUser: (userId: string) => void;
  updatePostStatus: (postId: string, status: PostStatus) => void;
  verifyPriceReport: (postId: string, verified: boolean) => void;
  auditLogs: AuditLog[];
  addAuditLog: (action: string, targetType: string, targetId: string, details: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Modals & Popups
  loginRequiredModal: boolean;
  setLoginRequiredModal: (open: boolean) => void;
  createPostModalOpen: boolean;
  openCreatePostModal: () => void;
  closeCreatePostModal: () => void;
  reportModalData: { open: boolean; targetType: 'post' | 'comment' | 'user'; targetId: string; targetSummary: string } | null;
  openReportModal: (targetType: 'post' | 'comment' | 'user', targetId: string, targetSummary: string) => void;
  closeReportModal: () => void;
  shareModalData: { open: boolean; title: string; url: string } | null;
  openShareModal: (title: string, url: string) => void;
  closeShareModal: () => void;

  // Toast
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('bb_language') as Language) || 'bn';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bb_language', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  // Navigation State
  const [activePage, setActivePage] = useState<string>('home');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  const navigateTo = (page: string, params: Record<string, string> = {}) => {
    setActivePage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // User Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bb_current_user');
    return saved ? JSON.parse(saved) : SEED_USERS[1]; // default logged in as Tanvir Ahmed for smooth testing
  });

  // Admin Auth State (Completely Isolated)
  const [currentAdmin, setCurrentAdmin] = useState<User | null>(() => {
    const saved = localStorage.getItem('bb_current_admin');
    return saved ? JSON.parse(saved) : null;
  });

  // Data Collections
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('bb_posts');
    return saved ? JSON.parse(saved) : SEED_POSTS;
  });

  const [reactions, setReactions] = useState<Reaction[]>(() => {
    const saved = localStorage.getItem('bb_reactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedPostIds, setSavedPostIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('bb_saved_posts');
    return saved ? JSON.parse(saved) : ['post_101', 'post_103'];
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem('bb_comments');
    return saved ? JSON.parse(saved) : SEED_COMMENTS;
  });

  const [reports, setReports] = useState<Report[]>(() => {
    const saved = localStorage.getItem('bb_reports');
    return saved ? JSON.parse(saved) : SEED_REPORTS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('bb_audit_logs');
    return saved ? JSON.parse(saved) : SEED_AUDIT_LOGS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif_1',
      recipientId: 'usr_tanvir',
      type: 'like',
      title: 'নতুন লাইক',
      titleBn: 'নতুন লাইক',
      message: 'নুসরাত জাহান আপনার টাঙ্গাইল নতুন বাজারের আলু সংক্রান্ত পোস্টে লাইক দিয়েছেন।',
      messageBn: 'নুসরাত জাহান আপনার টাঙ্গাইল নতুন বাজারের আলু সংক্রান্ত পোস্টে লাইক দিয়েছেন।',
      relatedPostId: 'post_101',
      isRead: false,
      createdAt: '2026-10-05T08:10:00Z'
    },
    {
      id: 'notif_2',
      recipientId: 'usr_tanvir',
      type: 'verified',
      title: 'মূল্য রিপোর্ট যাচাইকৃত',
      titleBn: 'মূল্য রিপোর্ট যাচাইকৃত',
      message: 'আপনার আলু মূল্য রিপোর্টটি বাজারবাংলা এডমিন টিম দ্বারা যাচাইকৃত ও অনুমোদিত হয়েছে।',
      messageBn: 'আপনার আলু মূল্য রিপোর্টটি বাজারবাংলা এডমিন টিম দ্বারা যাচাইকৃত ও অনুমোদিত হয়েছে।',
      relatedPostId: 'post_101',
      isRead: false,
      createdAt: '2026-10-05T08:05:00Z'
    }
  ]);

  // Modals & Toast State
  const [loginRequiredModal, setLoginRequiredModal] = useState<boolean>(false);
  const [createPostModalOpen, setCreatePostModalOpen] = useState<boolean>(false);
  const [reportModalData, setReportModalData] = useState<{ open: boolean; targetType: 'post' | 'comment' | 'user'; targetId: string; targetSummary: string } | null>(null);
  const [shareModalData, setShareModalData] = useState<{ open: boolean; title: string; url: string } | null>(null);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Local storage synchronization
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('bb_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('bb_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentAdmin) {
      localStorage.setItem('bb_current_admin', JSON.stringify(currentAdmin));
    } else {
      localStorage.removeItem('bb_current_admin');
    }
  }, [currentAdmin]);

  useEffect(() => {
    localStorage.setItem('bb_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('bb_reactions', JSON.stringify(reactions));
  }, [reactions]);

  useEffect(() => {
    localStorage.setItem('bb_saved_posts', JSON.stringify(savedPostIds));
  }, [savedPostIds]);

  useEffect(() => {
    localStorage.setItem('bb_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('bb_reports', JSON.stringify(reports));
  }, [reports]);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Normal User Login & Registration
  const loginUser = (email: string, _pass: string): boolean => {
    const matched = SEED_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      if (matched.isBlocked || matched.accountStatus === 'blocked') {
        showToast(language === 'bn' ? 'আপনার অ্যাকাউন্টটি স্থগিত রয়েছে।' : 'Your account is suspended.', 'error');
        return false;
      }
      setCurrentUser(matched);
      showToast(language === 'bn' ? `স্বাগতম, ${matched.fullName}!` : `Welcome back, ${matched.fullName}!`, 'success');
      return true;
    }
    // Create quick active session if email is new demo
    const newUser: User = {
      id: `usr_${Date.now()}`,
      fullName: email.split('@')[0],
      username: email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '_'),
      email,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      district: 'Dhaka',
      upazila: 'Dhanmondi',
      trustScore: 70,
      accountStatus: 'active',
      isBlocked: false,
      preferredLanguage: language,
      createdAt: new Date().toISOString(),
      postsCount: 0,
      reportsCount: 0,
      likesReceived: 0
    };
    setCurrentUser(newUser);
    showToast(language === 'bn' ? `স্বাগতম, ${newUser.fullName}!` : `Welcome, ${newUser.fullName}!`, 'success');
    return true;
  };

  const registerUser = (userData: { fullName: string; username: string; email: string; district: string; upazila: string }): boolean => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      fullName: userData.fullName,
      username: userData.username,
      email: userData.email,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      district: userData.district,
      upazila: userData.upazila,
      trustScore: 75,
      accountStatus: 'active',
      isBlocked: false,
      preferredLanguage: language,
      createdAt: new Date().toISOString(),
      postsCount: 0,
      reportsCount: 0,
      likesReceived: 0
    };
    setCurrentUser(newUser);
    showToast(language === 'bn' ? 'সফলভাবে নিবন্ধন সম্পন্ন হয়েছে!' : 'Registration successful!', 'success');
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast(language === 'bn' ? 'লগআউট সফল হয়েছে' : 'Logged out successfully', 'info');
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, ...data });
    showToast(language === 'bn' ? 'প্রোফাইল আপডেট হয়েছে' : 'Profile updated', 'success');
  };

  // Main Admin Auth
  const loginAdmin = (email: string, pass: string): { success: boolean; message?: string } => {
    // Only main_admin can access the separate admin panel
    if (email.trim().toLowerCase() === 'admin@bazarbangla.com' && pass === 'admin123') {
      const adminUser = SEED_USERS.find((u) => u.role === 'main_admin') || {
        id: 'usr_admin',
        fullName: 'Mohammad Farhan',
        username: 'farhan_admin',
        email: 'admin@bazarbangla.com',
        role: 'main_admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        district: 'Dhaka',
        upazila: 'Tejgaon',
        trustScore: 100,
        accountStatus: 'active',
        isBlocked: false,
        preferredLanguage: 'bn',
        createdAt: '2026-01-01T10:00:00Z'
      };
      setCurrentAdmin(adminUser as User);
      showToast(language === 'bn' ? 'প্রধান এডমিন প্যানেলে স্বাগতম' : 'Logged into Main Admin Panel', 'success');
      return { success: true };
    }
    return {
      success: false,
      message: language === 'bn' ? 'শুধুমাত্র মূল এডমিন একাউন্ট প্রবেশ করতে পারবে।' : 'Only Main Admin credentials are authorized for this panel.'
    };
  };

  const logoutAdmin = () => {
    setCurrentAdmin(null);
    showToast(language === 'bn' ? 'এডমিন লগআউট হয়েছে' : 'Admin logged out', 'info');
  };

  // Posts Operations
  const createPost = (postData: Partial<Post>): Post => {
    if (!currentUser) throw new Error('Authentication required');
    const newPost: Post = {
      id: `post_${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.fullName,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      authorTrusted: currentUser.isTrustedContributor || false,
      postType: postData.postType || 'price_report',
      title: postData.title || (postData.postType === 'price_report' ? `${postData.districtBn || postData.district} বাজারে ${postData.productNameBn || postData.productName}-এর দর` : ''),
      description: postData.description || '',
      images: postData.images && postData.images.length > 0 ? postData.images : ['https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&auto=format&fit=crop&q=80'],
      productName: postData.productName,
      productNameBn: postData.productNameBn,
      productSlug: postData.productSlug,
      category: postData.category,
      categoryBn: postData.categoryBn,
      price: postData.price,
      previousPrice: postData.previousPrice,
      unit: postData.unit || 'kg',
      unitBn: postData.unitBn || 'কেজি',
      priceType: postData.priceType || 'retail',
      priceStatus: postData.priceStatus || 'average',
      district: postData.district || currentUser.district,
      districtBn: postData.districtBn || 'ঢাকা',
      upazila: postData.upazila || currentUser.upazila,
      upazilaBn: postData.upazilaBn || 'সদর',
      market: postData.market || 'স্থানীয় বাজার',
      marketBn: postData.marketBn || 'স্থানীয় বাজার',
      postStatus: 'active',
      likesCount: 0,
      dislikesCount: 0,
      commentsCount: 0,
      savesCount: 0,
      reportsCount: 0,
      isAdminVerified: false,
      createdAt: new Date().toISOString()
    };

    setPosts([newPost, ...posts]);
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        postsCount: (currentUser.postsCount || 0) + 1,
        reportsCount: postData.postType === 'price_report' ? (currentUser.reportsCount || 0) + 1 : currentUser.reportsCount
      });
    }
    showToast(language === 'bn' ? 'পোস্টটি সফলভাবে প্রকাশিত হয়েছে!' : 'Post published successfully!', 'success');
    return newPost;
  };

  const updatePost = (id: string, postData: Partial<Post>) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...postData, updatedAt: new Date().toISOString() } : p)));
    showToast(language === 'bn' ? 'পোস্ট আপডেট হয়েছে' : 'Post updated', 'success');
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    showToast(language === 'bn' ? 'পোস্ট মুছে ফেলা হয়েছে' : 'Post deleted', 'info');
  };

  // Reactions: Like / Dislike (Single reaction per user logic)
  // Section 15 Rule: When a post gets 10 or more dislikes, change post status to under_review!
  const handleReaction = (postId: string, type: 'like' | 'dislike') => {
    if (!currentUser) {
      setLoginRequiredModal(true);
      return;
    }

    const existingIndex = reactions.findIndex((r) => r.userId === currentUser.id && r.postId === postId);
    const existing = existingIndex > -1 ? reactions[existingIndex] : null;

    let newReactions = [...reactions];
    let likeDiff = 0;
    let dislikeDiff = 0;

    if (existing) {
      if (existing.type === type) {
        // Toggle off
        newReactions.splice(existingIndex, 1);
        if (type === 'like') likeDiff = -1;
        else dislikeDiff = -1;
      } else {
        // Switch reaction
        newReactions[existingIndex] = { ...existing, type };
        if (type === 'like') {
          likeDiff = +1;
          dislikeDiff = -1;
        } else {
          likeDiff = -1;
          dislikeDiff = +1;
        }
      }
    } else {
      // New reaction
      newReactions.push({
        id: `react_${Date.now()}`,
        userId: currentUser.id,
        postId,
        type,
        createdAt: new Date().toISOString()
      });
      if (type === 'like') likeDiff = +1;
      else dislikeDiff = +1;
    }

    setReactions(newReactions);

    // Update post count and check Section 15 dislike threshold!
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const updatedLikes = Math.max(0, post.likesCount + likeDiff);
          const updatedDislikes = Math.max(0, post.dislikesCount + dislikeDiff);

          let newStatus = post.postStatus;
          // Rule: If 10 or more dislikes, auto trigger under_review
          if (updatedDislikes >= 10 && post.postStatus === 'active') {
            newStatus = 'under_review';
            addAuditLog(
              'AUTO_MODERATION',
              'post',
              post.id,
              `Post automatically flagged for admin review due to reaching ${updatedDislikes} community dislikes.`
            );
          }

          return {
            ...post,
            likesCount: updatedLikes,
            dislikesCount: updatedDislikes,
            postStatus: newStatus
          };
        }
        return post;
      })
    );
  };

  const getUserReaction = (postId: string): 'like' | 'dislike' | null => {
    if (!currentUser) return null;
    const match = reactions.find((r) => r.userId === currentUser.id && r.postId === postId);
    return match ? match.type : null;
  };

  // Saved Posts
  const toggleSavePost = (postId: string) => {
    if (!currentUser) {
      setLoginRequiredModal(true);
      return;
    }
    if (savedPostIds.includes(postId)) {
      setSavedPostIds((prev) => prev.filter((id) => id !== postId));
      setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, savesCount: Math.max(0, p.savesCount - 1) } : p)));
      showToast(language === 'bn' ? 'সংরক্ষিত তালিকা থেকে সরানো হয়েছে' : 'Removed from saved posts', 'info');
    } else {
      setSavedPostIds((prev) => [...prev, postId]);
      setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, savesCount: p.savesCount + 1 } : p)));
      showToast(language === 'bn' ? 'পোস্টটি সংরক্ষিত হয়েছে' : 'Post saved', 'success');
    }
  };

  const isPostSaved = (postId: string): boolean => {
    return savedPostIds.includes(postId);
  };

  // Comments
  const addComment = (postId: string, content: string) => {
    if (!currentUser) {
      setLoginRequiredModal(true);
      return;
    }
    const newComment: Comment = {
      id: `cmt_${Date.now()}`,
      postId,
      authorId: currentUser.id,
      authorName: currentUser.fullName,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      content,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    setComments((prev) => [newComment, ...prev]);
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p)));
    showToast(language === 'bn' ? 'আপনার মন্তব্য যুক্ত হয়েছে' : 'Comment added', 'success');
  };

  const deleteComment = (commentId: string) => {
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return;
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    setPosts((prev) => prev.map((p) => (p.id === comment.postId ? { ...p, commentsCount: Math.max(0, p.commentsCount - 1) } : p)));
    showToast(language === 'bn' ? 'মন্তব্য মুছে ফেলা হয়েছে' : 'Comment deleted', 'info');
  };

  // Reports
  const submitReport = (reportData: Omit<Report, 'id' | 'createdAt' | 'status'>) => {
    if (!currentUser) {
      setLoginRequiredModal(true);
      return;
    }
    const newReport: Report = {
      ...reportData,
      id: `rep_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setReports((prev) => [newReport, ...prev]);

    if (reportData.targetType === 'post') {
      setPosts((prev) => prev.map((p) => (p.id === reportData.targetId ? { ...p, reportsCount: (p.reportsCount || 0) + 1 } : p)));
    }

    addAuditLog('REPORT_FILED', reportData.targetType, reportData.targetId, `Report filed by ${reportData.reporterName}: ${reportData.reason}`);
    showToast(language === 'bn' ? 'রিপোর্টটি জমা নেওয়া হয়েছে। এডমিন পর্যবেক্ষণ করবেন।' : 'Report submitted for admin review.', 'success');
  };

  const resolveReport = (reportId: string, resolution: string) => {
    setReports((prev) => prev.map((r) => (r.id === reportId ? { ...r, status: 'resolved', resolutionNote: resolution } : r)));
    addAuditLog('REPORT_RESOLVED', 'report', reportId, `Report resolved: ${resolution}`);
    showToast(language === 'bn' ? 'রিপোর্ট সমাধান করা হয়েছে' : 'Report resolved', 'success');
  };

  const rejectReport = (reportId: string) => {
    setReports((prev) => prev.map((r) => (r.id === reportId ? { ...r, status: 'rejected' } : r)));
    addAuditLog('REPORT_REJECTED', 'report', reportId, 'Report dismissed as invalid.');
    showToast(language === 'bn' ? 'রিপোর্ট বাতিল করা হয়েছে' : 'Report rejected', 'info');
  };

  // Admin Actions
  const updateUserStatus = (userId: string, status: AccountStatus) => {
    addAuditLog('USER_STATUS_CHANGE', 'user', userId, `Status changed to ${status}`);
    showToast(`User status updated to ${status}`, 'success');
  };

  const deleteUser = (userId: string) => {
    addAuditLog('USER_DELETED', 'user', userId, 'User account removed by main admin.');
    showToast('User account deleted', 'info');
  };

  const updatePostStatus = (postId: string, status: PostStatus) => {
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, postStatus: status } : p)));
    addAuditLog('POST_STATUS_CHANGE', 'post', postId, `Post marked as ${status}`);
    showToast(`Post status updated to ${status}`, 'success');
  };

  const verifyPriceReport = (postId: string, verified: boolean) => {
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, isAdminVerified: verified } : p)));
    addAuditLog('PRICE_VERIFY', 'post', postId, verified ? 'Marked as Admin Verified' : 'Verification removed');
    showToast(verified ? 'Marked as Admin Verified' : 'Verification removed', 'success');
  };

  const addAuditLog = (action: string, targetType: string, targetId: string, details: string) => {
    const newLog: AuditLog = {
      id: `aud_${Date.now()}`,
      adminEmail: currentAdmin ? currentAdmin.email : 'system',
      action,
      targetType,
      targetId,
      details,
      createdAt: new Date().toISOString()
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast(language === 'bn' ? 'সকল নোটিফিকেশন পড়া হিসেবে চিহ্নিত হয়েছে' : 'All notifications marked as read', 'info');
  };

  const openCreatePostModal = () => {
    if (!currentUser) {
      setLoginRequiredModal(true);
      return;
    }
    setCreatePostModalOpen(true);
  };

  const closeCreatePostModal = () => {
    setCreatePostModalOpen(false);
  };

  // Modals
  const openReportModal = (targetType: 'post' | 'comment' | 'user', targetId: string, targetSummary: string) => {
    if (!currentUser) {
      setLoginRequiredModal(true);
      return;
    }
    setReportModalData({ open: true, targetType, targetId, targetSummary });
  };

  const closeReportModal = () => {
    setReportModalData(null);
  };

  const openShareModal = (title: string, url: string) => {
    setShareModalData({ open: true, title, url });
  };

  const closeShareModal = () => {
    setShareModalData(null);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        activePage,
        navigateTo,
        pageParams,
        currentUser,
        loginUser,
        registerUser,
        logoutUser,
        updateUserProfile,
        currentAdmin,
        loginAdmin,
        logoutAdmin,
        posts,
        createPost,
        updatePost,
        deletePost,
        handleReaction,
        getUserReaction,
        savedPostIds,
        toggleSavePost,
        isPostSaved,
        comments,
        addComment,
        deleteComment,
        reports,
        submitReport,
        resolveReport,
        rejectReport,
        updateUserStatus,
        deleteUser,
        updatePostStatus,
        verifyPriceReport,
        auditLogs,
        addAuditLog,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        loginRequiredModal,
        setLoginRequiredModal,
        createPostModalOpen,
        openCreatePostModal,
        closeCreatePostModal,
        reportModalData,
        openReportModal,
        closeReportModal,
        shareModalData,
        openShareModal,
        closeShareModal,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
