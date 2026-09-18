'use client';

import { useState } from 'react';
import {
  Target,
  Award,
  TrendingUp,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
  Edit3,
  X,
  ChevronRight,
  User,
  Zap,
  Calendar,
  Sparkles,
  Check
} from 'lucide-react';

// Kiểu dữ liệu KPI Nhân viên
interface KPIRecord {
  id: string;
  code: string;
  employeeName: string;
  avatar: string;
  department: string;
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  weight: number; // Trọng số (%)
  period: string; // Quý 1, Quý 2, Tháng 9...
  status: 'in_progress' | 'completed' | 'overdue';
  rating: 'A+' | 'A' | 'B' | 'C' | 'Chờ đánh giá';
}

const initialKPIData: KPIRecord[] = [
  {
    id: '1',
    code: 'KPI-2026-01',
    employeeName: 'Nguyễn Văn A',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    department: 'Kinh doanh',
    title: 'Doanh số bán hàng cá nhân Quý 3',
    targetValue: 500000000,
    currentValue: 450000000,
    unit: 'VNĐ',
    weight: 40,
    period: 'Quý 3/2026',
    status: 'in_progress',
    rating: 'A'
  },
  {
    id: '2',
    code: 'KPI-2026-02',
    employeeName: 'Trần Thị B',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    department: 'Marketing',
    title: 'Số lượng Lead chất lượng từ Organic Traffic',
    targetValue: 1200,
    currentValue: 1350,
    unit: 'Lead',
    weight: 30,
    period: 'Tháng 09/2026',
    status: 'completed',
    rating: 'A+'
  },
  {
    id: '3',
    code: 'KPI-2026-03',
    employeeName: 'Lê Hoàng C',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    department: 'Kỹ thuật',
    title: 'Hoàn thành Module Quản lý Chấm công & Lương',
    targetValue: 100,
    currentValue: 85,
    unit: '%',
    weight: 50,
    period: 'Tháng 09/2026',
    status: 'in_progress',
    rating: 'B'
  },
  {
    id: '4',
    code: 'KPI-2026-04',
    employeeName: 'Phạm Minh D',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    department: 'Kỹ thuật',
    title: 'Tối ưu hóa thời gian phản hồi API Server (< 100ms)',
    targetValue: 100,
    currentValue: 40,
    unit: '%',
    weight: 20,
    period: 'Quý 3/2026',
    status: 'overdue',
    rating: 'C'
  }
];

export default function KPIManagementPage() {
  const [kpiList, setKpiList] = useState<KPIRecord[]>(initialKPIData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState<KPIRecord | null>(null);

  // Form Đơn KPI Mới
  const [newKPIForm, setNewKPIForm] = useState({
    employeeName: '',
    department: 'Kinh doanh',
    title: '',
    targetValue: 100,
    unit: '%',
    weight: 20,
    period: 'Tháng 09/2026'
  });

  // Helper tính % tiến độ
  const calculateProgress = (current: number, target: number) => {
    const progress = (current / target) * 100;
    return Math.min(Math.round(progress), 100);
  };

  // Helper Định dạng giá trị hiển thị
  const formatValue = (val: number, unit: string) => {
    if (unit === 'VNĐ') {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
    }
    return `${val.toLocaleString('vi-VN')} ${unit}`;
  };

  // Helper Badge Xếp loại KPI
  const getRatingBadge = (rating: KPIRecord['rating']) => {
    switch (rating) {
      case 'A+':
        return <span className="bg-purple-50 text-purple-700 border border-purple-200 font-extrabold px-2.5 py-0.5 rounded-md text-[11px] shadow-2xs">A+ (Xuất sắc)</span>;
      case 'A':
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold px-2.5 py-0.5 rounded-md text-[11px] shadow-2xs">A (Tốt)</span>;
      case 'B':
        return <span className="bg-blue-50 text-blue-700 border border-blue-200 font-extrabold px-2.5 py-0.5 rounded-md text-[11px] shadow-2xs">B (Đạt)</span>;
      case 'C':
        return <span className="bg-rose-50 text-rose-700 border border-rose-200 font-extrabold px-2.5 py-0.5 rounded-md text-[11px] shadow-2xs">C (Cần cố gắng)</span>;
      default:
        return <span className="bg-gray-50 text-gray-600 border border-gray-200 font-bold px-2.5 py-0.5 rounded-md text-[11px]">Chờ đánh giá</span>;
    }
  };

  // Cập nhật tiến độ trực tiếp (Interactive Demo)
  const handleUpdateProgress = (id: string, delta: number) => {
    setKpiList(
      kpiList.map((item) => {
        if (item.id === id) {
          const newCurrent = Math.max(0, item.currentValue + delta);
          const isDone = newCurrent >= item.targetValue;
          return {
            ...item,
            currentValue: newCurrent,
            status: isDone ? 'completed' : item.status
          };
        }
        return item;
      })
    );
  };

  // Tạo KPI mới
  const handleCreateKPI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKPIForm.title || !newKPIForm.employeeName) return;

    const newItem: KPIRecord = {
      id: Date.now().toString(),
      code: `KPI-2026-0${kpiList.length + 1}`,
      employeeName: newKPIForm.employeeName,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      department: newKPIForm.department,
      title: newKPIForm.title,
      targetValue: Number(newKPIForm.targetValue),
      currentValue: 0,
      unit: newKPIForm.unit,
      weight: Number(newKPIForm.weight),
      period: newKPIForm.period,
      status: 'in_progress',
      rating: 'Chờ đánh giá'
    };

    setKpiList([newItem, ...kpiList]);
    setIsModalOpen(false);
    setNewKPIForm({
      employeeName: '',
      department: 'Kinh doanh',
      title: '',
      targetValue: 100,
      unit: '%',
      weight: 20,
      period: 'Tháng 09/2026'
    });
  };

  // Lọc dữ liệu
  const filteredKPIs = kpiList.filter((kpi) => {
    const matchSearch =
      kpi.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kpi.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kpi.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = selectedDept === 'all' || kpi.department === selectedDept;
    const matchStatus = selectedStatus === 'all' || kpi.status === selectedStatus;
    return matchSearch && matchDept && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quản Lý KPI & Đánh Giá</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Thiết lập mục tiêu, theo dõi tiến độ hiệu suất làm việc và xếp loại nhân sự
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#1151c5] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Thiết lập KPI mới</span>
          </button>
        </div>
      </div>

      {/* Thống kê Tổng Quan KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Tổng chỉ tiêu KPI</p>
            <p className="text-lg font-black text-gray-900">{kpiList.length} <span className="text-xs font-normal text-gray-400">mục tiêu</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Hoàn thành 100%</p>
            <p className="text-lg font-black text-gray-900">
              {kpiList.filter((k) => k.status === 'completed').length} <span className="text-xs font-normal text-gray-400">chỉ tiêu</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Đang thực hiện</p>
            <p className="text-lg font-black text-gray-900">
              {kpiList.filter((k) => k.status === 'in_progress').length} <span className="text-xs font-normal text-gray-400">chỉ tiêu</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Xếp loại A / A+</p>
            <p className="text-lg font-black text-gray-900">
              {kpiList.filter((k) => k.rating === 'A' || k.rating === 'A+').length} <span className="text-xs font-normal text-gray-400">nhân sự</span>
            </p>
          </div>
        </div>
      </div>

      {/* Thanh lọc & Tìm kiếm */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Ô tìm kiếm */}
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo tên NV, mục tiêu, Mã KPI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl text-xs font-medium text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Lọc Phòng ban */}
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

          {/* Lọc Trạng thái */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="in_progress">Đang thực hiện</option>
            <option value="completed">Đã hoàn thành</option>
            <option value="overdue">Chậm tiến độ</option>
          </select>
        </div>
      </div>

      {/* Danh sách Bảng KPI */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                <th className="py-3.5 px-5">Nhân viên</th>
                <th className="py-3.5 px-5">Mục tiêu KPI</th>
                <th className="py-3.5 px-5">Kỳ đánh giá</th>
                <th className="py-3.5 px-5 w-64">Tiến độ thực hiện</th>
                <th className="py-3.5 px-5">Xếp loại</th>
                <th className="py-3.5 px-5 text-center">Cập nhật tiến độ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {filteredKPIs.map((kpi) => {
                const percent = calculateProgress(kpi.currentValue, kpi.targetValue);
                return (
                  <tr key={kpi.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Nhân viên */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={kpi.avatar}
                          alt={kpi.employeeName}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-gray-900">{kpi.employeeName}</p>
                          <p className="text-[10px] text-gray-400 font-semibold">{kpi.code} • {kpi.department}</p>
                        </div>
                      </div>
                    </td>

                    {/* Mục tiêu KPI */}
                    <td className="py-3.5 px-5">
                      <p className="font-bold text-gray-900 line-clamp-1">{kpi.title}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        Chỉ tiêu: <span className="font-semibold text-gray-700">{formatValue(kpi.targetValue, kpi.unit)}</span> (Trọng số: {kpi.weight}%)
                      </p>
                    </td>

                    {/* Kỳ đánh giá */}
                    <td className="py-3.5 px-5 font-semibold text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{kpi.period}</span>
                      </div>
                    </td>

                    {/* Progress Bar Tiến độ */}
                    <td className="py-3.5 px-5">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-bold text-gray-800">
                            {formatValue(kpi.currentValue, kpi.unit)}
                          </span>
                          <span className="font-extrabold text-blue-600">{percent}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              percent >= 100
                                ? 'bg-emerald-500'
                                : percent >= 50
                                ? 'bg-blue-600'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* Xếp loại */}
                    <td className="py-3.5 px-5">
                      {getRatingBadge(kpi.rating)}
                    </td>

                    {/* Nút demo tăng/giảm tiến độ trực tiếp */}
                    <td className="py-3.5 px-5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleUpdateProgress(kpi.id, kpi.unit === '%' ? 10 : 50)}
                          className="px-2.5 py-1 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all font-bold text-[11px] shadow-2xs"
                          title="Tăng tiến độ"
                        >
                          + Cập nhật
                        </button>
                        <button
                          onClick={() => setSelectedKPI(kpi)}
                          className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-lg"
                          title="Chi tiết"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Thiết Lập KPI Mới */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Thiết lập mục tiêu KPI mới</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateKPI} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-gray-600 mb-1">Tên nhân viên áp dụng *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={newKPIForm.employeeName}
                  onChange={(e) => setNewKPIForm({ ...newKPIForm, employeeName: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1">Phòng ban</label>
                  <select
                    value={newKPIForm.department}
                    onChange={(e) => setNewKPIForm({ ...newKPIForm, department: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Kinh doanh">Kinh doanh</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Kỹ thuật">Kỹ thuật</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Kỳ đánh giá</label>
                  <input
                    type="text"
                    value={newKPIForm.period}
                    onChange={(e) => setNewKPIForm({ ...newKPIForm, period: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Tên tiêu chí / Mục tiêu KPI *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Nhập tên tiêu chí đánh giá cụ thể..."
                  value={newKPIForm.title}
                  onChange={(e) => setNewKPIForm({ ...newKPIForm, title: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                ></textarea>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1">Chỉ tiêu (Target)</label>
                  <input
                    type="number"
                    value={newKPIForm.targetValue}
                    onChange={(e) => setNewKPIForm({ ...newKPIForm, targetValue: Number(e.target.value) })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Đơn vị tính</label>
                  <select
                    value={newKPIForm.unit}
                    onChange={(e) => setNewKPIForm({ ...newKPIForm, unit: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="%">%</option>
                    <option value="VNĐ">VNĐ</option>
                    <option value="Lead">Lead</option>
                    <option value="Bài viết">Bài viết</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Trọng số (%)</label>
                  <input
                    type="number"
                    value={newKPIForm.weight}
                    onChange={(e) => setNewKPIForm({ ...newKPIForm, weight: Number(e.target.value) })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1151c5] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                >
                  Lưu & Giao KPI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xem chi tiết KPI */}
      {selectedKPI && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Chi tiết chỉ tiêu KPI</h3>
              <button
                onClick={() => setSelectedKPI(null)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl">
                <img src={selectedKPI.avatar} className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100" />
                <div>
                  <p className="font-bold text-gray-900">{selectedKPI.employeeName}</p>
                  <p className="text-[10px] text-gray-400">{selectedKPI.department} • {selectedKPI.period}</p>
                </div>
              </div>

              <div>
                <span className="text-gray-400 text-[10px] uppercase font-bold">Mục tiêu</span>
                <p className="font-bold text-gray-800 text-sm mt-0.5">{selectedKPI.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl">
                <div>
                  <span className="text-gray-400 text-[10px]">Chỉ tiêu giao:</span>
                  <p className="font-extrabold text-gray-900">{formatValue(selectedKPI.targetValue, selectedKPI.unit)}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px]">Thực tế đạt được:</span>
                  <p className="font-extrabold text-blue-600">{formatValue(selectedKPI.currentValue, selectedKPI.unit)}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedKPI(null)}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors mt-2"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}