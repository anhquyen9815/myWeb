// src/store/authSlice.ts

import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
// IMPORT HÀM GỌI API (Đã tách ra file service riêng)
import { loginApi } from '@/api/authService';
import { type LoginResponse, type LoginCredentials } from '@/types/auth';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
// Đảm bảo tạo file src/api/authService.ts và hàm loginApi

// 1. Định nghĩa kiểu dữ liệu cho trạng thái (State)
interface AuthState {
    isLoggedIn: boolean;
    username: string | null;
    loadingStatus: 'idle' | 'pending' | 'success' | 'failed'; // Thêm trạng thái tải
    error: string | null; // Thêm trường lưu thông báo lỗi
    token: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    username: null,
    loadingStatus: 'idle',
    error: null,
    token: localStorage.getItem('authToken'),
};

// 2. ĐỊNH NGHĨA ASYNC THUNK (CẦU NỐI ĐẾN API)
export const loginUser = createAsyncThunk<
    LoginResponse, // <--- ĐÃ SỬA: Kiểu trả về cho fulfilled
    LoginCredentials
>(
    API_ENDPOINTS.LOGIN,
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await loginApi(credentials); // Hàm này trả về LoginResponse
            return response; // <-- TRẢ VỀ TOÀN BỘ OBJECT
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Reducer đơn giản (thường dùng cho logic đồng bộ)
        logout(state) {
            state.isLoggedIn = false;
            state.username = null;
            state.loadingStatus = 'idle';
            state.error = null;
        },
        // Reducers đồng bộ khác nếu cần...
    },

    // 3. XỬ LÝ 3 TRẠNG THÁI CỦA ASYNC THUNK (EXTRA REDUCERS)
    extraReducers: (builder) => {
        builder
            // [PENDING] - Khi API đang chạy
            .addCase(loginUser.pending, (state) => {
                state.loadingStatus = 'pending';
                state.error = null;
            })
            // [FULFILLED] - Khi API THÀNH CÔNG
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.isLoggedIn = true;
                state.username = action.payload.user; // Payload là tên user được trả về từ API
                state.loadingStatus = 'success';
                state.error = null;
                state.token = action.payload.token;
            })
            // [REJECTED] - Khi API THẤT BẠI
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.username = null;
                state.loadingStatus = 'failed';
                // Lưu thông báo lỗi chi tiết để hiển thị cho người dùng
                state.error = (action.payload as string) || (action.error.message as string) || 'Đăng nhập thất bại.';
            });
    },
});

export const { logout } = authSlice.actions;

// Export Async Thunk và Reducer
export default authSlice.reducer;