'use client';

import { useState } from 'react';
import {
  Bell,
  Plus,
  Search,
  Check,
  CheckCheck,
  Trash2,
  AlertTriangle,
  Megaphone,
  Calendar,
  CreditCard,
  Building2,
  Info,
  X,
  Send,
  Pin,
  Filter
} from 'lucide-react';

// Kiểu dữ liệu Thông báo
interface NotificationItem {
  id: string;
  code: string;
  title: string;
  content: string;
  category: 'system' | 'leave' | 'payroll' | 'urgent';
  sender: string;
  senderAvatar: string;
  targetDepartment: string; // Tất cả, Kinh doanh, Kỹ thuật...
  createdAt: string;
  isRead: boolean;
  isPinned?: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    code: 'TB-2026-09',
    title: 'Thông báo nghỉ lễ Quốc Khánh & Điểm danh bổ sung',
    content: 'Ban Giám đốc thông báo lịch nghỉ lễ chính thức và yêu cầu toàn bộ nhân viên hoàn thành duyệt công trước ngày 25/09/2026.',
    category: 'urgent',
    sender: 'Ban Giám Đốc',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    targetDepartment: 'Tất cả phòng ban',
    createdAt: '10 phút trước',
    isRead: false,
    isPinned: true
  },
  {
    id: '2',
    code: 'TB-2026-08',
    title: 'Đã hoàn tất chi trả lương Tháng 08/2026',
    content: 'Phòng Tài chính - Nhân sự đã hoàn tất chuyển khoản phiếu lương Tháng 08. Vui lòng kiểm tra tài khoản ngân hàng cá nhân.',
    category: 'payroll',
    sender: 'Phòng Kế Toán',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    targetDepartment: 'Tất cả phòng ban',
    createdAt: '2 giờ trước',
    isRead: false
  },
  {
    id: '3',
    code: 'TB-2026-05',
    title: 'Yêu cầu phê duyệt đơn xin nghỉ phép tồn đọng',
    content: 'Các Trưởng phòng lưu ý có 3 đơn xin nghỉ phép đang ở trạng thái Chờ duyệt. Vui lòng xử lý trước 17h00 hôm nay.',
    category: 'leave',
    sender: 'Hệ Thống Tự Động',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    targetDepartment: 'Khối Quản Lý',
    createdAt: 'Hôm qua',
    isRead: true
  },
  {
    id: '4',
    code: 'TB-2026-01',
    title: 'Bảo trì hệ thống máy chấm công khuôn mặt FaceID',
    content: 'Hệ thống chấm công khuôn mặt tại Sảnh tầng 1 sẽ thực hiện nâng cấp firmware trong khoảng thời gian từ 12h00 - 13h00.',
    category: 'system',
    sender: 'Phòng IT',
    senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    targetDepartment: 'Kỹ thuật',
    createdAt: '15/09/2026',
    isRead: true
  }
];

export default function NotificationManagementPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterReadStatus, setFilterReadStatus] = useState<'all' | 'unread'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<NotificationItem | null>(null);

  // Form Đơn Thông Báo Mới
  const [newNoticeForm, setNewNoticeForm] = useState({
    title: '',
    content: '',
    category: 'system' as NotificationItem['category'],
    targetDepartment: 'Tất cả phòng ban',
    isPinned: false
  });

  // Helper hiển thị Icon theo phân loại
  const getCategoryBadge = (category: NotificationItem['category']) => {
    switch (category) {
      case 'urgent':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 font-extrabold px-2.5 py-0.5 rounded-md text-[11px]">
            <AlertTriangle className="w-3 h-3 text-rose-600" /> Khẩn cấp
          </span>
        );
      case 'payroll':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold px-2.5 py-0.5 rounded-md text-[11px]">
            <CreditCard className="w-3 h-3 text-emerald-600" /> Lương & Thưởng
          </span>
        );
      case 'leave':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 font-extrabold px-2.5 py-0.5 rounded-md text-[11px]">
            <Calendar className="w-3 h-3 text-amber-600" /> Nghỉ phép
          </span>
        );
      case 'system':
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 font-extrabold px-2.5 py-0.5 rounded-md text-[11px]">
            <Info className="w-3 h-3 text-blue-600" /> Hệ thống
          </span>
        );
    }
  };

  // Đánh dấu 1 thông báo là đã đọc
  const handleToggleRead = (id: string) => {
    setNotifications(
      notifications.map((item) =>
        item.id === id ? { ...item, isRead: !item.isRead } : item
      )
    );
  };

  // Đánh dấu tất cả là đã đọc
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((item) => ({ ...item, isRead: true })));
  };

  // Xóa thông báo
  const handleDeleteNotice = (id: string) => {
    setNotifications(notifications.filter((item) => item.id !== id));
  };

  // Tạo & Phát thông báo mới
  const handleCreateNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeForm.title || !newNoticeForm.content) return;

    const newNotice: NotificationItem = {
      id: Date.now().toString(),
      code: `TB-2026-0${notifications.length + 1}`,
      title: newNoticeForm.title,
      content: newNoticeForm.content,
      category: newNoticeForm.category,
      sender: 'Ban Quản Lý',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      targetDepartment: newNoticeForm.targetDepartment,
      createdAt: 'Vừa xong',
      isRead: false,
      isPinned: newNoticeForm.isPinned
    };

    setNotifications([newNotice, ...notifications]);
    setIsModalOpen(false);
    setNewNoticeForm({
      title: '',
      content: '',
      category: 'system',
      targetDepartment: 'Tất cả phòng ban',
      isPinned: false
    });
  };

  // Lọc thông báo
  const filteredNotifications = notifications.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchRead = filterReadStatus === 'all' || (filterReadStatus === 'unread' && !item.isRead);

    return matchSearch && matchCat && matchRead;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            <span>Trung Tâm Thông Báo</span>
            {unreadCount > 0 && (
              <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {unreadCount} mới
              </span>
            )}
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Gửi thông báo toàn công ty, nhắc nhở chấm công, duyệt phép và thông báo lương
          </p>
        </div>

        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              <CheckCheck className="w-4 h-4 text-blue-600" />
              <span>Đánh dấu tất cả đã đọc</span>
            </button>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#1151c5] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Megaphone className="w-4 h-4" />
            <span>Phát thông báo mới</span>
          </button>
        </div>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Tổng thông báo</p>
            <p className="text-lg font-black text-gray-900">{notifications.length}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Tin khẩn cấp</p>
            <p className="text-lg font-black text-gray-900">
              {notifications.filter((n) => n.category === 'urgent').length}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Tin lương thưởng</p>
            <p className="text-lg font-black text-gray-900">
              {notifications.filter((n) => n.category === 'payroll').length}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Pin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Đã ghim ưu tiên</p>
            <p className="text-lg font-black text-gray-900">
              {notifications.filter((n) => n.isPinned).length}
            </p>
          </div>
        </div>
      </div>

      {/* Bộ Lọc & Tìm Kiếm */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Ô tìm kiếm */}
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo tiêu đề, nội dung..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl text-xs font-medium text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Lọc Phân loại */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">Tất cả phân loại</option>
            <option value="urgent">Khẩn cấp</option>
            <option value="payroll">Lương & Thưởng</option>
            <option value="leave">Nghỉ phép</option>
            <option value="system">Hệ thống</option>
          </select>

          {/* Lọc Trạng thái đã đọc */}
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterReadStatus('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                filterReadStatus === 'all' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilterReadStatus('unread')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                filterReadStatus === 'unread' ? 'bg-white text-blue-600 shadow-2xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Chưa đọc
            </button>
          </div>
        </div>
      </div>

      {/* Danh sách Thông báo */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400 font-medium text-xs">
            Không tìm thấy thông báo nào phù hợp
          </div>
        ) : (
          filteredNotifications.map((notice) => (
            <div
              key={notice.id}
              className={`bg-white rounded-2xl border p-4 transition-all duration-200 relative group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                !notice.isRead
                  ? 'border-blue-200 bg-blue-50/20 shadow-2xs'
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1">
                {/* Avatar Người gửi */}
                <img
                  src={notice.senderAvatar}
                  alt={notice.sender}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 shrink-0 mt-0.5"
                />

                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {notice.isPinned && (
                      <span className="p-1 bg-amber-50 text-amber-600 rounded-md" title="Đã ghim">
                        <Pin className="w-3 h-3 fill-amber-500" />
                      </span>
                    )}
                    {getCategoryBadge(notice.category)}
                    <span className="text-[10px] font-bold text-gray-400">• {notice.createdAt}</span>
                    <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                      {notice.targetDepartment}
                    </span>
                  </div>

                  <h3
                    onClick={() => {
                      setSelectedNotice(notice);
                      if (!notice.isRead) handleToggleRead(notice.id);
                    }}
                    className={`text-sm font-bold cursor-pointer hover:text-blue-600 transition-colors line-clamp-1 ${
                      !notice.isRead ? 'text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    {notice.title}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {notice.content}
                  </p>
                </div>
              </div>

              {/* Thao tác tương tác */}
              <div className="flex items-center gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto justify-end shrink-0">
                <button
                  onClick={() => handleToggleRead(notice.id)}
                  className={`p-2 rounded-xl text-xs font-bold transition-colors ${
                    notice.isRead
                      ? 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                      : 'text-blue-600 hover:bg-blue-100 bg-blue-50'
                  }`}
                  title={notice.isRead ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'}
                >
                  <Check className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDeleteNotice(notice.id)}
                  className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Xóa thông báo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Tạo Thông Báo Mới */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-blue-600" />
                <span>Phát thông báo toàn hệ thống</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNotification} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-gray-600 mb-1">Tiêu đề thông báo *</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập tiêu đề thông báo ngắn gọn..."
                  value={newNoticeForm.title}
                  onChange={(e) => setNewNoticeForm({ ...newNoticeForm, title: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1">Phân loại</label>
                  <select
                    value={newNoticeForm.category}
                    onChange={(e) => setNewNoticeForm({ ...newNoticeForm, category: e.target.value as any })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="system">Thông báo hệ thống</option>
                    <option value="urgent">Thông báo khẩn cấp</option>
                    <option value="payroll">Chế độ & Lương thưởng</option>
                    <option value="leave">Nghỉ phép & Công xá</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Đối tượng nhận</label>
                  <select
                    value={newNoticeForm.targetDepartment}
                    onChange={(e) => setNewNoticeForm({ ...newNoticeForm, targetDepartment: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Tất cả phòng ban">Tất cả phòng ban</option>
                    <option value="Kinh doanh">Khối Kinh doanh</option>
                    <option value="Kỹ thuật">Khối Kỹ thuật</option>
                    <option value="Marketing">Khối Marketing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Nội dung thông báo chi tiết *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Soạn nội dung chi tiết gửi tới nhân viên..."
                  value={newNoticeForm.content}
                  onChange={(e) => setNewNoticeForm({ ...newNoticeForm, content: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                ></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPinned"
                  checked={newNoticeForm.isPinned}
                  onChange={(e) => setNewNoticeForm({ ...newNoticeForm, isPinned: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <label htmlFor="isPinned" className="text-gray-700 cursor-pointer">
                  Ghim thông báo này lên đầu trang
                </label>
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
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#1151c5] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi thông báo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xem Nội Dung Chi Tiết */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                {getCategoryBadge(selectedNotice.category)}
                <span className="text-xs font-bold text-gray-400">• {selectedNotice.createdAt}</span>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h2 className="text-base font-extrabold text-gray-900 leading-snug">{selectedNotice.title}</h2>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 font-medium">
                <img src={selectedNotice.senderAvatar} className="w-5 h-5 rounded-full" />
                <span>Người gửi: <strong className="text-gray-800">{selectedNotice.sender}</strong></span>
                <span>• Gửi tới: <strong className="text-gray-800">{selectedNotice.targetDepartment}</strong></span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs text-gray-700 leading-relaxed font-medium">
              {selectedNotice.content}
            </div>

            <button
              onClick={() => setSelectedNotice(null)}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}