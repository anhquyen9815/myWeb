// src/pages/Product/AddAttributeDefinitionForm.tsx
import React from 'react';
import {
    Box, Typography, TextField, Button, Paper, Stack,
 MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useAttributeOptionForm } from './useAttributeOption';

const AddAttributeOptionForm: React.FC = () => {
    const {
        formData,
        attributeDefinitions,
        handleInputChange,
        handleSelectChange,
        handleCreate,
        filteredAttributeOptions
    } = useAttributeOptionForm();

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
                        <FormControl fullWidth size="small" required>
                            <InputLabel>Loại thuộc tính (AttributeDefinitionIdtegory)</InputLabel>
                            <Select
                                label="Loại thuộc tính (AttributeDefinitionId)" name="attributeDefinitionId"
                                value={formData.attributeDefinitionId ?? ''}
                                onChange={handleSelectChange}
                            >
                                {attributeDefinitions?.data?.items.map(cat => (
                                    <MenuItem key={cat.id} value={cat.id}>{cat.displayName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Key thuộc tính (Value)" name="valueKey" required fullWidth size="small"
                            value={formData.valueKey} onChange={handleInputChange}
                        />
                        <TextField
                            label="Tên hiển thị (Label)" name="label" required fullWidth size="small"
                            value={formData.label} onChange={handleInputChange}
                        />

                        <TextField
                            label="Thứ tự xuất hiện (DisplayOrder)" name="displayOrder" required fullWidth size="small" type="number"
                            value={formData.displayOrder || ''} onChange={handleInputChange}
                        />
                    </Stack>
                    {/* Cột phải */}
                    <Stack spacing={2} flex={2}>
                        {filteredAttributeOptions?.items.map((item) => (
                            <Typography>{item.valueKey} - {item.label} - {item.attributeDefinitionId} - {item.displayOrder} </Typography>
                        ))}
                    </Stack>
                </Stack>
                {/* Nút Lưu */}
                <Box display="flex" justifyContent="flex-star" mt={4}>
                    <Button
                        onClick={handleCreate}
                         variant="contained" color="primary" startIcon={<SaveIcon />} size='medium'>
                        Lưu
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default AddAttributeOptionForm;
