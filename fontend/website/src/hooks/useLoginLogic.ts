// src/hooks/useLoginLogic.ts

import { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store'; // Import types
import { loginUser } from '@/store/authSlice'; // Import Thunk
import { useNavigate } from 'react-router-dom'; // Hook điều hướng

// Định nghĩa kiểu dữ liệu cho Credentials
interface LoginCredentials {
    username: string;
    password: string;
}

const initialCredentials: LoginCredentials = {
    username: '',
    password: '',
};

export const useLoginLogic = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate(); // Khởi tạo hook điều hướng
    
    // State cục bộ cho Form
    const [credentials, setCredentials] = useState<LoginCredentials>(initialCredentials);

    // Lấy trạng thái loading từ Redux (tùy chọn)
    const isLoading = useSelector((state: RootState) => state.auth.loadingStatus === 'pending');
    const loginError = useSelector((state: RootState) => state.auth.error); // Lấy lỗi từ state

    // Hàm xử lý thay đổi Input
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }, []);

    // HÀM XỬ LÝ ĐĂNG NHẬP (LOGIC GỐC CỦA BẠN)
    const handleLogin = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (!credentials.username || !credentials.password) {
            alert('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
            return;
        }

        // GỌI THUNK VÀ CHỜ KẾT QUẢ
        const resultAction = await dispatch(loginUser(credentials));

        // Xử lý kết quả sau khi Thunk hoàn thành
        if (loginUser.fulfilled.match(resultAction)) {
            console.log('Đăng nhập thành công:', resultAction.payload);
            // CHUYỂN HƯỚNG SAU KHI THÀNH CÔNG
            navigate('/'); // Chuyển về trang chủ
        } else if (loginUser.rejected.match(resultAction)) {
            // Lỗi đã được lưu vào Redux state, giờ chỉ cần thông báo
            console.error('Đăng nhập thất bại:', resultAction.payload);
            // Lỗi sẽ tự động hiển thị qua useSelector(loginError) trong component
        }
    }, [credentials, dispatch, navigate]);
    
    // Trả về tất cả các giá trị và hàm cần thiết
    return useMemo(() => ({
        credentials,
        isLoading,
        loginError,
        handleInputChange,
        handleLogin,
    }), [credentials, isLoading, loginError, handleInputChange, handleLogin]);
};