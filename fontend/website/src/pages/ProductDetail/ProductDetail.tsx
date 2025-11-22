import React, { useEffect, useState } from 'react';
import { useTheme, Box, Stack, useMediaQuery } from '@mui/material';
import ProductImageGallery from './components/ProductImageGallery';
import { useLocation } from "react-router-dom";
import type { Product } from '@/types/product'
import ProductOptionSelector from './components/ProductOptionSelector';
import PromotionCard from './components/Promotion';
import CommitmentCard from './components/CommitmentCard';
import { SCREEN_PATH } from '@/constants/screenPaths';
import BreadcrumbNav, { type BreadcrumbItem } from '@/components/common/BreadcrumbNav';
import { useProductHooks } from '@/hooks/productHooks';


const ProductDetail: React.FC = () => {
    const location = useLocation();
    const { productId } = location.state as { productId?: number } || {};
    const { useGetDetail } = useProductHooks();
    const { getGroupProducts, groupProducts } = useProductHooks();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [productIdNew, setProductIdNew] = useState<number>(productId || 0)
    console.log('Quyen groupProducts', groupProducts)

    const { data: productDetail } = useGetDetail(productIdNew);
    const categoryName = productDetail?.data?.category?.name || ''
    const brandName = productDetail?.data?.brand?.name || ''
    const categoryId = productDetail?.data?.category?.id || 1
    const productModelGroupId = productDetail?.data?.productModelGroupId
    const listImage = productDetail?.data?.gallery?.length ? productDetail?.data?.gallery?.split(';') : [productDetail?.data?.image || '']
    const items: BreadcrumbItem[] = [
        { label: 'Trang chủ', href: "/" },
        { label: categoryName, href: SCREEN_PATH.PRODUCT_PAGE, params: { categoryId, categoryName } },
        { label: `${categoryName} ${brandName}` },
    ];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (productModelGroupId) {
            console.log('Quyen productModelGroupId', productModelGroupId)
            getGroupProducts({ page: 1, size: 10, productModelGroupId })
        }
    }, [productModelGroupId])



    //  useEffect(() => {
    //   productId && useGetDetail(productId)
    // }, []);

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

            {productDetail?.data && <Stack direction={{ xs: 'column', md: 'row', }} spacing={2}>
                {/* CỘT BÊN TRÁI */}
                <Stack spacing={2} flex={3}>
                    <ProductImageGallery
                        avatar={productDetail?.data.image || ''}
                        images={listImage} />
                    {!isMobile && <CommitmentCard warranty={productDetail?.data?.warranty} categoryId={productDetail?.data.categoryId} />}
                </Stack>

                {/* CỘT BÊN PHẢI */}
                <Stack spacing={1} flex={2}>
                    <ProductOptionSelector
                        productDetail={productDetail?.data}
                        rating={4.8}
                        reviewCount={17}
                        versions={groupProducts?.items?.map(item => ({ label: item.primaryAttributeLabel, idProduct: item.id, image: item.image || '' })) || []}
                        onOrder={() => alert("Đặt hàng thành công!")}
                        onSelect={setProductIdNew}
                    />
                    <PromotionCard />
                    {isMobile && <CommitmentCard warranty={productDetail?.data?.warranty} categoryId={productDetail?.data.categoryId} />}

                </Stack>
            </Stack>}

        </Box>
    );
};

export default ProductDetail;