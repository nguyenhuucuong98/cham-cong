'use client';

import { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Download,
  MoreVertical,
  Mail,
  Phone,
  Building2,
  Calendar,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Briefcase,
  X,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  MapPin
} from 'lucide-react';

// Kiểu dữ liệu Nhân viên
interface Employee {
  id: string;
  code: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  shift: string;
  joinDate: string;
  status: 'active' | 'leave' | 'suspended';
  type: 'Full-time' | 'Part-time' | 'Thực tập';
}

const initialEmployees: Employee[] = [
  {
    id: '1',
    code: 'NV-0102',
    name: 'Nguyễn Văn A',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    email: 'nguyenvana@company.com',
    phone: '0981 234 567',
    department: 'Kinh doanh',
    role: 'Trưởng phòng Kinh doanh',
    shift: 'Hành chính (08:00 - 17:30)',
    joinDate: '15/03/2023',
    status: 'active',
    type: 'Full-time'
  },
  {
    id: '2',
    code: 'NV-0105',
    name: 'Trần Thị B',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    email: 'tranthib@company.com',
    phone: '0912 345 678',
    department: 'Marketing',
    role: 'Chuyên viên SEO & Content',
    shift: 'Hành chính (08:00 - 17:30)',
    joinDate: '01/08/2024',
    status: 'active',
    type: 'Full-time'
  },
  {
    id: '3',
    code: 'NV-0110',
    name: 'Lê Hoàng C',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    email: 'lehoangc@company.com',
    phone: '0978 901 234',
    department: 'Kỹ thuật',
    role: 'Lập trình viên Frontend',
    shift: 'Hành chính (08:00 - 17:30)',
    joinDate: '10/11/2022',
    status: 'leave',
    type: 'Full-time'
  },
  {
    id: '4',
    code: 'NV-0118',
    name: 'Phạm Minh D',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    email: 'phamminhd@company.com',
    phone: '0934 567 890',
    department: 'Kỹ thuật',
    role: 'Thực tập sinh Backend',
    shift: 'Ca sáng (08:00 - 12:00)',
    joinDate: '01/06/2026',
    status: 'active',
    type: 'Thực tập'
  },
  {
    id: '5',
    code: 'NV-0125',
    name: 'Hoàng Kim E',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    email: 'hoangkime@company.com',
    phone: '0905 112 233',
    department: 'Nhân sự',
    role: 'Chuyên viên Tuyển dụng',
    shift: 'Hành chính (08:00 - 17:30)',
    joinDate: '20/01/2025',
    status: 'suspended',
    type: 'Full-time'
  }
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  // State điều khiển Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Form Thêm nhân viên
  const [newEmp, setNewEmp] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Kinh doanh',
    role: '',
    type: 'Full-time'
  });

  // Xử lý thêm nhân viên mới (Demo)
  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.email) return;

    const created: Employee = {
      id: Date.now().toString(),
      code: `NV-0${Math.floor(100 + Math.random() * 900)}`,
      name: newEmp.name,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80`,
      email: newEmp.email,
      phone: newEmp.phone || '0900 000 000',
      department: newEmp.department,
      role: newEmp.role || 'Nhân viên',
      shift: 'Hành chính (08:00 - 17:30)',
      joinDate: new Date().toLocaleDateString('vi-VN'),
      status: 'active',
      type: newEmp.type as any
    };

    setEmployees([created, ...employees]);
    setIsAddModalOpen(false);
    setNewEmp({ name: '', email: '', phone: '', department: 'Kinh doanh', role: '', type: 'Full-time' });
  };

  // Filter dữ liệu
  const filteredEmployees = employees.filter((emp) => {
    const matchSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = selectedDept === 'all' || emp.department === selectedDept;
    const matchStatus = selectedStatus === 'all' || emp.status === selectedStatus;
    return matchSearch && matchDept && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Danh Sách Nhân Viên</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Quản lý thông tin tài khoản, phân quyền ca làm việc và trạng thái nhân sự
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Đã xuất hồ sơ nhân sự thành công!')}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            <Download className="w-4 h-4 text-gray-500" />
            <span>Xuất dữ liệu</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-[#1151c5] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Thêm nhân viên mới</span>
          </button>
        </div>
      </div>

      {/* Thống kê chỉ số nhân sự */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Tổng nhân sự</p>
            <p className="text-lg font-black text-gray-900">{employees.length} <span className="text-xs font-normal text-gray-400">người</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Đang hoạt động</p>
            <p className="text-lg font-black text-gray-900">
              {employees.filter((e) => e.status === 'active').length} <span className="text-xs font-normal text-gray-400">người</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Đang nghỉ phép</p>
            <p className="text-lg font-black text-gray-900">
              {employees.filter((e) => e.status === 'leave').length} <span className="text-xs font-normal text-gray-400">người</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Tạm đình chỉ / Nghỉ</p>
            <p className="text-lg font-black text-gray-900">
              {employees.filter((e) => e.status === 'suspended').length} <span className="text-xs font-normal text-gray-400">người</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bộ lọc & Tìm kiếm */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Input Tìm kiếm */}
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo tên, Mã NV, email..."
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
            <option value="Nhân sự">Nhân sự</option>
          </select>

          {/* Lọc trạng thái */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="leave">Nghỉ phép</option>
            <option value="suspended">Đã tạm nghỉ</option>
          </select>
        </div>

        {/* Nút chuyển chế độ xem Table / Grid */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-bold text-gray-600">
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'table' ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-gray-900'
            }`}
          >
            Bảng
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'grid' ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-gray-900'
            }`}
          >
            Thẻ Grid
          </button>
        </div>
      </div>

      {/* Hiển thị danh sách Nhân viên */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                  <th className="py-3.5 px-5">Nhân viên</th>
                  <th className="py-3.5 px-5">Liên hệ</th>
                  <th className="py-3.5 px-5">Phòng ban & Chức danh</th>
                  <th className="py-3.5 px-5">Ca làm việc</th>
                  <th className="py-3.5 px-5">Loại HĐ</th>
                  <th className="py-3.5 px-5">Trạng thái</th>
                  <th className="py-3.5 px-5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Nhân viên */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-gray-900">{emp.name}</p>
                          <p className="text-[10px] text-gray-400 font-semibold">{emp.code}</p>
                        </div>
                      </div>
                    </td>

                    {/* Liên hệ */}
                    <td className="py-3.5 px-5 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="truncate max-w-[140px]">{emp.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                        <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{emp.phone}</span>
                      </div>
                    </td>

                    {/* Phòng ban & Chức danh */}
                    <td className="py-3.5 px-5">
                      <p className="font-bold text-gray-800">{emp.department}</p>
                      <p className="text-[11px] text-gray-400">{emp.role}</p>
                    </td>

                    {/* Ca làm việc */}
                    <td className="py-3.5 px-5 text-gray-600 font-semibold">
                      {emp.shift}
                    </td>

                    {/* Loại hợp đồng */}
                    <td className="py-3.5 px-5">
                      <span className="inline-block bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {emp.type}
                      </span>
                    </td>

                    {/* Trạng thái */}
                    <td className="py-3.5 px-5">
                      {emp.status === 'active' && (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Đang làm việc
                        </span>
                      )}
                      {emp.status === 'leave' && (
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Nghỉ phép
                        </span>
                      )}
                      {emp.status === 'suspended' && (
                        <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-rose-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Tạm ngưng
                        </span>
                      )}
                    </td>

                    {/* Thao tác */}
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedEmployee(emp)}
                          className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-blue-600 rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert(`Sửa thông tin nhân viên ${emp.name}`)}
                          className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-amber-600 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Dạng Thẻ Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-sm">{emp.name}</h3>
                    <p className="text-[11px] text-gray-400 font-semibold">{emp.code} • {emp.department}</p>
                  </div>
                </div>

                {emp.status === 'active' && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></span>
                )}
                {emp.status === 'leave' && (
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-50"></span>
                )}
                {emp.status === 'suspended' && (
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-4 ring-rose-50"></span>
                )}
              </div>

              <div className="space-y-2 text-xs text-gray-600 bg-gray-50/60 p-3 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                  <span className="font-semibold text-gray-800">{emp.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate">{emp.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span>{emp.phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-[11px] font-bold text-gray-400">Ngày vào: {emp.joinDate}</span>
                <button
                  onClick={() => setSelectedEmployee(emp)}
                  className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
                >
                  Chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Thêm Nhân Viên Mới */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Thêm hồ sơ nhân viên mới</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-gray-600 mb-1">Họ và tên *</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập họ tên nhân viên..."
                  value={newEmp.name}
                  onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1">Email làm việc *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@company.com"
                    value={newEmp.email}
                    onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Số điện thoại</label>
                  <input
                    type="text"
                    placeholder="09xx xxx xxx"
                    value={newEmp.phone}
                    onChange={(e) => setNewEmp({ ...newEmp, phone: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1">Phòng ban</label>
                  <select
                    value={newEmp.department}
                    onChange={(e) => setNewEmp({ ...newEmp, department: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Kinh doanh">Kinh doanh</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Kỹ thuật">Kỹ thuật</option>
                    <option value="Nhân sự">Nhân sự</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Loại hợp đồng</label>
                  <select
                    value={newEmp.type}
                    onChange={(e) => setNewEmp({ ...newEmp, type: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Thực tập">Thực tập</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Chức danh / Vị trí</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Chuyên viên tư vấn, Lập trình viên..."
                  value={newEmp.role}
                  onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1151c5] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                >
                  Tạo tài khoản
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xem chi tiết Nhân viên */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-50"
                />
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900">{selectedEmployee.name}</h3>
                  <p className="text-xs font-bold text-blue-600">{selectedEmployee.role}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{selectedEmployee.code} • {selectedEmployee.department}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedEmployee(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-medium">Email làm việc:</span>
                <span className="font-bold text-gray-800">{selectedEmployee.email}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-medium">Số điện thoại:</span>
                <span className="font-bold text-gray-800">{selectedEmployee.phone}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-medium">Ca làm việc gắn liền:</span>
                <span className="font-bold text-gray-800">{selectedEmployee.shift}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-medium">Ngày chính thức vào làm:</span>
                <span className="font-bold text-gray-800">{selectedEmployee.joinDate}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-500 font-medium">Loại hợp đồng:</span>
                <span className="font-bold text-gray-800">{selectedEmployee.type}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedEmployee(null)}
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