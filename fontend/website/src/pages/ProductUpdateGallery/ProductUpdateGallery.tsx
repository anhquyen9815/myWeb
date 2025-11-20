import React from 'react';
import type { CreateProductDTO, DataExcel, UpdateGalleryDTO } from '@/types/product';
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
import { useProductUpdateGallery } from './useProductUpdateGallery';
import { useNavigate } from "react-router-dom";


interface DataExcel2 {
    nameSheet: string,
    data: UpdateGalleryDTO[],
    id: number
}

export const ProductUpdateGalleryScreen: React.FC = () => {
    const navigate = useNavigate();
    const {
        imageList,
        handleImport,
        handleFileUpload,
        dataExcel,
        indexSheetExcel,
        setIndexSheetExcel,
        handleRemoteImage
    } = useProductUpdateGallery()
    const size = { xs: 40, sm: 60, md: 70 }

    return (
        <Box sx={{ px: 1, py: 1, display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }} >
            <Box display="flex" my={0} mr={2}   >
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

                    <Stack spacing={1} flex={1}  >
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleFileUpload}
                        />
                        <Box >
                            <SelectCP
                                title="Chọn sheet"
                                data={dataExcel.map((item: DataExcel2) => ({ label: item.nameSheet, value: item.id })) || []}
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

                {imageList
                    .map((item: UpdateGalleryDTO, index: number) => (
                        <Paper
                            elevation={2}
                            key={index}
                            sx={{ p: 2, mb: 20 }}
                        >
                            <Box mb={2}>
                                <Typography component="span" variant="body1" fontWeight={700}>
                                    {item.codeProduct}
                                </Typography>
                            </Box>

                            <Stack direction={{ xs: 'column', md: 'row', }} spacing={1}>
                                {/* CỘT BÊN TRÁI */}
                                <Stack spacing={2} flex={3}>
                                    <Stack direction={{ xs: 'column', md: 'column' }} spacing={1}>
                                        {/* CỘT BÊN TRÁI */}
                                        <Stack spacing={2} flex={2}>
                                            <TextField
                                                label="Mã sản phẩm (Code)" value={item.codeProduct} name="code" required fullWidth size="small"
                                            />
                                        </Stack>
                                        {/* CỘT BÊN PHẢI */}
                                        <Stack spacing={1} flex={2}>
                                            <Stack mt={2} flexDirection={'row'} gap={2}>
                                                {item.listGallery?.map((src, i) => (
                                                    <Box
                                                        key={i}
                                                        component="li"
                                                        sx={{
                                                            flex: "0 0 auto",
                                                            width: { xs: size.xs, sm: size.sm, md: size.md },
                                                            height: { xs: size.xs, sm: size.sm, md: size.md },
                                                            borderRadius: 2,                // bo góc nhẹ
                                                            border: "1px solid #e0e0e0",
                                                            backgroundColor: "#fff",
                                                            display: "flex",
                                                             position: 'relative',
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            boxSizing: "border-box",
                                                            // padding: 1,                   // khoảng cách để ảnh không sát mép
                                                            transition: "all 160ms ease",
                                                            cursor: "pointer",
                                                            "&:hover": {
                                                                transform: "translateY(-4px)",
                                                                boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
                                                            },
                                                        }}
                                                    >
                                                        {/* ✅ Checkbox ở góc trên bên phải */}
                                                        <ClearIcon
                                                            onClick={() => handleRemoteImage(src, index)}
                                                            sx={{
                                                                position: "absolute",
                                                                top: 4,
                                                                right: 4,
                                                                zIndex: 2,
                                                                backgroundColor: "rgba(255,255,255,0.8)",
                                                                color: 'red',
                                                                borderRadius: "50%",
                                                                "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                                                            }}
                                                        />
                                                        <Box
                                                            component="img"
                                                            src={src}
                                                            alt={`thumb-${i}`}
                                                            sx={{
                                                                width: "90%",          // ảnh nhỏ hơn ô, nằm giữa
                                                                height: "90%",
                                                                objectFit: "contain", // giữ nguyên tỉ lệ
                                                                display: "block",
                                                                userSelect: "none",
                                                                pointerEvents: "none",
                                                            }}
                                                        />
                                                    </Box>
                                                ))}
                                                {/* <img
                                                    src={item.image}
                                                    alt="Preview"
                                                    style={{
                                                        // width: '150px',
                                                        height: '150px',
                                                        objectFit: 'cover',
                                                        borderRadius: '10px',
                                                        border: '1px solid #ccc',
                                                    }}
                                                /> */}
                                            </Stack>
                                        </Stack>
                                    </Stack>

                                </Stack>
                                {/* CỘT BÊN PHẢI */}
                                <Stack spacing={1} flex={2}>


                                </Stack>
                            </Stack>

                        </Paper>
                    ))}
            </Stack>

        </Box>
    );
};
