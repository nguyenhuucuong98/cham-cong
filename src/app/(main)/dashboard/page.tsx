import StatsCard from '@/components/StatsCard';
import TopPerformerCard from '@/components/TopPerformerCard';
import HotRewardBanner from '@/components/HotRewardBanner';
import { MapPin } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Title */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-xs text-gray-500 font-medium">Tổng quan hệ thống</p>
      </div>

      {/* Grid 4 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Nhân viên online"
          mainVal="256"
          subVal="/ 320"
          badgeVal="80%"
          trendText="12% so với hôm qua"
          trendType="up"
        />
        <StatsCard
          title="Check-in hôm nay"
          mainVal="98%"
          subVal="312 / 320"
          trendText="5% so với hôm qua"
          trendType="up"
        />
        <StatsCard
          title="Đi muộn"
          mainVal="3"
          subVal="Nhân viên"
          trendText="2 so với hôm qua"
          trendType="down"
        />
        <StatsCard
          title="Nghỉ phép"
          mainVal="12"
          subVal="Nhân viên"
          trendText="3 so với hôm qua"
          trendType="warning"
        />
      </div>

      {/* Grid Giữa: Bản đồ, Hiệu suất, Vinh danh */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bản đồ chấm công */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <h2 className="text-sm font-bold text-gray-800">Bản đồ chấm công</h2>
          <div className="my-4 bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center relative min-h-[160px]">
            <span className="text-xs font-bold text-gray-600 mb-3 bg-white px-3 py-1 rounded-full shadow-xs">
              245 Vị trí active
            </span>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 animate-pulse">
              <MapPin className="w-6 h-6" />
            </div>
          </div>
          <button className="w-full bg-[#1151c5] hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl transition-colors">
            Xem toàn bộ
          </button>
        </div>

        {/* Hiệu suất công việc */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-sm font-bold text-gray-800 mb-4">Hiệu suất công việc</h2>
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative w-36 h-36 flex items-center justify-center rounded-full border-[10px] border-blue-500 border-t-emerald-400 border-r-amber-400">
              <div className="text-center">
                <span className="text-xl font-black text-gray-900 block">92%</span>
                <span className="text-[10px] text-gray-400 font-semibold">Hoàn thành</span>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-xs font-semibold text-gray-600">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Hoàn thành
              </span>
              <span className="font-bold text-gray-900">92%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Đang làm
              </span>
              <span className="font-bold text-gray-900">6%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span> Chưa bắt đầu
              </span>
              <span className="font-bold text-gray-900">2%</span>
            </div>
          </div>
        </div>

        {/* Card Nhân viên xuất sắc */}
        <TopPerformerCard />
      </div>

      {/* Grid Dưới: Thông báo mới & Banner Thưởng Nóng */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-800">Thông báo mới nhất</h2>
            <button className="text-xs text-blue-600 font-bold hover:underline">Xem tất cả</button>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-slate-50/80 rounded-xl flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
              <div>
                <p className="text-xs font-bold text-gray-800">Lễ tổng kết Quý II/2024</p>
                <p className="text-[11px] text-gray-400 font-medium">Thứ 6, 28/06/2024</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50/80 rounded-xl flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
              <div>
                <p className="text-xs font-bold text-gray-800">Sinh nhật nhân viên tháng 6</p>
                <p className="text-[11px] text-gray-400 font-medium">Hôm nay, 08:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Thưởng Nóng */}
        <HotRewardBanner />
      </div>
    </div>
  );
}