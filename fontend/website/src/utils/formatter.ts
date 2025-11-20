// src/utils/formatter.ts

/**
 * Định dạng số tiền thành chuỗi tiền tệ Việt Nam Đồng (VNĐ).
 * @param amount - Số tiền (number)
 * @returns Chuỗi định dạng tiền tệ (string)
 */
export function formatCurrency(amount: number | undefined | null): string {
    if (amount === undefined || amount === null || isNaN(amount)) {
        return '0 VNĐ';
    }
    
    // Sử dụng Intl.NumberFormat để định dạng chuẩn quốc tế
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0, // Không hiển thị số thập phân
    }).format(amount);
}

/**
 * Định dạng ngày tháng theo chuẩn dd/mm/yyyy
 * @param dateString - Ngày tháng dưới dạng chuỗi hoặc đối tượng Date
 * @returns Chuỗi ngày tháng định dạng
 */
export function formatDate(dateString: string | Date): string {
    let date: Date;

    if (typeof dateString === 'string') {
        date = new Date(dateString);
    } else {
        date = dateString;
    }

    if (isNaN(date.getTime())) {
        return 'Không xác định'; 
    }
    
    // Format: dd/MM/yyyy
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

