'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Clock,
  Users,
  CalendarDays,
  DollarSign,
  BarChart3,
  Bell,
  MessageSquare,
  FileSpreadsheet,
  Settings,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean; // Trạng thái đóng/mở sidebar di động
  isCollapsed: boolean; // Trạng thái thu gọn dạng icon
  onClose: () => void; // Hàm đóng sidebar di động
  onToggleCollapse: () => void; // Hàm toggle thu gọn icon
}

// Danh sách các Menu Item khớp hoàn toàn với thiết kế WorkSync
const navigationItems = [
  { name: 'Tổng quan', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Chấm công', href: '/cham-cong', icon: Clock },
  { name: 'Nhân viên', href: '/nhan-vien', icon: Users },
  { name: 'Nghỉ phép', href: '/nghi-phep', icon: CalendarDays },
  { name: 'Lương thưởng', href: '/luong-thuong', icon: DollarSign },
  { name: 'KPI - Đánh giá', href: '/kpi', icon: BarChart3 },
  { name: 'Thông báo', href: '/thong-bao', icon: Bell, badge: '2' },
  { name: 'Tin nội bộ', href: '/tin-noi-bo', icon: MessageSquare },
  { name: 'Báo cáo', href: '/bao-cao', icon: FileSpreadsheet },
  { name: 'Cài đặt', href: '/cai-dat', icon: Settings }
];

export default function Sidebar({
  isOpen,
  isCollapsed,
  onClose,
  onToggleCollapse
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* 1. Backdrop làm mờ phông nền trên Mobile / iPad khi mở Menu */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* 2. Thanh Sidebar chính */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-[#1151c5] text-white flex flex-col justify-between transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none
          /* Responsive transform cho Mobile/iPad */
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          /* Độ rộng tùy thuộc vào trạng thái Thu gọn (Icon View) hay Mở rộng */
          ${isCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        {/* TOP: Brand Logo & Title */}
        <div className="flex items-center justify-between px-5 py-6 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0 border border-white/20">
              <Clock className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-black tracking-tight whitespace-nowrap animate-in fade-in duration-200">
                WorkSync
              </span>
            )}
          </Link>

          {/* Nút đóng Sidebar chỉ hiện ở Mobile / Tablet */}
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MIDDLE: Danh sách Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                title={isCollapsed ? item.name : undefined}
                className={`relative flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs font-extrabold transition-all duration-150 ${
                  isActive
                    ? 'bg-white/20 text-white shadow-xs backdrop-blur-md'
                    : 'text-blue-100/80 hover:bg-white/10 hover:text-white'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-blue-100/80'}`} />

                {!isCollapsed && (
                  <span className="truncate tracking-wide">{item.name}</span>
                )}

                {/* Badge số thông báo */}
                {item.badge && (
                  <span
                    className={`ml-auto bg-rose-500 text-white text-[10px] font-black rounded-full px-2 py-0.5 shadow-xs ${
                      isCollapsed ? 'absolute top-1 right-1 px-1.5 py-0 text-[9px]' : ''
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* BOTTOM: Nút bấm thu gọn Sidebar (Desktop/iPad Landscape) */}
        <div className="hidden lg:flex p-3 border-t border-white/10 justify-end">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span>Thu gọn</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}