import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';



// ===============================
// 🔹 1. Tạo instance của Axios
// ===============================
const apiClient: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`, // fallback khi .env chưa có
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // nếu cần gửi cookie thì để true
  timeout: 10000, // 10s timeout
});

// ===============================
// 🔹 2. Interceptor thêm Token vào Header
// ===============================
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // đảm bảo headers luôn tồn tại
      config.headers = config.headers || {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// 🔹 3. Interceptor xử lý lỗi phản hồi
// ===============================
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('⚠️ Token hết hạn, cần đăng nhập lại');
      // Có thể xử lý tự động logout ở đây nếu muốn
      // localStorage.removeItem('authToken');
    }

    const message =
      error.response?.data?.message || 'Lỗi kết nối đến server';
    return Promise.reject(new Error(message));
  }
);

// ===============================
// 🔹 4. Kiểu trả về chuẩn (ApiResponse<T>)
// ===============================
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// ===============================
// 🔹 5. Các hàm tiện ích (wrapper)
// ===============================
export async function get<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const res = await apiClient.get<T>(url, config);
  return res.data as ApiResponse<T>;
}

export async function post<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const res = await apiClient.post<T>(url, data, config);
  return res.data as ApiResponse<T>;
}

export async function put<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const res = await apiClient.put<T>(url, data, config);
  return res.data as ApiResponse<T>;
}

export async function del<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const res = await apiClient.delete<T>(url, config);
  return res.data as ApiResponse<T>;
}

// ===============================
// 🔹 6. Export mặc định instance
// ===============================
export default apiClient;
