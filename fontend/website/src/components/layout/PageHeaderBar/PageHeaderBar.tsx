// src/components/common/PageHeaderBar.tsx

import React from 'react';
import { Box, Typography, Link as MuiLink, Stack } from '@mui/material';
import { ChevronRight } from 'lucide-react'; // Icon mũi tên

// 1. Định nghĩa kiểu dữ liệu cho Breadcrumbs
interface BreadcrumbItem {
    label: string;
    path: string;
}

interface PageHeaderBarProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
}

const PageHeaderBar: React.FC<PageHeaderBarProps> = ({ title, breadcrumbs }) => {
    
    // Màu nền chính (Xanh dương đậm như trong ảnh)
    const bgColor = '#4A90E2'; 
    const textColor = 'white';
    
    return (
        <Box 
            component="header"
            sx={{
                width: '100%',
                bgcolor: bgColor, // Màu nền xanh dương
                color: textColor,
                py: 2, // Padding dọc lớn (tương đương 16px)
                px: { xs: 2, md: 4 }, // Padding ngang đáp ứng
                boxShadow: 2, // Độ nổi nhẹ
                // Đảm bảo nội dung luôn nằm trong max-width của ứng dụng
                display: 'flex', 
                justifyContent: 'center', // Căn giữa nội dung
                mb: 0, 
            }}
        >
            {/* CONTAINER NỘI DUNG (Căn giữa theo chiều ngang) */}
            <Box sx={{ 
                maxWidth: 1200, 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
            }}>
                
                {/* 1. TIÊU ĐỀ CHÍNH (TRÁI) */}
                <Typography 
                    // variant="h6" 
                    fontSize={'17px'}
                    fontWeight="bold"
                    color="inherit" // Kế thừa màu trắng
                >
                    {title}
                </Typography>

                {/* 2. BREADCRUMBS (PHẢI) */}
                <Stack 
                    direction="row" 
                    spacing={1} 
                    alignItems="center"
                    sx={{ color: textColor }} // Màu chữ toàn cục
                >
                    {breadcrumbs.map((item, index) => (
                        <React.Fragment key={item.path}>
                            {/* Dùng Link cho các mục có thể click (trừ mục cuối) */}
                            {index < breadcrumbs.length - 1 ? (
                                <MuiLink 
                                    href={item.path} 
                                    color="inherit" 
                                    sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                                >
                                    <Typography variant="body2" color="inherit">
                                        {item.label.toUpperCase()}
                                    </Typography>
                                </MuiLink>
                            ) : (
                                // Mục cuối cùng (current page)
                                <Typography variant="body2" fontWeight="bold" color="inherit">
                                    {item.label.toUpperCase()}
                                </Typography>
                            )}

                            {/* Dấu phân cách (>) */}
                            {index < breadcrumbs.length - 1 && (
                                <ChevronRight size={14} style={{ flexShrink: 0 }} />
                            )}
                        </React.Fragment>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
};

export default PageHeaderBar;