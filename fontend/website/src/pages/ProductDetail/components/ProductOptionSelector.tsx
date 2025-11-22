import React from "react";
import {
    Box,
    Typography,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Divider,
    Rating,
    Link,
    Paper,
    Stack
} from "@mui/material";
import type { Product } from "@/types/product";

interface OptionItem {
    label?: string;
    image: string;
    idProduct: number;
}

interface WarrantyOption {
    label: string;
    priceDiff: number;
    isDefault?: boolean;
}

interface ProductOptionSelectorProps {
    rating?: number;
    reviewCount?: number;
    versions: OptionItem[];
    onOrder?: () => void;
    productDetail: Product;
    onSelect: (idProduct: number) => void;
}

const ProductOptionSelector: React.FC<ProductOptionSelectorProps> = ({
    rating = 5,
    reviewCount = 0,
    versions,
    onOrder,
    productDetail,
    onSelect
}) => {
    const [version, setVersion] = React.useState('');


    return (
        <Paper sx={{ p: 3, borderRadius: 3, width: "100%", maxWidth: 500 }}>
            {/* Tên + Đánh giá */}
            <Typography variant="h6" fontWeight={700}>
                {productDetail.name}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                <Rating value={rating} precision={0.5} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                    ({reviewCount} đánh giá)
                </Typography>
                <Link href="#" underline="hover" sx={{ ml: 1, fontSize: 14 }}>
                    Thông số kỹ thuật
                </Link>
            </Box>

            {/* Giá */}
            <Typography
                variant="h4"
                color="error"
                fontWeight={700}
                mt={2}
            >
                {productDetail.discountPrice.toLocaleString("vi-VN")} ₫
            </Typography>
            <Stack flexDirection={'row'}>
                {productDetail.price && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: "line-through" }}
                    >
                        {productDetail.price.toLocaleString("vi-VN")} ₫
                    </Typography>
                )}
                <Typography
                    variant="body2"
                    color="error.main"
                    ml={1}
                >
                    -{100 - Math.round((productDetail.discountPrice / productDetail.price) * 100)}%
                </Typography>
            </Stack>

            {/* Phiên bản khác */}
            <Box mt={3}>
                <Typography variant="subtitle1" fontWeight={600} mb={1}>
                    Phiên bản khác
                </Typography>

                {versions.map((v) => (
                    <ToggleButton
                        key={v.label}
                        value={v.label || ''}
                        onClick={() => onSelect(v.idProduct)}
                        sx={{
                            p: 0.5,
                            mr: 2,
                            mt: 1,
                            position: "relative",
                            // borderRadius: 2,
                            borderColor: productDetail.id === v.idProduct ? "error.main" : "divider",
                            // borderColor: "error.main",
                            color: productDetail.id === v.idProduct ? "error.main" : "text.primary",
                            // bgcolor: productDetail.id === v.idProduct ? "rgba(255,0,0,0.05)" : "transparent",
                            "&.Mui-selected": {
                                bgcolor: "rgba(255,0,0,0.05)",
                                borderColor: "error.main",
                            },
                            "&:hover": {
                                borderColor: "error.light",
                            },

                        }}
                    >
                        {/* ✅ Dấu tick hiển thị khi chọn */}
                        {productDetail.id === v.idProduct && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 2,
                                    right: 2,
                                    width: 14,
                                    height: 14,
                                    borderRadius: "50%",
                                    bgcolor: "error.main",
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 12,
                                }}
                            >
                                ✓
                            </Box>
                        )}

                        <Box textAlign="center" px={1} textTransform={'none'}>
                            {v.label ? <Typography fontWeight={600}>{v.label}</Typography>
                                : <Box
                                    component="img"
                                    src={v.image}
                                    // alt={`thumb-${i}`}
                                    loading={'lazy'}
                                    sx={{
                                        width: "50px",          // ảnh nhỏ hơn ô, nằm giữa
                                        // height: "50px",
                                        objectFit: "contain", // giữ nguyên tỉ lệ
                                        display: "block",
                                        userSelect: "none",
                                        pointerEvents: "none",
                                    }}
                                />}

                        </Box>
                    </ToggleButton>
                ))}

            </Box>

            {/* Màu sắc */}
            {/* <Box mt={3}>
                <Typography variant="subtitle1" fontWeight={600} mb={1}>
                    Màu sắc
                </Typography>
                <ToggleButtonGroup
                    exclusive
                    value={color}
                    onChange={(_, v) => v && setColor(v)}
                    sx={{ flexWrap: "wrap", gap: 1 }}
                >
                    {colors.map((c) => (
                        <ToggleButton
                            key={c.label}
                            value={c.label}
                            sx={{
                                borderRadius: 2,
                                borderColor:
                                    color === c.label ? "error.main" : "divider",
                                color: color === c.label ? "error.main" : "text.primary",
                                "&.Mui-selected": {
                                    bgcolor: "rgba(255,0,0,0.05)",
                                    borderColor: "error.main",
                                },
                            }}
                        >
                            <Box textAlign="center">
                                {c.image && (
                                    <img
                                        src={c.image}
                                        alt={c.label}
                                        width={30}
                                        style={{ borderRadius: 4 }}
                                    />
                                )}
                                <Typography fontWeight={600}>{c.label}</Typography>
                                <Typography fontSize={13}>
                                    {c.price.toLocaleString("vi-VN")} ₫
                                </Typography>
                            </Box>
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Box> */}

            {/* Nút đặt hàng */}
            <Button
                fullWidth
                variant="contained"
                color="error"
                sx={{
                    mt: 3,
                    fontWeight: 700,
                    borderRadius: 2,
                    py: 1.5,
                }}
                onClick={onOrder}
            >
                Liên hệ 093.686.2366 để nhận hàng
            </Button>
        </Paper>
    );
};

export default ProductOptionSelector;
