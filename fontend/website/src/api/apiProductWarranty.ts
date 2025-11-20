// apiProductWarranty.ts
import type { AxiosResponse } from 'axios';
import apiClient from './apiClient'; // import instance axios của bạn
import type { ProductWarranty, CreateProductWarrantyDTO, UpdateProductWarrantyDTO, BulkInsertResult, OptionFilterProductWarranty, Response, } from '@/types/productWarranty'
import { createApi } from './createApi';


export const bulkInsertProductwarranties = async (data: CreateProductWarrantyDTO[]): Promise<BulkInsertResult> => {
  const response: AxiosResponse<BulkInsertResult> = await apiClient.post('/productwarranties/bulk', data);
  return response.data;
};

export const productwarrantiesWithFilter = async (option: OptionFilterProductWarranty): Promise<Response> => {
  const response: AxiosResponse<Response> = await apiClient.get('/productwarranties', { params: option });
  return response.data;
};


export const productApi = createApi<ProductWarranty, CreateProductWarrantyDTO, UpdateProductWarrantyDTO>('/productwarranties');


