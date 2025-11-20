// src/utils/auth.ts

const AUTH_TOKEN_KEY = 'authToken';

/**
 * Lưu Token xác thực (JWT) vào Local Storage.
 * @param token - Token cần lưu
 */
export function setAuthToken(token: string): void {
    try {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
        console.error("Lỗi khi lưu Token vào Local Storage:", error);
    }
}

/**
 * Lấy Token xác thực từ Local Storage.
 * @returns Chuỗi Token hoặc null
 */
export function getAuthToken(): string | null {
    try {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
        console.error("Lỗi khi đọc Token từ Local Storage:", error);
        return null;
    }
}

/**
 * Xóa Token xác thực khỏi Local Storage (Đăng xuất).
 */
export function removeAuthToken(): void {
    try {
        localStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
        console.error("Lỗi khi xóa Token khỏi Local Storage:", error);
    }
}