import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    CircularProgress,
    Paper,
} from '@mui/material';
import { useBrandHooks } from '@/hooks/brandHooks';
import { useCategoryHooks } from '@/hooks/categoryHooks';
import { useBrandCategoryHooks } from '@/hooks/brandCtegoryHooks';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';


interface Brand {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
}

export default function BrandCategoryCreate() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<number | ''>('');
    const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const { importBrandCategories, loadingBulk,  } = useBrandCategoryHooks();
    const { useGetList: useGetListBrand } = useBrandHooks();
    const { useGetList: useGetListCategory } = useCategoryHooks();

    const { data: listBrand, } = useGetListBrand(1, '', 50);
    const { data: listCategory, } = useGetListCategory(1, '', 50);


    const handleToggleBrand = (brandId: number) => {
        setSelectedBrands((prev) =>
            prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]
        );
    };

    // 🟢 Submit form
    const handleSubmit = async () => {
        if (!selectedCategory) {
            alert('Vui lòng chọn Category');
            return;
        }
        if (selectedBrands.length === 0) {
            alert('Vui lòng chọn ít nhất 1 Brand');
            return;
        }

        try {
            setLoading(true);

            const payload = selectedBrands.map((brandId) => ({
                brandId,
                categoryId: selectedCategory,
            }));
            const res = await importBrandCategories(payload);
            alert(`Đã thêm ${res.data?.inserted} sản phẩm mới`);

            setSelectedCategory('');
            setSelectedBrands([]);
        } catch (error) {
            console.error(error);
            alert('Thêm mới thất bại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ width: '100vw', p: 2 }}>
            <Paper sx={{ p: 3, mx: 'auto', maxWidth: 700 }}>
                <Box display="flex" my={0} mr={2}   >
                    <Button
                        onClick={() => navigate('/')}
                        type="submit" variant="contained" color="primary" startIcon={<HomeIcon />} size="small">
                        Về trang chủ
                    </Button>
                </Box>
                {/* Submit button */}
                <Box textAlign="right" mt={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Lưu'}
                    </Button>
                </Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Thêm mới Brand - Category
                </Typography>

                {/* Select Category */}
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Chọn Category</InputLabel>
                    <Select
                        value={selectedCategory}
                        label="Chọn Category"
                        onChange={(e) => setSelectedCategory(Number(e.target.value))}
                    >
                        {listCategory?.data?.items.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Checkbox Brand */}
                <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
                    Chọn Brand:
                </Typography>
                <FormGroup
                    row
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,             // khoảng cách giữa các checkbox
                        maxWidth: 700,      // có thể đặt giới hạn chiều rộng
                    }}
                >
                    {listBrand?.data?.items.map((brand) => (
                        <FormControlLabel
                            key={brand.id}
                            control={
                                <Checkbox
                                    checked={selectedBrands.includes(brand.id)}
                                    onChange={() => handleToggleBrand(brand.id)}
                                />
                            }
                            label={brand.name}
                            sx={{ width: '30%' }}
                        />
                    ))}
                </FormGroup>


            </Paper>
        </Box>
    );
}
