import React, { useState } from 'react';
import {
    Box,
    Typography,
    Stack,
    Paper,
    Button,
} from '@mui/material';
import { SCREEN_PATH } from '@/constants/screenPaths';
import { useNavigate } from "react-router-dom";

export const AdminScreen: React.FC = () => {
    const navigate = useNavigate();
    const listData = [
        {
            name: 'Sản phẩm',
            path: SCREEN_PATH.PRODUCTMANAGER,
        },
        {
            name: 'Thêm mới sản phẩm',
            path: SCREEN_PATH.ADDPRODUCT,
        },
        {
            name: 'Thêm mới nhiều sản phẩm',
            path: SCREEN_PATH.ADDLISTPRODUCT,
        },
         {
            name: 'Cập nhật DS ảnh sản phẩm',
            path: SCREEN_PATH.PRODUCTUPDATEGALLERY,
        },
        
        {
            name: 'Thương hiệu',
            path: SCREEN_PATH.BRANDMANAGER,
        },
        {
            name: 'Brand x Category',
            path: SCREEN_PATH.BRANDCATEGORYCREAT,
        },
        {
            name: 'Thêm mới thuộc tính',
            path: SCREEN_PATH.ATTRIBUTEADD,
        },
         {
            name: 'Bảo hành',
            path: SCREEN_PATH.WARRANTYMANAGER,
        },

    ]
    return (
        <Box sx={{ pl: 1, pr: 1, pt: 2, maxWidth: 1200, mb: 2   }} >
            <Typography variant="h5" mb={2}>Chức năng</Typography>

            {/* List */}
            <Stack
                direction="row"
                flexWrap="wrap"
                gap={2}
            >

                {listData.map((item, index) => (
                    <Button
                        sx={{
                            p: 0,
                        }}
                        key={index}
                        onClick={() => navigate(item.path)}
                    >
                        <Paper elevation={3} sx={{ px: 3, py: 1, }}>
                            <Typography component="span" variant="body1" fontWeight={700}>
                                {item.name}
                            </Typography>
                        </Paper>

                    </Button>


                ))}
            </Stack>
        </Box>
    );
};
