"use client"

import React, { useState, useEffect } from 'react';
import {
  Clock,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  User,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Building2,
  Users,
  Key,
  Smartphone,
  ChevronRight,
  HelpCircle,
  Globe2,
  Check,
  RefreshCw,
  X,
  Send,
  ShieldAlert,
  Zap,
  ArrowLeft,
  Laptop
} from 'lucide-react';

const DEMO_ACCOUNTS = [
  {
    role: 'Quản trị viên HR',
    email: 'admin.hr@worksync.vn',
    password: 'Password123!',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    desc: 'Quyền Quản trị toàn hệ thống, phê duyệt công & lương',
    badge: 'Admin'
  },
  {
    role: 'Trưởng phòng / Manager',
    email: 'manager.tech@worksync.vn',
    password: 'Password123!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    desc: 'Duyệt ca kíp, phê duyệt đơn nghỉ phép phòng ban',
    badge: 'Manager'
  },
  {
    role: 'Nhân viên',
    email: 'employee.dev@worksync.vn',
    password: 'Password123!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    desc: 'Xem bảng công cá nhân, chấm công GPS/FaceID',
    badge: 'Employee'
  }
];

export default function App() {
  // Form State
  const [loginIdentifier, setLoginIdentifier] = useState('admin.hr@worksync.vn');
  const [password, setPassword] = useState('Password123!');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginMethod, setLoginMethod] = useState('standard'); // 'standard' | 'qr' | 'sso'

  // UI Interactive States
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState(0); // Demo preset tab
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  
  // Forgot Password Modal State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP Sent Success
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');

  // QR Demo state
  const [qrScanned, setQrScanned] = useState(false);
  const [qrTimer, setQrTimer] = useState(45);

  useEffect(() => {
    let interval;
    if (loginMethod === 'qr' && qrTimer > 0) {
      interval = setInterval(() => {
        setQrTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [loginMethod, qrTimer]);

  const handleSelectDemoAccount = (acc, index) => {
    setActiveTab(index);
    setLoginIdentifier(acc.email);
    setPassword(acc.password);
    if (errors.loginIdentifier || errors.password) {
      setErrors({});
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!loginIdentifier.trim()) {
      newErrors.loginIdentifier = 'Vui lòng nhập Email công việc hoặc Mã nhân viên';
    }
    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải từ 6 ký tự trở lên';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate backend auth check
    setTimeout(() => {
      setIsLoading(false);
      // Determine logged-in account metadata
      const matched = DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === loginIdentifier.toLowerCase());
      setLoggedInUser(matched || {
        role: 'Tài khoản Doanh nghiệp',
        email: loginIdentifier,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        badge: 'Custom'
      });
      setIsSuccessModalOpen(true);
    }, 1200);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      setForgotError('Vui lòng nhập đúng định dạng Email công việc');
      return;
    }
    setForgotError('');
    setIsForgotLoading(true);

    setTimeout(() => {
      setIsForgotLoading(false);
      setForgotStep(2);
    }, 1000);
  };

  const handleSimulateQRScan = () => {
    setQrScanned(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoggedInUser(DEMO_ACCOUNTS[0]);
      setIsSuccessModalOpen(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-[#1151c5] selection:text-white relative overflow-x-hidden">
      
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#1151c5]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* TOP BRAND HEADER NAVIGATION */}
      {}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl fixed top-0 w-full z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1151c5] via-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-[#1151c5]/30 group-hover:scale-105 transition-transform duration-200">
              <Clock className="w-5.5 h-5.5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                WorkSync
                <span className="text-[10px] uppercase font-extrabold tracking-widest bg-[#1151c5]/20 text-blue-400 px-2 py-0.5 rounded-md border border-[#1151c5]/30">
                  Enterprise 4.0
                </span>
              </span>
            </div>
          </a>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Hệ thống Uptime 99.99%</span>
            </div>
            
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Demo: Chuyển sang Trang Đăng ký Doanh nghiệp mới');
              }}
              className="text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Đăng ký dùng thử</span>
              <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER - MODERN SPLIT PANEL */}
      {}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 pt-16 min-h-[calc(100vh-4rem)]">
        
        {/* LEFT COLUMN: BRAND PROPOSITION & LIVE FEATURE HIGHLIGHTS */}
        {}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-[#0a235c] p-6 sm:p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden border-r border-slate-800/80">
          
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Top Value Pill */}
          <div className="relative z-10 space-y-8 my-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1151c5]/15 border border-[#1151c5]/30 text-blue-400 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Cổng Đăng Nhập Quản Trị Nhân Sự Tập Trung</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                Quản lý Chấm công <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-200 to-sky-300 bg-clip-text text-transparent">
                  Chính xác & Thông minh.
                </span>
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal max-w-lg">
                Giải pháp SaaS chuẩn doanh nghiệp kết hợp AI Chấm công khuôn mặt, định vị GPS Geofencing, tự động hóa tính lương và quản lý ca kíp toàn diện.
              </p>
            </div>

            {/* Quick System Stats Cards */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-lg sm:text-xl font-extrabold text-white">1,500+</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Doanh nghiệp</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-lg sm:text-xl font-extrabold text-blue-400">250K+</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Nhân sự sử dụng</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 backdrop-blur-sm">
                <div className="text-lg sm:text-xl font-extrabold text-emerald-400">99.9%</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Chính xác ca công</div>
              </div>
            </div>

            {/* Security Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Mã hóa dữ liệu 256-bit AES & Chứng nhận ISO/IEC 27001</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <span>Đồng bộ dữ liệu thời gian thực (Real-time Cloud Sync)</span>
              </div>
            </div>

            {/* Dynamic Banner Footer Badge */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800/90 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">WorkSync Cloud Workspace</p>
                    <p className="text-[11px] text-slate-400">Phiên bản v4.28.0 (Enterprise Ready)</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-1 rounded-md border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active
                </span>
              </div>
            </div>
          </div>

          {/* Copyright & Support */}
          <div className="relative z-10 pt-6 mt-auto flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-900">
            <span>© 2026 WorkSync Inc.</span>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert('Hotline hỗ trợ kỹ thuật WorkSync: 1900 6868 (24/7)'); }}
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" /> Hỗ trợ 24/7
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE LOGIN PANEL */}
        {}
        <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-10 lg:p-14 flex items-center justify-center relative">
          <div className="w-full max-w-lg space-y-6">
            
            {/* DEMO AUTO-FILL PRESET SELECTOR (Interactive Helper) */}
            {}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-blue-500/30 rounded-2xl p-4 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Chọn nhanh tài khoản mẫu (Demo Live):
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">Click điền tự động</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {DEMO_ACCOUNTS.map((acc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectDemoAccount(acc, idx)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between group ${
                      activeTab === idx
                        ? 'bg-[#1151c5]/20 border-[#1151c5] shadow-md shadow-[#1151c5]/20 ring-1 ring-[#1151c5]'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <img src={acc.avatar} alt={acc.role} className="w-6 h-6 rounded-full object-cover border border-slate-700" />
                      <span className="text-[11px] font-bold text-white truncate">{acc.badge}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 truncate group-hover:text-slate-300">{acc.role}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Login Form Header */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Đăng nhập hệ thống
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Nhập thông tin xác thực để truy cập bảng điều khiển chấm công.
              </p>
            </div>

            {/* LOGIN METHOD TOGGLE (Standard Form vs QR Scan vs SSO) */}
            {}
            <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setLoginMethod('standard')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                  loginMethod === 'standard'
                    ? 'bg-[#1151c5] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>Mật khẩu</span>
              </button>

              <button
                type="button"
                onClick={() => setLoginMethod('qr')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                  loginMethod === 'qr'
                    ? 'bg-[#1151c5] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Quét mã QR App</span>
              </button>

              <button
                type="button"
                onClick={() => setLoginMethod('sso')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                  loginMethod === 'sso'
                    ? 'bg-[#1151c5] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>SSO Doanh nghiệp</span>
              </button>
            </div>

            {/* TAB CONTENT 1: STANDARD EMAIL/PASSWORD LOGIN */}
            {loginMethod === 'standard' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4" noValidate>
                {/* Email / ID Input */}
                {}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email công việc / Mã nhân viên <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => {
                        setLoginIdentifier(e.target.value);
                        if (errors.loginIdentifier) setErrors((prev) => ({ ...prev, loginIdentifier: '' }));
                      }}
                      placeholder="VD: admin.hr@worksync.vn hoặc NV-8892"
                      className={`w-full pl-10 pr-4 py-3 bg-slate-900 border ${
                        errors.loginIdentifier ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-[#1151c5] focus:ring-[#1151c5]'
                      } rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all`}
                    />
                  </div>
                  {errors.loginIdentifier && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {errors.loginIdentifier}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Mật khẩu <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsForgotModalOpen(true)}
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                      }}
                      placeholder="••••••••••••"
                      className={`w-full pl-10 pr-10 py-3 bg-slate-900 border ${
                        errors.password ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-[#1151c5] focus:ring-[#1151c5]'
                      } rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                      title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-[#1151c5] focus:ring-[#1151c5] focus:ring-offset-slate-950 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                      Duy trì đăng nhập trên thiết bị này (30 ngày)
                    </span>
                  </label>
                </div>

                {/* Submit Login Button */}
                {}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#1151c5] via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-[#1151c5]/30 hover:shadow-[#1151c5]/50 transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed mt-2 group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Đang xác thực tài khoản WorkSync...</span>
                    </>
                  ) : (
                    <>
                      <span>Đăng Nhập Vào Hệ Thống</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB CONTENT 2: QR CODE SCAN LOGIN */}
            {}
            {loginMethod === 'qr' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">Đăng nhập nhanh không cần mật khẩu</h3>
                  <p className="text-xs text-slate-400">Mở ứng dụng WorkSync Mobile trên điện thoại và quét mã QR dưới đây</p>
                </div>

                {/* Mock Visual QR Container */}
                <div className="relative w-48 h-48 mx-auto bg-white p-3 rounded-2xl shadow-2xl flex flex-col items-center justify-center border-4 border-[#1151c5]/30 group">
                  <div className="w-full h-full border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center relative overflow-hidden bg-slate-950">
                    {/* Simulated Animated Scan Line */}
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent top-0 animate-bounce" />
                    
                    <QrCode className="w-32 h-32 text-slate-100" />
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-[1px]">
                      <div className="w-10 h-10 bg-[#1151c5] rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <RefreshCw className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '10s' }} />
                  <span>Mã hết hạn sau <strong className="text-amber-400 font-mono">{qrTimer}s</strong></span>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateQRScan}
                  disabled={isLoading}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>[Giả lập Demo] Đã quét thành công bằng App Mobile</span>
                </button>
              </div>
            )}

            {/* TAB CONTENT 3: ENTERPRISE SSO LOGIN */}
            {}
            {loginMethod === 'sso' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">Đăng nhập Single Sign-On (SSO)</h3>
                  <p className="text-xs text-slate-400">Sử dụng hệ thống định danh doanh nghiệp SAML 2.0 / OAuth2</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Domain Doanh nghiệp</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      defaultValue="vintech"
                      className="w-full pl-3 pr-2 py-2.5 bg-slate-950 border border-slate-800 rounded-l-xl text-xs text-white focus:outline-none focus:border-[#1151c5]"
                    />
                    <span className="bg-slate-800 border border-l-0 border-slate-800 text-slate-400 px-3 py-2.5 text-xs font-mono rounded-r-xl">
                      .worksync.vn
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert('Demo: Chuyển hướng tới Cổng xác thực Okta / Azure AD Enterprise SSO')}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Tiếp tục tới Cổng SSO Công ty</span>
                </button>
              </div>
            )}

            {/* THIRD-PARTY QUICK LOGIN OPTIONS */}
            {}
            <div className="space-y-3 pt-2">
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-800" />
                <span className="flex-shrink mx-4 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  Hoặc đăng nhập nhanh bằng
                </span>
                <div className="flex-grow border-t border-slate-800" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => alert('Demo: Đăng nhập thành công qua Google Workspace Doanh nghiệp')}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 transition-all hover:border-slate-700"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" />
                    <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z" />
                    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
                  </svg>
                  <span>Google Workspace</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert('Demo: Đăng nhập thành công qua Microsoft Azure Active Directory')}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 transition-all hover:border-slate-700"
                >
                  <svg className="w-4 h-4" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z"/>
                    <path fill="#81bc06" d="M12 1h10v10H12z"/>
                    <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                    <path fill="#ffba08" d="M12 12h10v10H12z"/>
                  </svg>
                  <span>Microsoft 365</span>
                </button>
              </div>
            </div>

            {/* Footer Terms Note */}
            <p className="text-[11px] text-center text-slate-500 pt-2">
              Bằng việc đăng nhập, bạn đồng ý tuân thủ{' '}
              <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-400 underline">Quy định Bảo mật</a>{' '}
              & <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-400 underline">Điều khoản sử dụng</a> của WorkSync.
            </p>

          </div>
        </div>
      </main>

      {/* MODAL 1: FORGOT PASSWORD INTERACTIVE DIALOG */}
      {}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => {
                setIsForgotModalOpen(false);
                setForgotStep(1);
                setForgotEmail('');
              }}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {forgotStep === 1 ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Khôi phục mật khẩu WorkSync</h3>
                    <p className="text-xs text-slate-400">Nhập email công việc đã đăng ký hệ thống</p>
                  </div>
                </div>

                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email công việc</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="VD: admin.hr@worksync.vn"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-[#1151c5]"
                      />
                    </div>
                    {forgotError && <p className="text-[11px] text-rose-400 mt-1">{forgotError}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isForgotLoading}
                    className="w-full bg-[#1151c5] hover:bg-blue-600 text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {isForgotLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Gửi mã xác thực khôi phục</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4 py-2">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Đã gửi liên kết khôi phục!</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Hệ thống đã gửi mã OTP và đường link tạo mật khẩu mới tới email <strong className="text-blue-400">{forgotEmail}</strong>. Vui lòng kiểm tra hộp thư.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsForgotModalOpen(false);
                    setForgotStep(1);
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-xl border border-slate-700"
                >
                  Quay lại Đăng nhập
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: SUCCESSFUL LOGIN OVERLAY & DASHBOARD REDIRECT DEMO */}
      {}
      {isSuccessModalOpen && loggedInUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
            
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="inline-block text-[10px] uppercase font-bold tracking-widest bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Xác thực thành công
              </span>
              <h3 className="text-2xl font-black text-white">Chào mừng trở lại!</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Hệ thống đang chuẩn bị không gian làm việc cho bạn.
              </p>
            </div>

            {/* Profile Summary Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-left flex items-center gap-3">
              <img
                src={loggedInUser.avatar}
                alt={loggedInUser.role}
                className="w-12 h-12 rounded-xl object-cover border border-blue-500/30"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{loggedInUser.role}</p>
                <p className="text-[11px] text-slate-400 truncate">{loggedInUser.email}</p>
                <span className="text-[10px] text-blue-400 font-medium">Quyền: {loggedInUser.badge || 'Enterprise User'}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  alert(`Demo: Chuyển hướng thành công vào Trang Bảng điều khiển (Dashboard) của ${loggedInUser.role}`);
                }}
                className="w-full bg-gradient-to-r from-[#1151c5] to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white font-bold text-xs py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-[#1151c5]/30 flex items-center justify-center gap-2"
              >
                <span>Vào Bảng Điều Khiển (Dashboard)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs py-2 rounded-xl"
              >
                Đăng xuất / Chọn tài khoản khác
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}