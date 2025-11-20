import React from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import type { Category } from '@/types/category';
import { useCategoryHooks } from '@/hooks/categoryHooks';
import { useNavigate } from "react-router-dom";
import { SCREEN_PATH } from "@/constants/screenPaths";


export const CategoryBar: React.FC = () => {
        const navigate = useNavigate();
    const { useGetList: useGetListCategory } = useCategoryHooks();
    const { data: listCategory, } = useGetListCategory(1, '', 50);

        const handleClick = (category: Category) => {
            navigate(SCREEN_PATH.PRODUCTPAGE, {
                state: {categoryId: category.id, categoryName: category.name }, // 👈 truyền props qua state
            });
        };
    return (
        <Box
            sx={{
                border: "4px solid #ffc300",
                borderRadius: "12px",
                background:
                    "linear-gradient(180deg, #ff6600 0%, #ffcc00 100%) padding-box, #fff border-box",
                maxWidth: '1200px',
                width: '100vw',
            }}
        >
            <Box
                sx={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    py: 2,
                    px: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        overflowX: "auto",
                        scrollBehavior: "smooth",
                        // maxHeight: 220, // Giới hạn để chỉ có 2 hàng
                        "&::-webkit-scrollbar": {
                            height: 8,
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#ffc300",
                            borderRadius: 4,
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "#ff6600",
                        },
                        scrollbarWidth: "none",
                    }}
                >
                    {listCategory?.data?.items.map((item: Category) => (
                        <Stack
                            key={item.id}
                            onClick={() => handleClick(item)}
                            alignItems="center"
                            justifyContent="center"
                            spacing={0}
                            sx={{
                                width: { xs: '15%', sm: '17%', md: '18%' },
                                // width: '18%',
                                position: "relative",
                                flex: "0 0 auto", // quan trọng: không co giãn khi cuộn
                                cursor: "pointer",
                                // mx: 1,
                                // pb: 1,
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    transition: "0.2s",
                                    bgcolor: '#ffc30050'
                                },
                            }}
                        >
                            {/* {item.badge && (
                <Chip
                  label={item.badge}
                  color="error"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: -8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontWeight: "bold",
                    fontSize: "0.7rem",
                  }}
                />
              )} */}
                            <Box
                                component="img"
                                src={item.image}
                                // alt={item.name}
                                sx={{
                                    width: 50,
                                    // height: 50,
                                    objectFit: "contain",
                                }}
                            />
                            <Typography
                                variant='subtitle2'
                                sx={{
                                    textAlign: "center",
                                    fontWeight: 500,
                                    color: "#333",
                                    lineHeight: 1.2,
                                    mt: -1
                                }}
                            >
                                {item.name}
                            </Typography>
                        </Stack>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
