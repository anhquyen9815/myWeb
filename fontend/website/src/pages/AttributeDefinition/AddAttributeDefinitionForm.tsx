// src/pages/Product/AddAttributeDefinitionForm.tsx
import React from 'react';
import {
    Box, Typography, TextField, Button, Paper, Stack,
    MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useAttributeDefinitionForm } from './useAttributeDefinition';
import AddAttributeOptionForm from '../AttributeOption/AddAttributeOptionForm';
import AddProductAttributeOptionForm from '../ProductAttributeOption/AddProductAttributeOptionForm';

const AddAttributeDefinitionForm: React.FC = () => {
    const {
        formData, attributeDefinitions,
        categories,
        handleInputChange, handleSubmit,
        handleSelectChange, handleCreate
    } = useAttributeDefinitionForm();

    return (
        <Box pb={60}>
            {<Box component="form" onSubmit={handleSubmit} sx={{ margin: '0px auto', p: { xs: 2, md: 4 }, width: 900, }}>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                    Thêm kiểu thuộc tính
                </Typography>
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        {/* Cột trái */}
                        <Stack spacing={2} flex={1}>
                            <TextField
                                label="Key thuộc tính (Name)" name="name" required fullWidth size="small"
                                value={formData.name} onChange={handleInputChange}
                            />
                            <TextField
                                label="Tên hiển thị (DisplayName)" name="displayName" required fullWidth size="small"
                                value={formData.displayName} onChange={handleInputChange}
                            />
                            <TextField
                                label="Kiểu dữ liệu (DataType)" name="dataType" required fullWidth size="small"
                                value={formData.dataType} onChange={handleInputChange}
                            />
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
                            <TextField
                                label="Thứ tự xuất hiện (DisplayOrder)" name="displayOrder" required fullWidth size="small" type="number"
                                value={formData.displayOrder || ''} onChange={handleInputChange}
                            />
                        </Stack>
                        {/* Cột phải */}
                        <Stack spacing={2} flex={2}>
                            {attributeDefinitions?.data?.items.map((item) => (
                                <Typography>{item.name} - {item.displayName} - {item.dataType} - {item.displayOrder} - (Category: {item.categoryId})</Typography>
                            ))}
                        </Stack>
                    </Stack>
                    {/* Nút Lưu */}
                    <Box display="flex" justifyContent="flex-star" mt={4}>
                        <Button
                            onClick={handleCreate}
                            type="submit" variant="contained" color="primary" startIcon={<SaveIcon />} size='medium'>
                            Lưu
                        </Button>
                    </Box>
                </Paper>

            </Box>}
            {<AddAttributeOptionForm />}
            {<AddProductAttributeOptionForm />}

        </Box>
    );
};

export default AddAttributeDefinitionForm;
