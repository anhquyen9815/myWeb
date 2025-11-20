import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Stack,
    Paper,
    Button,
    TextField,
} from '@mui/material';
import { SCREEN_PATH } from '@/constants/screenPaths';
import SaveIcon from '@mui/icons-material/Save';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import { useNavigate } from "react-router-dom";
import type { CreateWarrantyDTO } from '@/types/warranty';
import { useWarrantyHooks } from '@/hooks/warrantyHooks';
import { useProductHooks } from '@/hooks/productHooks';
import { useBrandCategoryHooks } from '@/hooks/brandCtegoryHooks';
import { useCategoryHooks } from '@/hooks/categoryHooks';
import SelectCP from '@/components/common/Select';
import type { Category } from '@/types/category';
import CheckBoxProductItem from '@/components/common/CheckBoxProductItem';
import { useProductWarrantyHooks } from '@/hooks/productWarrantyHooks';
import type { CreateProductWarrantyDTO } from '@/types/productWarranty';

const initialFormData: CreateWarrantyDTO = {
    name: '',
    description: '',
    periodMonths: 12,
    indexShow: 1,
    isActive: true,
};

export const WarrantyManagerScreen: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CreateWarrantyDTO>(initialFormData);
    const [categoryId, setCategoryId] = useState<number>();
    const [brandId, setBrandId] = useState<number>();
    const [warrantyId, setWarrantyId] = useState<number>();
    const [listProductId, setListProductId] = useState<number[]>([]);
    const { getFilteredBrandCategories, filteredBrandCategories, } = useBrandCategoryHooks();
    const { useCreate, useGetList } = useWarrantyHooks();
    const { getFilteredProducts, filteredProducts } = useProductHooks();
    const { useGetList: useGetListCategory } = useCategoryHooks();
    const { importProductWarrantys, getFilteredProductWarrantys, filteredProductWarrantys } = useProductWarrantyHooks();
    const { data: listCategory, } = useGetListCategory(1, '', 50);
    const { data: warrantes } = useGetList(1, '', 30);


    useEffect(() => {
        if (brandId && categoryId) {
            getFilteredProducts({ page: 1, size: 50, categoryId, brandId })
        }
    }, [brandId, categoryId])

    useEffect(() => {
        if (categoryId) {
            getFilteredBrandCategories({ page: 1, size: 50, categoryId })
        }
    }, [categoryId])


    useEffect(() => {
        if (categoryId && brandId) {
            getFilteredProductWarrantys({ page: 1, size: 50, categoryId, brandId })
        }
    }, [categoryId, brandId])

    const createMutation = useCreate();
    const handleInputChange = (key: string) => (value: string) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    }


    const handleSelectProduct = (checked: boolean, productId: number) => {
        if (checked) {
            setListProductId(prev => (prev.includes(productId) ? prev : [...prev, productId]));
        } else {
            setListProductId(prev => prev.filter(x => x !== productId));
        }
    }

    const handleAttribute = (productId: number) => {
        const attribute = filteredProductWarrantys?.items.find(item => item.productId == productId)
        if (attribute) {
            return attribute.warranty?.name
        } else {
            return ''
        }
    }

    const handleSelectAll = () => {
        const tempList = filteredProducts?.items.map(item => (item.id))
        setListProductId(tempList|| [])
    }

    const handleCreate = async () => {
        if (!formData.name) {
            alert('Vui lòng điền đủ tên bảo hành');
            return;
        }
        const response = await createMutation.mutateAsync(formData);
        if (response.error) {
            alert(`Lỗi: ${response.error}`);
        } else {
            alert('Tạo thành công!');
        }
    }

    const handleCreateList = async () => {
        if (!warrantyId || !listProductId.length) {
            alert('Vui lòng điền đủ tên, giá và danh mục.');
            return;
        }
        const listTemp: CreateProductWarrantyDTO[] = []
        listProductId.forEach(item => {
            listTemp.push({ productId: item, warrantyId })
        })
        console.log('Quyen listTemp', listTemp)
        const response = await importProductWarrantys(listTemp);
        if (response.error) {
            alert(`Lỗi: ${response.error}`);
        } else {
            alert('Tạo thành công!');
            setListProductId([])
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '1200px',
                width: '100%'
            }}
        >
            <Typography variant="h5" mb={2}>Bảo hành</Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    {/* Cột trái */}
                    <Stack spacing={2} flex={2}>
                        <TextField
                            label="Bảo hành (Name)" name="name" required fullWidth size="small"
                            value={formData.name} onChange={text => handleInputChange('name')(text.target.value)}
                        />
                        <TextField
                            label="Ghi chú (description)" name="description" fullWidth size="small"
                            value={formData.description} onChange={text => handleInputChange('description')(text.target.value)}
                        />
                    </Stack>

                    {/* Cột phải */}
                    <Stack spacing={2} flex={1}>
                        <TextField
                            label="Thời gian bảo hành (periodMonths)" name="periodMonths" required fullWidth size="small" type="number"
                            value={formData.periodMonths} onChange={text => handleInputChange('periodMonths')(text.target.value)}
                        />
                        <TextField
                            label="Thứ tự hiển thị" name="indexShow" fullWidth size="small" type="number"
                            value={formData.indexShow} onChange={text => handleInputChange('indexShow')(text.target.value)}
                        />
                    </Stack>

                    {/* Cột phải */}
                    <Stack spacing={2} flex={1}>
                        <Box display="flex" justifyContent="flex-star" mt={4}>
                            <Button
                                onClick={handleCreate}
                                 variant="contained" color="primary" startIcon={<SaveIcon />} size='medium'>
                                Lưu
                            </Button>
                        </Box>
                    </Stack>
                </Stack>
                {warrantes?.data?.items.map((item) => (
                    <Typography>
                        {item.name}
                    </Typography>
                ))}
            </Paper>

            <Typography variant="h5" my={2}>Chức năng</Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
                    {/* Cột trái */}
                    <Stack spacing={1} flex={1}>
                        <SelectCP
                            title="Chủng loại"
                            data={listCategory?.data?.items.map((item: Category) => ({ label: item.name, value: item.id })) || []}
                            select={categoryId}
                            onChange={(value) => {
                                setCategoryId(value)
                            }}
                        />
                        <SelectCP
                            title="Thương hiệu"
                            data={filteredBrandCategories?.items.map((item) => ({ label: item.brandName || '', value: item.brandId })) || []}
                            select={brandId}
                            onChange={(value) => {
                                setBrandId(value)
                            }}
                        />
                    </Stack>
                    {/* Cột phải */}
                    <Stack spacing={1} flex={2}>
                        <SelectCP
                            title="Bảo hành"
                            data={warrantes?.data?.items.map((item) => ({ label: item.name, value: item.id })) || []}
                            select={warrantyId}
                            onChange={(value) => {
                                setWarrantyId(value)
                            }}
                        />
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} width={'50%'} justifyContent={'space-between'}>
                            <Box display="flex" justifyContent="flex-end" mt={4}>
                                <Button
                                 sx={{height: '40px',}}
                                    onClick={handleSelectAll}
                                     variant="contained" color="primary" startIcon={<SelectAllIcon />} size='medium'>
                                    Chọn tất cả
                                </Button>
                            </Box>

                            <Box display="flex" justifyContent="flex-end" mt={4}>
                                <Button
                                sx={{height: '40px',}}
                                    onClick={handleCreateList}
                                     variant="contained" color="primary" startIcon={<SaveIcon />} size='medium'>
                                    Lưu
                                </Button>
                            </Box>
                        </Stack>

                    </Stack>

                </Stack>
                <Stack
                    direction="row"          // sắp xếp theo hàng ngang
                    gap={1}              // khoảng cách giữa các phần tử
                    mt={2}
                    sx={{ flexWrap: 'wrap' }}
                >
                    {filteredProducts?.items.map((item) => (
                        <CheckBoxProductItem
                            product={item}
                            checked={listProductId.includes(item.id)}
                            onChange={handleSelectProduct}
                            attribute={handleAttribute(item.id)}
                        />
                    ))}
                </Stack>

            </Paper>


        </Box>
    );
};
