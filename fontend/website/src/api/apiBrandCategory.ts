// apiProduct.ts
import type { AxiosResponse } from 'axios';
import apiClient from './apiClient'; // import instance axios của bạn
import type { OptionFilterProduct } from '@/types/product'
import type { BrandCategory, CreatBrandCategoryDTO, UpdateBrandCategoryDTO, Response, BulkInsertResult } from '@/types/brandCategory'
import { createApi } from './createApi';


export const bulkInsertBrandCategorys = async (data: CreatBrandCategoryDTO[]): Promise<BulkInsertResult> => {
  const response: AxiosResponse<BulkInsertResult> = await apiClient.post('/BrandCategories/bulk-insert', data);
  return response.data;
};

export const brandCategoriesWithFilter = async (option: OptionFilterProduct): Promise<Response> => {
  const response: AxiosResponse<Response> = await apiClient.get('/BrandCategories/filter', { params: option });
  return response.data;
};

export const brandCategoryApi = createApi<BrandCategory, CreatBrandCategoryDTO, UpdateBrandCategoryDTO>('/BrandCategories');


