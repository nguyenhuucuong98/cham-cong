'use client';

import { useState } from 'react';
import {
    BarChart3,
    Download,
    Calendar,
    Users,
    Search,
    Filter,
    CheckCircle2,
    Clock,
    AlertTriangle,
    UserX,
    FileSpreadsheet,
    FileText, // <-- Dùng FileText thay cho FilePdf
    ChevronRight,
    Eye,
    TrendingUp,
    X,
    Check,
    RefreshCw,
    Sparkles
  } from 'lucide-react';

// Kiểu dữ liệu nhân viên trong báo cáo
interface ReportRow {
  id: string;
  code: string;
  name: string;
  department: string;
  avatar: string;
  totalStandardDays: number;
  actualWorkDays: number;
  lateDays: number;
  earlyLeaveDays: number;
  overtimeHours: number;
  unexcusedAbsence: number;
  status: 'FULL' | 'WARNING' | 'CRITICAL';
}

export default function AttendanceReportPage() {
  // State quản lý bộ lọc
  const [selectedMonth, setSelectedMonth] = useState('2026-09');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // State quản lý tương tác UI / Demo
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<ReportRow | null>(null);

  // Danh sách dữ liệu mẫu Báo cáo Chấm công
  const [reports, setReports] = useState<ReportRow[]>([
    {
      id: '1',
      code: 'NV-001',
      name: 'Nguyễn Văn An',
      department: 'Phòng Kỹ Thuật',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      totalStandardDays: 22,
      actualWorkDays: 22,
      lateDays: 1,
      earlyLeaveDays: 0,
      overtimeHours: 12.5,
      unexcusedAbsence: 0,
      status: 'FULL'
    },
    {
      id: '2',
      code: 'NV-002',
      name: 'Trần Thị Mai',
      department: 'Phòng Nhân Sự',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      totalStandardDays: 22,
      actualWorkDays: 21,
      lateDays: 3,
      earlyLeaveDays: 1,
      overtimeHours: 4.0,
      unexcusedAbsence: 0,
      status: 'WARNING'
    },
    {
      id: '3',
      code: 'NV-003',
      name: 'Lê Hoàng Nam',
      department: 'Phòng Kinh Doanh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      totalStandardDays: 22,
      actualWorkDays: 18,
      lateDays: 5,
      earlyLeaveDays: 2,
      overtimeHours: 0.0,
      unexcusedAbsence: 2,
      status: 'CRITICAL'
    },
    {
      id: '4',
      code: 'NV-004',
      name: 'Phạm Quốc Bảo',
      department: 'Phòng Kỹ Thuật',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      totalStandardDays: 22,
      actualWorkDays: 22,
      lateDays: 0,
      earlyLeaveDays: 0,
      overtimeHours: 18.0,
      unexcusedAbsence: 0,
      status: 'FULL'
    },
    {
      id: '5',
      code: 'NV-005',
      name: 'Đặng Thùy Linh',
      department: 'Phòng Marketing',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
      totalStandardDays: 22,
      actualWorkDays: 20.5,
      lateDays: 2,
      earlyLeaveDays: 1,
      overtimeHours: 6.5,
      unexcusedAbsence: 0,
      status: 'WARNING'
    }
  ]);

  // Lọc dữ liệu theo phòng ban & từ khóa tìm kiếm
  const filteredReports = reports.filter((item) => {
    const matchesDept = selectedDepartment === 'ALL' || item.department === selectedDepartment;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  // Tính tổng chỉ số KPI toàn công ty
  const totalEmployees = filteredReports.length;
  const avgAttendanceRate = totalEmployees
    ? Math.round(
        (filteredReports.reduce((acc, r) => acc + r.actualWorkDays, 0) /
          (totalEmployees * 22)) *
          100
      )
    : 0;
  const totalLateTimes = filteredReports.reduce((acc, r) => acc + r.lateDays, 0);
  const totalOTHours = filteredReports.reduce((acc, r) => acc + r.overtimeHours, 0);

  // Xử lý Giả lập Xuất Báo Cáo
  const handleExport = (type: 'EXCEL' | 'PDF') => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(`Đã xuất báo cáo ${type} tháng ${selectedMonth} thành công!`);
      setTimeout(() => setExportSuccess(null), 3500);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6">
      {/* 1. HEADER & THAO TÁC XUẤT FILE */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-50 text-blue-600 p-2 rounded-xl">
              <BarChart3 className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                Báo Cáo & Thống Kê Chấm Công
              </h1>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Tổng hợp công làm việc, số lượt đi trễ, làm thêm giờ và nghỉ phép toàn hệ thống
              </p>
            </div>
          </div>
        </div>

        {/* Nút hành động Xuất Báo Cáo (Demo) */}
        <div className="flex flex-wrap items-center gap-2.5">
          {exportSuccess && (
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 text-xs font-bold px-3 py-2 rounded-xl animate-in fade-in zoom-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{exportSuccess}</span>
            </div>
          )}

          <button
            onClick={() => handleExport('EXCEL')}
            disabled={isExporting}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 disabled:opacity-50"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{isExporting ? 'Đang xuất...' : 'Xuất Excel'}</span>
          </button>

          <button
            onClick={() => handleExport('PDF')}
            disabled={isExporting}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 disabled:opacity-50"
          >
            <FileText className="w-4 h-4" />
            <span>Xuất PDF</span>
          </button>
        </div>
      </div>

      {/* 2. CARD THỐNG KÊ KPI TỔNG QUAN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Tỷ lệ chuyên cần */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">Tỷ lệ đi làm chung</span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">{avgAttendanceRate}%</span>
            <span className="text-[11px] font-bold text-emerald-600">+2.4% so tháng trước</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${avgAttendanceRate}%` }}
            ></div>
          </div>
        </div>

        {/* Card 2: Đi trễ / Về sớm */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">Lượt Đi trễ / Về sớm</span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">{totalLateTimes}</span>
            <span className="text-xs font-semibold text-gray-400">lượt vi phạm</span>
          </div>
          <p className="text-[11px] text-amber-600 font-medium mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Cần nhắc nhở 2 nhân sự
          </p>
        </div>

        {/* Card 3: Tổng giờ OT */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">Tổng giờ Tăng ca (OT)</span>
            <span className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">{totalOTHours}</span>
            <span className="text-xs font-semibold text-gray-400">giờ tích lũy</span>
          </div>
          <p className="text-[11px] text-gray-400 font-medium mt-2">Tính theo hệ số x1.5 / x2.0</p>
        </div>

        {/* Card 4: Nghỉ không phép */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">Nghỉ không lý do</span>
            <span className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <UserX className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">2</span>
            <span className="text-xs font-semibold text-gray-400">ngày nghỉ</span>
          </div>
          <p className="text-[11px] text-rose-600 font-medium mt-2">Đã trừ công tự động</p>
        </div>
      </div>

      {/* 3. BỘ LỌC DỮ LIỆU & TÌM KIẾM */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Chọn Tháng */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl w-full sm:w-auto">
            <Calendar className="w-4 h-4 text-gray-400" />
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent text-xs font-bold text-gray-800 focus:outline-none cursor-pointer"
            />
          </div>

          {/* Chọn Phòng Ban */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-transparent text-xs font-bold text-gray-800 focus:outline-none cursor-pointer"
            >
              <option value="ALL">Tất cả phòng ban</option>
              <option value="Phòng Kỹ Thuật">Phòng Kỹ Thuật</option>
              <option value="Phòng Nhân Sự">Phòng Nhân Sự</option>
              <option value="Phòng Kinh Doanh">Phòng Kinh Doanh</option>
              <option value="Phòng Marketing">Phòng Marketing</option>
            </select>
          </div>
        </div>

        {/* Ô Tìm Kiếm */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm tên hoặc mã nhân viên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* 4. BẢNG DỮ LIỆU BÁO CÁO TỔNG HỢP */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-black text-gray-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Bảng Công Chi Tiết Nhân Viên</span>
          </h2>
          <span className="text-xs font-bold text-gray-400">Hiển thị {filteredReports.length} nhân sự</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-5">Nhân viên</th>
                <th className="py-3.5 px-4">Phòng ban</th>
                <th className="py-3.5 px-4 text-center">Công chuẩn</th>
                <th className="py-3.5 px-4 text-center">Công thực tế</th>
                <th className="py-3.5 px-4 text-center">Trễ / Về sớm</th>
                <th className="py-3.5 px-4 text-center">Tăng ca (OT)</th>
                <th className="py-3.5 px-4 text-center">Trạng thái</th>
                <th className="py-3.5 px-5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-700">
              {filteredReports.map((row) => (
                <tr key={row.id} className="hover:bg-blue-50/30 transition-colors group">
                  {/* Cột Nhân Viên */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={row.avatar}
                        alt={row.name}
                        className="w-9 h-9 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {row.name}
                        </p>
                        <p className="text-[10px] text-gray-400 font-mono">{row.code}</p>
                      </div>
                    </div>
                  </td>

                  {/* Phòng Ban */}
                  <td className="py-3.5 px-4 text-gray-600 font-medium">{row.department}</td>

                  {/* Công chuẩn */}
                  <td className="py-3.5 px-4 text-center font-bold text-gray-500">{row.totalStandardDays}</td>

                  {/* Công thực tế */}
                  <td className="py-3.5 px-4 text-center font-black text-blue-600 bg-blue-50/40 rounded-lg">
                    {row.actualWorkDays}
                  </td>

                  {/* Trễ / Về sớm */}
                  <td className="py-3.5 px-4 text-center">
                    {row.lateDays > 0 || row.earlyLeaveDays > 0 ? (
                      <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-1 rounded-md text-[11px] font-bold">
                        {row.lateDays} trễ / {row.earlyLeaveDays} sớm
                      </span>
                    ) : (
                      <span className="text-gray-400 font-normal">-</span>
                    )}
                  </td>

                  {/* Giờ OT */}
                  <td className="py-3.5 px-4 text-center font-bold text-purple-600">
                    {row.overtimeHours > 0 ? `${row.overtimeHours}h` : '-'}
                  </td>

                  {/* Trạng thái */}
                  <td className="py-3.5 px-4 text-center">
                    {row.status === 'FULL' && (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                        <Check className="w-3 h-3" /> Chuẩn công
                      </span>
                    )}
                    {row.status === 'WARNING' && (
                      <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Cảnh báo
                      </span>
                    )}
                    {row.status === 'CRITICAL' && (
                      <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                        <UserX className="w-3 h-3" /> Vi phạm
                      </span>
                    )}
                  </td>

                  {/* Hành động xem chi tiết */}
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => setSelectedEmployee(row)}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2.5 py-1.5 rounded-xl transition-colors font-bold text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Chi tiết</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. MODAL DEMO: XEM PHIẾU CÔNG CHI TIẾT NHÂN VIÊN */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.name}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                  <h3 className="text-base font-black text-gray-900">{selectedEmployee.name}</h3>
                  <p className="text-xs text-gray-400 font-semibold">
                    {selectedEmployee.code} — {selectedEmployee.department}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chi tiết thông số công */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-2xl">
                <p className="text-gray-400 font-bold">Ngày công tiêu chuẩn</p>
                <p className="text-base font-black text-gray-800 mt-1">
                  {selectedEmployee.totalStandardDays} ngày
                </p>
              </div>
              <div className="p-3 bg-blue-50/60 rounded-2xl">
                <p className="text-blue-600 font-bold">Thực tế đi làm</p>
                <p className="text-base font-black text-blue-700 mt-1">
                  {selectedEmployee.actualWorkDays} ngày
                </p>
              </div>
              <div className="p-3 bg-amber-50/60 rounded-2xl">
                <p className="text-amber-600 font-bold">Số lần Đi trễ/Về sớm</p>
                <p className="text-base font-black text-amber-700 mt-1">
                  {selectedEmployee.lateDays + selectedEmployee.earlyLeaveDays} lần
                </p>
              </div>
              <div className="p-3 bg-purple-50/60 rounded-2xl">
                <p className="text-purple-600 font-bold">Giờ làm thêm (OT)</p>
                <p className="text-base font-black text-purple-700 mt-1">
                  {selectedEmployee.overtimeHours} giờ
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
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