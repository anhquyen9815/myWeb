import React, { useEffect, useState, useRef } from "react";
import {
    Box,
    Button,
    Stack,
} from "@mui/material";
import { useProductHooks } from '@/hooks/productHooks';
import { useBrandCategoryHooks } from '@/hooks/brandCtegoryHooks';
import { useNavigate } from "react-router-dom";
import type { Product } from '@/types/product'
import ProductItem from "@/components/common/ProductItem";
import { SCREEN_PATH } from "@/constants/screenPaths";
import SaveIcon from "@mui/icons-material/ArrowCircleRight";
import type { Category } from "@/types/category";

interface PhoneListProps {
    title?: string;
    categoryId: number;
    categoryName: string
}


const PhoneList: React.FC<PhoneListProps> = ({ title = "ĐIỆN THOẠI", categoryId, categoryName }) => {
    const navigate = useNavigate();
    const [selectedBrand, setSelectedBrand] = useState<number>(0);
    const { getFilteredProducts, filteredProducts } = useProductHooks();
    const { getFilteredBrandCategories, filteredBrandCategories, } = useBrandCategoryHooks();
    // Ref để tham chiếu đến container cuộn
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        getFilteredBrandCategories({ page: 1, size: 50, categoryId })
    }, [])

    useEffect(() => {
        if (filteredBrandCategories && filteredBrandCategories.items && filteredBrandCategories.items.length) {
            setSelectedBrand(filteredBrandCategories.items[0].brandId)
        }
    }, [filteredBrandCategories])

    useEffect(() => {
        if (selectedBrand) {
            getFilteredProducts({ page: 1, size: 5, categoryId, brandId: selectedBrand })
        }
    }, [selectedBrand])

    // const filtered = products.filter((p) =>
    //     selectedBrand === "Điện thoại" ? true : p.brandId === selectedBrand
    // );

    const handleClick = () => {
        navigate(SCREEN_PATH.PRODUCTPAGE, {
            state: { categoryId, categoryName: title }, // 👈 truyền props qua state
        });
    };

     const handleClickAll = () => {
                navigate(SCREEN_PATH.PRODUCTPAGE, {
                    state: {categoryId, categoryName}, // 👈 truyền props qua state
                });
            };

    return (
        <Box
            sx={{
                width: "100vw",
                maxWidth: '1200px',
                px: 1,
                py: 2,

            }}
        >
            <Stack
                flexDirection={{ xs: "column", md: "row" }}
                display={'flex'}
                alignItems={{ xs: "flex-start", md: "center" }}
                justifyContent={{ xs: "flex-start", md: "space-between" }}
            >
                {/* Header */}
                <button onClick={() => handleClick()}
                    style={{
                        background: '#000',
                        color: '#fff',
                        fontWeight: '800',
                        fontSize: 22,
                        padding: 10
                    }}
                >
                    {title}
                </button>
                <Box
                    ref={scrollContainerRef}
                    sx={{
                        display: 'flex',
                        overflowX: 'auto', // QUAN TRỌNG: Cho phép cuộn ngang
                        scrollBehavior: 'smooth',
                        '&::-webkit-scrollbar': { display: 'none' }, // Ẩn thanh cuộn trên WebKit
                        msOverflowStyle: 'none', // Ẩn thanh cuộn trên IE/Edge
                        py: 1, // Padding dọc nhẹ
                        gap: 1.5,
                        ml: 1,
                        flex: 1,
                        justifyContent: { md: "flex-end", xs: "flex-start" },
                        WebkitOverflowScrolling: 'touch',
                        width: '100%',
                    }}
                >
                    {filteredBrandCategories?.items.map((b) => (
                        <Button
                            key={b.id}
                            onClick={() => setSelectedBrand(b.brandId)}
                            variant={selectedBrand === b.brandId ? "contained" : "outlined"}
                            color={selectedBrand === b.brandId ? "primary" : "inherit"}
                            sx={{
                                borderRadius: 10,
                                textTransform: "none",
                                fontWeight: 500,
                                px: 1,
                                py: 1,
                                flexShrink: 0,
                            }}
                        >
                            {b.brandName}
                        </Button>
                    ))}
                </Box>
            </Stack>

            {/* Product Scroll Area */}
            <Box
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    gap: 1,
                    pb: 2,
                    mt: 1,
                    "&::-webkit-scrollbar": { display: 'none' },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#ccc",
                        borderRadius: 4,
                    },
                }}
            >
                {filteredProducts?.items.map((p: Product, index: number) => (<ProductItem product={p} index={index} />))}
                <Box sx={{ display: 'flex', alignItems: 'center', px: '10px' }}>
                    <Button
                        sx={{ px: '10px', py: '5px', width: '100px' }}
                        onClick={handleClickAll}
                        variant="contained"
                        color="primary"
                        endIcon={<SaveIcon />}
                        size='medium'>
                        ...
                    </Button>
                </Box>

            </Box>
        </Box>
    );
};

export default PhoneList;
