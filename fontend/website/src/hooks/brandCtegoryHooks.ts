// useBrand.ts
import { useApi } from '@/api/useApi';
import type { BrandCategory, CreatBrandCategoryDTO, Response, UpdateBrandCategoryDTO } from '@/types/brandCategory';
import type { OptionFilterProduct } from '@/types/product';
import { useState } from 'react';
import { brandCategoriesWithFilter, bulkInsertBrandCategorys } from '@/api/apiBrandCategory';

export const useBrandCategoryHooks = () => {
  const api = useApi<BrandCategory, CreatBrandCategoryDTO, UpdateBrandCategoryDTO>('/brandcategorys');
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [filteredBrandCategories, setFilteredBrandCategories] = useState<Response>();
  const [loadingBulk, setLoadingBulk] = useState(false);

  // 🧩 Thêm danh sách sản phẩm mới (bỏ qua mã trùng)
  const importBrandCategories = async (list: CreatBrandCategoryDTO[]) => {
    setLoadingBulk(true);
    try {
      const result = await bulkInsertBrandCategorys(list);
      return { success: true, data: result };
    } catch (err: any) {
      console.error('Import lỗi:', err);
      return { success: false, error: err.message || 'Import thất bại' };
    } finally {
      setLoadingBulk(false);
    }
  };

  // 🧩 Lấy danh sách sản phẩm với filter
  const getFilteredBrandCategories = async (option: OptionFilterProduct) => {
    setLoadingFilter(true);
    try {
      const data = await brandCategoriesWithFilter(option);
      setFilteredBrandCategories(data);
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
    getFilteredBrandCategories, // hàm lấy danh sách theo filter
    filteredBrandCategories, // dữ liệu filter
    loadingFilter, // trạng thái loading filter
    importBrandCategories,
    loadingBulk
  };

}

