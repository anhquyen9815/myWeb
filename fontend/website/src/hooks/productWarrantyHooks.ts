

// useProductWarranty.ts
import { useApi } from '@/api/useApi';
import { bulkInsertProductwarranties, productwarrantiesWithFilter,  } from '@/api/apiProductWarranty';
import type { ProductWarranty, CreateProductWarrantyDTO, UpdateProductWarrantyDTO, OptionFilterProductWarranty, Response } from '@/types/productWarranty';
import { useState } from 'react';

export const useProductWarrantyHooks = () => {
  const api = useApi<ProductWarranty, CreateProductWarrantyDTO, UpdateProductWarrantyDTO>('/productwarranties');
  const [loadingBulk, setLoadingBulk] = useState(false);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [filteredProductWarrantys, setFilteredProductWarrantys] = useState<Response>();

  // 🧩 Thêm danh sách sản phẩm mới (bỏ qua mã trùng)
  const importProductWarrantys = async (list: CreateProductWarrantyDTO[]) => {
    setLoadingBulk(true);
    try {
      const result = await bulkInsertProductwarranties(list);
      return { success: true, data: result };
    } catch (err: any) {
      console.error('Import lỗi:', err);
      return { success: false, error: err.message || 'Import thất bại' };
    } finally {
      setLoadingBulk(false);
    }
  };


  // 🧩 Lấy danh sách sản phẩm với filter
  const getFilteredProductWarrantys = async (option: OptionFilterProductWarranty) => {
    setLoadingFilter(true);
    try {
      const data = await productwarrantiesWithFilter(option);
      if (option.page == 1) {
        setFilteredProductWarrantys(data);
      } else {
        setFilteredProductWarrantys(prev => {
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
      console.error(' Lấy sản phẩm với filter lỗi:', err);
      return [];
    } finally {
      setLoadingFilter(false);
    }
  };



  return {
    ...api, // giữ nguyên các hàm CRUD mặc định từ useApi
    importProductWarrantys, // thêm hàm custom
    loadingBulk, // trạng thái riêng cho import
    getFilteredProductWarrantys, // hàm lấy danh sách theo filter
    filteredProductWarrantys, // dữ liệu filter
    loadingFilter, // trạng thái loading filter
  };
};
