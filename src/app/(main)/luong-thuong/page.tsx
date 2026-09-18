'use client';

import { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Download,
  Search,
  Filter,
  Calendar,
  Eye,
  CheckCircle2,
  RefreshCw,
  Send,
  X,
  FileSpreadsheet,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  ShieldAlert,
  Wallet,
  Coins
} from 'lucide-react';

// Kiểu dữ liệu Bảng Lương Nhân Viên
interface SalaryRecord {
  id: string;
  code: string;
  name: string;
  avatar: string;
  department: string;
  role: string;
  baseSalary: number;     // Lương cơ bản
  workDays: number;       // Ngày công thực tế
  otHours: number;        // Giờ làm thêm
  bonus: number;          // Thưởng (KPI / Dự án)
  allowance: number;      // Phụ cấp
  deductions: number;     // BHYT, BHXH, Trễ/Phạt
  netSalary: number;      // Thực nhận
  status: 'draft' | 'approved' | 'paid';
}

const initialSalaryData: SalaryRecord[] = [
  {
    id: '1',
    code: 'NV-0102',
    name: 'Nguyễn Văn A',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    department: 'Kinh doanh',
    role: 'Trưởng phòng Kinh doanh',
    baseSalary: 22000000,
    workDays: 22,
    otHours: 8,
    bonus: 5500000,
    allowance: 1500000,
    deductions: 2420000,
    netSalary: 27180000,
    status: 'paid'
  },
  {
    id: '2',
    code: 'NV-0105',
    name: 'Trần Thị B',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    department: 'Marketing',
    role: 'Chuyên viên SEO & Content',
    baseSalary: 15000000,
    workDays: 21.5,
    otHours: 4,
    bonus: 2000000,
    allowance: 1000000,
    deductions: 1700000,
    netSalary: 16022727,
    status: 'approved'
  },
  {
    id: '3',
    code: 'NV-0110',
    name: 'Lê Hoàng C',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    department: 'Kỹ thuật',
    role: 'Lập trình viên Frontend',
    baseSalary: 18000000,
    workDays: 22,
    otHours: 12,
    bonus: 3000000,
    allowance: 1200000,
    deductions: 2030000,
    netSalary: 21320000,
    status: 'approved'
  },
  {
    id: '4',
    code: 'NV-0118',
    name: 'Phạm Minh D',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    department: 'Kỹ thuật',
    role: 'Thực tập sinh Backend',
    baseSalary: 6000000,
    workDays: 20,
    otHours: 0,
    bonus: 500000,
    allowance: 500000,
    deductions: 300000,
    netSalary: 6154545,
    status: 'draft'
  }
];

export default function PayrollPage() {
  const [salaryRecords, setSalaryRecords] = useState<SalaryRecord[]>(initialSalaryData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('2026-08');
  const [selectedDetail, setSelectedDetail] = useState<SalaryRecord | null>(null);

  const [isCalculating, setIsCalculating] = useState(false);

  // Helper format VND
  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.round(amount));
  };

  // Demo Tính lại tổng lương toàn công ty
  const handleRecalculatePayroll = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      alert('Đã tính toán và cập nhật xong bảng lương Tháng 08/2026!');
    }, 1200);
  };

  // Demo Chuyển trạng thái Duyệt hàng loạt
  const handleApproveAll = () => {
    setSalaryRecords(
      salaryRecords.map((item) => (item.status === 'draft' ? { ...item, status: 'approved' } : item))
    );
    alert('Đã phê duyệt toàn bộ các phiếu lương ở trạng thái Nháp!');
  };

  // Filter
  const filteredRecords = salaryRecords.filter((rec) => {
    const matchSearch =
      rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = selectedDept === 'all' || rec.department === selectedDept;
    const matchStatus = selectedStatus === 'all' || rec.status === selectedStatus;
    return matchSearch && matchDept && matchStatus;
  });

  // Tổng tiền quỹ lương thực nhận
  const totalNetPayroll = filteredRecords.reduce((acc, curr) => acc + curr.netSalary, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quản Lý Lương & Thưởng</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Tính toán công xá, tổng hợp phụ cấp, thưởng KPI và chốt bảng lương tháng
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRecalculatePayroll}
            disabled={isCalculating}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-blue-600 ${isCalculating ? 'animate-spin' : ''}`} />
            <span>{isCalculating ? 'Đang tính toán...' : 'Tính lại bảng lương'}</span>
          </button>

          <button
            onClick={handleApproveAll}
            className="flex items-center gap-2 bg-[#1151c5] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Duyệt bảng lương</span>
          </button>
        </div>
      </div>

      {/* Thống kê Quỹ Lương Tổng Quan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-5 rounded-2xl shadow-md space-y-2">
          <div className="flex justify-between items-center text-blue-200">
            <span className="text-[11px] font-bold uppercase tracking-wider">Tổng Thực Chi Lương</span>
            <Wallet className="w-5 h-5 text-blue-300" />
          </div>
          <p className="text-2xl font-black tracking-tight">{formatVND(totalNetPayroll)}</p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-300 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+4.2% so với tháng trước</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Tổng Thưởng KPI & Dự Án</span>
            <Coins className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-xl font-black text-gray-900">
            {formatVND(filteredRecords.reduce((acc, curr) => acc + curr.bonus, 0))}
          </p>
          <span className="text-[11px] font-semibold text-gray-400 block">Dành cho {filteredRecords.length} nhân sự</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Khấu Trừ & Bảo Hiểm</span>
            <ArrowDownRight className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-xl font-black text-gray-900">
            {formatVND(filteredRecords.reduce((acc, curr) => acc + curr.deductions, 0))}
          </p>
          <span className="text-[11px] font-semibold text-rose-500 block">Bao gồm BHYT, BHXH, Phạt trễ</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Trạng Thái Chi Trả</span>
            <CreditCard className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-xl font-black text-gray-900">
            {salaryRecords.filter((r) => r.status === 'paid').length} / {salaryRecords.length} <span className="text-xs font-normal text-gray-400">NV</span>
          </p>
          <span className="text-[11px] font-semibold text-emerald-600 block">Đã thanh toán ngân hàng</span>
        </div>
      </div>

      {/* Bộ Lọc & Chọn Tháng */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Input Tìm kiếm */}
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo tên hoặc mã NV..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl text-xs font-medium text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Lọc phòng ban */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">Tất cả phòng ban</option>
            <option value="Kinh doanh">Kinh doanh</option>
            <option value="Marketing">Marketing</option>
            <option value="Kỹ thuật">Kỹ thuật</option>
          </select>

          {/* Lọc trạng thái */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="draft">Bản nháp</option>
            <option value="approved">Đã duyệt</option>
            <option value="paid">Đã thanh toán</option>
          </select>
        </div>

        {/* Picker Chọn Tháng Kỳ Lương */}
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl p-1 bg-gray-50/50">
          <Calendar className="w-4 h-4 text-blue-600 ml-2" />
          <span className="text-xs font-bold text-gray-500">Kỳ lương:</span>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-transparent border-none text-xs font-black focus:outline-none text-gray-800 cursor-pointer pr-2"
          />
        </div>
      </div>

      {/* Bảng Dữ Liệu Bảng Lương */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                <th className="py-3.5 px-5">Nhân viên</th>
                <th className="py-3.5 px-5">Lương cơ bản</th>
                <th className="py-3.5 px-5">Công / OT</th>
                <th className="py-3.5 px-5">Thưởng & Phụ cấp</th>
                <th className="py-3.5 px-5">Khấu trừ</th>
                <th className="py-3.5 px-5">Thực nhận</th>
                <th className="py-3.5 px-5">Trạng thái</th>
                <th className="py-3.5 px-5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {filteredRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Nhân viên */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={rec.avatar}
                        alt={rec.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-gray-900">{rec.name}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">{rec.code} • {rec.department}</p>
                      </div>
                    </div>
                  </td>

                  {/* Lương cơ bản */}
                  <td className="py-3.5 px-5 font-bold text-gray-800">
                    {formatVND(rec.baseSalary)}
                  </td>

                  {/* Ngày công & OT */}
                  <td className="py-3.5 px-5">
                    <p className="font-extrabold text-gray-900">{rec.workDays} công</p>
                    <p className="text-[10px] text-blue-600 font-semibold">{rec.otHours}h OT</p>
                  </td>

                  {/* Thưởng & Phụ cấp */}
                  <td className="py-3.5 px-5">
                    <p className="font-bold text-emerald-600">+{formatVND(rec.bonus + rec.allowance)}</p>
                    <p className="text-[10px] text-gray-400">Thưởng: {formatVND(rec.bonus)}</p>
                  </td>

                  {/* Khấu trừ */}
                  <td className="py-3.5 px-5 font-bold text-rose-500">
                    -{formatVND(rec.deductions)}
                  </td>

                  {/* Thực nhận */}
                  <td className="py-3.5 px-5">
                    <span className="text-sm font-black text-gray-900 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                      {formatVND(rec.netSalary)}
                    </span>
                  </td>

                  {/* Trạng thái */}
                  <td className="py-3.5 px-5">
                    {rec.status === 'draft' && (
                      <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-[11px] font-bold px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Bản nháp
                      </span>
                    )}
                    {rec.status === 'approved' && (
                      <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-blue-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Đã duyệt
                      </span>
                    )}
                    {rec.status === 'paid' && (
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Đã chi trả
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => setSelectedDetail(rec)}
                      className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-blue-600 rounded-lg transition-colors"
                      title="Xem phiếu lương chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Phiếu Lương Chi Tiết */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedDetail.avatar}
                  alt={selectedDetail.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
                />
                <div>
                  <h3 className="text-base font-extrabold text-gray-900">{selectedDetail.name}</h3>
                  <p className="text-xs font-semibold text-gray-400">{selectedDetail.code} • {selectedDetail.role}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDetail(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-medium">Lương thỏa thuận (Cơ bản):</span>
                <span className="font-bold text-gray-900">{formatVND(selectedDetail.baseSalary)}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-medium">Số ngày công chính thức:</span>
                <span className="font-bold text-gray-900">{selectedDetail.workDays} / 22 ngày</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-medium">Làm thêm giờ (OT):</span>
                <span className="font-bold text-blue-600">{selectedDetail.otHours} giờ</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-gray-200/60 pt-2">
                <span className="text-gray-500 font-medium">Thưởng KPI / Hiệu suất:</span>
                <span className="font-bold text-emerald-600">+{formatVND(selectedDetail.bonus)}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-500 font-medium">Phụ cấp ăn trưa / Xăng xe:</span>
                <span className="font-bold text-emerald-600">+{formatVND(selectedDetail.allowance)}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-gray-200/60 pt-2">
                <span className="text-gray-500 font-medium">Các khoản giảm trừ (BHXH, BHYT):</span>
                <span className="font-bold text-rose-500">-{formatVND(selectedDetail.deductions)}</span>
              </div>
            </div>

            <div className="bg-blue-50/80 border border-blue-100 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">THỰC NHẬN CHUYỂN KHOẢN</span>
                <p className="text-xl font-black text-blue-900">{formatVND(selectedDetail.netSalary)}</p>
              </div>
              <button
                onClick={() => alert(`Đã gửi email phiếu lương đến nhân viên ${selectedDetail.name}`)}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi Mail</span>
              </button>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedDetail(null)}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}