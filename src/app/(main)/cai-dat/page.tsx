'use client';

import { useState } from 'react';
import {
  Sliders,
  Clock,
  ShieldCheck,
  Wifi,
  Bell,
  Save,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Camera,
  Users,
  Smartphone,
  Server,
  Lock,
  Globe,
  Plus,
  Trash2,
  RotateCcw
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'attendance' | 'shift' | 'security' | 'notification'>('attendance');
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 1. State Quy định chấm công
  const [attendanceSettings, setAttendanceSettings] = useState({
    workDaysPerWeek: '5.5',
    standardHoursPerDay: '8.0',
    allowLateMinutes: '15',
    earlyLeaveThreshold: '15',
    enableOvertimeAutoApprove: false,
    requireLocationCheckin: true,
    locationRadiusMeters: '100'
  });

  // 2. State Ca làm việc (Danh sách mẫu)
  const [shifts, setShifts] = useState([
    { id: '1', name: 'Ca Hành Chính', checkIn: '08:00', checkOut: '17:30', breakTime: '12:00 - 13:30', isDefault: true },
    { id: '2', name: 'Ca Sáng', checkIn: '06:00', checkOut: '14:00', breakTime: '10:00 - 10:30', isDefault: false },
    { id: '3', name: 'Ca Chiều', checkIn: '14:00', checkOut: '22:00', breakTime: '18:00 - 18:30', isDefault: false }
  ]);

  // 3. State Bảo mật & Xác thực
  const [securitySettings, setSecuritySettings] = useState({
    enableFaceID: true,
    faceMatchThreshold: '92',
    enableWifiIPRestrict: true,
    allowedIPs: '192.168.1.1, 113.190.232.14',
    enableGPSLocation: true,
    preventMockGPS: true
  });

  // 4. State Thông báo & Tích hợp
  const [notificationSettings, setNotificationSettings] = useState({
    notifyCheckinSuccess: true,
    notifyLateCheckin: true,
    notifyOvertimeReminder: true,
    sendEmailDailyReport: true,
    telegramBotToken: '5829103948:AAH...',
    telegramChatID: '-100192837482'
  });

  // Giả lập hành động lưu Cài đặt
  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSavedSuccess(true);
      setTimeout(() => setIsSavedSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6">
      {/* Header Trang */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            <Sliders className="w-6 h-6 text-blue-600" />
            <span>Cài Đặt Hệ Thống</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Thiết lập ca làm việc, quy định đi trễ/về sớm, bảo mật FaceID, IP công ty và tích hợp thông báo
          </p>
        </div>

        {/* Nút Hành Động Lưu Demo */}
        <div className="flex items-center gap-3">
          {isSavedSuccess && (
            <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 border border-emerald-200 text-xs font-bold px-3 py-2 rounded-xl animate-in fade-in zoom-in duration-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>Đã lưu thành công!</span>
            </div>
          )}

          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#1151c5] hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Đang lưu...' : 'Lưu tất cả thay đổi'}</span>
          </button>
        </div>
      </div>

      {/* Grid Layout 2 Cột: Sidebar Tab & Nội dung Cài đặt */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-1 bg-white p-2 rounded-2xl border border-gray-100 shadow-xs h-fit">
          <button
            onClick={() => setActiveTab('attendance')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'attendance'
                ? 'bg-blue-50 text-blue-600 shadow-2xs'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Quy định Chấm công</span>
          </button>

          <button
            onClick={() => setActiveTab('shift')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'shift'
                ? 'bg-blue-50 text-blue-600 shadow-2xs'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Quản lý Ca làm việc</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'security'
                ? 'bg-blue-50 text-blue-600 shadow-2xs'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Bảo mật FaceID & IP</span>
          </button>

          <button
            onClick={() => setActiveTab('notification')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'notification'
                ? 'bg-blue-50 text-blue-600 shadow-2xs'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Thông báo & Telegram</span>
          </button>
        </div>

        {/* Nội dung chi tiết từng Tab */}
        <div className="lg:col-span-3 space-y-6">
          {/* TAB 1: QUY ĐỊNH CHẤM CÔNG */}
          {activeTab === 'attendance' && (
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-3">
                <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Quy định giờ giấc & Đi trễ về sớm</span>
                </h2>
                <p className="text-xs text-gray-400 font-medium mt-0.5">
                  Cấu hình tham số tính công chuẩn cho toàn thể nhân viên trong công ty
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                <div>
                  <label className="block text-gray-700 mb-1.5">Số ngày làm việc/tuần</label>
                  <select
                    value={attendanceSettings.workDaysPerWeek}
                    onChange={(e) =>
                      setAttendanceSettings({ ...attendanceSettings, workDaysPerWeek: e.target.value })
                    }
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="5.0">5.0 ngày (Thứ 2 - Thứ 6)</option>
                    <option value="5.5">5.5 ngày (Thứ 2 - Sáng Thứ 7)</option>
                    <option value="6.0">6.0 ngày (Thứ 2 - Thứ 7)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1.5">Số giờ làm việc tiêu chuẩn/ngày</label>
                  <input
                    type="number"
                    value={attendanceSettings.standardHoursPerDay}
                    onChange={(e) =>
                      setAttendanceSettings({ ...attendanceSettings, standardHoursPerDay: e.target.value })
                    }
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1.5">Nhỡ cho phép Đi trễ tối đa (Phút)</label>
                  <input
                    type="number"
                    value={attendanceSettings.allowLateMinutes}
                    onChange={(e) =>
                      setAttendanceSettings({ ...attendanceSettings, allowLateMinutes: e.target.value })
                    }
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <p className="text-[10px] text-gray-400 mt-1 font-normal">Quá số phút này sẽ bị tính 1 lượt đi trễ</p>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1.5">Ngưỡng Về sớm tính vi phạm (Phút)</label>
                  <input
                    type="number"
                    value={attendanceSettings.earlyLeaveThreshold}
                    onChange={(e) =>
                      setAttendanceSettings({ ...attendanceSettings, earlyLeaveThreshold: e.target.value })
                    }
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-900">Tự động duyệt Làm thêm giờ (OT)</p>
                    <p className="text-[11px] text-gray-400 font-medium">
                      Cho phép tính OT tự động nếu nhân viên checkout muộn hơn ca quy định 30 phút
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={attendanceSettings.enableOvertimeAutoApprove}
                    onChange={(e) =>
                      setAttendanceSettings({
                        ...attendanceSettings,
                        enableOvertimeAutoApprove: e.target.checked
                      })
                    }
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CA LÀM VIỆC */}
          {activeTab === 'shift' && (
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Danh sách Ca làm việc</span>
                  </h2>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    Thêm mới và chỉnh sửa các khung giờ ca làm việc áp dụng cho phòng ban
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newShift = {
                      id: Date.now().toString(),
                      name: 'Ca Tăng Cường',
                      checkIn: '18:00',
                      checkOut: '22:00',
                      breakTime: 'Không nghỉ',
                      isDefault: false
                    };
                    setShifts([...shifts, newShift]);
                  }}
                  className="flex items-center gap-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs px-3 py-2 rounded-xl transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm ca mới</span>
                </button>
              </div>

              <div className="space-y-3">
                {shifts.map((shift) => (
                  <div
                    key={shift.id}
                    className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-gray-900">{shift.name}</span>
                        {shift.isDefault && (
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                            Mặc định
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 font-semibold">
                        Vào ca: <strong className="text-gray-800">{shift.checkIn}</strong> — Ra ca:{' '}
                        <strong className="text-gray-800">{shift.checkOut}</strong> (Nghỉ trưa: {shift.breakTime})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShifts(shifts.filter((s) => s.id !== shift.id))}
                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BẢO MẬT FACEID & IP */}
          {activeTab === 'security' && (
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-3">
                <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Bảo mật chống gian lận chấm công</span>
                </h2>
                <p className="text-xs text-gray-400 font-medium mt-0.5">
                  Cấu hình nhận diện khuôn mặt FaceID AI và giới hạn dải IP Wi-Fi công ty
                </p>
              </div>

              <div className="space-y-5 text-xs font-semibold">
                {/* FaceID Toggle */}
                <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Camera className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="font-bold text-gray-900">Bắt buộc xác thực FaceID qua Camera</p>
                        <p className="text-[11px] text-gray-400 font-medium">
                          Nhận diện khuôn mặt thực tế chống chụp ảnh giả mạo
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={securitySettings.enableFaceID}
                      onChange={(e) =>
                        setSecuritySettings({ ...securitySettings, enableFaceID: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  {securitySettings.enableFaceID && (
                    <div className="pt-3 border-t border-gray-200/60">
                      <label className="block text-gray-700 mb-1">Độ chính xác FaceID yêu cầu (%)</label>
                      <input
                        type="number"
                        value={securitySettings.faceMatchThreshold}
                        onChange={(e) =>
                          setSecuritySettings({ ...securitySettings, faceMatchThreshold: e.target.value })
                        }
                        className="w-full sm:w-48 p-2 bg-white border border-gray-200 rounded-xl focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Giới hạn Wi-Fi IP */}
                <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Wifi className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="font-bold text-gray-900">Giới hạn IP Wi-Fi Văn phòng</p>
                        <p className="text-[11px] text-gray-400 font-medium">
                          Chỉ cho phép chấm công khi kết nối đúng dải mạng Wi-Fi công ty
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={securitySettings.enableWifiIPRestrict}
                      onChange={(e) =>
                        setSecuritySettings({ ...securitySettings, enableWifiIPRestrict: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  {securitySettings.enableWifiIPRestrict && (
                    <div className="pt-3 border-t border-gray-200/60">
                      <label className="block text-gray-700 mb-1">
                        Danh sách IP hợp lệ (Phân cách bằng dấu phẩy)
                      </label>
                      <input
                        type="text"
                        value={securitySettings.allowedIPs}
                        onChange={(e) =>
                          setSecuritySettings({ ...securitySettings, allowedIPs: e.target.value })
                        }
                        className="w-full p-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: THÔNG BÁO & TELEGRAM */}
          {activeTab === 'notification' && (
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-3">
                <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-600" />
                  <span>Cấu hình Kênh thông báo tự động</span>
                </h2>
                <p className="text-xs text-gray-400 font-medium mt-0.5">
                  Tích hợp Bot Telegram báo cáo biến động chấm công thời gian thực
                </p>
              </div>

              <div className="space-y-4 text-xs font-semibold">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">Gửi thông báo ngay khi Check-in thành công</p>
                    <p className="text-[11px] text-gray-400 font-medium">Báo qua ứng dụng di động cá nhân</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.notifyCheckinSuccess}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, notifyCheckinSuccess: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-gray-900">Cảnh báo Trưởng phòng khi có nhân viên đi trễ</p>
                    <p className="text-[11px] text-gray-400 font-medium">Gửi tức thì khi hết giờ chờ cho phép</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.notifyLateCheckin}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, notifyLateCheckin: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <p className="text-sm font-black text-gray-900">Tích hợp Telegram Bot</p>
                  <div>
                    <label className="block text-gray-700 mb-1">Telegram Bot Token</label>
                    <input
                      type="password"
                      value={notificationSettings.telegramBotToken}
                      onChange={(e) =>
                        setNotificationSettings({ ...notificationSettings, telegramBotToken: e.target.value })
                      }
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Telegram Group Chat ID</label>
                    <input
                      type="text"
                      value={notificationSettings.telegramChatID}
                      onChange={(e) =>
                        setNotificationSettings({ ...notificationSettings, telegramChatID: e.target.value })
                      }
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}