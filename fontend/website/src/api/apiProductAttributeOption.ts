import { createApi } from './createApi';
import type { ProductAttributeOption,BulkInsertParams, CreateProductAttributeOptionDTO, UpdateProductAttributeOptionDTO, OptionFilterttributeOption, BulkInsertResult, Response } from '@/types/productAttributeOption'
import type { AxiosResponse } from 'axios';
import apiClient from './apiClient'; // import instance axios của bạn

export const productattributeOptionFilter = async (option: OptionFilterttributeOption): Promise<Response> => {
  const response: AxiosResponse<Response> = await apiClient.get('/ProductAttributeOptions', { params: option });
  return response.data;
};

export const bulkInsertProductAttributeOptions = async (data: BulkInsertParams): Promise<BulkInsertResult> => {
  const response: AxiosResponse<BulkInsertResult> = await apiClient.post(`/ProductAttributeOptions/assignOptionToProducts`, data);
  return response.data;
};

export const apiProductAttributeOption = createApi<ProductAttributeOption, CreateProductAttributeOptionDTO, UpdateProductAttributeOptionDTO>('/ProductAttributeOptions');
