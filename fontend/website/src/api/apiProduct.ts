// apiProduct.ts
import type { AxiosResponse } from 'axios';
import apiClient from './apiClient'; // import instance axios của bạn
import type { Product, CreateProductDTO, UpdateProductDTO, BulkInsertResult, OptionFilterProduct, Response, UpdateGalleryDTO, BulkUpdateGalleryResult } from '@/types/product'
import { createApi } from './createApi';


export const bulkInsertProducts = async (data: CreateProductDTO[]): Promise<BulkInsertResult> => {
  const response: AxiosResponse<BulkInsertResult> = await apiClient.post('/products/bulk-insert', data);
  return response.data;
};

export const bulkUpdateGallery = async (data: UpdateGalleryDTO[]): Promise<BulkUpdateGalleryResult> => {
  const response: AxiosResponse<BulkUpdateGalleryResult> = await apiClient.post('/products/bulk-update-gallery', data);
  return response.data;
};

export const productsWithFilter = async (option: OptionFilterProduct): Promise<Response> => {
  const response: AxiosResponse<Response> = await apiClient.get('/products/filter', { params: option });
  return response.data;
};



export const productApi = createApi<Product, CreateProductDTO, UpdateProductDTO>('/products');


