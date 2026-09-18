"use client"

import React, { useState, useRef, useEffect } from 'react';
import {
  Clock,
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  BarChart3,
  Bell,
  MessageSquare,
  BarChart2,
  Settings,
  Search,
  MapPin,
  CheckCircle2,
  Award,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Menu,
  X,
  User,
  LogOut,
  Key,
  ShieldCheck,
  Check,
  Building2,
  FileText,
  Briefcase,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'Tổng quan', label: 'Tổng quan', icon: Clock },
  { id: 'Chấm công', label: 'Chấm công', icon: Clock },
  { id: 'Nhân viên', label: 'Nhân viên', icon: Users },
  { id: 'Nghỉ phép', label: 'Nghỉ phép', icon: Calendar },
  { id: 'Lương thưởng', label: 'Lương thưởng', icon: DollarSign },
  { id: 'KPI - Đánh giá', label: 'KPI - Đánh giá', icon: BarChart3 },
  { id: 'Thông báo', label: 'Thông báo', icon: Bell, badge: 2 },
  { id: 'Tin nội bộ', label: 'Tin nội bộ', icon: MessageSquare },
  { id: 'Báo cáo', label: 'Báo cáo', icon: BarChart2 },
];

function Sidebar({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) {
  return (
    <>
      {/* Sidebar Desktop & Mobile Container */}
      <aside
        className={`
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
          fixed lg:relative inset-y-0 left-0 z-40
          w-[260px] xl:w-[270px] bg-[#0c4ec3] text-white flex flex-col justify-between p-5 shrink-0 transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
        `}
      >
        <div>
          {/* Logo Header */}
          <div className="flex items-center gap-3 px-3 py-2 mb-6 cursor-pointer" onClick={() => setActiveTab('Tổng quan')}>
            <div className="w-10 h-10 rounded-full border-2 border-white/90 flex items-center justify-center bg-white/10 shadow-inner">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">WorkSync</span>
          </div>

          {/* Main Navigation Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-[15px] transition-all duration-200 group
                    ${isActive 
                      ? 'bg-[#1862ed] text-white shadow-lg font-semibold' 
                      : 'text-blue-100/90 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-blue-200'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-[#ef4444] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Fixed Settings Link */}
        <div className="pt-4 border-t border-blue-500/30">
          <button
            onClick={() => {
              setActiveTab('Cài đặt');
              setIsMobileMenuOpen(false);
            }}
            className={`
              w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-[15px] transition-all duration-200
              ${activeTab === 'Cài đặt' 
                ? 'bg-[#1862ed] text-white shadow-lg font-semibold' 
                : 'text-blue-100/90 hover:bg-white/10 hover:text-white'
              }
            `}
          >
            <Settings className="w-5 h-5 text-blue-200" />
            <span>Cài đặt</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

function Header({ activeTab, isMobileMenuOpen, setIsMobileMenuOpen, onNotificationClick, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  // Notifications demo data
  const notificationsList = [
    { id: 1, title: 'Đơn nghỉ phép của Trần Văn B đã được duyệt', time: '5 phút trước', unread: true },
    { id: 2, title: 'Lễ tổng kết Quý II/2024 sắp bắt đầu lúc 14:00', time: '1 giờ trước', unread: true },
    { id: 3, title: 'Báo cáo KPI tháng 6 đã sẵn sàng để xuất', time: 'Hôm qua', unread: false },
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 relative z-20">
      {/* Toast Feedback Popup */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Title & Page Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{activeTab}</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Tổng quan hệ thống WorkSync</p>
        </div>
      </div>

      {/* Top Controls (Search, Bell Notification Popover, Profile Dropdown) */}
      <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-auto w-full sm:w-auto justify-end">
        {/* Search Bar */}
        <div className="relative flex-1 sm:w-60 xl:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
          />
        </div>

        {/* Notifications Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 bg-white border border-slate-200 rounded-full hover:bg-slate-50 active:scale-95 transition-all shadow-sm text-slate-600"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              2
            </span>
          </button>

          {/* Notifications Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-800 text-base">Thông báo mới</h4>
                  <span className="bg-blue-100 text-blue-700 text-xs font-extrabold px-2 py-0.5 rounded-full">2 chưa đọc</span>
                </div>
                <button
                  onClick={() => triggerToast('Đã đánh dấu đọc tất cả')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  Đọc tất cả
                </button>
              </div>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto my-1">
                {notificationsList.map((item) => (
                  <div key={item.id} className={`py-3 px-2 flex gap-3 items-start hover:bg-slate-50 rounded-xl transition-colors cursor-pointer ${item.unread ? 'bg-blue-50/40' : ''}`}>
                    <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${item.unread ? 'bg-blue-600' : 'bg-slate-300'}`} />
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">{item.title}</p>
                      <span className="text-[11px] text-slate-400 font-medium mt-1 block">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setShowNotifications(false);
                  onNotificationClick();
                }}
                className="w-full mt-2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Xem tất cả trong mục Thông báo
              </button>
            </div>
          )}
        </div>

        {/* User Profile Dropdown Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 pl-2 pr-1.5 py-1 rounded-full hover:bg-white border border-transparent hover:border-slate-200 transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600 shadow-sm shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
                alt="Nguyen Van A"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-sm font-bold text-slate-800 leading-tight flex items-center gap-1">
                Nguyễn Văn A
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-xs text-slate-400 font-medium">Quản trị viên</div>
            </div>
          </button>

          {/* User Profile Dropdown Content */}
          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                <p className="text-sm font-bold text-slate-900">Nguyễn Văn A</p>
                <p className="text-xs text-slate-400 truncate font-medium">nguyenvana@worksync.vn</p>
              </div>

              <div className="space-y-0.5">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    triggerToast('Đang chuyển hướng đến Hồ sơ cá nhân');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  <span>Hồ sơ cá nhân</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    triggerToast('Mở cài đặt tài khoản');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  <span>Bảo mật & Tài khoản</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    triggerToast('Đã gửi liên kết đổi mật khẩu tới email');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <Key className="w-4 h-4 text-slate-500" />
                  <span>Đổi mật khẩu</span>
                </button>

                <div className="pt-1 mt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Thoát hệ thống</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function OverviewDashboardView({ setActiveTab }) {
  return (
    <div className="space-y-6">
      {/* Top 4 Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Stat Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <span className="text-slate-500 text-sm font-semibold">Nhân viên online</span>
          <div className="flex items-baseline justify-between mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">256</span>
              <span className="text-slate-400 font-medium text-base">/ 320</span>
            </div>
            <span className="bg-emerald-50 text-emerald-600 font-bold text-xs px-2.5 py-1 rounded-full border border-emerald-100">
              80%
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>↑ 12% so với hôm qua</span>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <span className="text-slate-500 text-sm font-semibold">Check-in hôm nay</span>
          <div className="flex items-baseline justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">98%</span>
            </div>
            <span className="text-slate-400 font-medium text-sm">312 / 320</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>↑ 5% so với hôm qua</span>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <span className="text-slate-500 text-sm font-semibold">Đi muộn</span>
          <div className="flex items-baseline justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">3</span>
              <span className="text-slate-500 text-sm font-medium">Nhân viên</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-rose-500 font-semibold">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>↓ 2 so với hôm qua</span>
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <span className="text-slate-500 text-sm font-semibold">Nghỉ phép</span>
          <div className="flex items-baseline justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">12</span>
              <span className="text-slate-500 text-sm font-medium">Nhân viên</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-amber-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>↑ 3 so với hôm qua</span>
          </div>
        </div>
      </section>

      {/* Middle Grid: Map, Work Performance Donut Chart, Employee of Month */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        
        {/* Map Card */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <h3 className="text-base font-bold text-slate-800 mb-3">Bản đồ chấm công</h3>
          
          <div className="relative bg-[#e8f1ff] rounded-2xl h-44 flex items-center justify-center overflow-hidden my-2 border border-blue-100">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-600 shadow-sm border border-slate-100">
              245 Vị trí active
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
                  <MapPin className="w-5 h-5 fill-white" />
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setActiveTab('Chấm công')}
            className="w-full mt-3 py-2.5 bg-[#1862ed] hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md active:scale-[0.99]"
          >
            Xem toàn bộ
          </button>
        </div>

        {/* Performance Chart Card */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <h3 className="text-base font-bold text-slate-800 mb-2">Hiệu suất công việc</h3>
          
          <div className="flex flex-col items-center justify-center py-2 relative">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-rose-500"
                  strokeWidth="3.8"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-400"
                  strokeDasharray="98, 100"
                  strokeWidth="3.8"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-600"
                  strokeDasharray="92, 100"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-2xl font-black text-slate-900 leading-none">92%</div>
                <div className="text-[11px] font-medium text-slate-400 mt-1">Hoàn thành</div>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs font-semibold">
            <div className="flex items-center justify-between text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span>Hoàn thành</span>
              </div>
              <span className="font-bold text-slate-800">92%</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Đang làm</span>
              </div>
              <span className="font-bold text-slate-800">6%</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Chưa bắt đầu</span>
              </div>
              <span className="font-bold text-slate-800">2%</span>
            </div>
          </div>
        </div>

        {/* Employee of the Month Card */}
        <div className="lg:col-span-4 bg-amber-50/40 p-5 rounded-2xl border border-amber-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-center gap-1.5 text-amber-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Nhân viên xuất sắc tháng</span>
          </div>

          <div className="flex flex-col items-center text-center my-1">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250"
                  alt="Nguyen Van A - Employee of Month"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h4 className="text-base font-bold text-slate-900 mt-2">Nguyễn Văn A</h4>
            <p className="text-xs font-medium text-slate-500">Phòng Kinh doanh</p>

            <div className="mt-2 inline-flex items-center bg-amber-500 text-white font-black text-xs px-3 py-1 rounded-full shadow-sm">
              KPI: 125%
            </div>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-amber-200/60 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-600 shrink-0" />
              <span>100% đi làm đúng giờ</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Hoàn thành xuất sắc KPI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section: Recent Notifications + Hot Reward Banner */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Recent Notifications List */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800">Thông báo mới nhất</h3>
              <button 
                onClick={() => setActiveTab('Thông báo')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                Xem tất cả
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 hover:bg-slate-100 transition-colors cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                <div>
                  <h5 className="text-sm font-bold text-slate-800">Lễ tổng kết Quý II/2024</h5>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Thứ 6, 28/06/2024</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 hover:bg-slate-100 transition-colors cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <div>
                  <h5 className="text-sm font-bold text-slate-800">Sinh nhật nhân viên tháng 6</h5>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Hôm nay, 08:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hot Reward Banner */}
        <div className="lg:col-span-5 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[170px]">
          <div className="absolute -right-6 -bottom-6 opacity-20 text-white pointer-events-none">
            <Award className="w-48 h-48" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md text-amber-50">
              TUYÊN DƯƠNG NÓNG
            </span>
            
            <h4 className="text-lg font-bold mt-3 leading-snug">
              Chúc mừng <span className="underline decoration-amber-200">Nguyễn Văn B</span>
            </h4>
            <p className="text-xs text-amber-100 font-medium mt-1">
              Đạt thành tích xuất sắc tháng 06/2024
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 flex items-baseline justify-between relative z-10">
            <div>
              <span className="text-xs uppercase font-bold text-amber-100 block">Thưởng nóng:</span>
              <span className="text-xl sm:text-2xl font-black text-white drop-shadow-sm">
                5.000.000 VNĐ
              </span>
            </div>
            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}

function GenericSubView({ title, icon: Icon, description }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm min-h-[500px] flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4 border border-blue-100">
        <Icon className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-slate-500 text-sm max-w-md mb-6">{description}</p>
      <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 border border-slate-200">
        <Clock className="w-4 h-4 text-blue-600" />
        Dữ liệu đang được đồng bộ theo thời gian thực...
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('Tổng quan');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  if (isLoggedOut) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <LogOut className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Đã đăng xuất</h2>
          <p className="text-slate-500 text-sm">Bạn đã đăng xuất thành công khỏi hệ thống quản lý WorkSync.</p>
          <button
            onClick={() => setIsLoggedOut(false)}
            className="w-full py-3 bg-[#1862ed] hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md"
          >
            Đăng nhập lại
          </button>
        </div>
      </div>
    );
  }

  // Render view based on selected navigation tab
  const renderViewContent = () => {
    switch (activeTab) {
      case 'Tổng quan':
        return <OverviewDashboardView setActiveTab={setActiveTab} />;
      case 'Chấm công':
        return (
          <GenericSubView
            title="Quản lý Chấm công"
            icon={Clock}
            description="Theo dõi lịch sử check-in, check-out GPS, khuôn mặt và ca làm việc của toàn bộ nhân sự."
          />
        );
      case 'Nhân viên':
        return (
          <GenericSubView
            title="Danh sách Nhân viên"
            icon={Users}
            description="Quản lý hồ sơ nhân viên, hợp đồng lao động, phòng ban và phân quyền hệ thống."
          />
        );
      case 'Nghỉ phép':
        return (
          <GenericSubView
            title="Đơn Nghỉ phép"
            icon={Calendar}
            description="Phê duyệt đơn xin nghỉ phép, nghỉ thai sản, đi công tác và theo dõi quỹ ngày phép."
          />
        );
      case 'Lương thưởng':
        return (
          <GenericSubView
            title="Bảng Lương & Thưởng"
            icon={DollarSign}
            description="Tự động tính lương theo ngày công, phụ cấp, bảo hiểm và xuất phiếu lương trực tuyến."
          />
        );
      case 'KPI - Đánh giá':
        return (
          <GenericSubView
            title="Đánh giá KPI & Năng suất"
            icon={BarChart3}
            description="Thiết lập mục tiêu công việc, theo dõi tiến độ hoàn thành và đánh giá năng lực định kỳ."
          />
        );
      case 'Thông báo':
        return (
          <GenericSubView
            title="Trung tâm Thông báo"
            icon={Bell}
            description="Gửi thông báo nội bộ, tin tức công ty và cảnh báo nhắc nhở tự động."
          />
        );
      case 'Tin nội bộ':
        return (
          <GenericSubView
            title="Bản tin Nội bộ"
            icon={MessageSquare}
            description="Truyền thông văn hóa doanh nghiệp, vinh danh nhân viên và diễn đàn thảo luận."
          />
        );
      case 'Báo cáo':
        return (
          <GenericSubView
            title="Báo cáo & Thống kê"
            icon={BarChart2}
            description="Xuất báo cáo tổng hợp tỷ lệ chuyên cần, chi phí lương và hiệu suất theo phòng ban."
          />
        );
      case 'Cài đặt':
        return (
          <GenericSubView
            title="Cài đặt Hệ thống"
            icon={Settings}
            description="Cấu hình tham số chấm công, địa điểm Wifi/GPS, ca làm việc và quy trình phê duyệt."
          />
        );
      default:
        return <OverviewDashboardView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 font-sans flex justify-center p-0 sm:p-4 lg:p-6 antialiased">
      {/* Outer App Frame Container */}
      <div className="w-full max-w-[1440px] bg-white rounded-none sm:rounded-3xl shadow-2xl overflow-hidden flex min-h-[900px] border border-slate-200 relative">
        
        {/* Separate Modular Sidebar Component */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Main Workspace Area */}
        <main className="flex-1 bg-[#f8fafc] p-4 sm:p-6 lg:p-7 overflow-y-auto flex flex-col gap-6">
          {/* Header Bar Component with Dropdowns */}
          <Header
            activeTab={activeTab}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            onNotificationClick={() => setActiveTab('Thông báo')}
            onLogout={() => setIsLoggedOut(true)}
          />

          {/* Dynamic Content View Area */}
          <div className="flex-1">
            {renderViewContent()}
          </div>
        </main>
      </div>
    </div>
  );
}