import React, {useEffect} from 'react';
import { Button, Typography, useTheme, Box, Stack } from '@mui/material';
import './HomeScreen.scss';
import { useWindowSize } from '@/hooks/useWindowSize';
import { CategoryBar } from './components/CategoryBar';
import PhoneList from './components/PhoneList';
import { useProductHooks } from '@/hooks/productHooks';
import { useCategoryHooks } from '@/hooks/categoryHooks';

const HomeScreen: React.FC = () => {
    const { width } = useWindowSize();
    const { useGetList } = useProductHooks();
    const { useGetList: useGetListCategory } = useCategoryHooks();
    const { data: listProduct, } = useGetList(1, '', 5);
    const { data: listCategory, } = useGetListCategory(1, '', 50);
      useEffect(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, []);
    return (
        // Sử dụng Box cho container chính (Full Screen)
        <Box
            // className='container'
            sx={{
                // width: `${width}px`,
                minHeight: '100vh',
                padding: 2,
                margin: 0,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '1000px'
                // bgcolor:'blue'
            }}
        >

            <CategoryBar />
            {listCategory?.data?.items.map((cate) => (
                <PhoneList
                    title={cate.name}
                    categoryId={cate.id}
                    categoryName={cate.name}
                />
            ))}



        </Box>
    );
};

export default HomeScreen;