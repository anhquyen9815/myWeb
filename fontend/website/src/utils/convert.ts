export const toSlug = (text: string): string => {
  return text
    .replace(/^\ufeff/g, '') // xóa BOM nếu có
    .toLowerCase()
    .normalize('NFD') // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '') // xóa dấu
    .replace(/đ/g, 'd') // thêm xử lý riêng cho đ
    .replace(/[\\/]/g, '') // 👈 xóa cả dấu / và \
    .replace(/[^a-z0-9\s-]/g, '') // xóa ký tự đặc biệt
    .trim()
    .replace(/\s+/g, '-') // thay khoảng trắng bằng -
    .replace(/-+/g, '-'); // gộp nhiều dấu - thành 1
};
