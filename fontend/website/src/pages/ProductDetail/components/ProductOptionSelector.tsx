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
    label: string;
    price: number;
    image?: string;
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
    colors: OptionItem[];
    warranties: WarrantyOption[];
    onOrder?: () => void;
    productDetail: Product
}

const ProductOptionSelector: React.FC<ProductOptionSelectorProps> = ({
    rating = 5,
    reviewCount = 0,
    versions,
    colors,
    warranties,
    onOrder,
    productDetail
}) => {
    const [version, setVersion] = React.useState(versions[0].label);
    const [color, setColor] = React.useState(colors[0].label);
    const [warranty, setWarranty] = React.useState(
        warranties.find((w) => w.isDefault)?.label || warranties[0].label
    );

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
                <ToggleButtonGroup
                    exclusive
                    value={version}
                    onChange={(_, v) => v && setVersion(v)}
                    // sx={{ flexWrap: "wrap", gap: 2 }}
                    sx={{
                        gap: 1,
                        flexWrap: "wrap",
                        "& .MuiToggleButtonGroup-grouped": {
                            borderLeft: "1px solid",
                            borderColor: "divider", // hoặc custom màu bạn muốn
                            marginLeft: 0,
                            "&:not(:first-of-type)": {
                                borderLeft: "1px solid",
                                borderColor: "divider",
                            },
                        },
                    }}

                >
                    {versions.map((v) => (
                        <ToggleButton
                            key={v.label}
                            value={v.label}
                            sx={{
                                position: "relative",
                                borderRadius: 2,
                                borderColor: version === v.label ? "error.main" : "divider",
                                color: version === v.label ? "error.main" : "text.primary",
                                bgcolor: version === v.label ? "rgba(255,0,0,0.05)" : "transparent",
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
                            {version === v.label && (
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

                            <Box textAlign="center" px={1}>
                                <Typography fontWeight={600}>{v.label}</Typography>
                            </Box>
                        </ToggleButton>
                    ))}

                </ToggleButtonGroup>
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
                Liên hệ 093-686-2366 để nhận hàng
            </Button>
        </Paper>
    );
};

export default ProductOptionSelector;
