import type { AxiosResponse } from 'axios';
import { createApi } from './createApi';
import type {AttributeDefinition, CreateAttributeDefinitionDTO,UpdateAttributeDefinitionDTO, OptionFilter, Response } from '@/types/attributeDefinition'
import apiClient from './apiClient';

export const apiAttributeDefinition = createApi<AttributeDefinition, CreateAttributeDefinitionDTO, UpdateAttributeDefinitionDTO>('/AttributeDefinitions');

export const AttributeDefinitionsWithFilter = async (option: OptionFilter): Promise<Response> => {
  const response: AxiosResponse<Response> = await apiClient.get('/AttributeDefinitions', { params: option });
  return response.data;
};