// src/routes/index.tsx (Ví dụ với React Router DOM)

import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import HomeScreen from '@/pages/Home/HomeScreen';
import { SCREEN_PATH } from '@/constants/screenPaths';
import LoginPageScreen from '@/pages/Auth/LoginPage';
import { ProductManager } from '@/pages/Admin/Product/ProductManager';
import { BrandManager } from '@/pages/Brand/BrandManager';
import AddProductForm from '@/pages/ProductAddNew/AddProductForm';
import { AdminScreen } from '@/pages/Admin/AdminScreen';
import { ProductAddNewListScreen } from '@/pages/ProductAddNewList/ProductAddNewList';
import BrandCategoryCreate from '@/pages/BrandCategoryCreate/BrandCategoryCreate';
import ProductDetail from '@/pages/ProductDetail/ProductDetail';
import ProductPage from '@/pages/ProductPage/ProductPage';
import AddAttributeDefinitionForm from '@/pages/AttributeDefinition/AddAttributeDefinitionForm';
import { ProductUpdateGalleryScreen } from '@/pages/ProductUpdateGallery/ProductUpdateGallery';
import { WarrantyManagerScreen } from '@/pages/WarrantyManager/WarrantyManager';
import { ProductModelGroupManagerScreen } from '@/pages/ProductModelGroupManager/ProductModelGroup';

const AppRoutes: React.FC = () => (
    <Routes>
        {/* ROUTE CHA CỐ ĐỊNH: Luôn render MainLayout */}
        <Route path='/' element={<MainLayout />}>

            {/* ROUTE CON 1: Trang chủ (Index) - Render trong <Outlet /> */}
            <Route index element={<HomeScreen />} />
            <Route path={SCREEN_PATH.PRODUCT_MANAGER} element={<ProductManager />} />
            <Route path={SCREEN_PATH.BRAND_MANAGER} element={<BrandManager />} />
            <Route path={SCREEN_PATH.ADD_PRODUCT} element={<AddProductForm />} />
            <Route path={SCREEN_PATH.ADMIN} element={<AdminScreen />} />
            {/* <Route path={SCREEN_PATH.PRODUCT_DETAIL} element={<ProductDetail />} /> */}
            <Route path="/:categorySlug/:productSlug" element={<ProductDetail />} />
            <Route path={SCREEN_PATH.PRODUCT_PAGE} element={<ProductPage />} />
            <Route path={SCREEN_PATH.ATTRIBUTE_ADD} element={<AddAttributeDefinitionForm />} />

            <Route path={SCREEN_PATH.ADD_LIST_PRODUCT} element={<ProductAddNewListScreen />} />
            <Route path={SCREEN_PATH.PRODUCT_UPDATE_GALLERY} element={<ProductUpdateGalleryScreen />} />
            <Route path={SCREEN_PATH.BRAND_CATEGORY_CREAT} element={<BrandCategoryCreate />} />
            <Route path={SCREEN_PATH.WARRANTY_MANAGER} element={<WarrantyManagerScreen />} />
            <Route path={SCREEN_PATH.PRODUCT_MODEL_GROUP_MANAGER} element={<ProductModelGroupManagerScreen />} />

        </Route>

        <Route path={SCREEN_PATH.LOGIN} element={<LoginPageScreen />} />

        {/* Route ngoài (ví dụ: Login không có Header) */}

    </Routes>
);

export default AppRoutes;