const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import {type LoginCredentials } from '@/types/auth';

// Hàm thực hiện HTTP request và trả về dữ liệu User hoặc ném lỗi
export async function loginApi(credentials: LoginCredentials) {
  const response = await fetch(`${BASE_URL}${API_ENDPOINTS.LOGIN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    // Xử lý lỗi HTTP và ném lỗi để thunk bắt được
    const error = await response.json();
    throw new Error(error.message || 'Lỗi xác thực từ Server');
  }

  const data = await response.json();
  // 1. LƯU TOKEN VÀO LOCAL STORAGE (QUAN TRỌNG)
  if (data.token) {
    localStorage.setItem('authToken', data.token);
  }
  // 2. Trả về cả token và user
  return {
    token: data.token,
    user: data.user
  };
//   return data.user; // Trả về user data
}