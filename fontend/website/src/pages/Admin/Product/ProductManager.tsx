import React, { useState } from 'react';
import { useProductHooks } from '@/hooks/productHooks';
import type { Product, CreateProductDTO, UpdateProductDTO } from '@/types/product';
import './ProductManager.scss';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  InputAdornment
} from '@mui/material';

export const ProductManager: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
    const [searchCode, setSearchCode] = useState<string>('');

  const {
    useGetList,
    useGetDetail,
    useCreate,
    useUpdate,
    useDelete,
  } = useProductHooks();



  // ---------------- List ----------------
  const { data: listData, isLoading: listLoading } = useGetList(page);
  console.log('listData:', listData);
  // ---------------- Detail ----------------
  const { data: detailData, refetch: refetchDetail } = useGetDetail(selectedId ?? 0);

  // ---------------- Mutations ----------------
  const createMutation = useCreate();
  const updateMutation = useUpdate();
  const deleteMutation = useDelete();

  // ---------------- Handlers ----------------
  const handleCreate = async () => {
    // const newProduct: CreateProductDTO = {
    //   name: 'Sản phẩm mới',
    //   price: 0,
    //   //   image: '',
    // };
    // await createMutation.mutateAsync(newProduct);
  };

  const handleUpdate = async () => {
    if (!selectedId) return;
    const updatedData: UpdateProductDTO = {
      name: 'Sản phẩm cập nhật',
      price: 1000,
      //   image: '',
    };
    await updateMutation.mutateAsync({ id: selectedId, data: updatedData });
    refetchDetail();
  };

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
    if (selectedId === id) setSelectedId(null);
  };



  return (
    <Box className="product-manager-body" >

      <Paper elevation={2}
        sx={{ p: 2, mb: 1 }}
      >
        <TextField
          fullWidth
          label="Mã Sản phẩm"
          placeholder="Nhập mã sản phẩm"
          variant="outlined"
          size="medium" // Kích thước trung bình
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          InputLabelProps={{ shrink: true }} // Luôn hiển thị label ở trên
        />

      </Paper>
    </Box>
  );
};
