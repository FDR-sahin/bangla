import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  FileText,
  TrendingUp,
  MessageSquare,
  AlertTriangle,
  BarChart3,
  Settings,
  LogOut,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  Lock,
  ArrowLeft,
  Search,
  Filter,
  Check,
  Ban,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SEED_USERS } from '../../data/seedData';
import { AccountStatus, PostStatus } from '../../types';

export const AdminPortal: React.FC = () => {
  const {
    currentAdmin,
    loginAdmin,
    logoutAdmin,
    navigateTo,
    posts,
    updatePostStatus,
    verifyPriceReport,
    deletePost,
    reports,
    resolveReport,
    rejectReport,
    comments,
    deleteComment,
    auditLogs,
    showToast
  } = useApp();

  // Admin login form states
  const [adminEmail, setAdminEmail] = useState('admin@bazarbangla.com');
  const [adminPass, setAdminPass] = useState('admin123');
  const [adminLoginError, setAdminLoginError] = useState('');

  // Active Admin Sub-Tab
  const [adminTab, setAdminTab] = useState<
    'dashboard' | 'users' | 'posts' | 'price-reports' | 'comments' | 'reports' | 'analytics' | 'settings'
  >('dashboard');

  // Filters for Admin sections
  const [userStatusFilter, setUserStatusFilter] = useState<string>('all');
  const [postStatusFilter, setPostStatusFilter] = useState<string>('all');
  const [reportStatusFilter, setReportStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock list of users from SEED_USERS
  const [allUsers, setAllUsers] = useState(SEED_USERS);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError('');
    const result = loginAdmin(adminEmail, adminPass);
    if (!result.success) {
      setAdminLoginError(result.message || 'Invalid admin credentials');
    }
  };

  // If Main Admin is not logged in: show the dedicated Main Admin Login screen
  if (!currentAdmin) {
    return (
      <div className="min-h-screen bg-[#1E2922] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#24332B] rounded-3xl p-8 border border-[#3A4D43] shadow-2xl text-white space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#2B8A63] text-white flex items-center justify-center font-black text-2xl mx-auto mb-2 shadow-md">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">BAZARBANGLA</h1>
            <p className="text-xs text-[#A0B0A8]">Main Admin Control Panel (Secure Access)</p>
          </div>

          <div className="p-3 rounded-xl bg-[#2B8A63]/20 border border-[#2B8A63]/40 text-xs text-[#E4F2EB]">
            <strong>Authorized Personnel Only:</strong> Regular public users cannot log into this system.
          </div>

          {adminLoginError && (
            <div className="p-3 rounded-xl bg-[#D95E5E]/20 border border-[#D95E5E]/50 text-xs text-[#FFC4C4]">
              {adminLoginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#A0B0A8] mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#3A4D43] bg-[#1E2922] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0B0A8] mb-1">Password</label>
              <input
                type="password"
                required
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#3A4D43] bg-[#1E2922] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#2B8A63]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#2B8A63] hover:bg-[#1F7451] text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              Sign In to Admin Portal
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => navigateTo('home')}
              className="text-xs text-[#A0B0A8] hover:text-white flex items-center gap-1.5 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public BazarBangla Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Action helpers for Admin
  const handleUserStatus = (userId: string, newStatus: AccountStatus) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, accountStatus: newStatus, isBlocked: newStatus === 'blocked' } : u))
    );
    showToast(`User status updated to ${newStatus}`, 'success');
  };

  const pendingReportsCount = reports.filter((r) => r.status === 'pending').length;
  const underReviewPostsCount = posts.filter((p) => p.postStatus === 'under_review').length;

  return (
    <div className="min-h-screen bg-[#F3F6F4] text-[#24332B] flex flex-col">
      
      {/* Top Admin Header Bar */}
      <header className="bg-[#24332B] text-white border-b border-[#3A4D43] sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#2B8A63] flex items-center justify-center font-bold text-sm">
            বা
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight flex items-center gap-2">
              BazarBangla Admin
              <span className="px-2 py-0.5 rounded-full bg-[#D8A04A] text-[10px] text-black font-black uppercase">
                Main Admin
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateTo('home')}
            className="text-xs text-[#A0B0A8] hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={logoutAdmin}
            className="px-3 py-1.5 rounded-lg bg-[#D95E5E]/20 text-[#FFC4C4] hover:bg-[#D95E5E]/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace Grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Admin Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-1">
          <div className="bg-white rounded-2xl p-2 border border-[#DDE6E0] shadow-2xs space-y-1">
            <button
              onClick={() => setAdminTab('dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                adminTab === 'dashboard' ? 'bg-[#2B8A63] text-white' : 'text-[#718078] hover:bg-[#F3F6F4]'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </div>
            </button>

            <button
              onClick={() => setAdminTab('users')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                adminTab === 'users' ? 'bg-[#2B8A63] text-white' : 'text-[#718078] hover:bg-[#F3F6F4]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Users Management</span>
              </div>
              <span className="text-[10px] bg-black/10 px-1.5 py-0.2 rounded-md">{allUsers.length}</span>
            </button>

            <button
              onClick={() => setAdminTab('posts')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                adminTab === 'posts' ? 'bg-[#2B8A63] text-white' : 'text-[#718078] hover:bg-[#F3F6F4]'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Post Moderation</span>
              </div>
              {underReviewPostsCount > 0 && (
                <span className="text-[10px] bg-[#D95E5E] text-white px-1.5 py-0.2 rounded-md font-bold">
                  {underReviewPostsCount} Review
                </span>
              )}
            </button>

            <button
              onClick={() => setAdminTab('price-reports')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                adminTab === 'price-reports' ? 'bg-[#2B8A63] text-white' : 'text-[#718078] hover:bg-[#F3F6F4]'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Price Verification</span>
              </div>
            </button>

            <button
              onClick={() => setAdminTab('reports')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                adminTab === 'reports' ? 'bg-[#2B8A63] text-white' : 'text-[#718078] hover:bg-[#F3F6F4]'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>User Reports</span>
              </div>
              {pendingReportsCount > 0 && (
                <span className="text-[10px] bg-[#C9892B] text-white px-1.5 py-0.2 rounded-md font-bold">
                  {pendingReportsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setAdminTab('comments')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                adminTab === 'comments' ? 'bg-[#2B8A63] text-white' : 'text-[#718078] hover:bg-[#F3F6F4]'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>Comments</span>
              </div>
            </button>

            <button
              onClick={() => setAdminTab('analytics')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                adminTab === 'analytics' ? 'bg-[#2B8A63] text-white' : 'text-[#718078] hover:bg-[#F3F6F4]'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </div>
            </button>

            <button
              onClick={() => setAdminTab('settings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                adminTab === 'settings' ? 'bg-[#2B8A63] text-white' : 'text-[#718078] hover:bg-[#F3F6F4]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>Audit Logs & Settings</span>
              </div>
            </button>
          </div>
        </aside>

        {/* Admin Content Area */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB: DASHBOARD OVERVIEW */}
          {adminTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#DDE6E0] shadow-2xs">
                  <span className="text-xs text-[#718078] block">Total Registered Users</span>
                  <span className="text-2xl font-black text-[#24332B] mt-1 block">{allUsers.length}</span>
                  <span className="text-[10px] text-[#2B8A63]">Across 64 Districts</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#DDE6E0] shadow-2xs">
                  <span className="text-xs text-[#718078] block">Total Posts</span>
                  <span className="text-2xl font-black text-[#24332B] mt-1 block">{posts.length}</span>
                  <span className="text-[10px] text-[#2B8A63]">Price reports & updates</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#DDE6E0] shadow-2xs">
                  <span className="text-xs text-[#718078] block">Posts Under Review (10+ Dislikes)</span>
                  <span className="text-2xl font-black text-[#D95E5E] mt-1 block">{underReviewPostsCount}</span>
                  <span className="text-[10px] text-[#D95E5E]">Action required</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#DDE6E0] shadow-2xs">
                  <span className="text-xs text-[#718078] block">Pending User Reports</span>
                  <span className="text-2xl font-black text-[#C9892B] mt-1 block">{pendingReportsCount}</span>
                  <span className="text-[10px] text-[#718078]">Spam / Fake prices</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#DDE6E0] shadow-2xs">
                  <span className="text-xs text-[#718078] block">Admin Verified Reports</span>
                  <span className="text-2xl font-black text-[#2B8A63] mt-1 block">
                    {posts.filter((p) => p.isAdminVerified).length}
                  </span>
                  <span className="text-[10px] text-[#2B8A63]">Certified authentic</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#DDE6E0] shadow-2xs">
                  <span className="text-xs text-[#718078] block">Total Comments</span>
                  <span className="text-2xl font-black text-[#24332B] mt-1 block">{comments.length}</span>
                  <span className="text-[10px] text-[#718078]">Community dialogue</span>
                </div>
              </div>

              {/* Moderation Alert Box: Under Review Posts (Section 15 logic) */}
              {underReviewPostsCount > 0 && (
                <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-[#92400E]">
                    <ShieldAlert className="w-5 h-5 text-[#C9892B]" />
                    <h3 className="font-bold text-sm">Notice: Posts with 10+ Dislikes Requiring Main Admin Review</h3>
                  </div>
                  <p className="text-xs text-[#92400E] leading-relaxed">
                    According to platform policy, posts receiving 10+ community dislikes are automatically flagged into 'under_review' to protect public trust. The user is not auto-banned; please review the reported item below.
                  </p>
                  <button
                    onClick={() => {
                      setPostStatusFilter('under_review');
                      setAdminTab('posts');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#C9892B] text-white text-xs font-bold hover:bg-[#b07421]"
                  >
                    Open Review Queue ({underReviewPostsCount})
                  </button>
                </div>
              )}

              {/* Recent Audit Activity */}
              <div className="bg-white rounded-3xl p-6 border border-[#DDE6E0] shadow-xs space-y-3">
                <h3 className="font-bold text-sm text-[#24332B]">Latest Admin Audit Logs</h3>
                <div className="divide-y divide-[#DDE6E0] text-xs">
                  {auditLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="py-2.5 flex justify-between items-start gap-4">
                      <div>
                        <span className="font-bold text-[#2B8A63]">{log.action}</span>
                        <p className="text-[#718078] mt-0.5">{log.details}</p>
                      </div>
                      <span className="text-[10px] text-[#718078] shrink-0">{log.createdAt}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB: USERS MANAGEMENT */}
          {adminTab === 'users' && (
            <div className="bg-white rounded-3xl p-6 border border-[#DDE6E0] shadow-xs space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h2 className="text-xl font-bold text-[#24332B]">Platform Users Management</h2>
                <div className="flex gap-2">
                  <select
                    value={userStatusFilter}
                    onChange={(e) => setUserStatusFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-[#DDE6E0] text-xs"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="warning">Warning</option>
                    <option value="suspended">Suspended</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAFBF9] border-b border-[#DDE6E0] text-[11px] font-bold text-[#718078] uppercase">
                    <tr>
                      <th className="py-3 px-3">User</th>
                      <th className="py-3 px-3">District</th>
                      <th className="py-3 px-3">Role</th>
                      <th className="py-3 px-3">Trust Score</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DDE6E0]">
                    {allUsers
                      .filter((u) => userStatusFilter === 'all' || u.accountStatus === userStatusFilter)
                      .map((u) => (
                        <tr key={u.id} className="hover:bg-[#F8FAF9]">
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <img src={u.avatar} alt={u.fullName} className="w-8 h-8 rounded-full object-cover" />
                              <div>
                                <span className="font-bold text-[#24332B] block">{u.fullName}</span>
                                <span className="text-[10px] text-[#718078]">@{u.username}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3">{u.district}</td>
                          <td className="py-3 px-3 font-semibold">{u.role}</td>
                          <td className="py-3 px-3 font-bold text-[#2B8A63]">{u.trustScore}%</td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                                u.accountStatus === 'active'
                                  ? 'bg-[#E4F2EB] text-[#1F7451]'
                                  : u.accountStatus === 'warning'
                                  ? 'bg-[#FFFBEB] text-[#C9892B]'
                                  : 'bg-[#FDE8E8] text-[#D95E5E]'
                              }`}
                            >
                              {u.accountStatus}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            {u.role !== 'main_admin' ? (
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => handleUserStatus(u.id, 'active')}
                                  title="Activate"
                                  className="px-2 py-1 rounded bg-[#E4F2EB] text-[#1F7451] font-semibold text-[10px]"
                                >
                                  Activate
                                </button>
                                <button
                                  onClick={() => handleUserStatus(u.id, 'warning')}
                                  title="Send Warning"
                                  className="px-2 py-1 rounded bg-[#FFFBEB] text-[#C9892B] font-semibold text-[10px]"
                                >
                                  Warn
                                </button>
                                <button
                                  onClick={() => handleUserStatus(u.id, 'blocked')}
                                  title="Block User"
                                  className="px-2 py-1 rounded bg-[#FDE8E8] text-[#D95E5E] font-semibold text-[10px]"
                                >
                                  Block
                                </button>
                              </div>
                            ) : (
                              <span className="text-[10px] text-[#718078]">Root Admin</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: POST MODERATION */}
          {adminTab === 'posts' && (
            <div className="bg-white rounded-3xl p-6 border border-[#DDE6E0] shadow-xs space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h2 className="text-xl font-bold text-[#24332B]">Post Moderation Queue</h2>
                <div className="flex gap-2">
                  <select
                    value={postStatusFilter}
                    onChange={(e) => setPostStatusFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-[#DDE6E0] text-xs font-semibold"
                  >
                    <option value="all">All Post Statuses</option>
                    <option value="under_review">⚠️ Under Review (High Dislikes)</option>
                    <option value="active">Active</option>
                    <option value="temporarily_hidden">Temporarily Hidden</option>
                    <option value="deleted">Deleted</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {posts
                  .filter((p) => postStatusFilter === 'all' || p.postStatus === postStatusFilter)
                  .map((post) => (
                    <div
                      key={post.id}
                      className={`p-4 rounded-2xl border transition-colors ${
                        post.postStatus === 'under_review'
                          ? 'border-[#FDE68A] bg-[#FFFBEB]'
                          : 'border-[#DDE6E0] bg-[#FAFBF9]'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm text-[#24332B]">{post.authorName}</span>
                            <span className="text-[11px] text-[#718078]">(@{post.authorUsername})</span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                post.postStatus === 'under_review'
                                  ? 'bg-[#D95E5E] text-white'
                                  : post.postStatus === 'active'
                                  ? 'bg-[#E4F2EB] text-[#1F7451]'
                                  : 'bg-gray-200 text-gray-700'
                              }`}
                            >
                              {post.postStatus}
                            </span>
                          </div>

                          <h4 className="font-bold text-xs sm:text-sm text-[#24332B] mb-1">{post.title}</h4>
                          <p className="text-xs text-[#718078] line-clamp-2">{post.description}</p>
                          
                          <div className="flex items-center gap-3 text-[11px] text-[#718078] mt-2">
                            <span>{post.district}, {post.market}</span>
                            <span>•</span>
                            <span className="text-[#2B8A63] font-bold">Likes: {post.likesCount}</span>
                            <span>•</span>
                            <span className="text-[#D95E5E] font-bold">Dislikes: {post.dislikesCount}</span>
                            {post.price && (
                              <>
                                <span>•</span>
                                <span className="font-bold text-[#24332B]">Price: ৳ {post.price}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Moderation Controls */}
                        <div className="flex flex-col gap-1.5 shrink-0">
                          {post.postStatus !== 'active' && (
                            <button
                              onClick={() => updatePostStatus(post.id, 'active')}
                              className="px-3 py-1 rounded-lg bg-[#2B8A63] text-white text-xs font-bold hover:bg-[#1F7451]"
                            >
                              Approve / Restore
                            </button>
                          )}
                          {post.postStatus !== 'temporarily_hidden' && (
                            <button
                              onClick={() => updatePostStatus(post.id, 'temporarily_hidden')}
                              className="px-3 py-1 rounded-lg bg-[#C9892B] text-white text-xs font-bold hover:bg-[#a8701e]"
                            >
                              Hide Post
                            </button>
                          )}
                          <button
                            onClick={() => deletePost(post.id)}
                            className="px-3 py-1 rounded-lg bg-[#D95E5E] text-white text-xs font-bold hover:bg-[#b54545]"
                          >
                            Delete Post
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB: PRICE REPORTS VERIFICATION */}
          {adminTab === 'price-reports' && (
            <div className="bg-white rounded-3xl p-6 border border-[#DDE6E0] shadow-xs space-y-4 animate-in fade-in duration-150">
              <h2 className="text-xl font-bold text-[#24332B]">Price Reports Verification</h2>
              <div className="space-y-3">
                {posts
                  .filter((p) => p.postType === 'price_report')
                  .map((post) => (
                    <div key={post.id} className="p-4 rounded-2xl bg-[#FAFBF9] border border-[#DDE6E0] flex justify-between items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm text-[#24332B]">{post.productNameBn || post.productName}</span>
                          <span className="text-xs font-black text-[#2B8A63]">৳ {post.price} / {post.unit}</span>
                          <span className="text-[11px] text-[#718078]">({post.priceType})</span>
                        </div>
                        <p className="text-xs text-[#718078]">{post.market}, {post.district} • Posted by {post.authorName}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => verifyPriceReport(post.id, !post.isAdminVerified)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                            post.isAdminVerified
                              ? 'bg-[#E4F2EB] text-[#1F7451] border border-[#C2E3D2]'
                              : 'bg-white border border-[#DDE6E0] text-[#718078] hover:border-[#2B8A63]'
                          }`}
                        >
                          {post.isAdminVerified ? '✓ Admin Verified' : 'Mark Verified'}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB: USER REPORTS */}
          {adminTab === 'reports' && (
            <div className="bg-white rounded-3xl p-6 border border-[#DDE6E0] shadow-xs space-y-4 animate-in fade-in duration-150">
              <h2 className="text-xl font-bold text-[#24332B]">User Submissions & Community Reports</h2>
              {reports.length === 0 ? (
                <p className="text-xs text-[#718078] py-8 text-center">No reports pending.</p>
              ) : (
                <div className="space-y-3">
                  {reports.map((rep) => (
                    <div key={rep.id} className="p-4 rounded-2xl bg-[#FAFBF9] border border-[#DDE6E0] space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-bold text-[#D95E5E] block">Reason: {rep.reason}</span>
                          <span className="text-xs font-semibold text-[#24332B]">{rep.targetSummary}</span>
                          <p className="text-xs text-[#718078] mt-1">{rep.details}</p>
                          <span className="text-[10px] text-[#718078] mt-1 block">Reporter: {rep.reporterName}</span>
                        </div>

                        <div className="flex gap-2">
                          {rep.status === 'pending' ? (
                            <>
                              <button
                                onClick={() => resolveReport(rep.id, 'Action taken by admin')}
                                className="px-3 py-1 rounded-lg bg-[#2B8A63] text-white text-xs font-bold"
                              >
                                Resolve
                              </button>
                              <button
                                onClick={() => rejectReport(rep.id)}
                                className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 text-xs font-bold"
                              >
                                Dismiss
                              </button>
                            </>
                          ) : (
                            <span className="text-xs font-bold text-[#718078] capitalize">{rep.status}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: COMMENTS */}
          {adminTab === 'comments' && (
            <div className="bg-white rounded-3xl p-6 border border-[#DDE6E0] shadow-xs space-y-4 animate-in fade-in duration-150">
              <h2 className="text-xl font-bold text-[#24332B]">Manage Community Comments</h2>
              <div className="divide-y divide-[#DDE6E0]">
                {comments.map((c) => (
                  <div key={c.id} className="py-3 flex justify-between items-start gap-4">
                    <div>
                      <span className="text-xs font-bold text-[#24332B] block">{c.authorName}</span>
                      <p className="text-xs text-[#718078] mt-0.5">{c.content}</p>
                    </div>
                    <button
                      onClick={() => deleteComment(c.id)}
                      className="px-2.5 py-1 rounded-lg bg-[#FDE8E8] text-[#D95E5E] text-xs font-semibold hover:bg-[#fad4d4]"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ANALYTICS */}
          {adminTab === 'analytics' && (
            <div className="bg-white rounded-3xl p-6 border border-[#DDE6E0] shadow-xs space-y-4 animate-in fade-in duration-150">
              <h2 className="text-xl font-bold text-[#24332B]">Platform Internal Analytics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#F8FAF9] rounded-2xl border border-[#DDE6E0]">
                  <span className="text-xs text-[#718078]">Total User Trust Average</span>
                  <span className="text-2xl font-black text-[#2B8A63] block mt-1">87.4%</span>
                </div>
                <div className="p-4 bg-[#F8FAF9] rounded-2xl border border-[#DDE6E0]">
                  <span className="text-xs text-[#718078]">Auto-Moderation Accuracy</span>
                  <span className="text-2xl font-black text-[#2B8A63] block mt-1">98.2%</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB: AUDIT LOGS & SETTINGS */}
          {adminTab === 'settings' && (
            <div className="bg-white rounded-3xl p-6 border border-[#DDE6E0] shadow-xs space-y-6 animate-in fade-in duration-150">
              <h2 className="text-xl font-bold text-[#24332B]">System Audit Logs & Settings</h2>
              
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[#718078] uppercase">Audit Trail</h3>
                <div className="max-h-80 overflow-y-auto divide-y divide-[#DDE6E0] text-xs">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="py-2 flex justify-between">
                      <div>
                        <span className="font-bold text-[#24332B]">{log.action}</span>
                        <span className="text-[#718078] block">{log.details}</span>
                      </div>
                      <span className="text-[10px] text-[#718078]">{log.createdAt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
