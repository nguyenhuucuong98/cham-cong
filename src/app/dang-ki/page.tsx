"use client"
import React, { useState, useEffect } from 'react';
import {
  Clock,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  User,
  Phone,
  Briefcase,
  Star,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  Award,
  Globe2,
  Check,
  Zap,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link'
export default function App() {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phone: '',
    password: '',
    companyName: '',
    companySize: '11-50',
    industry: 'Technology',
    agreeTerms: true
  });

  // UI Interactive States
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0); // 0 to 4
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "WorkSync đã giúp VinTech cắt giảm 85% thời gian tổng hợp công hàng tháng. Tính năng chấm công khuôn mặt AI cực kỳ chuẩn xác!",
      author: "Trần Minh Hoàng",
      role: "CHRO",
      company: "VinTech Group (500+ nhân sự)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    },
    {
      quote: "Giải pháp quản lý ca kíp linh hoạt xuất sắc. Nhân viên chi nhánh đều khen trải nghiệm mobile app mượt mà và minh bạch.",
      author: "Lê Thu Thảo",
      role: "Operations Director",
      company: "Highlands Coffee Retail",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
    },
    {
      quote: "Hệ thống báo cáo tự động tính lương theo thời gian thực giúp chúng tôi tiết kiệm hàng trăm giờ lao động mỗi quý.",
      author: "Nguyễn Quốc Bảo",
      role: "CEO & Founder",
      company: "LogiSpeed Vietnam",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const calculatePasswordStrength = (pass) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, password: value }));
    setPasswordStrength(calculatePasswordStrength(value));
    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên';
    
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'Vui lòng nhập email công việc';
    } else if (!/\S+@\S+\.\S+/.test(formData.workEmail)) {
      newErrors.workEmail = 'Email không đúng định dạng (VD: name@company.com)';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{9,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ (9-11 chữ số)';
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng tạo mật khẩu';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất 8 ký tự';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Vui lòng nhập tên doanh nghiệp';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Bạn cần đồng ý với Điều khoản dịch vụ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate Server Request delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccessModalOpen(true);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Bar Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md fixed top-0 w-full z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <span className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                <img src="./images/logo.png" width="42" atl={process.env.NEXT_PUBLIC_IMG_ATL} className="rounded-lg"/>
                <span className="text-[10px] uppercase font-extrabold tracking-widest bg-[#1151c5]/20 text-blue-400 px-2 py-0.5 rounded-md border border-[#1151c5]/30">
                {process.env.NEXT_PUBLIC_IMG_ATL}
                </span>
              </span>
          </a>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs font-medium text-slate-400">
              Đã có tài khoản doanh nghiệp?
            </span>
            <Link
              href="./dang-nhap"
              className="text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl border border-slate-700 transition-all hover:border-blue-500/50 flex items-center gap-1.5"
            >
              <span>Đăng nhập</span>
              <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container - Split Screen */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 pt-16 min-h-[calc(100vh-4rem)]">
        
        {/* LEFT COLUMN: Brand Value Proposition & Features Showcase */}
        {}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-[#0c317a] p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden border-r border-slate-800">
          
          {/* Ambient Background Lights */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Hero Pitch Content */}
          <div className="relative z-10 space-y-8 my-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nền tảng Quản trị Chấm công & Nhân sự 4.0</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              Tối ưu chấm công. <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
                Minh bạch chi phí lương.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Giải pháp toàn diện giúp doanh nghiệp tự động hóa ghi nhận ca làm, tính công chính xác theo thời gian thực và quản lý nhân sự đa chi nhánh dễ dàng.
            </p>

            {/* Feature Highlights Grid */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Chấm công AI & Geofencing GPS</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Nhận diện khuôn mặt FaceID thông minh, tự động khoanh vùng địa điểm làm việc.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Quản lý Ca kíp & Đơn từ linh hoạt</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Xử lý xin nghỉ phép, tăng ca (OT), đổi ca trực tuyến tức thì ngay trên Mobile App.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Báo cáo & Kết nối Bảng lương</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Xuất báo cáo Excel/PDF chuẩn xác 100%, tích hợp sẵn với hệ thống kế toán hiện có.</p>
                </div>
              </div>
            </div>

            {/* Customer Testimonial Card */}
            <div className="pt-6">
              <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-5 shadow-2xl relative">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-300 ml-1.5">5.0 / 5.0 từ 1,200+ Doanh nghiệp</span>
                </div>

                <p className="text-xs sm:text-sm italic text-slate-200 leading-relaxed font-medium">
                  "{testimonials[activeTestimonial].quote}"
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonials[activeTestimonial].avatar}
                      alt="Avatar"
                      className="w-9 h-9 rounded-full object-cover border border-blue-400/30"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-white">{testimonials[activeTestimonial].author}</h5>
                      <p className="text-[11px] text-slate-400">{testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].company}</p>
                    </div>
                  </div>

                  {/* Carousel Indicators */}
                  <div className="flex gap-1.5">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTestimonial(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          activeTestimonial === idx ? 'w-5 bg-blue-500' : 'w-1.5 bg-slate-600'
                        }`}
                        aria-label={`Testimonial slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges Footer */}
          <div className="relative z-10 pt-8 mt-auto flex items-center justify-between border-t border-slate-800/80 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Bảo mật dữ liệu ISO/IEC 27001</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Cam kết Uptime 99.9%</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Enterprise Registration Form */}
        {}
        <div className="lg:col-span-7 bg-slate-900 p-6 sm:p-10 lg:p-14 flex items-center justify-center">
          <div className="w-full max-w-xl space-y-8">
            
            {/* Header Form Titles */}
            <div>
              {/* <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500/20 mb-3">
                <Check className="w-3.5 h-3.5" /> Trải nghiệm miễn phí 14 ngày - Không cần thẻ tín dụng
              </div> */}
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Đăng ký tài khoản Doanh nghiệp
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
                Thiết lập hệ thống chấm công tự động cho công ty bạn chỉ trong chưa đầy 2 phút.
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              
              {/* SECTION 1: Personal & Admin Info */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  1. Thông tin Quản trị viên hệ thống
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Họ và tên Quản trị <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="VD: Nguyễn Văn A"
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border ${
                          errors.fullName ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                        } rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Work Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email công việc <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleInputChange}
                        placeholder="alex@company.com"
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border ${
                          errors.workEmail ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                        } rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all`}
                      />
                    </div>
                    {errors.workEmail && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.workEmail}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Số điện thoại di động <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="0912 345 678"
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border ${
                          errors.phone ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                        } rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Password Field & Toggle */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Mật khẩu khởi tạo <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handlePasswordChange}
                        placeholder="Tối thiểu 8 ký tự"
                        className={`w-full pl-10 pr-10 py-2.5 bg-slate-950 border ${
                          errors.password ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                        } rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                        title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Dynamic Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-2 space-y-1">
                        <div className="flex gap-1 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full transition-all ${passwordStrength >= 1 ? 'w-1/4 bg-rose-500' : 'w-0'}`} />
                          <div className={`h-full transition-all ${passwordStrength >= 2 ? 'w-1/4 bg-amber-500' : 'w-0'}`} />
                          <div className={`h-full transition-all ${passwordStrength >= 3 ? 'w-1/4 bg-blue-500' : 'w-0'}`} />
                          <div className={`h-full transition-all ${passwordStrength >= 4 ? 'w-1/4 bg-emerald-500' : 'w-0'}`} />
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-slate-400">Độ mạnh mật khẩu:</span>
                          <span className={`font-bold ${
                            passwordStrength <= 1 ? 'text-rose-400' :
                            passwordStrength === 2 ? 'text-amber-400' :
                            passwordStrength === 3 ? 'text-blue-400' : 'text-emerald-400'
                          }`}>
                            {passwordStrength <= 1 && 'Yếu'}
                            {passwordStrength === 2 && 'Trung bình'}
                            {passwordStrength === 3 && 'Khá mạnh'}
                            {passwordStrength >= 4 && 'Cực kỳ an toàn'}
                          </span>
                        </div>
                      </div>
                    )}

                    {errors.password && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.password}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 2: Company / Organization Details */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  2. Thông tin Doanh nghiệp / Tổ chức
                </h3>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Tên đầy đủ Doanh nghiệp <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="VD: Công ty Cổ phần Công nghệ WorkSync"
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border ${
                        errors.companyName ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                      } rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all`}
                    />
                  </div>
                  {errors.companyName && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {errors.companyName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company Size */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Quy mô nhân sự
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                      >
                        <option value="1-10">Dưới 10 nhân sự</option>
                        <option value="11-50">11 - 50 nhân sự</option>
                        <option value="51-200">51 - 200 nhân sự</option>
                        <option value="201-500">201 - 500 nhân sự</option>
                        <option value="500+">Trên 500 nhân sự</option>
                      </select>
                      <ChevronRight className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                    </div>
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Ngành nghề hoạt động
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                      >
                        <option value="Technology">Công nghệ & Phần mềm</option>
                        <option value="Retail">Bán lẻ & Chuỗi cửa hàng</option>
                        <option value="Manufacturing">Sản xuất & Bất động sản</option>
                        <option value="FnB">Nhà hàng & F&B</option>
                        <option value="Services">Dịch vụ & Tài chính</option>
                        <option value="Others">Khác</option>
                      </select>
                      <ChevronRight className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Terms & Agreement */}
              <div className="pt-2 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="mt-0.5 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs text-slate-300 leading-relaxed">
                    Tôi đồng ý với{' '}
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Demo: Điều khoản dịch vụ WorkSync'); }} className="text-blue-400 hover:underline font-semibold">
                      Điều khoản dịch vụ
                    </a>{' '}
                    và{' '}
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Demo: Chính sách bảo mật'); }} className="text-blue-400 hover:underline font-semibold">
                      Chính sách bảo mật
                    </a>{' '}
                    của WorkSync.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors.agreeTerms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              {}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Đang tạo không gian làm việc WorkSync...</span>
                    </>
                  ) : (
                    <>
                      <span>Bắt đầu dùng thử 14 ngày miễn phí</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Security & Support Note */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" /> Mã hóa SSL 256-bit
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-slate-400" /> Hỗ trợ kỹ thuật 24/7
                </span>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* SUCCESS MODAL DIALOG */}
      {}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
            
            {/* Top Accent Light */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl" />

            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Đăng ký thành công!</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Chào mừng <span className="font-bold text-white">{formData.fullName}</span> và doanh nghiệp <span className="font-bold text-blue-400">{formData.companyName}</span> đến với WorkSync Enterprise.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-left text-xs space-y-2 text-slate-400">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span>Tài khoản Admin:</span>
                <span className="text-white font-medium">{formData.workEmail}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span>Gói trải nghiệm:</span>
                <span className="text-emerald-400 font-bold">14 Ngày Full Features</span>
              </div>
              <div className="flex justify-between">
                <span>Domain làm việc:</span>
                <span className="text-blue-400 font-mono">{formData.companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.worksync.vn</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSuccessModalOpen(false);
                alert('Demo: Chuyển hướng tới Bảng điều khiển (Dashboard) của WorkSync');
              }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-6 rounded-xl transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <span>Truy cập Dashboard ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}