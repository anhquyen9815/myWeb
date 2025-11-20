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

const AppRoutes: React.FC = () => (
    <Routes>
        {/* ROUTE CHA CỐ ĐỊNH: Luôn render MainLayout */}
        <Route path='/' element={<MainLayout />}>

            {/* ROUTE CON 1: Trang chủ (Index) - Render trong <Outlet /> */}
            <Route index element={<HomeScreen />} />
            <Route path={SCREEN_PATH.PRODUCTMANAGER} element={<ProductManager />} />
            <Route path={SCREEN_PATH.BRANDMANAGER} element={<BrandManager />} />
            <Route path={SCREEN_PATH.ADDPRODUCT} element={<AddProductForm />} />
            <Route path={SCREEN_PATH.ADMIN} element={<AdminScreen />} />
            {/* <Route path={SCREEN_PATH.PRODUCTDETAIL} element={<ProductDetail />} /> */}
            <Route path="/:categorySlug/:productSlug" element={<ProductDetail />} />
            <Route path={SCREEN_PATH.PRODUCTPAGE} element={<ProductPage />} />
            <Route path={SCREEN_PATH.ATTRIBUTEADD} element={<AddAttributeDefinitionForm />} />

            <Route path={SCREEN_PATH.ADDLISTPRODUCT} element={<ProductAddNewListScreen />} />
            <Route path={SCREEN_PATH.PRODUCTUPDATEGALLERY} element={<ProductUpdateGalleryScreen />} />
            <Route path={SCREEN_PATH.BRANDCATEGORYCREAT} element={<BrandCategoryCreate />} />
            <Route path={SCREEN_PATH.WARRANTYMANAGER} element={<WarrantyManagerScreen />} />

        </Route>

        <Route path={SCREEN_PATH.LOGIN} element={<LoginPageScreen />} />

        {/* Route ngoài (ví dụ: Login không có Header) */}

    </Routes>
);

export default AppRoutes;