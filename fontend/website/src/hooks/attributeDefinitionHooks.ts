// useBrand.ts
import { useApi } from '@/api/useApi';
import type {AttributeDefinition, CreateAttributeDefinitionDTO,UpdateAttributeDefinitionDTO, OptionFilter, Response } from '@/types/attributeDefinition'
import { useState } from 'react';
import {AttributeDefinitionsWithFilter} from '@/api/apiAttributeDefinition';

export const useAttributeDefinitionHooks= () => {
  const api =  useApi<AttributeDefinition, CreateAttributeDefinitionDTO, UpdateAttributeDefinitionDTO>('/attributeDefinitions');
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [filteredAttributeDefinitions, setFilteredAttributeDefinitions] = useState<Response>();
  // 🧩 Lấy danh sách sản phẩm với filter
  const getAttributeDefinitions = async (option: OptionFilter) => {
    setLoadingFilter(true);
    try {
      const data = await AttributeDefinitionsWithFilter(option);
      setFilteredAttributeDefinitions(data);
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
    getAttributeDefinitions,
    filteredAttributeDefinitions, // hàm lấy danh sách theo filter
    loadingFilter, // trạng thái loading filter
  };
};
