// src/pages/Product/AddAttributeDefinitionForm.tsx
import React from 'react';
import {
    Box, Typography, Button, Paper, Stack,
    MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import RestoreIcon from '@mui/icons-material/Restore';
import { useProductAttributeOptionForm } from './useProductAttributeOption';
import CheckBoxProductItem from '@/components/common/CheckBoxProductItem';

const AddProductAttributeOptionForm: React.FC = () => {
    const {
        attributeDefinitions,
        handleSelectChange,
        handleCreate,
        filteredAttributeOptions,
        attributeDefinitionId,
        handleSelectAttributeDefinition,
        filteredProducts,
        handleSelectProduct,
        listProductId,
        handleReset,
        attributeOptionId,
        filteredBrandCategories,
        handleBrandChange,
        brandId,
        handleAttribute
    } = useProductAttributeOptionForm();

    return (
        <Box component="form"
            // onSubmit={handleSubmit} 
            sx={{ margin: '0px auto', p: { xs: 2, md: 4 }, width: 900 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                Thêm thuộc tính
            </Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    {/* Cột trái */}
                    <Stack spacing={2} flex={2}>
                        {/* Nút Lưu */}
                        <Box display="flex" justifyContent="flex-star" mt={4}>
                            <Button
                                onClick={handleCreate}
                                // type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />} size='medium'>
                                Lưu
                            </Button>
                        </Box>
                        <FormControl fullWidth size="small" required>
                            <InputLabel>Loại thuộc tính (AttributeDefinitionIdtegory)</InputLabel>
                            <Select
                                label="Loại thuộc tính (AttributeDefinitionId)" name="attributeDefinitionId"
                                value={attributeDefinitionId}
                                onChange={handleSelectAttributeDefinition}
                            >
                                {attributeDefinitions?.data?.items.map(cat => (
                                    <MenuItem key={cat.id} value={cat.id}>{cat.displayName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth size="small" required>
                            <InputLabel>Thương hiệu</InputLabel>
                            <Select
                                label="Thương hiệu" name="brand"
                                value={brandId}
                                onChange={handleBrandChange}
                            >
                                {filteredBrandCategories?.items.map(cat => (
                                    <MenuItem key={cat.id} value={cat.brandId}>{cat.brandName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Stack>
                    {/* Cột phải */}
                    <Stack spacing={2} flex={2}>
                        {/* Nút Lưu */}
                        <Box display="flex" justifyContent="flex-star" mt={4}>
                            <Button
                                onClick={handleReset}
                                variant="contained" color="primary" startIcon={<RestoreIcon />} size='medium'>
                                Reset
                            </Button>
                        </Box>
                        <FormControl fullWidth size="small" required>
                            <InputLabel>Thuộc tính (attributeOptionId)</InputLabel>
                            <Select
                                label="Thuộc tính (attributeOptionId)" name="attributeOptionId"
                                value={attributeOptionId}
                                onChange={handleSelectChange}
                            >
                                {filteredAttributeOptions?.items.map(cat => (
                                    <MenuItem key={cat.id} value={cat.id}>{cat.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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

export default AddProductAttributeOptionForm;
