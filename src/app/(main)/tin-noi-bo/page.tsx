'use client';

import { useState } from 'react';
import {
  Newspaper,
  Plus,
  Search,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  Sparkles,
  TrendingUp,
  Award,
  PartyPopper,
  Zap,
  Building2,
  Clock,
  Eye,
  X,
  Send,
  Image as ImageIcon,
  Check,
  ChevronRight
} from 'lucide-react';

// Kiểu dữ liệu Bài viết Nội bộ
interface InternalPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'event' | 'policy' | 'honoring' | 'culture';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  publishedAt: string;
  readTime: string;
  views: number;
  likes: number;
  commentsCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  isFeatured?: boolean;
}

const initialPosts: InternalPost[] = [
  {
    id: 'post-1',
    title: 'Vinh danh Top Performers xuất sắc nhất Quý III/2026',
    summary: 'Chúc mừng 5 cá nhân và 2 tập thể đã đạt thành tích bứt phá xuất sắc trong chiến dịch tăng trưởng Quý III vừa qua.',
    content: 'Chiến dịch tăng trưởng Quý III/2026 đã khép lại với những con số vô cùng ấn tượng. Ban Giám Đốc xin gửi lời vinh danh sâu sắc nhất tới các cá nhân và tập thể xuất sắc đã không ngừng nỗ lực, sáng tạo và cống hiến vượt chỉ tiêu KPI được giao.',
    category: 'honoring',
    author: {
      name: 'Nguyễn Thanh Hà',
      role: 'Trưởng phòng Nhân sự',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&auto=format&fit=crop&q=80',
    publishedAt: '2 giờ trước',
    readTime: '3 phút đọc',
    views: 420,
    likes: 58,
    commentsCount: 14,
    isLiked: false,
    isSaved: true,
    isFeatured: true
  },
  {
    id: 'post-2',
    title: 'Cập nhật Quy định Điểm danh & Chế độ Chấm công áp dụng từ tháng 10/2026',
    summary: 'Nhằm cải thiện trải nghiệm làm việc linh hoạt, công ty áp dụng khung giờ đi làm linh hoạt (Flexible Hours) và tối ưu hóa quy trình duyệt nghỉ phép.',
    content: 'Từ ngày 01/10/2026, toàn bộ nhân viên sẽ được áp dụng chính sách giờ làm việc linh hoạt: Check-in trong khoảng từ 08h00 - 09h00 và Check-out sau đủ 8 tiếng làm việc.',
    category: 'policy',
    author: {
      name: 'Ban Giám Đốc',
      role: 'Quản trị Hệ thống',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    publishedAt: 'Hôm qua',
    readTime: '5 phút đọc',
    views: 890,
    likes: 112,
    commentsCount: 32,
    isLiked: true,
    isSaved: false
  },
  {
    id: 'post-3',
    title: 'Khởi động Giải chạy Nội bộ "Run For Green 2026" gây quỹ từ thiện',
    summary: 'Hãy tham gia giải chạy trực tuyến tích lũy bước chân để đóng góp vào quỹ trồng cây xanh công ty.',
    content: 'Mỗi kilomet bạn hoàn thành thông qua ứng dụng điểm danh chạy bộ sẽ đóng góp tương đương 10.000 VNĐ vào quỹ phủ xanh trường học vùng cao.',
    category: 'event',
    author: {
      name: 'Lê Minh Tuấn',
      role: 'Đội ngũ Văn nghệ & Thể thao',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
    publishedAt: '15/09/2026',
    readTime: '2 phút đọc',
    views: 310,
    likes: 45,
    commentsCount: 8,
    isLiked: false,
    isSaved: false
  },
  {
    id: 'post-4',
    title: 'Chương trình Đào tạo "Kỹ năng Quản lý Thời gian & Làm việc Hiệu quả"',
    summary: 'Khóa học ngắn hạn dành riêng cho nhân sự khối kỹ thuật và vận hành với sự tham gia của Chuyên gia huấn luyện doanh nghiệp.',
    content: 'Buổi chia sẻ diễn ra vào thứ Sáu tuần này tại Hội trường Tầng 3. Đăng ký tham gia ngay trên hệ thống nội bộ.',
    category: 'culture',
    author: {
      name: 'Phòng Đào Tạo L&D',
      role: 'Bộ phận Phát triển Nguồn nhân lực',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'
    },
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    publishedAt: '12/09/2026',
    readTime: '4 phút đọc',
    views: 245,
    likes: 30,
    commentsCount: 5,
    isLiked: false,
    isSaved: false
  }
];

export default function InternalNewsPage() {
  const [posts, setPosts] = useState<InternalPost[]>(initialPosts);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<InternalPost | null>(null);

  // Form Đăng bài mới
  const [newPostForm, setNewPostForm] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'culture' as InternalPost['category'],
    coverImage: ''
  });

  // Helper hiển thị Badge Phân loại
  const getCategoryBadge = (category: InternalPost['category']) => {
    switch (category) {
      case 'honoring':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 font-extrabold px-2.5 py-1 rounded-lg text-[11px]">
            <Award className="w-3.5 h-3.5 text-amber-600" /> Vinh danh
          </span>
        );
      case 'policy':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 font-extrabold px-2.5 py-1 rounded-lg text-[11px]">
            <Zap className="w-3.5 h-3.5 text-blue-600" /> Chính sách mới
          </span>
        );
      case 'event':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 font-extrabold px-2.5 py-1 rounded-lg text-[11px]">
            <PartyPopper className="w-3.5 h-3.5 text-rose-600" /> Sự kiện
          </span>
        );
      case 'culture':
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold px-2.5 py-1 rounded-lg text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Văn hóa
          </span>
        );
    }
  };

  // Tương tác Thích / Bỏ thích
  const handleToggleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  // Tương tác Lưu bài viết
  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, isSaved: !post.isSaved } : post
      )
    );
  };

  // Đăng bài mới
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostForm.title || !newPostForm.summary) return;

    const newPost: InternalPost = {
      id: `post-${Date.now()}`,
      title: newPostForm.title,
      summary: newPostForm.summary,
      content: newPostForm.content || newPostForm.summary,
      category: newPostForm.category,
      author: {
        name: 'Trần Văn Nam',
        role: 'Quản trị viên',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
      },
      coverImage:
        newPostForm.coverImage ||
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
      publishedAt: 'Vừa xong',
      readTime: '3 phút đọc',
      views: 1,
      likes: 0,
      commentsCount: 0,
      isLiked: false,
      isSaved: false
    };

    setPosts([newPost, ...posts]);
    setIsCreateModalOpen(false);
    setNewPostForm({
      title: '',
      summary: '',
      content: '',
      category: 'culture',
      coverImage: ''
    });
  };

  // Lọc danh sách bài viết
  const filteredPosts = posts.filter((post) => {
    const matchCategory = activeTab === 'all' || post.category === activeTab;
    const matchSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featuredPost = posts.find((p) => p.isFeatured) || posts[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-6">
      {/* Header Trang */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            <Newspaper className="w-6 h-6 text-blue-600" />
            <span>Bản Tin Nội Bộ</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Cập nhật tin tức doanh nghiệp, chính sách công ty, vinh danh và sự kiện truyền thông
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-[#1151c5] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Viết tin mới</span>
          </button>
        </div>
      </div>

      {/* Bài Viết Nổi Bật (Featured Hero Section) */}
      {featuredPost && (
        <div
          onClick={() => setSelectedPost(featuredPost)}
          className="relative rounded-3xl overflow-hidden bg-gray-900 text-white shadow-xl cursor-pointer group transition-transform duration-300 hover:shadow-2xl"
        >
          <div className="absolute inset-0 z-0">
            <img
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent"></div>
          </div>

          <div className="relative z-10 p-6 md:p-10 flex flex-col justify-end min-h-[360px] md:min-h-[420px] max-w-3xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-amber-400 text-gray-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Nổi bật
              </span>
              {getCategoryBadge(featuredPost.category)}
            </div>

            <h2 className="text-xl md:text-3xl font-black leading-tight group-hover:text-blue-300 transition-colors">
              {featuredPost.title}
            </h2>

            <p className="text-xs md:text-sm text-gray-300 line-clamp-2 leading-relaxed font-medium">
              {featuredPost.summary}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10 text-xs text-gray-300 font-medium">
              <div className="flex items-center gap-2.5">
                <img
                  src={featuredPost.author.avatar}
                  alt={featuredPost.author.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white/20"
                />
                <div>
                  <p className="font-bold text-white leading-none">{featuredPost.author.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{featuredPost.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" /> {featuredPost.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-gray-400" /> {featuredPost.views} xem
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thanh Điều Hướng & Tìm Kiếm */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'Tất cả tin tức' },
            { id: 'honoring', label: 'Vinh danh' },
            { id: 'policy', label: 'Chính sách' },
            { id: 'event', label: 'Sự kiện' },
            { id: 'culture', label: 'Văn hóa' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bản tin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl text-xs font-medium text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Danh Sách Bài Viết (Grid Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 font-medium text-xs">
            Chưa tìm thấy tin tức phù hợp trong chuyên mục này
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Ảnh bìa */}
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">{getCategoryBadge(post.category)}</div>
                  <button
                    onClick={(e) => handleToggleSave(post.id, e)}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-600 hover:text-blue-600 transition-colors shadow-xs"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${post.isSaved ? 'fill-blue-600 text-blue-600' : ''}`}
                    />
                  </button>
                </div>

                {/* Nội dung tóm tắt */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-gray-400 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.publishedAt}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-sm font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2 font-medium leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Tác giả & Tương tác */}
              <div className="px-5 pb-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="font-bold text-gray-700 text-[11px]">{post.author.name}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-400 font-semibold text-[11px]">
                  <button
                    onClick={(e) => handleToggleLike(post.id, e)}
                    className={`flex items-center gap-1 hover:text-blue-600 transition-colors ${
                      post.isLiked ? 'text-blue-600 font-bold' : ''
                    }`}
                  >
                    <ThumbsUp
                      className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-blue-600' : ''}`}
                    />
                    <span>{post.likes}</span>
                  </button>

                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.commentsCount}</span>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Đăng Bài Mới */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-blue-600" />
                <span>Soạn bài viết tin tức mới</span>
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-gray-600 mb-1">Tiêu đề bài viết *</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập tiêu đề hấp dẫn..."
                  value={newPostForm.title}
                  onChange={(e) => setNewPostForm({ ...newPostForm, title: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 mb-1">Chuyên mục</label>
                  <select
                    value={newPostForm.category}
                    onChange={(e) =>
                      setNewPostForm({ ...newPostForm, category: e.target.value as any })
                    }
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="culture">Văn hóa doanh nghiệp</option>
                    <option value="honoring">Vinh danh cá nhân</option>
                    <option value="policy">Chính sách & Quy định</option>
                    <option value="event">Sự kiện & Phong trào</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Link ảnh bìa Unsplash (Tùy chọn)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newPostForm.coverImage}
                    onChange={(e) => setNewPostForm({ ...newPostForm, coverImage: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Tóm tắt ngắn *</label>
                <input
                  type="text"
                  required
                  placeholder="Mô tả ngắn gọn hiển thị trên thẻ bài viết..."
                  value={newPostForm.summary}
                  onChange={(e) => setNewPostForm({ ...newPostForm, summary: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Nội dung bài viết chi tiết</label>
                <textarea
                  rows={4}
                  placeholder="Soạn thảo nội dung bài viết..."
                  value={newPostForm.content}
                  onChange={(e) => setNewPostForm({ ...newPostForm, content: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#1151c5] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Xuất bản tin</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xem Bài Viết Chi Tiết */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-gray-100 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                {getCategoryBadge(selectedPost.category)}
                <span className="text-xs font-bold text-gray-400">• {selectedPost.publishedAt}</span>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ảnh đại diện bài viết */}
            <div className="h-56 rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-xl font-extrabold text-gray-900 leading-snug">{selectedPost.title}</h2>

            <div className="flex items-center justify-between border-y border-gray-100 py-3 text-xs">
              <div className="flex items-center gap-2.5">
                <img
                  src={selectedPost.author.avatar}
                  alt={selectedPost.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-900">{selectedPost.author.name}</p>
                  <p className="text-[10px] text-gray-400">{selectedPost.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleLike(selectedPost.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border font-bold transition-all ${
                    selectedPost.isLiked
                      ? 'bg-blue-50 border-blue-200 text-blue-600'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${selectedPost.isLiked ? 'fill-blue-600' : ''}`} />
                  <span>{selectedPost.likes} Thích</span>
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-700 leading-relaxed space-y-3 font-medium">
              <p className="text-sm font-semibold text-gray-900 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                {selectedPost.summary}
              </p>
              <p>{selectedPost.content}</p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors"
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