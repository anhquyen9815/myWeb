// src/data/footerData.ts (Hoặc định nghĩa trong Component)
import facebook from '@/assets/social/facebook.png';
import zalo from '@/assets/social/zalo.png';
// Liên kết Thông tin bổ sung
export const additionalLinks = [
  { label: 'Đăng ký dịch vụ', href: '#' },
  { label: 'Tra cứu thông tin', href: '#' },
  { label: 'Thanh toán hóa đơn nước', href: '#' },
  { label: 'Ý kiến khách hàng', href: '#' },
  { label: 'Câu hỏi thường gặp', href: '#' },
  { label: 'Chính sách - Điều khoản', href: '#' },
];

// Liên kết Liên hệ
export const contactLinks = [
  { label: 'Mua hàng', phone: '093 686 2366 - 036 300 5549' },
  { label: 'Kỹ thuật', phone: '0988 389 386' },
];

// Liên kết Mạng xã hội
export const socialLinks = [
  { name: 'Facebook', icon: facebook, href: 'https://www.facebook.com/profile.php?id=61563078110662', bgcolor: '#3b5998' },
  { name: 'Zalo', icon: zalo, href: 'https://zalo.me/0936862366', bgcolor: '#0180c7' },
];