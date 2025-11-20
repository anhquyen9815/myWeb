import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Cấu hình Store
export const store = configureStore({
  reducer: {
    // Đăng ký các reducers tại đây (ví dụ: authReducer)
    auth: authReducer, 
    // invoices: invoiceReducer, // Thêm các reducers khác khi dự án mở rộng
  },
  // Có thể thêm middleware, devtools config tại đây
});

// Định nghĩa kiểu dữ liệu cho RootState và AppDispatch (Bắt buộc cho TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;