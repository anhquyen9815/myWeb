import React, { useState } from 'react';
import { useBrandHooks } from '@/hooks/brandHooks';
import type { Brand } from '@/types/brand';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import './BrandManager.scss';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { red } from '@mui/material/colors';

export const BrandManager: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [searchCode, setSearchCode] = useState<string>('');

  const { useGetList } = useBrandHooks();

  // ---------------- List ----------------
  const { data: listData, isLoading: listLoading, refetch } = useGetList(page, searchCode, 50);

  // ---------------- Search ----------------
  const handleSearch = (code: string) => {
    setPage(1); // reset trang 1
    setSearchCode(code);
    // refetch();
  };

  const handleClear = () => {
    setSearchCode('');
    setPage(1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(searchCode);
    }
  };

  return (
    <Box className="product-manager-body" sx={{pl: 1, pr: 1}} >
      <Typography variant="h5" mb={2}>THƯƠNG HIỆU</Typography>

      {/* Search */}
      <Paper elevation={2} sx={{ p: 2, mb: 2, display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          label="Tên thương hiệu"
          placeholder="Nhập tên thương hiệu"
          variant="outlined"
          size="medium"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          InputLabelProps={{ shrink: true }}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchCode ? (
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
        <Button variant="contained" onClick={() => handleSearch(searchCode)}>
          Tìm
        </Button>
      </Paper>

      {/* Loading */}
      {listLoading && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress />
        </Box>
      )}

      {/* List */}
      <Stack spacing={1}>
        {!listLoading && listData?.data?.items.length === 0 && (
          <Typography color="textSecondary" align="center">
            Không tìm thấy kết quả
          </Typography>
        )}

        {listData?.data?.items.map((item: Brand) => (
          <Paper
            elevation={1}
            key={item.id}
            sx={{ p: 2, display: 'flex', alignItems: 'baseline', mb: 20 }}

          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" width={'100%'} >
              <Stack direction="row" spacing={0}>
                <Typography component="span" variant="subtitle2" color="textSecondary" mr={0.5}>
                  Tên:
                </Typography>
                <Typography component="span" variant="body1" fontWeight={700}>
                  {item.name || 'THƯƠNG HIỆU'}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={0}>
                <Typography component="span" variant="subtitle2" color="textSecondary" mr={0.5}>
               
                </Typography>
                <Typography component="span" variant="body1" fontWeight={700}>
                  {item.origin || 'THƯƠNG HIỆU'}
                </Typography>
              </Stack>

            </Stack>


          </Paper>
        ))}
      </Stack>
    </Box>
  );
};
