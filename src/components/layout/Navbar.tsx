import React, { useState } from 'react';
import {
  Search,
  Bell,
  User as UserIcon,
  LogOut,
  PlusCircle,
  Menu,
  X,
  Languages,
  Bookmark,
  FileText,
  Settings,
  LayoutDashboard,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';

export const Navbar: React.FC = () => {
  const {
    language,
    toggleLanguage,
    currentUser,
    logoutUser,
    activePage,
    navigateTo,
    notifications,
    markNotificationRead,
    openCreatePostModal
  } = useApp();

  const t = translations[language];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('explore', { q: searchQuery.trim() });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'home', label: t.navHome },
    { id: 'explore', label: t.navExplore },
    { id: 'market-prices', label: t.navMarketPrices },
    { id: 'analysis', label: t.navAnalysis },
    { id: 'products', label: t.navProducts },
    { id: 'districts', label: t.navDistricts },
    { id: 'blog', label: t.navBlog, isNew: true }, // Explicit user requirement: "navber a blog option rakhte hobe"
    { id: 'about', label: t.navAbout }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DDE6E0] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
          
          {/* Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#2B8A63] text-white flex items-center justify-center font-black text-xl shadow-xs group-hover:bg-[#1F7451] transition-colors">
                বা
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl text-[#24332B] tracking-tight flex items-center gap-1.5 leading-none">
                  {t.brandName}
                  <span className="w-2 h-2 rounded-full bg-[#2B8A63] inline-block"></span>
                </span>
                <span className="text-[10px] sm:text-xs text-[#718078] font-medium leading-tight line-clamp-1 mt-0.5">
                  {language === 'bn' ? 'বাংলাদেশের পণ্য ও বাজারদর' : 'Bangladesh Market Intelligence'}
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors relative cursor-pointer ${
                    activePage === link.id
                      ? 'text-[#2B8A63] bg-[#E4F2EB]'
                      : 'text-[#24332B] hover:text-[#2B8A63] hover:bg-[#F3F6F4]'
                  }`}
                >
                  {link.label}
                  {link.id === 'blog' && (
                    <span className="absolute -top-1 -right-1 px-1 py-0.2 bg-[#D8A04A] text-white text-[9px] font-bold rounded-full">
                      HOT
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Center Search Bar (Medium & Up) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-xs xl:max-w-sm relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#DDE6E0] bg-[#F8FAF9] text-xs sm:text-sm text-[#24332B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2B8A63] transition-all"
            />
            <Search className="w-4 h-4 text-[#718078] absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg border border-[#DDE6E0] bg-[#F8FAF9] text-xs font-bold text-[#24332B] hover:bg-[#E4F2EB] hover:text-[#2B8A63] transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Change Language"
            >
              <Languages className="w-3.5 h-3.5 text-[#2B8A63]" />
              <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            {/* If Logged In */}
            {currentUser ? (
              <>
                {/* Create Post Quick Button */}
                <button
                  onClick={openCreatePostModal}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2B8A63] hover:bg-[#1F7451] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{t.createPost}</span>
                </button>

                {/* Notifications Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setNotifDropdownOpen(!notifDropdownOpen);
                      setProfileDropdownOpen(false);
                    }}
                    className="p-2 rounded-xl text-[#718078] hover:text-[#24332B] hover:bg-[#F3F6F4] relative transition-colors cursor-pointer"
                    title={t.notifications}
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D95E5E]" />
                    )}
                  </button>

                  {notifDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-[#DDE6E0] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-4 py-2 border-b border-[#DDE6E0] flex items-center justify-between">
                        <span className="font-bold text-sm text-[#24332B]">{t.notifications}</span>
                        {unreadCount > 0 && (
                          <span className="text-[11px] bg-[#E4F2EB] text-[#2B8A63] font-semibold px-2 py-0.5 rounded-full">
                            {unreadCount} নতুন
                          </span>
                        )}
                      </div>
                      <div className="max-h-64 overflow-y-auto divide-y divide-[#DDE6E0]">
                        {notifications.length === 0 ? (
                          <p className="p-4 text-xs text-[#718078] text-center">কোনো নোটিফিকেশন নেই</p>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              onClick={() => {
                                markNotificationRead(n.id);
                                if (n.relatedPostId) {
                                  navigateTo('post-detail', { postId: n.relatedPostId });
                                }
                                setNotifDropdownOpen(false);
                              }}
                              className={`p-3 text-xs hover:bg-[#F8FAF9] cursor-pointer ${
                                !n.isRead ? 'bg-[#F3F6F4]' : ''
                              }`}
                            >
                              <p className="font-bold text-[#24332B] mb-0.5">{language === 'bn' ? n.titleBn : n.title}</p>
                              <p className="text-[#718078] leading-tight">{language === 'bn' ? n.messageBn : n.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(!profileDropdownOpen);
                      setNotifDropdownOpen(false);
                    }}
                    className="flex items-center gap-1.5 p-1 rounded-full border border-[#DDE6E0] hover:border-[#2B8A63] transition-colors cursor-pointer"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.fullName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-white border border-[#DDE6E0] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-4 py-2 border-b border-[#DDE6E0]">
                        <p className="font-bold text-sm text-[#24332B] truncate">{currentUser.fullName}</p>
                        <p className="text-xs text-[#718078] truncate">@{currentUser.username}</p>
                      </div>

                      <div className="py-1 text-xs">
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            navigateTo('dashboard', { tab: 'overview' });
                          }}
                          className="w-full text-left px-4 py-2 font-medium text-[#24332B] hover:bg-[#E4F2EB] hover:text-[#2B8A63] flex items-center gap-2 cursor-pointer"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>{t.myDashboard}</span>
                        </button>

                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            navigateTo('dashboard', { tab: 'profile' });
                          }}
                          className="w-full text-left px-4 py-2 font-medium text-[#24332B] hover:bg-[#E4F2EB] hover:text-[#2B8A63] flex items-center gap-2 cursor-pointer"
                        >
                          <UserIcon className="w-4 h-4" />
                          <span>{t.myProfile}</span>
                        </button>

                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            navigateTo('dashboard', { tab: 'create-post' });
                          }}
                          className="w-full text-left px-4 py-2 font-medium text-[#24332B] hover:bg-[#E4F2EB] hover:text-[#2B8A63] flex items-center gap-2 cursor-pointer"
                        >
                          <PlusCircle className="w-4 h-4" />
                          <span>{t.createPost}</span>
                        </button>

                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            navigateTo('dashboard', { tab: 'my-posts' });
                          }}
                          className="w-full text-left px-4 py-2 font-medium text-[#24332B] hover:bg-[#E4F2EB] hover:text-[#2B8A63] flex items-center gap-2 cursor-pointer"
                        >
                          <FileText className="w-4 h-4" />
                          <span>{t.myPosts}</span>
                        </button>

                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            navigateTo('dashboard', { tab: 'saved-posts' });
                          }}
                          className="w-full text-left px-4 py-2 font-medium text-[#24332B] hover:bg-[#E4F2EB] hover:text-[#2B8A63] flex items-center gap-2 cursor-pointer"
                        >
                          <Bookmark className="w-4 h-4" />
                          <span>{t.savedPosts}</span>
                        </button>

                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            navigateTo('dashboard', { tab: 'settings' });
                          }}
                          className="w-full text-left px-4 py-2 font-medium text-[#24332B] hover:bg-[#E4F2EB] hover:text-[#2B8A63] flex items-center gap-2 cursor-pointer"
                        >
                          <Settings className="w-4 h-4" />
                          <span>{t.settings}</span>
                        </button>

                        <div className="border-t border-[#DDE6E0] my-1" />

                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            logoutUser();
                          }}
                          className="w-full text-left px-4 py-2 font-medium text-[#D95E5E] hover:bg-[#FDE8E8] flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{t.logout}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* If Guest */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('login')}
                  className="px-3 py-1.5 rounded-xl border border-[#DDE6E0] bg-white text-xs sm:text-sm font-semibold text-[#24332B] hover:border-[#2B8A63] hover:text-[#2B8A63] transition-colors cursor-pointer"
                >
                  {t.login}
                </button>
                <button
                  onClick={() => navigateTo('register')}
                  className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl bg-[#2B8A63] hover:bg-[#1F7451] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  {t.register}
                </button>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#24332B] hover:bg-[#F3F6F4] cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#DDE6E0] bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-xl">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#DDE6E0] bg-[#F8FAF9] text-sm text-[#24332B]"
            />
            <Search className="w-4 h-4 text-[#718078] absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          {/* Links */}
          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  navigateTo(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-xl text-left ${
                  activePage === link.id
                    ? 'text-[#2B8A63] bg-[#E4F2EB]'
                    : 'text-[#24332B] hover:bg-[#F3F6F4]'
                }`}
              >
                <span>{link.label}</span>
                {link.id === 'blog' && (
                  <span className="px-1.5 py-0.5 bg-[#D8A04A] text-white text-[9px] font-bold rounded-full">
                    HOT
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Auth Buttons if Guest */}
          {!currentUser && (
            <div className="pt-2 border-t border-[#DDE6E0] flex gap-2">
              <button
                onClick={() => {
                  navigateTo('login');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 rounded-xl border border-[#DDE6E0] text-center text-sm font-semibold text-[#24332B]"
              >
                {t.login}
              </button>
              <button
                onClick={() => {
                  navigateTo('register');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 rounded-xl bg-[#2B8A63] text-center text-sm font-semibold text-white"
              >
                {t.register}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
