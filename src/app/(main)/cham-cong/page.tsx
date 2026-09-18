'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  MapPin, 
  Check, 
  X,
  ChevronLeft,
  ChevronRight,
  UserCheck
} from 'lucide-react';

// Mock data nhân viên chấm công
interface AttendanceRecord {
  id: string;
  code: string;
  name: string;
  avatar: string;
  department: string;
  shift: string;
  checkIn: string;
  checkOut: string;
  location: string;
  status: 'dung_gio' | 'di_muon' | 've_som' | 'vang';
  device: string;
}

const initialRecords: AttendanceRecord[] = [
  {
    id: '1',
    code: 'NV-0102',
    name: 'Nguyễn Văn A',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    department: 'Kinh doanh',
    shift: 'Hành chính (08:00 - 17:30)',
    checkIn: '07:52:10',
    checkOut: '17:35:40',
    location: 'Văn phòng HN (WiFi 5G)',
    status: 'dung_gio',
    device: 'Mobile App (FaceID)'
  },
  {
    id: '2',
    code: 'NV-0105',
    name: 'Trần Thị B',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    department: 'Marketing',
    shift: 'Hành chính (08:00 - 17:30)',
    checkIn: '08:18:05',
    checkOut: '17:30:00',
    location: 'Văn phòng HN (GPS)',
    status: 'di_muon',
    device: 'Web Browser'
  },
  {
    id: '3',
    code: 'NV-0110',
    name: 'Lê Hoàng C',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    department: 'Kỹ thuật',
    shift: 'Hành chính (08:00 - 17:30)',
    checkIn: '07:58:40',
    checkOut: '16:45:12',
    location: 'Văn phòng HCM (WiFi)',
    status: 've_som',
    device: 'Máy chấm công vân tay'
  },
  {
    id: '4',
    code: 'NV-0118',
    name: 'Phạm Minh D',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    department: 'Kỹ thuật',
    shift: 'Hành chính (08:00 - 17:30)',
    checkIn: '--:--:--',
    checkOut: '--:--:--',
    location: 'Chưa ghi nhận',
    status: 'vang',
    device: 'Chưa ghi nhận'
  }
];

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>(initialRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2026-09-18');

  // Trạng thái Demo Check-in nhanh cá nhân
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [myCheckInTime, setMyCheckInTime] = useState('');

  const handleQuickCheckIn = () => {
    const timeString = new Date().toLocaleTimeString('vi-VN');
    setHasCheckedIn(true);
    setMyCheckInTime(timeString);

    const newMyRecord: AttendanceRecord = {
      id: Date.now().toString(),
      code: 'NV-0001',
      name: 'Nguyễn Văn A (Bạn)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      department: 'Ban Giám Đốc',
      shift: 'Hành chính (08:00 - 17:30)',
      checkIn: timeString,
      checkOut: '--:--:--',
      location: 'Văn phòng Chính (WiFi 5G)',
      status: 'dung_gio',
      device: 'Trình duyệt Web'
    };

    setRecords([newMyRecord, ...records]);
  };

  // Filter dữ liệu
  const filteredRecords = records.filter((rec) => {
    const matchSearch = rec.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        rec.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = selectedDepartment === 'all' || rec.department === selectedDepartment;
    const matchStatus = selectedStatus === 'all' || rec.status === selectedStatus;
    return matchSearch && matchDept && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Bảng Chấm Công Theo Ngày</h1>
          <p className="text-xs text-gray-500 font-medium mt-1">Theo dõi lượt Check-in/Check-out thời gian thực của nhân sự</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert('Xuất báo cáo Excel thành công!')}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            <Download className="w-4 h-4 text-gray-500" />
            <span>Xuất Excel</span>
          </button>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#1151c5] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Chấm công bổ sung</span>
          </button>
        </div>
      </div>

      {/* Demo Widget: Nút Check-In Nhanh Cá Nhân */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
            <UserCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">Khu vực Check-in Demo</span>
            <h2 className="text-base font-extrabold">Chấm công điểm danh hôm nay</h2>
            <p className="text-xs text-blue-100 mt-0.5">Vị trí hiện tại: <span className="font-semibold text-white">Văn phòng Tầng 5 - WiFi Corporate 5G</span></p>
          </div>
        </div>

        <div>
          {!hasCheckedIn ? (
            <button
              onClick={handleQuickCheckIn}
              className="bg-white text-blue-700 hover:bg-blue-50 font-black text-xs px-6 py-3 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Clock className="w-4 h-4 text-blue-600" />
              <span>CHECK-IN NGAY</span>
            </button>
          ) : (
            <div className="bg-emerald-500/20 border border-emerald-300/40 backdrop-blur-md text-emerald-100 px-5 py-2.5 rounded-xl flex items-center gap-2 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Đã Check-in lúc {myCheckInTime}</span>
            </div>
          )}
        </div>
      </div>

      {/* Thống kê chỉ số nhanh */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Đúng giờ</p>
            <p className="text-lg font-black text-gray-900">280 <span className="text-xs font-normal text-gray-400">/ 320</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Đi muộn</p>
            <p className="text-lg font-black text-gray-900">18 <span className="text-xs font-normal text-gray-400">NV</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Về sớm</p>
            <p className="text-lg font-black text-gray-900">5 <span className="text-xs font-normal text-gray-400">NV</span></p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Vắng mặt</p>
            <p className="text-lg font-black text-gray-900">17 <span className="text-xs font-normal text-gray-400">NV</span></p>
          </div>
        </div>
      </div>

      {/* Thanh Lọc & Tìm Kiếm */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Ô tìm kiếm */}
          <div className="relative flex-1 md:w-64">
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
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
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
            <option value="dung_gio">Đúng giờ</option>
            <option value="di_muon">Đi muộn</option>
            <option value="ve_som">Về sớm</option>
            <option value="vang">Vắng mặt</option>
          </select>
        </div>

        {/* Picker Chọn Ngày */}
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl p-1 bg-gray-50/50">
          <button className="p-1.5 hover:bg-white rounded-lg text-gray-600 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 px-2 text-xs font-bold text-gray-800">
            <Calendar className="w-4 h-4 text-blue-600" />
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent border-none text-xs font-bold focus:outline-none text-gray-800 cursor-pointer"
            />
          </div>
          <button className="p-1.5 hover:bg-white rounded-lg text-gray-600 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bảng dữ liệu chấm công */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                <th className="py-3.5 px-5">Nhân viên</th>
                <th className="py-3.5 px-5">Ca làm việc</th>
                <th className="py-3.5 px-5">Check In</th>
                <th className="py-3.5 px-5">Check Out</th>
                <th className="py-3.5 px-5">Vị trí / Thiết bị</th>
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
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
                      />
                      <div>
                        <p className="font-bold text-gray-900">{rec.name}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">{rec.code} • {rec.department}</p>
                      </div>
                    </div>
                  </td>

                  {/* Ca làm việc */}
                  <td className="py-3.5 px-5 text-gray-600 font-semibold">
                    {rec.shift}
                  </td>

                  {/* Check In */}
                  <td className="py-3.5 px-5 font-bold text-gray-800">
                    {rec.checkIn}
                  </td>

                  {/* Check Out */}
                  <td className="py-3.5 px-5 font-bold text-gray-800">
                    {rec.checkOut}
                  </td>

                  {/* Vị trí */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate max-w-[150px]">{rec.location}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 block mt-0.5">{rec.device}</span>
                  </td>

                  {/* Trạng thái Badge */}
                  <td className="py-3.5 px-5">
                    {rec.status === 'dung_gio' && (
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Đúng giờ
                      </span>
                    )}
                    {rec.status === 'di_muon' && (
                      <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Đi muộn
                      </span>
                    )}
                    {rec.status === 've_som' && (
                      <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-blue-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Về sớm
                      </span>
                    )}
                    {rec.status === 'vang' && (
                      <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-rose-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Vắng mặt
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-5 text-right">
                    <button 
                      onClick={() => alert(`Chỉnh sửa bản ghi của ${rec.name}`)}
                      className="text-xs text-blue-600 font-bold hover:underline"
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Chấm công bổ sung */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Tạo đơn chấm công bổ sung</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-gray-600 mb-1">Mã nhân viên / Họ tên</label>
                <input 
                  type="text" 
                  placeholder="Nhập mã hoặc tên nhân viên..." 
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Ngày bổ sung</label>
                <input 
                  type="date" 
                  defaultValue="2026-09-18"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1">Giờ Check-in</label>
                  <input 
                    type="time" 
                    defaultValue="08:00"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Giờ Check-out</label>
                  <input 
                    type="time" 
                    defaultValue="17:30"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Lý do bổ sung</label>
                <textarea 
                  rows={3} 
                  placeholder="Nhập lý do (Ví dụ: Đội kỹ thuật đi gặp khách hàng bên ngoài...)"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={() => {
                  alert('Lưu đơn bổ sung thành công!');
                  setIsModalOpen(false);
                }}
                className="px-5 py-2.5 bg-[#1151c5] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                Lưu bổ sung
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}