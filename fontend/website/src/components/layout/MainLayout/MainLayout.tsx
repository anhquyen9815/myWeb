// src/components/layout/MainLayout/MainLayout.tsx

import React, { useState, useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; // QUAN TRỌNG: Nơi nội dung con sẽ được render
import AuxBar from '../AuxBar/AuxBar';
import PrimaryBar from '../PrimaryBar/PrimaryBar';
import { GlobalContext } from '@/contexts/GlobalVariableContext';
import { Box } from '@mui/material';
import AppFooter from '../AppFooter/AppFooter';

const MainLayout: React.FC = () => {
    const { auxBarHeight } = useContext(GlobalContext);
    const rootBody = document.body;
    rootBody.style.paddingTop = `${auxBarHeight}px`;

    return (
        <div className="portal-layout" >
            {/* 1. HEADER CỐ ĐỊNH Ở TRÊN CÙNG */}
            <AuxBar />
            {/* <PrimaryBar /> */}

            {/* 2. KHU VỰC NỘI DUNG THAY ĐỔI */}
            <main className="page-content-wrapper">
                <Box sx={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
                    <Outlet />
                </Box>
            </main>
            <AppFooter />
        </div>
    );
};

export default MainLayout;