'use client';

import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  onToggleCollapseSidebar: () => void;
  isCollapsed: boolean;
}

export default function Header({
  onOpenMobileSidebar,
  onToggleCollapseSidebar,
  isCollapsed
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 md:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Nút Menu Hamburger mở Mobile Sidebar */}
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl lg:hidden focus:outline-none"
          title="Mở Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Nút Toggle dạng Icon thu gọn dành cho màn hình vừa/PC */}
        <button
          onClick={onToggleCollapseSidebar}
          className="hidden lg:flex p-2 text-gray-500 hover:bg-gray-100 rounded-xl"
          title="Thu gọn / Mở rộng Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Thanh tìm kiếm */}
        <div className="relative hidden sm:block w-64 md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Thông báo & Thông tin tài khoản */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-xl">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
            2
          </span>
        </button>

        <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Avatar"
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-black text-gray-900 leading-none">Nguyễn Văn A</p>
            <p className="text-[10px] text-gray-400 font-medium mt-1">Quản trị viên</p>
          </div>
        </div>
      </div>
    </header>
  );
}