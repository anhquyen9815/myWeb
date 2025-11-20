import React, { useEffect, useState, useRef } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    Grid,
    useMediaQuery
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Product } from '@/types/product'



const ProductItem: React.FC<{ product: Product, index: number }> = ({ product, index }) => {
    const navigate = useNavigate();
    const handleClick = (product: Product) => {
        navigate(`/${product.category?.slug}/${product.slug}`, {
            state: { product: product }, // 👈 truyền props qua state
        });
    };

    return (
        <Card
            key={product.id}
            onClick={() => handleClick(product)}
            sx={{
                width: "calc(20% - 10px)",
                flexShrink: 0,
                position: "relative",
                borderRadius: 3,
                "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
                transition: "all 0.2s ease-in-out",
                pt: 1,
                mt: 2,
                // ml: 1,
            }}
        >
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    loading={index < 10 ? 'eager' : 'lazy'}
                    sx={{
                        width: '100%',        // chiếm full width card
                        height: 'auto',       // chiều cao theo tỉ lệ ảnh
                        display: 'block',
                        mx: 'auto',
                        objectFit: 'contain', // giữ toàn bộ ảnh, không crop
                        backgroundColor: '#fff', // nếu muốn nền trắng để thấy khoảng trống
                        px: 1
                    }}
                />
                {/* {product.promoText && (
                                <Chip
                                    label={product.promoText}
                                    color="error"
                                    size="small"
                                    sx={{
                                        position: "absolute",
                                        top: 8,
                                        left: 8,
                                        fontWeight: "bold",
                                        fontSize: "11px",
                                    }}
                                />
                            )} */}
            </Box>

            <CardContent sx={{ px: 1.5, py: 1, }}>
                <Typography
                    variant="body2"
                    fontWeight={500}

                    sx={{
                        lineHeight: 1.3,
                        minHeight: 40,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,         // Giới hạn 3 dòng
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {product.name}
                </Typography>

                <Box sx={{ mt: 1 }}>
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="error.main"
                    >
                        {product.discountPrice.toLocaleString("vi-VN")} ₫
                    </Typography>
                    <Stack flexDirection={'row'}>
                        {product.price && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ textDecoration: "line-through" }}
                            >
                                {product.price.toLocaleString("vi-VN")} ₫
                            </Typography>
                        )}
                        <Typography
                            variant="body2"
                            color="error.main"
                            ml={1}
                        >
                            -{100 - Math.round((product.discountPrice / product.price) * 100)}%
                        </Typography>
                    </Stack>
                </Box>

                <Typography variant="caption" color="text.secondary">
                    + 6 Khuyến mãi khác
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductItem;
