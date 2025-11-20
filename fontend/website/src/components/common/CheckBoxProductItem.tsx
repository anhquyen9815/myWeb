import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Checkbox,
} from "@mui/material";
import type { Product } from '@/types/product'



const CheckBoxProductItem: React.FC<{
    product: Product,
    checked: boolean,
    onChange?: (checked: boolean, productId: number) => void;
    attribute?: string
}> = ({ product, checked, onChange, attribute }) => {


    return (
        <Card
            key={product.id}
            onClick={() => onChange?.(!checked, product.id)}
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

            {/* ✅ Checkbox ở góc trên bên phải */}
            <Checkbox
                checked={checked}
                onChange={(e) => onChange?.(e.target.checked, product.id)}
                sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    zIndex: 2,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    borderRadius: "50%",
                    "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                }}
            />

            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
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

            </Box>

            <CardContent sx={{ px: 1.5, py: 1, }}>
                <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{
                        lineHeight: 1.3,
                        minHeight: 40,
                        display: '-webkit-box',
                        WebkitLineClamp: 4,         // Giới hạn 3 dòng
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {product.name}
                </Typography>
                <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="error.main"
                >
                    {attribute}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CheckBoxProductItem;
