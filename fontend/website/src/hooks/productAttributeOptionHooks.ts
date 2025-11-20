// useProductAttributeOption.ts


import { useApi } from '@/api/useApi';
import { productattributeOptionFilter, bulkInsertProductAttributeOptions } from '@/api/apiProductAttributeOption';
import type { BulkInsertParams, ProductAttributeOption, CreateProductAttributeOptionDTO, UpdateProductAttributeOptionDTO, OptionFilterttributeOption, Response } from '@/types/productAttributeOption';
import { useState } from 'react';

export const useProductAttributeOptionHooks = () => {
  const api = useApi<ProductAttributeOption, CreateProductAttributeOptionDTO, UpdateProductAttributeOptionDTO>('/products');
  const [loadingBulk, setLoadingBulk] = useState(false);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [filteredProductAttributeOptions, setFilteredProductAttributeOptions] = useState<Response>();

  // 🧩 Thêm danh sách sản phẩm mới (bỏ qua mã trùng)
  const importProductAttributeOptions = async (params: BulkInsertParams) => {
    setLoadingBulk(true);
    try {
      const result = await bulkInsertProductAttributeOptions(params);
      return { success: true, data: result };
    } catch (err: any) {
      console.error('Import lỗi:', err);
      return { success: false, error: err.message || 'Import thất bại' };
    } finally {
      setLoadingBulk(false);
    }
  };

  // 🧩 Lấy danh sách sản phẩm với filter
  const getFilteredProductAttributeOptions = async (option: OptionFilterttributeOption) => {
    setLoadingFilter(true);
    try {
      const data = await productattributeOptionFilter(option);
      if (option.page == 1) {
        setFilteredProductAttributeOptions(data);
      } else {
        setFilteredProductAttributeOptions(prev => {
          const prevItems = prev?.items ?? [];
          const nextItems = [...prevItems, ...(data.items ?? [])];
          // Merge/update metadata: total, page, size (ưu tiên server response nếu có)
          return {
            total: data.total ?? prev?.total ?? nextItems.length,
            page: data.page ?? option.page ?? (prev?.page ?? 1),
            size: data.size ?? prev?.size,
            items: nextItems
          };
        });
      }
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
    importProductAttributeOptions, // thêm hàm custom
    loadingBulk, // trạng thái riêng cho import
    getFilteredProductAttributeOptions, // hàm lấy danh sách theo filter
    filteredProductAttributeOptions, // dữ liệu filter
    loadingFilter, // trạng thái loading filter
  };
};
