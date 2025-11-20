import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import type { OptionFilterProduct } from '@/types/product';
import { useAttributeDefinitionHooks } from "@/hooks/attributeDefinitionHooks";
import MenuDropsDownAttribute from "./MenuDropsDownAttribute";
import MenuDropsDown from "@/components/common/MenuDropsDown";

interface ProductFilterHeaderProps {
  categoryId: number;
  handleFilter: (option: OptionFilterProduct) => void,
  optionFilter: OptionFilterProduct,
}


const FilterByAttribute: React.FC<ProductFilterHeaderProps> = ({ categoryId, handleFilter, optionFilter, }) => {
  const { getAttributeDefinitions, filteredAttributeDefinitions } = useAttributeDefinitionHooks()
  const [attributeFilters, setAttributeFilters] = useState<Record<string, number>>({})

  useEffect(() => {
    getAttributeDefinitions({ size: 20, page: 1, categoryId })
  }, [])

  const priceOptions = [
    { minPrice: 0, maxPrice: 3000000, label: "Dưới 3 triệu", value: 0 },
    { minPrice: 3000000, maxPrice: 7000000, label: "Từ 3-7 triệu", value: 1 },
    { minPrice: 7000000, maxPrice: 10000000, label: "Từ 7-10 triệu", value: 2 },
    { minPrice: 10000000, maxPrice: 15000000, label: "Từ 10-15 triệu", value: 3 },
    { minPrice: 15000000, maxPrice: 999000000, label: "Trên 15 triệu", value: 4 },
  ];

  const handleSelect = (key: string) => (attributeOptionId: number) => {
    // build next object từ prev
    setAttributeFilters(prev => {
      const next = { ...prev, [key]: attributeOptionId };
      if (attributeOptionId == 999) {
        delete next[key]
      }
      // nếu bạn muốn gọi API ngay, serialize next thành "3,5,7"
      const attrIds = Object.values(next).join(','); // order tuỳ thuộc object order
      const payload: OptionFilterProduct = {
        ...optionFilter,
        page: 1,
        attributeFilters: attrIds,
      };
      handleFilter(payload);

      return next;
    });
  }

  const handleFilterPrice = (index: number) => {
    if (index == 999) {
      const payload: OptionFilterProduct = {
        ...optionFilter,
        page: 1,
      };
       delete payload.minPrice;
       delete payload.maxPrice;
      handleFilter(payload);
    } else {
      const payload: OptionFilterProduct = {
        ...optionFilter,
        page: 1,
        minPrice: priceOptions[index].minPrice,
        maxPrice: priceOptions[index].maxPrice
      };
      handleFilter(payload);
    }

  }

  return (
    <Box sx={{ width: '100%', mb: 0 }}>
      <Typography variant="subtitle1" fontWeight={700}>
        Chọn tiêu chí
      </Typography>

      <Stack direction="row" spacing={1.5} mt={1} flexWrap="wrap" useFlexGap>
        {filteredAttributeDefinitions?.items.map(item => (
          <MenuDropsDownAttribute attributeDefinitionId={item.id} onSelect={handleSelect(item.name)} title={item.displayName} />
        ))}
        <MenuDropsDown
          data={priceOptions.map(item => ({ label: item.label, value: item.value }))}
          title={'Giá'}
          onSelect={handleFilterPrice}
        />
      </Stack>

    </Box>
  );
};

export default FilterByAttribute;
