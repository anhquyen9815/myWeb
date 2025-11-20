import React from 'react';
import type {  CreateProductDTO, DataExcel } from '@/types/product';
import type { Brand } from '@/types/brand';
import type { Category } from '@/types/category';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Paper,
    InputAdornment,
    CircularProgress,
} from '@mui/material';
import SelectCP from '@/components/common/Select';
import { formatCurrency } from '@/utils/formatter';
import { useProductAddNewList } from './useProductAddNewList';
import { useNavigate } from "react-router-dom";
import { SCREEN_PATH } from '@/constants/screenPaths';

export const ProductAddNewListScreen: React.FC = () => {
    const navigate = useNavigate();
    const {
        listBrand,
        listCategory,
        searchKey,
        setSearchKey,
        productList,
        setProductList,
        handleClear,
        handleImport,
        handleFileUpload,
        dataExcel,
        indexSheetExcel,
        setIndexSheetExcel
    } = useProductAddNewList()

    return (
        <Box sx={{ px: 1, py: 1, display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }} >
            <Box display="flex"  my={0} mr={2}   >
                <Button
                    onClick={() => navigate('/')}
                    type="submit" variant="contained" color="primary" startIcon={<HomeIcon />} size="small">
                    Về trang chủ
                </Button>
            </Box>
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    width: '100%',
                    bgcolor: 'white',
                    // boxShadow: 1,
                    py: 1.5,
                    px: 2,
                    mb: 2,
                }}
            >
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    spacing={2}
                >
                    {/* Search */}
                    <Paper elevation={2} sx={{ p: 2, mb: 2, display: 'flex', gap: 1, flex: 1 }}>
                        <TextField
                            fullWidth
                            label="Tên hoặc mã sản phẩm"
                            placeholder="Nhập đi còn gì"
                            variant="outlined"
                            size="small"
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: searchKey ? (
                                    <InputAdornment position="end">
                                        <ClearIcon
                                            sx={{ cursor: 'pointer' }}
                                            onClick={handleClear}
                                        />
                                    </InputAdornment>
                                ) : null,
                                sx: { fontSize: '1rem' },
                            }}
                        />
                        {/* <Button variant="contained" onClick={() => handleSearch(searchKey)}>
                            Tìm
                        </Button> */}
                    </Paper>
                    <Stack spacing={1} flex={1}  >
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleFileUpload}
                        />
                        <Box >
                            <SelectCP
                                title="Chọn sheet"
                                data={dataExcel.map((item: DataExcel) => ({ label: item.nameSheet, value: item.id })) || []}
                                select={indexSheetExcel}
                                onChange={setIndexSheetExcel}
                            />
                        </Box>
                    </Stack>

                    {/* SAVE */}
                    <Box display="flex" justifyContent="flex-end" my={2} mr={2} flex={1}  >
                        <Button
                            onClick={handleImport}
                            type="submit" variant="contained" color="primary" startIcon={<SaveIcon />} size="large">
                            Lưu Sản phẩm
                        </Button>
                    </Box>
                </Stack>
            </Box>

            {/* List */}
            <Stack spacing={1}>

                {productList
                    .filter((item: CreateProductDTO) =>
                        !searchKey ||
                        item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
                        item.code.toLowerCase().includes(searchKey.toLowerCase())
                    )
                    .map((item: CreateProductDTO, index: number) => (
                        <Paper
                            elevation={2}
                            key={index}
                            sx={{ p: 2, mb: 20 }}
                        >
                            <Box mb={2}>
                                <Typography component="span" variant="body1" fontWeight={700}>
                                    {item.name}
                                </Typography>
                            </Box>

                            <Stack direction={{ xs: 'column', md: 'row', }} spacing={1}>
                                {/* CỘT BÊN TRÁI */}
                                <Stack spacing={2} flex={3}>
                                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
                                        {/* CỘT BÊN TRÁI */}
                                        <Stack spacing={2} flex={2}>
                                            <TextField
                                                label="Mã sản phẩm (Code)" value={item.code} name="price" required fullWidth size="small"
                                            />
                                            <TextField
                                                label="Giá Bán (Price)" value={formatCurrency(item.price)} name="price" required fullWidth size="small"
                                            />
                                            <TextField
                                                label="Giá khuyến mại (DiscountPrice)" value={formatCurrency(item.discountPrice)} name="price" required fullWidth size="small"
                                            />
                                        </Stack>
                                        {/* CỘT BÊN PHẢI */}
                                        <Stack spacing={1} flex={2}>
                                            <Box mt={2}>
                                                <img
                                                    src={item.image}
                                                    alt="Preview"
                                                    style={{
                                                        // width: '150px',
                                                        height: '150px',
                                                        objectFit: 'cover',
                                                        borderRadius: '10px',
                                                        border: '1px solid #ccc',
                                                    }}
                                                />
                                            </Box>
                                        </Stack>
                                    </Stack>

                                </Stack>
                                {/* CỘT BÊN PHẢI */}
                                <Stack spacing={1} flex={2}>
                                    <SelectCP
                                        title="Phân loại"
                                        data={listCategory?.data?.items.map((item: Category) => ({ label: item.name, value: item.id })) || []}
                                        select={item.categoryId}
                                        onChange={(value) => {
                                            productList[index].categoryId = value
                                            setProductList([...productList])
                                        }}
                                        isRequired
                                    />
                                    <SelectCP
                                        title="Thương hiệu"
                                        data={listBrand?.data?.items.map((item: Brand) => ({ label: item.name, value: item.id })) || []}
                                        select={item.brandId}
                                        onChange={(value) => {
                                            productList[index].brandId = value
                                            setProductList([...productList])
                                        }}
                                        isRequired
                                    />

                                </Stack>
                            </Stack>

                        </Paper>
                    ))}
            </Stack>

        </Box>
    );
};
