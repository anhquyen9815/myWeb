import { createApi } from './createApi';
import type {AttributeOption, CreateAttributeOptionDTO, UpdateAttributeOptionDTO, OptionFilterttributeOption } from '@/types/attributeOption'
import type { AxiosResponse } from 'axios';
import apiClient from './apiClient'; // import instance axios của bạn
import type { Response } from '@/types/attributeOption';

export const attributeOptionFilter = async (option: OptionFilterttributeOption): Promise<Response> => {
  const response: AxiosResponse<Response> = await apiClient.get('/AttributeOptions', { params: option });
  return response.data;
};

export const apiAttributeOption = createApi<AttributeOption, CreateAttributeOptionDTO, UpdateAttributeOptionDTO>('/AttributeOptions');
