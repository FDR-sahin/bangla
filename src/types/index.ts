export type Language = 'bn' | 'en';

export type UserRole = 'main_admin' | 'user';

export type AccountStatus = 'active' | 'warning' | 'suspended' | 'blocked';

export type PostType = 'price_report' | 'market_post';

export type PriceType = 'retail' | 'wholesale';

export type PriceStatus = 'low' | 'average' | 'high' | 'unusual';

export type PostStatus = 'active' | 'under_review' | 'temporarily_hidden' | 'deleted';

export type ReportTargetType = 'post' | 'comment' | 'user';

export type ReportReason =
  | 'fake_price'
  | 'wrong_info'
  | 'spam'
  | 'abusive_comment'
  | 'inappropriate_image'
  | 'duplicate_post'
  | 'other';

export type ReportStatus = 'pending' | 'resolved' | 'rejected';

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: UserRole;
  avatar: string;
  district: string;
  upazila: string;
  bio?: string;
  trustScore: number; // 0 to 100
  isTrustedContributor?: boolean;
  accountStatus: AccountStatus;
  isBlocked: boolean;
  preferredLanguage: Language;
  createdAt: string;
  postsCount?: number;
  reportsCount?: number;
  likesReceived?: number;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  authorTrusted?: boolean;
  postType: PostType;
  title?: string;
  description: string;
  images: string[];
  productName?: string;
  productNameBn?: string;
  productSlug?: string;
  category?: string;
  categoryBn?: string;
  price?: number;
  previousPrice?: number;
  unit?: string;
  unitBn?: string;
  priceType?: PriceType;
  priceStatus?: PriceStatus;
  district: string;
  districtBn: string;
  upazila: string;
  upazilaBn: string;
  market: string;
  marketBn: string;
  postStatus: PostStatus;
  likesCount: number;
  dislikesCount: number;
  commentsCount: number;
  savesCount: number;
  reportsCount: number;
  isAdminVerified?: boolean;
  proofImage?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  content: string;
  status: 'active' | 'deleted' | 'hidden';
  createdAt: string;
}

export interface Reaction {
  id: string;
  userId: string;
  postId: string;
  type: 'like' | 'dislike';
  createdAt: string;
}

export interface SavedPost {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  targetType: ReportTargetType;
  targetId: string;
  targetSummary: string;
  reason: ReportReason;
  details?: string;
  status: ReportStatus;
  createdAt: string;
  resolutionNote?: string;
}

export interface NotificationItem {
  id: string;
  recipientId: string;
  type: 'like' | 'comment' | 'price_alert' | 'system' | 'warning' | 'verified';
  title: string;
  titleBn: string;
  message: string;
  messageBn: string;
  relatedPostId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface DistrictInfo {
  id: string;
  nameEn: string;
  nameBn: string;
  slug: string;
  division: string;
  divisionBn: string;
  totalMarkets: number;
  activeReportsCount: number;
  topMarkets: string[];
  topMarketsBn: string[];
  popularProducts: string[];
  popularProductsBn: string[];
}

export interface ProductInfo {
  id: string;
  nameEn: string;
  nameBn: string;
  slug: string;
  category: string;
  categoryBn: string;
  image: string;
  avgRetailPrice: number;
  avgWholesalePrice: number;
  unit: string;
  unitBn: string;
  changeWeeklyPct: number; // e.g. +4.2 or -3.1
  priceStatus: PriceStatus;
  descriptionEn: string;
  descriptionBn: string;
  seasonalStatus?: string;
}

export interface MarketPriceItem {
  id: string;
  productId: string;
  productName: string;
  productNameBn: string;
  category: string;
  categoryBn: string;
  district: string;
  districtBn: string;
  market: string;
  marketBn: string;
  wholesalePrice: number;
  retailPrice: number;
  unit: string;
  unitBn: string;
  previousPrice: number;
  changePct: number;
  priceStatus: PriceStatus;
  isCommunityReported: boolean;
  isAdminVerified: boolean;
  lastUpdated: string;
  trend7d: number[];
}

export interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleBn: string;
  excerptEn: string;
  excerptBn: string;
  contentEn: string;
  contentBn: string;
  category: string;
  categoryBn: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  readTime: string;
  date: string;
  coverImage: string;
  tags: string[];
}

export interface AuditLog {
  id: string;
  adminEmail: string;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
  createdAt: string;
}
