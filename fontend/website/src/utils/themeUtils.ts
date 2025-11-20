// src/utils/themeUtils.ts

import { type Theme, useTheme } from '@mui/material/styles';

// Giá trị cơ sở của đơn vị spacing trong MUI (mặc định là 8px)
const BASE_SPACING_UNIT = 8; 

/**
 * Chuyển đổi giá trị spacing của MUI (ví dụ: 1, 2, 3) thành giá trị pixel.
 * @param factor - Hệ số spacing của MUI (ví dụ: 4)
 * @returns Giá trị pixel (ví dụ: '32px')
 */
export function getMuiSpacingInPx(factor: number): string {
    return `${factor * BASE_SPACING_UNIT}px`;
}

/**
 * Lấy màu sắc từ theme MUI theo tên key (ví dụ: 'primary.main').
 * Lưu ý: Việc này thường không cần thiết nếu dùng prop sx, nhưng hữu ích cho các hàm tùy chỉnh.
 * @param theme - Đối tượng Theme MUI
 * @param colorKey - Chuỗi key màu (ví dụ: 'error.main')
 * @returns Chuỗi mã màu (ví dụ: '#F44336')
 */
export function getMuiColor(theme: Theme, colorKey: string): string {
    // Tách key (ví dụ: 'error.main' -> ['error', 'main'])
    const [color, shade] = colorKey.split('.');
    
    // Truy cập đối tượng palette
    // @ts-ignore
    const colorObject = theme.palette[color];

    if (!colorObject) return 'transparent';
    
    // Nếu có shade (main, light, dark), trả về shade đó, nếu không, trả về main
    return colorObject[shade as keyof typeof colorObject] || colorObject.main;
}