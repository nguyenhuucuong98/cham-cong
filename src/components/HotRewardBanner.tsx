import { Medal } from 'lucide-react';

export default function HotRewardBanner() {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 rounded-2xl shadow-md relative overflow-hidden flex items-center justify-between">
      <div className="space-y-1 relative z-10">
        <span className="text-[11px] font-bold tracking-wider uppercase opacity-90">
          TUYÊN DƯƠNG NÓNG
        </span>
        <h3 className="text-lg font-extrabold leading-snug">
          Chúc mừng Nguyễn Văn B
        </h3>
        <p className="text-xs opacity-90">Đạt thành tích xuất sắc tháng 06/2024</p>
        <p className="text-xl font-black pt-2">
          Thưởng nóng: 5.000.000 VNĐ
        </p>
      </div>

      <div className="relative z-10 opacity-80">
        <Medal className="w-20 h-20 text-amber-100" />
      </div>
    </div>
  );
}