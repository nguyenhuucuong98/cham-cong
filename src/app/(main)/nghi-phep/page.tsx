'use client';

import { useState } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  Search,
  Check,
  X,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Building2,
  Palmtree
} from 'lucide-react';

// Kiểu dữ liệu Đơn nghỉ phép
interface LeaveRequest {
  id: string;
  code: string;
  employeeName: string;
  avatar: string;
  department: string;
  type: 'PhepNam' | 'NghiOm' | 'ViecRieng' | 'ThaiDan';
  startDate: string;
  endDate: string;
  daysCount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const initialRequests: LeaveRequest[] = [
  {
    id: '1',
    code: 'NP-0981',
    employeeName: 'Nguyễn Văn A',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    department: 'Kinh doanh',
    type: 'PhepNam',
    startDate: '20/09/2026',
    endDate: '22/09/2026',
    daysCount: 3,
    reason: 'Giải quyết việc gia đình cá nhân',
    status: 'pending',
    createdAt: '18/09/2026'
  },
  {
    id: '2',
    code: 'NP-0975',
    employeeName: 'Trần Thị B',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    department: 'Marketing',
    type: 'NghiOm',
    startDate: '19/09/2026',
    endDate: '19/09/2026',
    daysCount: 1,
    reason: 'Sốt cao, đi khám bệnh có giấy bác sĩ',
    status: 'approved',
    createdAt: '18/09/2026'
  },
  {
    id: '3',
    code: 'NP-0960',
    employeeName: 'Lê Hoàng C',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    department: 'Kỹ thuật',
    type: 'ViecRieng',
    startDate: '25/09/2026',
    endDate: '25/09/2026',
    daysCount: 1,
    reason: 'Về quê xử lý thủ tục hành chính',
    status: 'pending',
    createdAt: '17/09/2026'
  },
  {
    id: '4',
    code: 'NP-0952',
    employeeName: 'Phạm Minh D',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    department: 'Kỹ thuật',
    type: 'PhepNam',
    startDate: '10/09/2026',
    endDate: '12/09/2026',
    daysCount: 3,
    reason: 'Đồ án du lịch cùng gia đình',
    status: 'rejected',
    createdAt: '08/09/2026'
  }
];

export default function LeaveManagementPage() {
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form Đơn mới Demo
  const [newForm, setNewForm] = useState({
    type: 'PhepNam',
    startDate: '2026-09-22',
    endDate: '2026-09-23',
    daysCount: 2,
    reason: ''
  });

  // Xử lý duyệt/từ chối đơn trực tiếp (Demo Interactive)
  const handleUpdateStatus = (id: string, status: 'approved' | 'rejected') => {
    setRequests(
      requests.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  // Tạo đơn mới
  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.reason) return;

    const newReq: LeaveRequest = {
      id: Date.now().toString(),
      code: `NP-0${Math.floor(1000 + Math.random() * 9000)}`,
      employeeName: 'Nguyễn Văn A (Bạn)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      department: 'Ban Giám Đốc',
      type: newForm.type as any,
      startDate: newForm.startDate.split('-').reverse().join('/'),
      endDate: newForm.endDate.split('-').reverse().join('/'),
      daysCount: Number(newForm.daysCount),
      reason: newForm.reason,
      status: 'pending',
      createdAt: '18/09/2026'
    };

    setRequests([newReq, ...requests]);
    setIsModalOpen(false);
    setNewForm({ type: 'PhepNam', startDate: '2026-09-22', endDate: '2026-09-23', daysCount: 2, reason: '' });
  };

  // Filter dữ liệu
  const filteredRequests = requests.filter((req) => {
    const matchSearch =
      req.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = selectedStatus === 'all' || req.status === selectedStatus;
    const matchType = selectedType === 'all' || req.type === selectedType;
    return matchSearch && matchStatus && matchType;
  });

  // Helper hiển thị tên loại phép
  const getLeaveTypeBadge = (type: LeaveRequest['type']) => {
    switch (type) {
      case 'PhepNam':
        return <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-md font-bold text-[11px]">Phép năm</span>;
      case 'NghiOm':
        return <span className="bg-rose-50 text-rose-700 border border-rose-100 px-2.5 py-0.5 rounded-md font-bold text-[11px]">Nghỉ ốm</span>;
      case 'ViecRieng':
        return <span className="bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-0.5 rounded-md font-bold text-[11px]">Việc riêng</span>;
      case 'ThaiDan':
        return <span className="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-0.5 rounded-md font-bold text-[11px]">Thai sản</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quản Lý Nghỉ Phép</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Theo dõi, phê duyệt đơn xin nghỉ phép và quỹ ngày phép của nhân viên
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Đã xuất báo cáo nghỉ phép thành công!')}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            <Download className="w-4 h-4 text-gray-500" />
            <span>Xuất báo cáo</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#1151c5] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo đơn nghỉ phép</span>
          </button>
        </div>
      </div>

      {/* Thống kê quỹ phép cá nhân / toàn bộ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Palmtree className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Phép năm khả dụng</p>
            <p className="text-lg font-black text-gray-900">12 / 12 <span className="text-xs font-normal text-gray-400">ngày</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Đang chờ duyệt</p>
            <p className="text-lg font-black text-gray-900">
              {requests.filter((r) => r.status === 'pending').length} <span className="text-xs font-normal text-gray-400">đơn</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Đã phê duyệt</p>
            <p className="text-lg font-black text-gray-900">
              {requests.filter((r) => r.status === 'approved').length} <span className="text-xs font-normal text-gray-400">đơn</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Từ chối</p>
            <p className="text-lg font-black text-gray-900">
              {requests.filter((r) => r.status === 'rejected').length} <span className="text-xs font-normal text-gray-400">đơn</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bộ lọc & Tìm kiếm */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Ô tìm kiếm */}
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo tên nhân viên, Mã đơn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl text-xs font-medium text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Lọc trạng thái */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ phê duyệt</option>
            <option value="approved">Đã duyệt</option>
            <option value="rejected">Từ chối</option>
          </select>

          {/* Lọc loại phép */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">Tất cả loại phép</option>
            <option value="PhepNam">Phép năm</option>
            <option value="NghiOm">Nghỉ ốm</option>
            <option value="ViecRieng">Việc riêng</option>
            <option value="ThaiDan">Thai sản</option>
          </select>
        </div>
      </div>

      {/* Bảng Đơn nghỉ phép */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                <th className="py-3.5 px-5">Nhân viên</th>
                <th className="py-3.5 px-5">Loại phép</th>
                <th className="py-3.5 px-5">Thời gian nghỉ</th>
                <th className="py-3.5 px-5">Số ngày</th>
                <th className="py-3.5 px-5">Lý do nghỉ</th>
                <th className="py-3.5 px-5">Trạng thái</th>
                <th className="py-3.5 px-5 text-center">Duyệt nhanh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Nhân viên */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={req.avatar}
                        alt={req.employeeName}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-gray-900">{req.employeeName}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">{req.code} • {req.department}</p>
                      </div>
                    </div>
                  </td>

                  {/* Loại phép */}
                  <td className="py-3.5 px-5">
                    {getLeaveTypeBadge(req.type)}
                  </td>

                  {/* Thời gian */}
                  <td className="py-3.5 px-5 font-semibold text-gray-800">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{req.startDate} {req.startDate !== req.endDate ? `-> ${req.endDate}` : ''}</span>
                    </div>
                  </td>

                  {/* Số ngày */}
                  <td className="py-3.5 px-5 font-bold text-gray-900">
                    {req.daysCount} ngày
                  </td>

                  {/* Lý do */}
                  <td className="py-3.5 px-5">
                    <p className="truncate max-w-[200px] text-gray-600" title={req.reason}>
                      {req.reason}
                    </p>
                  </td>

                  {/* Trạng thái */}
                  <td className="py-3.5 px-5">
                    {req.status === 'pending' && (
                      <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Chờ duyệt
                      </span>
                    )}
                    {req.status === 'approved' && (
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Đã duyệt
                      </span>
                    )}
                    {req.status === 'rejected' && (
                      <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-rose-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Từ chối
                      </span>
                    )}
                  </td>

                  {/* Nút Duyệt / Từ Chối Nhanh */}
                  <td className="py-3.5 px-5 text-center">
                    {req.status === 'pending' ? (
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleUpdateStatus(req.id, 'approved')}
                          className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg transition-all shadow-2xs"
                          title="Chấp nhận"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(req.id, 'rejected')}
                          className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition-all shadow-2xs"
                          title="Từ chối"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-gray-400 font-semibold">Đã xử lý</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tạo Đơn Xin Nghỉ Phép */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Tạo đơn xin nghỉ phép</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-gray-600 mb-1">Loại hình nghỉ</label>
                <select
                  value={newForm.type}
                  onChange={(e) => setNewForm({ ...newForm, type: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="PhepNam">Phép năm (Có hưởng lương)</option>
                  <option value="NghiOm">Nghỉ ốm (Bảo hiểm hỗ trợ)</option>
                  <option value="ViecRieng">Việc riêng không hưởng lương</option>
                  <option value="ThaiDan">Chế độ thai sản</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1">Từ ngày</label>
                  <input
                    type="date"
                    value={newForm.startDate}
                    onChange={(e) => setNewForm({ ...newForm, startDate: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Đến ngày</label>
                  <input
                    type="date"
                    value={newForm.endDate}
                    onChange={(e) => setNewForm({ ...newForm, endDate: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Số ngày đăng ký nghỉ</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={newForm.daysCount}
                  onChange={(e) => setNewForm({ ...newForm, daysCount: Number(e.target.value) })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Lý do nghỉ phép *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Nhập lý do nghỉ chi tiết..."
                  value={newForm.reason}
                  onChange={(e) => setNewForm({ ...newForm, reason: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1151c5] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                >
                  Gửi đơn xin nghỉ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}