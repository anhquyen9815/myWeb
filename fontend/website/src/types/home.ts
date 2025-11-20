// import { SVG_FILES } from '@/constants/paths';
import { SVG_FILES } from '@/constants/svgPaths';


export interface GalleryItem {
  id: number;
  imageUrl: string;
  caption: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: 1,
    imageUrl: 'https://admin.nuocngoctuan.com/Upload/jpg/%E1%BA%A2nh%20Kh%C3%A1nh%20Th%C3%A0nh.jpg',
    caption: 'Lễ Khánh Thành Nhà Máy Nước Sạch Ngọc Tuấn'
  },
  {
    id: 2,
    imageUrl: 'https://admin.nuocngoctuan.com/Upload/jpg/L%C3%A3nh%20%C4%91%E1%BA%A1o%20tham%20d%E1%BB%B1.jpg',
    caption: 'Khách Mời Tham Dự Lễ Khánh Thành'
  },
  {
    id: 3,
    imageUrl: 'https://admin.nuocngoctuan.com/Upload/jpg/CT%20UBND.jpg',
    caption: 'Khách Mời Tham Dự Lễ Khánh Thành'
  },
  {
    id: 4,
    imageUrl: 'https://admin.nuocngoctuan.com/Upload/jpg/Huy%E1%BB%87n%20%E1%BB%A7y.jpg',
    caption: 'Khách Mời Tham Dự Lễ Khánh Thành'
  },
  {
    id: 5,
    imageUrl: 'https://admin.nuocngoctuan.com/Upload/jpg/C%C3%B4ng%20An%20huy%E1%BB%87n%20K%C4%90.jpg',
    caption: 'Khách Mời Tham Dự Lễ Khánh Thành'
  },
  {
    id: 6,
    imageUrl: 'https://admin.nuocngoctuan.com/Upload/jpg/%C4%91%E1%BA%A1i%20di%E1%BB%87n%20x%C3%A3%20Xu%C3%A2n%20tr%C3%BAc.jpg',
    caption: 'Khách Mời Tham Dự Lễ Khánh Thành'
  },
  {
    id: 7,
    imageUrl: 'https://admin.nuocngoctuan.com/Upload/jpg/H%E1%BB%99i%20n%C6%B0%E1%BB%9Bc%20s%E1%BA%A1ch%20H%C6%B0ng%20Y%C3%AAn.jpg',
    caption: 'Khách Mời Tham Dự Lễ Khánh Thành'
  },
];

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  link: string;
  targets: string[];
  price: number;
  imageUrl: string;
  iconUrl: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 1, title: 'Đăng ký lắp đặt đồng hồ', description: 'Hộ gia đình, cơ quan tổ chức, doanh nghiệp đơn vị sản xuất có nhu cầu sử dụng nước sạch do Công ty TNHH Nước sạch Ngọc Tuấn - Nagaoka cung cấp sẽ đăng ký Thỏa thuận lắp đặt cụm đồng hồ nước', link: '/services/install'
    ,
    price: 4500000,
    targets: ['Hộ gia đình, hộ kinh doanh',
      ' Cơ quan hành chính',
      'Doanh nghiệp, Cty sản xuất'],
    imageUrl: 'https://admin.nuocngoctuan.com/Upload/png/2_ky-hop-dong-lao-dong-1.png',
    iconUrl: SVG_FILES.add_contract,
  },
  {
    id: 2, title: 'Đổi tên hợp đồng', description: 'Khách hàng hộ gia đình, cơ quan, doanh nghiệp, đơn vị sản xuất kinh doanh sử dụng dịch vụ cấp nước có nhu cầu thay đổi lại chủ thể đứng tên hợp đồng đề nghị đăng ký theo mẫu', link: '/services/rename',
    price: 200000,
    targets: ['Hộ gia đình, hộ kinh doanh cá thể',
      'Cơ quan, tổ chức, doanh nghiệp'],
    imageUrl: 'https://admin.nuocngoctuan.com/Upload/png/2_ky-hop-dong-lao-dong-1.png',
    iconUrl: SVG_FILES.change_user,
  },
  {
    id: 3, title: 'Đổi vị trí cụm đồng hồ', description: 'Với những khách hàng đang sử dụng nước có nhu cầu cần di chuyển cụm đồng hồ từ vị trí này sang vị trí khác', link: '/services/relocate',
    price: 500000,
    targets: ['Hộ gia đình, hộ kinh doanh cá thể',
      'Cơ quan, tổ chức, doanh nghiệp'],
    imageUrl: 'https://admin.nuocngoctuan.com/Upload/png/2_ky-hop-dong-lao-dong-1.png',
    iconUrl: SVG_FILES.change_position,
  },
  {
    id: 4, title: 'Điều chỉnh giá nước', description: 'Trường hợp khách hàng đang sử dụng mức giá hộ gia đình hoặc kinh doanh có nhu cầu thay đổi lại mức giá', link: '/services/adjust-price',
    price: 0,
    targets: ['Hộ gia đình, hộ kinh doanh cá thể',
      'Cơ quan, tổ chức, doanh nghiệp'],
    imageUrl: 'https://admin.nuocngoctuan.com/Upload/png/2_ky-hop-dong-lao-dong-1.png',
    iconUrl: SVG_FILES.change_money,
  },
  {
    id: 5, title: 'Tạm ngừng, mở lại cấp nước', description: 'Khách hàng hộ gia đình, cơ quan, doanh nghiệp, đơn vị sản xuất kinh doanh sử dụng dịch vụ cấp nước có nhu cầu ngừng hoặc mở lại nguồn cấp nước vui lòng nhập thông tin yêu cầu tại đây.', link: '/services/pause',
    price: 300000,
    targets: ['Hộ gia đình, hộ kinh doanh cá thể',
      'Cơ quan, tổ chức, doanh nghiệp'],
    imageUrl: 'https://admin.nuocngoctuan.com/Upload/png/2_ky-hop-dong-lao-dong-1.png',
    iconUrl: SVG_FILES.water,
  },
  {
    id: 6, title: 'Kiểm định lại đồng hồ', description: 'Khách hàng đang sử dụng nước có nhu cầu kiểm định lại đồng hồ đo nước, đăng ký theo mẫu và chi trả theo quy định của công ty', link: '/services/retest',
    price: 480000,
    targets: ['Hộ gia đình, hộ kinh doanh cá thể',
      'Cơ quan, tổ chức, doanh nghiệp'],
    imageUrl: 'https://admin.nuocngoctuan.com/Upload/png/2_ky-hop-dong-lao-dong-1.png',
    iconUrl: SVG_FILES.clock_check,
  },
  {
    id: 7, title: 'Kiểm tra, thay vật tư cụm đồng hồ', description: 'Khách hàng đang sử dụng nước có yêu cầu kiểm tra, thay vật tư cụm đồng hồ, đăng ký theo mẫu và chi trả theo quy định của công ty', link: '/services/check-parts',
    price: 200000,
    targets: ['Hộ gia đình, hộ kinh doanh cá thể',
      'Cơ quan, tổ chức, doanh nghiệp'],
    imageUrl: 'https://admin.nuocngoctuan.com/Upload/png/2_ky-hop-dong-lao-dong-1.png',
    iconUrl: SVG_FILES.check_update,
  },
  {
    id: 8, title: 'Nâng cụm đồng hồ', description: 'Khách hàng đang sử dụng nước nhận được thông báo cần nâng đồng hồ do khu vực nâng cấp đường, hoặc có nhu cầu nâng cụm đồng hồ, đăng ký theo mẫu và chi trả theo quy định của công ty', link: '/services/upgrade',
    price: 500000,
    targets: ['Hộ gia đình, hộ kinh doanh cá thể',
      'Cơ quan, tổ chức, doanh nghiệp'],
    imageUrl: 'https://admin.nuocngoctuan.com/Upload/png/2_ky-hop-dong-lao-dong-1.png',
    iconUrl: SVG_FILES.clock_update,
  },
];

// Định nghĩa cấu trúc dữ liệu cơ bản
export interface NewsItem {
  id: number;
  title: string;
  date: string;
  imageUrl?: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

// Dữ liệu mẫu cho Tin tức
export const newsData: NewsItem[] = [
  { id: 1, title: 'Kết quả mẫu nước tháng 9/2025', date: '23/09/2025 10:57', imageUrl: 'https://admin.nuocngoctuan.com/Upload/png/ẢNh BÌA.png' },
  { id: 2, title: 'Kết quả mẫu nước tháng 8/2025', date: '23/08/2025 14:27', imageUrl: 'https://admin.nuocngoctuan.com/Upload/png/ẢNh BÌA.png' },
  { id: 3, title: 'Giải pháp chống lừa đảo qua các cuộc gọi mạo danh', date: '14/08/2025 16:47', imageUrl: 'https://admin.nuocngoctuan.com/Upload/png/ẢNh BÌA.png' },
  { id: 4, title: 'Kết quả mẫu nước tháng 7/2025', date: '07/08/2025 11:28', imageUrl: 'https://admin.nuocngoctuan.com/Upload/png/ẢNh BÌA.png' },
];

// Dữ liệu mẫu cho Câu hỏi thường gặp
export const faqData: FaqItem[] = [
  { id: 1, question: 'Cần có giấy tờ gì để lắp đặt cụm đồng hồ của khách hàng là hộ gia đình?', answer: '...' },
  { id: 2, question: 'Tại sao từ lúc thông báo tạm dừng cấp nước đến lúc cấp nước trở lại những vùng xa nhà máy, trạm bơm tăng áp lại lâu có nước sử dụng?', answer: '...' },
  { id: 3, question: 'Tại sao khi tạm dừng cấp nước có kế hoạch hoặc có xảy ra sự cố công ty không thông báo tin nhắn cho khách hàng?', answer: '...' },
  { id: 4, question: 'Tại sao khách hàng phải hỗ trợ 1 phần chi phí khi đường ống thủng nếu không tìm được người phá hoại?', answer: '...' },
  { id: 5, question: 'Tại sao công ty nước sạch không cung cấp hóa đơn VAT in bằng giấy cho khách hàng sử dụng nước mà chỉ thu và ký vào bảng kê trực tiếp hoặc thanh toán online?', answer: '...' },
];
