import React from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    Chip,
} from "@mui/material";

export interface PromotionItem {
    id: number;
    text: string;
}

export interface PromotionCardProps {
    title?: string; // Tiêu đề khuyến mãi
    borderColor?: string; // Màu viền
    backgroundColor?: string; // Màu nền
}

const promotions: PromotionItem[] = [
    {
        id: 1,
        text: "Phiếu mua hàng máy lọc nước trị giá 100.000đ",
    },
    {
        id: 2,
        text: "Phiếu mua hàng Tivi trị giá 150.000đ",
    },
    {
        id: 4,
        text: "Phiếu mua hàng Tủ lạnh trị giá 150.000đ",
    },
    {
        id: 5,
        text: "Miễn phí giao hàng tận nhà bán kính 15km",
    },
    {
        id: 6,
        text: "Miễn phí công lắp đặt",
    },
    {
        id: 7,
        text: "Tặng bộ 6 cốc thủy tinh hoặc 1 ấm siêu tốc 1.5L",
    },
];

const PromotionCard: React.FC<PromotionCardProps> = ({
    title = "Khuyến mãi hấp dẫn",
    borderColor = "#f4c542",
    backgroundColor = "#fffaf0",
}) => {
    return (
        <Paper
            elevation={3}
            sx={{
                border: `1px dashed ${borderColor}`,
                borderRadius: 2,
                p: 2,
                maxWidth: 600,
                mx: "auto",
                bgcolor: backgroundColor,
            }}
        >

            {/* <Divider sx={{ my: 2 }} /> */}

            {/* Tiêu đề khuyến mãi */}
            <Box display="flex" alignItems="center" mb={1}>
                <Typography
                    variant="h6"
                    sx={{
                        color: "#d32f2f",
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 600,
                    }}
                >
                    🎁 {title}
                </Typography>
            </Box>

            {/* Danh sách khuyến mãi */}
            <List dense>
                {promotions.map((item) => (
                    <ListItem key={item.id} alignItems="center" sx={{ pl: 0 }}>
                        <Chip
                            label={item.id}
                            size="small"
                            color="error"
                            sx={{ mr: 1, fontWeight: 600 }}
                        />
                        <ListItemText
                            primary={
                                <Typography variant="body2" sx={{ fontSize: "0.95rem" }}>
                                    {item.text}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default PromotionCard;
