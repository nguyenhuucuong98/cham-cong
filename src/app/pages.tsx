"use client"

import React from 'react';
import {
  Search,
  Bell,
  CheckCircle2,
  Play,
  Rocket,
  Star,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  MessageSquare,
  BarChart3,
  Settings,
  Clock,
  Award,
  ChevronRight,
  Smartphone,
  MapPin,
  ShieldCheck,
  Zap,
  Check
} from 'lucide-react';

export default function WorkSyncLanding() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-800 font-sans">
      {/* 1. HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-xl text-blue-900 tracking-tight leading-none">
                WorkSync
              </div>
              <div className="text-[10px] text-slate-500 font-medium tracking-wide mt-0.5">
                Kết nối đội ngũ - Nâng cao hiệu suất
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-700">
            <a href="#" className="text-blue-600 font-bold">Trang chủ</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Tính năng</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Bảng giá</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Khách hàng</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Tin tức</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Liên hệ</a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl border border-blue-200 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all">
              Đăng nhập
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all">
              Dùng thử miễn phí
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-8 pb-20 px-6 overflow-hidden bg-gradient-to-b from-blue-50/60 via-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold tracking-wide uppercase shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-current" />
              NỀN TẢNG QUẢN LÝ NHÂN SỰ THẾ HỆ MỚI
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight">
              Quản lý nhân sự <br />
              <span className="text-blue-600">thông minh</span>
            </h1>

            <p className="text-base text-slate-600 font-medium leading-relaxed">
              Chấm công chính xác – Quản lý hiệu suất – Kết nối đội ngũ <br />
              Truyền cảm hứng làm việc mỗi ngày
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 text-xs sm:text-sm font-semibold text-slate-700 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Chấm công GPS & FaceID</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Vinh danh & khen thưởng</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Quản lý nghỉ phép, tăng ca</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Dashboard phân tích thông minh</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Thông báo toàn công ty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>AI hỗ trợ quản lý nhân sự</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all">
                <Rocket className="w-4 h-4" />
                <span>Dùng thử miễn phí</span>
                <span className="text-[11px] font-normal opacity-80 block text-left">Miễn phí 14 ngày</span>
              </button>

              <button className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-blue-900 font-bold text-sm shadow-sm hover:border-blue-300 transition-all">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Xem Demo</span>
                <span className="text-[11px] font-normal text-slate-400">Video giới thiệu</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
              </div>
              <div>
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-xs font-semibold text-slate-600 mt-0.5">
                  <strong className="text-slate-900">4.9/5</strong> từ hơn 500+ doanh nghiệp tin dùng
                </div>
              </div>
            </div>
          </div>

          {/* Right Dashboard Mockup Column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-12 min-h-[540px]">
              
              {/* Dashboard Sidebar */}
              <div className="col-span-3 bg-[#0B409C] text-white p-4 flex flex-col justify-between text-xs font-medium">
                <div className="space-y-6">
                  {/* Brand */}
                  <div className="flex items-center gap-2 px-2 py-1">
                    <Clock className="w-5 h-5" />
                    <span className="font-extrabold text-sm tracking-wide">WorkSync</span>
                  </div>

                  {/* Nav list */}
                  <div className="space-y-1">
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold">
                      <Clock className="w-4 h-4" /> Tổng quan
                    </button>
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-blue-100/70 hover:bg-white/10 transition-colors">
                      <Clock className="w-4 h-4" /> Chấm công
                    </button>
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-blue-100/70 hover:bg-white/10 transition-colors">
                      <Users className="w-4 h-4" /> Nhân viên
                    </button>
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-blue-100/70 hover:bg-white/10 transition-colors">
                      <Calendar className="w-4 h-4" /> Nghỉ phép
                    </button>
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-blue-100/70 hover:bg-white/10 transition-colors">
                      <DollarSign className="w-4 h-4" /> Lương thưởng
                    </button>
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-blue-100/70 hover:bg-white/10 transition-colors">
                      <BarChart3 className="w-4 h-4" /> KPI - Đánh giá
                    </button>
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-blue-100/70 hover:bg-white/10 transition-colors">
                      <Bell className="w-4 h-4" /> Thông báo
                    </button>
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-blue-100/70 hover:bg-white/10 transition-colors">
                      <MessageSquare className="w-4 h-4" /> Tin nội bộ
                    </button>
                    <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-blue-100/70 hover:bg-white/10 transition-colors">
                      <BarChart3 className="w-4 h-4" /> Báo cáo
                    </button>
                  </div>
                </div>

                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-blue-100/70 hover:bg-white/10 transition-colors mt-auto">
                  <Settings className="w-4 h-4" /> Cài đặt
                </button>
              </div>

              {/* Dashboard Content */}
              <div className="col-span-9 bg-slate-50/50 p-4 space-y-4">
                
                {/* Dashboard Top Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-base leading-tight">Dashboard</h3>
                    <p className="text-[11px] text-slate-400 font-medium">Tổng quan hệ thống</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Tìm kiếm..." 
                        className="pl-8 pr-3 py-1 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 w-36"
                      />
                    </div>
                    <div className="relative p-1.5 bg-white rounded-lg border border-slate-200 text-slate-600">
                      <Bell className="w-3.5 h-3.5" />
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
                    </div>
                    <div className="flex items-center gap-2 border-l pl-3 border-slate-200">
                      <img className="w-7 h-7 rounded-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" />
                      <div className="text-[11px] text-left">
                        <div className="font-bold text-slate-800 leading-none">Nguyễn Văn A</div>
                        <div className="text-[9px] text-slate-400">Quản trị viên</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-4 gap-2.5">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm">
                    <div className="text-[10px] font-semibold text-slate-500">Nhân viên online</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg font-black text-slate-900">256</span>
                      <span className="text-[10px] text-slate-400">/ 320</span>
                      <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">80%</span>
                    </div>
                    <div className="text-[9px] text-emerald-600 font-semibold mt-1">↑ 12% so với hôm qua</div>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm">
                    <div className="text-[10px] font-semibold text-slate-500">Check-in hôm nay</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg font-black text-slate-900">98%</span>
                      <span className="text-[10px] text-slate-400">312 / 320</span>
                    </div>
                    <div className="text-[9px] text-emerald-600 font-semibold mt-1">↑ 5% so với hôm qua</div>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm">
                    <div className="text-[10px] font-semibold text-slate-500">Đi muộn</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg font-black text-slate-900">3</span>
                      <span className="text-[10px] text-slate-400">Nhân viên</span>
                    </div>
                    <div className="text-[9px] text-rose-500 font-semibold mt-1">↓ 2 so với hôm qua</div>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm">
                    <div className="text-[10px] font-semibold text-slate-500">Nghỉ phép</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg font-black text-slate-900">12</span>
                      <span className="text-[10px] text-slate-400">Nhân viên</span>
                    </div>
                    <div className="text-[9px] text-amber-600 font-semibold mt-1">↑ 3 so với hôm qua</div>
                  </div>
                </div>

                {/* Middle Row: Map, Chart, Top Employee */}
                <div className="grid grid-cols-12 gap-2.5">
                  
                  {/* Map Box */}
                  <div className="col-span-4 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between">
                    <div className="text-[11px] font-bold text-slate-800">Bản đồ chấm công</div>
                    <div className="my-2 h-24 rounded-lg bg-blue-50 relative overflow-hidden flex items-center justify-center border border-blue-100">
                      <MapPin className="w-8 h-8 text-blue-500 animate-bounce" />
                      <div className="absolute top-2 left-3 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded text-[8px] font-bold text-slate-700 shadow-sm">
                        245 Vị trí active
                      </div>
                    </div>
                    <button className="w-full py-1 bg-blue-600 text-white rounded-lg text-[10px] font-bold hover:bg-blue-700">
                      Xem toàn bộ
                    </button>
                  </div>

                  {/* Performance Doughnut Chart */}
                  <div className="col-span-4 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                    <div className="text-[11px] font-bold text-slate-800">Hiệu suất công việc</div>
                    <div className="flex items-center justify-center my-1 relative">
                      <div className="w-20 h-20 rounded-full border-[6px] border-blue-600 border-t-amber-400 border-r-emerald-400 flex items-center justify-center text-center">
                        <div>
                          <div className="text-sm font-black text-slate-800 leading-none">92%</div>
                          <div className="text-[8px] text-slate-400 font-medium">Hoàn thành</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-[9px] space-y-0.5">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Hoàn thành</span>
                        <span className="font-bold">92%</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Đang làm</span>
                        <span className="font-bold">6%</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> Chưa bắt đầu</span>
                        <span className="font-bold">2%</span>
                      </div>
                    </div>
                  </div>

                  {/* Top Employee Card */}
                  <div className="col-span-4 bg-gradient-to-b from-amber-50/50 to-orange-50/30 p-2.5 rounded-xl border border-amber-200/60 shadow-sm text-center flex flex-col justify-between relative overflow-hidden">
                    <div className="text-[10px] font-bold text-amber-800 flex items-center justify-center gap-1">
                      <Award className="w-3 h-3 text-amber-600" /> Nhân viên xuất sắc tháng
                    </div>
                    
                    <div className="my-1">
                      <img className="w-10 h-10 rounded-full object-cover mx-auto ring-2 ring-amber-400" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Top Employee" />
                      <div className="font-bold text-xs text-slate-800 mt-1">Nguyễn Văn A</div>
                      <div className="text-[9px] text-slate-500">Phòng Kinh doanh</div>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-amber-500 text-white font-black text-[9px] rounded-full shadow-sm">
                        KPI: 125%
                      </span>
                    </div>

                    <div className="text-[8px] text-left space-y-1 bg-white/80 p-1.5 rounded-lg border border-amber-100">
                      <div className="flex items-center gap-1 text-slate-700">
                        <Check className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                        <span>100% đi làm đúng giờ</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-700">
                        <Check className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                        <span>Hoàn thành xuất sắc KPI</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Row: News & Rewards */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-800">
                      <span>Thông báo mới nhất</span>
                      <a href="#" className="text-[9px] text-blue-600">Xem tất cả</a>
                    </div>
                    <div className="space-y-1.5 text-[10px]">
                      <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0"></div>
                        <div>
                          <div className="font-bold text-slate-800">Lễ tổng kết Quý II/2024</div>
                          <div className="text-[8px] text-slate-400">Thứ 6, 28/06/2024</div>
                        </div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0"></div>
                        <div>
                          <div className="font-bold text-slate-800">Sinh nhật nhân viên tháng 6</div>
                          <div className="text-[8px] text-slate-400">Hôm nay, 08:00</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2.5 rounded-xl text-white shadow-sm flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-[9px] font-semibold text-amber-100 uppercase tracking-wider">Tuyên dương nóng</div>
                      <div className="text-xs font-black">Chúc mừng Nguyễn Văn B</div>
                      <div className="text-[9px] text-amber-100">Đạt thành tích xuất sắc tháng 06/2024</div>
                      <div className="text-sm font-black text-yellow-200 mt-1">Thưởng nóng: 5.000.000 VNĐ</div>
                    </div>
                    <Award className="w-12 h-12 text-yellow-300 opacity-80 shrink-0" />
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section className="py-16 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tất cả trong một nền tảng
            </h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all border border-slate-100 group">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Chấm công thông minh</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                GPS, FaceID, QR Code, WiFi, Selfie chống gian lận
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all border border-slate-100 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Quản lý nhân sự</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Hồ sơ, hợp đồng, ngày công, nghỉ phép, tăng ca
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all border border-slate-100 group">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Truyền thông nội bộ</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Gửi thông điệp, thông báo đến toàn công ty nhanh chóng
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all border border-slate-100 group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Vinh danh & khen thưởng</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Ghi nhận thành tích, tạo động lực và gắn kết đội ngũ
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all border border-slate-100 group">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Báo cáo & phân tích</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Dashboard trực quan, dữ liệu thời gian thực
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. MOBILE APP SHOWCASE SECTION */}
      <section className="py-16 px-6 bg-gradient-to-b from-blue-50/40 to-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Ứng dụng di động <br />
              <span className="text-blue-600">Chấm công mọi lúc, mọi nơi!</span>
            </h2>

            <div className="flex items-center gap-6 pt-4">
              {/* QR Code Placeholder */}
              <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-md shrink-0">
                <div className="w-28 h-28 bg-slate-900 rounded-lg flex items-center justify-center text-white text-[10px] text-center font-mono p-2">
                  [ QR CODE APP DOWNLOAD ]
                </div>
              </div>

              {/* Download Buttons */}
              <div className="space-y-3">
                <button className="flex items-center gap-3 px-5 py-2.5 bg-black text-white rounded-xl shadow-lg hover:bg-slate-800 transition-all w-48">
                  <Smartphone className="w-6 h-6 shrink-0" />
                  <div className="text-left">
                    <div className="text-[10px] text-slate-300 font-medium">Tải trên</div>
                    <div className="text-sm font-bold leading-none">App Store</div>
                  </div>
                </button>

                <button className="flex items-center gap-3 px-5 py-2.5 bg-black text-white rounded-xl shadow-lg hover:bg-slate-800 transition-all w-48">
                  <Play className="w-6 h-6 shrink-0 fill-current" />
                  <div className="text-left">
                    <div className="text-[10px] text-slate-300 font-medium">Tải trên</div>
                    <div className="text-sm font-bold leading-none">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Phone Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-[280px] h-[540px] bg-slate-900 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800 relative">
              {/* Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-20"></div>

              {/* Screen */}
              <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col justify-between pt-6 pb-4 px-4 text-center">
                
                <div className="space-y-4 pt-2">
                  <div className="text-xs font-bold text-blue-600">Chấm công</div>
                  
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-medium">Thứ 4, 26/06/2024</div>
                    <div className="text-2xl font-black text-slate-900 my-1">08:00:00</div>
                    <div className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-700 font-bold text-[9px] rounded-full">
                      Đang làm việc
                    </div>
                  </div>

                  <div className="h-44 bg-blue-50 rounded-xl relative overflow-hidden border border-blue-100 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-blue-600 animate-pulse" />
                    <span className="absolute bottom-2 text-[9px] font-bold text-slate-600 bg-white/90 px-2 py-0.5 rounded-full shadow-sm">
                      VP Tòa nhà WorkSync
                    </span>
                  </div>
                </div>

                <button className="w-full py-3 bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700">
                  CHECK-IN
                </button>

                {/* Mobile Bottom Nav */}
                <div className="flex justify-around text-[9px] text-slate-400 font-semibold border-t border-slate-100 pt-2">
                  <div className="text-blue-600 flex flex-col items-center gap-0.5">
                    <Clock className="w-3.5 h-3.5" /> Lịch sử
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <Calendar className="w-3.5 h-3.5" /> Xin nghỉ
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <Bell className="w-3.5 h-3.5" /> Thông báo
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <Settings className="w-3.5 h-3.5" /> Thêm
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. FOOTER BRANDS & STATS */}
      <footer className="bg-[#031B4E] text-white py-8 px-6 border-t border-blue-900">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-blue-900/60">
            <span className="text-xs font-semibold text-blue-200/70">
              Hơn 500+ doanh nghiệp tin tưởng sử dụng
            </span>
            <div className="flex flex-wrap items-center gap-8 text-sm font-extrabold tracking-wider text-blue-200/50">
              <span className="hover:text-white transition-colors">Vietcombank</span>
              <span className="hover:text-white transition-colors">Viettel</span>
              <span className="hover:text-white transition-colors">BIDV</span>
              <span className="hover:text-white transition-colors">FPT</span>
              <span className="hover:text-white transition-colors">VINHOMES</span>
              <span className="hover:text-white transition-colors">THACO</span>
              <span className="hover:text-white transition-colors">mobifone</span>
              <span className="hover:text-white transition-colors">SAMSUNG</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Users className="w-8 h-8 text-blue-400 shrink-0" />
              <div>
                <div className="text-2xl font-black text-white">500+</div>
                <div className="text-xs text-blue-200/70">Doanh nghiệp đồng hành</div>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <Users className="w-8 h-8 text-blue-400 shrink-0" />
              <div>
                <div className="text-2xl font-black text-white">50.000+</div>
                <div className="text-xs text-blue-200/70">Người dùng tin tưởng</div>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <ShieldCheck className="w-8 h-8 text-blue-400 shrink-0" />
              <div>
                <div className="text-2xl font-black text-white">99.9%</div>
                <div className="text-xs text-blue-200/70">Độ hài lòng dịch vụ</div>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}