// src/pages/Product/AddProductForm.tsx
import React from 'react';
import {
    Box, Typography, TextField, Button, Paper, Stack,
    FormControlLabel, Switch, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
import { useAddProductForm } from './useAddProductForm';

const AddProductForm: React.FC = () => {
    const {
        formData, setFormData, brands,
        categories, preview,
        handleInputChange, handleFileChange, handleSubmit,
        handleSelectChange, handleCreate
    } = useAddProductForm();

    return (
        <Box component="form"
            // onSubmit={handleSubmit} 
            sx={{ maxWidth: 1200, margin: '40px auto', p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
                Thêm Sản phẩm Mới
            </Typography>

            <Paper elevation={3} sx={{ p: 4 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
                    {/* Cột trái */}
                    <Stack spacing={2} flex={1}>
                        <TextField
                            label="Tên Sản phẩm" name="name" required fullWidth size="small"
                            value={formData.name} onChange={handleInputChange}
                        //   onBlur={() => setFormData(p => ({ ...p, slug: p.name.toLowerCase().replace(/\s/g, '-') }))}
                        />
                        <TextField
                            label="Mã Sản phẩm (Code)" name="code" required fullWidth size="small"
                            value={formData.code} onChange={handleInputChange}
                        />
                        {/* <TextField
                            label="Slug" name="slug" required fullWidth size="small"
                            value={formData.slug} onChange={handleInputChange}
                        /> */}

                        <FormControl fullWidth size="small" required>
                            <InputLabel>Danh mục (Category)</InputLabel>
                            <Select
                                label="Danh mục (Category)" name="categoryId"
                                value={formData.categoryId ?? ''}
                                onChange={handleSelectChange}
                            >
                                {categories?.data?.items.map(cat => (
                                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth size="small" required>
                            <InputLabel>Thương hiệu (Brand)</InputLabel>
                            <Select
                                label="Thương hiệu (Brand)" name="brandId"
                                value={formData.brandId ?? ''}
                                onChange={handleSelectChange}
                            >
                                {brands?.data?.items.map(brand => (
                                    <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Link ảnh" name="image" required fullWidth size="small" rows={2} multiline
                            value={formData.image} onChange={handleInputChange}
                            helperText="URL không dấu, không khoảng trắng."
                        />
                    </Stack>

                    {/* Cột phải */}
                    <Stack spacing={2} flex={1}>
                        <TextField
                            label="Giá Bán (Price)" name="price" required fullWidth size="small" type="number"
                            value={formData.price || ''} onChange={handleInputChange}
                        />
                        <TextField
                            label="Giá Khuyến mại (DiscountPrice)" required name="discountPrice" fullWidth size="small" type="number"
                            value={formData.discountPrice || ''} onChange={handleInputChange}
                        />
                        <TextField
                            label="Mô tả Chi tiết" name="description" fullWidth multiline rows={6}
                            value={formData.description} onChange={handleInputChange}
                        />
                    </Stack>
                </Stack>

                {/* File upload + switch */}
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} mt={4} alignItems="center">
                    <Box sx={{ borderTop: '1px solid #eee', pt: 3, mt: 3, display: 'flex', gap: 4, alignItems: 'center' }}>
                        {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>Ảnh Đại diện</Typography>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="image-upload"
                            />
                            <label htmlFor="image-upload">
                                <Button variant="outlined" component="span" startIcon={<FileUploadIcon />}>
                                    {"Chọn ảnh (Image)"}
                                </Button>
                            </label>
                        </Box> */}



                        {formData.image && (
                            <Box mt={2}>
                                <img
                                    src={formData.image}
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
                        )}

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData(p => ({ ...p, isActive: e.target.checked }))}
                                    color="primary"
                                />
                            }
                            label="Kích hoạt sản phẩm"
                        />
                    </Box>
                </Stack>

                {/* Nút Lưu */}
                <Box display="flex" justifyContent="flex-end" mt={4}>
                    <Button
                        // onClick={handleCreate}
                        type="submit" variant="contained" color="primary" startIcon={<SaveIcon />} size="large">
                        Lưu Sản phẩm
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default AddProductForm;
