import React, { useEffect } from 'react';
import {  useTheme,  Box, Stack, useMediaQuery } from '@mui/material';
import ProductImageGallery from './components/ProductImageGallery';
import { useLocation } from "react-router-dom";
import type { Product } from '@/types/product'
import ProductOptionSelector from './components/ProductOptionSelector';
import PromotionCard from './components/Promotion';
import CommitmentCard from './components/CommitmentCard';
import { SCREEN_PATH } from '@/constants/screenPaths';
import BreadcrumbNav, { type BreadcrumbItem } from '@/components/common/BreadcrumbNav';


const ProductDetail: React.FC = () => {
    const location = useLocation();
    const { product } = location.state as { product?: Product } || {};
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const categoryName = product?.category?.name || ''
    const brandName = product?.brand?.name || ''
    const brandId = product?.brand?.id || 1
    const categoryId = product?.category?.id || 1
    const listImage = product?.gallery?.length ? product?.gallery?.split(';') : [product?.image || '']
    console.log('Quyen listImage,', listImage)
    const items: BreadcrumbItem[] = [
        { label: 'Trang chủ', href: "/" },
        { label: categoryName, href: SCREEN_PATH.PRODUCTPAGE, params: { categoryId, categoryName } },
        { label: `${categoryName} ${brandName}` },
    ];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
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
            }}
        >
            <BreadcrumbNav items={items} />

            {product && <Stack direction={{ xs: 'column', md: 'row', }} spacing={2}>
                {/* CỘT BÊN TRÁI */}
                <Stack spacing={2} flex={3}>
                    <ProductImageGallery
                        avatar={product.image || ''}
                        images={listImage} />
                    {!isMobile && <CommitmentCard />}
                </Stack>

                {/* CỘT BÊN PHẢI */}
                <Stack spacing={1} flex={2}>
                    <ProductOptionSelector
                        productDetail={product}
                        rating={4.8}
                        reviewCount={17}
                        versions={[
                            { label: "256GB", price: 37990000 },
                            { label: "512GB", price: 44490000 },
                            { label: "1TB", price: 50990000 },
                            { label: "2TB", price: 63990000 },
                        ]}
                        colors={[
                            { label: "Cam Vũ Trụ", price: 37990000 },
                            { label: "Xanh Đậm", price: 37990000 },
                            { label: "Bạc", price: 37990000 },
                        ]}
                        warranties={[
                            { label: "1 đổi 1 12 tháng", priceDiff: 0, isDefault: true },
                            { label: "1 đổi 1 24 tháng", priceDiff: 1200000 },
                        ]}
                        onOrder={() => alert("Đặt hàng thành công!")}
                    />
                    <PromotionCard />
                    {isMobile && <CommitmentCard />}

                </Stack>
            </Stack>}

        </Box>
    );
};

export default ProductDetail;