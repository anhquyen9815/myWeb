// src/pages/Auth/LoginPageScreen.tsx

import React from 'react';
import { useLoginLogic } from '@/hooks/useLoginLogic'; // 1. IMPORT HOOK
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
// import { Link as MuiLink } from 'react-router-dom'; // Dùng Link của Router

const LoginPageScreen: React.FC = () => {
    // 2. SỬ DỤNG HOOK
    const { 
        credentials, 
        isLoading, 
        loginError, 
        handleInputChange, 
        handleLogin 
    } = useLoginLogic();

    return (
        <Paper elevation={4} sx={{ maxWidth: 400, margin: '50px auto', p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3 }} align="center">
                Đăng nhập Cổng thông tin
            </Typography>
            
            {/* FORM */}
            <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                
                <TextField
                    label="Tên đăng nhập"
                    name="username"
                    value={credentials.username}
                    onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                    disabled={isLoading}
                    fullWidth
                    size="small"
                />
                <TextField
                    label="Mật khẩu"
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                    disabled={isLoading}
                    fullWidth
                    size="small"
                />
                
                {/* HIỂN THỊ LỖI TỪ REDUX */}
                {loginError && (
                    <Typography color="error" variant="body2" align="center">
                        {loginError}
                    </Typography>
                )}
                
                <Button type="submit" variant="contained" disabled={isLoading}>
                    {isLoading ? 'Đang xác thực...' : 'Đăng nhập'}
                </Button>

                {/* <MuiLink component={Link} to="/dang-ky" align="center" variant="body2">
                    Chưa có tài khoản? Đăng ký ngay.
                </MuiLink> */}
            </Box>
        </Paper>
    );
};

export default LoginPageScreen;