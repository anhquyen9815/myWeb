// useBrand.ts
import { attributeOptionFilter } from '@/api/apiAttributeOption';
import { useApi } from '@/api/useApi';
import type {AttributeOption, CreateAttributeOptionDTO, UpdateAttributeOptionDTO, OptionFilterttributeOption } from '@/types/attributeOption'
import type { Response } from '@/types/attributeOption';
import { useState } from 'react';

export const useAttributeOptionHooks= () => {

    const api = useApi<AttributeOption, CreateAttributeOptionDTO, UpdateAttributeOptionDTO>('/AttributeOptions');
    const [loadingFilter, setLoadingFilter] = useState(false);
    const [filteredAttributeOptions, setFilteredAttributeOptions] = useState<Response>();

    // 🧩 Lấy danh sách sản phẩm với filter
  const getFilteredAttributeOption = async (option: OptionFilterttributeOption) => {
    setLoadingFilter(true);
    try {
      const data = await attributeOptionFilter(option);
      setFilteredAttributeOptions(data);
      return data;
    } catch (err: any) {
      console.error('Lấy sản phẩm với filter lỗi:', err);
      return [];
    } finally {
      setLoadingFilter(false);
    }
  };

    return {
    ...api, // giữ nguyên các hàm CRUD mặc định từ useApi
    getFilteredAttributeOption, // hàm lấy danh sách theo filter
    filteredAttributeOptions, // dữ liệu filter
    loadingFilter
  };
};
