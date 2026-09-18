'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <html lang="vi">
      <body className="bg-slate-50 font-sans antialiased text-gray-800">
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <Sidebar
            isOpen={isMobileSidebarOpen}
            isCollapsed={isSidebarCollapsed}
            onClose={() => setIsMobileSidebarOpen(false)}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />

          {/* Main Content Area */}
          <div
            className={`flex-1 flex flex-col transition-all duration-300 ${
              isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
            }`}
          >
            <Header
              onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
              onToggleCollapseSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              isCollapsed={isSidebarCollapsed}
            />

            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}