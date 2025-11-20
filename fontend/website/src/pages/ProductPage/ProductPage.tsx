import React, { useState, useEffect } from 'react';
import { Button, Box, } from '@mui/material';
import { useProductHooks } from '@/hooks/productHooks';
import BreadcrumbNav from '@/components/common/BreadcrumbNav';
import { useLocation } from "react-router-dom";
import type { OptionFilterProduct, Product } from '@/types/product';
import ProductItem from '@/components/common/ProductItem';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterBySort from './components/FilterBySort';
import FilterByCategory from './components/FilterByCategory';
import FilterByAttribute from './components/FilterByAttribute';

const ProductPage: React.FC = () => {
    const location = useLocation();
    const { categoryId, categoryName } = location.state as { categoryId: number, categoryName: string } || {};
    const { getFilteredProducts, filteredProducts } = useProductHooks();
    const [page, setPage] = useState<number>(1)
    const [optionFilter, setOptionFilter] = useState<OptionFilterProduct>({ page, size: 15, categoryId });
    const totalProduct = filteredProducts?.total || 0
    const lengthProduct = filteredProducts?.items.length || 0
    const items = [
        { label: 'Trang chủ', href: "/" },
        { label: categoryName, },
    ];

    useEffect(() => {
        getFilteredProducts(optionFilter)
    }, [optionFilter])


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleFilter = (option: OptionFilterProduct) => {
        setPage(option.page || 1)
        setOptionFilter(option)
    }

    return (
        // Sử dụng Box cho container chính (Full Screen)
        <Box
            sx={{
                minHeight: '100vh',
                padding: 2,
                margin: 0,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '1200px',
                width: "100%",
                boxSizing: 'border-box',
                // bgcolor: 'red'
            }}
        >

            <BreadcrumbNav items={items} />
            <FilterByCategory categoryId={categoryId} optionFilter={optionFilter} handleFilter={handleFilter} />
            <FilterByAttribute categoryId={categoryId} optionFilter={optionFilter} handleFilter={handleFilter} />
            <FilterBySort optionFilter={optionFilter} handleFilter={handleFilter} />
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",     // ✅ cho phép xuống dòng
                    gap: '1%',               // khoảng cách giữa các item (Material UI spacing)
                    justifyContent: "flex-start", // căn trái (hoặc "center" nếu muốn giữa)
                    mt: 1,
                    width: '100%',
                    // bgcolor: 'red',
                    pl: '10px'
                }}
            >
                {filteredProducts?.items
                    .map((p: Product, index: number) => (
                        <ProductItem product={p} index={index} />
                    ))}

            </Box>
            {totalProduct > lengthProduct
                ? <Button
                    onClick={() => {
                        const newPage = page + 1
                        setPage(newPage)
                        setOptionFilter({ ...optionFilter, page: newPage })
                    }}
                    variant="outlined"
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mx: "auto",                 // 👈 căn giữa theo chiều ngang
                        mt: 3,                      // khoảng cách phía trên
                        px: 4,                      // padding ngang
                        // py: 1,                    // padding dọc
                        borderRadius: "10px",     // 👈 bo tròn full pill
                        textTransform: "none",      // bỏ viết hoa chữ
                        fontWeight: 600,
                        fontSize: "1rem",
                        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)", // 👈 bóng nhẹ
                        backgroundColor: "#fff",
                        color: "#000",
                        "&:hover": {
                            backgroundColor: "#f5f5f5",
                            boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
                        },
                    }}
                >
                    Xem thêm {totalProduct - lengthProduct} sản phẩm
                </Button>
                : null}

        </Box>
    );
};

export default ProductPage;