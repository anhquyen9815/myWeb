// src/utils/validators.ts

// Regex hỗ trợ chữ cái tiếng Việt có dấu (Unidecode)
const VIETNAMESE_CHARS_REGEX = /^[a-zA-Z\sÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐđ]+$/;

/**
 * Kiểm tra tính hợp lệ của Họ tên (chỉ cho phép chữ cái và khoảng trắng).
 */
export function isValidFullName(fullName: string): boolean {
    if (fullName.trim().length === 0) return false;
    
    // Kiểm tra toàn bộ chuỗi khớp với pattern
    return VIETNAMESE_CHARS_REGEX.test(fullName.trim());
}

/**
 * Kiểm tra tính hợp lệ của địa chỉ email.
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

/**
 * Kiểm tra tính hợp lệ của Số điện thoại (10 số, bắt đầu bằng 0).
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
    // Cho phép 10 số và bắt buộc bắt đầu bằng 0
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/; 
    return phoneRegex.test(phoneNumber.trim());
}

/**
 * Kiểm tra tính hợp lệ của Số Căn cước công dân (CCCD)/CMND.
 */
export function isValidIdentityNumber(idNumber: string): boolean {
    const trimmed = idNumber.trim();
    // CCCD mới (12 số) hoặc CMND cũ (9 số)
    return /^\d{9}$/.test(trimmed) || /^\d{12}$/.test(trimmed);
}

/**
 * Kiểm tra tính hợp lệ của Mã số thuế (MST).
 */
export function isValidTaxCode(taxCode: string): boolean {
    const trimmed = taxCode.trim();
    // MST Doanh nghiệp (10 số) hoặc có chi nhánh (13 số)
    return /^\d{10}$/.test(trimmed) || /^\d{13}$/.test(trimmed);
}

/**
 * Kiểm tra xem trường có rỗng không.
 */
export function isRequiredValid(value: string): boolean {
    return value.trim().length > 0;
}