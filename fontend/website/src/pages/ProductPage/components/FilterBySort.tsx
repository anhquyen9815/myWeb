import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SellIcon from "@mui/icons-material/Sell";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import type { OptionFilterProduct } from '@/types/product';

interface ProductFilterHeaderProps {
  handleFilter: (option: OptionFilterProduct) => void,
  optionFilter: OptionFilterProduct,
}
const FilterBySort: React.FC<ProductFilterHeaderProps> = ({  handleFilter, optionFilter, }) => {
  const [sort, setSort] = useState<'Asc' | 'Desc' | 'discount'>("Desc");

  useEffect(() => {
    const temp: OptionFilterProduct = {
      ...optionFilter,
      page: 1,
      sortBy: sort == 'discount' ? 'DiscountPercent' : 'DiscountPrice',
      sortOrder: sort == 'discount' ? 'Desc' : (sort == 'Desc' ? 'Desc' : 'Asc'),
    }
    handleFilter(temp)
  }, [ sort])

  const handleSortChange = (
    event: React.MouseEvent<HTMLElement>,
    newSort: 'Asc' | 'Desc' | 'discount'
  ) => {
    if (newSort !== null) setSort(newSort);
    // if (newSort !== null) setSortOrder(newSort);
  };

  return (
    <Box sx={{ width: '100%', mb:1 }}>
        <Typography variant="subtitle1" fontWeight={700} >
          Sắp xếp theo
        </Typography>

        <ToggleButtonGroup
          exclusive
          value={sort}
          onChange={handleSortChange}
          sx={{
            mt: 1,
            gap: 1,
            flexWrap: "wrap",
            "& .MuiToggleButton-root": {
              borderRadius: 2,
              textTransform: "none",
              px: { xs: 0.6, sm: 0.8, md: 1 },
              py: { xs: 0.6, sm: 0.8, md: 1 },
              borderColor: "divider",
              "&.Mui-selected": {
                borderColor: "error.main",
                color: "error.main",
                bgcolor: "rgba(255,0,0,0.05)",
              },
            },
          }}
        >
          <ToggleButton value="Desc" sx={{
            fontSize: {
              xs: "0.7rem", // điện thoại
              sm: "0.8rem", // tablet
              md: "0.9rem", // desktop
            },
            whiteSpace: "nowrap", // tránh xuống dòng
            px: { xs: 1, sm: 2 },
          }}>
            <ArrowDownwardIcon sx={{ mr: 0.5, fontSize: { xs: 16, sm: 18, md: 20 } }} />
            Giá Cao - Thấp
          </ToggleButton>
          <ToggleButton value="Asc" sx={{
            fontSize: {
              xs: "0.7rem", // điện thoại
              sm: "0.8rem", // tablet
              md: "0.9rem", // desktop
            },
            whiteSpace: "nowrap", // tránh xuống dòng
            px: { xs: 1, sm: 2 },
          }}>
            <ArrowDownwardIcon sx={{ mr: 0.5, transform: "rotate(180deg)", fontSize: { xs: 16, sm: 18, md: 20 } }} />
            Giá Thấp - Cao
          </ToggleButton>
          <ToggleButton value="discount" sx={{
            fontSize: {
              xs: "0.7rem", // điện thoại
              sm: "0.8rem", // tablet
              md: "0.9rem", // desktop
            },
            whiteSpace: "nowrap", // tránh xuống dòng
            px: { xs: 1, sm: 2 },
          }}>
            <SellIcon sx={{ mr: 0.5, fontSize: { xs: 16, sm: 18, md: 20 } }} />
            Giảm giá
          </ToggleButton>
        </ToggleButtonGroup>
    </Box>
  );
};

export default FilterBySort;
