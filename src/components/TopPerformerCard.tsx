import { Award, Check } from 'lucide-react';

export default function TopPerformerCard() {
  return (
    <div className="bg-amber-50/30 p-6 rounded-2xl border border-amber-200/60 shadow-sm flex flex-col justify-between">
      <div className="flex items-center gap-2 text-amber-600 text-xs font-bold">
        <Award className="w-4 h-4" />
        <span>Nhân viên xuất sắc tháng</span>
      </div>

      <div className="flex flex-col items-center my-3">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
          alt="Nguyễn Văn A"
          className="w-16 h-16 rounded-full object-cover ring-4 ring-amber-300 shadow-sm"
        />
        <h3 className="font-bold text-gray-900 text-base mt-2">Nguyễn Văn A</h3>
        <p className="text-xs text-gray-500 font-medium">Phòng Kinh doanh</p>

        <span className="mt-2.5 bg-amber-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xs">
          KPI: 125%
        </span>
      </div>

      <div className="space-y-1.5 pt-2 border-t border-amber-200/40">
        <div className="flex items-center gap-2 text-xs text-gray-700">
          <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>100% đi làm đúng giờ</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-700">
          <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Hoàn thành xuất sắc KPI</span>
        </div>
      </div>
    </div>
  );
}