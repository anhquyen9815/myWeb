// useProduct.ts
// import { useApi } from '@/api/useApi';
// import type { Product, CreateProductDTO, UpdateProductDTO } from '@/types/product';

// export const useProductHooks = () => {
//   return useApi<Product, CreateProductDTO, UpdateProductDTO>('/products');
// };


// useProduct.ts
import { useApi } from '@/api/useApi';
import { bulkInsertProducts, productsWithFilter, bulkUpdateGallery } from '@/api/apiProduct';
import type { Product, CreateProductDTO, UpdateProductDTO, OptionFilterProduct, Response, UpdateGalleryDTO } from '@/types/product';
import { useState } from 'react';

export const useProductHooks = () => {
  const api = useApi<Product, CreateProductDTO, UpdateProductDTO>('/products');
  const [loadingBulk, setLoadingBulk] = useState(false);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Response>();

  // 🧩 Thêm danh sách sản phẩm mới (bỏ qua mã trùng)
  const importProducts = async (list: CreateProductDTO[]) => {
    setLoadingBulk(true);
    try {
      const result = await bulkInsertProducts(list);
      return { success: true, data: result };
    } catch (err: any) {
      console.error('Import lỗi:', err);
      return { success: false, error: err.message || 'Import thất bại' };
    } finally {
      setLoadingBulk(false);
    }
  };

    // 🧩 Thêm danh sách sản phẩm mới (bỏ qua mã trùng)
  const updateGalleryProducts = async (list: UpdateGalleryDTO[]) => {
    setLoadingBulk(true);
    try {
      const result = await bulkUpdateGallery(list);
      return { success: true, data: result };
    } catch (err: any) {
      console.error('Update ảnh lỗi:', err);
      return { success: false, error: err.message || 'Import ảnh bại' };
    } finally {
      setLoadingBulk(false);
    }
  };

  

  // 🧩 Lấy danh sách sản phẩm với filter
  const getFilteredProducts = async (option: OptionFilterProduct) => {
    setLoadingFilter(true);
    try {
      const data = await productsWithFilter(option);
      if (option.page == 1) {
        setFilteredProducts(data);
      } else {
        setFilteredProducts(prev => {
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
    importProducts, // thêm hàm custom
    loadingBulk, // trạng thái riêng cho import
    getFilteredProducts, // hàm lấy danh sách theo filter
    filteredProducts, // dữ liệu filter
    loadingFilter, // trạng thái loading filter
    updateGalleryProducts
  };
};
